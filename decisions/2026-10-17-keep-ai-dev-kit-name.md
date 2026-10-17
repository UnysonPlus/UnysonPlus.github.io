---
slug: keep-ai-dev-kit-name
title: "Should the AI Dev Kit be renamed now that it powers Kinetic Scenes?"
authors: [jon]
tags: [naming, ai-assistant]
date: 2026-10-17
description: No. The kit stays the AI Dev Kit. Its users and Kinetic Scenes' main audience are developers; video creation is an extra, and a rename would cost churn without reaching anyone new.
---

**The question:** The AI Dev Kit now runs Kinetic Scenes' AI assist, transcription and video export as well as the Site
Converter and the AI Assistant. Is "Dev Kit" still right, or should it become something broader, such as "Unyson+ Kit"?

<!-- truncate -->

## Context

The kit is a small app on the user's own computer that connects their AI subscription and local tools (site capture, video
rendering, transcription) to Unyson+. The planned AI director phase adds a skill, kit commands and a local MCP server for
agents such as Claude Code, Codex and Cursor. The Web and Video modes decision already set the audience: power users and
websites first, with video as a companion.

## Options considered

- **"Unyson+ Kit".** Broader, but too vague: it no longer says what the kit does and drops the "AI" people search for.
- **"Unyson+ AI Kit" or "Unyson+ Companion".** Friendlier to non-developers, at the cost of renaming the product across the
  plugin, Kinetic Scenes, the docs and three repositories.
- **Keep "AI Dev Kit".**

## Decision

Keep the name. Where someone who is not a developer first meets the kit (AI assist's connection message, the video export
dialog), it is explained in one plain line instead, for example "the free AI Dev Kit runs on your computer and connects your
own AI".

## Why

The kit is a developer tool by nature (installed and run locally, with commands and an MCP server), and Kinetic Scenes'
main audience builds websites. Video creation is an extra for the same users, not a new audience to chase. A rename would
cost churn everywhere the name appears without reaching anyone new.
