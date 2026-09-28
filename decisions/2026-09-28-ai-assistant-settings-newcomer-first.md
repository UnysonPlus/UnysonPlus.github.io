---
slug: ai-assistant-settings-newcomer-first
title: "Why the AI Assistant settings screen leads with one status, and what Reset does and does not touch"
authors: [jon]
tags: [ai-assistant, admin-ui]
date: 2026-09-28
description: "A newcomer created an outside-agent connection password, expected the chat panel to be connected, and it was not. The screen now opens with one live status and one recommended way to connect; everything technical is under Advanced; and Reset returns settings to defaults without revoking connections or undoing site changes."
---

**The question:** The AI Assistant should be easy enough that a newcomer can use it right away without tinkering. And how do you reset it?

<!-- truncate -->

## Context

The screen listed everything with equal weight: a status table of five technical rows, the model
backend, a local AI address, MCP access, "Connect an agent" and 35 abilities. A person who clicked
**Create connection password** reasonably believed they had connected the chat panel. They had not:
that password is for an AI program outside WordPress, and the panel finds its AI a completely
different way. "Last used: never" was the only hint, and nothing on the screen said which AI (if any)
the panel would use.

## Options considered

- **Keep the layout, improve the help text.** Cheapest, but the misleading button stays the most
  prominent action on the screen.
- **A setup wizard.** Clear for the first run, but a modal flow is heavy for something done once, and
  it hides the state afterwards.
- **Status-first single screen with progressive disclosure.** One live status at the top, one
  recommended way to connect, the panel position, and everything else under a collapsed "Advanced".

For **Reset**, the question was scope: settings only, or also connection passwords, saved
conversations, and the AI's changes to the site.

## Decision

- The screen opens with **one status**: Ready (naming the AI that answers, with *Open the AI
  Assistant*), Not connected yet, or Turned off. With local AI it runs the same check the chat panel
  runs, so it is never a guess.
- **Connect an AI** shows one recommended path (the AI Dev Kit: Claude with a subscription, or a free
  model without one) as three real steps, and the provider key as the alternative. It collapses into
  "Other ways to connect" once the status is Ready.
- The model choice, **Outside AI programs** (renamed from "Connect an agent", with a sentence saying the
  chat panel does not need it), the abilities list and **Reset** sit under **Advanced**.
- **Reset** returns every setting on the screen to a fresh install (Automatic, default address and
  position, no agent command, outside access Off) and, if ticked, clears the user's saved
  conversations. It does **not** revoke connection passwords (each is revoked on its own, so a reset
  cannot silently sign out a working agent) and does **not** undo the AI's changes to the site
  (those have their own revisions and undo).
- The "abilities" are not resettable: they are a read-only list generated from the active extensions.

## Why

The person's actual job on this screen is "make the chat work", so the answer to "is it working, and
with what?" comes first, and the one action that gets there is the most visible one. Technical
controls stay available but no longer compete for attention. Reset is scoped to what the screen
owns: undoing a site's content or cutting off another program are different, more consequential
actions, and each already has its own control.
