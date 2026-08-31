---
slug: landing-chrome-via-meta-not-template
title: "Do we even need a Landing Page template, or can the per-page settings hide the chrome?"
authors: [jon]
tags: [architecture, page-builder]
date: 2026-08-31
description: The Site Converter's landing import leaned on a page-landing.php template to strip header/footer/title and go full-width. But the theme already exposes those as per-page settings, and the template turned out to be the fragile half. Decision — the converter sets the per-page layout meta AND forces the theme's layout override from its own hook, keyed off our _upw_landing_* meta, so the template is optional.
---

**The question:** the "Duplicate as landing page" importer assigns a `page-landing.php` template to
get a chrome-less, full-width page. But the theme's Page Settings already have Header (Global /
Transparent / Hidden), Hide Site Footer, Content Width, and Hide Page Title. So do we need the
template at all — and why was the theme footer still rendering on a landing page that had the template
assigned?

<!-- truncate -->

## Context

The theme resolves each layout key (`hide_header`, `hide_footer`, `width`, `hide_title`) through a
priority cascade:

1. **Per-page meta** — the Page Settings → Header/Footer + Layout options (`page_header`,
   `hide_site_footer`, `content_width`, `hide_page_title`), stored inside the `fw_options` post meta.
2. **Template-set override** — `unysonplus_set_layout_override()`, called at the top of
   `page-landing.php`, held in a per-request static store.
3. Global Pages defaults → … → hard-coded fallback.

Two facts turned the template from "the mechanism" into "the fragile half":

- **`_wp_page_template` doesn't always stick.** WordPress silently resets a page's template to default
  on some editor/builder saves. A landing page can therefore lose its template — and with it the whole
  override — without anyone touching the layout.
- **The per-page meta is read late for the footer.** `unysonplus_get_page_meta()` uses `get_the_ID()`,
  which is reliable in `header.php` (before the loop, so it returns null and the template override
  answers) but ambiguous in `footer.php` (after the loop). And crucially, `Hide Site Footer` is a
  **switch that persists its default `'no'`** — a concrete level-1 value that *beats* the template's
  `hide_footer = true`. So a landing page would hide its header (template override, level 2) yet show
  its footer (a stale `'no'` meta, level 1). That exact asymmetry is what we hit.

## Options considered

- **Keep leaning on the template.** Simplest, but it's level 2 and depends on `_wp_page_template`
  surviving — which it doesn't. It also can't win against a persisted `hide_site_footer='no'`.
- **Only write the per-page meta at import.** Correct level (1), survives saves, and makes the Page
  Settings UI reflect reality. But it's read late for the footer, and a later builder save could
  re-persist the switch default.
- **Force the theme's layout override from our own hook.** On `wp`, for any page carrying our
  `_upw_landing_inline` / `_upw_landing_mirror` meta, call `unysonplus_set_layout_override()` directly —
  independent of whether the template resolves. Covers header and footer for the whole request.

## Decision

Do **both** meta and hook, and treat the template as optional sugar:

- At import, write the four per-page options (`page_header='d-none'`, `hide_site_footer='yes'`,
  `content_width='full'`, `hide_page_title=true`) so the Page Settings UI is honest and level 1 is
  correct from the start.
- On `wp`, force `unysonplus_set_layout_override(hide_header/hide_footer/width/title)` for any
  `_upw_landing_*` page — the reliable guarantee, keyed off *our* meta, not the template.
- **Assign no template at all** — the page uses the DEFAULT template and gets its chrome-less,
  full-width layout entirely from the two mechanisms above. A caller can still opt into a specific
  template via `$opts['template']`, but the importer no longer picks one.

The wider principle this lands on: a **pure-layout template** — one whose whole body is a
`unysonplus_set_layout_override(...)` call (`page-full-width.php`, `page-no-header.php`,
`page-no-footer.php`, `page-boxed-narrow.php`, `page-sidebar-left/right.php`, and `page-landing.php`
itself) — is redundant with the per-page Page Settings that set the same keys. All seven were
**retired from the theme**, leaving only `page-demo-options.php` (which prints demo options, not a
layout). Retiring the files needed no migration in practice: a usage scan turned up only landing
pages (already covered by the forced-override hook) plus one orphaned meta row, so nothing fell back
to a broken layout. The Template dropdown is now shorter, and "how this page is laid out" lives in one
place — Page Settings — instead of being split between a template file and the settings that could
already override it.

## Why

The chrome-hiding now hangs off the meta the converter itself owns (`_upw_landing_*`), which is the
one thing that reliably survives, rather than `_wp_page_template`, which doesn't. The forced override
gives a request-wide guarantee for both header and footer, while the per-page meta keeps the behaviour
visible and user-overridable (an explicit Page Settings choice is level 1 and still wins). And the
whole thing degrades cleanly: on a non-Unyson theme the override function is absent, so the hook is a
no-op. The answer to "do we need the template?" is no — it's a convenience, not the contract.
