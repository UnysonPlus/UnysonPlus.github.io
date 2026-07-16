---
slug: react-adoption-incremental-audit-first
title: "Why we're adopting React incrementally, not rewriting UnysonPlus"
authors: [jon]
tags: [architecture, javascript]
date: 2026-07-16
description: WordPress core and Gutenberg are React; UnysonPlus's builder is Backbone + Underscore + jQuery. The question was whether to rewrite the builder in React. We decided against a rewrite — the Backbone core is load-bearing and stable, and a rewrite is a multi-year, high-risk effort with no user-facing payoff. Instead we adopt React incrementally via WordPress's bundled `wp.element`, starting with a self-contained admin surface (the Shortcodes "Elements" management page), leaving the builder canvas, option types and Live Editor on Backbone. And we run a full architecture audit before writing any React code.
---

**The question:** Almost everything modern — WordPress core, Gutenberg, most new page builders — is
React. UnysonPlus's page builder, option types and Live Editor are Backbone.js + Underscore templates +
jQuery. Should we rewrite the builder in React?

<!-- truncate -->

## Context

The builder stack is the same era as pre-Gutenberg WordPress: `fw.OptionsModal`, `Backbone.View`
item scripts, `_.template`, the `fwEvents` bus, jQuery option types. It is **load-bearing and stable** —
and WordPress core still ships Backbone (`wp.Backbone`, `wp.media`), so it is not going to break.

Two facts shape the choice:

- A framework rewrite of a mature product (the builder, ~40 option types, the Live Editor, all the
  Backbone plumbing) is *months to years* of work with large regression risk and **zero user-facing
  value** — users care about features and stability, not the framework under the modal. "Rewrite it in
  the trendy framework" is a well-known product-killer; the industry is mixed anyway (Elementor is still
  Backbone/Marionette, Bricks is Vue, Divi's React rewrite took a large team years).
- WordPress already loads React in wp-admin as `wp.element` (+ `wp.components`, `wp.data`,
  `wp.apiFetch`). So a new React surface can **depend on those handles and not bundle React itself** —
  which makes *incremental* adoption cheap and low-risk, even though a *rewrite* is expensive.

## Options considered

- **Full React rewrite of the builder.** Aligns with WP/Gutenberg long-term, but enormous cost + risk,
  freezes feature work, and delivers nothing users can see. Only justified by a concrete forcing function
  (go Gutenberg-block-native, the Backbone core actively blocking features, or hiring).
- **Stay Backbone forever.** Zero risk today, but the ecosystem momentum is clearly toward React, and new
  contributors increasingly won't touch Backbone.
- **Incremental adoption via `wp.element`.** Build *new, self-contained* surfaces in React while keeping
  the Backbone core intact; React and Backbone coexist on the same page. Modernize where it pays off,
  never take the big-bang risk.

## Decision

**Adopt React incrementally, audit-first — no rewrite.** Concretely:

- Keep the page-builder canvas, the option types / `fw.OptionsModal` (the Backbone contract), and the
  Live Editor **on Backbone**. Do not touch them as part of "React adoption."
- Build **new, isolated admin surfaces** in React using `wp.element` + `@wordpress/components` +
  `@wordpress/api-fetch`, behind their own `@wordpress/scripts` bundle, reusing the existing PHP/AJAX
  endpoints. Each piece must be non-breaking, with a fallback to the old surface until it's verified
  identical.
- **First candidate:** the Shortcodes "Elements" management page (`class-fw-shortcodes-settings-page.php`)
  — a standalone `render_page` (searchable card grid + enable/disable + install-from-ZIP/GitHub), no
  builder entanglement, state-heavy, low blast radius. Its real value is establishing the toolchain +
  pattern every later React piece reuses.
- **Before any code, run a full architecture audit** (JS map, build pipeline, enqueue patterns, a
  self-contained-vs-entangled surface inventory, and a ranked React-adoption roadmap), delivered as a
  written report for review.

## Why

The value of UnysonPlus is its shortcodes, presets, theme system and converter — not the JS framework.
The Backbone builder works, so we don't rewrite working, load-bearing code without a forcing function.
But because WordPress hands us React for free in the admin, we *can* modernize the edges cheaply: start
with an isolated, state-heavy page, prove the pipeline, and port piece by piece — slowly but surely —
with the option types and canvas untouched. If a real driver appears later (Gutenberg blocks, hiring, the
builder hitting hard limits), a larger migration can be revisited on top of the patterns the incremental
work establishes.

Status: **Accepted.** The architecture audit runs first, in a dedicated session, before any React or
build code is written.
