---
title: Where Converted CSS Lives
sidebar_label: Where CSS Lives
sidebar_position: 3.6
slug: /css-placement
description: The two CSS surfaces a conversion writes to — the child theme's style.css and Theme Settings → Misc Custom CSS — what each one is for, exactly what lands where, and how they relate to native options. They are complementary, not redundant.
---

# Where converted CSS lives — child theme vs Misc Custom CSS

A conversion writes CSS to **two** places, and they are **complementary, not redundant** — they load
differently and exist for different jobs. This page is the definitive answer to *"what goes to the child
theme, and what goes to Misc Custom CSS?"*

## The two surfaces at a glance

| | **Child theme `style.css`** | **Theme Settings → Misc Custom CSS** |
|---|---|---|
| **Storage** | a **file** in the child theme | a value in the **database** (a Theme Setting) |
| **Loads on** | the front‑end | the front‑end **and inside the builder canvas** (wp‑admin preview) |
| **Portable?** | tied to that child theme | **theme‑portable** — survives a theme switch |
| **Regenerated?** | rewritten on each **Build** (between markers) | written once per conversion; hand‑edits persist |
| **Edited in** | the theme file editor / re‑upload (developer surface) | Theme Settings → Misc (admin UI, non‑technical friendly) |
| **Best for** | the site's **own design** — large, structural | **small, global tweaks** + theme‑rendered **chrome** |

## What actually goes to the child theme `style.css`

The child theme is the converted site's **own design system** — everything that defines how the page
**body** looks. It's a file because it's large, versioned with the theme, and regenerated on each Build.
In a real conversion you'll find, in order:

- **Self‑hosted webfonts** — `@font-face` rules rehosting the source's fonts locally (no CDN dependency).
- **Design tokens & typography** — `--font-body` / `--font-heading`, the page background, base font
  families and the heading scale. Self‑contained, so the converted look doesn't depend on the parent
  theme's Theme‑Settings typography.
- **Button baseline** — the bare `.btn` defaults derived from the source's button style.
- **Dynamic menu CSS** (`.sc-menu`) — the rebuilt WP menu styled to look like the source nav.
- **Per‑element "mapped" CSS** (the `SC:REGCSS` block) — clean, semantic rules for each converted
  element, scoped to `#section-N …` (e.g. a special heading's overline size/weight/color).
- **Per‑section CSS** (the `SC:SECTIONS` block) — the residual carried CSS for each converted section,
  **regenerated on every Build**.
- **Contrast‑review notes** — WCAG AA warnings left as comments (your colors are never auto‑changed).

Anything that is **the converted page's styling** belongs here.

## What goes to Misc Custom CSS

Misc Custom CSS is the place for **small, global, database‑stored** rules — the ones that must also apply
**live in the builder preview** and stay with the site if the theme changes. In practice that's:

- **Scoped overrides to the theme‑rendered chrome** — the **header** and **footer**. Because the native
  header/footer are built by the theme (not the page body), their exact‑match tweaks live here: e.g. the
  header **glass** `backdrop-filter` (the precise blur), footer text/link colors, footer heading fonts,
  footer column spacing.
- **Small cross‑cutting rules** that need to be present in wp‑admin too (all Custom CSS is auto‑scoped
  away from the admin chrome, so a global `body`/`html` rule can't repaint the editor).

Rule of thumb: **body/content styling → child theme; theme‑rendered chrome + small global tweaks → Misc
Custom CSS.**

## How this relates to native options (the override rule)

This split is the delivery mechanism for the **[native‑option + override](./conversion-architecture#fidelity-native-option-first-childstylesheet-override-on-top)**
principle. The converter always sets the **native option first** (a Box Preset, Header → *Translucent /
Glass*, a color) — and when the source's exact values differ from what the option produces, it writes the
**exact CSS as a scoped, low‑priority override on top**:

- The override for a **page element** (a card's frosted `backdrop-filter`, a heading's gradient) rides in
  that element's own scoped CSS → it lands with the page‑body styling (child theme, or the element's
  `custom_css`).
- The override for **chrome** (the header glass blur) rides in Misc Custom CSS, scoped to the header.

Either way the override **layers on top of** the native option — never instead of it. The option keeps
the meaning and the editability; the scoped CSS carries the last mile of pixel fidelity.

## When there is no child theme

If you convert **content only** (child‑theme generation turned off), there's no `style.css` file to write
to — so the styling the child theme would have carried is applied through the database instead (Misc
Custom CSS and the per‑element `custom_css` stored on each shortcode). This is why **Misc Custom CSS is
always available**: it's the theme‑independent surface that works with or without a generated child theme.
That's also why it should **not** be disabled when a child theme is present — the two aren't
interchangeable (one is a file, one is DB + builder‑preview), and both are used by design.

## Which one should *you* edit?

- **A quick visual tweak** (nudge a color, a spacing, hide something) → **Misc Custom CSS**. It's in the
  admin, applies instantly including in the builder preview, and travels with your settings.
- **A larger or structural change**, or something you want under version control → the **child theme
  `style.css`**. Keep edits **outside** the `SC:SECTIONS` / `SC:REGCSS` markers, since those blocks are
  **regenerated on the next Build** and your changes inside them would be overwritten.
