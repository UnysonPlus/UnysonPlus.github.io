---
slug: byo-ai-endpoint
title: "Why can the AI tier point at any OpenAI-compatible API, and why is that not part of “Local AI”?"
authors: [jon]
tags: [architecture, conversion, extensions]
date: 2026-10-15
description: The non-Claude tier gained a second source — any OpenAI-compatible endpoint the user configures — implemented as one translating transport rather than a per-vendor integration, and presented as a separate tier because a hosted endpoint cannot keep the local tier's privacy promise.
---

**The question:** Free AI APIs exist that anyone can sign up for, and plenty of people already pay for a
subscription. Should the converter be able to use those, instead of only a model running on the user's own PC?

<!-- truncate -->

## Context

The converter's AI work had three sources: the Anthropic API with a key, the Claude Code CLI against a
subscription, and a local model served by Ollama. The local one is the free, private fallback — and its
ceiling is the machine it runs on. About 8B parameters is where a typical PC stops, which the Settings panel
says outright: *"all below Claude in quality, and bigger = better."*

That ceiling is the whole problem. The same person who cannot run a 70B model locally can usually reach one
through an endpoint they already have — a free hosted catalogue, an aggregator, or a bigger machine on their
own network. The quality gap between "what fits on this PC" and "what this person can already reach" is
large, and nothing in the architecture was using it.

## Options considered

**Point the existing local tier at a remote Ollama.** Already worked, and still does: `OLLAMA_HOST` was never
hardcoded, and the launcher does not pin it. Costs nothing, but only helps someone who already runs Ollama
somewhere else — which is a small group, and does not reach any hosted provider.

**Integrate specific providers.** One adapter per vendor. Rejected: it is the same work repeated, it dates
badly as providers come and go, and it would put vendor names in the product — the UI would end up
recommending someone, which is not ours to do.

**One OpenAI-compatible transport.** Every provider worth reaching — hosted catalogues, aggregators, and the
self-hosted servers people run on their LAN — copies OpenAI's `/chat/completions` shape. One translation
therefore reaches all of them, and the user supplies the URL, the key and the model.

**Use the paid subscriptions people already hold.** Appealing, and already half-built: the Claude Code
backend shells out to a CLI that authenticates against a subscription with no key at all. The catch is that a
consumer chat subscription generally does not include API access, so the CLI shell-out is the only route to
one — and a CLI backend is single-shot text, which cannot drive the tool-calling pass. It is a complement to
the endpoint, not a substitute for it.

## Decision

Ship **one OpenAI-compatible endpoint tier**, configured by the user, with no provider named or recommended
anywhere in the product. Implement it as a **single transport** rather than a branch at each call site: every
caller hands `localChat()` a body in the local runner's shape and gets one back, and the function either
posts it as-is or translates it both ways. Adding the tier therefore touched the call sites only to route
them through that one function.

Keep it as a **separate Settings panel** from Local AI, and say plainly in it that the page is sent to the
provider and that the key is stored in plain text.

The model picker **fetches the provider's catalogue and filters it**. Capability is measured by the existing
Check action, not inferred.

An explicit `AI_BACKEND=ollama` **disables a saved endpoint**, and `AI_BACKEND=endpoint` forces it.

## Why

**One transport, because the difference is a wire, not a feature.** The two sources answer the same question
with the same prompts; only the HTTP shape differs. Branching per call site would have meant seven copies of
that difference, each able to drift. The translation is small but genuinely lossy in both directions — tool
arguments are an object on one side and a JSON string on the other, a tool result is identified by name on
one side and by call id on the other — so it belongs in exactly one place, with tests pinning each
difference.

**A separate panel, because the privacy claim is the point of the local tier.** "Free and 100% private" is
true of a model on your own machine and false of a hosted endpoint. Adding a radio button to that panel would
have quietly made its headline a lie. Two panels cost a little space and keep both claims honest.

**No provider named, because of who carries the risk.** Free tiers are commonly restricted to
non-production use, and this tool is used to convert client sites — commercial work. A panel that recommends
a specific free provider nudges users into a licensing problem that lands on them, not on us. "Your key, your
provider, your terms" is both simpler and safer, and it keeps the product out of the business of tracking
whose free tier changed this month.

**The catalogue is filtered because a catalogue is not a menu.** A provider lists everything it hosts —
embedding models, rerankers, safety classifiers, speech and video detectors, image models. Offered raw, most
of what the user sees cannot do the job and fails with errors that do not explain why. And since the listing
carries no capability metadata at all, whether a model can call tools is unanswerable from it — which is why
Check exists rather than a guess.

**The override wins both ways, because a saved file must not beat an explicit instruction.** Without that, a
saved endpoint would silently override `AI_BACKEND=ollama` — and a developer's own configuration would change
what the test suite exercises on their machine but not on anyone else's.
