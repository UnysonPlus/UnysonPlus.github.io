---
slug: where-a-sites-own-conversion-corrections-live
title: "Why a site's own conversion corrections live in wp-content, not framework-customizations"
authors: [jon]
tags: [site-converter, architecture, back-compat]
date: 2026-09-27
description: "framework-customizations/ is the documented update-safe home for user code — but it sits inside the theme, and a new conversion deletes the previous conversion's generated child theme. The decision: the conversion sandbox lives in wp-content/unysonplus-sandbox/, and its entries retire themselves when the converter learns to handle their case."
---

**The question:** A conversion gets a site most of the way, and the rest needs corrections only the site owner can judge. Where do those corrections live so that neither a plugin update, a theme change, nor the next reconversion destroys them — and how do we stop them outliving the defects they were written for?

<!-- truncate -->

## Context

A correction had exactly two homes before this, and both lost it:

- **Edit the converted page.** Undone the next time anything reconverts.
- **Edit the converter.** Undone by the next plugin update, and a fix tuned to one source is wrong for every other site that plugin touches.

So corrections were written, lost, and written again. The fix for that is a documented seam plus somewhere durable to put what goes through it. Three filter/registration points cover the seam. This decision is about the *somewhere*.

There is also a second, less obvious failure waiting on the other side of durability. A correction that survives updates will, eventually, survive the fix that makes it unnecessary. At that point the hook is no longer correcting a defect; it is overriding a value the converter now gets right, and it has become the defect. Durability without expiry just moves the problem.

## Options considered

**`framework-customizations/`** — the framework's own documented home for user code, which a plugin update never touches. It is the obvious answer, and it is wrong here for a reason specific to this tool: that directory lives inside the **theme**, and the converter *generates* themes. `cleanup_previous_conversion()` deletes the child theme a prior conversion generated, so the next conversion of the same site would delete the corrections along with it — precisely when they matter most. The obvious home is destroyed by the very operation the corrections exist to survive.

**A child theme the user creates and maintains themselves.** Survives, but asks a site owner to set up and activate a child theme before they can record a one-line fix, and ties their corrections to whichever theme happens to be active.

**`mu-plugins/`** — survives everything, and is the standard WordPress answer to "code that must always run". Rejected as the primary home only because it is a shared namespace: a folder of converter corrections dropped into `mu-plugins` sits among unrelated must-use code, and there is no natural place to put the README, the example, or the retirement state beside it.

**A dedicated `wp-content/unysonplus-sandbox/`.** Outside the plugin (so updates cannot replace it), outside the theme (so a reconversion cannot delete it), and its own namespace, so the folder can carry its README, an inert example entry, and an `index.php` + `.htaccess` that keep it unservable — the files are `include`d by PHP and never requested over HTTP.

For expiry, the options were: leave it to the user to notice; version-gate each entry against a converter version; or let each entry **test its own defect**.

## Decision

Corrections live in **`wp-content/unysonplus-sandbox/entries/`**, one file per correction, each returning `array( id, summary, fragment, expected, probe, apply )`.

Each entry may carry a **probe** answering one question: *is the defect I exist for still present?* Probes re-run once per converter version — an update being exactly when a correction may have stopped being necessary — and an entry whose probe returns `false` retires itself: it stops applying and is listed as safe to delete.

Three asymmetries in that logic are deliberate, because the costs are not symmetric:

- **No probe → never retired automatically.** "I don't know" must not be read as "safe to drop".
- **A probe that throws → the entry stays active.** An inconclusive probe that retired its entry would silently un-fix a live site; keeping a correction one version too long is far cheaper than that.
- **`revive()` exists**, because a probe can be wrong and a regression can come back.

Loading, `apply()` and `probe()` each run in their own try/catch: a bad entry is disabled and reported, never fatal.

## Why

**The update-safe directory was not conversion-safe, and only one of those words was in the docs.** "A plugin update never touches `framework-customizations/`" is true and was the wrong property to optimise for. The threat to a converted site's corrections is not the plugin updating — it is the site being converted again. Choosing a location meant asking which operations actually delete things here, and the answer included one the framework's own conventions say nothing about, because it belongs to this tool alone.

**Version-gating would have put the burden in the wrong place.** An entry declaring "needed until converter 1.11" requires the author to predict when a fix lands, and is wrong in both directions — it expires while the defect persists, or outlives it silently. A probe asks about the *defect* rather than about a version number, which is the thing the entry actually depends on.

**Asymmetric retirement follows from asymmetric harm.** A stale correction usually produces a small wrongness on one site, visible to whoever looks. A wrongly-retired correction silently removes a fix from a live site, and nobody is told. Where a rule could err in either direction, it errs toward keeping the correction.

**Recording `fragment` and `expected` is what makes the sandbox more than local patching.** Those two fields are a reproducible case: a source shape plus what the converter should have produced. That is what a maintainer can turn into a permanent fix, so the next site of the same shape needs no manual pass at all. Without them, every site solves the same problem privately and forever; with them, the sandbox is also the reporting channel — and the ask is deliberately the case, not the patch, because a patch tuned to one source is exactly what the shared converter must not accept.
