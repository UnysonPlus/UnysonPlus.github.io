---
title: Architecture overview
slug: /architecture
sidebar_position: 1
---

# Architecture overview

UnysonPlus is not a single product but **three cooperating pieces**: a framework plugin, a parent
theme, and the child themes you build on top. This section explains how they fit together, how the
framework boots, how the extension system discovers and activates modules, and how a page travels
from a builder edit to rendered HTML. It's written for developers extending the framework — if you
only want to *use* the builder, start with the [Page Builder](/docs/page-builder) section instead.

## The three pieces

| Piece | What it is | Where it lives |
| --- | --- | --- |
| **Unyson+ plugin** | The framework core + all bundled extensions. Installs like any plugin. | `wp-content/plugins/unysonplus/` |
| **Unyson+ Theme** | The Bootstrap-5 **parent theme** built for the framework. | `wp-content/themes/unysonplus-theme/` |
| **Child themes** | What you actually ship to a site — a child of the parent theme. | `wp-content/themes/<your-child>/` |

A key design choice: **the framework doesn't know it's a plugin.** Its code only knows its own
path and URI, so the exact same framework can run from a plugin directory *or* from inside a theme.
That's why everything boots on `after_setup_theme` (when theme paths are known) rather than on
plugin load — see [How the framework boots](./framework-boot.md).

```
┌─────────────────────────────────────────────────────────────┐
│  WordPress                                                   │
│                                                              │
│   Unyson+ plugin ── framework core ── fw() singleton         │
│        │                 ├── manifest   (version, requires)  │
│        │                 ├── extensions (discover + activate)│
│        │                 ├── backend    (options UI, AJAX)   │
│        │                 └── theme      (theme integration)  │
│        │                                                     │
│        └── bundled extensions (page-builder, shortcodes,     │
│            forms, portfolio, …) — activated on demand        │
│                                                              │
│   Unyson+ Theme (parent) ── consumes the framework           │
│        └── Child theme  ── overrides + brand                 │
└─────────────────────────────────────────────────────────────┘
```

## How the layers cooperate

- The **plugin** provides the framework runtime (`fw()`), the option-types system, the backend
  options UI, and the bundled extensions.
- The **parent theme** consumes the framework: it registers Theme Settings, renders builder
  output, and ships the base CSS the elements style against.
- A **child theme** overrides only what it needs. Crucially, a child (or parent) theme can also
  **override or add extension files** through a `framework-customizations/extensions/<name>/`
  directory — the framework merges three locations (framework → parent → child) when it loads
  extensions. See [The extension system](./extension-system.md#three-locations).

## What's in this section

- **[How the framework boots](./framework-boot.md)** — the load sequence from `unysonplus.php` to
  the `fw_init` action, and the `fw()` singleton's components.
- **[The extension system](./extension-system.md)** — how extensions are discovered, the
  requirement/dependency model that orders activation, file-include order, and theme overrides.
- **[Manifests &amp; versioning](./manifests-and-versioning.md)** — the manifest model behind the
  framework, theme and every extension, and the project's version-bump rules.
- **[Data flow: edit → stored JSON → render](./data-flow.md)** — the end-to-end path of builder
  content, tying the pieces together (and linking into the Page Builder deep-dive).
