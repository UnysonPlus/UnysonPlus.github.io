---
title: Add a shortcode
sidebar_position: 2
---

# Add a shortcode (page-builder element)

Page-builder **elements** are shortcodes. To add one you create a folder under the Shortcodes
extension and the framework auto-discovers it, no core edits. There are two kinds:

- **Simple content elements** (a Button, Divider, Text Block, …) — the common case. A folder with a
  config, options, view, and assets. **No PHP class required.**
- **Section-like elements** (a custom Section variant that lives at the page root and holds rows) —
  needs a small registration class. Covered at the end.

## Simple element: folder structure

Create `framework/extensions/shortcodes/shortcodes/<your_element>/`:

```
shortcodes/my_element/
├── config.php                  page-builder tab / title / icon / popup size
├── options.php                 the fields shown in the edit modal (= the atts schema)
├── views/view.php              the front-end HTML template
├── static.php                  front-end CSS/JS enqueues (optional)
└── static/
    ├── img/page_builder.svg    the palette icon (REQUIRED)
    └── css/my_element.css      (optional) front-end styles
```

That's it. The Shortcodes loader scans this directory; a folder with a `config.php` and a
`views/view.php` becomes a registered element automatically. The shortcode tag is the folder name
(use underscores: `my_element`).

### `config.php` — where it appears in the builder

```php
<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );

$cfg = array();
$cfg['page_builder'] = array(
    'title'       => __( 'My Element', 'fw' ),
    'description' => __( 'What this element does', 'fw' ),
    'tab'         => __( 'Content Elements', 'fw' ), // which palette tab
    'popup_size'  => 'small',                         // edit-modal width: small | medium | large
);
```

The `tab` decides which palette group it lands in (Content / Media / Interactive / Components /
Header-Footer Elements).

### `options.php` — the fields (and the atts schema)

`options.php` returns an array of [option types](/docs/options/option-types). Each becomes a field in
the element's edit modal, and each field's saved value becomes a key in the element's `atts`.

```php
<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );

$options = array(
    'heading' => array(
        'type'  => 'text',
        'label' => __( 'Heading', 'fw' ),
        'value' => __( 'Hello', 'fw' ),
    ),
    'align' => array(
        'type'    => 'select',
        'label'   => __( 'Alignment', 'fw' ),
        'choices' => array( 'left' => 'Left', 'center' => 'Center', 'right' => 'Right' ),
        'value'   => 'left',
    ),
);
```

:::note `options.php` is a contract
The shape of `options.php` **is** the schema that the page-builder JSON (template export/import,
demo importers, AI generators) must match when producing `atts` for this element. Keep it documented
in the element's sibling `AGENTS.md`.
:::

### `views/view.php` — the front-end output

`$atts` (the resolved option values) and `$content` (rendered inner content, for container elements)
are in scope. Output lean, semantic markup, no wrapper-div soup, per the
[clean-DOM philosophy](/docs/page-builder/clean-dom):

```php
<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );
/** @var array $atts */
?>
<div class="my-element my-element--<?php echo esc_attr( $atts['align'] ); ?>">
    <h3><?php echo esc_html( $atts['heading'] ); ?></h3>
</div>
```

### `static.php` — enqueue assets (optional)

```php
<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );

wp_enqueue_style(
    'my-element',
    fw_ext( 'shortcodes' )->get_uri( '/shortcodes/my_element/static/css/my_element.css' ),
    array(),
    fw_ext( 'shortcodes' )->manifest->get_version() // cache-bust on version bump
);
```

## The builder icon (required)

Always ship `static/img/page_builder.svg`. The builder auto-detects it (SVG preferred) and inlines it
as the palette icon. House style for simple content / header-footer elements is a **crisp 16×16
monochrome glyph**, displayed 1:1:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
     fill="#b3b3b3" shape-rendering="crispEdges" aria-hidden="true">
  <!-- pixel-aligned rects / paths for the element's purpose -->
</svg>
```

Use `viewBox="0 0 16 16"` (16-grid = 1:1 crisp pixels at the 16px render size), a fixed
`fill="#b3b3b3"` (not `currentColor`, which resolves too dark in the editor), `crispEdges`, and
integer coordinates. Match the density of an existing icon (`text-block`, `accordion`, `site-search`
are good references). **Layout / section-like** elements use a larger thumbnail style instead
(`viewBox="0 0 60 40"`, outlined strokes) — see `section/`.

## Verify

After uploading and a hard refresh on a post-edit screen:

1. Your element shows in its palette tab with the configured title + icon.
2. Drag it onto the canvas; the edit modal opens with your options.
3. Set values, save the page, view the front end; `view.php` renders with your `atts`.

## Section-like elements

A section-like element (a custom Section variant that sits at the page root and holds rows/columns)
needs a little registration so the items-corrector, section-sorter, and Save-as-Template all treat it
like the built-in `[section]`. You add **one shortcode class** and **one page-builder item class**,
wired through three hooks in the shortcode's `_init()`:

```php
class FW_Shortcode_My_Section extends FW_Shortcode {
    public function _init() {
        // 1. Load the page-builder item class when the editor renders.
        add_action( 'fw_option_type_builder:page-builder:register_items',
            array( $this, '_action_register_builder_item_types' ) );

        // 2. Eagerly mark this type "section-like" for admin-ajax / the items
        //    corrector (CRITICAL — without it, template save / import mis-handle it).
        add_filter( 'fw_section_like_types', function ( $types ) {
            $types[] = 'my_section';
            return $types;
        } );

        // 3. Expose this element's data bundle to the editor collector.
        add_filter( 'fw_ext:shortcodes:collect_shortcodes_data', array( $this, '_filter_add_data' ) );
    }
}
```

The item class just extends the shared base and declares its type:

```php
class Page_Builder_My_Section_Item extends Page_Builder_Section_Like_Item {
    public function get_type() { return 'my_section'; }
}
FW_Option_Type_Builder::register_item_type( 'Page_Builder_My_Section_Item' );
```

Extending `Page_Builder_Section_Like_Item` gives you the registry registration, items-corrector
opt-outs, `_items` recursion, the Save-as-Template UI, export/import round-trip, and the hierarchy
guards for free.

:::caution The most-bitten trap
Don't forget the **eager `fw_section_like_types` filter** (step 2). The `register_items` action only
fires on the editor-render lifecycle; admin-ajax handlers (template save, import, the items corrector
running on `wp_insert_post`) won't see your type as section-like without the filter, and will reject
or mis-handle it.
:::

The canonical worked example lives in the plugin at
`framework/extensions/shortcodes/shortcodes/AGENTS.md` (the section-like recipe) with `hero-section/`
as the reference implementation.
