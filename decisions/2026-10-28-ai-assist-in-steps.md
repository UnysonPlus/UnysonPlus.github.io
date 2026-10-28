---
slug: ai-assist-in-steps
title: "Why does AI assist work in steps only through Claude Code, with a locked-down set of tools?"
authors: [jon]
tags: [kinetic-scenes, ai-assistant, security, architecture]
date: 2026-10-28
description: AI assist in the Kinetic Scenes Studio answered in one go and could not look at its work. Decision — when a project is open and the AI Dev Kit's AI is Claude Code, AI assist runs it as an agent inside the project folder with only the Kinetic Scenes tools and file editing in that folder; no shell, web, sub-agents, saving elsewhere or rendering. Other AI backends keep the one-go answer.
---

**The question:** AI assist sent one request and got one scene back, while an agent working through the AI Dev Kit could
read the notes, look at frames and fix what it saw. How should AI assist itself work in steps, and how much should it be
allowed to do on the person's computer?

<!-- truncate -->

## Context

The Kinetic Scenes workspace keeps each project as a folder (scene, media, notes), and the kit already offers the tools
an agent needs: the guide, check scene, frames, the timeline, the notes. The kit also already talks to Claude Code (the
person's own subscription) as one of its AI backends. A first test run gave the agent the usual file tools; it edited
the scene well, but it also saved a duplicate project outside its folder and then tried to delete it through a tool
that runs shell commands.

## Options considered

- **Build our own agent loop over every backend** (API key, local model, Codex, Claude Code). The same feature for
  everyone, but a tool-calling loop per provider, and local models are weak at long tool use.
- **Run Claude Code as the agent, with its normal tools.** Little code, but it can run commands and reach anything on
  the computer, which is far more than "change this scene" needs.
- **Run Claude Code as the agent, locked to the project (chosen).** Only the Kinetic Scenes tools, plus reading and
  editing files, in the project folder as its working directory; shell, PowerShell, Monitor, sub-agents, web access,
  notebooks, saving projects, saving scenes elsewhere and rendering are all blocked.

## Decision

- With a project open and Claude Code as the kit's AI, AI assist offers **Work in steps** (on by default). The kit runs
  `claude -p` in the project folder with `--strict-mcp-config` (only the Kinetic Scenes tools), `--permission-mode
  acceptEdits`, an allow-list (the Kinetic Scenes tools, Read, Edit, Write, Glob, ToolSearch) and a deny-list for
  everything else. Its steps stream to the Studio; the scene updates through the project folder, so Undo still works.
- The brief tells it to read the notes first, edit only scene.json, check with check scene and frames, never render,
  and add what it did to the notes.
- Other backends keep the one-go answer.

## Why

The person asked for a change to one scene: the agent needs that folder and the tools that see the scene, nothing else.
Locking it to that is what makes it safe to run unattended from a web page, and it is still enough for it to look at
its own work, which is the whole point of working in steps. Claude Code already does the tool use well, so there is no
agent loop of our own to maintain.
