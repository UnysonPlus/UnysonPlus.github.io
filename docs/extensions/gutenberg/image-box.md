---
title: Image Box
sidebar_position: 28
---

# Image Box

An image with a heading, text and a button — the standard card, and probably the most-placed element in the library.

The block renders through the [`image_box`](/docs/shortcodes/media-elements/image-box) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `image` | The image |
| `image_alt` | Alt text for it |
| `subtitle` | Small text above the title |
| `title` | Heading |
| `title_tag` | Which heading level the title uses |
| `text` | Body copy |
| `icon` | An optional icon |
| `button_style` | Button design |
| `button_label` | Button text |
| `design_settings` | Card layout family, and the settings it needs |
| `image_ratio` | Aspect ratio the image is cropped to |
| `content_align` | Text alignment |
| `image_size` | Which registered image size to request |
| `hover_effect` | What happens on hover |
| `transition_speed` | How fast that effect runs |
| `link_behavior` | What is clickable — the button, the whole card, nothing |
| `link_url` | Where it goes |
| `link_target` | Open in a new tab |
| `box_style` | Box / border preset |
| `image_style` | Image treatment preset |
| `icon_badge_preset` | Badge behind the icon |
| `bg_color` | Card background |
| `title_color` | Title colour |
| `subtitle_color` | Subtitle colour |
| `content_color` | Body colour |
| `icon_color` | Icon colour |
| `accent_color` | Accent colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`design_settings` is a picker that reveals its own options]
It is a [`multi-picker`](/docs/options/option-types/multi-picker): choosing an option reveals the
fields belonging to that choice, and **only the chosen branch is saved** — switch away and back, and
the fields you filled in the branch you left are blank.
:::

:::note[`image_alt` is here, next to the image, on purpose]
Alt text written at the moment the image is chosen gets written. Alt text one surface away stays
empty — which is how a page ends up with a dozen images and no descriptions.

Leave it blank only when the image is genuinely decorative and the card's text already says
everything.
:::

:::note[The preview shows the resting state, never the hover]
`hover_effect` is the one thing the canvas cannot show you. The pointer has to land on the block to
select it, so a live effect would mean the preview spent most of its life showing the hover rather
than the page.
:::

:::note[`image_style` uses the theme's Image Style presets]
It is an [`image-style-picker`](/docs/options/option-types/image-style-picker), and its swatches
really are styled in the block sidebar — the preset CSS is loaded in wp-admin, so the tiles show the
actual treatment rather than its name.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
