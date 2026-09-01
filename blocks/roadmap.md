---
sidebar_position: 2
title: Roadmap
description: The phased plan for Unyson+ block editor support — what has shipped, what is next, and what is still being explored.
---

# Block editor roadmap

This page tracks how Unyson+ integrates with the WordPress block editor. It is
updated as each phase lands, so it doubles as the progress log.

**Status key** — ✅ Shipped · 🚧 In progress · 📋 Planned · 🔍 Exploring

*Last updated: 1 September 2026*

---

## Phase 1 — Design system published to `theme.json` ✅

**Shipped in Unyson+ Theme 2.5.69.**

The theme now generates its `theme.json` data at runtime from Theme Settings, so
WordPress can read the real design system instead of an opaque token.

Previously the palette was declared as `var(--color-primary)`. WordPress cannot
resolve a CSS custom property to a value, so Global Styles, the core block colour
pickers and contrast tooling all saw a token rather than a colour — and the Colour
Presets, font-size scale, Typography presets and spacing scale were invisible to the
block editor entirely.

What is published now:

| Setting | Source |
|---|---|
| `color.palette` | Semantic roles (primary, accent, text, muted, background) + named Colour Presets |
| `typography.fontSizes` | Font-size presets, with fluid ranges from the mobile scaler |
| `typography.fontFamilies` | Heading + body families from the Typography config |
| `spacing.spacingSizes` | The site's spacing scale |

Two properties of the implementation are worth knowing:

- **Slugs cannot drift.** Preset slugs are derived by the same helper that emits the
  `--color-{slug}` CSS variables, so a `theme.json` slug and its CSS variable always
  agree.
- **It is strictly additive.** Presets are merged onto whatever the `theme.json` file
  already declares rather than replacing it, so the bridge can upgrade an entry or add
  one but never remove one. Verified by diffing the generated global stylesheet with
  and without the bridge: zero properties removed, and the non-preset CSS is
  byte-identical.

Every core block now inherits the site's palette, typography and spacing
automatically.

---

## Phase 2 — Blocks extension 🚧

**Built, not yet released.**

A block library that exposes Unyson+ elements as native blocks, shipped as the
`blocks` extension (repository `UnysonPlus-Blocks-Extension`). It is **inactive by
default** — activate it per site, like the Animation Engine.

Design decisions:

- **Standard block anatomy.** Every block is a folder with a `block.json` manifest,
  `src/`, and a build — the same shape any WordPress developer would recognise.
  `block.json` is read by both PHP and JavaScript, so attributes cannot drift.
- **Dynamic rendering.** Blocks are server-rendered and delegate to the matching
  shortcode, so front-end output, enqueued assets and animation hooks are identical
  to the page builder's. A block is a second *authoring* surface, never a second
  *rendering* path — which is what stops the element library forking in two.
- **Inspectors built from the option schema.** Sidebar controls are not hand-written
  per block. Each block declares which option paths it exposes and the React control
  layer renders what it recognises, keeping the option schema the single source of
  truth.
- **Core `supports` wherever possible**, so colour, spacing, typography and alignment
  controls come from WordPress rather than from bespoke code — and inherit the
  Phase 1 design system for free.

Remaining before release: final verification pass, release build wiring, and
documentation of the block library.

---

## Phase 3 — Block Bindings for custom fields 🚧

**Binding source built.**

Register an Unyson+ binding source so core blocks — Paragraph, Heading, Image,
Button — can pull their content from Unyson+ custom fields.

The prerequisite is already in place: the Custom Fields extension registers its meta
with `show_in_rest`. This makes dynamic content possible with **zero custom blocks**,
and makes the framework's data layer a first-class citizen of the block editor.

What is built now: an `unysonplus/field` binding source (WP 6.5+). A core block binds an
attribute to a field with `source: unysonplus/field` and `args.key: <field name>`; the
resolver reads the value with the same `fw_get_db_post_option()` the REST field uses,
keyed off the block's post context, and coerces it to what the attribute needs (an
image/file field binds its URL). Only fields of an **active group targeting the post's
type** resolve — an unknown key returns nothing rather than exposing an arbitrary option.

A **block-editor picker** is also built: a "Unyson+ Field Binding" panel on Paragraph,
Heading, Image and Button lets an editor bind a field from the sidebar (rather than
hand-editing block markup), listing the fields whose group targets the post being edited.

Remaining before release: release wiring (and coverage for more block attributes over time).

---

## Phase 4 — Section styles 📋

Publish the Preset Library as `styles.blocks.variations`, so Unyson+ section presets
appear as a style dropdown on any core Group block.

This is the natural bridge between the framework's preset system and how block themes
express sections: a section in the block editor is a Group block with full-width
alignment and constrained layout, and section styles are how a design system attaches
to it.

---

## Phase 5 — Page builder → block markup export 🔍

**Under evaluation — not committed.**

The page builder's canonical format is structured JSON (`post_content` holds only a
derived render), which makes a JSON → block markup serialiser tractable.

Scope under consideration is **one-way export only**. Two-way sync would require a
lossless block equivalent for every shortcode and would create permanent drift between
two representations. A one-way export gives users a clean exit path without that cost.

---

## Not planned

For clarity, these are deliberate non-goals rather than pending work:

- **Converting the parent theme to a block theme.** Adding `templates/index.html`
  switches a theme wholesale into block-theme mode and disables its PHP templates.
  That is a one-way door with no benefit to this strategy.
- **Deprecating the page builder, header/footer builder or shortcodes.**
- **Rewriting Theme Settings.** It remains the authoring interface; `theme.json`
  is a generated output of it.
