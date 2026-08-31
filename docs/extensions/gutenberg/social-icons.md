---
title: Social Icons
sidebar_position: 22
---

# Social Icons

A row of links to your social profiles — pulled from Theme Settings, or listed here.

The block renders through the [`social_icons`](/shortcodes/header-footer-elements/social-icons) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `source` | Where the profiles come from, and the profiles themselves |
| `size` | Icon size |
| `icon_badge_preset` | Badge shape and style behind each icon |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`source` is a picker that reveals its own options]
It is a [`multi-picker`](/options/option-types/multi-picker): choosing an option reveals the
fields that belong to that choice, and **only the chosen branch's values are saved**. Switching
choices and switching back does not preserve what you typed in the branch you left — that is how the
option type has always behaved, and it is what keeps the saved value small.
:::

:::note[Almost the whole element is one option]
`source` chooses between the profiles configured in **Theme Settings** and a custom list typed here,
and reveals a different set of fields for each. Using the Theme Settings source means one place to
update when a profile URL changes, rather than every page that shows the icons.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so use the Dimensions panel at the top of the sidebar.
:::

:::note[No stylesheet of its own]
This element is drawn by the icon font and your theme's rules, so unlike most blocks it pushes no
element stylesheet into the editor canvas. If the icons look unstyled in the editor but right on the
front end, that is where to look.
:::
