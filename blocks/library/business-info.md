---
title: Business Info
description: The Unyson+ Business Info block — Opening hours, address and contact details, with a live open/closed status, authored in the block editor and rendered by the business-info element.
---

# Business Info

Opening hours, address and contact details, with a live open/closed status. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [business-info element](/shortcodes/components/business-info) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/business-info/front.png" alt="The Business Info block — a card of hours, address and contact details" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/business-info/inspector.png" alt="The Business Info block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Name (`biz_name`) | The business name. |
| Hours (`hours`) | Per-day opening times (or closed). Defaults to a Mon–Sun set you edit. |
| Live status (`show_status`, `time_format`, `highlight_today`) | Show a live **Open / Closed** badge from the hours, in 12- or 24-hour time, and highlight today’s row. |
| Contact (`address`, `phone`, `email`, `website`, `map_link`) | The address, phone, email, site and a map link. |
| Design (`design`) + Colours (`accent_color`, `card_bg`, `text_color`) | The card look and its colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/business-info {"upOptions":{"biz_name":"UnysonPlus Studio","address":"123 Market Street, San Francisco, CA","phone":"+1 (555) 010-0100","email":"hello@example.com","website":"https://example.com"}} /-->
```

## The business-info element

The block and the page builder’s [Business Info element](/shortcodes/components/business-info) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
