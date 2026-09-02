---
title: Progress Bars
sidebar_position: 25
sidebar_custom_props: { icon: '/img/shortcode-icons/progress.svg' }
---

# Progress Bars

Animated skill / progress indicators (label + percentage) that fill to their value when
scrolled into view. Tabs: **Bars**, **Style**, **Animations**, **Advanced**.

:::tip[💡 Web dev tip: a progress bar has a real element]
HTML has a native `<progress>` element (and `<meter>` for a static measurement like disk usage). Using them — or ARIA's `role="progressbar"` with `aria-valuenow` — means assistive tech announces the value, not just a coloured bar. [MDN: the progress element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) · [Web Dev Basics: Semantic HTML](/learn/semantic-html)
:::

## Bars

<img src="/img/shortcodes/progress-bars.png" alt="Progress Bars options panel — Bars tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Progress Style** | Horizontal Bar · Circle · Gauge (semi-circle) |
| **Bars** | A repeatable list; each bar has a **Label**, **Percent** (0–100), **Icon** and **Color** |

The **Circle** and **Gauge** styles add **Diameter / Width**, **Thickness** and **Per Row**
(1–6) options.

## Style

<img src="/img/shortcodes/progress-style.png" alt="Progress Bars options panel — Style tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Bar Height** | e.g. `10px`, `.6rem` (bars only) |
| **Value Position** | Beside label · Inside the bar (bars only) |
| **Rounded** | On/Off |
| **Striped** | On/Off (bars only) |
| **Show Percentage** | On/Off |
| **Animate on Scroll** | On/Off |
| **Count Up Number** | On/Off |
| **Spacing** | Gap between items |

Plus **Fill Color**, an optional **Gradient Color** (second color), **Track Color** (unfilled
track) and **Label Color**.
