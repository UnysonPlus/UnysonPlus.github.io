---
title: Developer reference
sidebar_position: 8
---

# Developer reference

The implementation surface of the Theme Builder, for theme/extension developers. As the extension is
still being finalized, treat names here as current‑build accurate but subject to change.

## Content types (CPTs)

All four are **private** (`public => false`, `show_in_rest => false`), gated on `edit_theme_options`,
and registered on `init`.

| CPT | Holds | UI |
| --- | --- | --- |
| `up_header` | header builder content | edits in the builder (under the Theme Builder menu) |
| `up_body` | full‑page body builder content | same |
| `up_footer` | footer builder content | same |
| `up_template` | references + conditions only (no builder content) | `show_ui => false`; managed via the Templates grid |

The three part CPTs support `title`, `editor`, `revisions`; the page builder is attached to them after
the page‑builder extension initializes (priority 10000), and they're exposed to
`fw_ext_page_builder_supported_post_types`.

## Post‑meta contract

Read on the front end by the resolver; written by the admin grid (Templates) and the part meta boxes.

| Meta key | On | Value |
| --- | --- | --- |
| `tb_header_id` | `up_template` | int part id, `0` = inherit |
| `tb_body_id` | `up_template` | int part id, `0` = none |
| `tb_footer_id` | `up_template` | int part id, `0` = none |
| `tb_conditions` | `up_template` | `{ use_on: rule[], exclude_from: rule[] }` |
| `hf_type` / `hf_behavior` | `up_header` | the Header Type / Scroll Behavior selects |
| `tb_loop_columns` / `tb_loop_gap` | `up_body` | the archive Loop Layout settings |

A **rule** is `{ type, sub_type, ids }`. Types: `df` (entire site), `ct` (conditional tag:
`front_page`/`blog_index`/`search`/`error_404`/`archive`/`author`/`date`), `pt` (post type / specific
post ids), `ptc` (children of pages), `tx` (singular in given terms), `tax` (term archive), `ar`
(post‑type archive). Matching is via native WP conditionals only.

## Render helpers

```php
// Header/footer preset → inner HTML (theme wraps it in <header>/<footer>).
// Strips auto-generated <section> wrappers; recursion-guarded.
fw_ext_hfbuilder_render( int $post_id, string $kind = 'header' ): string; // 'header' | 'footer'

// Body template → full HTML (sections preserved). Recursion-guarded.
fw_ext_theme_builder_render_body( int $post_id ): string;

// ECHO a body's content region for the current request, handling the three render
// modes (single / archive-loop / static) + Loop Layout. Shared by the native theme
// wrapper and the theme-independent standalone document.
fw_ext_theme_builder_print_body_region( int $body_id ): void;

// Strip [section auto_generated="true"] wrappers (user sections preserved).
fw_ext_hfbuilder_unwrap_auto_sections( string $shortcodes ): string;
```

The `fw_ext_hfbuilder_render()` name and signature are **preserved verbatim** from the former Header &
Footer Builder extension (which Theme Builder absorbs), so the parent theme keeps working with no
edits.

## Resolver API

`FW_Theme_Builder_Resolver` is the pure, request‑cached engine that picks the winning Template.

```php
FW_Theme_Builder_Resolver::resolve();    // [ template_id, header_id, body_id, footer_id ] or null
FW_Theme_Builder_Resolver::header_id();  // int, 0 = inherit
FW_Theme_Builder_Resolver::body_id();    // int, 0 = none
FW_Theme_Builder_Resolver::footer_id();  // int, 0 = inherit
FW_Theme_Builder_Resolver::flush();      // reset the request cache (tests / preview)
```

It bails in `is_admin()`, `is_feed()`, and `is_embed()`, so a Template never hijacks a feed or oEmbed.

## Front‑end wiring

Rendering takes one of two paths depending on whether the active theme provides the integration (see
[How it renders](./rendering.md)). Detection:

```php
// True when the active theme ships the integration (the bundled theme + its children).
// Filterable; when false, the plugin renders presets itself.
apply_filters( 'fw_theme_builder_native_theme', function_exists( 'unysonplus_get_active_preset_id' ) );
```

- **Native theme** — the theme's `get_header()` / `get_footer()` render the header/footer presets; a
  Body takes over via a `template_include` filter (priority 99) that swaps in the body wrapper
  (`views/body-template.php`) when a Body applies and the queried post isn't itself a built page.
- **Foreign theme, Body applies** — the same `template_include` filter returns a standalone document
  (`views/standalone-template.php`) that renders header + body + footer itself, wrapped in
  `wp_head()`/`wp_footer()`.
- **Foreign theme, header/footer only** — a `template_redirect` handler renders the preset(s) up front
  and `ob_start()`s a buffer that splices them over the theme's site `<header>` / `<footer>` on flush
  (the preset is rendered *before* buffering, since `do_shortcode()` itself uses `ob_start()` and PHP
  forbids that inside an output‑buffer handler).
- **Asset enqueue** — under a foreign theme the matched presets' shortcode statics are enqueued for
  the head via the shortcodes extension's per‑content enqueuer, so presets render styled in both
  paths.
- **Body classes** — `<body>` gets `up-tb-template` plus `up-tb-has-header` / `up-tb-has-body` /
  `up-tb-has-footer`, so themes/CSS/JS can target Theme‑Builder requests.
- **Loop CSS** — `static/css/loop.css` is enqueued only for archive/list body requests.

## Filters

| Filter | Purpose |
| --- | --- |
| `fw_theme_builder_native_theme` | Override whether the active theme is treated as native (theme‑integrated) vs. foreign (plugin renders presets itself). |
| `fw_theme_builder_swap_pattern` | The regex used to find the site `<header>` / `<footer>` to swap under a foreign theme — retarget for unconventional markup. Args: `$pattern, $tag, $last`. |
| `fw_ext_hfbuilder_disabled_elements` | The elements hidden from the Header/Footer palette (name kept for back‑compat). |
| `fw_theme_builder_dynamic_elements` | The Dynamic Content element tags scoped to the part editors. |
| `fw_theme_builder_structure_elements` | The Structure (Flexbox) element tags scoped to the part editors. |
| `fw_ext_hfbuilder_strip_auto_sections` | Whether to strip auto sections when rendering a header/footer. |
| `fw_ext_page_builder_supported_post_types` | Theme Builder adds `up_header`/`up_footer`/`up_body`. |

## Distribution / seeding

Presets, Templates, and even whole Pages can be **bundled in a theme** and auto‑imported on
activation. A theme ships JSON under `up-templates/*.json` (header/body/footer + conditions → presets
+ a Template) and `up-pages/*.json` (→ real builder Pages, optionally the front page); the seeder
imports them on `after_switch_theme`. A **manual‑edit guard** fingerprints what it wrote
(`_upw_import_hash`) and **skips** any preset/page you've since hand‑edited, so a re‑seed never
clobbers your changes. Forcing a re‑seed is opt‑in.

## The absorbed Header & Footer Builder

Theme Builder **absorbs and replaces** the former `header-footer-builder` extension. It keeps the
`up_header` / `up_footer` CPT slugs, the `fw_ext_hfbuilder_*` render helpers, and defines the
`UP_HFBUILDER_OWNS_CPTS` sentinel (so the theme skips its own fallback CPT registration). Result: the
parent theme's existing header/footer integration works unchanged.

## Security model

1. **Data only, never executable.** Parts and Templates are database CPTs; nothing a user edits is
   written to a `.php` file or an `include()` path.
2. **Caps + nonce + sanitize.** Editing is gated on `edit_theme_options`; the grid saves through the
   options pipeline with nonces; condition `type`/`sub_type` are whitelisted and `ids` cast to int.
3. **No request‑derived includes.** The resolver maps a matched Template to a registered part id,
   never a path built from request data.
4. **Whitelisted conditionals only.** Conditions evaluate via native WordPress conditionals — no
   `eval`, no dynamic callables from stored strings.
5. **Output, not eval.** The theme‑independent surgical swap only ever splices **pre‑rendered**
   markup into the page buffer; it never executes buffered content.
