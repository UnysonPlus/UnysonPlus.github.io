---
title: Add a contact form to your site
description: Build a drag-and-drop contact form with Unyson+ Forms and send submissions by email, no third-party form plugin needed.
---

# Add a contact form to your site

The **Forms** extension adds a drag-and-drop **Contact Form** element to the page builder, and the
**Mailer** extension delivers the submissions by email.

## 1. Activate the extensions

From **Unyson+ → Extensions**, activate **Forms** (it pulls in **Mailer**, the global email service,
automatically).

## 2. Set who email is sent as

Open **Mailer** settings (Unyson+ → Extensions) and set the **From Name** and **From Email**. For
reliable delivery, choose the **SMTP** send method and enter your SMTP host/port/credentials instead
of PHP mail. See [Mailer](/docs/extensions/mailer).

## 3. Build the form

1. Edit a page and open the **Unyson Builder**.
2. Drag the **Contact Form** element onto the canvas.
3. In its options, add and arrange the fields you want (name, email, message, …) and set the
   **recipient email** that submissions are sent to.
4. **Update** and view the page, the form is live.

## See also

- [Forms](/docs/extensions/forms) — the full Contact Form reference
- [Mailer](/docs/extensions/mailer) — global email + SMTP setup
