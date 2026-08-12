---
title: Layout
sidebar_position: 3
slug: /theme-settings/layout
description: Unyson+ theme layout settings — site width mode, background, container width and gutter, content density, and border roundness.
---

# Layout

**Theme Settings → General → Layout** (`general_layout`) controls the overall canvas.

## Site width

| Setting | What it does |
| --- | --- |
| **Site Width Mode** | `full`, `boxed`, or `framed`. Boxed adds a max width (default 1320px), alignment, and top/bottom margin; Framed adds a colored viewport border. |
| **Container Width** (`layout_container_width`) | The max content width, responsive per device (defaults ~1170px on large screens). |
| **Container Gutter** | The horizontal padding inside the content container. |
| **Reading Width** | Caps content width on sidebar-less pages for comfortable line length. |

## Background

| Setting | What it does |
| --- | --- |
| **Site Background** | A full background-pro control (color, gradient, or image) for the body. |
| **Site Background Pattern** | An optional fixed full-page pattern layer over the background. |

## Rhythm & shape

| Setting | What it does |
| --- | --- |
| **Content Density** (`layout_section_spacing`) | Global vertical rhythm: `compact` (0.75×), `cozy` (default), or `spacious` (1.5×). |
| **Border Roundness** (`layout_roundness`) | The `--radius` token: `sharp`, `subtle` (default), `rounded`, or `soft`. Elements that read the token follow. |

:::note[Related: Base]
**General → Base** holds opt-in extras — selection colors, a custom scrollbar, the keyboard focus
ring, and content-protection toggles. They're off by default; set a color to enable the scrollbar or
focus ring.
:::
