---
slug: nested-columns-columns-in-columns
title: "Why nested columns are columns-in-columns (one level), not an Inner Row element"
authors: [jon]
tags: [architecture, page-builder]
date: 2026-07-15
description: I wanted a page-builder column to hold other columns. The choice was a dedicated "Inner Row" element you drag in (Elementor/WPBakery style) versus letting a column accept columns directly and synthesizing the row ourselves — capped at one level. We took the latter because it mirrors the section→row→column model we already have and adds no new element type.
---

**The question:** I want a page-builder column to be able to contain other columns. Do we add a
dedicated "Inner Row" element you drag into a column (like Elementor's inner section or WPBakery's
inner row), or do we just let a column accept columns directly and build the row ourselves? And how
deep should nesting go?

<!-- truncate -->

## Context

The builder's whole tree is `section → row → column → leaf`, but **rows don't exist in the editor**.
The editor tree is only `section → column → simple`; the items-corrector *synthesizes* the rows at
save time, grouping a section's consecutive columns into `.fw-row`s via a width-fitting
`row_container`. Columns are dropped straight into a section.

So "a column can contain columns" has two natural shapes:

- add a **new container element** (an Inner Row / Inner Section) you place into a column, which then
  holds the child columns; or
- let a column **accept columns directly** and have the corrector do to that column's children
  exactly what it already does to a section's children — group them into a synthesized inner row.

There's also a depth question: one level (a column holds columns, those can't be subdivided again) or
arbitrary nesting.

## Options considered

- **Explicit "Inner Row" element.** More visible and intentional in the UI — you can see the inner
  container. But it's a whole new item type: a new shortcode, its own repo, manifest, docs page, and
  option-panel screenshots, plus editor drag/drop wiring. It also introduces a second way to think
  about rows when the rest of the builder treats rows as invisible/synthesized.
- **Columns-into-columns, corrector-synthesized inner row.** Drop a column onto another column; the
  corrector recurses into that column's `_items` and wraps its child columns into an inner `.fw-row`
  — the *same* code path a section uses. No new element type. It's symmetric with the model we
  already have, so the mental model ("columns go in, rows appear at save") doesn't change.

For depth: **one level** vs **unlimited**. One level covers the overwhelming majority of real
layouts (a card grid inside a feature column) and keeps the tree readable; unlimited invites deep,
heavy, hard-to-reason-about trees.

## Decision

**Columns-into-columns, capped at one authoring level.** A column's editor drop logic now accepts
columns; the items-corrector recurses one level into a column's children and synthesizes the inner
row (using a *local* re-entrant `row_container` so the recursion can't clobber the outer loop's
width-fitting state). The one-level cap is enforced **editor-side** — a column already inside a
column refuses further columns (the depth check reads the owning item via the builder's
`collection._item` link). The corrector itself stays depth-agnostic and will wrap columns at any
depth, so a hand-authored or imported deeper tree still renders correctly.

## Why

The builder already models rows as an invisible, synthesized layer. Reusing that — "drop columns
into a column, we grow the row for you" — is the **least new surface**: no new shortcode to build,
version, document, and screenshot, and no second row concept for users to learn. It's the same
`correct_section` logic one level down, so the two behave identically by construction rather than by
maintenance.

Capping authoring at one level is the right default because one level is what the real layouts want,
and it keeps both the editor UX and the corrector bounded. Splitting the cap from the engine —
editor enforces one level, corrector tolerates any — means the common case is simple and safe while
imports never silently break. If we ever genuinely need deeper nesting, it's a UI-gate change, not
an engine rewrite.
