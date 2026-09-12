---
slug: ai-dev-kit-licensing
title: "Why the AI Dev Kit and Capture Service are non-commercial source-available while the plugin stays GPL"
authors: [jon]
tags: [architecture, security]
date: 2026-09-12
description: "How do you protect developer tooling that is worth something without hiding it? Obfuscation and passwords were rejected: the kit is text an AI agent has to read, so any lock is also a lock against its own users. The decision is a license split — plugin and theme stay GPL, the kit's prose is CC BY-NC-SA 4.0, the kit's code and the Capture Service are PolyForm Noncommercial 1.0.0 — with a plain-words page saying sites built with the kit are free to use commercially."
---

**The question:** Is there a way to secure the AI Dev Kit code from developers who want to reverse-engineer it — base64, a password an agent has to supply before reading, something like that? And if not, how do you license the *intent*?

<!-- truncate -->

## Context

The kit is a public repository of Markdown playbooks, skills and Node scripts, plus the Capture Service that turns a live site into the converter's input. Its value is the accumulated conversion know-how from many real-site training sessions, not any one algorithm. The consumer of that know-how is an AI agent reading plain text. The WordPress side — the plugin, its extensions and the theme — runs inside WordPress and is GPL like WordPress itself.

## Options considered

- **Obfuscate or encode the sources (base64, minify, a decode step).** Trivially reversed, and it breaks the whole point of the kit: an agent has to read the playbooks to follow them. Anything the agent can decode, a person can decode.
- **A password or "unlock" gate an agent must pass before reading.** Same problem in a different coat. The gate is in the same repository as the content, so it is documentation of how to open itself. It also punishes legitimate users on every clone.
- **Keep it private / sell access.** Kills the reach that makes the converter useful, and contradicts the plugin being open source.
- **License the intent.** Leave the code readable, state clearly what is and is not allowed, and rely on the license for the commercial case. This is what every source-available project does; it does not stop a determined copier, but it makes commercial reuse a legal problem for them rather than a technical one for us.

## Decision

A license split by what each part is:

- **UnysonPlus plugin, extensions (Site Converter included) and theme:** GPL-2.0-or-later, unchanged.
- **Kit documentation, skills, playbooks:** CC BY-NC-SA 4.0 — the standard license for prose that may be shared and adapted non-commercially.
- **Kit code and the Capture Service:** PolyForm Noncommercial 1.0.0 — a modern, readable non-commercial software license with a clear personal / non-profit / research carve-out.
- The conversion corpus (captured sites) is never published.
- A plain-words `LICENSE` in each repository lists what you may and may not do, and one sentence is non-negotiable: **using a site you built with the kit commercially is fine**. The restriction is on the kit and the service, not their output.
- Every source file carries an `SPDX-License-Identifier` line; `AGENTS.md` tells agents to carry the notices forward.
- Versions of the kit already published under GPL stay GPL; the new terms apply from the first release that ships these files.

## Why

Obfuscation is theatre when the reader is an agent that needs the plain text, and any gate against copying is a gate against the people the kit exists for. A license does the one thing code cannot: it separates "may read and use" from "may resell". Choosing two well-known licenses rather than a custom text keeps the terms recognisable to anyone deciding whether they can use the kit, and PolyForm's explicit non-commercial definition avoids the ambiguity of CC-NC for software. Keeping WordPress-side code GPL preserves the open-source promise where it matters most and where the GPL is required anyway.
