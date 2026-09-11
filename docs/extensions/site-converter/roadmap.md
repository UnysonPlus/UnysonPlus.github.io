---
sidebar_position: 9
title: "Roadmap — Convert HTML to Elementor, Divi, Bricks and more"
sidebar_label: "Roadmap"
description: "Where the Site Converter is heading: today it converts any HTML site into Unyson+ pages or a Block Theme. Elementor, Divi and Bricks outputs are next."
---

# Site Converter roadmap

The Site Converter turns any static or AI-generated HTML site into editable WordPress pages. Everything before the last step — the capture, the section and element recognizers, the design tokens, the presets — is builder-neutral. Only the final step, the **emitter**, writes a specific builder's page format. That is what lets the same conversion target more than one page builder.

## Output targets

| Target | Status |
| --- | --- |
| **Unyson+** page builder | Available |
| **Block Theme** (Gutenberg blocks) | Available |
| **Elementor** | Coming soon |
| **Divi** | Coming soon |
| **Bricks** | Coming soon |

Further targets under consideration, in the order they are likely to arrive:

| Target | Notes |
| --- | --- |
| **Beaver Builder** | Row / column / module format |
| **WPBakery** | Shortcode-based, close to the Unyson+ output |
| **Oxygen** | JSON tree per page |
| **Breakdance** | JSON tree per page |
| **Kadence Blocks**, **GenerateBlocks**, **Spectra** | Block-based — variants of the Block Theme emitter |

Every target above is listed in the converter's **Output** picker inside Unyson+ (disabled, marked *Coming soon*) so you can see where it is heading.

Targets marked **Coming soon** are planned. When development on one starts, its status changes to **Pre-Alpha build**: it converts, it is in active development, and it is not yet meant for production sites. It graduates to **Available** once it passes the same fixture and real-site checks the Unyson+ output goes through.

## How a new target is built

1. The converter's builder-neutral tree is mapped onto the target's page format (sections, containers, headings, text, images, buttons, forms).
2. The design system — colours, fonts, spacing, button and box presets — is written into the target's global styles.
3. Training sessions on real sites tune the mapping for that builder, exactly as the Unyson+ output was tuned.

## What you need

The converter ships inside the Unyson+ plugin. Install Unyson+, open **Site Converter**, paste a URL or upload an HTML file, and pick the output target.

Follow the [changelog](https://github.com/UnysonPlus/UnysonPlus/releases) for status changes.
