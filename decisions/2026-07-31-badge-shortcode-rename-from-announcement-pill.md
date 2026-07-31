---
slug: badge-shortcode-rename-from-announcement-pill
title: "Naming the badge/pill primitive: rename announcement_pill → badge"
authors: [jon]
tags: [naming, shortcodes]
date: 2026-07-31
description: "The compact pill/badge/chip shortcode was named announcement_pill, which describes only one of its jobs and hides it from anyone searching \"badge.\" We renamed the slug to badge — a direct rename, no migration — because it had never been used in saved content and badge is the discoverable, industry-standard name."
---

**The question:** the compact rounded-label shortcode — sub-tag, message, leading/trailing
icons, optional link — was called **`announcement_pill`**. It renders status badges, "what's
new" hero chips, eyebrow labels *and* announcement bars. Is "announcement pill" the right
name for it, or should it be **`badge`** — and if we rename, do we need a migration?

<!-- truncate -->

## Context

The name surfaced while reproducing a source hero that used two floating image labels
("Baked Today!", "Sweet Valley Favorite"). The right element for them was `announcement_pill`
— but nobody building a page and wanting a *badge* would think to open "Announcement Pill."
The name describes one use case (a top-of-page announcement strip) and buries the far more
common one (a small badge/chip). Meanwhile the live sites had achieved the "badge" look with
`special_heading` **overlines**, never the shortcode — so `announcement_pill` had effectively
zero saved footprint.

## Options considered

- **Keep `announcement_pill`, just broaden the title/description.** Zero risk, but the slug
  (`[announcement_pill]`, the folder, the converter emit) stays misleading and undiscoverable.
- **Rename to `badge-pill-chip`.** Descriptive, but clumsy as a tag (`[badge_pill_chip]`) and
  a folder slug — nobody types that. Discovery belongs in the *description*, not the slug.
- **Rename to `badge` with an alias + one-time DB migration.** Clean canonical name, safe for
  existing content — but the migration machinery (read-time rewrite + guarded DB sweep +
  permanent alias) is real work and real risk for content that, here, doesn't exist.
- **Rename to `badge` directly, no migration.** Cleanest end state; only safe because there
  was nothing to migrate.

## Decision

Rename the slug to **`badge`** (title "Badge"; description names *badges, pills, chips &
announcement bars* for search). Because it had never been used in saved content, do it as a
**direct rename with no migration and no alias**: the folder, enqueue handles
(`fw-shortcode-badge`), JS (`badge.js`) and the Site Converter's emit all follow the new slug;
the builder derives the tag from the folder name, so `[badge]` is the tag. The converter's
**internal** recognizer/role tokens stay `announcement_pill` (renaming them to `badge` would
collide with the existing looser `badge` recognizer). The internal CSS classes
(`.fw-announce` / `.ap-pill`) are left unchanged.

## Why

- **`badge` is the discoverable, industry-standard term** (Bootstrap, every UI kit). The slug
  is what users type and search; put the synonyms in the description, not the identifier.
- **No migration was justified** — a migration exists to protect saved content, and there was
  none. Adding an alias + DB sweep "just in case" is cost and surface with no payoff here.
- **Keep the CSS classes namespaced.** Emitting a bare `.badge` would collide with Bootstrap's
  own `.badge`, and renaming the classes would break the scoped demo CSS that targets
  `.ap-pill` — all churn, no user-visible gain. The class rename, if ever wanted, is a
  separable phase.
- **The internal converter tokens stay put** because `badge` is already taken by a second
  recognizer; only the *emitted* shortcode name needed to change (one line).
