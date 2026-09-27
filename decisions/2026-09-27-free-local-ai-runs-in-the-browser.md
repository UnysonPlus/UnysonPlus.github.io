---
slug: free-local-ai-runs-in-the-browser
title: "Why the AI Assistant's free local AI runs its loop in the browser, with JSON actions instead of tool calls"
authors: [jon]
tags: [ai-assistant, architecture, extensions]
date: 2026-09-27
description: "Users without an AI subscription can run a free model on their own computer. A hosted WordPress server cannot reach that computer, so the assistant panel in the browser runs the loop. And small models' native tool calls proved too fragile, so each step is one JSON action constrained by a schema."
---

**The question:** Can someone with no Claude or ChatGPT subscription still use the AI Assistant, with a free model running on their own PC (the AI Dev Kit already runs one for the Site Converter) — and if so, how does a live site talk to it?

<!-- truncate -->

## Context

The assistant had two ways to reach a model: the WordPress AI Client (a paid provider key) and a
"local agent command" that the web server runs on the same machine (development sites only). Neither
helps a site owner on a web host who has no subscription.

The AI Dev Kit already runs Ollama and lets the user pull a model. The obvious question was why the
site could not simply call it, the way the Site Converter calls the capture service. The answer turned
out to be that the Site Converter mostly *doesn't* — its main calls are `fetch()` requests from the
admin page, in the browser. To a web host's server, `localhost` is the server itself; the user's PC sits
behind their router with no public address. The server can never open a connection to it. The browser
can, because it runs on that PC.

## Options considered

**Server calls the model.** Works only when WordPress runs on the same machine. Ruled out for hosted
sites, which are the point.

**A tunnel or relay** (the PC opens an outbound connection the server can use). Works anywhere, but
adds a moving part, an account or port to manage, and a new attack surface — for a free, best-effort
feature.

**The browser runs the loop.** The panel sends the request to the model on `localhost`, runs each tool
the model asks for against the site's own MCP endpoint (logged in as the user, inside the same sandbox
session the other backends use), and repeats. The server only opens and closes the session. No new
infrastructure; the same trust boundary as the Site Converter.

Then, how the model asks for tools:

**Native tool calling** (Ollama `tools`). Tested first. With Qwen3 8B the calls were silently dropped
whenever a long argument — a section with its items — had one stray token: Ollama's parser failed and
returned an empty message, and the model looked like it was doing nothing for minutes.

**One JSON action per turn**, constrained by Ollama's `format` schema: `{"tool", "arguments"}` or
`{"reply"}`. The output always parses; a stray token becomes a visible, fixable value instead of a lost
call; and it works with any text model, not only tool-calling ones.

## Decision

- A fourth model choice, **Local AI on this computer**, whose loop runs in the assistant panel. It talks to
  the AI Dev Kit (`POST /local-ai/tool-chat`) or to Ollama directly, and to the site through MCP with the
  user's cookie session and a one-off session header. Automatic falls back to it when nothing else is set
  up, and the panel checks for a model when opened.
- Each step is one **JSON action** constrained by a schema — not a native tool call.
- Small models get help rather than more rope: a shorter tool list, **validated section recipes** they
  copy instead of reading option schemas, stray entries stripped from item lists, and automatic nudges
  when they stop half way or leave a problem the page check found.

## Why

It is the only design that works on a hosted site without new infrastructure, and it reuses the
sandbox, validation, render check and undo that already protect the other backends — a weak model can
make a poor edit, but never an unsafe one, and nothing is saved until the person presses Update.

The JSON-action switch is what made it usable. The same FAQ request went from failing (or taking three
minutes with lucky retries) to finishing correctly on the first try in about a minute on a 6 GB laptop
GPU. The trade-off is accepted openly: a local model is slower and less capable than a cloud one, so the
feature is labelled limited and pitched at one section at a time.
