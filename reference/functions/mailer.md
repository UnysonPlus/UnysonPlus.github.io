---
title: Mailer — functions
sidebar_label: Mailer
slug: /functions/mailer
description: Public PHP helper functions in the UnysonPlus Mailer subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Mailer — functions

**2 public functions.** 0 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_ext_mailer_is_configured`](#fw_ext_mailer_is_configured) | Returns whether the mailer extension is configured and ready to send mail. |
| [`fw_ext_mailer_send_mail`](#fw_ext_mailer_send_mail) | Sends an email through the mailer extension. |

---

### `fw_ext_mailer_is_configured` {#fw_ext_mailer_is_configured}

```php
fw_ext_mailer_is_configured()
```

Returns whether the mailer extension is configured and ready to send mail.

<small>Source: `framework/extensions/mailer/helpers.php:9`</small>

### `fw_ext_mailer_send_mail` {#fw_ext_mailer_send_mail}

```php
fw_ext_mailer_send_mail($to, $subject, $message, $data = array())
```

Sends an email through the mailer extension.

<small>Source: `framework/extensions/mailer/helpers.php:4`</small>

← Back to [Functions overview](./index.md)
