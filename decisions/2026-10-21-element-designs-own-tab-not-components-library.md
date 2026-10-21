---
slug: element-designs-own-tab-not-components-library
title: "Why Element Designs got its own Theme Settings tab instead of staying under Components"
authors: [jon]
tags: [architecture, admin-ui]
date: 2026-10-21
description: "Theme Settings → Components had grown to a dozen-plus sub-tabs that wrapped onto a second row, and Element Designs was the odd one out — it is a manager for installable per-element design packs, not an addable-box preset library like the rest. The decision: pull Element Designs out of Components and give it its own top-level tab (right after Icons), the sibling it actually resembles — a pack manager, not a preset library."
---

**The question:** The **Components** tab in Theme Settings had grown to 13 sub-tabs — enough to wrap onto a second row. Element Designs was in that strip too. Should it just move somewhere to declutter, and if so, where?

<!-- truncate -->

## Context

Every other Components sub-tab is a **preset library**: an [`addable-box`](/options/option-types/addable-box) group (Color Presets, Text Styles, Buttons, Box Presets, …) where you add/remove rows and the whole set compiles into **one shared** `presets-{hash}.css`. Change a preset, every element using it updates.

**Element Designs is not that.** It is a **management dashboard** (a single `html-full` mount, `sc_eldesigns_manager`) for installable **design packs** — self-contained folders an element loads for one of its **Design** choices. Each pack ships its own `manifest.json`, `view.php`, scoped `static/css/styles.css` and picker tile; its output is its **own scoped CSS/markup**, never a class in the shared preset stylesheet. So it was the one entry in "Components (Preset Libraries)" that is not a preset library.

There was already a perfect sibling in the same settings panel: **Icons** is its own top-level tab and is *also* a pack manager (it manages which icon libraries the picker offers, install/browse/upload). Element Designs is the exact analog for design packs.

## Options considered

- **Leave it under Components.** *Pro:* zero work. *Con:* keeps the two-row tab strip, and keeps a manager masquerading as a preset library — the conceptual mismatch the docs already called out ("unlike the other Components tabs").
- **Give it its own top-level tab, after Icons (chosen).** *Pro:* declutters Components back to pure preset libraries; puts the design-pack manager beside the icon-pack manager, the thing it actually resembles; matches the product's own mental model. *Con:* one more top-level nav item.
- **Group both managers under a shared "Packs" parent tab** (Icon Packs + Design Packs). *Pro:* conceptually tidiest. *Con:* bigger churn — it also moves Icons — for a nav that today has only two such managers. Left as a future option if more pack managers appear.

## Decision

**Element Designs becomes its own top-level Theme Settings tab, placed right after Icons** (`General · Header · Components · Icons · Element Designs · …`). In the shortcodes extension's theme-settings `loader.php`, it is pulled out of the Components libraries list and registered as its own section — the same way the Icons tab is registered. The manager UI, its storage, and the per-element **Design** picker are all unchanged; only its home in the settings nav moved. The old docs URL `/components/element-designs` 301-redirects to `/element-designs`.

## Why

A settings tab should sit with its own kind. The Components tab is the site's *preset-library* layer, and every tab there answers "define a reusable style and pick it from a dropdown." Element Designs answers a different question — "install and manage the design packs an element can wear" — which is a *manager*, exactly like Icons. Keeping it under Components both overloaded that tab and taught the wrong model (that a design pack is a preset, when it is the opposite: self-scoped CSS, not a shared class). Moving it beside Icons fixes the clutter and makes the information architecture match what each tab actually is.
