---
slug: one-conversion-protocol
title: "Why 'fix my site' and 'train the converter' became one protocol instead of two"
authors: [jon]
tags: [site-converter, architecture, naming]
date: 2026-09-30
description: "Two runbooks existed for what turned out to be one job, and the split was actively harmful: an agent handed the training runbook fixed the algorithm and left the page broken, and one handed the fixing runbook fixed the page and threw away the rule. The decision: one protocol, where the only fork is per-defect — which landing place a given fix goes to — and reporting the rule upstream is mandatory in both directions."
---

**The question:** we had a runbook for *training the converter on a site* and a separate one for *fixing a converted site*. Should they stay separate — different audiences, different permissions — or is that split the reason neither job ever gets finished properly?

<!-- truncate -->

## Context

The two runbooks were written days apart, for what looked like two audiences:

- **Training** assumed the converter source, the goldens and the captured corpus. A fix landed in the shared algorithm, proved by a golden and rescored against the corpus.
- **Fixing** assumed a site owner with nothing but a converted page and its source. A fix landed in a theme option, scoped CSS, or a site-local hook — never in shared code a plugin update would erase.

That reads like a clean split. In practice it produced two matching failures, each caused by the phrasing of the request rather than by anything about the defect:

- A **training** round changed the algorithm, proved the rule with a golden, rescored the corpus — and never reconverted the page. The site the work was requested about was still visibly wrong. The round was reported as finished.
- A **fixing** round closed nine defects through options and scoped CSS, each one requiring a rule to be worked out by hand — and reported them to the person in the room. Every one of those rules is a rule the converter is missing. None of them was recorded. The next site of the same shape gets solved by hand all over again.

The deeper problem was routing. Neither runbook was reachable from the agent entry point: a grep of the kit's `AGENTS.md` — 463 lines whose whole job is telling an agent what to do — returned **zero** matches for "training", "fix my site", or either prompt filename. So the phrase *"let's train on somesite.com"* did not resolve to a protocol at all, and the order got improvised each time, which is how gates like *open every band image* and *rescore the corpus* came to be skipped.

## Options considered

**Keep two runbooks, add routing to both.** Cheapest change, and it fixes the routing gap. But it leaves the real defect: the mode is chosen by *how the request was phrased*, and the phrasing carries no information about the defect in front of you. The same missing gradient is a converter bug or a theme-option fix depending on which sentence the user typed, which is nonsense.

**One protocol, two *modes* selected at the start.** The agent declares "site mode" or "converter mode" based on what it has access to, and follows one ordered set of phases. Converter mode is a strict superset — more landing places available, two extra gates (a golden proved red, the corpus rescored).

**One protocol with no modes at all.** Rejected. An agent without the goldens and the corpus genuinely must not touch shared code — a rule tuned to one source is wrong for the rest, and there is no way to find out which without the corpus. That constraint is real and has to stay expressible.

## Decision

**One protocol** — `docs/conversion-protocol.md` — with a mode declared once at the start, and **the fork moved from the request to the defect**. Both phrasings run every phase. What differs is only which landing places are available:

> a general rule in the converter → a native Theme Settings option → scoped CSS → a site-local sandbox hook

The first rung is converter mode only. The rest are always available, and the ladder is walked in order, never past the last rung.

Two obligations became mandatory in **both** directions, because each was the half the other mode kept dropping:

1. **The page must end up matching its source.** Training that ships a rule without reconverting has fixed nothing anybody can see.
2. **Every rule found gets reported upstream**, as it is found — one finding per systematic miss, after a single consent question at the start, never per bug. A site fixed without the rule recorded leaves the next identical site to be fixed by hand.

The reporting side needed no new plumbing: the streaming sender already existed and already enforces the contract that makes a finding useful — a finding is refused unless it carries the source *construct*, the capture path, the twin and the loss kind; a fixture is refused unless it carries computed-style stamps; a *solution* is refused if it looks like a per-site `#id` stylesheet rule rather than a general rule. What was missing was any protocol that told an agent to call it. Both prompts now do, and the protocol makes the send a numbered step rather than a closing suggestion.

The two copy-paste prompts survive as **audience variants of one protocol**, not as alternatives to it, and both now say so in their first paragraph. Routing was added at the top of the kit's `AGENTS.md` and to the workspace conventions, so the trigger phrases resolve without improvisation.

## Why

The split was a model of *who is asking*. The thing that actually varies is *what kind of defect this is* — whether it would recur on other sources of the same shape. That question is answerable per defect and unanswerable per request, so it belongs at the point where a fix is placed, not at the point where a task is named.

Merging also removed the only real argument for the split, which was permissions. "Do not edit shared code" is not a different protocol; it is one rung of a ladder being unavailable. Expressing it that way keeps the constraint exactly as strict while letting everything else — capture first, whole-page before bands, open every band image, read the verdict column, enumerate missing text by name, re-check coverage after every change — be written once and skipped never.

And the two mandatory obligations are what make the merge worth more than tidiness. Before, each mode was structurally allowed to discard the other's output: the algorithm improved while the page stayed broken, or the page got fixed while the rule evaporated. Those are the same failure seen from two sides, and only one protocol can require both halves.
