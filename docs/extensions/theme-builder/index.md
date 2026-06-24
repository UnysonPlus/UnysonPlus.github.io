---
title: Theme Builder
sidebar_position: 1
---

# Theme Builder

**Theme Builder** is the UnysonPlus answer to Divi's Theme Builder: design global **Headers**,
**Footers**, and full-page **Body** layouts with the visual page builder, bundle them into a
**Template**, and assign each Template to parts of your site with conditional rules ("Use On /
Exclude From"). The right header, body, and footer are chosen per request; when no Template matches,
your **Theme Settings** header/footer is the fallback.

<img src="/img/theme-builder-grid.png" alt="The Theme Builder admin grid — Templates with Header / Body / Footer / Used On columns" width="1260" />

:::note Evolving extension
The Theme Builder is under active development and ships as a **download-only** extension (its own
GitHub repo, `UnysonPlus/UnysonPlus-Theme-Builder-Extension`, **not bundled** in the plugin). Install
it from **Unyson+ → Extensions** (a **Download** card), then it appears as its own **Theme Builder**
admin menu. Some pieces (dynamic single-post body elements, child-theme distribution) are still being
finalized, this documentation describes the current build and will be updated as those land.
:::

## The four building blocks

Theme Builder owns four content types. The first three are authored with the page builder; the
fourth is pure assignment data.

| Type | What it is |
| --- | --- |
| **Header Preset** | A header layout, built with the page builder. → [Headers & Footers](./headers-and-footers.md) |
| **Footer Preset** | A footer layout, built the same way. → [Headers & Footers](./headers-and-footers.md) |
| **Body Template** | A full-page body layout that replaces the content area for assigned requests. → [Body Templates](./body-templates.md) |
| **Template** | Binds a Header + Body + Footer (each optional) to conditional rules. The "card" in the grid. → [Conditional assignment](./conditional-assignment.md) |

## Where it lives in the admin

Activating the extension adds a **Theme Builder** menu (just under Appearance) with:

- **Templates** — the management grid (Name / Header / Body / Footer / Used On). This is where you
  create Templates and set their conditions.
- **Header Presets**, **Footer Presets**, **Body Templates** — the page-builder-authored parts, each
  a normal post list you edit in the builder.

A Template's slots are independent: leave **Header** or **Footer** as *Inherit* to fall through to
your existing header/footer, and leave **Body** as *None* to render the normal page content.

## In this section

- **[Headers & Footers](./headers-and-footers.md)** — building header/footer presets, the Header
  Type & Scroll Behavior, the trimmed palette, and the header/footer fallback chain.
- **[Body Templates](./body-templates.md)** — full-page bodies, the three render modes
  (single / archive-loop / static), the Loop Layout, and dynamic content.
- **[Conditional assignment](./conditional-assignment.md)** — Templates, the Use On / Exclude From
  vocabulary, and how the winning Template is chosen.
- **[Developer reference](./developers.md)** — the CPTs, the post-meta contract, the render helpers,
  the resolver API, the filters, and the security model.
