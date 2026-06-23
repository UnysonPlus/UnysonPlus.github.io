---
title: "WordPress Shortcodes"
---

# WordPress Shortcodes

This extension lets you insert and correctly render **Unyson+ shortcodes inside the WordPress
editor**, not just inside the Page Builder. It adds an **Insert Shortcode** button to the classic
editor's toolbar that opens a picker of the available elements and drops the chosen shortcode into
your content.

It's a focused helper, not a full visual builder: for laying out whole pages, use the
[Page Builder](/docs/page-builder). Reach for this when you want a single element (a button, a
notification, an icon box) inside otherwise-normal post content.

## Using it

Activate **WordPress Shortcodes** from **Unyson+ → Extensions**, then edit a post or page in the
classic editor. The toolbar gains an **Insert Shortcode** button listing every enabled shortcode,
**except** the layout containers `section`, `column`, and `row` (those only make sense inside the
builder). Pick one, and its shortcode is inserted at the cursor.

### Choosing which shortcodes appear

Filter the list of shortcodes offered in the editor button with
`fw:ext:wp-shortcodes:default-shortcodes`. Return an array of the shortcode tags you want:

```php
<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );

add_filter( 'fw:ext:wp-shortcodes:default-shortcodes', 'my_wp_shortcodes_list' );

function my_wp_shortcodes_list( $shortcodes ) {
    return array( 'button', 'notification' ); // only offer these two
}
```

## What renders where (the contexts)

A Unyson+ shortcode is made of three parts, and how many of them render depends on **where** the
shortcode is inserted:

- **HTML** — the markup from the element's `view.php`.
- **Static assets** — CSS/JS enqueued from `static.php`.
- **Dynamic CSS** — per-instance styles enqueued on
  `fw_ext_shortcodes_enqueue_static:{name}` via `wp_add_inline_style`.

| Where the shortcode is inserted | HTML | Static assets | Dynamic CSS |
| --- | --- | --- | --- |
| **The main post editor** (this extension's button) | ✅ | ✅ | ✅ |
| **A `wp-editor` field inside a Page Builder element** | ✅ | ✅ | ❌ |
| **A `wp-editor` field anywhere else** (Theme Settings, any options modal) | ✅ | ❌ | ❌ |

In the **main post editor** everything works out of the box, this is the simplest case. In the other
two contexts the HTML still renders, but the asset/dynamic-CSS layers may not be enqueued, so an
element that relies on dynamic per-instance CSS (some styling presets, per-element custom CSS) can
look unstyled. For those, build the element in the [Page Builder](/docs/page-builder) instead, where
the full render pipeline runs.

:::note A focused tool
This extension is intentionally limited to inserting and rendering shortcodes in editor content. It
doesn't provide the drag-and-drop layout, options modals, or live preview of the Page Builder, that's
what the builder is for.
:::
