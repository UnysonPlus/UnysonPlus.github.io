---
slug: builder-canvas-now-not-later
title: "The plan said the builder canvas rewrite needed a forcing reason. Why did we do it anyway?"
authors: [jon]
tags: [architecture, page-builder, javascript]
date: 2026-08-16
description: The modernization plan deferred the builder canvas until something concrete forced it — a feature it blocked or a bug class it caused. Nothing did, and we rewrote it anyway. Decision — the deferral rule was protecting live sites that do not exist yet, so pre-launch inverts it. Includes the three undocumented Backbone behaviours that actually broke things, none of which were visible in the code being replaced.
---

**The question:** the modernization plan is explicit that step 6 — rewriting the page-builder
canvas off Backbone — should wait for "a concrete reason: a feature it blocks, a bug class it
causes. Not on principle." No such reason had appeared. So why did we do it now?

<!-- truncate -->

## Context

By 2.16.16, Backbone was down to three files — `builder.js`, `helpers.js` and the flexbox
page-builder item — plus the vendored `backbone-relational` library. Everything else had been
converted incrementally, each piece independently shippable.

The remaining work looked small by file count and large by risk. **23 files extend
`builder.classes.*`**: 14 form-builder item types, 5 page-builder item types, the newsletter-crm
email builder, the section-like factory and the contact-form item. None of them contain Backbone;
all of them depend on the API those three files expose.

That asymmetry is what the deferral rule was really about. A canvas rewrite is cheap to start and
expensive to get wrong, and getting it wrong means broken pages on live sites.

## Options considered

**Keep deferring.** Defensible on the plan's own terms, and the plan's terms had been right every
previous time. The cost: the 23-consumer surface is the cost driver, and it only grows. Every new
item type and extension adds another implicit contract to preserve. Deferring makes the same work
strictly more expensive later.

**Do the isolated parts only.** Convert the two trivial Backbone users (an event mixin, an empty
model used as an event bus) and stop. This is what 2.16.16 did, and it was right — but it takes
Backbone from five files to three and no further. The canvas is the canvas.

**Rewrite the canvas now.** Add `fw.Collection`, replace the single `backbone-relational` `HasMany`
relation with a declarative `nested` option on `fw.Class`, and swap the four base classes while
keeping every `builder.classes.*` name and signature so the 23 consumers need no changes.

## Decision

Rewrite it now.

The deciding argument was not technical. **UnysonPlus has not been marketed.** The deferral rule
exists to protect live sites from a canvas rewrite; there are no live sites. The premise the rule
depends on does not currently hold, so the rule should not currently bind.

Three consequences follow from that one fact:

- **The cost driver only grows.** Twenty-three consumers is the cheapest this will ever be.
- **Breaking changes are nearly free.** Post-launch, changing `builder.classes.*` means a migration
  path, deprecation shims and support load. Today it means editing files in one repository.
- **The canvas is the product.** Gutenberg blocks are additive and genuinely useful, but nobody
  chooses this plugin for them. Modernizing the side path while the core path ran on Backbone plus
  `backbone-relational` was backwards.

## Why

The honest version of this decision is that a rule was being applied without re-testing its
premise. "Wait for a forcing reason" was written when the assumption was live sites at risk. Quoting
it after that assumption stopped holding is cargo-culting your own plan.

What did **not** change is the correctness bar. No users lowers the *risk* of a mistake; it does not
make a silently broken form builder acceptable. So the work still began by writing down the contract
— cataloguing exactly what all 23 consumers call — before touching a base class.

That turned out to matter more than the rewrite itself.

## The part worth remembering

Three behaviours broke things, and **none of them is visible in the code being replaced**:

1. **`fw.View` had no `this.$()`** — Backbone's scoped selector (`this.$el.find(sel)`), used in 26
   places across form items, the contact-form item and the email builder. Every builder item threw
   mid-render and vanished from the canvas.

2. **Backbone collections have no `cid`; only models do.** `builder.js` duck-types on precisely that
   to tell one from the other, because a single handler serves both `add` (model, collection) and
   `reset` (collection). Giving `fw.Collection` a `cid` made every reset look like a model, and the
   canvas failed to load at all.

3. **`backbone-relational` defers the constructor's `change` events until after `initialize()`.**
   That deferred event is the *only* thing that performs an item's first render, because item view
   subclasses override `initialize` without calling `render()`. Without it, items were created,
   inserted into the canvas, and stayed empty — no error anywhere.

The third is the one to carry forward. It is undocumented, it is load-bearing, and it fails
silently. It was found by loading the real `backbone-relational` alongside the replacement and
comparing event sequences — not by reading either implementation.

The general lesson, now twice-learned (the first time was
[replacing the media frame](/decisions/replacing-the-wp-media-modal-frame)): **what breaks is never
the code being replaced, it is the implicit contract its consumers depend on.** Verify against the
real library, not against your model of it.

## Status

Accepted, and complete in 2.16.18. Backbone and Underscore are both at zero files across the
framework; the `backbone-relational` library is deleted and its script handle unregistered.
`jquery-ui-sortable` / `draggable` were deliberately left in place — replacing the drag-drop model
is an interaction rewrite, not a dependency swap, and deserves its own decision.

The persistence format was the hard constraint throughout: the builder saves with
`JSON.stringify(rootItems)`, so that string *is* the page-builder storage format for every page ever
built. It was verified byte-identical against the real `backbone-relational` across load, mutation
and round-trip before anything shipped.
