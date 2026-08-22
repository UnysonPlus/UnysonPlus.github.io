---
title: How It Works
sidebar_label: How It Works
sidebar_position: 3
slug: /how-it-works
description: The AI Dev Kit method — capture the source first, translate it into native UnysonPlus options, build outside-in, and measure parity against the original instead of eyeballing.
---

# How It Works

The kit's method is what makes an agent's output accurate and maintainable rather than a rough copy.
Three ideas drive it.

## 1. Capture first — a conversion is a *translation*, not a redesign

When there's a source to reproduce (a URL, screenshot, template, or HTML/CSS), the agent does **not**
hand-measure it and type values into the builder. Instead it **captures** the source — the rendered
DOM, the real media, and the computed styles — and runs it through the **conversion pipeline**, which
maps each block to the right shortcode with **native options** and compiles the source's styling into
design tokens.

The finished design already contains every value; the agent's job is to **translate** it faithfully,
not to re-invent it. This "capture-first" rule is the single biggest reason conversions come out right.

> A **fresh build** (a brief with nothing to reproduce) is the one case that skips capture — there the
> agent legitimately invents values and then verifies them by measuring the render.

## 2. Build outside-in (tokens → chrome → sections → motion → verify)

Sites built big-bang come out wrong; built layer by layer, they come out right. The agent works
top-down and verifies each layer before the next:

1. **Design tokens** — set the palette, typography, buttons, boxes, and spacing in **Theme Settings**
   first, so every element consumes the same system.
2. **Chrome** — lock the **header, footer, and container** to the mockup before any page content.
3. **Sections** — build the page one section at a time.
4. **Details & motion** — fill in the finer elements and any animation.
5. **Verify** — measure each region against the source.

## 3. Measure, don't eyeball

The kit ships a **parity harness**. Instead of trusting a glance, the agent measures frame metrics and
compares each region to the source (pixel diff + DOM diff + a full-body property comparison), so
"does it match?" has a number behind it — and any systematic miss becomes an improvement to the
converter itself, so the next build needs even less hand-work.

## The result

A real, **fully-editable** UnysonPlus site — pages in the page builder, styling in Theme Settings — not
a static export. You can keep editing it in WordPress like any other UnysonPlus site.

See **[What It Can Build](./what-it-can-build.md)** for the kinds of projects this covers, and
**[Conversion Architecture](./conversion-architecture.md)** for the full pipeline underneath — how the
source is captured, mapped to shortcodes, and turned into a child theme + builder pages.
