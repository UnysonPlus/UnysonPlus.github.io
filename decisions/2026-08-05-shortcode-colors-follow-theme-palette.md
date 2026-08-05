---
slug: shortcode-colors-follow-theme-palette
title: "Why shortcode colour defaults now follow the site's Color Presets"
authors: [jon]
tags: [color, shortcodes, architecture]
date: 2026-08-05
description: Every shortcode shipped a hardcoded accent (a generic blue #4a90d9) as the default for its CSS custom properties, so on a site whose primary is green the elements still rendered blue until each one was manually recoloured. We changed the defaults to reference the theme's live `--color-*` tokens with the hardcoded hex as the `var()` fallback — so a shortcode adopts the site palette automatically, the per-element colour pick still overrides, and a non-UnysonPlus theme (no tokens) degrades to the old hex.
---

**The question:** Should a shortcode's default colours be hardcoded, or should they follow the
site's Color Presets (the theme palette) automatically — falling back to the hardcoded value only
when the palette isn't available?

<!-- truncate -->

## Context

Each shortcode drives its look from CSS custom properties on its root, e.g. the pricing table:

```css
.fw-pt { --pt-accent: #4a90d9; --pt-card-bg: #ffffff; --pt-text: #5a6772; }
```

The `#4a90d9` was a generic "accent blue" placeholder repeated across ~20 shortcodes (`--tt-accent`,
`--tl-accent`, `--cal-accent`, `--bq-accent`, …). The problem: on a real site whose primary colour is
green (`--color-primary:#00b295`), every shortcode still rendered **blue** out of the box. The only way
to make an element match the brand was to open it and set its per-element **Accent Color** — for every
element, on every page. The elements didn't share the site's palette; they each shipped their own.

Meanwhile the theme already publishes the palette as live CSS variables at `:root` (from Theme
Settings → Color Presets, emitted in the generated stylesheet): `--color-primary`, `--color-accent`,
`--color-text`, `--color-muted`, `--color-bg`, `--color-border`, plus `--color-<slug>` per preset.

## Options considered

1. **Leave it hardcoded, recolour per element.** Zero code change, but the default never matches the
   brand — every element needs manual work, and a palette change doesn't propagate. Rejected: it makes
   "on-brand" the exception instead of the default.
2. **Change `_get_backend_width_type`-style theme awareness in PHP** (compute the primary and inject it
   inline per render). Works, but adds a PHP path + inline style to every element for something CSS can
   express declaratively, and it wouldn't cascade or stay live if the preset changes. Rejected as
   heavier and less "CSS-native".
3. **Reference the theme token with the hex as the `var()` fallback** (chosen):
   ```css
   .fw-pt { --pt-accent: var(--color-primary, #4a90d9); --pt-card-bg: var(--color-bg, #ffffff); … }
   ```

## Decision

Shortcode CSS-var **defaults reference the theme's `--color-*` tokens, with the hardcoded hex as the
`var()` fallback.** The canonical accent placeholder `#4a90d9` → `var(--color-primary, #4a90d9)`
everywhere; a shortcode's background/text/muted defaults map to `--color-bg` / `--color-text` /
`--color-muted` where the semantics match. The per-element colour option is unchanged — it writes an
inline `--pt-*`, which still overrides the default. Named, non-accent colours are **left alone**: a
calendar's `--ev-blue` (a "blue event" category), a highlighter's yellow `--hl-accent: #ffe066`, and
white-on-dark text tokens are semantic, not the brand accent, so they keep their literal value.

## Why

- **On-brand by default.** An element adopts the site palette the moment it's dropped in; the primary
  drives it, no per-element recolouring.
- **Cascade order preserved.** inline per-element pick › CSS-var default (theme token) › hardcoded
  fallback. Nothing about the existing override behaviour changes.
- **Graceful on any theme.** With no `--color-*` tokens (the plugin on a non-UnysonPlus theme) the
  `var()` falls back to the original hex — identical to before. It's the same `var(--token, fallback)`
  idiom the theme already uses internally, so it's the established convention, not a new mechanism.
- **Safe to roll out.** The accent map is a value-scoped replace (`#4a90d9` only), so it can't touch
  semantic colours; background/text/muted are mapped per shortcode by name because dark-themed elements
  (tooltip, hotspot popup, flip-box) legitimately use white-on-dark and must not be repainted.

Rolled out first on `pricing_table` (verified green on a live green-primary site), then the accent
mapping across the shortcode set. The background/text/muted mappings for dark-capable shortcodes are a
follow-up done per element rather than by sweep.
