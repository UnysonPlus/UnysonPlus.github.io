---
title: Contact Form
sidebar_position: 28
---

# Contact Form

A drag-and-drop contact form you can drop straight onto a page. Provided by the **Forms**
extension — activate it from **Unyson+ → Extensions** for this element to appear in the
builder.

The options open in a modal with a **Form Fields** builder and a **Settings** section.

**Saved forms:** choose a form from the library under **Form Fields → Saved Form** to show it here; this
element then keeps only its Style. See [the form library](/extensions/forms#the-form-library).

**Starting a new form:** an empty form opens on **What kind of form is this?**: pick a type (contact, quote,
callback, product enquiry, support ticket, appointment, table booking, event registration, RSVP, job
application, volunteer sign-up, feedback, NPS survey, newsletter signup or download) to fill in its fields
and its subject, button and thank-you text, or start blank. With an AI provider connected, you can also
describe the form in a sentence and have it built for you. **Choose a form type**, above the fields, brings
the picker back.

**Field look:** the **Style** tab's **Form Style** picks one of your [Form Styles presets](/theme/components/form-styles)
(Standard, Soft, Underline, Rounded, Floating Labels, On Dark, or your own), so every form on the site matches and editing the preset
restyles them all. The field settings below it on the Style tab change this one form only.

**Layout:** Style → **Layout** shows all fields at once, or **one question at a time** with a progress bar
and Back / Next.

**After sending:** Settings → Options → **After Sending** keeps the form and shows the message, replaces the
form with the message, or goes to a thank-you page or address. The subject, success message and address
accept answer tags such as `{text_name}`; see [Forms → Sending, confirmations and spam protection](/extensions/forms#sending-confirmations-and-spam-protection).

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

<img src="/img/shortcodes/contact-form-settings.png" alt="Contact form options panel — Settings tab" width="1200" />