---
title: Colors — Theme Settings mapping
sidebar_label: Colors
slug: /theme-settings-mapping/colors
description: How the UnysonPlus Site Converter fills the Theme Settings Colors tab (`theme_colors`) from a source design — option by option, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Colors — Theme Settings mapping

**Theme Settings → General → Colors** · storage key `theme_colors`

The Colors tab is the site **palette** — the `theme_colors` addable list of `{ name, color }` rows. Each row's name becomes a slug that drives a `.text-{slug}` / `.bg-{slug}` utility and a `--color-{slug}` CSS variable (e.g. **Primary** drives `btn-primary` + `--color-primary`). The converter derives the source's **brand palette** and writes these rows, then merges the plugin's default presets after them (de-duped by hex) so bundled Box / Icon-Badge presets that reference default slugs still resolve.

## Coverage

**7/8 mapped from the source** (88%) — 🟡 0 via CSS · ⚪ 1 default/manual · ⚙️ 0 auto.

| Option | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `Primary` | `palette role` | ✅ Native | Brand action colour, in priority order: `tailwind.config` accent/primary token → computed semantic primary/accent → vivid markup accent scan → the primary button's real fill → tertiary/secondary/ink → neutral fallback. Wins the `primary` slug (drives `btn-primary` + `--color-primary`). |
| `Ink` | `palette role` | ✅ Native | Source text / foreground colour (`text`, `on-background`, `foreground`), or — when no token exists — **sampled from the real rendered body-copy colour** (`sample_ink`). Falls back to `#1a1a1a`. |
| `Secondary` | `palette role` | ✅ Native | `secondary` / `tertiary` token, or the computed semantic `secondary`. Only when found. |
| `Accent` | `palette role` | ✅ Native | Computed semantic `accent`, or — when the design has no named accent — an accent colour **lifted from a source gradient** (`scan_gradient_accent`, e.g. the vivid stop in a hero gradient). Only when found. |
| `Dark` | `palette role` | ✅ Native | `deep-black` / `black` / `surface-container-lowest` token, or semantic `dark`. Only when found. |
| `Muted` | `palette role` | ✅ Native | `muted` / `on-surface-variant`. Only when found. |
| `Light` | `palette role` | ✅ Native | `page-bg` / `background` / `surface` / `white-soft`. Only when found. |
| `Default presets (White, Gray, Red, Green, …)` | `palette rows` | ⚪ Unmapped | The plugin's ~20 default color presets, merged in after the brand roles and de-duped by hex — kept (not derived) so bundled Box / Icon-Badge presets that reference their slugs keep resolving. |

Brand colours are pulled from the captured design tokens (a real `tailwind.config`) first, then from each element's computed `getComputedStyle` semantic colours, then a markup accent scan / a gradient-accent scan / the primary button's real fill; body text falls back to a sampled ink colour. A brand role only appears when a real colour was found — otherwise the default palette stands. The brand `Primary` is prepended before the default `Primary`, so it wins the `primary` slug and the default button/box presets adopt the brand colour.

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Theme Settings Mapping](./index.md)
