---
slug: uploads-under-one-unysonplus-parent
title: "A dozen uploads/unysonplus-* folders, or one uploads/unysonplus/ parent?"
authors: [jon]
tags: [architecture, back-compat]
date: 2026-07-26
description: "The plugin and parent theme had accumulated a scatter of sibling upload folders in the WP uploads root — unysonplus-icon-packs, unysonplus-asset-optimizer, unysonplus-lottie, unysonplus-rive, unysonplus-templates, unysonplus-designs, unysonplus-shortcodes, unysonplus-presets — plus a plain unysonplus/ for generated CSS. They were consolidated under a single uploads/unysonplus/<subdir>/ parent, routed through one shared helper (fw_upw_uploads_dir), with a guarded one-time migration that renames the legacy folders and a read-time URL normaliser for the only DB-stored URLs (Lottie/Rive src). The move was low-risk because almost every folder's URLs are recomputed per request."
---

**The question:** UnysonPlus had grown a scatter of sibling upload folders in the WordPress uploads
root — `unysonplus-icon-packs`, `unysonplus-asset-optimizer`, `unysonplus-lottie`, `unysonplus-rive`,
`unysonplus-templates`, `unysonplus-designs`, `unysonplus-shortcodes`, `unysonplus-presets`, plus a
plain `unysonplus/` for generated CSS. Should each keep its own top-level folder, or move under a
single `uploads/unysonplus/` parent?

<!-- truncate -->

## Context

Every subsystem that needed to write to uploads had hand-rolled its own
`wp_upload_dir()['basedir'] . 'unysonplus-<x>'` path. The result: nine-plus UnysonPlus folders
littering the uploads root next to the user's own year/month media folders, with no obvious grouping
and nothing to enforce a convention on the next feature that needed a folder (the Lottie and Rive
work had just added two more).

The blocking worry with any move is **stored URLs**: if a folder's file URLs are persisted in the
database (post meta / options), renaming the folder 404s them. So before deciding, we mapped every
folder: which are **computed** (URL rebuilt from the dir helper each request — safe to move) versus
**stored** (URL persisted — needs migration). The finding was decisive: **almost everything is
computed** — regenerable caches (asset-optimizer, generated CSS) or re-downloadable content
(icon-packs, templates, designs, presets) whose URLs are recomputed per request. The **only**
DB-stored URLs are the Lottie/Rive `src` values, and those are brand-new/unreleased with essentially
no real data. That turned a scary-looking move into a low-risk one.

## Options considered

- **Leave the sibling folders as-is.** Zero risk, zero work — but the uploads root stays messy and
  every future feature invents its own top-level folder, compounding the sprawl.
- **Consolidate under one `uploads/unysonplus/<subdir>/` parent, via a shared helper** — chosen. Tidy
  root, one obvious home, and a single chokepoint (`fw_upw_uploads_dir()`) that makes the next
  folder automatic and impossible to get wrong.
- **Consolidate but keep each subsystem building its own path** (just change the strings). Rejected —
  it fixes today's mess without preventing tomorrow's; the value is the *enforced* convention, not the
  one-time rename.

## Decision

All plugin- and theme-written uploads move under **`wp-content/uploads/unysonplus/<subdir>/`**
(`icon-packs`, `lottie`, `rive`, `templates`, `designs`, `shortcodes`, `asset-optimizer`, `css`,
`presets`). A single shared helper **`fw_upw_uploads_dir( $subdir )`** builds every path; each dir
helper (plugin and theme) routes through it, and new code MUST use it rather than hand-rolling a
path. A one-time, flag-guarded migration (`fw_upw_migrate_uploads()`, on `admin_init`) renames the
legacy siblings and the loose generated CSS into the new layout. The lone DB-stored URLs
(Lottie/Rive `src`) are rewritten on read by `fw_upw_normalize_legacy_upload_url()`, so values saved
before the move still resolve.

## Why

A single parent is simply how a well-behaved plugin should treat the shared uploads dir — easy to
find, back up, or delete as a unit, and it stops the root from filling with our folders. But the real
win is the **shared helper as a chokepoint**: the sprawl happened because there was no single place
that owned "where do we put uploads," so every feature answered it independently. Centralising that
answer means the convention enforces itself — the next folder is one `fw_upw_uploads_dir('thing')`
call, already in the right place. The migration + read-time normaliser make the move invisible to
existing sites, which is what made it safe to do now rather than deferring it forever.

## Status

Accepted.
