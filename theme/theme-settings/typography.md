---
title: Typography
sidebar_position: 2
slug: /theme-settings/typography
description: Unyson+ theme typography — body and heading fonts, the h1–h6 type scale, link colors and underline behavior, and custom fonts.
---

# Typography

**Theme Settings → General → Typography** sets the site's fonts and type scale. The theme
auto-loads the Google font you choose, so setting a family is enough.

## Fonts

| Setting | What it does |
| --- | --- |
| **Body Font & Text** (`body`) | The main content typeface — family, weight, size (default 16), line-height (1.6), letter-spacing, and color. Default family is **Open Sans**. |
| **Heading Font** (`heading_font`) | The family for all headings. Leave blank to inherit the body font. |

Set **Body** + **Heading Font** families to change the whole site typeface.

## Links

| Setting | What it does |
| --- | --- |
| **Body Link / Hover Color** | Content link colors (blank uses the Primary color). |
| **Body Link Underline** | `hover` (default), `always`, or `never`. |

## The heading scale (h1–h6)

Each heading level has its own override — family, weight, size, line-height, letter-spacing, and
color. Leave a field blank to keep the theme's preset scale (for example h1 defaults to ~36px with a
tight 1.15 line-height and slightly negative letter-spacing; h6 to ~16px). Fill only the values you
want to change.

## Custom fonts

**General → Typography → Custom Fonts** lets you register your own font files (an addable list), so
non-Google or licensed fonts become choices in the family pickers.

:::tip[Prefer the setting over CSS]
Set sizes and families here rather than writing CSS, so the type scale stays consistent and every
element that reads the scale (headings, the page builder's Text Styles) follows.
:::
