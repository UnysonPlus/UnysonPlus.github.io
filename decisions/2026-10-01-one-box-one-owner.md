---
slug: one-box-one-owner
title: "Why the box-owner rule had to be enforced twice, in two languages, at the point where every path converges"
authors: [jon]
tags: [site-converter, architecture]
date: 2026-10-01
description: "A card's skin is painted by exactly one node — the shortcode when it is alone in its container, the container when it is not. That rule was enforced by a flag on one code path, which guarded one of several routes to the same shape, and did not exist at all in the JS twin. 18% of boxed containers in the corpus painted the same preset twice, nested. The decision: enforce it as a post-pass on both paths, after the tree is assembled, rather than adding a flag to every builder that can reach the shape."
---

**The question:** the rule that decides whether a card's box belongs to the shortcode or to its container already existed on the column path. Should the flexbox path get the same rule — and if so, where?

<!-- truncate -->

## Context

A card wears a skin: a fill, a border, a radius, a shadow, a hover. Exactly one node should paint it, and which one depends on how many shortcodes share the container:

- **One shortcode in the container** → the shortcode owns it (`box_style` on the icon box).
- **Two or more** → the container owns it (`border_preset` on the column or flexbox), because only the container wraps them all.

The column path enforced this with a `$box_via_class` flag: the branch that hands the box to a lone icon box sets the flag, and the later container fallback stands down when it sees it.

A flag set on one branch guards one route to the node. The shape is reachable by others. The panel builder registers a panel's skin onto its flexbox and then builds its blocks inside — and when the single block is a card carrying that same skin, the icon box registers it a second time. Both registrations normalise to the same slug.

The JS twin had no equivalent at all. Its Box-Preset census runs two independent loops: one points every icon box at its preset, the other every column and flexbox at the same lookup. Neither loop knows what the other did.

The result, measured: **24 of 134 boxed flexboxes (18%) wrapped exactly one icon box**, across 7 of the 22 sites with a boxed flexbox at all — each shipping `boxp-x` on the flexbox *and* `boxp-x` on the icon box inside it. Two borders, two fills, two radii, one nested inside the other, plus the inner card's own padding.

## Options considered

**Add a `$box_via_class` equivalent to each builder that can reach the shape.** Mirrors what already exists. It also means the rule's correctness depends on remembering to set a flag in every present and future builder — and the defect being fixed is precisely that someone didn't.

**Collapse at the point of assignment.** Have the second census loop check what the first one did. Workable in the JS, where both loops are adjacent; not available in the PHP, where the assignments are hundreds of lines and several builders apart.

**Collapse as a post-pass, after the tree is assembled.** One place, which every route reaches by definition, because it runs on the finished tree rather than on any path through it.

## Decision

A post-pass on both paths: `Mapper::collapse_double_box()` in PHP, called beside the LCP-image pass; `collapseDoubleBox()` in the JS census, after both assignment loops so it cannot depend on their order.

Only an **exact** duplicate collapses: both sides assigned, same slug. The container drops its preset; the child keeps it, per the rule — one shortcode, the shortcode owns the box.

## Why

**A rule enforced per-path is enforced per-path you remembered.** The flag was correct and did its job on the route it guarded. What it could not do is cover a route added later by someone who didn't know the flag existed. A convergence point has no such failure mode: new builders are covered the day they are written, because they all produce a tree and the pass runs on the tree.

**The negatives are the whole design.** Collapsing on "container and child both have a preset" would be wrong — two *different* presets are a card inside a panel, which sources really do draw as two boxes. Collapsing on "container has a preset and one child" would also be wrong — a child with no preset is the legitimate container-owned case. Requiring both sides assigned *and* the slugs identical is what makes the pass safe enough to run unconditionally on every tree.

**Measure before porting, and be honest about which path is broken.** The investigation began from the assumption that the PHP path was doubling. It was not: rebuilt through the PHP twin, the same capture produced six boxed flexboxes wrapping one icon box with the child correctly bare in all six — the flag works. The 24 doubles were in the JS output. The PHP half of this change is therefore a declared twin of a JS rule rather than a fix for an observed PHP defect, and that is worth saying out loud rather than letting the symmetry imply otherwise.
