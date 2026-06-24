---
title: Dynamic Content
sidebar_position: 7
---

# Dynamic Content

**Dynamic Content** is Unyson+'s dynamic-tags system (think Elementor Pro's dynamic tags). You drop
a token like `{{site_name}}` into a text field, and at render time it becomes a live value: the post
title, the current year, a custom field, a WooCommerce product price, and so on. Edit the source
once (or let WordPress supply it) and every place that uses the token stays correct.

It's available wherever you type into a **Text**, **Short Text**, **Textarea**, or **Rich Editor**
field (the page builder, element options, theme settings, meta boxes) and in the classic post editor.

## Token syntax

```text
{{tag_id}}                                  simple
{{tag_id|param=value|fallback=Some text}}   parameterized, with an optional fallback
```

- **Double braces, pipe-delimited params.** The grammar is collision-resistant and survives
  `wp_kses_post()` / `esc_attr()` untouched, so the field's normal escaping still applies to the
  *resolved* value (the resolver only ever returns plain strings, never HTML).
- **`fallback`** is a reserved param, used when the tag resolves to an empty string.
- **Unknown tags are left literally** in the output. A typo is never fatal and never blanks the field.

```text
Welcome to {{site_name}}

© {{copyright_year}} {{site_name}}. All rights reserved.

{{post_meta|key=subtitle|fallback=No subtitle set}}

Published {{post_date|format=F j, Y}}
```

## Inserting a token (the picker)

Text-like fields show a small **database icon** (the *Insert Dynamic Content* trigger). Click it for
a searchable, grouped popover of every available tag; pick one and the `{{token}}` is inserted at the
cursor. Tags that take parameters (a date format, a meta key) expose those inputs right in the popover.

The same picker is added to the **classic post editor's** media-buttons row, so you can drop tokens
into post body content too.

## Available tags

These ship in the box. The **Links** group adds one entry per public post type, and the
**WooCommerce** group only appears when WooCommerce is active.

### Post

| Tag | Params | Resolves to |
| --- | --- | --- |
| `{{post_title}}` | — | The post title |
| `{{post_excerpt}}` | — | The post excerpt |
| `{{post_content}}` | — | The post content, stripped of tags |
| `{{post_id}}` | — | The post ID |
| `{{post_url}}` | — | The post permalink |
| `{{post_date}}` | `format` | The publish date (PHP date format; blank = site format) |
| `{{post_modified}}` | `format` | "Last Updated" — WP's `post_modified` (the last time Update was pressed) |

### Site

| Tag | Resolves to |
| --- | --- |
| `{{site_name}}` | Site Title (Settings → General) |
| `{{site_tagline}}` | Site Tagline |
| `{{site_url}}` | Home URL |
| `{{admin_email}}` | Admin email |

### Author

| Tag | Resolves to |
| --- | --- |
| `{{author_name}}` | Post author's display name |
| `{{author_bio}}` | Author biographical info |
| `{{author_url}}` | Author archive URL |

### Date & Time

| Tag | Params | Resolves to |
| --- | --- | --- |
| `{{current_date}}` | `format` | Today's date |
| `{{current_time}}` | `format` | The current time |
| `{{current_year}}` | — | The current year (e.g. `2026`) |
| `{{current_month}}` | — | The current month name |
| `{{current_day}}` | — | The current weekday name |
| `{{copyright_year}}` | — | The current year (a convenience alias for `© {{copyright_year}}` footers) |

### Links

| Tag | Params | Resolves to |
| --- | --- | --- |
| `{{<type>_permalink}}` | `id` | A live `get_permalink()` for a chosen item of that post type. e.g. `{{page_permalink|id=42}}` |

One tag is registered per public post type (`page_permalink`, `post_permalink`, …). The picker's gear
dropdown lists that type's published items, capped at 200 by title. Because link fields are plain text,
dynamic content already works in them, so a `{{page_permalink|id=42}}` in a button's URL keeps pointing
at the right page even after its slug changes.

### Custom field

| Tag | Params | Resolves to |
| --- | --- | --- |
| `{{post_meta}}` | `key`, `fallback` | An Unyson+ post option value, falling back to native post meta |

### WooCommerce (when active)

| Tag | Resolves to |
| --- | --- |
| `{{product_title}}` | The product name |
| `{{product_price}}` | The product price (formatted) |
| `{{product_sku}}` | The product SKU |
| `{{product_stock}}` | The stock status / quantity |
| `{{product_rating}}` | The average rating |

## Where tokens resolve

Resolution happens at **render time**, in two places:

- **Shortcodes & the page builder.** A resolver hooks `fw_shortcode_render_view:atts` (in
  `extensions/shortcodes/includes/dynamic-content-resolver.php`) and runs every element's atts through
  `fw_dynamic_content()->resolve_recursive()` right before the view renders. Because it runs *before*
  the view's own escaping, the resolved value inherits the element's existing `esc_*` / `wp_kses_post`.
- **The classic editor body.** A `the_content` filter (priority 9, before `do_shortcode`) resolves
  tokens typed directly into post content.

To resolve a token **anywhere else** (a custom theme template, for example), call the resolver
directly:

```php
echo esc_html( fw_dynamic_content()->resolve( 'Hi from {{site_name}}', array( 'post_id' => get_the_ID() ) ) );
```

`$context['post_id']` scopes post / author / meta tags to a specific post; omit it and the resolver
falls back to the current/global post.

## Enabling or disabling the picker per field

The picker is **on by default** for `text`, `short-text`, `textarea`, and `wp-editor` options. Control
it per field:

```php
// Hide the picker on a specific field:
'my_field' => array( 'type' => 'text', 'dynamic_content' => false ),

// Enable it on a custom text-like option type — add to its _get_defaults():
'dynamic_content' => true,
```

## Add your own tags (ACF, Pods, a custom value)

The registry is one filter, `fw:dynamic-content:tags`, so a new provider is a single file with no
changes to the core class, the picker, or the resolver:

```php
add_filter( 'fw:dynamic-content:tags', function ( $tags ) {
    // Guard availability INSIDE the callback (it runs after init); the group
    // stays invisible when the integration is inactive.
    if ( ! function_exists( 'get_field' ) ) {
        return $tags;
    }

    $tags['acf_field'] = array(
        'label'   => __( 'ACF Field', 'my-domain' ),
        'group'   => __( 'ACF', 'my-domain' ),       // picker heading
        'params'  => array(
            array( 'id' => 'name', 'label' => 'Field name', 'type' => 'text', 'default' => '' ),
        ),
        'resolve' => function ( $params, $context ) {
            $post_id = ! empty( $context['post_id'] ) ? (int) $context['post_id'] : get_the_ID();
            $val = get_field( $params['name'], $post_id );
            return is_scalar( $val ) ? (string) $val : ''; // MUST return a scalar
        },
    );

    return $tags;
} );
```

A tag is `label`, `group`, optional `params` (each `array('id','label','type','default')`), and a
`resolve` callable `function( array $params, array $context ): scalar`. A param's `type` is `'text'`
(default) or `'select'` (add an ordered `'choices'` array of `array('value'=>…, 'label'=>…)`).

:::caution Resolver rules
- Resolvers **must return a scalar** — arrays/objects are coerced to an empty string.
- **Never echo HTML** from a resolver; return text and let the consuming view escape it.
- Param values are stripped of `{`, `}`, `|` to protect the token grammar.
- Guard third-party availability **inside** the callback, not at file load (the filter runs after
  `init`), so an inactive integration simply hides its group.
:::
