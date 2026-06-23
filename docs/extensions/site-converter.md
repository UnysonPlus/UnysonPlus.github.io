---
sidebar_position: 6
title: Site Converter
---

# Site Converter

**Site Converter** brings an existing (often AI-generated) website into WordPress as native,
editable Unyson+ content. It's the admin home at **Unyson+ → Convert**: import a source site's
images, design presets, theme settings, pages, and menus, generate a matching header/footer theme,
or ingest a Google Stitch design, all without hand-writing any builder JSON.

The whole conversion pipeline ships and is feature-complete: **media → styling presets → theme
settings → pages → menus**, plus a one-shot bundle, a header/footer **theme generator**, and a
**Google Stitch** ingest.

## The Convert admin page

**Unyson+ → Convert** is organized into three tabs:

| Tab | What's there |
| --- | --- |
| **Convert** | The headline **Convert bundle** uploader (one `.zip` runs the whole pipeline) and the **Site Analyzer** (convert by URL). |
| **Manual tools** | The piecemeal importers (media, styling presets, theme settings, pages, menus), the theme generator, and the Stitch converter, as collapsible cards for running one phase at a time. |
| **Diagnostics** | The Theme Settings doctor and a capture-service health check. |

Every JSON paste box is a syntax-highlighted editor (WordPress's bundled CodeMirror) with an
**Import from file…** button, so pasting is optional.

## The conversion pipeline

Site Converter applies five phases, in order. Each is also a standalone tool under **Manual tools**,
and each engine is reusable (the one-shot bundle and a future WP-CLI share the same code).

### 1. Media

Fetches the source site's images into the Media Library. Two ways in: **scan** a page URL (a
thumbnail picker shows every candidate image with an "in library" badge), or paste a **URL list**.
Import runs one image per request with a live progress bar, so a big batch never times out.

Imports are **de-duplicated two ways** so re-running is always safe:

- by **source URL** (`_unysonplus_source_url` post meta), and
- by **content hash** (md5 of the bytes) — so the same image fetched from a different URL or site
  reuses the existing attachment instead of duplicating it.

:::note JS apps (React / Vite / Lovable / v0)
A client-rendered site's static HTML is often just a `<div id="root">` shell. The scanner handles
this by mining the page's own `<script>` bundles and inlined JSON for `/assets/*.jpg`-style URLs (a
real Lovable site exposed 0 `<img>` tags but 17 images in its bundle). Very heavy Wix-style sites
still expose only a few images statically, fall back to URL-list mode for those.
:::

### 2. Styling presets

Applies a presets export (palette, font sizes, button colors/sizes/animations, border & table
presets, spacing/gap scales) into the theme-independent preset store, the same store
[Component Presets](/docs/hooks/presets-and-tokens) read. Only whitelisted keys are written; unknown
keys are reported as **skipped** so a stray key can't pollute the store.

### 3. Theme settings

Applies a **design file** (the Theme Settings export, `{ "_fw_settings_export": {…}, "values": {…} }`)
to the global design layer. Each key is applied on its own, so only the settings the file carries are
touched and everything else is preserved. **Operational keys are never imported** (`misc_analytics`,
`misc_performance`, `misc_maintenance`, `misc_404`, `misc_custom_scripts`, no tracking or script
injection), and `attachment_id` media refs are blanked (the media phase re-attaches them on the
target).

### 4. Pages

Creates WordPress pages from page-builder trees. It **never hand-authors the shortcode string** — it
inserts the page and sets its `page-builder` option (`{ json, builder_active: true }`), and the
plugin's own encoder regenerates `post_content`. So every imported page is **fully builder-editable**.
Idempotent by slug (re-running updates rather than duplicates); an optional `front_page` flag sets the
static front page.

### 5. Menus

Builds WordPress nav menus from the source navigation and assigns them to the theme's menu locations
(`primary`, `footer`). Internal links that match an existing page become real page menu items;
unmatched internal links are kept site-relative (so they work on the new domain); external links pass
through. Re-running rebuilds a menu's items rather than duplicating. A **nav scanner** can pre-fill the
import box from a source page URL, you review before anything is created.

## The Convert bundle (one-shot)

Upload a single `.zip` and Site Converter runs every phase it finds a file for, in order. Every file
is optional:

```text
bundle.zip
├── bundle.json          metadata: { name, source, generated }
├── media.json           { "urls": [ … ] }
├── presets.json         { "values": { "theme_colors": […] } }
├── theme-settings.json  { "values": { "<id>": <value> } }
├── pages.json           { "pages": [ … ] }
├── menus.json           { "menus": [ … ] }
└── theme-design.json     a design-config → also generates the header/footer theme
```

A bundle that carries `theme-design.json` builds the child/standalone theme **and** the Home page in
one upload, you just activate the generated theme.

:::caution Authoring a bundle, three gotchas that bite real conversions
1. **Per-shortcode att keys are exact.** Clone shapes from a real export and swap only content, e.g.
   `text_block`'s content field is `text` (not `content`); column `width` is a top-level key
   (`"1_3"`), not an att. See each element's reference under [Elements](/docs/shortcodes/overview).
2. **`misc_custom_css` is a `multi` option**, so its value must be `{ "custom_css": "…" }`, not a raw
   string. A raw string fatals the Theme Settings admin page.
3. **Carried design CSS must be admin-scoped.** The asset optimizer can combine `misc_custom_css`
   into a bundle that also loads in wp-admin, so scope global selectors to `body:not(.wp-admin)`.
:::

## The theme generator

The "make the header and footer perfect" tool. It takes a **design config** (the chrome half of a
capture) and writes a real WordPress theme reproducing the source's **header and footer design**,
never its content.

:::tip Cardinal rule: copy stylings, not content
The generated logo is always the site's own (`the_custom_logo()` → Site Title); the footer brand is
the Site Title. Only fonts, colors, spacing, the CTA *styling*, and layout are copied. The source's
brand wording is never baked in.
:::

Two modes (you pick in the UI):

| Mode | What ships |
| --- | --- |
| **Child** (recommended) | 4 files: `style.css` (with `Template: unysonplus-theme`), `functions.php`, and two header/footer template parts. |
| **Standalone** | A de-parented copy of the parent theme tree with the chrome overlaid, a self-contained theme that still runs on the Unyson+ plugin + builder. |

Both bootstrap their own header and footer menus on activation (an `after_switch_theme` hook), so
**activating the generated theme brings up the whole chrome with nothing to re-import**. The
generate step can **install** the theme into `wp-content/themes` or **download** it as a `.zip`.

The design config is all-optional (omitted keys default):

```jsonc
{
  "theme":  { "name": "My Site", "slug": "my-site", "mode": "child" },
  "fonts":  { "heading": "Fraunces", "body": "Manrope",
              "google": "https://fonts.googleapis.com/css2?…" },
  "colors": { "ink": "#34251f", "accent": "#994920", "bg": "#fbf9f0",
              "footer_bg": "#34251f", "footer_text": "#fbf9f0" },
  "header": { "style": "pill", "menu_location": "primary", "sticky": false,
              "cta": { "enabled": true, "label": "Get started", "href": "/#get-started" } },
  "footer": { "widget_area": true, "brand": true, "copyright": "All rights reserved." }
}
```

:::note Re-import menus after activating
WordPress stores menu-location assignments as theme mods, so activating any new theme clears them.
The success panel reminds you to re-import menus (the menus engine re-assigns them).
:::

## Google Stitch ingest

Site Converter turns a **Google Stitch** export into the same convert-bundle the rest of the
extension imports, producing a native child theme + a page-builder Full Page **with no LLM involved**.
Stitch is a first-class deterministic input: the design tokens come in the inline `tailwind.config`
(and/or a `DESIGN.md`), sections are comment-labelled, and the markup is clean semantic HTML, so the
parser maps confidently without AI.

It accepts both export layouts (a single frame, or the whole multi-screen project), writes the carried
design CSS into `misc_custom_css`, maps each `<section>` to builder elements (card grids → a row of
`icon_box`es, headings → `special_heading`, etc.), and either **builds & imports** offline or
**downloads a draft bundle** you can refine and re-upload.

:::info Privacy: the self-learning loop is local-only
Stitch ingest has an optional self-learning store that improves mapping on **your** install over time.
It is strictly **local**, no telemetry, nothing leaves the machine. Global improvements ship instead
through curated plugin releases via the GitHub auto-updater, never by collecting users' designs.
:::

## See also

- For a guided, end-to-end clone of a live site, the **clone-website** workflow drives this engine.
- [The Theme](/docs/theme) — what the generated child/standalone theme is built on.
- [Importers & demo system](/docs/importers-and-demos) — the related build → import tooling.
