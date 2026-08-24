---
title: Mailer — hooks
sidebar_label: Mailer
slug: /hooks/mailer
description: Actions and filters exposed by the UnysonPlus Mailer subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Mailer — hooks

**2 hooks** — 0 actions · 2 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_mailer_before_send`](#h-fw-ext-mailer-before-send) | filter | — |
| [`fw_ext_mailer_send_methods`](#h-fw-ext-mailer-send-methods) | filter | — |

---

### `fw_ext_mailer_before_send` {#h-fw-ext-mailer-before-send}
*🧪 filter*

```php
add_filter( 'fw_ext_mailer_before_send', $callback );
```
<small>Fired in: `framework/extensions/mailer/class-fw-extension-mailer.php:100`</small>

### `fw_ext_mailer_send_methods` {#h-fw-ext-mailer-send-methods}
*🧪 filter*

```php
add_filter( 'fw_ext_mailer_send_methods', $callback );
```
<small>Fired in: `framework/extensions/mailer/class-fw-extension-mailer.php:151`</small>

← Back to [Hooks overview](./index.md)
