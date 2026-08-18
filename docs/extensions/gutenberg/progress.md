---
title: Progress
sidebar_position: 31
---

# Progress

Progress bars or circular meters — skills, capacity, completion, funding.

The block renders through the [`progress`](/docs/shortcodes/interactive-elements/progress) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `layout` | Bars or circles, and the settings that shape needs |
| `bars` | The entries — label and value |
| `height` | Bar thickness |
| `value_position` | Where the number sits |
| `rounded` | Round the bar ends |
| `striped` | Striped fill |
| `show_value` | Print the number |
| `animate` | Animate the fill on scroll |
| `count_up` | Count the number up as it fills |
| `gap` | Space between entries |
| `fill_color` | Fill colour |
| `fill_color_2` | Second fill colour, for gradient fills |
| `track_color` | The unfilled track |
| `label_color` | Label colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`bars` is a repeater]
It is an [`addable-popup`](/docs/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[`layout` is a picker that reveals its own options]
It is a [`multi-picker`](/docs/options/option-types/multi-picker): choosing an option reveals the
fields belonging to that choice, and **only the chosen branch is saved** — switch away and back, and
the fields you filled in the branch you left are blank.
:::

:::note[Bars are drawn at their final value, not animating up to it]
Replaying the fill would restart on every option change — so the number you were trying to set would
be the one thing the preview never held still long enough to show. Visitors see the animation, if
`animate` is on.
:::

:::note[`count_up` needs `animate`]
The number counts up *as the bar fills*. With no fill animation there is nothing for it to keep pace
with.
:::
