---
title: Concepts & glossary
sidebar_position: 2
---

# Concepts & glossary

A quick orientation to the terms you'll meet throughout this manual, with a link to where each is
covered in depth. If a page assumes a word you don't recognize, it's probably here.

## The big picture

- **Framework** — the Unyson+ core runtime (`fw()`): the options system, the backend UI, the
  extension loader, and the boot lifecycle. Lives in the plugin. See
  [Architecture](/docs/architecture).
- **Plugin** — the Unyson+ WordPress plugin that carries the framework and the bundled extensions.
- **Parent theme** — the **Unyson+ Theme**, a Bootstrap-5 theme built for the framework; it renders
  the builder output and provides Theme Settings. See [The Theme](/theme).
- **Child theme** — what you actually ship: a theme that inherits everything from the parent and
  overrides only your brand. See [Child themes](/theme/child-themes).
- **Extension** — a modular feature (Forms, Portfolio, Theme Builder, …), a folder with a manifest
  that the framework discovers and activates on demand. See
  [The extension system](/docs/architecture/extension-system).

## The Page Builder

- **Page Builder** — the visual, drag-and-drop editor for composing pages. See
  [Page Builder](/docs/page-builder).
- **Element** (a.k.a. **shortcode**) — a building block you drop on the canvas (a Button, a Heading,
  an Accordion). Every element is a WordPress shortcode under the hood. See
  [Elements](/docs/shortcodes/overview).
- **Section / Row / Column** — the layout containers. A page nests **section → row → column →
  element**. See [Column widths](/docs/page-builder/column-widths).
- **Container element** — a second boxed/full-width wrapper you can place inside a section.
- **Builder JSON** — the stored representation of a built page: a JSON tree of items. See
  [The builder JSON tree format](/docs/page-builder/builder-json-format).
- **Items corrector** — the pass that wraps loose elements into a valid section/row/column grid at
  render time. See [The items corrector](/docs/page-builder/items-corrector).
- **`builder_active`** — the flag that tells the theme to render builder output instead of the
  default post content.
- **Snippet** — reusable builder content you embed anywhere (`[snippet id="…"]`). See
  [Snippets](/docs/extensions/snippets).
- **Global Template / Template** — a reusable Section/Column, or (in the Theme Builder) a bundle of a
  header/body/footer plus assignment rules. See [Theme Builder](/docs/extensions/theme-builder).

## Options & settings

- **Option** — a single configurable field (a heading text, an accent color). Declared as a PHP
  array with a `type`.
- **Option type** — the *kind* of a field (`text`, `select`, `color-picker`, `typography`, …). See
  [Option types](/docs/options/option-types).
- **Container** — an option type that holds other options (`box`, `group`, `tab`, `multi`, `popup`).
- **Theme Settings** — the global design layer (colors, typography, header/footer, custom CSS). See
  [Theme Settings](/theme/theme-settings).
- **Preset** — a reusable, named design value (a color palette, a font-size scale, a button style).
  See [Presets & design tokens](/docs/hooks/presets-and-tokens).
- **Design token** — a CSS custom property (`--color-primary`, `--radius`) the theme generates from
  settings. See [How settings become CSS](/theme/settings-to-css).
- **Generated stylesheet** — the single file the theme compiles all design into (no inline-style
  soup). See [Performance](/docs/performance).

## Dynamic content

- **Dynamic Content** — the `{{token}}` system that turns a placeholder into a live value at render
  time. See [Dynamic Content](/docs/dynamic-content).
- **Token** — `{{tag_id|param=value|fallback=…}}`, what you insert into a text field.
- **Tag** — a registered dynamic value (`post_title`, `site_name`, `current_year`, a custom field).

## Shipping & extending

- **Manifest** — the `manifest.php` (or theme `style.css`) that declares a project's version and
  requirements. See [Manifests & versioning](/docs/architecture/manifests-and-versioning).
- **`github_update`** — the manifest key that opts an extension/theme into GitHub auto-updates. See
  [Updates](/docs/extensions/updates).
- **Hook** — a WordPress **action** (run code) or **filter** (change a value) the framework fires.
  See [Hooks & Filters](/docs/hooks).
- **`fw_…` / `unysonplus_…`** — the function/hook prefixes: `fw_` is the framework core API,
  `unysonplus_` is theme/plugin-era code.
- **`AGENTS.md`** — area-specific developer guides shipped *next to the code* in the plugin; the most
  detailed, continuously-verified reference when you're working in an area.
