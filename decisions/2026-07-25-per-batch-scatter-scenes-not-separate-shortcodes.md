---
slug: per-batch-scatter-scenes-not-separate-shortcodes
title: "Per-batch scatter with synced text: one Stage of scenes, not five separate galleries"
authors: [jon]
tags: [animation, architecture]
date: 2026-07-25
description: "Poly.app's Discover section is a run of 'batches' — each a set of photos that scatters in and out with its own centered heading. Reproducing that raised a fork: use one cycling Photo Scatter gallery, five separate gallery shortcodes (one per batch), or make each batch a scene in one scrollytelling Stage. We chose scenes: each batch is one editable column (a centered heading + its OWN scatter), and the gallery reads its scene's scroll slice so text and images enter and leave together. This records why the single-gallery and separate-shortcode options lost, and the one framework change that made scenes work."
---

**The question:** Poly's Discover section plays as a sequence of *batches* — each batch is a set of
photos that scatters onto the desk, holds around a centered line of text, then scatters away as the
next batch (with different photos and a different line) arrives. How do we build that so each batch
has its **own images, its own text, and its own entrance/exit** — and stays editable in the builder?

<!-- truncate -->

## Context

We already had a single Photo Scatter gallery with a `scroll_cycle` mode that cycles image *batches*
automatically (`batches = images ÷ cards-per-set`). That's great when you just want images cycling.
But Poly pairs **text with each batch** — a centered heading that's synced to that batch's scatter.
A single gallery has one set of options and no per-batch text, so it can't express "batch 2 has
these images, this heading, and enters from the top." The user's instinct was to reach for one
gallery shortcode per batch.

## Options considered

- **One cycling gallery (`scroll_cycle`).** Simplest, one element — but it has a single `from`/`exit`
  and no place to attach per-batch text. Can't do "different heading + different images per batch."
- **Five separate Photo Scatter shortcodes,** one per batch. Each naturally has its own images and
  enter/exit. But free-floating galleries all read the *same* scroll position, so they'd animate
  **simultaneously**, not in sequence; making them play in order means hand-gating each to a scroll
  range, and you manage five modals that can drift.
- **Each batch = a scene in one scrollytelling Stage (chosen).** One pinned Stage; every beat scene
  is a column holding a centered heading **and** its own Photo Scatter of that batch's images. The
  Stage already sequences scenes in scroll order, so batch 2 waits its turn automatically, and text
  ↔ image sync is free because they share one scene on one timeline.

## Decision

Build per-batch sections as **scenes in a single Stage**. Each batch is one editable column: a
centered heading + a `photo_scatter` (its own images, `center_clear:'yes'` so the photos ring the
title, a single set so all its images scatter together, its own `from`/`exit`). Different images,
text, and direction per batch — each batch fully replaceable in the builder.

The one framework change that made it work: a photo_scatter nested in a Stage now reads **its own
scene's scroll slice**. The Stage publishes each beat scene's index (`__beatIndex`); the gallery
remaps the story's global progress to `[beatIndex, beatIndex]` (the same mechanism a ranged persist
layer already used for `[from,to]`). So the scatter flies in, holds, and sweeps out exactly as its
scene enters and leaves. A new **"Keep center clear"** option rings the cards around the middle so
the heading stays readable.

## Why

- **The Stage is the sequencer.** The reason five separate galleries fail — no coordination — is
  exactly what a scrollytelling Stage provides for free. Scenes play one at a time, in order.
- **Sync comes from sharing a scene.** Text and images on the same scene share one scroll timeline,
  so they enter and leave together with no manual alignment. Scene-local remapping is what ties the
  scatter's motion to that.
- **Editability is preserved and even improved.** Each batch stays one column (a title + a gallery)
  — the "every element user-replaceable" rule holds. And per-batch images are *cleaner* here than in
  the single cycling gallery, where all images share one pool with no way to say "these belong to
  batch 2."
- **The single `scroll_cycle` gallery still has its place** — when you want images cycling with *no*
  per-batch text, it's the lighter choice. Two tools, two jobs: cycle-in-one-gallery for pure image
  batches, scene-per-batch when each batch carries its own copy.

The general lesson: when repeated content needs to play *in sequence and stay in sync with text*,
reach for the scrollytelling Stage's scene model and let child elements read their scene's slice —
not a pile of independent elements racing the same scrollbar.
