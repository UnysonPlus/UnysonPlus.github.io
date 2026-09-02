---
title: Special Heading
sidebar_position: 13
sidebar_custom_props: { icon: '/img/shortcode-icons/special-heading.svg' }
---

# Special Heading

An overline + title + subtitle heading block. Tabs: **Content**, **Layout**, **Styling**,
**Animations**, **Advanced**.

:::tip[💡 Web dev tip: headings are an outline, not just big text]
The **Title Tag** option sets a real `<h1>`–`<h6>`, and those tags form your page's outline. Use **one `<h1>` per page** (usually the page title), and don't skip levels — the sub-parts of an `<h2>` section should be `<h3>`, not `<h4>`. Choose the level for *structure*, then size it with the design controls. Screen-reader users jump between headings to scan a page, and search engines read them to understand what it's about. [MDN: heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) · [Web Dev Basics: Semantic HTML](/learn/semantic-html)
:::

<img src="/img/shortcodes/special-heading-backend.png" alt="Special Heading on the Page Builder canvas" width="936" />

## Content

<img src="/img/shortcodes/special-heading-content.png" alt="Special Heading options panel — Content tab" width="840" />

The heading has three text parts, top to bottom:

- **Overline** — a small line *above* the title, also called an *eyebrow* or *kicker*. Use it to label or categorise the section (e.g. a small "FEATURES" tag over a features heading) — it gives context at a glance without competing with the title.
- **Title** — the main heading; the one line you want the reader to take away.
- **Subtitle** — a supporting line *below* the title that expands on it or adds a short hook.

**Title Tag** chooses which HTML element the title becomes: `H1`–`H6` for a real heading that joins the page outline, or `span` / `p` when the text is purely decorative and shouldn't affect the outline (see the heading tip above for how to pick the level).

## Layout

<img src="/img/shortcodes/special-heading-layout.png" alt="Special Heading options panel — Layout tab" width="840" />

| Option | Choices |
| --- | --- |
| **Alignment** (and per-part Overline / Title / Subtitle Alignment) | Left, Center, Right |
| **Overline Uppercase** | On/Off |
| **Overline Marker** | Line (—), Dot (●), Lines both sides (—— ——), Vertical bar (│) |
| **Marker Position** | Leading (before text), Trailing (after text) |
| **Overline Container** | Pill (filled), Pill (outline), Underline |
| **Element Spacing** | Tight, Relaxed |
| **Heading Max Width** | Constrain the heading width |

## Styling

<img src="/img/shortcodes/special-heading-styling.png" alt="Special Heading options panel — Styling tab" width="840" />

| Option | Choices |
| --- | --- |
| **Title Display Size** | Display 1 (largest) → Display 6 |
| **Subtitle Font Size** / **Subtitle Max Width** | Subtitle sizing |
| Colors | Overline, Title, Subtitle, Background |

:::note[Screenshots — markers, containers & sizes]
Capture the overline marker/container variants and a couple of display sizes:
`special-heading-pill`, `special-heading-underline`, `special-heading-display-1`.
:::
