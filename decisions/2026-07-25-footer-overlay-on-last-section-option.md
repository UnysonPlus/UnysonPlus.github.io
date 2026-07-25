---
slug: footer-overlay-on-last-section-option
title: "\"Overlay on last section\" as a Footer Layout toggle — positioning only, JS-gated"
authors: [jon]
tags: [footer, architecture]
date: 2026-07-25
description: "Cinematic sites (like poly.app) put the footer ON the last full-height scene instead of a separate band below it — which also removes the blank tail a pinned last section leaves behind. We graduated that from a one-off demo hack into a reusable Footer Layout toggle, 'Overlay on last section'. This records the three design calls that made it safe and generic: the option changes positioning only (the footer's own background/colours stay user-controlled), a tiny runtime measures the footer and only engages when the last section is tall enough to sit on, and the footer background defaults to transparent in overlay mode."
---

**The question:** poly.app's footer isn't a band below the page — its "Preserve human knowledge with
Poly" line sits *on the bottom of the last full-height scene*, overlaid. That also removes the blank
gap a pinned last section leaves after it fades out. Should this be a one-off per-site hack, or a
first-class Footer option — and if an option, how do we make it generic and safe?

<!-- truncate -->

## Context

We first did this by hand on a demo (negative margin + a dark gradient on the theme footer). It
looked right, but it hard-coded a footer height, a scrim colour, and assumed the last section was a
tall pinned scene. As a reusable option it needs to work on *any* site without those assumptions.

The footer already has a **Footer Layout** settings tab (background, colours, border, spacing). The
front end renders `#colophon.footer` and reads settings via `fw_get_db_settings_option()`. So the
natural home is a new toggle there that adds a class the CSS/JS act on.

## Options considered

- **Leave it per-site** (hand-CSS each cinematic site). No new surface, but every such site
  re-derives the same fragile margin/scrim math.
- **A full "footer mode" system** (band / overlay / sticky / …). Over-built for one real need today.
- **A single `switch` toggle — "Overlay on last section"** (chosen). One option, one class, minimal
  runtime.

## Decision

Add **Footer → Layout → "Overlay on last section"** (`footer_overlay_last_section`, a `yes`/`no`
switch, default `no`). When on, `footer.php` adds `footer--overlay` to `#colophon`. A tiny inline
runtime measures the footer height into `--footer-overlay-h` and adds `footer--overlay-on` — which
pulls the footer up by that height and raises its `z-index` — **only when the page's last section is
≥ 70vh tall**. Three deliberate constraints:

1. **Positioning only.** The toggle moves the footer; it does not restyle it. The footer's own
   `footer_background` and text/link colours stay in the user's hands, so the option composes with
   the existing Footer settings instead of fighting them.
2. **JS-gated to a tall last section.** Overlaying a short last section would look cramped, so the
   runtime engages only when the last section is tall enough to sit on; otherwise the footer stays a
   normal band. Graceful, content-aware fallback with no author configuration.
3. **Transparent background by default in overlay mode.** `footer--overlay-on` resolves its
   background to `var(--footer-bg-color, transparent)` — so with no explicit footer background the
   final scene shows through (the intended look), while a user-set scrim still wins.

## Why

- **It's a real, recurring pattern** (any cinematic / scroll-story page ends better on its last
  scene than on a blank band), so it earns a first-class option rather than living as per-site CSS.
- **Positioning-only keeps it predictable.** The #1 way a "layout" toggle goes wrong is silently
  overriding the user's colours/background; scoping the option to *where the footer sits* avoids that
  entirely and lets it stack with everything already in Footer settings.
- **The height + tallness are runtime facts, not author inputs.** Measuring the footer and checking
  the last section's height means the author flips one switch and it does the right thing (or safely
  nothing) regardless of their footer's size or their last section — no magic numbers to tune.
- **Demo stays independent.** The cinematic demo that inspired this keeps its own custom footer and
  overlay CSS; the new option serves sites built on the standard footer builder. Two surfaces, no
  coupling.

The general lesson: when promoting a demo hack to a framework option, strip it to the one thing it
must own (here, *position*), and let content-measured runtime facts replace the hard-coded constants
the hack relied on — so the option is one switch that can't fight the user's other settings.
