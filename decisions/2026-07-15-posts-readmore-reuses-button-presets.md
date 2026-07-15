---
slug: posts-readmore-reuses-button-presets
title: "Why the Posts read-more reuses button presets instead of duplicating the Button shortcode"
authors: [jon]
tags: [option-types, shortcodes]
date: 2026-07-15
description: The Posts card read-more can be styled as a button, and the question was whether to give it the full Button shortcode's options via its own Content/Styling tabs. The choice was duplicating the Button option surface versus gating a small color/size set that reuses the existing button-preset helpers. We reused the helpers and gated them under the Button choice, so there's no second copy of button options to keep in sync.
---

**The question:** The card read-more link can render as a button. Do we add Button Content and Button
Styling tabs to Posts that mirror the Button shortcode's options, so the read-more is as configurable as a
real button?

<!-- truncate -->

## Context

Posts is already the largest option surface in the plugin (~70 atts). The read-more is a small call-to-action
inside a card, with three styles (button / text-link / arrow). The Button shortcode, meanwhile, has a rich
option set — colours, sizes, hover animations, gradients, radius — and exposes its choice lists via helpers
(`sc_get_button_style_choices()`, `sc_get_button_size_choices()`) sourced from the theme's button presets.

## Options considered

- **Full duplicate tabs.** Add Button Content + Button Styling tabs to Posts replicating the Button
  shortcode. Most control, but it bloats the already-largest shortcode, and it's a second copy of the button
  option surface to keep in sync forever — the Button shortcode doesn't expose a reusable "whole options
  block" helper, so it would be literal duplication.
- **Leave it as-is.** Just style + text, no button theming.
- **Reuse the preset helpers, gated.** Make the read-more style a small picker; when "Button" is chosen,
  reveal a couple of controls (`readmore_btn_style`, `readmore_btn_size`) built from the *existing*
  `sc_get_button_*_choices()` helpers, output as the theme's `btn-*` preset classes.

## Decision

**Reuse the helpers, gated under the Button choice.** No new tabs; the read-more picker reveals button
colour + size only when Button is selected, drawing both from the shared button-preset helpers and emitting
the same `btn-*` classes the theme already styles.

## Why

Duplicating the Button shortcode would double the maintenance for a minor card CTA and inflate the heaviest
options panel in the plugin. Reusing the preset helpers gives the same result — a themed button that tracks
the site's button presets — with zero duplicated surface: change a button preset in Theme Settings and the
read-more follows automatically, because it's the same source. It also stays consistent with the
option-gating direction everywhere else: show the button controls only when they apply.
