---
slug: sections-list-to-structure-navigator
title: "Why the Live Editor's Sections panel becomes a nested Structure navigator"
authors: [jon]
tags: [live-editor, architecture]
date: 2026-08-05
description: The Live Editor's left panel only listed top-level sections, so you couldn't jump to a nested column or a small, overlapped element. We're turning it into a full Structure tree (section → column → element) with click-to-select, expand/collapse and canvas-selection sync — because the editor already computes the whole model + a parentId index, so the hierarchy is essentially free to surface.
---

**The question:** Should the Live Editor's flat "Sections" panel become a full nested **Structure**
tree (section → column → element), like the navigators in Bricks / Elementor / Webflow?

<!-- truncate -->

## Context

The Live Editor's left panel listed only **top-level sections** — click a row to jump to it, drag to
reorder, double-click to rename. That's genuinely useful on a long page, but it stops at the section
boundary: there's no way to reach a specific **column**, or a leaf element that's small, overlapped, or
buried inside a busy section. The canvas breadcrumb (`Section ▸ Column ▸ Heading`) lets you climb *up*
from a selection, but nothing lets you dive *down* into the structure.

The important part: the data is already there. The editor holds the full builder model and builds an
**index with a `parentId` for every item** (used for the breadcrumb and selection). So the entire
hierarchy is already computed — the flat panel was just surfacing a top-level slice of it. Every
pro-grade builder (Bricks, Elementor, Webflow) ships a structure/navigator tree for exactly this reason.

## Options considered

| Option | Trade-off |
|---|---|
| **Keep the flat Sections list** (status quo) | Simplest, zero new surface — but navigation dead-ends at sections; you can't select a nested column or a hard-to-click element from the panel. |
| **Nested Structure tree — Phase 1** (chosen) | Click any node to select + scroll-into-view, expand/collapse, active-row synced to the canvas selection; keeps section rename + section drag-reorder. Reuses the existing model/index, so it's mostly rendering + selection-sync. |
| **Full tree with drag-reorder at every level, now** | Most complete, but tree drag-reorder (move an element between columns) overlaps the not-yet-built canvas drag-reorder, and is a bigger, riskier build that would delay the 80%-value navigation win. |

## Decision

Turn the panel into a **nested Structure navigator** and ship it as **Phase 1**:

- Recursive tree: **section → column → element** (rows/wrapping columns unwrapped so the tree reads
  cleanly), built from the existing model.
- **Click any node** → select it in the canvas and scroll it into view; **expand/collapse** each node.
- The tree's **active row stays in sync** with the canvas selection (selecting on the canvas highlights
  and reveals the row, expanding its ancestors).
- Keep the section **rename** (double-click → writes the section's CSS ID / anchor) and section
  **drag-reorder** (the tree collapses during a drag so it's a clean row swap).
- Rename the panel **"Sections" → "Structure"**; leaves get type icons/labels (Heading, Text Block,
  Icon Box…), columns read "Column", sections keep their custom name.

**Deferred to Phase 2:** drag-reorder *within* the tree (moving an element between columns, a column
between sections). That's bundled with the canvas drag-to-reorder work rather than built twice.

## Why

- **The hierarchy is already computed.** With the model + `parentId` index in hand, Phase 1 is mostly a
  rendering and selection-sync job — high value for modest effort and low risk (no new data plumbing, no
  view/shortcode changes; it lives entirely in the live-editor panel).
- **The model is shallow.** Pages are `section → column → leaf` (plus occasional nested columns), so the
  tree stays short and readable — it won't sprawl the way an arbitrary-nesting builder's tree can.
- **It completes the navigation story.** The breadcrumb already lets you climb up from a selection; the
  tree lets you dive down and see the whole composition at a glance — the pairing users expect from
  Bricks / Elementor / Webflow.
- **Deferring cross-tree drag keeps it honest.** Reordering elements across the tree is the same problem
  as canvas drag-to-reorder; doing it once, later, avoids two half-built implementations and keeps
  Phase 1 shippable now.
