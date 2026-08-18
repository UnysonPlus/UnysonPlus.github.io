---
title: Contact Form
sidebar_position: 82
---

# Contact Form

A contact form with your own fields, validation and email delivery.

The block renders through the [`contact_form`](/docs/shortcodes/components/contact-form) element — the
same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `form` | The form's fields |
| `email_to` | Where submissions are sent |
| `subject_message` | Subject line of that email |
| `submit_button_text` | Button text |
| `success_message` | Shown after a successful send |
| `failure_message` | Shown when it fails |
| `mailer` | How mail is delivered (read-only — see below) |
| `form_max_width` | Maximum form width |
| `form_align` | Horizontal alignment |
| `field_bg` | Field background |
| `field_text` | Field text colour |
| `field_border` | Field border colour |
| `field_focus` | Focus colour |
| `label_color` | Label colour |
| `field_radius` | Field corner rounding |
| `field_border_width` | Field border width |
| `field_padding` | Field padding |
| `button_style` | Button preset |
| `button_size` | Button size |
| `button_shape` | Button shape |
| `button_full` | Full-width button |
| `button_align` | Button alignment |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[Fields are edited here, as a list]
`form` is a [`form-builder`](/docs/options/option-types/form-builder). Add a field from the dropdown,
expand it to edit its own settings — a text field offers its constraints, a select its choices —
reorder with the arrows, duplicate or remove.

**Field widths stay in the page builder**, which lays fields out on a grid. Widths already set are
preserved untouched.
:::

:::caution[`mailer` is shown but not editable]
Mail delivery is a **site-wide** setting stored in a `wp_option` — SMTP host, credentials, send
method. A block's attributes never reach that storage, so an editable field here would write mail
settings into one block where nothing reads them: mail would keep using the site configuration, the
fields would look saved, and the difference would show up as messages that silently never arrive.

The block tells you whether delivery is configured and where to change it.
:::

:::caution[The form does not submit in the editor]
Live, a stray Enter in the canvas would send a real message to `email_to`, from the editor, while
someone was still building the form.

The security nonce is minted per render, so nothing stale is stored in the block.
:::

:::note[Set `email_to` before publishing]
It is the one setting a form cannot do without, and its absence is invisible until a submission goes
nowhere.
:::
