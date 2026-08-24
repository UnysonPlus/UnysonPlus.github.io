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
| [`fw_settings_form_saved`](#h-fw-settings-form-saved) | action | Fires after Theme Settings are saved from an import, passing the previous and merged values so listeners can react to the change. |
| [`unysonplus_icons_animated_settings`](#h-unysonplus-icons-animated-settings) | filter | Filters an optional Animated sub-tab of options for the Icons settings page, added by the Animated Icons extension when active. |
| [`unysonplus_settings_io_exclude_keys`](#h-unysonplus-settings-io-exclude-keys) | filter | Filters the operational setting keys excluded from a Theme Settings design export/import. |

---

### `fw_settings_form_saved` {#h-fw-settings-form-saved}
*🎬 action · 2 call sites*

Fires after Theme Settings are saved from an import, passing the previous and merged values so listeners can react to the change.

```php
add_action( 'fw_settings_form_saved', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:204`</small>

### `unysonplus_icons_animated_settings` {#h-unysonplus-icons-animated-settings}
*🧪 filter*

Filters an optional Animated sub-tab of options for the Icons settings page, added by the Animated Icons extension when active.

```php
add_filter( 'unysonplus_icons_animated_settings', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/theme-settings/icons.php:77`</small>

### `unysonplus_settings_io_exclude_keys` {#h-unysonplus-settings-io-exclude-keys}
*🧪 filter*

Filters the operational setting keys excluded from a Theme Settings design export/import.

```php
add_filter( 'unysonplus_settings_io_exclude_keys', $callback );
```
<small>Fired in: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:26`</small>

← Back to [Hooks overview](./index.md)
