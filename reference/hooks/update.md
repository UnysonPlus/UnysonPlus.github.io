---
title: Update — hooks
sidebar_label: Update
slug: /hooks/update
description: Actions and filters exposed by the UnysonPlus Update subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Update — hooks

**5 hooks** — 0 actions · 5 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_custom_url_version`](#h-fw-custom-url-version) | filter | Filters the remote URL queried for the latest version during a custom update check. |
| [`fw_ext_update_extensions_complete_actions`](#h-fw-ext-update-extensions-complete-actions) | filter | Filter the list of action links available following extensions update. |
| [`fw_ext_update_framework_complete_actions`](#h-fw-ext-update-framework-complete-actions) | filter | Filter the list of action links available following framework update. |
| [`fw_ext_update_github_branches`](#h-fw-ext-update-github-branches) | filter | Filters the ordered list of GitHub branches to try (default master, main) when no explicit branch is configured for an update source. |
| [`fw_ext_update_theme_complete_actions`](#h-fw-ext-update-theme-complete-actions) | filter | Filter the list of action links available following theme update. |

---

### `fw_custom_url_version` {#h-fw-custom-url-version}
*🧪 filter*

Filters the remote URL queried for the latest version during a custom update check.

```php
add_filter( 'fw_custom_url_version', $callback );
```
<small>Fired in: `framework/extensions/update/extensions/custom-update/class-fw-extension-custom-update.php:91`</small>

### `fw_ext_update_extensions_complete_actions` {#h-fw-ext-update-extensions-complete-actions}
*🧪 filter*

Filter the list of action links available following extensions update.

```php
add_filter( 'fw_ext_update_extensions_complete_actions', $callback );
```
<small>Fired in: `framework/extensions/update/includes/classes/class--fw-ext-update-extensions-upgrader-skin.php:25`</small>

### `fw_ext_update_framework_complete_actions` {#h-fw-ext-update-framework-complete-actions}
*🧪 filter*

Filter the list of action links available following framework update.

```php
add_filter( 'fw_ext_update_framework_complete_actions', $callback );
```
<small>Fired in: `framework/extensions/update/includes/classes/class--fw-ext-update-framework-upgrader-skin.php:27`</small>

### `fw_ext_update_github_branches` {#h-fw-ext-update-github-branches}
*🧪 filter*

Filters the ordered list of GitHub branches to try (default master, main) when no explicit branch is configured for an update source.

```php
add_filter( 'fw_ext_update_github_branches', $callback );
```
<small>Fired in: `framework/extensions/update/extensions/github-update/class-fw-extension-github-update.php:58`</small>

### `fw_ext_update_theme_complete_actions` {#h-fw-ext-update-theme-complete-actions}
*🧪 filter*

Filter the list of action links available following theme update.

```php
add_filter( 'fw_ext_update_theme_complete_actions', $callback );
```
<small>Fired in: `framework/extensions/update/includes/classes/class--fw-ext-update-theme-upgrader-skin.php:27`</small>

← Back to [Hooks overview](./index.md)
