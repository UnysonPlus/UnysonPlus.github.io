---
title: Theme Settings (Components) — hooks
sidebar_label: Theme Settings (Components)
slug: /hooks/theme-settings-components
description: Actions and filters exposed by the UnysonPlus Theme Settings (Components) subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Theme Settings (Components) — hooks

**3 hooks** — 1 actions · 2 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_settings_form_saved`](#h-fw-settings-form-saved) | action | — |
| [`unysonplus_icons_animated_settings`](#h-unysonplus-icons-animated-settings) | filter | — |
| [`unysonplus_settings_io_exclude_keys`](#h-unysonplus-settings-io-exclude-keys) | filter | — |

---

### `fw_settings_form_saved` {#h-fw-settings-form-saved}
*🎬 action · 2 call sites*

```php
add_action( 'fw_settings_form_saved', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:202`</small>

### `unysonplus_icons_animated_settings` {#h-unysonplus-icons-animated-settings}
*🧪 filter*

```php
add_filter( 'unysonplus_icons_animated_settings', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/theme-settings/icons.php:76`</small>

### `unysonplus_settings_io_exclude_keys` {#h-unysonplus-settings-io-exclude-keys}
*🧪 filter*

```php
add_filter( 'unysonplus_settings_io_exclude_keys', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:25`</small>

← Back to [Hooks overview](./index.md)
