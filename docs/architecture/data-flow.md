---
title: "Data flow: edit → stored JSON → render"
sidebar_position: 5
---

# Data flow: edit → stored JSON → render

This page ties the pieces together: what actually happens to a page's content as it travels from
the editor, into the database, and back out as HTML on the front end. It's the bird's-eye version;
each stage links to the deep-dive that covers it.

## The round trip

```
   ┌─────────────┐   save    ┌──────────────────────────┐  render   ┌─────────────┐
   │  Editor /   │ ────────▶ │  Database (post meta)     │ ────────▶ │  Front end  │
   │  Page Builder│          │  builder tree as JSON      │           │  HTML       │
   └─────────────┘   ◀────────└──────────────────────────┘            └─────────────┘
                     editor load (raw atts, no PHP)
```

Two facts drive everything else:

1. **Builder content is stored as one JSON value**, not as parsed shortcodes. The shortcode string
   is *generated from* that JSON at render time.
2. **Option values are re-hydrated on render, not on editor load.** Opening an element's modal uses
   the raw saved values; PHP value-derivation runs only on the render / conversion path.

## Stage by stage

### 1. Authoring (editor)

In the builder, each item (section / row / column / leaf element) is a Backbone model. Adding,
sorting and editing happen client-side. Option modals are constructed from the model's **raw saved
`atts`** — no PHP runs first. This is the source of the editor-load value-shape trap covered in
[the items-corrector & editor-load gotcha](/docs/page-builder/items-corrector) and the
[migration pattern](/docs/page-builder/value-shape-migrations).

### 2. Storage

On save the model tree is serialized to a JSON **string** and stored under the `page-builder`
option's value:

```php
'value' => array(
    'json'           => '[ … builder tree … ]',  // a string
    'builder_active' => true,                     // render builder output vs default content
)
```

It's persisted to post meta as `fw:opt:ext:pb:page-builder:json`. The framework's **option-storage**
layer (`framework/includes/option-storage/`) is the general mechanism here — option types declare a
storage type and the framework reads/writes the value transparently (post meta, term meta, or
wp_option). See [The builder JSON tree format](/docs/page-builder/builder-json-format).

### 3. Rendering

On the front end the option type converts the stored JSON back to HTML
(`FW_Option_Type_Page_Builder::json_to_shortcodes()`):

```
json_to_shortcodes(json)
   ├─ get_value_from_items()        re-hydrate each item's option values (PHP)
   ├─ items corrector .correct()    wrap loose items into section→row→column, group columns
   ├─ notation generator            build [section][row][column][atom …][/atom] … [/section]
   └─ do_shortcode()                each element's view.php → clean HTML
```

The full mechanics — the corrector's grid rules, the `fw_inner_*` aliasing, the resilience guard —
are in [How the Page Builder works](/docs/page-builder/how-it-works).

## Where each layer owns a stage

| Stage | Owned by |
| --- | --- |
| Authoring UI, modals | the **builder** + **shortcodes** extensions (backend) |
| Stored value & storage type | the **page-builder** option type + framework **option-storage** |
| JSON → shortcodes → HTML | the **page-builder** option type + each element's `view.php` |
| Theme rendering of builder output | the **parent theme** (checks `builder_active`) |

## Beyond the page builder

The same option-storage + option-types machinery powers **Theme Settings** and **meta boxes** too
— they're just different option arrays stored against a wp_option or post, rendered by the backend
component and read back with helpers like `fw_get_db_settings_option()` / `fw_get_db_post_option()`.
The page builder is the most elaborate consumer of that machinery, not a separate system. For the
options layer itself, see [Option types](/docs/options/option-types).
