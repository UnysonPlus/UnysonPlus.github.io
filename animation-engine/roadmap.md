---
sidebar_position: 1.5
title: Roadmap
slug: /roadmap
description: What is planned next for the Animation Engine and the Live Editor around it, starting with the design tools Framer has that Unyson+ does not yet. Shipped work lives in the docs, not here.
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
Editor's Animate workspace. Each has its own page in these docs. The rules every effect follows are on
[Performance](/animation-engine/performance#guardrails).
:::

## Phase 7: Framer's design tools {#phase-7}

*Added 20 November 2026.* After Phase 6, Unyson+ matches or beats Framer and Webflow on motion. A pass over
[Framer's design features](https://www.framer.com/design/) shows where it is still ahead: the **design** side, meaning
how a page is drawn, typed and shared. Most of these items land in the [Live Editor](/extensions/live-editor) and
Theme Settings rather than in the Animation Engine. They are here so the plan sits in one place.
([The comparison](./3d-motion-roadmap/framer-webflow-analysis.md#framer-design-tools).)

- **7a · Components with variants and properties.** Save a group of elements as a component, give it variants
  (Default, Hover, Pressed, Dark, Small...) and properties (a text, an image, a link, a colour, a show/hide switch) that
  each copy fills in. Changing the component updates every copy. Its variants double as States, so an Interaction can
  switch a component between them.
- **7b · Typography controls.** Variable-font axes (any weight between 100 and 900, width, slant, optical size),
  OpenType features (tabular numbers, ligatures, small caps, stylistic sets), text decoration per element (underline
  style, colour, thickness and offset), and truncation for any text (one line with an ellipsis, or clamp to N lines).
- **7c · Smooth corners.** A "smoothing" control next to the corner radius on any box, button, image or section, for
  the continuous squircle curve instead of a plain circular arc.
- **7d · Wide-gamut colour.** Pick colours in Display P3 (the brighter colours modern screens can show) in the colour
  picker and the Theme Settings palette, with an automatic sRGB fallback for older screens.
- **7e · AI for layout.** *Make responsive:* the AI Assistant proposes the tablet and phone layout of a section from
  its desktop one. *Variations:* it suggests a few alternative designs of the selected section for you to pick from.
  Both preview on the canvas before anything is kept, and undo reverts them.
- **7f · Export as an image.** Right-click a section or element in the Live Editor and save it as PNG (1x, 2x, 3x) or
  SVG, for a social post, a slide or a mock-up.
- **7g · Vector drawing.** Draw and edit shapes and paths on the canvas (pen tool, points and handles, boolean union,
  subtract and intersect) and keep them as clean inline SVG. Comes with searchable icon sets to drop in and recolour.
- **7h · Freeform sections.** A section where elements sit where you put them, as on a design canvas (free position,
  layers, snapping and guides), with the same layout turned into a responsive stack on smaller screens.
- **7i · Working together.** Comments pinned to an element of the page, presence (who else is editing, and where),
  and a staging copy of a page to change and review before it goes live.
- **To look into · "flow" effects.** Framer lists a flow effect among its newer tools. What it does and whether the
  Animation Engine already covers it (Interactions, Layout Animation, Page Timelines) is to be checked before it is
  planned.

### Build order

1. **7c** smooth corners, **7b** typography and **7d** wide-gamut colour: small, and every site gains from them.
2. **7f** export as an image.
3. **7a** components with variants and properties: the largest, and the one the others build on.
4. **7g** vector drawing and icon sets, then **7e** AI for layout.
5. **7h** freeform sections, then **7i** working together.

### Not planned

- **A desktop app.** The Live Editor runs in the browser, inside the WordPress site people already own.
- **Hosting.** Unyson+ sites run on whatever WordPress hosting the owner chooses.

## Open ideas

- **Product Orbit with a real 3D model.** The [WebGL Object](/animation-engine/webgl-object) Product Orbit scene orbits a
  ring of images today. A variant could orbit a real glTF / GLB model through [Model Viewer](/animation-engine/model-viewer)
  instead.

## How a plan gets here

New work arrives from three places: a comparison like the one above, real use (an AI agent that meets a motion the
engine does not cover reports it, see [Extending the engine](./3d-motion-roadmap/extending-the-engine.md)), and
requests. The *why* behind each settled choice goes into the [Design Decisions](/decisions) log.
