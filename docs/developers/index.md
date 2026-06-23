---
title: For Developers
slug: /developers
sidebar_position: 1
---

# For Developers

UnysonPlus is built to be extended. Almost everything you'd want to add is one of three things: an
**extension**, an **option type**, or a **shortcode (element)**. Each plugs into the framework through
well-defined hooks and folder conventions, so you add files in your own directory and the framework
discovers them, you don't patch core.

## The mental model

```
Unyson+ plugin
├── framework core        the fw() runtime, options, backend, boot      → Architecture
├── option types          the building blocks of every options panel    → add an option type
├── extensions            modular features (Forms, Portfolio, …)         → create an extension
│   └── shortcodes
│       └── elements       the page-builder elements                     → add a shortcode
└── hooks                 actions + filters you extend behavior with      → Hooks reference
```

If you haven't yet, read **[Architecture](/docs/architecture)** first: how the framework boots, how
extensions are discovered and ordered by their requirements, and the data flow from a builder edit to
rendered HTML. It's the map everything below hangs on.

## Extend the framework

| Task | Guide |
| --- | --- |
| **Add a page-builder element** (shortcode) | [Add a shortcode](./add-a-shortcode.md) |
| **Add an option type** | [Create an option type](/docs/options/create-option-type) |
| **Create an extension** | [Creating extensions](/docs/category/creating-extensions) |
| **Add dynamic tags** | [Dynamic Content → add a provider](/docs/dynamic-content#add-your-own-tags-acf-pods-a-custom-value) |
| **Hook into the framework / theme** | [Hooks & Filters](/docs/hooks) (258 hooks, by subsystem) |

## Work with options & storage

The options framework powers Theme Settings, the Customizer, meta boxes, and every element's panel.

- [Option types](/docs/options/option-types) — the full catalog.
- [Integrating options](/docs/options/integrate) and [storage](/docs/options/storage) — where values
  live and how to read/write them (`fw_get_db_settings_option()`, `fw_get_db_post_option()`, …).
- [Customizer](/docs/options/customizer) — exposing options in the WordPress Customizer.

## Ship & version your work

Every meaningful change **bumps a version** (the GitHub auto-updater keys off it), and changelog
entries are reserved for new features. The exact bump/rollover scheme, which file to bump per project,
and the changelog policy are documented in
**[Manifests & versioning](/docs/architecture/manifests-and-versioning#versioning-rules)**.

:::tip Read the nearest `AGENTS.md`
The plugin ships area-specific `AGENTS.md` guides next to the code (the shortcode recipe, the
page-builder template format, the theme-settings guide, the dynamic-content reference). When you work
in an area, the `AGENTS.md` nearest the code is the most detailed, continuously-verified reference.
:::
