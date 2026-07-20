---
slug: extra-footer-bars-via-filter-not-option-files
title: "Why extra footer bars are a filter, not per-container option files"
authors: [jon]
tags: [footer, architecture, live-editor]
date: 2026-07-20
description: A footer with 5+ structurally-distinct bands overflows the four fixed bars (Pre / Main / Post / Copyright), and stacking the overflow into the Copyright tab is messy and breaks the "Copyright = only the © line" contract. So the footer became extensible — but via a single `unysonplus_footer_extra_bars` registration filter that the parent consumes in both the options-tab assembly and the render loop, reusing the existing columns control, rather than requiring a child theme to drop a full `footer-container-N.php` options file per bar.
---

**The question:** How should the footer support 5+ distinct bands cleanly — a child theme
dropping a `footer-container-4.php` / `footer-container-5.php` options file per extra bar, or
something lighter?

<!-- truncate -->

## Context

The footer builder has four **fixed** bars — Pre-Footer → Main Footer → Post-Footer → Copyright.
That covers almost everything: bands that overflow are usually single-column (a badge strip, a
link cloud, a disclaimer) and **stack as elements inside one bar's column**. But a design with
several *structurally-distinct* bands (each its own multi-column grid) above the copyright genuinely
runs out of bars — and the only escape was to cram a band into the **Copyright** tab, which reads as
messy in the admin and violates the "Copyright = just the © line" contract.

The proposal on the table was: let a child theme add a **new options file per extra container**
(`framework-customizations/theme/options/footer-container-4.php`) and have it appear before Copyright.

## Options considered

1. **Per-container options file.** Each extra bar is a hand-written options file. Full control, but:
   every file re-derives the columns-control boilerplate (count + ratio + Auto Width + elements +
   presets), so the bars drift from the built-ins over time; the parent *still* needs a hook to
   include + order + render them; and nothing structurally guarantees they land *before* Copyright.
2. **A single registration filter.** Code registers bars by `id + label [+ max]` through one filter;
   the parent generates the tab, storage key, and render for each — reusing the *same*
   `unysonplus_footer_columns_field()` the built-in bars use.

## Decision

Option 2 — a **`unysonplus_footer_extra_bars`** filter. The parent consumes the same registered list
in **two** places: `footer-settings.php` splices a sub-tab per bar between Post-Footer and Copyright,
and `template-parts/footer-builder.php` renders each bar in the same slot. Each bar reuses the
standard columns control, and storage auto-keys off a `footer_x_<id>_` prefix. A child adds a bar in
~3 lines:

```php
add_filter( 'unysonplus_footer_extra_bars', function ( $bars ) {
    $bars['row4'] = [ 'label' => 'Footer Row 4', 'max' => 6 ];
    return $bars;
} );
```

## Why

- **No boilerplate, no drift.** One columns helper drives every bar, so a new control (Auto Width,
  Distribution, a future element type) reaches the extra bars for free — a per-file approach would
  need each file updated.
- **The one invariant is structural, not hopeful.** Copyright is spliced in *after* the extra-bar
  loop in both the tabs and the render, so "Copyright is always last" can't be violated by a
  mis-ordered file.
- **Same list, both sides.** Tabs and render read the identical filter output, so the admin and the
  front end can't desync.
- **You pay the hook cost anyway.** Even the file-drop route needs the parent to include, order, and
  render the extras — the filter just also removes the per-file boilerplate.

Verified on the test site: registering two bars shows *Footer Layout · Pre · Main · Post · Row 4 ·
Row 5 · Copyright*, each Row carrying the full columns control. The four fixed bars still handle the
common cases; extra bars are opt-in and earn their keep only for genuinely busy (5+ distinct-grid)
footers.
