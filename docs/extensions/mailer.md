---
title: Mailer
---

# Mailer

**Mailer** is a global email service: it holds your site's outgoing-email settings in one place and
provides a single `send()` method that other extensions (notably **[Forms](./forms/index.md)**) use
to deliver email. Configure the sender and delivery method once, and every extension that sends mail
uses it.

## Settings

Open **CRM → Settings → Sending → Mailer settings (SMTP)**, or a contact form's **Mailer** tab. The Mailer is a hidden
extension, so it has no card of its own in **Unyson+ → Extensions**; its settings screen is at
`wp-admin/admin.php?page=fw-extensions&sub-page=extension&extension=mailer`. Both places save to the same settings. You set:

- **Send Method**:
  - **WordPress** (default): uses the standard `wp_mail()` (PHP mail, or whatever your host or an SMTP plugin
    provides).
  - **SMTP**: sends through an SMTP server you specify (server, port, SSL or TLS, user name and password), which is
    more reliable for deliverability than PHP mail.
- **From Name** and **From Address**: the identity outgoing email is sent as.

### The settings apply to all WordPress email

With **SMTP** chosen, every email sent through WordPress's `wp_mail()` goes through that server too: password resets,
comment notices, and the CRM's emails, campaigns and confirmations. The **From Name** and **From Address** replace
WordPress's defaults ("WordPress", `wordpress@yourdomain`) without overriding a more specific sender, such as a CRM
sender profile. A dedicated SMTP plugin, if one is active, takes precedence.

To keep the settings to the Mailer's own `send()` (forms) only, return `false` from the
`fw_ext_mailer_handle_wp_mail` filter:

```php
add_filter( 'fw_ext_mailer_handle_wp_mail', '__return_false' );
```

:::tip[Activated on demand]
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
