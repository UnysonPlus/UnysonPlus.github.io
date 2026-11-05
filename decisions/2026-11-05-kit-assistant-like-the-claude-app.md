---
slug: kit-assistant-like-the-claude-app
title: Should the AI Dev Kit's chat work like the Claude app, and how does it ask before acting?
authors: [jon]
tags: [ai-assistant, kinetic-scenes]
date: 2026-11-05
description: The Kit Assistant moves from a narrow helper towards working the way people use the Claude app, starting with Kinetic Scenes, and one Create or Confirm now covers a whole request inside a single project.
---

**The question:** "I think we want the AI Dev Kit dashboard to work like how the user uses the Claude app, right?" And,
for Kinetic Scenes: should there be one big screen that asks what you want to make, as a jumpstart?

<!-- truncate -->

## Context

The Kit Assistant was built as a narrow, tool-using chat for conversions. It has attachments, visible tool steps, a
saved history and `/` commands, and every change waits for a Confirm click. It has no live replies, no Stop button and
only one conversation, and it doesn't know Kinetic Scenes projects. Of its seven tools, only one touches scenes, and that
one only passes a request along.

The Studio already has an agent that works inside a project folder: it edits the scene, checks frames, reports each step
and can be cancelled. In the Studio, the ways to begin a scene were spread across five menus and the AI assist panel, so
new users rarely found them.

The rule so far was that nothing changes unless a person clicks Confirm for that change. An agent makes dozens of small
edits, so it cannot ask each time.

## Options considered

1. **Keep the narrow chat.** Safe and simple, but it stays a helper people have little reason to open.
2. **Build a full agent into the chat for every task.** The most capable, but it reaches past what has been made safe,
   such as live sites.
3. **Work like the Claude app, with Kinetic Scenes first.** Reuse the Studio's project agent, then add conversations,
   live replies and a preview beside the chat.

For the approval rule:

1. **Confirm every edit.** Unworkable for an agent.
2. **No confirmation.** Too loose for anything that touches a person's work.
3. **One approval per request, limited to one project.**

## Decision

Option 3 for both. The Kit Assistant works like the Claude app, starting with Kinetic Scenes. Its full experience needs
Claude Code on the person's subscription; small local models keep chat and `/` commands, because they can't reliably run
multi-step work.

A new **start screen** in the Studio is the front door, and its **Create** button shares the same agent. Clicking
**Create**, or one **Confirm** in the chat, approves that whole request. The agent may then edit only that project's
folder. Rendering, pushing and live sites never happen on their own, and a snapshot of the scene is taken before each run.

## Why

- **People already know this way of working.** It needs no teaching, and the pieces mostly exist.
- **Most of the start screen was already built.** The work was gathering it, which is the cheapest large gain for a new
  user.
- **The approval moves to where the decision is.** A person decides what they want done, not each small edit, and the
  project folder and the snapshot limit what can go wrong.
- **What can't be undone keeps its own gate.** Rendering takes minutes, and pushes and live sites reach other people, so
  those stay explicit.
