---
title: Contact Form
sidebar_position: 28
---

# Contact Form

A drag-and-drop contact form you can drop straight onto a page. Provided by the **Forms**
extension — activate it from **Unyson+ → Extensions** for this element to appear in the
builder.

The options open in a modal with a **Form Fields** builder and a **Settings** section.

:::tip[💡 Web dev tip: every input needs a label]
Every form field must have a real `<label>` tied to it — that's what a screen reader announces, and tapping the label focuses the field (a bigger target on mobile). Placeholder text is **not** a label: it disappears the moment someone types. Mark required fields, and describe any error in text, not colour alone. [MDN: the label element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
:::

## Form Fields

<img src="/img/shortcodes/contact-form-form-fields.png" alt="Contact form options panel — Form Fields tab" width="1200" />

- **Form** — a drag-and-drop form builder (header/title, text inputs, textarea, and the other
  form field types) for laying out the form.

## Settings → Options

| Option | Default |
| --- | --- |
| **Email To** | Recipient email address |
| **Subject Message** | `Contact Form` |
| **Submit Button** | `Send` |
| **Success Message** | `Message sent!` |
| **Failure Message** | `Oops something went wrong.` |

## Settings → Mailer

- **Mailer** — the mail-service configuration (SMTP, etc.), shared with the Mailer extension.

## Settings

<img src="/img/shortcodes/contact-form-settings.png" alt="Contact form options panel — Settings tab" width="1200" />

![Contact form options panel — Settings tab](/img/shortcodes/contact-form-settings.png)