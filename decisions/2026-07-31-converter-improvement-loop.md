---
slug: converter-improvement-loop
title: "The converter-improvement loop: how to build a section the converter can't yet map"
authors: [jon]
tags: [conversion, architecture, documentation]
date: 2026-07-31
description: "When a conversion hits a section the Site Converter doesn't recognize, what's the exact iteration? We settled a fixed loop: run the converter first, hand-build the bespoke as the TARGET node shape, then teach the converter a recognizer (only for reusable patterns), and verify with the fidelity tool — not by eye — re-running against a pinned snapshot until the checker passes."
---

**The question:** we already decided the converter's job is to *fix the algorithm, not the output*.
But in practice, when a build hits a section the converter can't map yet (e.g. a WooCommerce product
grid), what is the **exact, repeatable iteration** — and when do you actually write a recognizer
versus just hand-build it?

<!-- truncate -->

**Context.** Building the pinky-bites demo, the "Daily Delicacy Lineup" was a product grid the
converter didn't recognize — it shattered into static `icon_box` cards. The tempting move (which we
kept catching ourselves doing) was to hand-build the section and move on. That leaves the converter
exactly as dumb as before, so the *next* clone of a product grid hits the same wall.

**Options considered.**
- *Hand-build every bespoke section, always.* Fast per-site, but the converter never improves and the
  same work recurs forever. Rejected — it's the anti-pattern the whole converter exists to kill.
- *Only ever improve the converter, never hand-build.* Pure, but you have no known-good target to
  write the recognizer against, and a genuine one-off (a site-specific widget) would get a recognizer
  that never fires again — dead weight.
- *A fixed loop that does both, in order.* Hand-build **as the target shape**, then teach the
  converter — but only for reusable patterns.

**Decision.** Adopt a named **converter-improvement loop** (now in `site-build-protocol.md`, Rule −1):
(1) run the converter first and **pin the capture as a snapshot** so re-runs are offline and can't be
invalidated by a changing live site; (2) inspect the output + report; (3) **hand-build the bespoke —
which defines the exact node shape** the mapper must emit; (4) **decide recognizer vs one-off** — a
recognizer only for a *reusable* pattern (product grid, pricing table, logo strip), never for a true
one-off; (5) teach the converter in **both paths (JS + PHP) kept in sync**; (6) re-run against the
snapshot and **verify with `fidelity-check` (incl. the vertical-spacing lens), not by eye** — iterate
until the checker passes; (7) keep a tiny **regression fixture set** so a new rule doesn't mis-fire.

**Why.** The hand-build isn't wasted — it becomes the *spec* for the recognizer, so you write the
mapper against a concrete known-good output instead of guessing. Gating recognizers on "reusable"
keeps the converter lean (no dead one-off rules). Pinning the snapshot fixed a real failure: the
source's product section literally disappeared from the live site mid-build, and without a saved
capture we couldn't have re-verified. And "verify with the tool" replaced the recurring "looks fine to
me" miss — the spacing lens caught a 44px gap the eye and the old checks both waved through. We proved
the loop end-to-end on the product grid: hand-built `wc_products` → wrote the "card + price →
wc_products" recognizer in JS + PHP → a fixture confirmed a product grid now maps to `wc_products`
while a price-less feature card does not.
