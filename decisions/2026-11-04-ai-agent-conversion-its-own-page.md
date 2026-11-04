---
slug: ai-agent-conversion-its-own-page
title: "Where should the 'convert with an AI agent' method live — in each tool guide, or its own page?"
authors: [jon]
tags: [documentation, site-converter, ai-assistant]
date: 2026-11-04
description: The Site Converter is a close, editable starting point, not a pixel-perfect clone, so the per-tool guides needed an honest way to point readers at the AI-agent path. Decision — one canonical "convert with an AI agent (Claude)" page, a short callout from every convert guide, and the pixel-perfect phrasing removed.
---

**The question:** The Site Converter's output isn't guaranteed pixel-perfect. Should the "let an AI agent
like Claude convert and refine it" method be written into each per-tool conversion guide (Wix, Webflow,
Squarespace, Framer…), or live on its own page that the guides link to?

<!-- truncate -->

## Context

The per-tool guides each target one search term ("wix to wordpress", "framer to wordpress") and walk the
manual convert-from-URL flow. The deterministic converter captures the design system, layout and content
well, but an automatic conversion lands a **close, editable** page, not a frozen clone — and the early
drafts of the new guides overclaimed ("what you see is what you get").

An AI agent closes that gap: connected through the AI Assistant MCP server, it can run `convert_url`, then
`visual_check` (which lists, section by section, what still differs from the source) and fix each
difference in the builder, repeating until the page matches. That compare-and-fix loop is identical no
matter which tool the source was built with, and it needs the MCP connection explained once.

## Options considered

- **Inline the AI method in every per-tool guide.** Everything on one page, but the same ~15 lines are
  duplicated across 14+ guides; one method change means editing all of them; and mixing a second method
  dilutes each page's keyword focus.
- **A separate canonical page + a short callout from each guide.** One source of truth; each per-tool page
  keeps its own search intent while the AI page ranks for "convert a site to WordPress with AI / Claude";
  the only cost is a click for the reader who wants the hands-off path.
- **Make the AI path the primary method and demote the manual flow.** But most conversion traffic is
  tool-specific, and many readers don't have an AI agent connected — the manual convert-from-URL flow has
  to stay the first thing each guide shows.

## Decision

A **separate canonical page** — *Convert a site to WordPress with an AI agent (Claude)* — with a short,
honest callout in **every** convert guide ("an automatic conversion is a close, editable starting
point — not always pixel-perfect; hand it to an AI agent to get it the rest of the way"). The per-tool
guides also drop the pixel-perfect phrasing and set the expectation of a close, editable base.

## Why

DRY: the AI method and its MCP-connection setup are written once, not repeated per tool. Search focus:
each page keeps the keyword it was built for. Honesty: the guides now say what the converter actually
does, and point to the AI path as the recommended way to close the gap — while being clear that even the
AI loop is iterative refinement, not a guaranteed pixel clone. And because whatever the agent produces is
**editable WordPress**, there's no fidelity ceiling — the reader (or the agent) can keep polishing.
