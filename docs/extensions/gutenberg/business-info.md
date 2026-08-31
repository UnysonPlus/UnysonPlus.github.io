---
title: Business Info
sidebar_position: 32
---

# Business Info

Opening hours, address and contact details, with a live open/closed status — for a local business page, a footer or a contact section.

The block renders through the [`business_info`](/shortcodes/components/business-info) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `biz_name` | The business name |
| `hours` | Opening hours, one row per day |
| `show_status` | Show an Open now / Closed badge |
| `time_format` | 12- or 24-hour times |
| `address` | Street address |
| `phone` | Phone number |
| `email` | Email address |
| `website` | Website URL |
| `map_link` | A link to the location on a map |
| `design` | Card design preset |
| `highlight_today` | Emphasise the current day's row |
| `accent_color` | Accent colour |
| `card_bg` | Card background |
| `text_color` | Text colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`hours` is a repeater]
It is an [`addable-popup`](/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::caution[This block's output changes on its own]
`show_status` and `highlight_today` are computed from the **current time**, in the site's timezone,
every time the page renders. It is the one element in the library whose output can differ between two
loads that nobody edited in between.

Worth knowing before wondering why two screenshots disagree — and worth checking that the site's
timezone is actually set, since the status is only as right as that.
:::

:::note[The preview's status is real, just not of any particular time]
The canvas shows Open or Closed as of the moment it rendered. It is not a fixed sample value, and it
is not the state a visitor will necessarily see.
:::
