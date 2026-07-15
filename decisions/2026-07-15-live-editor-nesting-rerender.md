---
slug: live-editor-nesting-rerender
title: "Why the live editor re-renders from the model to nest a column instead of moving the DOM"
authors: [jon]
tags: [architecture, live-editor]
date: 2026-07-15
description: The live editor drags real DOM nodes, but nesting a column needs an inner row that doesn't exist in the page yet. Rather than hand-build that inner-row DOM in the frame, a column-into-column drop re-renders the corrected model — reusing the PHP corrector instead of duplicating row-synthesis in JS.
---

**The question:** The live editor moves actual front-end DOM nodes when you drag something. But
nesting a column needs an inner `.fw-row` that doesn't exist in the rendered page yet — the corrector
only creates it at render/save time. So when I drop a column into another column, do we hand-build
that inner-row DOM inside the editor frame, or do we re-render?

<!-- truncate -->

## Context

The live editor is a **separate client-side implementation** from the classic backend builder. It
edits the rendered front-end HTML in an iframe and, for a normal move, physically relocates the DOM
node (column drops resolve to a section's `.fw-row`). The shell mirrors the move in the model.

Nested columns break that assumption: a column's inner row is **synthesized by the PHP corrector**,
so it isn't present in the current DOM. Two useful facts, though: the shell's `moveItem` already
nests correctly in the *model* (a column dropped on a column lands in the parent column's `_items`),
and the `render_page` endpoint runs **with correction on**, so re-rendering the model produces the
inner row for free.

## Options considered

- **Incremental DOM surgery.** Detect the nest drop, create (or find) an inner `.fw-row` inside the
  target column in the frame, and move the dragged node into it. Keeps the snappy in-place feel, but
  it's a second, JS-side re-implementation of what the PHP corrector already does — and the two would
  have to agree forever on when/where an inner row appears.
- **Re-render from the corrected model.** After the model move, ask the server to render the page
  (correction on) and swap the result into the canvas (`renderPageToCanvas` / `replace`). The inner
  row comes back correct because the corrector built it. Costs one full-canvas re-render on a nest
  drop.

## Decision

**Re-render.** The frame detects a column-into-column drop and sends `move-item` with a `nested`
flag; the shell nests the node in the model and then calls `renderPageToCanvas()` instead of the
usual in-place DOM move. Ordinary (non-nesting) sibling moves keep the fast, incremental DOM path —
only a nest triggers the re-render.

## Why

Correctness over a little snappiness. The inner row is the corrector's job; re-rendering **reuses it
verbatim** rather than duplicating row-synthesis logic in the editor's JavaScript. Hand-built
inner-row DOM would be exactly the kind of JS-vs-PHP divergence the project fights everywhere else —
two implementations of one rule, drifting apart over time. The cost is bounded: a full-canvas
re-render happens only on the comparatively rare nest action, while everyday drags stay incremental.
Reaching for the existing, already-correct server render was cheaper to build and cheaper to keep
right than a parallel client-side one.
