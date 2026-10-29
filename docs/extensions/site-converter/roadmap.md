---
sidebar_position: 11
title: "Roadmap — Convert HTML to Elementor, Divi, Bricks and more"
sidebar_label: "Roadmap"
description: "Where the Site Converter is heading: today it converts any HTML site into Unyson+ pages or a Block Theme, with Elementor output in Pre-Alpha. Divi and Bricks outputs are next."
---

# Site Converter roadmap

The Site Converter turns any static or AI-generated HTML site into editable WordPress pages. Everything before the last step — the capture, the section and element recognizers, the design tokens, the presets — is builder-neutral. Only the final step, the **emitter**, writes a specific builder's page format. That is what lets the same conversion target more than one page builder.

## Output targets

| Target | Status |
| --- | --- |
| **Unyson+** page builder | Available |
| **Block Theme** (Gutenberg blocks) | Available |
| **Elementor** | Pre-Alpha build |
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

Every target above is listed in the converter's **Output** picker inside Unyson+, so you can see where it is heading. Targets that are not built yet are disabled and marked *Coming soon*.

Targets marked **Coming soon** are planned. When development on one starts, its status changes to **Pre-Alpha build**: it converts, it is in active development, and it is not yet meant for production sites. It graduates to **Available** once it passes the same fixture and real-site checks the Unyson+ output goes through.

### Elementor (Pre-Alpha)

Pick **Elementor** in the Output picker to convert pages into Elementor Flexbox Containers and widgets. It needs Elementor active with Flexbox Containers switched on, and the Unyson+ Theme for the header and footer. The converter offers to install the theme if it is missing. Each element goes down a fallback ladder: an Unyson+ widget from the Elementor extension when it is installed, then a free Elementor widget, then a container of widgets, then an HTML widget as a last resort. The Elementor extension's **Design Sync** keeps the Unyson+ Theme Settings colours and fonts in step with Elementor's global colours and fonts, in both directions.

## How a new target is built

1. The converter's builder-neutral tree is mapped onto the target's page format (sections, containers, headings, text, images, buttons, forms).
2. The design system — colours, fonts, spacing, button and box presets — is written into the target's global styles.
3. Training sessions on real sites tune the mapping for that builder, exactly as the Unyson+ output was tuned.

## Known gaps

Found during training on real sources, recorded here rather than left in a chat log.

**A card's header pair is dropped.** Some sources open a card with two small items above its title — an
index numeral beside an arrow, or a year beside a venue chip — and close it with a label/value meta row
(`Core Jurisdiction: …`, `Outcome: …`). The card recognizer claims the card but carries neither, so that
text is lost. Measured on one converted source: **14 visible text runs across two sections**, with the
cards also losing their borders. This is the single largest remaining text loss we know of.

The open question is deliberately *not* "add options to the card element". A comparable case — a labelled
row of mutually exclusive chips inside a form — was solved by translating onto a field the form builder
**already had** (`radio`), adding nothing to the product surface. The same test applies here: if the pair
can ride on something the card elements already offer, it should; if it cannot, the honest answer is to
report the loss rather than grow the element.

**Related, now fixed:** the capture used to finish its work and never exit, so anything that waited for
the child (the test suite, the service) saw a timeout instead of the success already written to disk; and
the client-rendered-app guard charged every small static page a 124-second wait plus a full re-navigation
for a hydration problem it did not have.

## What you need

The converter ships inside the Unyson+ plugin. Install Unyson+, open **Site Converter**, paste a URL or upload an HTML file, and pick the output target.

Follow the [changelog](https://github.com/UnysonPlus/UnysonPlus/releases) for status changes.
