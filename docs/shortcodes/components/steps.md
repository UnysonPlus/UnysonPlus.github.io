---
title: Steps / Process
sidebar_position: 47
---

# Steps / Process

A numbered steps / process flow — horizontal, vertical timeline, alternating, cards or circles — with icons or numbers and connectors. Tabs: **Content**, **Design**, **Styling**, **Animations**, **Advanced**.

:::tip[💡 Web dev tip: sequences are ordered lists]
When order matters — step 1, then 2, then 3 — the right element is an **ordered list** (`<ol>`), not a set of headings or divs. The numbering becomes real content that assistive tech announces in sequence, and it stays correct if you reorder the steps. [MDN: the ol element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) · [Web Dev Basics: Semantic HTML](/learn/semantic-html)
:::

## Content

<img src="/img/shortcodes/steps-content.png" alt="Steps / Process options panel — Content tab" width="1200" />

- **Steps** — an addable, repeatable list of steps. Each step opens an Add / Edit Step popup with these sub-fields:
  - **Title** — the step title (default "Step title").
  - **Description** — a textarea body; accepts HTML and shortcodes.
  - **Icon** — an icon (icon picker) used when Marker is set to Icon.
  - **Number / Label override** — optional; defaults to the step position (1, 2, 3…).

## Design

<img src="/img/shortcodes/steps-design.png" alt="Steps / Process options panel — Design tab" width="1200" />

- **Design** — image-picker of layouts (horizontal, vertical timeline, alternating, cards, circles); default `horizontal`.
- **Marker** — `Number` (default), `Icon`, or `None`.
- **Marker Shape** — `Circle` (default), `Rounded square`, or `Square`.
- **Connector** — `Solid line` (default), `Dashed line`, or `None` — the line between markers (Horizontal / Vertical / Alternating).
- **Title Tag** — `H2`, `H3` (default), `H4`, `H5`, or `div`.

## Styling

<img src="/img/shortcodes/steps-styling.png" alt="Steps / Process options panel — Styling tab" width="1200" />

- **Marker / Connector** — color of the markers and connector line.
- **Marker Text** — color of the marker number/text.
- **Title Color** — color of the step title.
- **Description Color** — color of the description text.
- **Font Size** — font-size preset for the steps.
- **Margin & Padding** — spacing control for the block.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
