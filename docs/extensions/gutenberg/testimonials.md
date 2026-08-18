---
title: Testimonials
sidebar_position: 21
---

# Testimonials

Customer quotes with avatars, star ratings and an optional carousel — the standard social-proof section, with review structured data if you want it.

The block renders through the [`testimonials`](/docs/shortcodes/components/testimonials) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `testimonials` | The quotes — text, author, role, avatar, rating |
| `design_settings` | Layout family, and the settings that layout needs |
| `card_rows` | Which rows appear on a card, and in what order |
| `box_style` | Card border / box preset |
| `rating_symbol` | Star, heart or another mark |
| `rating_fill_color` | Filled symbol colour |
| `rating_empty_color` | Empty symbol colour |
| `rating_size` | Symbol size |
| `container_type` | How the set is laid out |
| `text_align` | Text alignment inside a card |
| `avatar_shape` | Avatar shape |
| `avatar_size` | Avatar size |
| `reviews_schema` | Emit review structured data |
| `text_color` | Card text colour |
| `bg_color` | Card background |
| `quote_color` | Quote colour |
| `author_name_color` | Author name colour |
| `author_job_color` | Author role colour |
| `site_link_color` | Source link colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`testimonials` is a repeater]
It is an [`addable-popup`](/docs/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[`design_settings` is a picker that reveals its own options]
It is a [`multi-picker`](/docs/options/option-types/multi-picker): choosing an option reveals the
fields that belong to that choice, and **only the chosen branch's values are saved**. Switching
choices and switching back does not preserve what you typed in the branch you left — that is how the
option type has always behaved, and it is what keeps the saved value small.
:::

:::note[A carousel does not advance in the canvas]
It shows the first slide, held. A preview that rotated every few seconds would move while you were
reading the sidebar, and it would restart from the beginning on every option change.
:::

:::note[`reviews_schema` is exposed here, unlike Star Rating's]
The difference is whether the content is genuinely a review. Testimonials are; a decorative star
rating on a feature card is not — and review markup on something that is not a review invites a
search penalty rather than a rich result.

Still check the obvious things before turning it on: the quotes should be real, attributed, and
about the thing the page is selling.
:::

:::note[The page builder's card preview is not repeated here]
`card_preview` draws a small sample of the card inside the page builder's options panel. The block
already previews the real element in the canvas, so a second, smaller approximation of it would only
be one more thing that can disagree.
:::
