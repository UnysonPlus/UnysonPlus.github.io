---
title: The builder JSON tree format
sidebar_position: 3
---

# The builder JSON tree format

The builder stores its content as a JSON **tree** (encoded as a string under the option's `json`
key — see [How it works](./how-it-works.md#1-the-stored-value)). This page documents the shape of
that tree: what a section, row, column and element look like, and the keys every item shares.

:::note Who needs this
You don't need any of this to *use* the builder. It matters when you **generate** builder content
programmatically (importers, demo seeders, distributable templates) or **debug** a stored page.
The authoritative, continuously-verified spec lives in the plugin at
`…/extensions/page-builder/AGENTS.md`; this page is the readable summary.
:::

## Nesting

The tree nests **section → column → simple (leaf)**. Rows are normally **auto-synthesized** by
the [items corrector](./items-corrector.md) — a hand-authored or imported tree may place columns
directly under a section and the corrector inserts the rows. By kind:

- A **section** or **column** export decodes to a **single object** (`{"type":"section", …}`).
- A **full-page** export decodes to an **array** of section objects (`[{"type":"section"}, …]`).

## Every item shares these keys

| Key | Meaning |
| --- | --- |
| `type` | `"section"` \| `"column"` \| `"row"` \| `"simple"` (or a registered section-like / custom type) |
| `unique_id` | 32-hex id, **unique per item** (collisions break rendering — see below) |
| `css_id` | The wrapper's `id` attribute (empty by default) |
| `css_class` | Extra classes on the wrapper |
| `custom_css` | Per-item raw CSS; use the literal token `selector` for the item's auto-generated wrapper |
| `responsive_hide` | `[]` when nothing hidden, else a breakpoint→`true` map, e.g. `{"hide-md":true}` |
| `custom_attrs` | `[]`, or a list of `{ "name": "...", "value": "..." }` custom HTML attributes |
| `animation` | An animation block (see skeleton below) |

Containers (`section` / `column` / `row`) additionally carry **`_items`** (their children). A
leaf is `{"type":"simple","shortcode":"<atom>","atts":{…},"_items":[]}`.

:::caution `unique_id`s are not regenerated on import
The template importer does **not** re-roll `unique_id`s. When you generate a tree, emit a fresh
32-hex id per item — duplicated ids across items cause rendering/anchor collisions.
:::

## Atoms use underscores

The leaf `shortcode` value is the **underscored atom**, not the hyphenated folder name:
`special_heading`, `text_block`, `icon_box`, `code_block` (folders are `special-heading`,
`text-block`, …). A **column's `width`** is a **top-level key** on the column item (sibling to
`type`/`atts`/`_items`), e.g. `"1_2"`, `"1_3"`, `"2_3"` — underscore, not slash. See
[Column widths](./column-widths.md).

## Shared sub-objects

These composite option values recur across elements. Paste them verbatim and fill the non-empty
values:

```json
"animation": {"enable":"no","yes":{"effect":"animate__fadeInUp","speed_preset":"","advanced_tweaks_heading":"","delay":0,"custom_duration":0,"repeat_count":1,"loop_forever":"no","replay_on_scroll":"no","easing":""}}

"<any>_color": {"predefined":"","custom":""}

"spacing": {"margin":{"all":"","top":"","right":"","bottom":"","left":""},"padding":{"all":"","top":"","right":"","bottom":"","left":""},"advanced":[]}

"background_image": {"type":"custom","custom":"","predefined":"","data":{"icon":"","css":[]}}

"min_height": {"preset":"auto","custom":{"custom_height":{"value":"","unit":"px"}}}
```

A few conventions worth knowing:

- **`*_color`** — the `predefined` half holds a preset utility class (`bg-{slug}` for backgrounds,
  `text-{slug}` for text), the `custom` half holds a hex/rgba. They're mutually exclusive.
- **`spacing.advanced`** is `[]` when unused, but a **breakpoint map** of margin/padding utility
  classes when set: `{"lg":{"margin":{"top":"mt-lg-7", …},"padding":{…}}, "md":{…}}`.
- **`custom_css`** uses the literal token `selector` for the item's generated wrapper:
  `"custom_css":"selector {\r\npadding-top:50px;\r\n}"`. For repeated children, prefer putting the
  CSS **once on the section** scoped to a child class (`selector .my-tile{…}`) and adding that
  class to each column's `css_class` — it keeps the generated stylesheet small.

## Section and column skeletons

Modern **sections** carry a full background-pro object under `background` (color + gradient +
image + video layers) alongside the legacy `bg_color` / `background_image` keys kept for
back-compat. **Columns** carry per-device width/offset/alignment keys mirroring the top-level
`width`. Section and column `atts` are a **superset** — older exports omit newer keys and the
importer fills defaults, so a subset still imports cleanly. For the exact, current skeletons,
copy a recent real export or the `AGENTS.md` reference rather than hand-typing every key.

## Distributable template envelope

A shareable template is one `.json` file wrapping the tree:

```json
{
  "_fw_template_export": {
    "format_version": 2,
    "kind": "section",            // "section" | "full" | "column" — must match the import list
    "builder_type": "page-builder",
    "plugin_version": "2.8.47",   // informational, not validated
    "exported_at": 1780419966
  },
  "title": "FAQ + Editorial",
  "json": "<STRINGIFIED builder tree>",
  "created": 1780335039
}
```

On import the system enforces only: the user can `edit_posts`; the envelope `kind` matches the
list being imported into; `builder_type` is `page-builder`; `json` decodes to valid JSON whose
**top-level `type`** matches the list; and the file is ≤ 5 MB. Everything else (`format_version`,
`plugin_version`) is informational. Imported templates are stored as the wp_option
`fw:bt:s:page-builder:<md5(json)>`.

## Full-page import via WXR

A complete published page needs two post metas:

- `fw:opt:ext:pb:page-builder:json` — the builder tree as a JSON **array** string `[ {section…} ]`.
- `fw_options` — a PHP-`serialize()`d array whose `page-builder` key is
  `{ json:"[]", builder_active:true }`. The `builder_active:true` flag is what makes the theme
  render builder output. Also set `_wp_page_template = default`.
