---
title: Site Converter — hooks
sidebar_label: Site Converter
slug: /hooks/site-converter
description: Actions and filters exposed by the UnysonPlus Site Converter subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Site Converter — hooks

**1 hook** — 0 actions · 1 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_site_converter_sources`](#h-fw-site-converter-sources) | filter | Filters the Site Converter's source adapters, letting other extensions register support for new site builders/exports. |

---

### `fw_site_converter_sources` {#h-fw-site-converter-sources}
*🧪 filter*

Filters the Site Converter's source adapters, letting other extensions register support for new site builders/exports.

```php
add_filter( 'fw_site_converter_sources', $callback );
```
<small>Fired in: `framework/extensions/site-converter/includes/class-fw-site-converter-sources.php:49`</small>

← Back to [Hooks overview](./index.md)
