---
title: How the Page Builder works
sidebar_position: 2
---

# How the Page Builder works

The Page Builder is, at its core, a single **option type** — `page-builder`
(`FW_Option_Type_Page_Builder`, which extends the generic `FW_Option_Type_Builder`). Everything
you drag onto the canvas is serialized into one JSON value, stored in post meta, and turned back
into HTML at render time by converting it to **shortcodes** and running them through WordPress's
`do_shortcode()`.

Understanding that pipeline is the key to everything else — the JSON format, the corrector, the
migration traps and the clean-DOM rule are all stages of it.

<img src="/img/page-builder.png" alt="The Page Builder — element palette and a populated section on the canvas" width="968" />

## The data flow at a glance

```
  Builder canvas (Backbone models)
        │  save
        ▼
  Stored value  { json: "<stringified tree>", builder_active: true }
        │  post meta  fw:opt:ext:pb:page-builder:json
        ▼
  Front-end render: json_to_shortcodes( json )
        │
        ├─ get_value_from_items()      → re-hydrate each item's option values
        ├─ items corrector .correct()  → wrap loose items into section→row→column, group columns
        ├─ notation generator          → build [section][row][column][atom …][/atom]…[/section]
        ▼
  do_shortcode()  →  each element's view.php  →  clean HTML
```

Every stage is a real class you can read in the source:

| Stage | Class / method | File |
| --- | --- | --- |
| Stored value shape | `FW_Option_Type_Page_Builder::_get_defaults()` | `…/page-builder/class-fw-option-type-page-builder.php` |
| Persisted post meta | `FW_Option_Storage_Type_Post_Meta_Page_Builder` | `…/includes/option-storage/` |
| JSON → shortcodes | `FW_Option_Type_Page_Builder::json_to_shortcodes()` | same option-type file |
| Grid correction | `_Page_Builder_Items_Corrector::correct()` | `…/includes/items-corrector/` |
| Shortcode string | `_Page_Builder_Notation_Generator::generate_notation()` | `…/includes/class-page-builder-notation-generator.php` |
| Per-element render | each shortcode's `view.php` | `…/shortcodes/shortcodes/<name>/views/view.php` |

## 1. The stored value

The `page-builder` option stores a small wrapper, **not** the tree directly:

```php
'value' => array(
    'json'           => '[]',   // the builder tree, JSON-encoded as a STRING
    'builder_active' => false,  // is the builder (vs the default editor) active for this post?
)
```

`builder_active` is what tells the theme to render the builder output instead of the post's
normal content. It's set on save from the `page-builder-active` request flag (see
`_get_value_from_input()`), and the theme checks it before emitting builder HTML.

The tree itself is a JSON **string** under `json`, stored in post meta as
`fw:opt:ext:pb:page-builder:json`. See [The builder JSON tree format](./builder-json-format.md)
for the anatomy of that tree.

:::note Why a string, not nested JSON?
Keeping `json` as an opaque string means the builder value round-trips through forms, AJAX and
the database without WordPress's meta handling trying to walk or "fix" the nested structure. The
builder option can also gzip very large values (`compress_form_value`), though that's rarely
triggered in practice.
:::

## 2. From canvas to JSON

In the editor each item is a **Backbone model** (section, row, column, or a "simple" leaf
element). Adding, sorting, duplicating and editing all happen client-side. On save the builder
serializes the model tree into the `json` string. The important consequence for anyone extending
an element:

> When you open an element's options modal, the modal is constructed with the element's **raw
> saved `atts`** — `new fw.OptionsModal({ values: this.model.get('atts') })`. No PHP runs first.

That single fact is the source of the most common extension bug, covered in
[The items corrector &amp; editor-load gotcha](./items-corrector.md).

## 3. Re-hydrating option values

When the front end (or the shortcode-conversion path) processes the tree, each **simple** item
runs `Page_Builder_Simple_Item::get_value_from_attributes()`. This re-derives every option's
value through `fw_get_options_values_from_input()` so that:

- an element whose modal was **never opened** gets its options' **default values**, and
- options that auto-generate part of their value (e.g. unique ids) are refreshed.

This call is wrapped in a `try { … } catch ( \Throwable $e ) {}` **resilience guard**: if an
option's stored value shape changed between plugin versions and re-derivation throws, the item
falls back to its raw saved `atts` instead of aborting the whole conversion. See
[the gotcha page](./items-corrector.md#the-resilience-guard) for why that guard exists.

## 4. Correcting the grid

A user can drop a bare element onto the canvas with no surrounding section/row/column. Before
rendering, `_Page_Builder_Items_Corrector` walks the tree and **wraps loose items** so the output
is always a valid grid: a stray simple element becomes `section → row → column → element`, and
consecutive columns are grouped into rows. Nested columns and the Container element are handled
here too. Full detail: [The items corrector](./items-corrector.md).

## 5. Generating the shortcode string

`_Page_Builder_Notation_Generator` turns the corrected tree into a shortcode string:

```
[section …][row][column …][special_heading title="…"][/special_heading][/column][/row][/section]
```

Each element's `atts` are JSON-encoded by the shortcodes extension's attribute coder, so complex
nested option values survive the round-trip into a shortcode attribute.

:::caution Nested-column aliasing
WordPress's shortcode parser is **non-recursive for the same tag** — a `[row]` inside a `[column]`
inside another `[row]` would mis-match its closing tags. So a row synthesized *inside* a column
(and that row's columns) are emitted as the alias tags **`fw_inner_row`** / **`fw_inner_column`**,
which render through the same row/column instances. The editor caps authoring at one nested level;
a hand-authored or imported tree deeper than that would re-collide at depth 2.
:::

## 6. Rendering

`do_shortcode()` runs the generated string. Each element's `view.php` emits its markup. Because
the markup is hand-written per element (not a generic wrapper soup), the output stays lean — see
[the clean-DOM philosophy](./clean-dom.md).

## The live-editor / single-item exception

When the **Live Editor** re-renders a *single* column or leaf, full correction is skipped (it
would wrap the fragment in a section/row). That path still runs a standalone
`normalize_nested_columns()` pass so a column-in-column subtree emits the `fw_inner_*` aliases
correctly. This is the only place correction is bypassed; it's gated by
`needs_correction()` and the `fw:ext:page-builder:json-structure-needs-correction` filter.
