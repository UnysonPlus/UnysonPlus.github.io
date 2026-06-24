---
title: Developer reference
sidebar_position: 5
---

# Developer reference

The implementation surface of the Theme Builder, for theme/extension developers. As the extension is
still being finalized, treat names here as current-build accurate but subject to change.

## Content types (CPTs)

All four are **private** (`public => false`, `show_in_rest => false`), gated on `edit_theme_options`,
and registered on `init`.

| CPT | Holds | UI |
| --- | --- | --- |
| `up_header` | header builder content | edits in the builder (under the Theme Builder menu) |
| `up_footer` | footer builder content | same |
| `up_body` | full-page body builder content | same |
| `up_template` | references + conditions only (no builder content) | `show_ui => false`; managed via the Templates grid |

The three part CPTs support `title`, `editor`, `revisions`; the page builder is attached to them
after the page-builder extension initializes (priority 10000), and they're exposed to
`fw_ext_page_builder_supported_post_types`.

## Post-meta contract

Read on the front end by the resolver; written by the admin grid (Templates) and the part meta boxes.

| Meta key | On | Value |
| --- | --- | --- |
| `tb_header_id` | `up_template` | int part id, `0` = inherit |
| `tb_body_id` | `up_template` | int part id, `0` = none |
| `tb_footer_id` | `up_template` | int part id, `0` = inherit |
| `tb_conditions` | `up_template` | `{ use_on: rule[], exclude_from: rule[] }` |
| `hf_type` / `hf_behavior` | `up_header` | the Header Type / Scroll Behavior selects |
| `tb_loop_columns` / `tb_loop_gap` | `up_body` | the archive Loop Layout settings |

A **rule** is `{ type, sub_type, ids }`. Types: `df` (entire site), `ct` (conditional tag:
`front_page`/`blog_index`/`search`/`error_404`/`archive`/`author`/`date`), `pt` (post type / specific
post ids), `ptc` (children of pages), `tx` (singular in given terms), `tax` (term archive), `ar`
(post-type archive). Matching is via native WP conditionals only.

## Render helpers

```php
// Header/footer preset → inner HTML (theme wraps it in <header>/<footer>).
// Strips auto-generated <section> wrappers; recursion-guarded.
fw_ext_hfbuilder_render( int $post_id, string $kind = 'header' ): string; // 'header' | 'footer'

// Body template → full HTML (sections preserved). Recursion-guarded.
fw_ext_theme_builder_render_body( int $post_id ): string;

// Strip [section auto_generated="true"] wrappers (user sections preserved).
fw_ext_hfbuilder_unwrap_auto_sections( string $shortcodes ): string;
```

The `fw_ext_hfbuilder_render()` name and signature are **preserved verbatim** from the former
Header & Footer Builder extension (which Theme Builder absorbs), so the parent theme keeps working
with no edits.

## Resolver API

`FW_Theme_Builder_Resolver` is the pure, request-cached engine that picks the winning Template.

```php
FW_Theme_Builder_Resolver::resolve();    // [ template_id, header_id, body_id, footer_id ] or null
FW_Theme_Builder_Resolver::header_id();  // int, 0 = inherit
FW_Theme_Builder_Resolver::body_id();    // int, 0 = none
FW_Theme_Builder_Resolver::footer_id();  // int, 0 = inherit
FW_Theme_Builder_Resolver::flush();      // reset the request cache (tests / preview)
```

It bails in `is_admin()`, `is_feed()`, and `is_embed()`, so a Template never hijacks a feed or oEmbed.

## Front-end wiring

- **Body** — a `template_include` filter (priority 99) swaps in the Body wrapper
  (`views/body-template.php`) when `body_id() > 0` and the queried post isn't itself a builder page.
- **Body classes** — `<body>` gets `up-tb-template` plus `up-tb-has-header` / `up-tb-has-body` /
  `up-tb-has-footer` (mirrors Divi's `et-tb-*`), so themes/CSS/JS can target Theme-Builder requests.
- **Loop CSS** — `static/css/loop.css` is enqueued only for archive/list body requests.

## Filters

| Filter | Purpose |
| --- | --- |
| `fw_ext_hfbuilder_disabled_elements` | The elements hidden from the Header/Footer palette (name kept for back-compat). |
| `fw_theme_builder_dynamic_elements` | The Dynamic Content element tags scoped to the part editors. |
| `fw_theme_builder_structure_elements` | The Structure (Flexbox) element tags scoped to the part editors. |
| `fw_ext_hfbuilder_strip_auto_sections` | Whether to strip auto sections when rendering a header/footer. |
| `fw_ext_page_builder_supported_post_types` | Theme Builder adds `up_header`/`up_footer`/`up_body`. |

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
3. **No request-derived includes.** The resolver maps a matched Template to a registered part id,
   never a path built from request data.
4. **Whitelisted conditionals only.** Conditions evaluate via native WordPress conditionals, no
   `eval`, no dynamic callables from stored strings.
