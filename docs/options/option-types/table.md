---
title: "Table"
sidebar_position: 61
slug: /options/option-types/table
description: The Unyson+ table option type — a tabular editor storing columns, rows and cells.
---

# Table

A tabular editor: columns, rows, and a cell per intersection. Used by the [`table`](/docs/shortcodes/content-elements/table) element.

## Stored value

```php
array(
    'header_options' => array(
        'table_purpose' => 'tabular', // or 'pricing'
        'header_rows'   => 1,
        'footer_rows'   => 0,
    ),
    'cols'    => array( array( 'name' => 'default-col', 'align' => 'left', 'width' => '' ) ),
    'rows'    => array( array( 'name' => 'heading-row' ) ),
    'content' => array(
        array( array( 'textarea' => 'Plan', 'colspan' => 1, 'rowspan' => 1, 'merged' => false ) ),
    ),
)
```

Four structures that must agree: `content` is rows × columns, `cols` is as long as every content row, `rows` is as long as `content`.

`rows[i]['name']` is **derived**, not chosen — a row is `heading-row` when its index falls inside `header_rows`, which is how the renderer produces a real `<thead>`.

## Wire format

The page builder's JS submits a JSON blob under `__json`, plus `header_options[table_purpose]` from a rendered `<select>`. That is the only input the validator accepts for a tabular table; the stored shape fed back as input falls through to the legacy pricing branch and returns empty cells.

## Config

| Key | Meaning |
| --- | --- |
| `value` | The stored structure above |

## In Gutenberg blocks (the React control)

``table`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `table` control does

Header and footer row counts, a row of settings per column (alignment, width), then each row's cells as text fields — a list, not a grid.

:::caution[The control emits the STORED shape, not the wire format]
The page builder's JS submits a JSON blob under `__json`, and for a tabular table that is the **only** input `_get_value_from_input()` accepts. Feed it the stored shape and it falls through to the legacy pricing branch and returns **empty cells**.

A block emits the stored shape regardless, because nothing validates on that path and the element's view reads that shape directly. The two coexist because the builder's editor *boots from the stored model* and re-serialises to `__json` when it saves — so a table authored in a block opens and saves correctly there.

Both halves are asserted in the parity suite, so the asymmetry is visible rather than folklore.
:::

:::note[Four structures that must agree]
`content` is rows × columns, `cols` is as long as every content row, `rows` is as long as `content`, and each row's `name` is **derived** from whether its index falls inside `header_rows` — that is how the renderer gets a real `<thead>`. Every mutation rebuilds the whole value, because patching one array and forgetting another is how a table ends up with cells it cannot render.
:::

:::note[Merged cells are preserved, not edited]
`colspan`, `rowspan` and `merged` round-trip untouched. Merging needs a grid to merge across, so it stays in the page builder.
:::
