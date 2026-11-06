---
slug: convert-vs-build-site-guide-framing
title: "Per-tool conversion guides and 'build a free site' guides — two sets, or one framed by tool type?"
authors: [jon]
tags: [documentation, site-converter]
date: 2026-11-05
description: The site-conversion guides needed to cover both "migrate off a platform" and "build a free site from a design or AI tool". Decision — one guide per tool, framed by the tool's nature (convert for hosted platforms, build-free for design/AI tools), plus a single "build a free site fast" pillar. No duplicate convert+create pairs.
---

**The question:** The per-tool guides target "convert X to WordPress", but for a design app or an AI
builder you're not migrating an existing site — you're *creating* one. Should each tool get both a
"convert" guide and a separate "build a free site from X" guide, or one guide framed by the tool type?

<!-- truncate -->

## Context

Two search intents overlap here. People on a **hosted platform** (Webflow, Wix, Squarespace, Framer)
search "X to WordPress" because they want *off* it — a migration. People using a **design or AI tool**
(Figma, Base44, Bolt, v0, ChatGPT…) have a design or a prompt, not a live site, and search "build a
WordPress site with X / free / fast" — a creation. The same Site Converter serves both, so a "convert
X" and a "build from X" guide would share 90% of their steps.

## Options considered

- **Two guides per tool (convert + build).** Maximum keyword coverage, but ~20 near-duplicate pages
  that Google treats as thin and that cannibalise each other, plus double the upkeep.
- **One guide per tool, framed by the tool's nature, + one "build free" pillar.** Hosted platforms keep
  the "convert/migrate" frame; design and AI tools get the "build a free site from X" frame. A single
  pillar owns the generic "build a free WordPress site fast" head term and links to every per-tool
  guide.
- **One generic "build/convert" page only.** Lowest effort, but loses the per-tool long-tail ("figma to
  wordpress", "bolt to wordpress") that is the whole reason these guides rank.

## Decision

One guide per tool, framed by what the tool is — **convert** for the hosted platforms, **build a free
site from** for the design and AI tools — plus a single pillar,
[Build a free WordPress site fast](/guides/build-a-free-wordpress-site-fast), that ties the create
intent together. The design/export tools (Figma, XD, ChatGPT) document the **HTML/CSS-upload** path;
the AI builders that publish a live site use **capture-by-URL**; and Cursor/ChatGPT also surface the
**MCP agent** path. Files stay under the shared `convert-*-to-wordpress` slug for consistency and the
"X to WordPress" keyword; the title and body carry the right frame.

## Why

It captures both intents (per-tool long-tail *and* the generic "build free fast" head term) with no
thin-duplicate pages and a single page to maintain per tool. Honesty carries over from the earlier
decision: every guide says the converter is a close, editable starting point and points to the AI
agent to close the gap.
