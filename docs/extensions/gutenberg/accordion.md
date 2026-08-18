---
title: Accordion
sidebar_position: 20
---

# Accordion

Collapsible panels — an FAQ, a spec sheet, a set of long answers. Core has a Details block; this is the version with icons, numbering, deep links, expand-all and FAQ structured data.

The block renders through the [`accordion`](/docs/shortcodes/interactive-elements/accordion) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `tabs` | The panels — each a title and its content |
| `title_tag` | Which heading level panel titles use |
| `icon_style` | The open/closed indicator |
| `icon_position` | Which side the indicator sits on |
| `icon_closed_text` | Text indicator when closed |
| `icon_open_text` | Text indicator when open |
| `numbering` | Number the panels, and how |
| `numbering_start` | The number to start from |
| `item_spacing` | Space between panels |
| `title_alignment` | Title alignment |
| `initially_open` | Which panel is open on arrival |
| `collapsible` | Allow closing the last open panel |
| `multiple_open` | Let several panels be open at once |
| `hash_linking` | Let a URL open a specific panel |
| `show_expand_collapse_all` | Add Expand all / Collapse all controls |
| `faq_schema` | Emit FAQ structured data |
| `accordion_style` | Design preset |
| `corner_radius` | Corner rounding |
| `elevation` | Shadow depth |
| `active_accent` | Accent for the open panel |
| `title_hover` | Highlight titles on hover |
| `tab_title_color` | Title colour |
| `title_bg_color` | Title background |
| `tab_content_color` | Panel text colour |
| `content_bg_color` | Panel background |
| `icon_closed_color` | Indicator colour when closed |
| `icon_open_color` | Indicator colour when open |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`tabs` is a repeater]
It is an [`addable-popup`](/docs/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[`numbering` is a picker that reveals its own options]
It is a [`multi-picker`](/docs/options/option-types/multi-picker): choosing an option reveals the
fields that belong to that choice, and **only the chosen branch's values are saved**. Switching
choices and switching back does not preserve what you typed in the branch you left — that is how the
option type has always behaved, and it is what keeps the saved value small.
:::

:::note[The preview does not open or close]
The canvas shows whatever `initially_open` says — the state a visitor arrives to. Clicking a header
would toggle a panel rather than select the block, and with `multiple_open` off, opening one would
close another: a preview that changes what it is previewing.

Panel content is edited in the Items repeater in the sidebar.
:::

:::caution[`faq_schema` marks this up as questions and answers]
Only turn it on when the panels really are an FAQ. Search engines treat FAQ markup on a spec sheet or
a set of product tabs as a mismatch, and mismatched structured data is worth less than none.
:::

:::note[Custom icon uploads stay in the page builder]
`icon_closed_image` and `icon_open_image` apply to a single `icon_style`. A pair of uploads that does
nothing until a third setting changes is a poor thing to meet in a sidebar, so they are one surface
away.
:::
