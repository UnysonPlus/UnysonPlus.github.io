---
sidebar_position: 7
title: Manual tools & pipeline
---

# Manual tools & the conversion pipeline

The **Manual tools** tab holds the piece‑by‑piece importers — the individual phases of the
conversion that the one‑shot Convert flow runs in order. Use them to re‑run a single phase, import a
bundle by hand, or apply an export your agent produced. Each is a collapsible card, and every JSON
box is a syntax‑highlighted editor with an **Import from file…** button.

## The pipeline phases

A full conversion applies these in order — the same phases these manual tools expose individually:

```
media → styling presets → theme settings → pages → menus   (+ theme generator for the chrome)
```

### Convert from a bundle (.zip)

The one‑shot path: upload the `.zip` a conversion produced and every phase it contains is applied in
order (`media.json` → `presets.json` → `theme-settings.json` → `pages.json` → `menus.json`). This is
how you apply a **downloaded** bundle, or re‑apply one without re‑capturing.

### Find images (media)

Fetch a source site's images into the **Media Library**, de‑duped by source URL. Scan a page URL
(optionally mining the page's JS bundle for runtime‑injected images, needed for React/Vite/Lovable
apps) or paste image URLs directly.

### Import Styling Presets

Apply a presets export — palette (`theme_colors`), `font_sizes`, button colors, spacing/gap scales —
into the theme‑independent **Styling Presets** store. Only known preset keys are applied.

### Import Theme Settings

Apply a design‑file export (global chrome, typography defaults, header/footer slot config, bespoke
`misc_custom_css`) onto **Theme Settings**, overlaying only the keys it carries. Operational keys
(analytics, custom scripts, maintenance) are never imported; source media references are dropped (the
media tool re‑attaches them).

### Import Pages

Paste page bodies as JSON — each becomes a WordPress page from its page‑builder tree. The plugin
generates the content with its own encoder (nothing hand‑coded), so each page stays editable. Pages
match by slug, so re‑running **updates** rather than duplicates.

### Import Menus

Scan a source page to extract its header/footer navigation, or paste menus JSON. Each menu is created
(or rebuilt) from its items and assigned to a theme menu location. Internal links matching an existing
page become real page menu items; everything else becomes a custom link.

## The header/footer theme generator

The **Generate header & footer theme** card reproduces a source site's **header and footer design**
as a real WordPress theme — logo placement, nav, CTA, fonts, colors, footer layout and carried CSS —
as either:

- **Unyson+ Theme + a Child Theme** *(recommended)* — a lightweight child of `unysonplus-theme` with
  just the header/footer overrides.
- **Standalone theme** — a self‑contained copy (no parent dependency), still powered by the Unyson+
  plugin + page builder.

Only **stylings** are copied: the logo is always your own (Site Logo → Site Title) and the footer
brand is your Site Title — never the source's wording. Paste a design config (or the raw
design‑capture JSON, which is auto‑detected), then **Install into themes** or **Download .zip**.

## Diagnostics

The **Diagnostics** tab has:

- **Capture service** — a live **Check now** health probe (service URL + `/health`).
- **Theme Settings Doctor** — inspects the stored theme‑settings option and, if the Theme Settings
  page renders blank, resets it to defaults so it loads again.

## See also

- **[How it works](./how-it-works.md)** — the algorithm behind these phases.
- **[The capture service](./capture-service.md)** — produces the bundles these tools consume.
