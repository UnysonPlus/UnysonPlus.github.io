---
slug: shortcode-home-distribution-intent
title: "Where should a new shortcode live — decide by reuse scope alone, or also ask distribution intent?"
authors: [jon]
tags: [conversion, architecture, shortcodes]
date: 2026-08-03
description: "The shortcode-creation flow decided a new shortcode's home purely by reuse scope (reusable → core plugin, bespoke → child theme) — it never surfaced how the user wants to SHIP it. Those are different axes: a reusable shortcode the user wants to distribute as their own add-on shouldn't be silently folded into the framework. We added a distribution-intent step (ask when unclear) with three real homes: core plugin, child theme, standalone extension."
---

**The question:** when an agent creates a new shortcode, how does it choose where the shortcode lives —
and should it *ask* the user how they want to install / distribute it (child theme vs an uploadable zip
they can hand out), or just decide?

<!-- truncate -->

## Context
The documented flow (`sample-shortcode/` + `HOW-TO.md` + `docs/extending.md`) decided the home by a single
heuristic: **reusable across every site → the core plugin; one brand's bespoke element → the child theme.**
The loader actually scans four homes (core, uploads dir, parent theme, child theme), and there's also the
standalone-**extension** path — but the flow never *asked* the user anything; it inferred the home from
reuse scope alone.

That misses a second, independent axis: **distribution intent.** "Is this reusable?" and "how do I want to
*ship* it?" are not the same question. A reusable shortcode the user intends to **sell or hand out as their
own add-on** should be a self-contained, distributable package — not quietly absorbed into the framework
release; and a one-off they'll only ever use on one site is fine in the child theme. Deciding purely by
reuse scope can therefore put a would-be product in the wrong place.

## Options considered
1. **Keep deciding by reuse scope only.** Simplest, zero prompts — but silently folds a distributable
   add-on into the core plugin, and never offers a standalone package.
2. **Always ask the user how to ship every shortcode.** Correct on intent, but a per-build prompt is
   friction for the common, obvious case (an internal reusable element).
3. **Decide by reuse scope by default, but ASK when the intent is unclear** — surfacing three real homes:
   core plugin, child theme, standalone extension. **Chosen.**

## Decision
- **Two axes, resolved together.** Reuse scope picks the *default* home; **distribution intent can override
  it.** When the task doesn't make the intent obvious, the agent **asks once** (per shortcode, not per
  build): ship it in the **core plugin** (auto-updates for every site, becomes part of the framework
  release), inside **this site's child theme** (travels with the theme, itself an uploadable `.zip`), or as
  a **standalone extension** (its own distributable module, activatable under Unyson+ → Extensions, handed
  out independently)?
- **A reusable shortcode meant for independent distribution → a standalone extension, not the core plugin.**
- Documented in `docs/extending.md` ("Deciding the home — reuse scope × distribution intent") with a table
  of all four loader homes + their version markers, and pointed to from `sample-shortcode/HOW-TO.md` as a
  "decide the home first" step. The porting procedure is identical for every home — only the destination
  folder + version marker change.

## Why
Reuse scope and distribution intent are genuinely orthogonal, and conflating them puts shortcodes in the
wrong home — most damagingly by absorbing a user's would-be product into the framework, where they can't
ship or update it on their own terms. Asking *only when unclear* keeps the common obvious case frictionless
while giving the user control exactly when it matters. (A true single-shortcode uploadable-zip packaging
format — lighter than a theme or a full extension — is noted as a possible future path but not built here;
the child-theme and standalone-extension zips already cover distribution.)
