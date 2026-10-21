---
sidebar_position: 5.5
title: Extending the engine
slug: /3d-motion-roadmap/extending-the-engine
description: How the Animation Engine is extended today — per-element effects and Motion Gallery designs register from a child theme, an AI agent discovers the natives first, and a gap → fallback → report loop grows the engine from real demand.
---

# Extending the engine

:::tip[Shipped capability]
This page documents how the engine is extended **today** — not a plan. The two enablers it needed
(gallery design registration and the child-theme effect recipe) have shipped.
:::

The engine isn't a closed list of effects. New motion can be added **from a child theme**, without
editing the plugin, through the same hooks the built-in modules use. That extensibility is what makes
the **gap → fallback → report → promote** loop below possible: when AI-assisted creation hits a motion
the engine doesn't cover yet, the agent can add it cleanly instead of writing throwaway code.

## What's pluggable

### Per-element effects

A child theme can register a new per-element effect (an Animations-tab option on any element) with the
same three hooks the built-in modules use:

| Hook | Role |
| --- | --- |
| `sc_animation_fields` | Adds the effect's option to the Animations tab. |
| `sc_build_wrapper_attr` | Emits the effect's config as `data-` attributes on the element wrapper. |
| `sc_needs_wrapper` | Declares that the element needs the wrapper. |

Plus a small runtime that reads those attributes. A child-theme effect registered this way is a
**first-class effect**, not a bolt-on.

### Motion Gallery designs

[Motion Gallery](/animation-engine/motion-gallery) designs used to be a hardcoded list. A child theme
can now register its own 3D/flow/stack design through four touch points:

| Touch point | Role |
| --- | --- |
| `upw_gallery_3d_design_groups` | Adds the design to the picker (with its own settings group). |
| `upw_gallery_3d_render_designs` | Allows the design to render (else it falls back to the default). |
| `upw_gallery_3d_design_assets` | Enqueues the design's driver JS/CSS — only when a gallery uses it. |
| `window.upwGallery3d.registerDesign(key, build)` | The JS driver. |

The driver is handed the same `ctx` primitives the built-ins use — the stage, the cards, a scroll
`progress()`, `attachDrag`, a generation-stamped `loop()` (freezes in the editor, dies on a preview
rebuild) and a pre-resolved `reduce` flag — so a child-theme design behaves exactly like a native one.

### Discoverable by the AI

So an AI agent reproducing a source's motion can **try a native effect first** (the cheapest, most
native result), the engine exposes read-only catalogue abilities to the AI Assistant:

- **`animation-effects`** — every per-element effect field an element offers, with its choices and
  per-effect settings.
- **`animation-gallery-designs`** — every Motion Gallery design, including child-theme-registered ones
  (flagged `custom`), so the agent sees the whole catalogue before writing anything.

## The gap → fallback → report → promote loop

The phases on the [roadmap](./roadmap) are the *planned* build; this is how the engine grows from
**real use**. As AI-assisted creation and replication becomes the focus, an agent reproducing a
source's motion will routinely hit an animation the engine doesn't cover yet. Rather than let it write
throwaway bespoke code, the engine reuses the Site Converter's findings loop, pointed at motion
(decision: [gap-report-loop](/decisions/animation-engine-gap-report-loop)):

1. **Try a native effect first.** The agent consults the catalogue abilities above and uses a built-in
   effect or gallery design wherever one fits.
2. **Else write a scoped, labelled child-theme fallback.** Using the hooks above, so the site works
   today. The fallback carries a stable label / `data-` key tied to its **report id**, honours
   reduce-motion, and loads on demand — so it **migrates off cleanly** when the effect later ships
   natively.
3. **Always report the gap.** A **fixture-backed** finding (the captured source motion + the fallback
   produced, keyed to a neutral fixture id — never the source site's name) goes to the shared ledger.
   Never silently absorb a gap.
4. **Promote by demand, gated on quality.** The ledger's **frequency** decides which gaps become native
   first; a pattern earns a native preset only when it can be **reusable, reduce-motion-aware and
   performant** — site-specific one-offs stay child-theme fallbacks.

**Why it matters:** every gap becomes data, the engine grows in priority order toward the long tail, and
the token economics compound — a scoped fallback is cheap once, a promoted native effect is near-zero
tokens for every future agent.

:::info[The recipe]
The step-by-step pattern — the label / `data-` key → report-id convention, the reduce-motion branch,
and the report — lives in the AI Dev Kit's child-theme fallback recipe, covering both per-element
effects and gallery designs.
:::
