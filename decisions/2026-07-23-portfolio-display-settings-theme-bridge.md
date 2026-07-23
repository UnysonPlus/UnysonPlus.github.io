---
slug: portfolio-display-settings-theme-bridge
title: "Why portfolio display settings live in Theme Settings, bridged by one filter"
authors: [jon]
tags: [portfolio, architecture]
date: 2026-07-23
description: With a new Theme Settings → Portfolio tab joining the extension's own Settings page, two UIs could own the same display knobs. The split is data vs display — the extension keeps data-level settings and code defaults, the theme tab owns display, and a single fw:ext:portfolio:setting filter inside get_setting() bridges them, with "Inherit" deferring to the extension. Unknown keys flow through the same filter, so theme-only knobs (hover style, card ratio) need no extension-side field at all.
---

**The question:** The Portfolio extension has its own Settings page (archive columns, per-page,
order, single-view toggles). The theme is gaining a Theme Settings → Portfolio tab. Who owns
which settings — and how do the two coexist without drifting or double-defining everything?

<!-- truncate -->

## Context

The extension must stay standalone: on a non-UnysonPlus theme its Settings page is the only UI,
and its archive/taxonomy views must render sensibly from those values alone. But display taste
(columns, gaps, hover styles, card meta) is a *theme* concern — it belongs next to the Blog and
Header tabs in Theme Settings, where presets and the site's look are managed.

## Options considered

- **Move everything to Theme Settings** — breaks the extension on other themes, and data-level
  concerns (permalink slugs, taxonomies, feature toggles) have no business in a display tab.
- **Duplicate the fields in both UIs, last-write-wins** — two sources of truth; a Theme Settings
  save (which persists the whole option tree) would silently clobber extension-side values.
- **A read-time bridge filter with explicit Inherit** *(chosen)* — `get_setting()` resolves the
  extension value, then runs `fw:ext:portfolio:setting`. The theme supplies its saved value only
  when it isn't `inherit`/empty, so nothing is clobbered at save time; precedence is decided at
  read time, per key.

## Decision

The extension's Settings page keeps **data-level** settings and remains the fallback for every
display value. The Theme Settings → Portfolio tab owns **display**, bridged through one filter
inside `get_setting()`. Select-type theme options carry an explicit **Inherit (extension
setting)** choice as their default; only a non-inherit value overrides.

## Why

- **One source of truth per key, decided at read time.** No save-order races between the two UIs.
- **Theme-only knobs cost nothing extension-side.** Because *unknown* keys also flow through
  `get_setting( 'key', <code default> )`, purely visual options (card hover style, image ratio,
  grid gap, category/summary toggles) exist only as theme fields + extension code defaults — no
  phantom extension settings to keep in sync.
- **Standalone behavior is untouched.** Without the theme bridge the filter is a no-op and the
  extension behaves exactly as before.
- The same pattern generalizes: any extension wanting theme-overridable display settings can add
  the one-line filter to its settings accessor.
