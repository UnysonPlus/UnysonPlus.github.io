---
title: Feature List
sidebar_position: 44
---

# Feature List

An icon-led list — checklist, cross/mixed, numbered or per-item icons — with optional sub-text, a right-aligned value, and links, laid out as a vertical column grid **or** a horizontal strip. Tabs: **Content**, **Design**, **Styling**, **Animations**, **Advanced**.

## Content

<img src="/img/shortcodes/feature-list-content.png" alt="Feature List options panel — Content tab" width="1200" />

- **Items** — an addable, repeatable list of features. Each item opens an Add / Edit Item popup with these sub-fields:
  - **Text** — the main line of the item (default "Feature item").
  - **Sub-text** — an optional smaller line beneath the text.
  - **Value** — an optional right-aligned value on the same row (e.g. "96%", "24h") — great for spec / stat rows.
  - **Icon** — an icon (icon-v2 picker) used by the "Per-item icons" / "Badge" designs. The item row preview in the builder shows the chosen icon inline.
  - **Marker Color** — override the marker color for this item only (e.g. a single red cross); blank inherits the list Marker Color.
  - **Check State** — `Available (check)` (default) or `Unavailable (cross)`; used by the Checklist design.
  - **Link URL** — optional; makes the item a link.
  - **Open in New Tab** — `Yes` (`_blank`) or `No` (`_self`, default).

## Design

<img src="/img/shortcodes/feature-list-design.png" alt="Feature List options panel — Design tab" width="1200" />

- **Marker Style** — image-picker of marker designs (check, cross/mixed, numbered, per-item icons, badge, etc.); default `check`.
- **Orientation** — `Vertical list` (default, uses the Columns grid) or `Horizontal strip` (items flow in a wrapping inline row — a feature / trust bar).
- **Icon Position** — `Left of text` (default) or `Above text (centered)` for a card-like item.
- **Icon Style** — a chip drawn around the checklist / per-item icon markers: `Plain` (default), `Soft tint`, `Solid circle`, `Outline`, or `Square badge`. Numbered and bullet markers keep their own shape; on the Badge design the badge look wins.
- **Columns** — `1` (default), `2`, or `3` (vertical orientation only).
- **Row Dividers** — `Yes` or `No` (default) — show a divider line between rows.
- **Alternating Rows** — `Yes` or `No` (default) — zebra-stripe the rows.
- **Row Spacing** — `Tight`, `Normal` (default), or `Roomy`.

## Styling

<img src="/img/shortcodes/feature-list-styling.png" alt="Feature List options panel — Styling tab" width="1200" />

- **Marker Color** — color of the markers / icons.
- **Text Color** — color of the main item text.
- **Sub-text Color** — color of the optional sub-text line.
- **Font Size** — font-size preset for the list.
- **Margin & Padding** — spacing control for the block.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
