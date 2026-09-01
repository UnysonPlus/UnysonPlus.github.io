---
title: Block Theme Roadmap
sidebar_label: Block Theme Roadmap
sidebar_position: 8
description: The phased plan for teaching the Site Converter + AI Dev Kit to generate standalone WordPress block themes — the tiers, what has shipped, and how each stays futureproof.
---

# Block theme roadmap

This page tracks a second **output target** for the converter: given a captured site,
produce a self-contained WordPress **block theme** — `theme.json`, block templates and
block-markup content — that runs with **no plugin dependency**.

It is the block-world companion to the [Conversion Architecture](./conversion-architecture.md)
reference (which covers today's page-builder + classic-theme output), and it complements
the plugin's own [block-editor roadmap](/blocks/roadmap) rather than replacing it.

It is a **living document** — update it as each tier lands, so it doubles as the progress log.

**Status key** — ✅ Shipped · 🚧 In progress · 📋 Planned · 🔍 Exploring

*Last updated: 1 September 2026*

---

## Why this is a separate roadmap

Two efforts get conflated. Keeping them apart is the first act of aiming the right way:

- **Participate** — make UnysonPlus *elements* available as native blocks, publish the design
  system to `theme.json`, add Block Bindings. That is the plugin **joining** the block ecosystem;
  it lives on the [block-editor roadmap](/blocks/roadmap).
- **Generate** — make the **Site Converter emit a standalone block theme** as a conversion output.
  That is a new capability of the *converter*, and it is what this page plans.

:::note[Generate, don't convert]
This **generates a new theme as an output**. It never converts or block-ifies the parent theme,
`unysonplus-theme`, which stays a classic PHP-template theme. "Generate a theme" is not "convert our
theme" — and *converting the parent theme to a block theme remains a deliberate non-goal*
([why](/blocks/roadmap)). Keeping that line bright is part of the design.
:::

## The one decision that shapes everything: block vocabulary

What blocks does the generated theme use?

| Vocabulary | What you get | Trade-off |
|---|---|---|
| **Core-blocks-first** *(chosen)* | A portable block theme that needs **no plugin** — the broader-audience funnel | Fidelity ceiling on native blocks; the exotic falls back to a scoped `core/html` |
| UnysonPlus blocks | Richer, pixel-faithful output reusing the [106 blocks](/blocks/architecture) | Output **depends on the plugin** — defeats "portable"; belongs as opt-in enrichment |

**Decision: core-blocks-first is the default; UnysonPlus blocks are an optional enrichment toggle.**
Model it as one emitter with a swappable *vocabulary*, never two pipelines.

## Futureproofing principles

If a design choice violates one of these, it is probably the wrong choice.

1. **Build to interchange formats, not to a theme.** `theme.json`, block markup, `block.json`,
   Block Bindings, the Interactivity API. Every output is one of these; anything bespoke is a liability.
2. **One capture, one intermediate, many emitters.** The capture service and recognizer tree are
   format-agnostic and stay untouched. Block output is a new emitter beside the page-builder emitter —
   never a fork.
3. **Core-first, enrichment optional.** Portability is the product; UnysonPlus blocks are the upsell.
4. **Additive and reversible.** Nothing removes the page-builder path or the classic theme. A user
   picks a target per conversion.
5. **PHP↔JS parity, enforced by golden fixtures** — the block emitter gets its own, exactly like the
   page-builder path, so the two can't drift.
6. **Faithful degradation over fake nativeness.** When a region can't be expressed in real blocks,
   emit a scoped `core/html` block (the block-world twin of today's `code_block`) rather than a lossy
   approximation.
7. **Never touch the parent theme.** Generated themes are outputs; `unysonplus-theme` stays classic.

## Architecture: where the new code lives

Reuse the whole front half of the [pipeline](./conversion-architecture.md); add a parallel emission half.

| Stage | Page-builder target (today) | Block-theme target (new) |
|---|---|---|
| Capture + recognize | `capture.mjs` → `design-capture.json` → recognizer tree | **Unchanged — shared** |
| Body content | `to-pages` → page-builder JSON | `to-blocks` → block markup (`serialize_block`) + PHP twin |
| Design system | `to-design-config` → classic child theme | `to-theme-json` → static `theme.json` (settings + styles) |
| Chrome | `to-theme-settings` → Theme Settings header/footer | `parts/header.html` + `parts/footer.html` (`core/navigation`, `core/site-logo`) |
| Theme scaffold | classic theme generator (`style.css` + PHP) | block-theme generator → `style.css` + `templates/*.html` + `parts/*.html` |

A **target selector** (page-builder \| block-theme, and for block-theme a core \| enriched vocabulary)
is threaded from a Site Converter setting through capture → emit. It is the only thing that chooses
which emitter runs.

## The tiers

Phased so each tier is shippable and testable on its own. Statuses reflect build order, not a calendar.

### Tier C1 — Block content MVP (core vocabulary) 🚧

The intermediate tree → **core block markup**: `section`→`core/group`, `columns`→`core/columns`,
heading/text/button→`core/heading`\|`paragraph`\|`buttons`, image→`core/image`, video→`core/video`\|`embed`,
verbatim→scoped `core/html`. Output **body only**, into a minimal generated block theme so it renders.
Reuse the media/font localizers as-is.

**Built now: the emitter + a block-theme scaffold — proven end to end.**

- `to-blocks.mjs` consumes the same intermediate as `to-pages` (`capture.sections[]` / `sec.blocks[]`),
  core-first, with a `core/html` fallback so nothing is dropped. Validated against WordPress
  `parse_blocks()` on a synthetic tree *and* a real live capture: zero unparsed/freeform blocks, every
  block a registered core type, stable parse → serialize → parse round-trip.
- `to-block-theme.mjs` generates a minimal, **valid FSE block theme** — `style.css`, `theme.json`
  (design system, see C2), `templates/` and `parts/`.
- **End-to-end proof:** a real captured site (Jukebox) was emitted to block markup, wrapped in the
  generated theme, installed and activated on a WordPress install (`wp_is_block_theme()` → true), and
  rendered as the front page — header (site title + navigation), the hero, headings in the captured
  font, and text coloured by the captured brand palette — with **no plugin dependency**. (The install
  was snapshotted and fully restored afterward.)

**Golden fixtures** (`to-blocks.test.mjs`) now lock the emitter — a framework-free block tokenizer
asserts block counts, nesting/balance, content, attribute escaping and edge-case skipping (empty
blocks, out-of-range heading levels, source-less images) across five synthetic captures. All pass.

*Remaining in this tier:* the PHP twin, so the plugin's own `run_url_conversion` path emits blocks
too (parity with the JS emitter).

### Tier C2 — `theme.json` global styles 🚧

Design tokens → a static `theme.json`: palette → `settings.color.palette`, fonts →
`typography.fontFamilies`, plus layout content/wide widths. The theme's runtime Theme-Settings →
`theme.json` bridge (already shipped, see the [block roadmap Phase 1](/blocks/roadmap)) is the
reference implementation.

**Built now (with C1's scaffold):** `to-block-theme.mjs` emits a static `theme.json` from the captured
design config — semantic colours (primary / background / foreground) plus the source's brand tokens
(`--brand-red`, `--dark`, …, resolved to real colours), heading + body font families, and the content
width. Core blocks in the generated theme inherit it for free (verified: the rendered proof used the
captured palette and fonts). *Remaining:* a spacing scale (`spacing.spacingSizes`) and fluid font sizes.

### Tier C3 — Chrome as template parts 📋 *(the gating milestone)*

Header/footer → `parts/header.html` + `parts/footer.html` built from core blocks: `core/navigation`
(from the captured menu), `core/site-logo`, `core/social-icons`, buttons. This is the genuinely new,
harder piece — the block world's answer to the Theme-Settings header builder — and it **gates "real
block theme" vs. "block content in an empty shell."**

### Tier C4 — Templates 📋

`templates/index.html`, `page.html`, `single.html`, `404.html`, `archive.html`, wiring the parts + a
post-content / query loop. Small once C3 exists. The result is a valid, Site-Editor-editable FSE theme.

### Tier C5 — Block patterns 📋

Register each converted section as a **block pattern** so a user can re-insert "the pricing section,"
"the hero," etc. Turns a one-shot conversion into a reusable kit.

### Tier C6 — UnysonPlus-block enrichment 📋 *(optional toggle)*

Where core blocks can't express a region faithfully, emit the matching **UnysonPlus block** instead of
`core/html` — richer output, at the cost of a plugin dependency. The upsell path, and the bridge back
to the framework.

### Tier C7 — Block Bindings tie-in 🔍

A converted CPT + custom fields → blocks bound to those fields via the plugin's Block Bindings source
([block roadmap Phase 3](/blocks/roadmap)). Where the converter meets the framework: the output isn't
just static markup, it's a working data-driven template. Depends on the plugin shipping its bindings source.

## Organizing the AI Dev Kit for blocks

The kit is canonical for building knowledge. It needs a **blocks lane** beside the page-builder lane —
same discipline (docs-first, PHP↔JS parity, golden fixtures), new surface.

- **`docs/blocks/`** — building/extending blocks. The [Block Architecture](/blocks/architecture) page
  is the seed: block anatomy, adding a block, the `fw.controls` control layer, inspector coverage.
- **A block twin of the site-build protocol** — the ordered tiers above, the capture-first gate,
  region-by-region verify and score-keeping, but targeting block output.
- **`theme.json` + block-pattern authoring guides** — the two new interchange formats the converter emits.
- **The [Conversion Architecture](./conversion-architecture.md) reference gains a block-emitter section**
  — the "keep PHP↔JS in sync / improve-the-converter" rules extend to `to-blocks` + `to-theme-json`.
- **Golden fixtures for the block emitter**, mirroring the page-builder path's fixtures, so block output
  can't regress.
- **A capture-out `target` flag** so one capture can be replayed into either output for side-by-side
  fidelity comparison.

## Where to start — the first three moves

1. **Lock the vocabulary decision (core-first)** — one line in the kit + a target-flag stub. Everything
   downstream assumes it.
2. **Build Tier C1 end-to-end on one captured site** — `to-blocks` + a bare block theme + golden
   fixtures. Reuses the recognizers, so it's low-risk and proves the thesis fast.
3. **In parallel, ship the plugin's Block Bindings source** ([Phase 3](/blocks/roadmap)) — independent
   of the converter, cheap (the `show_in_rest` bridge exists), and the ACF-alternative that anchors the
   "stay for the framework" story.

Only after C1 proves out do C2 (`theme.json`) and C3 (chrome-as-parts) — with **C3 the milestone that
earns the phrase "generates a block theme."**

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| WP core churn (`theme.json` schema, Bindings, FSE) | Emit to versioned schemas; pin the `theme.json` version; keep the emitter thin and data-driven |
| Fidelity ceiling on core blocks | The enrichment toggle (C6); be explicit that faithful `core/html` beats fake nativeness |
| Two emitters to maintain | Shared intermediate + golden fixtures on both; one serializer shared with the plugin's PB→block export |
| Positioning whiplash | A separate "front door" for the portable-blocks story; the converter is the neutral hook |
| Scope creep into "block-ify everything" | This roadmap is the boundary — converter output + the pulled-forward plugin phases only |

## "Futureproof" — the acceptance checklist

A design is aimed the right way if it answers **yes** to all of these:

- Does it emit a **standard interchange format** (`theme.json` / block markup / `block.json` / Bindings /
  Interactivity), not a bespoke shape?
- Does it **reuse the shared capture + intermediate**, adding only an emitter?
- Is core-blocks output **plugin-independent**, with UnysonPlus strictly opt-in?
- Is it **additive** — do the page-builder path and the classic theme still work untouched?
- Is it covered by **golden fixtures** on both PHP and JS?
- Does it leave `unysonplus-theme` a **classic theme** (generate, never convert)?
