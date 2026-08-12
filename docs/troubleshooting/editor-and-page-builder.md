---
title: Editor & Page Builder
sidebar_position: 3
slug: /troubleshooting/editor-and-page-builder
description: Fixes for the Unyson+ page builder — stacked editors, a blank options panel, layout not rendering on the front end, column wrapping, and literal tokens.
---

# Editor & Page Builder

## I see two editors stacked on the post screen

**Symptom:** the post screen shows the block editor *and* the Page Builder meta box at the same time.

**Cause:** the Page Builder sits in a meta box **below** the content editor. With the Gutenberg block
editor active you see both at once.

**Fix:** install and activate the **Classic Editor** plugin, which restores WordPress's original editor
and works much better alongside the builder. Unyson+ shows a dismissible notice recommending it; dismiss
the notice instead if you prefer the stacked layout.

## An element's options panel opens blank with just "error:"

**Symptom:** opening a **pre-existing** element's options shows a blank modal with just `error:`. It
never happens on a newly-added element.

**Cause:** the modal opens with the element's **raw saved atts**, because `get_value_from_attributes()`
(the PHP that would re-derive values) does **not** run on a normal editor load. When an option's stored
value *shape* changed in an update (most often when an option was converted to a different type), the
legacy value reaching the new renderer throws.

**Fix (for users):** the element still renders correctly on the front end. Re-saving the page once
through a working modal usually clears it. If one element stays stuck, note which one and report it.

**Fix (for developers):** ship a JS-side migrator in the element's `scripts.js` that runs before the
modal opens. See [Migrating an option's value shape](/docs/page-builder/value-shape-migrations).

## My builder layout doesn't render on the front end

**Symptom:** a page shows its plain content instead of the builder layout.

**Cause:** the page needs the **builder active**. Switching a page to the Unyson Builder and saving
stores a `builder_active` flag alongside the builder JSON, and that flag is what tells the theme to
render builder output.

**Fix:** open the page, confirm the **Unyson Builder** is the active editor, and re-save.

## Columns aren't wrapping the way I expect

Two things to know:

- The only fifth-width is **`1_5`** (20%). There is no `2_5` / `3_5` / `4_5`.
- By default (Bootstrap 5 mode) all of a section's columns stay in one row and **flex-wrap** handles
  wrapping. **Bootstrap 3 Legacy Mode** (Page Builder settings) instead auto-splits columns into
  separate rows once they exceed 12/12.

See [Column widths & the grid](/docs/page-builder/column-widths).

## A `{{token}}` shows literally on the page

**Symptom:** a dynamic-content tag renders as literal `{{token}}` text.

**Cause:** [Dynamic Content](/docs/dynamic-content) leaves **unknown tags literal** on purpose — it
never fatals or blanks the page. A misspelled or missing tag id simply passes through.

**Fix:** check the tag id is spelled correctly and exists in the catalog. Resolution is scoped to the
shortcode / builder render path and the post body; to resolve a token elsewhere in a theme template,
call `fw_dynamic_content()->resolve( $text, array( 'post_id' => $id ) )` directly.
