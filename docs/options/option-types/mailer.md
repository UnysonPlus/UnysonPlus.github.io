---
title: "Mailer"
sidebar_position: 63
slug: /options/option-types/mailer
description: The Unyson+ mailer option type — site-wide mail delivery settings.
---

# Mailer

Mail delivery configuration: which send method, and that method's settings (SMTP host, credentials, and so on).

## Stored value

A hash of the selected method's inner option values.

:::caution[Stored site-wide, not on the element]
The option type declares:

```php
'fw-storage' => array(
    'type'      => 'wp-option',
    'wp-option' => 'fw_ext_settings_options:mailer',
)
```

So saving it writes a `wp_option` for the whole site. Two elements showing this option are showing the **same** settings, and changing it in one changes it everywhere.

### In a Gutenberg block: read-only

Mail delivery is a **site-wide** setting. The option type stores it in a `wp_option` (`fw_ext_settings_options:mailer`) rather than on the element.

A block's attributes never pass through that storage layer, so an editable field here would write SMTP settings into one block's attributes where nothing reads them — mail would keep using the site configuration, the fields would look saved, and the disagreement would surface as messages that never arrive.

The control reports whether delivery is configured and points at *Unyson+ → Settings → Mailer*.
