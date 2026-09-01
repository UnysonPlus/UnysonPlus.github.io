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

### Tier C1 — Block content MVP (core vocabulary) ✅ *(built)*

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

**Golden fixtures** (`to-blocks.test.mjs`) lock the emitter — a framework-free block tokenizer asserts
block counts, nesting/balance, content, attribute escaping and edge-case skipping (empty blocks,
out-of-range heading levels, source-less images) across five synthetic captures. All pass.

**PHP twin** (`FW_Site_Converter_Blocks::to_blocks()`) is a faithful port that emits **byte-identical**
markup to the JS `toBlocks()` for the same input — verified against it directly, and its output parses
in WordPress with zero freeform blocks. That gives the plugin's own `run_url_conversion` path the same
emitter as the capture service, the way `Mapper`/`Stitch` mirror `to-pages`/`capture-extract`.

The tier's build deliverables — emitter (JS + PHP), block-theme scaffold, `theme.json`, and golden
fixtures — are all done, and proven end to end.

**The output target is now selectable end to end.** `to-block-bundle.mjs` ties the emitters into one
installable bundle — `{ theme:{ slug, files }, page:{ title, content } }` — and:

- **Capture side:** `capture.mjs --target=block-theme` (or `TARGET=block-theme`) additionally writes
  `block-bundle.json` into the capture output. Additive — the default `page-builder` target is untouched.
- **Plugin side:** `FW_Site_Converter_Bundle::import_dir()` auto-detects a `block-bundle.json` and installs
  it via `FW_Site_Converter_Blocks::install_block_theme()` — which writes the theme files (path-safe),
  creates the page from its block markup, activates the theme and sets it as the front page. A
  slug-collision guard installs to a `-blocks` slug rather than overwriting a same-named classic theme.

Proven end to end on a live Jukebox capture: `capture --target=block-theme` → `import_dir` → an FSE site
(`wp_is_block_theme()` → true) with the captured nav, social icons and hero — then fully restored.

**The admin GUI toggle is built.** ✅ The WP-admin Site Converter now has an **Output** control —
*Page Builder* (default, unchanged) vs. *Block Theme (standalone FSE, no plugin)*, with a *Core blocks
/ UnysonPlus blocks* vocabulary sub-choice (the C6 toggle). Choosing **Block Theme** for a URL routes
the conversion through `run_block_theme_conversion()` — which runs `capture.mjs <url> --target=block-theme
--vocab=<v>` locally, then installs the result via `import_dir` → `install_block_theme` and lands on a
success page with *View site* / *Open the Site Editor*. The option is threaded through both the admin
`convert_prepare` flow and the dashboard REST `/convert` endpoint (`target` + `vocabulary` params), and
it grays out when the **Classic Editor** is enforced (a block theme needs the block editor). The default
page-builder path is byte-for-byte unchanged (additive only).

**Media is localized on install.** ✅ The emitters deliberately hotlink the source's image URLs
(portable, plugin-free output with no WP dependency at emit time). At install, `install_block_theme()`
now sideloads every referenced image — from the page body **and** the theme files (logo/hero in parts
and patterns) — into the media library and rewrites both to the local attachment URLs, so the
installed theme carries no external image dependencies. Verified end to end (page body + on-disk part
both rewritten, source-URL dedup, clean restore).

### Tier C2 — `theme.json` global styles ✅ *(built)*

Design tokens → a static `theme.json`: palette → `settings.color.palette`, fonts →
`typography.fontFamilies`, plus layout content/wide widths. The theme's runtime Theme-Settings →
`theme.json` bridge (already shipped, see the [block roadmap Phase 1](/blocks/roadmap)) is the
reference implementation.

**Built now (with C1's scaffold):** `to-block-theme.mjs` emits a static `theme.json` from the captured
design config — semantic colours (primary / background / foreground) plus the source's brand tokens
(`--brand-red`, `--dark`, …, resolved to real colours), heading + body font families, and the content
width. Core blocks in the generated theme inherit it for free (verified: the rendered proof used the
captured palette and fonts). A **spacing scale** (`spacing.spacingSizes`) and **fluid font sizes** (`typography.fontSizes`) are emitted too — the whole `theme.json` validated through WordPress's `WP_Theme_JSON`.

### Tier C3 — Chrome as template parts ✅ *(built — the gating milestone, now met)*

Header/footer → `parts/header.html` + `parts/footer.html` built from core blocks: `core/navigation`
(from the captured menu), `core/site-logo`, `core/social-links`, buttons. This is the genuinely new,
harder piece — the block world's answer to the Theme-Settings header builder — and it **gates "real
block theme" vs. "block content in an empty shell."**

**Built now:** `to-block-theme.mjs` builds both parts from the captured chrome — the **header** carries
the brand (see below), the real nav as inline `core/navigation-link`s (deduped), and the CTA as a
`core/button`; the **footer** carries the captured link columns, `core/social-links` (each service
mapped to its WP slug), and a cleaned copyright line. Proven end to end: a generated Jukebox theme
rendered with its actual menu (Menu / Locations / About / Franchise), "Book a Table" CTA, and social
icons — as **editable template parts** in the Site Editor.

**Source logo → `core/site-logo`.** ✅ When the capture has an **image** logo the header emits
`core/site-logo`; otherwise `core/site-title` stands in (text logos). The bundle carries the logo URL
and site title on a `site` field; at install, `install_block_theme()` sideloads the logo and writes
`custom_logo` **directly into the generated theme's own mods** (`theme_mods_<slug>`) — deterministic
regardless of switch-theme timing, and it can never clobber the active theme's logo — and sets
`blogname` for the `core/site-title` fallback + browser chrome. Verified end to end: image logo →
`core/site-logo`, logo localized, mod written to the new theme (`matches: YES`), active theme
untouched, clean restore. *Remaining (minor):* richer footer layouts.

### Tier C4 — Templates ✅ *(built)*

`templates/index.html` (query loop), `page.html`, `single.html`, `404.html`, each wiring the header +
`main` + footer parts. Delivered by the scaffold in C1 and proven in the end-to-end render
(`wp_is_block_theme()` → true, front page rendered). A wider set (`archive.html`, `search.html`) is a
trivial add when needed.

### Tier C5 — Block patterns ✅ *(built)*

Register each converted section as a **block pattern** so a user can re-insert "the pricing section,"
"the hero," etc. Turns a one-shot conversion into a reusable kit.

**Built now:** `to-block-theme.mjs` emits one auto-registered `patterns/section-N.php` per converted
section (WordPress registers every PHP file in a block theme's `patterns/` dir) — each with a Title
taken from the section's own heading, a Slug, the theme's pattern Category, and the section's block
markup. A `functions.php` registers that category so the patterns group under the theme in the
inserter. Verified on Jukebox (four valid patterns registered end to end, each parsing with zero
freeform blocks) and by fixture (empty sections skipped; every pattern header-complete —
Title / Slug / Categories / Inserter). Patterns honour the vocabulary toggle (C6), so an enriched
conversion's patterns carry the UnysonPlus blocks too.

### Tier C6 — UnysonPlus-block enrichment ✅ *(built — core mappings; more are incremental)*

Where core blocks can't express a region faithfully, emit the matching **UnysonPlus block** instead of
`core/html` — richer output, at the cost of a plugin dependency. The upsell path, and the bridge back
to the framework.

**The vocabulary toggle is shipped end to end.** `toBlocks(capture, { vocabulary })` (JS) and
`FW_Site_Converter_Blocks::to_blocks($sections, ['vocabulary' => …])` (PHP) both take `core` (default,
plugin-independent) or `enriched`. It threads from a `--vocab=enriched` / `VOCAB` capture flag through
the bundle **and** the section patterns, so one capture replays into either vocabulary. This realises
futureproofing principle #3 — *one emitter with a swappable vocabulary, never two pipelines*.

**How enrichment works.** Each `unysonplus/*` block is a **dynamic** block that delegates its render to
the matching Unyson+ shortcode, carrying `upOptions` = that shortcode's saved atts. So an enriched
block is a self-closing comment — e.g. `<!-- wp:unysonplus/button {"upOptions":{…}} /-->` — and further
mappings are mostly a matter of shaping `upOptions` (ideally by reusing the page-builder Mapper's atts,
the way `to_blocks` mirrors `to-pages`). Anything without an enricher **falls back to the core mapper**
(never `core/html`), so enriched output degrades faithfully.

**Mappings built so far** — each proven end to end (PHP and JS emit **byte-identical** markup, the block
is registered by the blocks extension, and `do_blocks()` renders the real output), each fixture-guarded:

| Intermediate | UnysonPlus block | `upOptions` | Renders as |
|---|---|---|---|
| `button` | `unysonplus/button` | `label, link, target` | `<a class="btn btn-primary …">Book a Table</a>` |
| `heading` | `unysonplus/special-heading` | `title, heading (h1–h6), [alignment]` | the real `<h2>…</h2>` special heading |
| `text` | `unysonplus/text-block` | `text (HTML), [text_align]` | the rich text block |
| `section` (the band wrapper) | `unysonplus/section` | `align:full` (no `upOptions` → shortcode defaults) | `<section><div class="fw-container">…inner…</div></section>` |

`unysonplus/section` is a **container** block — a dynamic block that renders its **inner blocks** as the
`section` shortcode's `$content`. So an enriched conversion nests the enriched leaf blocks inside the
framework's own section (with its section controls) instead of a `core/group`. Verified end to end: the
whole `section → special-heading + text-block + button` tree renders fully-parsed, byte-identical
PHP == JS.

Golden fixtures (8 in total) lock the toggle (core vs. enriched, the `upOptions` shape of each, the
section wrapper, faithful degradation, and the "can't enrich → core fallback" cases — e.g. a label-less
button, a text-less heading, or a verbatim section whose content degrades to `core/html` inside the
enriched section wrapper).

**Deliberate non-enrichment — `image` stays `core/image`.** `unysonplus/media-image` has no `alt`
option and its URL would live inside block-JSON (which the install-time media localizer scans as
`<img src>`, not as JSON), so enriching images would **lose alt text and skip localization** — strictly
worse than `core/image`, which keeps alt and is localized. Per principle #6 (*faithful degradation over
fake nativeness*), image is intentionally left on the core block even in enriched mode.

**Deliberate non-enrichment — `row`/columns keeps `core/columns`.** There is **no UnysonPlus `row`
block**: the `.fw-row` Bootstrap-grid parent that `unysonplus/column` needs isn't exposed as a block
(verified — a bare `unysonplus/column` renders `fw-col-12` and stacks). `core/columns` → `core/column`
is the superior responsive, plugin-free layout, so the columns **wrapper stays core** while the column
**content still enriches** (the emitter threads the vocabulary into the columns, so an enriched row is
`core/columns → core/column → unysonplus/*` inside). Verified end to end: renders as
`wp-block-columns` with the enriched inner blocks, fully parsed. Fixture-locked.

**So the tier is functionally complete:** the vocabulary toggle, the leaf mappings (button / heading /
text), and the `section` container all ship and are proven; `image` and the columns `wrapper`
deliberately stay core (each strictly better there). What remains is **optional incremental breadth** —
more leaf types (`overline`, `video`) and richer `upOptions` (reusing more of the Mapper's atts) — each
a fixture-guarded add on the shipped foundation, not a blocker. Enriched output **requires the plugin's
`blocks` extension active** (106 blocks); that dependency is the whole point of the tier.

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
