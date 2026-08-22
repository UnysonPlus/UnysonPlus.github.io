---
slug: consolidate-conversion-docs-by-depth
title: "Where should the deep Site Converter docs live — in the extension, or moved to the AI Dev Kit?"
authors: [jon]
tags: [documentation, conversion, extensions]
date: 2026-08-22
description: "The conversion knowledge was split across two how-it-works pages — the extension's deep architecture/algorithm and the kit's conceptual method — with neither framed as the canonical home. The proposal was to move ALL Site Converter subpages into the AI Dev Kit and leave the extension as a stub-plus-link. We consolidated by DEPTH instead: the deep pipeline/algorithm moves to the kit as one canonical page, but the extension keeps its standalone task manual (convert-from-file/url, capture service, AI-assist, manual tools) so a wp-admin plugin user is never bounced into developer-kit docs."
---

**The question:** The Site Converter's conversion knowledge lived in two places — a deep
`how-it-works` (architecture + algorithm) under the extension docs, and a conceptual `how-it-works`
(capture-first → outside-in → measure) under the AI Dev Kit — and neither was clearly the canonical
home. Should we move **all** the extension's conversion subpages into the AI Dev Kit and reduce the
extension section to a basic overview + a link, so all conversion info lives in one place?

<!-- truncate -->

## Context

Both doc sets describe the same underlying engine but for different readers. The extension pages
(`index`, `convert-from-file`, `convert-from-url`, `capture-service`, `ai-assist`, `manual-tools`,
`how-it-works`) are a **product manual** for a WordPress user running the plugin in `wp-admin`. The
AI Dev Kit pages are for a **developer** running Claude Code to drive an agentic conversion and
improve the converter.

Two facts complicated a wholesale move:

1. **The Site Converter extension is a standalone plugin** — fully usable without the kit (its
   deterministic engine and the capture service need no AI and no Node tooling from the kit).
2. **The extension has its *own* optional "AI assist"** — Claude running *inside the capture service*
   to refine the mapping only. That is **not** the same as the kit's full agentic build. So there are
   three tiers, not two: extension-deterministic, extension-AI-assist, and kit-full-agentic.

## Options considered

- **Full consolidation (the original proposal).** Move every extension subpage's content into the
  kit; collapse the extension section to one overview page + a prominent "see the AI Dev Kit" link.
  *Trade-off:* a user who just installed the plugin to convert an HTML file gets bounced into
  developer-kit docs that imply they need Node + Claude — and the extension's light AI-assist gets
  conflated with the kit's full agentic build. The plugin stops being self-documenting.
- **Hybrid.** Keep the pure task pages (file/URL) in the extension; move everything conceptual
  (how-it-works, ai-assist, full-conversion, manual-tools pipeline) to the kit. *Trade-off:* splits
  the extension's own manual mid-way — `ai-assist` and `manual-tools` are things you do *in the
  plugin*, so exiling them reads oddly.
- **Consolidate by depth (chosen).** Move only the **deep architecture + algorithm** to the kit as
  one canonical page; keep the extension's **task manual** in place; shrink the extension's
  `how-it-works` to a short two-engine overview that links to the kit for the full details.

## Decision

Consolidate **by depth, not wholesale.** A new canonical page —
[`ai-dev-kit/conversion-architecture`](https://unysonplus.github.io/ai-dev-kit/conversion-architecture)
— now holds the full pipeline (capture → extract → apply → review → build), section detection,
chrome-vs-content, the role→shortcode map, the navigation and footer-widget mappers, design-token
extraction, the two kept-in-sync implementations, and exactly where AI fits. The extension's
`how-it-works` is reduced to a short two-engine overview (deterministic / capture service / optional
AI) that links out to that page. All the extension **task** pages stay put. Cross-links run both
directions.

## Why

The right axis to split on is **audience/depth, not location**. The deep architecture is shared by
both paths, so it belongs in exactly one canonical place — and the kit, whose whole reason for being
is "how conversion really works and how to improve it," is the natural home. But the extension is a
standalone product; its docs must let a `wp-admin` user convert a site without ever meeting the kit.
Keeping the task manual in the extension preserves that self-sufficiency, while moving the deep
reference eliminates the duplication and the "which how-it-works is authoritative?" ambiguity. The
plugin's own AI-assist stays documented as a plugin feature, distinct from the kit's agentic build.
