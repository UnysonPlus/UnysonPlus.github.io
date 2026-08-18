---
title: Newsletter
sidebar_position: 9
---

# Newsletter

An email signup form — heading, description, name and email fields, a consent line and a subscribe
button. Core has no equivalent block, and the usual alternative is embedding a third-party form that
arrives with its own stylesheet and ignores your theme.

The block renders through the [`newsletter`](/docs/shortcodes/interactive-elements/newsletter) element — the same PHP
that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `title` | Heading above the form |
| `description` | Supporting text — paragraphs are added on save |
| `show_name` | Add a name field before the email field |
| `name_placeholder` | Placeholder for the name field |
| `email_placeholder` | Placeholder for the email field |
| `button_label` | Text on the submit button |
| `consent_text` | The consent / privacy line under the form |
| `success_message` | Shown in place of the form after a successful subscribe |
| `error_message` | Shown when the request fails |
| `list_id` | Which list the address is added to, for the configured integration |
| `design` | Form layout preset — inline, stacked, boxed |
| `align` | Horizontal alignment |
| `rounded` | Corner rounding on fields and button |
| `accent_color` | Button and focus colour |
| `field_bg` | Field background |
| `bg_color` | Form background |
| `text_color` | Text colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`consent_text` and `list_id` are exposed on purpose]
Both are easy to leave out of a curated sidebar and both are costly to get wrong.

A capture form with no consent line is a compliance problem in several jurisdictions, so the field is
in the sidebar rather than one surface away — the safe thing should not be the harder thing.

`list_id` is here because a form pointed at the wrong list **fails silently**: subscribers are
accepted, stored, and nobody ever reads them. That is worse than an error.
:::

:::caution[The preview is inert, and here it matters more than usual]
Every block preview is non-interactive, but this is the only block whose element is a **real form with
a real submit handler**. Left live, a stray Enter in the canvas would fire an actual subscribe
request — against the rate limiter, from the editor, on behalf of whoever is logged in. The form
works normally on the front end.
:::

:::note[The nonce is not stored in the post]
The form's security token is minted when the page is rendered, not when the block is saved, so a
block sitting in a draft for a month still posts a fresh token on the day a visitor loads the page.
There is no such thing as a stale nonce baked into this block's saved content.
:::
