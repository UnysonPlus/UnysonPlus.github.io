---
sidebar_position: 2
title: Custom Fields
---

# Custom Fields

An ACF-style custom fields builder for Unyson+. Create **Field Groups**, choose which post
types they appear on, and add fields — text, textarea, WYSIWYG, image, gallery, select,
checkbox, color, date and more. Fields render as native meta boxes and save to post meta.

## Reading values on the front end

```php
<?php
// Read a field saved by a Custom Fields group
$subtitle = fw_get_field( 'subtitle' );

if ( $subtitle ) {
    echo '<p class="subtitle">' . esc_html( $subtitle ) . '</p>';
}
```

## Typical workflow

1. Activate **Custom Fields** from **Unyson+ → Extensions**.
2. Create a **Field Group** and pick the post types/locations it shows on.
3. Add fields and save.
4. Edit a post — the fields appear as a meta box.
5. Output the values in your templates with `fw_get_field( 'name' )`.

:::note Work in progress
Expand this page with screenshots and a field-type reference.
:::
