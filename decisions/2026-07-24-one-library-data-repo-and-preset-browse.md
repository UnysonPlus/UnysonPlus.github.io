---
slug: one-library-data-repo-and-preset-browse
title: "One data repo for all content libraries; presets get a browse option, not a rewrite"
authors: [jon]
tags: [architecture, naming]
date: 2026-07-24
description: "As the Template Library grew and a presets library was proposed, the org was about to sprout a data repo per library type (templates, presets, icon packs). That reads as clutter. The resolution splits the world into code repos (must stay separate, one per extension, for the auto-updater) and data repos (pure content, safe to consolidate) — so all library CONTENT lives in one UnysonPlus-Library repo under per-type subfolders, while extension code stays one-repo-per-extension. Presets then gain the library by augmenting their existing Apply/Upload-JSON UI with a Browse option, not by replacing it — and only self-contained layout presets ship as singles; interdependent style tokens ship as cohesive packs."
---

**The question:** every new content library (page-builder templates, then component
presets, then icon packs) was about to get its own GitHub **data** repo. That felt messy.
Can we put all library content in one repo — and if so, what actually has to stay split?

<!-- truncate -->

## Context

The Template Library ships as two repos: `UnysonPlus-Template-Library-Extension` (the plugin
**code**) and `UnysonPlus-Templates` (the **content** it downloads — a `catalog.json` plus
template JSON, fetched over `raw.githubusercontent.com`). Icon packs already have their own
content repo (`UnysonPlus-Icon-Packs`), and a presets library was on the table. On that
trajectory the org accretes a data repo per library type, which is organizational clutter for
a solo maintainer.

Two facts made the call clear:

1. **Code and content are not the same kind of repo.** Each extension's `manifest.php` carries a
   `github_update` header the plugin's auto-updater keys off. That coupling is what *forces*
   one code repo per extension. Content repos have no such coupling — the client resolves a
   catalog via a filterable `*_catalog_url()` and fetches individual files by raw URL. Nothing
   about the updater touches them.
2. **End-user cost is per-file, not per-clone.** A site only ever `wp_remote_get`s the specific
   `catalog.json` and item files it needs; it never clones the repo. So consolidating content
   doesn't grow any site's footprint — repo size only affects the maintainer's own clone.

## Options considered

- **A repo per library type** (status quo trajectory) — clean isolation, but N repos to create,
  README, and remember; the clutter that prompted the question.
- **One repo for everything, code included** — rejected: merging extension code breaks the
  per-extension `github_update` auto-updater. Non-negotiable.
- **One repo for all *content*, code stays split** *(chosen)* — a single `UnysonPlus-Library`
  data repo with one self-contained subfolder per type (`templates/`, `page-presets/`,
  `header-presets/`, `style-packs/`, `icon-packs/`, …), each with its own `catalog.json` whose
  `base_url` points at that subfolder; each extension points its catalog URL at its subfolder.

On the presets library specifically, a second question surfaced: is it a browse-and-install of
*individual* presets, or of *packs*? Component presets split into two natures — **layout
presets** (Page, Header, Footer) are self-contained whole-region configs with no cross-refs,
while **style-token presets** (Color, Typography, Button, Box) reference each other (a button
preset points at a color slug). Installing a lone button preset can therefore dangle a missing
reference; installing a lone header preset cannot.

## Decision

- **One `UnysonPlus-Library` data repo**, per-type subfolders, each self-contained. Extension
  **code** stays one-repo-per-extension (the updater requires it). `UnysonPlus-Templates` was
  renamed to `UnysonPlus-Library`; templates moved under `templates/` with the catalog inside it,
  and the extension repointed. The install-path builder dropped its hardcoded `templates/`
  segment so every library resolves items as `base_url + <slug>/…` within its own subfolder.
- **Presets get the library by augmentation, not rewrite.** The existing preset UI (a card grid
  with *Apply* / *Upload JSON* / *Export current*) stays; a **Browse Library** button is added
  next to *Upload JSON*. The library is simply the curated, browsable form of the upload path —
  an installed preset becomes another applyable card.
- **Layout presets ship as singles; style tokens ship as cohesive packs.** Page/Header/Footer
  presets are self-contained, so individual catalog entries are safe and highest-value.
  Color/Typography/Button/Box travel together as a coordinated *style pack* so nothing dangles.

## Why

- **The split falls on the real seam.** The only thing that *must* be one-repo-per-thing is what
  the auto-updater is wired to — the code. Everything the updater doesn't touch (content) is free
  to consolidate, and consolidating it removes clutter with no downside a site ever feels.
- **Augmenting reuses a working flow.** Presets already round-trip as exported/uploaded JSON, so a
  library is 90% built — Browse is just Upload with a catalog in front of it. Replacing the preset
  UI would throw away the Apply/Export plumbing for no gain.
- **Match the distribution unit to the dependency graph.** Self-contained things distribute
  cleanly as singles; interdependent things must travel as a set or they arrive broken. Shipping
  style tokens as packs is the same "install a consistent whole" principle that makes a page
  template safe to drop in.

## Status

Accepted. Rule of thumb going forward: **split repos on the updater seam (code per extension), and
consolidate everything the updater doesn't touch (all library content in `UnysonPlus-Library`).**
When adding a browsable library to an existing feature, prefer augmenting its current
Apply/Upload/Export surface over replacing it, and let each item's dependency graph decide whether
it ships as a single or a pack.
