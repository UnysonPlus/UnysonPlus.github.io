---
title: How Unyson+ compares
sidebar_position: 1
description: Where Unyson+ fits next to ACF, Elementor, Redux Framework and the original Unyson — what overlaps, what doesn't, and when you should pick something else.
---

# How Unyson+ compares

Most people arrive at Unyson+ already using something else, and the first honest question is not
"what does it do" but **"why isn't this just ACF, or Elementor, or Redux?"** This page answers that
directly, including the cases where the answer is *"it isn't — go use the other one."*

:::note[Scope of these comparisons]
Written against **Unyson+ 2.15**, ACF 6.x, Elementor 3.x, and Redux Framework 4.x. They stick to
**architectural** differences (how a tool is configured, what it stores, what's free) rather than
feature checklists, because architecture ages in years and feature tables age in weeks.
:::

## The one-paragraph version

Unyson+ is a **developer-facing framework for building WordPress themes**. You define options as
PHP arrays, ship them inside a theme, and get a settings panel, meta boxes, a page builder, and a
shortcode library out of it. The tools it gets compared to each cover *one slice* of that: ACF does
the fields, Elementor does the visual building, Redux does the options panel. Unyson+ covers all
three slices at once, which is its main advantage and the reason it's harder to categorize.

## The category map

None of these tools is a like-for-like replacement, so a head-to-head table would be misleading.
Here's the actual overlap:

| Tool | What it fundamentally is | Overlap with Unyson+ | The part that overlaps |
| --- | --- | --- | --- |
| **ACF (Pro)** | Custom fields + options pages | Substantial | The options/field system, meta boxes, repeatable groups |
| **Elementor / Bricks** | Visual page builders for end users | Partial | The page builder and shortcode/element library |
| **Redux Framework** | Theme options framework | Partial | The options panel and its field types |
| **Original Unyson** | Direct ancestor of Unyson+ | Almost total | Everything — see [Migrating from Unyson](../migrating-from-unyson.md) |

The useful way to read that table: Unyson+ is roughly **"ACF + a page builder + a shortcode library
+ an extension system, as one free framework, configured in PHP."**

## Versus ACF

**The closest comparison, and the one most developers are actually making.**

Both let you define fields in PHP and read them back with a helper. The differences that matter:

- **Where the config lives.** ACF's canonical workflow is to build field groups in the admin UI and
  optionally sync them to JSON. Unyson+ options are **PHP arrays in your theme's
  `framework-customizations/`** — there is no UI-authored source of truth to drift, and a field group
  is just a file you can diff and review. Which you prefer is a genuine matter of taste; ACF's UI is
  friendlier, Unyson+'s files are more reviewable.
- **Scope.** ACF gives you fields. It does not give you a page builder, a shortcode library, a theme
  builder, or an extension system — you assemble those from other plugins. Unyson+ ships them as one
  coherent stack where the page builder's elements are configured with the same option types as your
  theme settings.
- **Cost.** Repeaters, flexible content, options pages, and gallery fields are **ACF Pro**. The
  Unyson+ equivalents (`addable-box`, `addable-popup`, `multi-picker`, `multi-upload`, theme settings
  pages) are core and free.
- **Ecosystem.** ACF wins decisively here — vastly more tutorials, Stack Overflow answers, and
  third-party integrations. Unyson+'s learning material is what you're reading.

**Pick ACF if** you want fields and nothing else, you're on Gutenberg/FSE, or team familiarity
matters more than breadth. **Pick Unyson+ if** you're building a distributable theme and want the
options, builder, and elements to be one system.

## Versus Elementor and Bricks

**Different audience, overlapping surface.**

Elementor is built so a *client* can edit their own layouts in a browser. Unyson+'s page builder is
built so a *developer* can define a layout structure and ship it inside a theme. Both produce
drag-and-drop editing; the intent differs.

- **Output.** Unyson+ stores builder JSON and renders through PHP shortcode templates you can
  override in a child theme, emitting a single generated stylesheet. Elementor's rendering is largely
  its own, and portability out of it is the well-known pain point.
- **Extensibility.** Adding an Unyson+ shortcode is a folder with `config.php`, `options.php`, and
  `views/view.php` — the same pattern as everything else in the framework. Elementor widgets require
  its widget API.
- **Business model.** Elementor Pro is a per-site annual license. Unyson+ is free and self-hosted,
  updating from GitHub releases.
- **Polish and momentum.** Elementor has orders of magnitude more users, a bigger widget ecosystem,
  and more editor polish. That's a real advantage and worth weighing honestly.

**Pick Elementor if** the client edits layouts themselves with zero training, or you need a specific
third-party widget. **Pick Unyson+ if** you're distributing a theme, want to own the markup, or don't
want a license key in the deployment.

## Versus Redux Framework

**The narrowest overlap, and the one where Unyson+ is furthest ahead** — Redux is an options panel,
and Unyson+ ships **72 core option types** plus more from extensions, including whole builders
usable *as* option types.

That comparison has enough detail to deserve its own page:
**[Unyson+ vs Redux Framework →](./vs-redux.md)**

## Versus the original Unyson

Unyson+ is a modernized continuation, not a rewrite — the options API, `framework-customizations/`,
the extension model, and the hooks all carry over. See
**[Migrating from Unyson](../migrating-from-unyson.md)** for what's identical, what's new, and the
handful of things to watch.

## When *not* to use Unyson+

Stated plainly, because a comparison page that only argues one direction isn't worth reading:

- **You're building block themes / FSE.** Unyson+ is a classic-theme framework. If your project is
  committed to Gutenberg block templates, this is the wrong tool.
- **The client must self-serve on layout.** Elementor and Bricks invest far more in end-user editing
  polish than Unyson+ does.
- **You need a few custom fields on two post types.** That's ACF's sweet spot; a whole framework is
  overkill.
- **You need a large hiring pool or vendor support.** Unyson+ is a small, community-maintained
  project. That's fine for a team that reads code, and a real risk for one that needs commercial
  support contracts.

## When Unyson+ is the right call

- You're **distributing a theme** and want settings, meta boxes, a builder, and elements to be one
  consistent system rather than four plugin dependencies.
- You want **configuration in version control** as reviewable PHP, not as database rows or synced
  JSON.
- You want a **design-system layer** — presets, palette-bound color pickers, responsive and spacing
  types — instead of raw values you wire up yourself. See
  [Option types](/options/option-types).
- You want **no license server**: everything is free and updates from GitHub.

## Where to go next

- [Introduction](/intro) — what ships in the box
- [Concepts & glossary](/concepts) — the terminology Unyson+ uses
- [Option types](/options/option-types) — the full catalogue
- [Extensions overview](/extensions/overview) — what you can turn on
