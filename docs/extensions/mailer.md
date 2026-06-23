---
title: Mailer
---

# Mailer

**Mailer** is a global email service: it holds your site's outgoing-email settings in one place and
provides a single `send()` method that other extensions (notably **[Forms](./forms/index.md)**) use
to deliver email. Configure the sender and delivery method once, and every extension that sends mail
uses it.

## Settings

Configure Mailer from **Unyson+ → Extensions** (its settings form). You set:

- **From Name** and **From Email** — the identity outgoing email is sent as.
- **Send method**:
  - **WordPress** (default) — uses the standard `wp_mail()` (PHP mail / whatever your host or an SMTP
    plugin provides).
  - **SMTP** — sends through an SMTP server you specify (host, port, encryption, and username /
    password), which is more reliable for deliverability than PHP mail.

:::tip Activated on demand
Mailer is a **dependency** extension: it's typically activated automatically when an extension that
needs it (like Forms) is enabled. You can also activate it directly to set global sender details for
the whole site.
:::

## For developers

Send mail through the configured method from any extension or theme code:

```php
$mailer = fw()->extensions->get( 'mailer' );

if ( $mailer ) {
    $result = $mailer->send(
        'to@example.com',
        'Subject line',
        '<p>HTML message body</p>',
        array( 'reply_to' => 'visitor@example.com' ) // optional: reply_to, cc, bcc
    );
    // $result = array( 'status' => 1|0, 'message' => '…' )
}
```

Passing your own `$settings` array as a fifth argument overrides the saved settings for that one
send. Because Mailer centralizes delivery, switching the whole site from PHP mail to SMTP is a single
settings change, no consumer code changes.
