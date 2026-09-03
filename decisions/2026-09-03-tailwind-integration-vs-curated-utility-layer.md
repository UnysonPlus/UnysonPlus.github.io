---
slug: tailwind-integration-vs-curated-utility-layer
title: "Why not integrate Tailwind into UnysonPlus (even for the Site Converter)"
authors: [jon]
tags: [architecture, page-builder, performance]
date: 2026-09-03
description: AI-generated sites use Tailwind, so the question was whether UnysonPlus should adopt Tailwind wholesale to make the layout model modern and the Site Converter easier — but Tailwind's value is a build-time JIT that a database-driven page builder can't run, the plugin already owns a curated utility layer, and the converter maps from computed styles regardless of the source framework, so the decision is to keep the curated layer and fix the real UX friction directly.
---

**The question:** Modern, AI-generated sites are built with Tailwind (flex/grid utilities). Should we
just **integrate Tailwind into UnysonPlus** — swap the plugin's own utility classes for Tailwind's — so
the layout model is modern *and* the Site Converter has an easier job converting Tailwind sources?

<!-- truncate -->

## Context

The trigger was a builder frustration: two `1/2` Divs dropped into a **Section** (a `display:block`
band) render stacked, not side-by-side. That felt like a sign the layout system was behind the times,
and Tailwind — what AI tools emit — looked like the modern answer, with a bonus for the converter whose
whole purpose is to rebuild such sites.

Two things had to be separated. First, the stacking itself is **not** a framework problem: a Tailwind
`<section class="block"><div class="w-1/2">` stacks in exactly the same way. It is a "our default
container is block" UX choice, fixable directly. Second, UnysonPlus already renders through a **curated
utility layer** — `frontend-grid.css` (`d-flex`, `flex-row`, `justify-content-*`, `fw-col-*`) plus
generated `--gap-*` vars and scoped rules. The modern Div is built *on* that layer; it is not Bootstrap
bolted on, it is the plugin's own flex/grid utilities.

## Options considered

- **Swap the runtime output to Tailwind classes (`flex`, `w-6/12`, `gap-4`, `justify-center`).** Tailwind's
  power is its **build-time JIT**: it scans *source files* and emits only the classes used. A page builder's
  "source" is **user content in the database**, edited with no build step — so the choices are ship the
  entire ~3&nbsp;MB utility sheet (Tailwind explicitly discourages this), run a Node/PostCSS build on the WP
  host at save-time (most shared hosts have no Node — a dealbreaker for a distributed plugin), or hand-roll a
  Tailwind-subset generator in PHP, which is *what the plugin already does*. On top of that it renames every
  class and breaks every already-saved page. High cost, and it imports Tailwind's one weakness (no build step)
  into the exact environment that can't provide one.
- **A "copy the Tailwind classes through" converter mode.** The one place Tailwind could plug in: copy a
  source's `flex gap-4 md:grid-cols-3` verbatim and load Tailwind. But the output would no longer be
  **editable in the builder** (no option-value model), and it would need the source's full Tailwind config —
  custom scales, arbitrary values like `[17px]`, dark/hover variants. That is "mirror the HTML," not "convert
  to an editable UnysonPlus page" — which is the plugin's whole value over pasting HTML.
- **Keep the curated utility layer; fix the real friction directly.** Leave rendering as-is (it already
  produces clean flex/grid), and solve the stacking with a focused builder change: when a child is given a
  fractional Width inside a **block** parent, auto-promote that parent to Flex (row, wrap). Block stays the
  default for stacked content; making columns turns the container into a row.

## Decision

**Do not integrate Tailwind.** Keep UnysonPlus's curated utility layer as the rendering substrate and fix
the layout friction at the builder level. The Site Converter stays framework-agnostic **by design** —
the capture pipeline reads *computed* styles (`display:flex; gap:16px; justify-content:center`) and maps
them to option values, so whether a source used Tailwind, Bootstrap or hand-written CSS is irrelevant to
the mapping; the plugin speaking Tailwind would add nothing on the input side. If Tailwind familiarity is
ever wanted, the safe form is an **opt-in** "allow Tailwind utility classes + load a curated build" toggle
for power users — never a replacement of the core layer.

## Why

Tailwind's value is a compiler that runs where UnysonPlus can't run one; adopting it would trade backward
compatibility and a ship-anywhere plugin for a bigger stylesheet and a rename, while the converter — the
stated motivation — gains nothing because it already works from resolved styles, not class names. The
actual goal ("columns should just work; modern-site conversion should be smooth") is served by keeping the
editable option model and removing the specific UX friction, not by re-basing the whole system on a
framework whose defining strength is unavailable at runtime.
