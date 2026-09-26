---
slug: menu-item-styles-base-modifiers
title: "Why menu item styles split into a base treatment plus stackable modifiers"
authors: [jon]
tags: [header, css, architecture, back-compat, option-types]
date: 2026-09-27
description: "The header Menu Item Style picker had ten flat choices, but three of them rendered the same fill and one was really an opacity tweak that belonged on top of any style. Rather than keep bolting new tiles onto a list that already contained duplicates, the control split in two: a single-select primary treatment (the indicator) and a multi-select set of orthogonal modifiers that stack on any primary."
---

**The question:** The Menu Item Style control offered ten treatments, but Box and Highlight rendered from the identical fill rule, Pill was just Box with a rounder radius, and Fade only changed the resting opacity — something that would happily sit on top of *any* other style. We wanted to add premium treatments (a gliding indicator, a gradient underline, a marker swipe). Do we keep appending tiles to one flat picker, or is the list itself the wrong shape?

<!-- truncate -->

## Context

The styles are applied by a body class (`menu-style-<slug>`) that the theme's stylesheet keys the header nav off. Auditing those rules, the ten choices were not ten looks:

- **Box and Highlight shared one rule.** Both drew a soft filled background at the default radius, with nothing to tell them apart. Highlight added nothing.
- **Pill was Box + `border-radius: 999px`.** So the three "fill" styles were one fill with a shape choice.
- **The two underlines looked identical at rest**, differing only in the hover motion.
- **Fade was not a peer at all.** It dimmed the inactive items and lifted the active one to full strength — an effect that composes with an underline, a fill, a bar, anything. It only sat in the list because there was nowhere else to put it.

So the picker was really mixing two different kinds of thing: a handful of *mutually exclusive* indicators (you can only have one primary treatment on an item) and a couple of *orthogonal* effects that modify whichever indicator you chose. A flat list cannot express that, which is exactly why it grew duplicates — every orthogonal idea had to be flattened into its own slot, and every fill variant needed a near-copy.

## Options considered

**Keep the flat picker and add more tiles.** The path of least resistance. It ships the new premium styles fastest, but it doubles down on the shape that produced the duplicates: the gliding pill would sit next to Pill and Box as if it were a third fill, Glow would need its own slot even though it wants to combine with an underline, and Fade would still be pretending to be a peer.

**Group the tiles but keep one value.** Label the choices by family (Underlines / Fills / Bars / Text) so the list at least reads as organized. It helps browsing, but it does not fix the redundancy — Box and Highlight are still two slots for one look — and the orthogonal effects (bold, glow, letter-spacing, fade) each still cost a slot and can never be combined.

**Split into a base treatment plus modifiers.** One single-select picker for the primary indicator (the one thing that is genuinely exclusive), and a separate multi-select for the orthogonal extras that stack on any primary. The fills become one grouped family; Fade becomes a modifier; and new combinations (Underline + Bold + Glow) fall out for free without new tiles.

## Decision

The control is now a **primary treatment** (single-select, grouped: Underlines, Fills, Bars, Marker, Dot, and the gliding Sliding indicator) plus **Style Modifiers** (multi-select: Bold, Letter-spacing, Uppercase, Glow, Fade the inactive items). The theme emits `menu-style-<primary>` and one `menu-mod-<slug>` per modifier; each CSS rule is independent, so any combination just works.

The dead duplicate went away in the process: **Highlight was re-specified as a real felt-tip Marker** (an angled, semi-transparent swipe, distinct from the clean Box fill), and **Fade became the Fade-rest modifier**. Old saved values keep working through a one-line migration — `highlight` maps to Marker, `fade` maps to primary None plus the Fade-rest modifier.

The flagship Sliding indicator ships CSS-first: a single pill that a small script glides between items, with a static current-item fill as the fallback when scripting is unavailable.

## Why

A picker that forces orthogonal choices into mutually-exclusive slots will always grow duplicates, because the only way to offer "underline, but bold" is to add an "underline-bold" tile — and then "underline, but bold, on a dark header with a glow" is impossible at any tile count. Separating the axis you pick *one* of from the axes you can pick *any* of removes the duplicates that already existed and makes the next premium idea a modifier or a primary, never a near-copy of an existing tile. The test we kept returning to: can a user get "an underline that also goes bold and glows"? Before, no combination of tiles could express it; now it is three checkboxes.
