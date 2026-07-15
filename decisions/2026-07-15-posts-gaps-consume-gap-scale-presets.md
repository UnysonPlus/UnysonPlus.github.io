---
slug: posts-gaps-consume-gap-scale-presets
title: "Why Posts gaps consume the shared Gap Scale presets"
authors: [jon]
tags: [option-types, shortcodes]
date: 2026-07-15
description: The Posts grid's Column/Row Gap were raw px number fields, out of step with the Section/Row/Column containers that pull from the theme's Gap Scale presets. The choice was to keep the px inputs or switch to the preset select. We switched to the presets for consistency, resolving the chosen preset slug to a CSS-var size at render time with a legacy-px fallback so existing saves keep working.
---

**The question:** The Posts grid's Column Gap and Row Gap were plain px inputs. The rest of the builder
(Section, Row, Column) takes gaps from the theme's Gap Scale presets. Should Posts do the same?

<!-- truncate -->

## Context

The plugin already has a Gap Scale preset system (`unysonplus_get_gap_scale()`, Theme Settings), exposed to
options via `sc_get_gap_select_choices()`, and the container elements consume it. Posts, being older, had
`short-text` px fields for its gaps — so the same concept had two different controls depending on where you
were, and Posts gaps couldn't track a site-wide spacing scale.

The wrinkle is consumption: Posts sizes its grid with CSS custom properties (`--posts-col-gap`), not the
utility classes the containers use, so a chosen preset has to be resolved to a size. And gap-scale slugs are
numeric (`"0"`–`"5"`), which collides with the legacy px values (`"24"`, `"32"`) also being numeric.

## Options considered

- **Keep px inputs.** No migration, but perpetuates the inconsistency and can't follow the theme's spacing
  scale.
- **Switch to the Gap Scale preset select.** Consistent with the containers and Theme Settings; the view
  resolves the picked slug to its size for the CSS var. Requires a back-compat path for old px saves.

## Decision

**Consume the presets.** Column/Row Gap are now `select`s built from `sc_get_gap_select_choices()`; the view
resolves the value to a CSS-var size, and only sets the var when a preset is chosen (empty = the base default
gap). Legacy numeric-px saves still resolve. Because preset slugs are numeric, the resolver **matches a
preset slug first, then** falls back to treating a bare number as px — otherwise a preset slug like `3` would
be misread as `3px`.

## Why

This is the "consume presets, don't hardcode" principle the rest of the builder already follows — gaps should
track the site's spacing scale, and the same concept shouldn't have two different controls. It's a modest
change, but recording it captures the non-obvious ordering bug it exposed: with numeric preset slugs,
preset-resolution has to run before the legacy-px check, or old and new values quietly swap meaning.

## Status

Accepted. Existing Posts blocks show the default gap in the builder until re-saved (the old px value still
resolves on the front end) — the same re-save trade-off as the wider option-gating change.
