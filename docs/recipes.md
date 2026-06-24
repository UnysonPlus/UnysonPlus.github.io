---
title: Recipes
sidebar_position: 9
---

# Recipes

Short, practical how-tos for common tasks with the Unyson+ theme. Each one is self-contained —
skim the headings and jump to what you need.

## Set up a new site quickly

After activating the theme, open **Appearance → Getting Started**. It shows a live checklist that
detects what's still missing and links straight to the screen that fixes each item:

1. **Add your logo & site identity** — uploads a logo and sets the title/tagline.
2. **Choose brand colours & fonts** — in **Theme Settings**; every element inherits them.
3. **Create a navigation menu** — and assign it to the **Primary** location.
4. **Set a static homepage** — point the front page at a page you build with the page builder.
5. **Populate the footer** — add footer columns/widgets or build it in **Theme Settings → Footer**.

A one-time welcome notice links here after activation; dismiss it once you're done.

## Pick a page width (boxed, full, or framed)

Go to **Theme Settings → General → Layout → Site Width Mode** and choose one:

- **Full width** — content spans edge to edge.
- **Boxed** — a centred, fixed-width column. Reveals **Boxed Width** (px), **Alignment**, and a
  top/bottom margin so the page "floats" on the site background.
- **Framed** — a coloured border around the whole viewport. Reveals **Frame Width** and **Frame
  Color**.

Only the options for the mode you pick are shown, so the panel stays uncluttered. The horizontal
breathing room on the sides is the **Container Gutter** (same tab) — leave it blank for a
responsive default (~20–32px), or set an explicit value.

## Use dynamic tokens in the footer

In the footer **Copyright** or **Text** element, type a token and it resolves at render time:

```text
© {{current_year}} {{site_name}}. All rights reserved.
```

Common tokens:

| Token | Resolves to |
| --- | --- |
| `{{site_name}}` | Site Title |
| `{{site_tagline}}` | Site Tagline |
| `{{current_year}}` | Current year (e.g. 2026) |
| `{{copyright_year}}` | Current year |

These are part of Unyson+'s [Dynamic Content](./dynamic-content.md) system, so the full set of tags
(post title, custom fields, dates, WooCommerce fields, …) is available too. The theme also resolves
the four tokens above on its own, so the footer never shows a literal `{{token}}` even if the plugin
is temporarily inactive.

## Self-host fonts (and speed up Google Fonts)

**Self-host (GDPR-friendly, no third-party request):** go to **Theme Settings → General →
Typography → Custom Fonts**, add a font, give it a **family name**, and upload a `.woff2` (and
optionally `.woff`). The family then appears in every typography picker and is emitted as an
`@font-face` rule with `font-display: swap`.

**Using Google Fonts instead?** Pick them in the Typography options as usual. The theme automatically
adds `preconnect` hints to the Google Fonts hosts (only when a Google font is actually in use), so the
browser opens those connections early and text paints sooner. Nothing to configure.

## Make the site right-to-left (RTL) or multilingual

**RTL** is automatic. On an RTL locale (Arabic, Hebrew, …) WordPress sets `dir="rtl"`, Bootstrap's
logical utilities flip, and the theme loads a small `rtl.css` overlay that mirrors its own
directional rules. No setting to toggle.

**Multilingual (WPML):** the theme ships a `wpml-config.xml`, so WPML reads it automatically — the
header/footer builder layouts are flagged as non-translatable chrome, and the theme settings strings
(footer copyright, etc.) are registered for **WPML → String Translation**. Translate menus and content
the usual WPML way.

## Override a button preset (or any preset) in a child theme

Theme presets are designed to be overridable. The stylesheet cascade loads in this order:

```text
framework / shortcode CSS  →  parent-style  →  presets + dynamic CSS  →  child-style
```

Because your **child theme stylesheet loads last**, a plain rule wins — no `!important` needed:

```css
/* child theme style.css */
.btn-primary { background-color: #c0392b; border-color: #c0392b; }
```

Button presets are emitted **without** `!important` precisely so this works. The same applies to
typography and colour tokens, which are CSS custom properties you can redefine:

```css
/* child theme style.css */
:root { --color-primary: #c0392b; --font-heading: "Fraunces", serif; }
```

## Keep prose links styled without affecting buttons

The theme colours links **inside paragraphs and list items** with your body-link colour, and
deliberately leaves classed links (buttons, shortcode links) alone:

```css
.entry-content :is(p, li) a:not([class]) { color: var(--body-link-color); }
```

So a `text_block` link gets the brand colour, while a `.btn` in the same content keeps its button
styling. If you add a custom prose-link style in a child theme, scope it the same way so you don't
catch buttons.
