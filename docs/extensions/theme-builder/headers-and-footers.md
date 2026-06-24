---
title: Headers & Footers
sidebar_position: 2
---

# Headers & Footers

A **Header Preset** and a **Footer Preset** are header/footer layouts you build with the page
builder, then assign with a [Template](./conditional-assignment.md). They live under **Theme Builder
→ Header Presets / Footer Presets**.

## Building a preset

Add a new Header or Footer Preset and it **opens straight into the Unyson Builder** (no classic
editor). Build the chrome with the **Header/Footer Elements**: Site Logo, Navigation Menu, Site
Search, Social Icons, and the Menu Toggle. Publish it, then assign it from a Template.

:::note Builder-only editing
Header/Footer/Body parts default to builder-active and the "Default Editor" toggle is hidden on
these screens, so a preset can't accidentally be switched to the classic editor.
:::

### A trimmed element palette

On Header and Footer editors the builder palette is **trimmed** to elements that make sense in site
chrome. Content-heavy elements (Accordion, Tabs, Posts, Testimonials, Team Member, Table, Map, Code
Block, Notification, and the Masonry/Bleed sections, among others) are hidden there. The list is
filterable, see [Developer reference → filters](./developers.md#filters). (Body Templates get the
**full** palette, a body can contain anything.)

## Header Type & Scroll Behavior

A Header Preset carries two structural settings (in the **Header Type & Behavior** box). The theme
supplies the CSS/JS for each; your builder content fills it.

**Header Type**

| Value | Layout |
| --- | --- |
| `standard-top` | Standard top, horizontal (default) |
| `sidebar` | Sidebar, vertical |
| `off-canvas` | Off-canvas / slide-out |
| `fullscreen-overlay` | Fullscreen overlay |
| `mega` | Mega menu |

**Scroll Behavior**

| Value | Behavior |
| --- | --- |
| `static` | Stays in place (default) |
| `sticky` | Sticks to the top on scroll |
| `sticky-shrink` | Sticks and shrinks once scrolled |
| `hide-on-scroll` | Hides on scroll down, reveals on scroll up |
| `transparent-overlay` | Transparent over the hero |

## How a header/footer renders

A preset's builder content is rendered to its **inner HTML** only, the auto-generated `<section>`
wrappers the items-corrector adds around root rows/columns are stripped, and the theme wraps the
result in the semantic `<header>` / `<footer>` (so the header chrome, the Type/Behavior classes, and
the theme's header/footer hooks all stay theme-side). User-authored sections are preserved.

## The header/footer fallback chain

For the header and footer, assignment cascades from most to least specific. When nothing higher
matches, your **Theme Settings** header/footer is the always-present baseline, so a site always has a
working header and footer even if no Template matches (or the extension is disabled):

```
1. Theme Builder Template matched by condition   (builder header/footer)
2. Per-page override (the page's Header & Footer box)
3. Site-wide default (Theme Settings → General → Pages)
4. Theme Settings slot-based header/footer        ← final fallback (always present)
```

## See also

- [Conditional assignment](./conditional-assignment.md) — assign a preset with a Template
- [Header / Footer Elements](/docs/shortcodes/header-footer-elements) — the building blocks
- [Guide: Build a sticky site header](/guides/sticky-header)
