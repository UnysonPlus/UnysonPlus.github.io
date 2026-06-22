---
title: Before / After
sidebar_position: 51
---

# Before / After

An interactive before/after image comparison slider — drag, hover or click to reveal — in many handle styles, horizontal or vertical. Its options are organized across the **Content**, **Design**, **Styling**, **Animations**, and **Advanced** tabs.

## Content

<img src="/img/shortcodes/before-after-content.png" alt="Before / After options panel — Content tab" width="1200" />

You supply two images that are stacked and revealed against each other as the divider moves:

- **Before Image** — upload for the "before" side (shown on the left / top). For the cleanest comparison, use two images with the same dimensions and framing.
- **After Image** — upload for the "after" side (shown on the right / bottom). Use the same size as the Before image so the two line up pixel-for-pixel.
- **Show Labels** — switch (`yes` / `no`; default `yes`) to display a small label over each side. The Labeled and Framed designs always show labels regardless of this switch.
- **Before Label** — text for the before-side label (default `Before`).
- **After Label** — text for the after-side label (default `After`).

## Design

<img src="/img/shortcodes/before-after-design.png" alt="Before / After options panel — Design tab" width="1200" />

- **Design** — image-picker of the handle / label look (default `classic`). Choices come from the design registry; all designs share the same slider engine, so the behavior below works with any design.
- **Orientation** — select for the divider direction; choices `Horizontal (drag left ↔ right)` (default), `Vertical (drag up ↕ down)`.
- **Interaction** — select for how visitors reveal the after image; choices `Drag the handle` (default), `Follow the cursor (hover)`, `Click to toggle (crossfade)`. Toggle crossfades the whole image on click/tap and hides the handle.
- **Start Position (%)** — slider (0–100, default `50`) for where the divider sits initially (0 = all after, 100 = all before).
- **Auto Intro Sweep** — switch (`yes` / `no`; default `yes`) to animate a quick sweep when the slider first scrolls into view. Ignored for the Click-to-toggle interaction.
- **Image Ratio** — select to crop both images to a consistent shape via `object-fit: cover`; choices `Original (uncropped — uses the Before image)`, `Square 1:1`, `Landscape 4:3`, `Landscape 3:2`, `Widescreen 16:9` (default), `Portrait 3:4`, `Portrait 2:3`.
- **Max Width** — optional text to constrain the slider width (e.g. `800px` or `80%`). Blank = full width.
- **Corner Radius** — select; choices `Square`, `Rounded` (default), `Large`.
- **Handle Size** — select for the drag handle / knob size; choices `Small`, `Medium` (default), `Large`.

## Styling

<img src="/img/shortcodes/before-after-styling.png" alt="Before / After options panel — Styling tab" width="1200" />

- **Background Color** — compact color picker for the wrapper background.
- **Font Size** — base font size for the labels (a named size from the framework presets).
- **Divider Color** — color of the divider line (custom color is honored; presets fall back to white).
- **Handle Color** — background color of the knob.
- **Handle Icon Color** — color of the arrows inside the knob.
- **Label Background** — background of the Before/After labels.
- **Label Text Color** — text color of the Before/After labels.
- **Margin & Padding** — spacing control. All Sides applies to every side at once; any per-side value overrides it for that direction.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
