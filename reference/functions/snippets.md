---
title: Snippets — functions
sidebar_label: Snippets
slug: /functions/snippets
description: Public PHP helper functions in the UnysonPlus Snippets subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Snippets — functions

**3 public functions.** 1 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_snippets_editor_note`](#fw_ext_snippets_editor_note) | Explain an empty snippet render — in an editor only. |
| [`fw_ext_snippets_render`](#fw_ext_snippets_render) | Render a snippet's page-builder content by ID. |
| [`fw_ext_snippets_unwrap_auto_sections`](#fw_ext_snippets_unwrap_auto_sections) | Strip the [section auto_generated="true"]…[/section] wrappers that the page-builder's items-corrector inserts around root-level rows/columns/simple items when the snippet author didn't explicitly drop a Section item. |

---

### `fw_ext_snippets_editor_note` {#fw_ext_snippets_editor_note}
*🔌 pluggable*

```php
fw_ext_snippets_editor_note( $snippet_id )
```

Explain an empty snippet render — in an editor only.

fw_ext_snippets_render() returns '' for four different reasons: no snippet
chosen, the recursion guard, a post that no longer exists, and one that is
not published. On the front end that silence is right. In a Gutenberg block
every one of them becomes the same "Block rendered as empty", which reads as
a bug rather than as a thing to go and fix.

The unpublished case is the one worth naming: a snippet moved back to draft
disappears from every page that places it, with nothing anywhere saying why.

| Parameter | Type | Description |
| --- | --- | --- |
| `$snippet_id` | `int` | The chosen snippet, 0 when none is chosen. |

**Returns** `string` HTML, or '' outside an editor.

<small>Source: `framework/extensions/snippets/helpers.php:105`</small>

### `fw_ext_snippets_render` {#fw_ext_snippets_render}

```php
fw_ext_snippets_render( $snippet_id )
```

Render a snippet's page-builder content by ID.

Returns '' for invalid IDs, missing/non-published snippets, or re-entrant calls
(a snippet referencing itself directly or through a cycle).

| Parameter | Type | Description |
| --- | --- | --- |
| `$snippet_id` | `int` | — |

**Returns** `string`

<small>Source: `framework/extensions/snippets/helpers.php:14`</small>

### `fw_ext_snippets_unwrap_auto_sections` {#fw_ext_snippets_unwrap_auto_sections}

```php
fw_ext_snippets_unwrap_auto_sections( $shortcodes )
```

Strip the [section auto_generated="true"]…[/section] wrappers that the page-builder's items-corrector inserts around root-level rows/columns/simple items when the snippet author didn't explicitly drop a Section item.

Without this, embedding a snippet inside a page that already has its own
Section produces invalid nested &lt;section&gt;&lt;div class="container"&gt; markup.
Sections authored explicitly by the user have no auto_generated attribute
and are preserved.

| Parameter | Type | Description |
| --- | --- | --- |
| `$shortcodes` | `string` | — |

**Returns** `string`

<small>Source: `framework/extensions/snippets/helpers.php:75`</small>

← Back to [Functions overview](./index.md)
