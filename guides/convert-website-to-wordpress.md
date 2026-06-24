---
title: Convert an existing website to WordPress
description: Import an existing or AI-generated website into WordPress as editable Unyson+ content with the Site Converter, images, design, pages, and menus.
---

# Convert an existing website to WordPress

The **Site Converter** brings an existing (often AI-generated) site into WordPress as **native,
editable** Unyson+ content, its images, design presets, theme settings, pages, and menus, plus a
matching header/footer theme.

## The fastest path: a Convert bundle

If you have a conversion **bundle** (a `.zip` an agent produced):

1. Activate **Site Converter** (Unyson+ → Extensions).
2. Go to **Unyson+ → Convert** and upload the `.zip`.
3. Site Converter runs every phase it finds, media → presets → theme settings → pages → menus, and
   reports a per-phase summary. A bundle that includes a design generates the child/standalone theme
   too; just activate it.

## Or run the phases individually

Under **Unyson+ → Convert → Manual tools**, each phase is a standalone tool:

- **Media** — scan a page URL (or paste a URL list) to import images, de-duplicated so re-runs are
  safe.
- **Styling presets**, **Theme settings**, **Pages**, **Menus** — paste each export and import it.
- **Theme generator** — turn a design config into a child or standalone theme that reproduces the
  source's header/footer (stylings only, your logo/brand stay yours).
- **Google Stitch** — convert a Stitch design into a bundle deterministically (no AI).

Every imported page is **fully builder-editable**, Site Converter sets the page-builder content and
lets the plugin regenerate the markup, so you can keep editing in the visual builder.

## See also

- [Site Converter](/docs/extensions/site-converter) — the full reference, the bundle format, and the
  theme generator
- [The Theme](/docs/theme) — what the generated theme is built on
