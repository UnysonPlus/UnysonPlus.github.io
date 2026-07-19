---
slug: theme-settings-docs-per-tab-all-choices
title: "Why Theme Settings docs are one file per tab — with every choice listed"
authors: [jon]
tags: [documentation, conversion, architecture]
date: 2026-07-19
description: The AI Dev Kit documented all of Theme Settings in one flat reference that only sampled each option's values ("e.g. classic / pill …"). An agent setting an option can't guess the rest, and the single file flagged stale on any theme change. So we split it into one markdown per tab and made the rule absolute — every option enumerates ALL its choices, the stored value keys, the saved shape, and the CSS class/var it emits — with sync tracking each tab against its own source.
---

**The question:** Should the kit's `theme-settings-reference.md` go deeper — documenting every
preset's options and *all* their choices — and split into a folder, one file per main tab?

<!-- truncate -->

## Context

The kit shipped **one** `theme-settings-reference.md` cataloguing every Theme Settings option. Two
problems surfaced the moment an agent tried to *build* from it:

- **It sampled choices instead of listing them.** A row might say a header design is "classic / pill
  / card / …" or a button style is "solid, outline, etc." An agent (or an importer) needs the **exact
  stored value key** — `pill`, not "a pill option" — and there is no way to guess the rest of a
  select's choices, an image-picker's keys, or a multi-picker's shape. A catalogue that trails off in
  "e.g. …" leaves the agent stuck exactly where it needs to act.
- **Drift was all-or-nothing.** In `sync.mjs` the single doc mapped to *every* theme options file, so
  any change to any Theme Settings tab flagged the whole reference stale — no signal about *what*
  actually changed.

This is the same shape as the option-types decision (one index + selective deep-dives), one level up:
the value of the doc is that you can act from it without reading source.

## Options considered

| Option | Trade-off |
|---|---|
| **Keep one file, keep sampling choices** | Smallest, but agents keep guessing values and the whole file flags stale on any change — the exact two failures above. |
| **One file, but exhaustive** | Fixes completeness, but becomes a giant unnavigable wall, and drift is still whole-file. |
| **Folder, one md per tab, every choice listed** | Navigable, drift is per-tab, and each option is act-ready. More files, but each maps 1:1 to its source. |

## Decision

**A `docs/theme-settings/` folder — one markdown per Theme Settings tab — with an absolute
choice-completeness rule.**

- **One file per tab:** `colors`, `typography`, `buttons`, `boxes`, `spacing`, `general`, `header`,
  `footer`, `blog`, `pages`, `site-ux`, `social`, `misc`, `woocommerce`, plus a `README.md` index. The
  five **preset-defining** tabs (colors/typography/buttons/boxes/spacing) get the deepest treatment —
  they're what elements *consume*.
- **The mandate:** every option documents its **type**, **default**, **ALL of its choices verbatim**
  (the stored value key → label — never "e.g." or "…"), the **saved value shape** for non-scalar
  types, and the **CSS class/var it emits** (`.btn-{slug}`, `--color-{slug}`, `.pt-{n}` …) so an agent
  knows how an element consumes it. For preset lists, each row's sub-fields and the seeded defaults are
  enumerated too.
- **Sync is per-tab:** the `sync.mjs` resolver maps each `theme-settings/<tab>.md` to its *specific*
  source PHP (the tab's theme options file(s) + any preset-definition component), so a change flags
  only the tab that actually changed.

## Why

An agent building a site sets options blind — it never sees the admin UI. The only way it picks a
valid value is if the doc *is* the source of truth for that option's full choice set. "Show a sample"
is the one thing that doesn't work here, because the missing value is precisely the one the agent
needs. Listing everything is not verbosity — it's the feature. And splitting per tab makes the
hash-sync honest: the day someone adds a header option, only `header.md` lights up, not the whole of
Theme Settings — the same reason the option-type docs are per-folder rather than one blob.

Status: **Accepted.** 14 tab docs + index written; `sync.mjs` now tracks 192 kit docs with 0
unresolved, each theme-settings tab bound to its own source.
