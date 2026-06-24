---
title: Display a custom field on your pages
description: Create an editable custom field with Unyson+ Custom Fields and show its value on the front end, with a token or a one-line PHP call.
---

# Display a custom field on your pages

Custom fields let editors add structured data to a post or page (a subtitle, a price, a CTA label)
without touching code. This guide adds an editable **Subtitle** field to pages and displays it.

## 1. Create the field

1. Activate **Custom Fields** (Unyson+ → Extensions).
2. Go to **Unyson+ → Custom Fields → Add Field Group**. Name it "Page extras" and set **Show on post
   types → Page**.
3. Add a field: label **Subtitle**, name `subtitle`, type **Text**. Save.
4. Edit any page, a **Subtitle** field now appears in a meta box. Fill it in and update.

## 2. Show it on the front end

Two ways, pick whichever fits.

**No code, in a builder text field** using [Dynamic Content](/docs/dynamic-content):

```text
{{post_meta|key=subtitle|fallback=}}
```

**In a theme template** (PHP):

```php
$subtitle = fw_get_field( 'subtitle' );
if ( $subtitle ) {
    echo '<p class="page-subtitle">' . esc_html( $subtitle ) . '</p>';
}
```

## Going further

Custom Fields supports many field types (text, WYSIWYG, image, gallery, select, date, color, a
**Repeater** for repeating rows, and more), plus per-group rules (post types, page templates, post
statuses) and JSON import/export. See [Custom Fields](/docs/extensions/custom-fields).

## See also

- [Dynamic Content](/docs/dynamic-content) — the `{{token}}` system
- [Create a custom post type](./custom-post-type.md)
