---
slug: interaction-timeline-in-the-live-editor
title: "Why the Interaction timeline is a Live Editor panel, not the Scroll Timeline grown"
authors: [jon]
tags: [animation, animation-engine, live-editor, architecture]
date: 2026-11-11
description: Roadmap I4 planned to grow the front-end Scroll Timeline overlay into a timeline for click, hover and load sequences too. Decision — build the Interaction timeline into the Live Editor, docked under the canvas, timing from the saved step data, and leave the Scroll Timeline for scroll-driven motion.
---

**The question:** The roadmap said the Scroll Timeline overlay would grow into "the timeline for every trigger". When it came to building it, should the Interaction timeline be that same front-end overlay, or something in the Live Editor?

<!-- truncate -->

## Context

- The **Scroll Timeline** is a front-end, admin-only tool. It reads the GSAP ScrollTriggers already running on the page, draws them on a 0–100 % scroll axis, and saves retimed starts and ends to a per-page override (not the builder content).
- **Interactions** are different: their timing is **seconds**, not scroll, and lives in the builder content itself (each step's delay, duration, stagger and order). They run on the Web Animations API, not GSAP.
- The Live Editor already holds the page model, undo and redo, unsaved changes and re-rendering, and its Edit canvas holds every effect still.

## Options considered

1. **Grow the Scroll Timeline.** One tool, but its axis, data source (live ScrollTriggers) and storage (an override layer) are all wrong for Interactions. Retiming an interaction there would have to write into builder content from the front end, outside the editor's undo and Save.
2. **An Interaction timeline in the Live Editor (chosen).** A panel docked under the canvas for the selected element. It draws the steps from the saved data with the same timing rules as the runtime, edits them in the model (undoable, saved with the page), and previews them by scrubbing temporary animations on the real targets in the Edit canvas.

## Decision

The Interaction timeline is a **Live Editor panel**, opened from a pill on the canvas when the selected element has Interactions. The Scroll Timeline stays the tool for scroll-driven motion.

## Why

- **The data lives in the builder,** so the editor that owns the builder model is the right place to change it: undo, unsaved changes and Save all work with no extra code.
- **The timing is in seconds** and computed from the steps. A scroll axis, or reading animations back from the live page, would only approximate it.
- **It keeps the visitor page clean:** nothing extra loads on the front end for it.
- The two timelines cover different things: one shows how far the page has scrolled, the other shows what happens after a hover, click or load.

*Status: Accepted.*
