---
sidebar_position: 1.5
title: Roadmap
slug: /roadmap
description: "What is planned next for the Animation Engine and the Live Editor around it: the design tools Framer and Webflow have that Unyson+ does not yet, and motion capture in the Site Converter. Shipped work lives in the docs, not here."
---

# Roadmap

This page lists **only what is still ahead**. When something ships, it leaves this page and its full documentation
takes its place, so everything here is open work. Priorities and order may change as the work teaches us more.

:::tip[Looking for something that already shipped?]
Phases 0 to 6 of the earlier plan have all shipped: smooth scroll and one scroll engine, Scroll Keyframes and the
[Scroll Timeline](/animation-engine/scroll-timeline), the WebGL scenes and [Motion Gallery](/animation-engine/motion-gallery)
designs, [Rive](/animation-engine/rive), [Interactions](/animation-engine/interactions) and
[States](/animation-engine/states), [Layout Animation](/animation-engine/layout-animation), shared-element
[Page Transitions](/animation-engine/page-transitions), and [Page Timelines](/animation-engine/page-timelines) in the Live
Editor's Animate workspace. Phase 9 replaced GSAP with the engine's own [scroll core](/animation-engine/scroll-core), and Phase 11 put every
module on one [motion core](/animation-engine/motion-core).
Each has its own page in these docs. The rules every effect follows are on
[Performance](/animation-engine/performance#guardrails).
:::

## Phase 7: Framer's design tools {#phase-7}

*Added 20 November 2026.* After Phase 6, Unyson+ matches or beats Framer and Webflow on motion. A pass over
[Framer's design features](https://www.framer.com/design/) shows where it is still ahead: the **design** side, meaning
how a page is drawn, typed and shared. Most of these items land in the [Live Editor](/extensions/live-editor) and
Theme Settings rather than in the Animation Engine. They are here so the plan sits in one place.
([The comparison](./3d-motion-roadmap/framer-webflow-analysis.md#framer-design-tools).) Shipped so far:
**7c · smooth corners** ([Smooth Corners](/theme/components/smooth-corners)), **7b · typography controls**
([Text Styles](/theme/components/text-styles#typography-controls)), **7d · wide-gamut colour**
([Color Presets](/theme/components/color-presets#wide-gamut)), **7f · export as an image**
([Save as image](/extensions/live-editor#save-as-image)), **7a · components with variants and properties**
([Components](/extensions/snippets#components)), **7g · vector drawing** ([Vector Shape](/shortcodes/media-elements/vector-shape);
the searchable icon sets were already in the [Icon](/shortcodes/media-elements/icon) picker), **7e · AI for layout**
([AI layout](/extensions/live-editor#ai-layout)), **7h · freeform sections**
([Freeform (Div)](/shortcodes/layout-elements/flexbox/freeform)) and **7i · working together**
([Working together](/extensions/live-editor#working-together)): **Phase 7 is complete** (26 November 2026).

- **To look into · "flow" effects.** Framer lists a flow effect among its newer tools. What it does and whether the
  Animation Engine already covers it (Interactions, Layout Animation, Page Timelines) is to be checked before it is
  planned.

### Build order

All done. The "flow" effects item above is the only open point of this phase.

### Not planned

- **A desktop app.** The Live Editor runs in the browser, inside the WordPress site people already own.
- **Hosting.** Unyson+ sites run on whatever WordPress hosting the owner chooses.

## Phase 8: Webflow's design tools {#phase-8}

*Added 20 November 2026.* The same pass over Webflow's Designer. Its interactions are nearly all matched already;
what it still does better is the **Style panel** (classes, one full Effects group, variable modes, more breakpoints)
and a few triggers and platform pieces. Items Phase 7 already covers (components, sharing and staging) are not
repeated. ([The comparison](./3d-motion-roadmap/framer-webflow-analysis.md#webflow-design-tools).)

- **8a · One Effects group on every element** — **shipped (Shortcodes 1.16.25).** Every element now has the same
  **Effects** tab: opacity, blend mode, outline, stacked box shadows, 2D and 3D transforms (move, rotate, scale, skew,
  tilt + perspective), filters, all backdrop filters, a transition for hover/state changes, cursor, pointer events and
  custom properties (CSS variables), emitted as scoped inline CSS. Additive and non-destructive — the per-element
  effects a few elements already had keep working, and where a preset owns the look the preset still wins. See
  [Common controls → Effects](/shortcodes/common-controls#effects).
- **8b · Component triggers** and **8c · "Page starts loading" trigger** — **shipped in Animation Engine 1.5.37.**
  Interactions now fire on another component's own events (a **tab** changes, a **slider** changes slide, a dropdown,
  **mega menu** or the **mobile menu** opens or closes), and a **"Page starts loading"** trigger plays the instant the
  page begins to load — before images and fonts — beside today's "On page load". See
  [Interactions → Triggers](/animation-engine/interactions#triggers).
- **8d · Variable modes.** Give the Theme Settings colours (and sizes) more than one set of values (Light, Dark, a
  second brand) and switch a section, a page or the whole site between them; a visitor's dark-mode preference can
  pick the mode.
  **Shipped 27 November 2026** (Shortcodes 1.16.30, theme 2.6.70): [Colour Modes](/theme/components/colour-modes) in
  Theme Settings (palette, surfaces and other variables per mode), switched per site, page or Section / Div / Container,
  and a Dark mode that the visitor's toggle or device setting picks. Preset CSS now follows a mode.
- **8e · More breakpoints.** Larger-than-desktop sizes and **phone landscape** in the Live Editor's device toggle,
  in every responsive option and in **Runs on**. *Plan (27 November 2026):* seven tiers, one shared map in PHP and JS
  (it replaces about ten hard-coded copies): Phone (base), **Phone landscape ≥576** (`sm`), Tablet ≥768 (`md`),
  Desktop ≥992 (`lg`), Large ≥1200 (`xl`, exists today), **Wide ≥1400** (`xxl`) and **Full HD ≥1920** (`xxxl`). The
  widths reuse the grid CSS's existing `sm` / `xxl` tiers so every saved class stays valid. Values stay mobile-first,
  as today: an empty size takes the value of the next smaller one (a desktop value keeps applying on wider screens).
  Stages: (1) the shared map, and the places that ignore the existing `xl` tier today (spacing classes, container
  width, the Live Editor's own width rules); (2) the new tiers in the responsive option and the CSS that reads it;
  (3) the Live Editor device toggle (fixed 667 / 1280 / 1440 / 1920 frames, option tabs following the device) and
  Hide on; (4) Runs on and Interactions (adding Wide).
  **Stage 1 shipped 27 November 2026** (Shortcodes 1.16.28, theme 2.6.68): the shared map
  ([breakpoint map](/options/option-types/responsive#breakpoint-map)), Large desktop kept by the spacing classes, the
  Container's alignment / reverse / gap and the AI checker, and a Large desktop tab in Theme Settings → Container Width.
  **Stage 2 shipped 27 November 2026** (Shortcodes 1.16.29, theme 2.6.69): Phone landscape, Wide and Full HD tabs in
  every per-device option, behind Theme Settings → [More Screen Sizes](/options/option-types/responsive#more-screen-sizes)
  (off by default; values kept when turned off), with their CSS generated only on sites that turn it on.
  **Stage 3 shipped 27 November 2026** (Live Editor 0.3.36): a Screen sizes menu with a frame per size (Full HD 1920,
  Wide 1440, Large 1280, Desktop 1024, Tablet 768, Phone landscape 667, Phone 375) beside Fit / Tablet / Phone, option
  tabs that follow the canvas both ways, and Hide on mapped onto its three existing ranges
  ([Screen sizes](/extensions/live-editor#screen-sizes)).
  **Stage 4 shipped 27 November 2026** (Animation Engine 1.5.43, Live Editor 0.3.37): **Runs on** for Interactions and
  Page Timelines gains **Wide** (1400px+) with More Screen Sizes on, Desktop then meaning 992–1399px; older settings
  keep running on wide screens. **8e is complete.**
- **8f · A class system.** Style through named classes in the Live Editor: give an element a class, and styling the
  class restyles every element that has it. Combo classes (a class that only adds to another), a "where it comes
  from" view (which classes and presets a value is inherited from) and a count of where else the class is used. It
  sits on top of the presets rather than beside them, so a button preset is a class with a name.
  **Shipped 27 November 2026** (Shortcodes 1.16.31, Live Editor 0.3.38): [Classes](/theme/components/classes) in Theme
  Settings and on every element's Advanced tab, combo classes, and the Live Editor's Classes panel (live class editing,
  usage counts, the presets an element wears, and where each part of its look comes from).
- **8g · Page A/B tests.** Two versions of a page (or of a section) shown to a share of visitors each, with the goal
  (a click, a form sent, a sale) measured in Visitor Insights and the winner kept with one click.
- **8h · A built-in language switcher.** Locales per site, each page's translation linked to its original
  (translated text, slugs and SEO), a language switcher element, and translated custom post types; built on the
  AI page translation that exists today.
- **8i · A "Get started" checklist.** A short checklist in the Live Editor for a new site (logo, colours, fonts, menu,
  first page, SEO, publish) that ticks itself off as each is done.

### Build order

1. **8a** Effects group (Shortcodes 1.16.25), **8b** component triggers and **8c** the start-of-load trigger
   (Animation Engine 1.5.37) — all shipped.
2. **8e** more breakpoints, then **8d** variable modes.
3. **8f** the class system, after **7a** components (they overlap: both reuse a look across elements).
4. **8g** page A/B tests and **8h** the language switcher.
5. **8i** the checklist, at any point.

## Phase 10: Motion capture in the Site Converter {#phase-10}

*Added 25 November 2026.* The Site Converter copies a page's layout and styles, but not its motion. This phase brings
a source page's animations across as **native, editable motion** (Page Timelines and Interactions you can open in the
Animate workspace), not as code, and proves the match frame by frame. It builds on the engine's own
[scroll core](/animation-engine/scroll-core) (Phase 9, shipped), so scroll-driven motion has a native home.

**Shipped 27 November 2026** (capture service 1.13.24, Site Converter 1.12.13): see
[Recorded motion](/extensions/site-converter/how-it-works#recorded-motion). Entrances (on load and in view) come across
as native Interactions with the source's exact timing and curve, checked frame by frame; scroll-linked motion and loops
keep their existing routes, and what does not match is filed as a motion gap.

- **10a · Record the source's motion.** During capture, read the page's own animation data where it exists (CSS and
  browser animations give exact durations, delays and easings) and track each moving element frame by frame where it
  does not (position, size, opacity, transform), on a virtual clock so every capture is identical.
- **10b · Turn it into native motion.** Each recorded movement becomes a track in a Page Timeline (load, in view,
  hover, click or scroll trigger) or an Interaction step, with its timing, stagger and the closest named curve or
  spring; what cannot be matched natively is listed, not hand-coded.
- **10c · Check it frame by frame.** Record the converted page the same way and compare the two: timing error per
  element, easing match and mismatch per frame, with side-by-side sheets in the conversion report.
- **10d · Fix and learn.** Gaps go through the converter's usual findings loop, so a motion the engine cannot express yet
  becomes a request for the engine, not a one-off script.

## Order of work

Decided 25 November 2026: **Phase 9 first, then Phase 7, then Phase 8, then Phase 10.** Phase 9 (the scroll core, in
place of GSAP) shipped in Animation Engine 1.5.34: see [the scroll core](/animation-engine/scroll-core). Phase 11 (one
motion core for every module) shipped in Animation Engine 1.5.35 and 1.5.36: see [the motion core](/animation-engine/motion-core).

## Open ideas

- **Product Orbit with a real 3D model.** The [WebGL Object](/animation-engine/webgl-object) Product Orbit scene orbits a
  ring of images today. A variant could orbit a real glTF / GLB model through [Model Viewer](/animation-engine/model-viewer)
  instead.

## How a plan gets here

New work arrives from three places: a comparison like the one above, real use (an AI agent that meets a motion the
engine does not cover reports it, see [Extending the engine](./3d-motion-roadmap/extending-the-engine.md)), and
requests. The *why* behind each settled choice goes into the [Design Decisions](/decisions) log.
