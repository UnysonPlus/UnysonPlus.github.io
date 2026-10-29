---
slug: kit-chat-images-and-commands
title: How should the Kit Assistant take an image, and should a typed command go through the model?
authors: [jon]
tags: [site-converter, architecture]
date: 2026-10-29
description: Claude's API backend gets a native Messages-API chat path so images arrive as images, while a typed /command bypasses the model entirely and runs one tool directly.
---

**The question:** the dashboard chat could neither take an attached image nor accept a typed command.
Could both be added — and if so, how should each one actually work?

<!-- truncate -->

## Context

The Kit Assistant is a deliberately narrow tool-using chat: seven tools, four read-only, three behind a
Confirm. Two things were missing, and they turned out to be very different sizes of problem.

The chat's content was a **string at every boundary**. Worse, on the Claude backends it did not use the
Messages API's native shape at all: it fell through to `textToolLoop`, which flattens the whole
conversation into one prose blob and posts it as `messages: [{ role:'user', content: <string> }]`. That
protocol exists for providers that refuse native tool calls, and it works — but a flattened string has
nowhere for an image block to live.

The kit was already vision-aware in every other respect: its local-model catalogue carries a `vision`
flag, Qwen3-VL 8B is the recommended pick and is annotated for exactly this job, and the dashboard
renders a vision badge. Only the chat couldn't use any of it.

## Options considered

**For images — bolt image blocks onto the existing text loop.** Smallest diff. But it would mean
teaching a prose-flattening protocol to carry binary, on a backend whose API supports images natively.
A workaround built on top of a workaround.

**For images — give the API backend a real native path.** More work: `tool_use` / `tool_result` blocks,
proper message shapes, a second loop to maintain. But the text protocol was only ever a compatibility
shim, and Claude needs none of it.

**For commands — expand a `/command` into a prompt and let the model route it.** Keeps one code path:
`/report latest` becomes "show me the conversion report for the latest capture". But it spends a model
round-trip on something with no ambiguity in it, and on a small local model the routing is exactly the
part that is unreliable.

**For commands — run the tool directly, no model.** Two tables to keep in step (the service's and the
page's), but deterministic and instant.

## Decision

**Images:** the `api` backend gets `chatAnthropicNative` — real native tool and image blocks. Ollama and
OpenAI-shaped endpoints carry images in their own native field, gated by a `modelSeesImages()` check
that refuses an attachment on a text-only model and names one that would work. `claude-code`, which can
only take text, is handed the image **by file path** with the `Read` tool granted for that turn.

Attachments are downscaled in the browser to 1568px, stored once under `capture-out/_chat/`, and the
conversation keeps only a `{ name, mime, file, bytes }` **ref** — never base64.

**Commands:** a typed `/command` runs one tool directly and never reaches the model, through the same
gate as a model's own call, so `/capture` still returns a proposal awaiting Confirm.

## Why

The native path was the right call for a reason beyond images: the text protocol asks the model to
emit `TOOL {…}` in prose and then parses it back out with a brace-matching scanner. That is a
reasonable fallback and a poor default. Adding images would have entrenched it on the one backend that
never needed it.

Refusing an attachment on a text-only model matters more than it looks. The failure mode is not an
error — it is a model answering confidently about a picture it cannot see. An explicit refusal naming
a working model is worth more than a silent drop.

Storing refs rather than base64 is what keeps the durable history viable: the transcript holds 200
messages, and inlining the images would have turned a 500-byte file into hundreds of megabytes.

On commands, the honest argument is not typing speed — it is that the deterministic path is *better*
than the model path for an unambiguous request. `/report` cannot pick the wrong tool, cannot hallucinate
a capture name, and costs nothing. The duplication it introduces (a table in `serve.mjs` and one in
`index.html`) is real, and is called out in the kit docs so a future command is added to both.

## Postscript — two failures worth recording

The `claude-code` image path failed twice in ways that produced a *confident refusal* rather than an
error, which is the hardest kind to debug:

1. Without `--allowedTools Read`, the CLI replied that it needed permission to open the file — in a
   non-interactive run where nobody could grant it.
2. With permission granted, it still refused: "the `Read` tool isn't actually available in this
   environment." The system brief states that the assistant's tools are read-only and lists them, and a
   note about `Read` placed *before* that list read as a description of the kit's tools rather than an
   override. Moved to the very end, after the tool list, it worked.

Both are now load-bearing comments in the code.
