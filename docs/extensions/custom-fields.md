---
sidebar_position: 2
title: Custom Fields
---

# Custom Fields

An ACF-style custom fields builder for Unyson+. Create **Field Groups**, choose which post
types they appear on, and add fields. Fields render as native meta boxes and save to post meta,
no code to register them.

<img src="/img/custom-fields-page.png" alt="The Custom Fields admin page — Field Groups and the JSON Export / Import tools" width="1260" />

## Field types

Each field in a group has a label, a **name** (its meta key), an optional instruction, and a type:

| Group | Types |
| --- | --- |
| **Text** | `text`, `textarea`, `wysiwyg`, `number`, `url`, `email`, plus width variants `medium-text`, `short-text` |
| **Choice** | `select`, `short-select`, `radio`, `checkbox`, `checkboxes`, `switch` |
| **Media** | `image`, `file`, `gallery` |
| **Other** | `color`, `date` |
| **Repeater** | a repeating set of sub-fields (see below) |

### Repeater fields

A **Repeater** holds a repeating row of sub-fields. You define the sub-fields with a simple
`name | Label | type` line list (types: text, textarea, wysiwyg, number, url, image, file, gallery,
color, date, switch, checkbox). On the edit screen it renders as an addable list of rows; the saved
value is an array of rows, each keyed by sub-field name, which you loop over with `fw_get_field()`.

## Group settings

A field group is more than a list of fields. Per group you can set:

- **Show on post types** — which post types display the group (the primary target).
- **Location refinements** — narrow further by **Page templates** and/or **Post statuses**; the group
  only applies when the edited post matches.
- **Meta-box position**, a **Description** (rendered as a note atop the box), and a **Display title**
  (overrides the box heading).
- **Active** (inactive groups are skipped) and **Order** (lower numbers render first when several
  groups apply).
- **Hide on screen** — remove core meta boxes (Excerpt, Discussion, Comments, Revisions, Slug,
  Author, Format, Page Attributes, Featured Image, Categories, Tags, …) from the target edit screen.
- **Show in REST API** — expose the group's values under `unysonplus_fields` on the targeted post types.

## Import / Export

All field groups can be exported as JSON and imported on another site (Tools section, import appends
or replaces), so a field setup is portable.

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

`fw_get_field()` takes the field name, an optional post ID, and an optional default:
`fw_get_field( $name, $post_id = null, $default = null )`. For a repeater, it returns an array of
rows you loop over.
