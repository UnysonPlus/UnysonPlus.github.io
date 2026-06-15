---
sidebar_position: 3
title: Layout Elements
---

# Layout Elements

The structural elements that hold your content. Sections wrap rows, rows hold columns, and
columns hold content elements. Specialized section types add backgrounds and effects.

> Most elements also expose **Background Color** and **Margin & Padding**; those are omitted
> below for brevity.

## Section

A full-width-capable content section — the top-level container for a band of content.

**Key options:** Section Variant, Full Width, Background Color/Image/Video, Enable Bleed
Layout (with Bleed Image, Image Position/Side, Image/Content Ratio), Content Background Color,
Content Vertical Alignment, Content Padding, Mobile Stacking Order, Top/Bottom Spacing, Gap
(with X/Y overrides).

## Hero Section

A section with a parallax background image — ideal for page headers.

**Key options:** Full Width, Minimum Height, Content Vertical Alignment, Background Image,
Parallax Strength, Overlay Color, Fallback Background Color.

## Masonry Section

A section that packs its columns into a masonry grid.

**Key options:** Columns (Desktop / Tablet / Phone), Gap, Full Width, Padding Top/Bottom.

## Bleed Section

A split section: content on one side and a full-bleed image on the other. Stacks on mobile.

**Key options:** Bleed Image, Image Side (Right / Left), Image / Content Ratio (eleven presets
from `1/12 + 11/12` to `11/12 + 1/12`), Image Position (Center / Top / Bottom / corners),
Mobile Stacking Order (Content First / Image First), Full Width Content, Content Background
(color / gradient / image), Content Vertical Align (Top / Center / Bottom), Content Padding
(None / Small / Medium / Large).

## Row

A builder **row** — the horizontal container that holds columns inside a section. Added
automatically as you build; it groups columns and controls their horizontal flow.

## Column

A responsive **column** inside a row, with fine-grained control over width and position across
breakpoints.

**Key options:** Column Width, Offset, Order, Content Alignment, Vertical Alignment, Height
(Auto/Full), Display, Width (px), Font Weight/Style, Box Shadow, Opacity, Position, Full
Height, Mobile Order, per-breakpoint Width & Offset (Phone / Tablet / Desktop), vertical &
horizontal content alignment, Z-Index, Border Preset, Inner Wrapper Class.
