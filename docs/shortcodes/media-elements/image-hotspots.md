---
title: Image Hotspots
sidebar_position: 52
---

# Image Hotspots

An image with interactive pins, where each pin reveals a tooltip card with a title, text and link. Its options are organized across the **Content**, **Design**, **Styling**, **Animations**, and **Advanced** tabs.

:::tip[💡 Web dev tip: a hotspot pin is a control, not just a decoration]
A tiny pin sitting on top of an image is easy to make mouse-only by accident, but a visitor tabbing through the page needs to reach it and trigger it too — that means it has to be a real focusable element with a visible focus state, not a plain `<div>` with a click handler. UnysonPlus renders each hotspot as a focusable, keyboard-operable button so its tooltip opens for keyboard and screen-reader users, not only for a hovering mouse. [W3C WAI: Keyboard accessibility](https://www.w3.org/WAI/perspective-videos/keyboard/)
:::

## Content

<img src="/img/shortcodes/image-hotspots-content.png" alt="Image Hotspots options panel — Content tab" width="1200" />

- **Image** — upload for the base image the pins are placed on.
- **Hotspots** — an addable-popup list of pins. Add as many as you need; each one opens an "Add / Edit Hotspot" popup with these sub-fields:
  - **Horizontal Position (%)** — slider (0–100, default `50`) for the pin's X position over the image.
  - **Vertical Position (%)** — slider (0–100, default `50`) for the pin's Y position.
  - **Pin Icon** — icon picker used by the "Icon" pin design (defaults to `+`).
  - **Title** — text for the tooltip card heading.
  - **Text** — textarea for the tooltip body.
  - **Link Label** — text for the optional link shown in the tooltip.
  - **Link URL** — text for the link destination.
  - **Open in New Tab** — switch (`_blank` / `_self`; default `_self`).

## Design

<img src="/img/shortcodes/image-hotspots-design.png" alt="Image Hotspots options panel — Design tab" width="1200" />

- **Pin Style** — image-picker of the pin appearance (default `pulse`). Choices come from the design registry.
- **Open Tooltip On** — select for the trigger; choices `Hover` (default), `Click / tap`. Click is best for touch devices.
- **Pin Size** — select; choices `Small`, `Medium` (default), `Large`.
- **Image Corner Radius** — select; choices `Square`, `Rounded` (default), `Large`.

## Styling

<img src="/img/shortcodes/image-hotspots-styling.png" alt="Image Hotspots options panel — Styling tab" width="1200" />

- **Pin Color** — compact color picker for the pins.
- **Tooltip Background** — compact color picker for the tooltip card background.
- **Tooltip Text** — color of the tooltip text.
- **Link / Accent Color** — color of the tooltip link / accent.
- **Font Size** — a named size from the framework presets.
- **Margin & Padding** — spacing control. All Sides applies to every side at once; any per-side value overrides it for that direction.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
