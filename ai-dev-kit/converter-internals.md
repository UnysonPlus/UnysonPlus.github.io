---
title: Deterministic Converter — Internals & Fragility Trace
sidebar_label: Converter Internals & Fragility
sidebar_position: 3.6
slug: /converter-internals
description: An engineering-level map of the deterministic PHP converter (Stitch + Mapper) — the pipeline, the recognizer registry, the structural build path, the mapper builder API, and a living Fragility Register of the load-bearing heuristics, reverted experiments, and known limitations. Updated as the converter changes.
---

# Deterministic Converter — Internals & Fragility Trace

This is the **engineering trace** for the deterministic (offline PHP) converter — the internals,
the load-bearing heuristics, and **what is fragile**. It is deliberately more low-level than
[Conversion Architecture](./conversion-architecture.md) (which is the pipeline overview): this page
exists so anyone changing `class-fw-site-converter-stitch.php` / `-mapper.php` has a map of what's
already there and a **register of the brittle parts** before they touch a load-bearing path.

:::note[Living document]
This page is **kept in sync as the converter changes**. The [Change Log](#change-log) at the bottom
records each structural change; the [Fragility Register](#fragility-register) is updated whenever a
heuristic is hardened, reverted, or replaced. Line numbers are anchors at time of writing — treat them
as "search near here", not absolutes.
:::

Files (in `unysonplus/framework/extensions/site-converter/includes/`):

- **`class-fw-site-converter-stitch.php`** — the DOM→blocks recognizer engine (`FW_Site_Converter_Stitch`, ~18.4k lines).
- **`class-fw-site-converter-mapper.php`** — turns recognized blocks into builder JSON nodes (rows/columns/shortcodes).
- **`class-fw-site-converter-bundle.php`** — the import orchestrator (`import_dir` → reconvert → build).
- **`class-fw-site-converter-sources.php`** — hosts the top-level `build_from_html`.

## Pipeline — entry points

```
import_dir (bundle.php:98)
  → maybe_reconvert_with_php (bundle.php:488)
      → [optional] Stitch::set_ai_structure(...)      (bundle.php:565)  — AI verdicts, advisory only
      → Sources::build_from_html(...)                  (bundle.php:576)
          → Stitch::html_to_mapping($html,…)           (stitch.php:8658)  ← DOM→sections entry
              → section_roots / walk_section_roots     (stitch.php:9608 / 9680)  — claim each section
              → collect_blocks($node,$blocks,$rules)   (stitch.php:13197)  ← per-child dispatcher
```

`html_to_mapping` gets the section roots, strips header/nav/footer as **chrome** (handled by the
generated child theme, not page content), and for each root either treats it as a layout row
(`section_root_row`, stitch.php:12740) or runs `collect_blocks` to decompose its children.

`walk_section_roots` (stitch.php:9680) is a pre-order DFS that **claims** every `<section>` and each
hero `<header>` (no descent into a claimed node), skips `<footer>`/`<nav>`, and for a section-less
`<main>`/`<div>` hero splits it into content bands via `segment_bands` (stitch.php:9704).

## The recognizer registry

Registration: **`register_recognizer($id, $priority, $match, $build)`** (stitch.php:9794); built-ins
in `register_builtin_recognizers()` (stitch.php:9934). There is **no** `register_builder` in Stitch —
the build callback is the 4th arg.

**Dispatch** (`recognizers()`, stitch.php:9800): built-ins are registered lazily, then sorted
**priority-descending**. `collect_blocks` iterates in that order and the **first `match()` that returns
true wins** — its `build()` runs and the loop `break`s. A recognizer **claims the whole subtree**
(the walker does not descend into a claimed node). `build()` may return one `{t,role,…}` block, a list
of blocks, or `null` (claimed, emits nothing). Reveal/scroll animation intent (`anim_intent`) and
text-split intent (`text_split_intent`) are stamped onto emitted blocks.

### Registered recognizers (priority ↓)

| Pri | id | Matches | Builds |
|----:|----|---------|--------|
| 99 | `pricing_table` | ≥2 plan columns w/ price token + name | `pricing_table` shortcode |
| 98 | `posts_grid` | blog-card grid (heading + time/byline/read-more) | dynamic `posts` |
| 98 | `steps` | numbered process flow | `steps` |
| 97 | `absolute_collage` | relative/min-h **stage** w/ ≥2 abs-positioned content cards | `{t:stage}` + per-card blocks/skin/offsets |
| 97 | `timeline` | dated chronological entries | `timeline` |
| 96 | `decorative_scene` | aria-hidden/parallax stack of ≥2 imgs, no copy | verbatim `.sc-tw` code |
| 96 | `progress` | ≥2 labelled % bars | `progress` |
| 95 | `marquee_strip` | auto-scroll/overflow-x reel | AE marquee OR verbatim code |
| 95 | `tabs` | tablist bound to panels | `tabs` |
| 94 | `instagram_feed` | grid of IG posts | `instagram` |
| 94 | `lottie` | lottie-player / `.json` src | `lottie` |
| 93 | `testimonial_single` | single quote card | testimonial |
| 93 | `inline_links` | inline `<a>` + separator strip | one centered `text_block` |
| 93 | `svg_draw` | stroke-animated `<svg>` | `svg_draw` |
| 92 | `testimonials` | grid of quote cards | `testimonials` |
| 91 | `image_grid` | uniform image grid | image-grid row |
| 91 | `counter_grid` | grid of big-number + label cells | animated `counter` cells |
| 90 | `card_grid` | grid/flex of uniform cards (Tailwind) | `{t:row,role:columns}` (icon_box/text/code cells) |
| 89 | `accordion` | ≥2 `<details>`/aria-expanded pairs | `accordion` |
| 88 | `newsletter` | `<form>` w/ email input | `newsletter` |
| 88 | `table` | `<table>` w/ rows | `table` |
| 85 | `card_grid_cs` | card grid via **computed** styles (non-Tailwind) | columns row |
| 84 | `avatar_group` | overlapping round-avatar stack | `avatar` group + rating |
| 84 | `icon_text_list` | div of icon + short-label rows | `feature_list` |
| 82 | `heading_cta_row` | heading + "View All →" in justify-between | inline space-between block |
| **82** | **`layout_row`** | **multi-col band that isn't a card grid (text \| image hero)** | **columns row — cells decomposed OR verbatim `.sc-tw`** |
| 80 | `heading` | `h1`–`h6` | `{t:heading}` |
| 79 | `text_list` | standalone `<ul>`/`<ol>` ≥2 items (non-nav) | `feature_list` |
| 77 | `stat_number` | big-display or baseline-flex stat lockup | `{t:heading,level:3}` |
| 76 | `badge` | structured hero chip | `badge` |
| 75 | `badge_verbatim` | unstructurable chip | verbatim `.sc-tw` code |
| 70 | `pill` | overline pill | `{t:text,role:overline}` |
| 60 | `button` | button / CTA link | `button_block` |
| 55 | `button_cs` | button via computed styles | `button_block` |
| 50 | `paragraph` | `<p>` | `{t:text}` |
| 45 | `video` | `<video>` or provider `<iframe>` | `media_video` (+ bg-flag logic) |
| 40 | `image` | `<img>` | `{t:image}` + `skinCss` |
| 35 | `image_wrapper` | wrapper of a lone image | image only |
| 30 | `image_overlay` | image w/ overlaid UI | decompose → media_image + icon_box, else verbatim |
| 25 | `logo_strip` | strip of logos, no headings | `logo_grid` |

`call_to_action` (pri 81) is **intentionally unregistered/disabled** (stitch.php:10286) — its
`is_cta_band`/`cta_build` helpers stay dormant.

## The structural build path — and the current gap

Multi-column layout is **not** handled by the generic fallback; it is handled by **specific
recognizers**: `image_grid`(91), `counter_grid`(91), `card_grid`(90), `card_grid_cs`(85), and the
general **`layout_row`**(82). A section whose children form a grid/flex row that matches one of these
gets real columns. Everything else falls through.

### The generic fallback (`collect_blocks`, stitch.php:13274–13325)

When **no** recognizer claims a node, the fallback **does not reconstruct layout** — it
**descent-flattens**: it recurses into the wrapper and re-tests *its* children against the recognizers,
carrying only a fixed set of the wrapper's own signals onto the leaf blocks it produced:

- vertical margin → `mtAdd`/`mbAdd` (stitch.php:13280);
- inherited `text-align` + `max-w … mx-auto` measure → `align`/`wrapMaxW` (stitch.php:13301);
- `data-aos` reveal intent → `anim` (stitch.php:13316).

If the subtree produced **nothing**, `salvage_dropped` (stitch.php:13342) rescues a real content
`<img>`/own text or records the node as decorative in the drop log. **There is no generic single-child
wrapper collapse** (no "fold this meaningless wrapper's bg/border/padding onto its only child").

### `layout_row` already recurses — but keeps *media-only* cells verbatim

`layout_row`(82) → `layout_cols` (stitch.php:12876) is the key finding. It **already**:

- computes per-column widths from `col-span-N`, arbitrary `w-[Npx]` (`layout_px_fractions`,
  stitch.php:12850), or even division;
- **decomposes a content cell** (heading/prose) by re-entering `collect_blocks` on it
  (stitch.php:12920) — so a hero's text column becomes `special_heading` + `text` + `button`, not one
  opaque code block;
- decomposes an **image composite** (photo + floating badge) into `media_image` + `icon_box`
  (stitch.php:12939).

**The gap:** a **media-only cell** — a column whose sole content is a `<video>` / lone `<img>` / SVG
with *no heading and no real prose* — fails the `cell_is_decomposable` gate and falls to the
**verbatim `.sc-tw` code block** path (stitch.php:12947–12950). That is why a two-column hero like
**colosseum** / **orbital-horizon** (text left, shaped video right) renders its video column as a
`code_block(<video>)` instead of a proper, editable `media_video` carrying its mask/shape as scoped
CSS. Closing this is the current work (see [Change Log](#change-log)).

## Display / structure detectors already present

| Helper | stitch.php | Reads | Output |
|---|---:|---|---|
| `section_is_multicol_grid($el)` | 9008 | `grid-cols-[2-9]` class **or** computed `display:grid` + ≥2 tracks | bool |
| `grid_col_count($grid)` | 18012 | widest `grid-cols-N` → computed `grid-template-columns` → card-cell fallback | int cols |
| `is_layout_row($el)` | 12774 | Tailwind grid / computed grid tracks / desktop flex-row | bool |
| `detect_section_bg_video($node)` | 9026 | bails on multi-col grid; else inset/cover/fullscreen signals | bg-video descriptor or `[]` |
| `is_absolute_collage($el)` | 9816 | relative/min-h stage + ≥2 abs-positioned cards | bool (+ `collage_offsets` 9846) |
| `is_content_band` / `is_decor_layer` | 9758 / 9748 | heading/media/text presence vs absolute + short text | bool |

**Computed-style accessor:** `sc_css($el,$prop)` (stitch.php:4966) reads one property from the
captured `data-sc-cs` attribute (e.g. `sc_css($node,'display')`, `'grid-template-columns'`,
`'flex-direction'`). `data-sc-cs` is a **whitelisted subset** of computed props — some captures omit
`position`/`z-index`. There is no reusable "full `{prop=>val}` map" method yet (a local closure exists
at stitch.php:2083).

**`structure_summary($html)`** (stitch.php:9495) is the compact DOM view fed to the AI classifier —
per section: `index`, `sig`, `heading`, `dollars[]`, `hasPeriod`, `hasFeatureList`,
`videos[{rounded,inColumn,cover,bleed}]`, `bands`. AI verdicts are **advisory** and only correct two
ambiguous calls (pricing-vs-stats, video background-vs-content).

## Mapper builder API

There are **two row models**. A recursive layout walker should target the **hybrid flexbox** one
(it represents flex direction / wrap / grid-N faithfully and nests arbitrarily).

**Classic** (section → columns; no `row` node type):
- `n_section($cls,$id,$css,$items,$fullwidth)` (mapper.php:1880) — `$items` are **column** nodes.
- `n_column($width,$items,$cls='',$resp=[])` (mapper.php:1968) — `$width` is a **fraction slug**
  (`1_1`, `1_2`, `1_3`, `5_12`…). Columns nest columns via `_items` (no wrapper row).

**Hybrid "Div"** (the real flex/grid primitive):
- `n_flexbox($items,$over=[])` (mapper.php:2006) — `display` (flex/grid/block), `direction`
  `{base,md,lg}`, `gap`, `justify_content`, `align_items`, `wrap`, `grid_columns`; per-cell `width`
  preset, `flex_grow`, `align_self`, `order`. Nests `n_flexbox` inside `n_flexbox` (see the `stage`
  builder, mapper.php:8807).

**Fraction mapping:** `frac12($n)` (mapper.php:2567) — 12-grid span → slug (`4→1_3`, `6→1_2`, `8→2_3`,
`12→1_1`). Inverse `slug_to_span` (mapper.php:2120). Flexbox uses a different vocabulary:
`flex_width_preset($n)` (mapper.php:2062) → plain twelfth string (`'4'`=⅓). A grid whose N does **not**
divide 12 (5, 7…) switches the row to `display:grid` + `grid_columns=N` (mapper.php:9886).

**register_builder roles** (mapper.php:8649 — this API *does* exist in the Mapper): `heading`, `text`,
`button`, `code` (universal fallback → structural flexbox mirror or `code_block`), `video`, `image`,
`badge`, `avatar`, `newsletter`, `floating_card`, `stage` (full-width absolute-collage).

**Leaf shortcodes** (all `{type:'simple',shortcode:'…'}`): `n_text`→`text_block`,
`n_heading`→`special_heading`, `n_media_image`→`media_image`, `n_video`→`media_video`,
`n_icon_box`→`icon_box`, `n_button`→`button`, `n_code`→`code_block`, plus `counter`, `feature_list`,
`accordion`, `table`, `gallery`, `posts`, `testimonials`, `divider`.

**Never-dropped CSS:** `apply_hifi_base($node,$cs,$already)` (mapper.php:1009) appends a
specificity-0 `:where(selector){…}` rule of every unmapped computed property to the node's
`custom_css` (the `selector` token is rewritten to the node's scoped class at render). Page-level
CSS with no per-node home goes to `main_style` → `#main` (mapper.php:8852). Box skins:
`apply_card_box` / `apply_card_box_inner` (mapper.php:1931 / 1952), or the preferred portable path
`register_box_preset` → `boxp-<slug>` (mapper.php:172).

## Fragility Register

The parts most likely to break site-to-site or bite a future change. **Read this before touching a
load-bearing path.**

### Load-bearing class-name heuristics (brittle by nature)

| Where | stitch.php | Risk |
|---|---:|---|
| `detect_section_bg_video` name sniffs | ~9032 | Author explicitly flagged `*-portal` name matching as brittle (it hit legit full-bleed videos); **now** gated on grid *structure* (`section_is_multicol_grid`) instead — keep it structural, don't reintroduce name sniffs. |
| `is_decor_layer` | 9748 | absolute/fixed + text-length heuristic — a content overlay with little text can be mis-dropped. |
| `section_center` `flex-col`+`items-center` string tests | ~8846 | class-substring matching; computed `flex-direction`/`justify` would be sturdier. |
| `is_absolute_collage` `relative` / `min-h-[` sniff | 9816 | class-name signal for the stage; a computed `position:relative`+`min-height` read is the fallback but the class path fires first. |
| pervasive `object-cover`/`inset-0`/`w-full h-full`/`absolute` matching | video + bg detectors | the whole full-bleed-vs-contained decision leans on these tokens; non-Tailwind sources miss them. |

Instrumentation the author left to find where these drop look-carrying classes:
`class_is_significant` (stitch.php:13427), `build_class_coverage_report` (13449),
`build_drop_report` (13394), `conv_debug_record` / `conv_dropped_diff` (mapper.php:257/279).

### Reverted experiments (do not re-attempt without reading the note)

- **Routing a `layout_row` cell through `section_root_row`** — tried and **reverted**
  (08-render-audit §8.34): claiming a cell as a row made *hygge_haus* 2,255px shorter but **dropped
  two images** including the hero background photo (16→12 images). The height "gain" was content loss.
  The note lives inline at stitch.php:12916. The section-**root** row case (§8.30) is unaffected and stays.
- **Portal/shell name-based exclusion of bg videos** — regressed *orbital-horizon* (bgv 0) because
  `portal` was too broad and anime uses `[mask-image]`. Replaced with the `section_is_multicol_grid`
  structural gate.
- **AI writing a whole stylesheet** — made the two engines conflict (both producing CSS). Scoped the
  AI back to **mapping-only**; the deterministic engine authors all CSS.

### Known limitations (accepted, tracked)

- **Offline `.sc-tw` Tailwind reproducer is incomplete** — missing `h-*` / `object-fit` / `aspect` /
  arbitrary values, so the upload path deliberately does **not** mirror the JS `preferVerbatim` guard
  (note at stitch.php:8756). Verbatim cells are lower fidelity offline than through the capture service.
- **`dedupe_repeated_app`** (stitch.php:9624) is a workaround for captures that serialize the SPA
  multiple times — the real fix belongs in the capture, not here.
- **WebGL/`#gl` scenes with no naming hint** are deliberately not guessed (stitch.php:9418) — left to
  the AI tier.
- **`grid-cols-1` with no wider responsive override** must be rejected as a stack, else
  `grid_col_count`'s card-cell fallback over-claims columns (hardening note at stitch.php:12790).

### Scorer blind-spots corrected (context for regressions)

The kit scorer (`score.mjs` + `import-site.php`) historically scored 100 while whole photo bands went
missing, and only ever flagged a *missing* backdrop (never a *wrongly-added* one). Current guards:
`srcImages` media-retention denominator; `wrongBg` (a hero bg video that is actually a rounded content
panel); `srcHeroVideo` gated by `$is_grid2` so a 2-column grid hero is never scored as a missed
backdrop.

## Change Log

Newest first. Each entry = one structural change to the deterministic converter.

- **2026-09-09 — Grid-structure gate for hero videos (shipped, regression-clean).**
  `section_is_multicol_grid($el)` (stitch.php:9008) + an early gate in `detect_section_bg_video`
  (stitch.php:9034): a `grid-cols-[2-9]` / computed-2-track hero no longer promotes its video to a
  full-bleed section background — the video is column *content*. Matching `$is_grid2` exclusion in the
  scorer's `srcHeroVideo` (`import-site.php:87`). Verified: colosseum / orbital-horizon /
  apple-vision-pro / anime all 100, no regressions across the 58-site corpus (avg ~99.2).
- **In progress — media-only column cells → contained `media_video` / `media_image`.** Teaching
  `layout_cols` (stitch.php:12876) to decompose a media-only cell (lone video/image, no heading/prose)
  into a real shortcode carrying its mask/shape as scoped CSS, instead of the verbatim `.sc-tw` code
  block. Plus a `classify_display($el)` primitive (grid / flex-row / flex-col / block / leaf) and a
  `collapse_transparent_wrappers` helper for div-soup. Target: colosseum's video column renders as an
  editable `media_video`.
