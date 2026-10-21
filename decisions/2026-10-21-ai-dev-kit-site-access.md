---
slug: ai-dev-kit-site-access
title: "Can anyone who has the AI Dev Kit change an Unyson+ site?"
authors: [jon]
tags: [security, ai-assistant, architecture]
date: 2026-10-21
description: The AI Dev Kit's Chat tab opened a live site and described it in detail, which raised the question of whether the kit can reach into Unyson+ sites on its own. It cannot. The kit holds no site credentials; its chat tools are read-only and see only public pages. Its one route to editing a site is a short-lived session that the site itself hands over, for a person already logged in to it, and the agent it starts ignores every saved connection on the computer.
---

**The question:** The AI Dev Kit's Chat tab looked at a live site and described it in detail, although
the kit was never given a connection password. That password was only ever given to a Claude session
in VS Code. Can anyone who installs the kit modify Unyson+ sites? And are VS Code and the kit
connected?

<!-- truncate -->

## Context

Three different things can talk to a site, and they are easy to confuse:

- **The kit's Chat tab** (the Kit Assistant). Since capture service 1.12.37 it has tools:
  `look_at_url`, `conversion_report`, `search_docs` and `read_doc`.
- **The kit's "Claude through the AI Dev Kit" backend** for a site's AI Assistant panel. A person in
  wp-admin picks it, and the kit runs Claude on their behalf against that one site.
- **An AI app with a connection password**, such as a Claude Code session in VS Code. The password is
  saved as an MCP server in that app's own settings.

The chat's `look_at_url` call is what prompted the question. It opened the homepage in the kit's
browser and read the title, sections and contact details.

## Options considered

1. **Let the kit hold site connections**, so its chat could also edit sites. This is convenient, but
   anyone with the kit and a saved connection could change a site, and the credential would sit in one
   more place on disk.
2. **Have the kit reuse the connections Claude Code already has.** There's no new secret to manage,
   but it silently couples two programs. Whatever is saved in VS Code would become reachable from a
   dashboard anyone on the machine can open.
3. **No stored credentials in the kit at all.** The chat reads only public pages. The kit edits a
   site only when that site hands it a session, for a person already logged in to it.

## Decision

Option 3.

- **The kit's chat tools are read-only and anonymous.** `look_at_url` loads a public page the way any
  visitor or search engine does. It sends no password and never touches the AI Assistant's MCP
  endpoint. The other tools read local files only: capture reports and the kit's docs.
- **The kit stores no site credentials.** VS Code / Claude Code and the kit are separate programs. The
  saved MCP servers (for example `totaloddsmedev`) live in Claude Code's settings and the kit never
  reads them.
- **The one write route is handed over by the site.** When a logged-in user picks "Claude through the
  AI Dev Kit" in the AI Assistant panel, the site gives the kit a session for that conversation. It
  carries that user's permissions and is dropped when the conversation ends. The kit starts Claude
  with `--mcp-config` holding only that site's connection, plus `--strict-mcp-config`, so every other
  MCP server saved on the computer is ignored. `--allowedTools` limits it to that site's tools and the
  kit's own read-only ones.
- **Phase 3 of the Kit Assistant keeps this line.** Any tool that changes something — running a capture,
  converting, writing a setting — asks for an explicit confirm. A live site is never written from the
  chat on the strength of a sentence.

## Why

- **A credential nobody stored can't leak.** Installing the kit gives no access to any site. To change
  one you must be logged in to it, or hold a connection password made on it, and the site can revoke
  either.
- **Seeing a public page is not access.** Anything the chat can read, any browser can read. Treating
  it as a security boundary would be theatre, but treating a write route the same way would be a real
  hole. That's why the two are kept separate.
- **No hidden coupling.** If the kit could borrow Claude Code's saved connections, someone opening the
  dashboard would inherit whatever a developer had connected that week. `--strict-mcp-config` rules
  that out in code, not just in documentation.

## For the person running it

- Revoke a connection password once its job is done: on the site under Unyson+ → AI Assistant →
  Settings → Connections, or Users → Profile → Application Passwords. Do it especially for any password
  that was pasted into a chat.
- Remove saved connections from Claude Code once they're no longer needed: `claude mcp remove <name>`.
  Those are the only stored credentials on the computer, and they belong to Claude Code, not the kit.
- Limit who can use the assistant on each site with Settings → *Who can use it*.
