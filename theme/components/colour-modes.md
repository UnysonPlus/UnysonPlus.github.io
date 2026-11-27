---
title: Colour Modes
sidebar_position: 2.5
slug: /components/colour-modes
description: Colour Modes give the Theme Settings palette more than one set of values (Dark, a second brand, high contrast) and switch the whole site, one page or one Section / Div between them; a visitor's dark-mode preference can pick the Dark mode.
---

# Colour Modes

**Theme Settings → Components → Color Presets → Colour Modes** gives the [palette](./color-presets.md) more than one
set of values: a **Dark** mode, a **second brand**, a **high-contrast** set. You then choose where each one applies:

- the **whole site** (Site Colour Mode),
- **one page** (the page's settings → Colour mode),
- **one Section, Div or Container** (its Styling tab → Colour mode), for a dark band on a light page or a partner's
  colours on one block,
- and, for the mode marked **Use as Dark mode**, the visitor's own choice: the Dark Mode toggle, or their phone or
  computer's dark setting.

<img src="/img/theme/components/colour-modes-bands.png" alt="Three bands of the same content: in the site colours (green button), in a Dark mode (dark background, light text, a brighter green button) and in a Brand B mode (pink button)" width="1100" />

The same three bands, the first in the site colours and the others set to the Dark and Brand B modes. Nothing in the
bands was restyled by hand: the button, the palette-coloured text, the background and the text colour all follow the mode.

## Making a mode

<img src="/img/theme/components/colour-modes-settings.png" alt="Theme Settings: the Colour Modes list with Dark and Brand B, the Add a colour mode button, and the Site Colour Mode setting" width="1450" />

Click **Add a colour mode** and fill in only what should change. Anything left empty keeps its normal value.

| Field | What it changes |
| --- | --- |
| **Name** | The mode's name in every Colour mode list (Dark, Brand B, High contrast). |
| **Palette** | One picker per Color Preset: the value that colour takes in this mode. Every `.text-{slug}`, `.bg-{slug}` and `var(--color-{slug})` follows, and so do Button, Box, Table and Section Style presets that use palette colours. |
| **Page background**, **Text**, **Muted text**, **Borders and dividers** | The page surfaces (`--color-bg`, `--color-text`, `--color-muted`, `--color-border`, and Bootstrap's matching variables, so forms and components follow too). |
| **Menus and panels** | Dropdown menus, mega menu panels and the mobile drawer. |
| **Header background**, **Footer background**, **Footer text and links** | The site header and footer. |
| **Other variables** | Any other CSS variable, one `--name: value` a line, for sizes and shapes: `--h1-font-size: 3.5rem`, `--radius: 0`. |
| **Use as Dark mode** | Visitors who switch the site to dark see this mode (see below). |
| **Follow the device setting** | With Use as Dark mode on and no toggle on the site: visitors whose device is set to dark see this mode automatically. |

Save, and the new mode appears in **Site Colour Mode** and in every Colour mode list.

:::tip[Check the contrast]
A mode changes colours, not the text on them. If the Dark mode brightens the primary colour, check that the button text
(often white) still reads on it, and pick a value that works for both, as in the example above.
:::

## Where a mode applies

| Where | How | What it sets |
| --- | --- | --- |
| The whole site | Theme Settings → **Site Colour Mode** | `data-fw-mode="{slug}"` on `<html>` |
| One page | The page's settings → **Colour mode** (*Same as the site* by default) | `data-fw-mode` on `<html>` for that page; it wins over the site's |
| A Section, Div or Container | Styling tab → **Colour mode** (*Same as the page* by default) | class `fw-mode-{slug}`; the element paints its own text and background when the mode sets them |
| The visitor's dark choice | the mode with **Use as Dark mode** | the Dark Mode toggle (Site-wide UX → Dark Mode), or the device setting with **Follow the device setting** |

Precedence, from strongest: a Section's own mode, then the visitor's dark choice, then the page's mode, then the site's.
So a band you set to Brand B stays Brand B in dark mode, and a visitor who asked for dark gets it on every page.

With a Dark mode set, the Dark Mode toggle uses your colours instead of the theme's built-in dark palette.

## The CSS it writes

A mode only sets CSS variables, so it costs a few hundred bytes in the generated Theme Settings CSS and no script:

```css
:root[data-fw-mode="dark"], .fw-mode-dark { --color-primary: #1f9a76; --color-bg: #101418; --color-text: #e8ecef; /* … */ }
.fw-mode-dark { color: var(--color-text); background-color: var(--color-bg); }
:root:root[data-bs-theme="dark"] { /* the same variables: the visitor's toggle */ }
@media (prefers-color-scheme: dark) { :root:root:not([data-bs-theme]) { /* the same: the device setting */ } }
```

Preset CSS writes palette colours as `var(--color-{slug}, #hex)`: it looks the same when no mode applies, and follows
one when it does.

## Limits

- A colour typed as a custom value on an element (not picked from the palette) stays that colour in every mode.
- Images and background photos do not change; pick a mode's colours to suit them, or give a band its own background.
- **Use as Dark mode** belongs on one mode. If several have it, the last one in the list wins.

## For developers

`framework/includes/presets/color-modes.php`: `unysonplus_get_color_modes()` (the cleaned modes),
`unysonplus_color_modes_css()`, `unysonplus_color_mode_class( $slug )`, `unysonplus_color_mode_option()` (the select
for your own element or post type) and `unysonplus_color_mode_current()`. AI agents edit modes with `save_preset`
(type `color_modes`) and switch them with `update_theme_settings` (`color_mode_site`) or an element's `color_mode`.

## Related

- [Color Presets](./color-presets.md), the palette the modes re-colour.
- [Section Styles](./section-styles.md), a whole look for a band (padding, background, text) rather than a palette swap.
