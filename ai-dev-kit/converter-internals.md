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

## Structural Pattern Catalog — AI generators

**Premise (validated by a corpus audit, 2026-09-09):** AI website builders are *template engines*, so
their output is formulaic. The same section skeleton repeats within a generator and many archetypes are
universal across generators. **Therefore every converter fix must key off a structural PATTERN, not the
site in front of you** — a fix that recognises "a section whose backdrop is a viewport-covering `<video>`"
covers the-line *and* every future hero-video site; a fix that special-cases the-line is a band-aid.
Corpus sampled: openhero (the-line, lumina-ai), lovable ×4, wegic ×6, jiro.build, threeui ×4.

### What is UNIVERSAL vs GENERATOR-SPECIFIC

| Pattern | Families | Deterministic DOM signature | Verdict |
|---|---|---|---|
| Semantic band = `<section>` (often `id=`) | openhero, lovable, wegic, jiro | `<section>` stamp `padding:*px 0px`/`py-*` | UNIVERSAL (threeui excepted) |
| **Full-bleed backdrop** = positioned wrapper holding a lone `object-cover` `<img>`/`<video>` | openhero, lovable, wegic, jiro | child is `absolute inset-0`/computed `position:absolute` + lone `object-cover` media, stamp **`border-radius:0px` and NO `transform`**, text-free; sibling gradient overlay | UNIVERSAL — **key recogniser to build by GEOMETRY not name** |
| Card / feature grid | openhero, lovable, wegic, jiro | container computed `display:grid` + `grid-cols-N` | UNIVERSAL (handled: `card_grid`/`card_grid_cs`) |
| Decorative absolute layer (NOT a background) | openhero, wegic, lovable | `position:absolute|fixed` + blob/`rounded-*`/`blur-*`/`rotate-*`/`transform:matrix` or `border-radius:50%` orb, empty/short | must be EXCLUDED from bg + dropped/→bg_effect |
| Single desktop nav; mobile menu is React state (not in DOM) | lovable, wegic(pinky), jiro | one `<nav class="hidden (md|lg):flex">` + a `(md|lg):hidden` hamburger button | UNIVERSAL default — **nav duplication is NOT a universal hazard** |
| Split/duplicated desktop nav in DOM | wegic (my_website variant) | **two** `<nav class="hidden md:flex … flex-1">` in one `<header>` | GENERATOR-SPECIFIC |
| Colours are `oklch()`/`oklab()` | **openhero only** | stamp `oklch(L C H / A)` fills | GENERATOR-SPECIFIC (all others resolve to `rgb()`; `hsl()` only in the stylesheet). Confirms the oklch normalisers in `norm_box_color`/`rgb_triplet`/`build_box_presets $norm` are an openhero need, harmless elsewhere. |
| Bespoke canvas/parallax art page | threeui | custom `.par`/`mask` classes, `<canvas>`, `transform:matrix3d`; no `<section>/<ul>/<form>` | GENERATOR-SPECIFIC — treat as non-mappable |

### openhero skeleton (the target generator)

Delivery: the real site is the **`/api/preview?category=&slug=`** document; an openhero `/preview/...` page is
just a Next.js shell that iframes that endpoint (capture the `/api/preview` URL). Ordered sections the
generator emits, with the vocabulary the recogniser can key on:

1. **Fixed decorative stack** (body-level, pre-nav): `.preloader` · `.grain-overlay` (SVG-noise data-URI,
   `position:fixed`) · `.ambient-orbs` → N× `.amb-orb` (`border-radius:50%`, `position:absolute`,
   `transform:matrix`) · `.cursor`/`.cursor-trail`. → **drop.**
2. **`<nav id="mainNav">`** — fixed flex bar: `.nav-logo` + one `<ul class="nav-links">` (the ONLY real menu) +
   one `.btn-liquid` CTA ("Inquire"). Source labels are correct (Philosophy/Pillars/Projects/Contact).
3. **hero** (`.hero`, `display:flex;center;height:100vh`) — `.video-portal` (`position:absolute`, `border-radius:0`,
   lone `<video object-fit:cover>`) = **the true full-bleed background**; `.atmospheric-mask` (blob radius +
   `transform:matrix` + a *second copy* of the video) = decorative lens; `.light-corridor` gradient wash;
   `.hero-content` (eyebrow / `<h1>` with `<em>` / subtitle / `.btn-liquid`+`.btn-ghost`).
4. **manifesto** — 2-col grid (text | `.manifesto-metrics` = 4× `.metric-orb` blob cards) + `.ecology-ticker` marquee.
5. **pillars** — `grid repeat(4,1fr)` of `.pillar-card` blob cards + `.data-strip`/`.data-row` (`repeat(5,1fr)`) stats.
6. **projects** — `.projects-track` flex carousel of `.project-card`; each card's "image" is a
   `background-image:radial-gradient(oklch…)` on `.project-bg` (`absolute inset-0`), **not real media**.
7. **philosophy** — grid `2fr 3fr`: `position:sticky` left column + numbered `.phil-line-item` timeline.
8. **contact-section** — a REAL `.contact-form` (`display:grid`) with 3 `.input-shell` (`text`/`email`/`textarea`)
   + submit `.btn-liquid` — NOT a lone CTA button.
9. **footer** — logo + copy + `.footer-links`. `.section-divider` (radial-gradient hairline) sits between most bands.

**Signature idioms:** (a) the openhero **blob shape** — a 4-value slash `border-radius: X% X% X% X% / X% …` —
marks buttons, metric-orbs, pillar-cards, project-cards AND the decorative lens (a deterministic fingerprint);
(b) text is shattered into per-word `<span class="breeze-word">` (a JS animation artifact) — treat these spans
as **transparent** and reassemble their text WITH the inter-span spaces/separators.

### Confirmed defect roots (the-line, all pattern-level)

1. **Hero backdrop video → two inline tiles.** `detect_section_bg_video` (stitch.php:9647) requires an
   `inset-0`/`w-full h-full`/bg-name class OR self-`absolute` position, and its name test *excludes* `portal`.
   openhero's backdrop is `.video-portal` with only computed `position:absolute` (inset via stylesheet, not the
   stamp) → no bleed signal fires → falls to inline tiles. **Fix must be structural** (the name exclusion was
   already tried and reverted — see Fragility Register): promote an absolute/fixed, text-free, lone
   `autoplay muted` video wrapper with `border-radius≈0` and no `transform` to the section background, regardless
   of class name; keep the multicol-grid gate and the page-fixed gate. (Capture enrichment — stamp `object-fit`
   + a rect-coverage flag — would make it bulletproof; capture.mjs is Session B's lane.)
2. **Duplicated / mislabeled nav — FIXED (menu accumulation).** Not a detection bug: 46 stale converter menus had
   accumulated and the last-converted site (Sushima) held the `primary` location. Fixed by tagging converter
   menus (`FW_Site_Converter_Menus::MENU_META`) and purging the previous conversion's menus in
   `cleanup_previous_conversion` (see Change Log). Residual (header lane): the-line's own menu still includes the
   LOGO anchor + the INQUIRE CTA as items (source nav has 6 anchors) — exclude logo + trailing CTA.
3. **Mashed eyebrow** (`EQUILIBRIUMBIOPHILIC INTEGRATIONEST.`) — `.breeze-word` per-word spans reassembled without
   the inter-span whitespace and `·` separators. Pattern fix: when joining inline animation-span text, preserve a
   single separating space and any separator glyph.
4. **Selected Works dark-on-dark titles** — the project cards' "images" are `radial-gradient` placeholders on
   `.project-bg`; the card renders dark and the title text is also dark. Contrast handling, not a dropped image.

### Prioritized pattern-based fix plan

| # | Pattern fix | Where | Lane | Status |
|--:|---|---|---|---|
| P1 | Structural full-bleed backdrop media recogniser (geometry, not name); exclude blob/transform/orb decorative layers | stitch.php `detect_section_bg_video`/`detect_page_bg_video` + a new decorative-exclusion helper | A | designed; needs corpus regression before ship |
| P2 | Animation-span (`.breeze-word`) text reassembly preserving spaces + separators | stitch.php text extraction | A | designed |
| P3 | Reconversion purges previous conversion's nav menus | menus.php + bundle.php | A | **DONE + verified** (site-converter 1.8.68) |
| P4 | Multi-field contact `<form>` (name/email/textarea) → contact-form/newsletter, not a lone button | stitch.php recogniser + mapper | A | designed |
| P5 | Capture stamp enrichment: `object-fit` + rect-coverage flag for positioned media (makes P1 bulletproof) | capture.mjs | B | proposed to B |
| P6 | Header/menu excludes the logo anchor + trailing CTA button | stitch.php header/menu detection | B | flagged to B |
| P7 | Gradient-placeholder card contrast (`.project-bg` radial-gradient) | mapper box/section preset | A | low priority |

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
- **Page-wide FIXED VIDEO backdrops** (a single `position:fixed` full-viewport `<video>` behind every
  section, content scrolling over it — lumina-arctic's `div.video-portal`). UnysonPlus backgrounds are
  **per-section**, and the Background-Pro **video** layer has **no fixed mode** (only IMAGE has
  `attachment: fixed` → `background-attachment:fixed`; CSS can't pin a `<video>`). Today
  `detect_section_bg_video` treated `position:fixed` like `absolute` and promoted the video to the FIRST
  section's (scrolling) background. **Resolved for the full-viewport case (Option A, shipped):** a
  full-viewport `position:fixed` video is detected (`detect_page_fixed_video`) and routed to the Site
  Background's fixed video layer, rendered once by the theme, with a deferral gate
  (`el_is_page_fixed_layer`) so the section detector no longer claims it. **Still open (case B):** a
  fixed FLOATING video *portal* (positioned/sized/masked, not full-viewport — lumina-arctic) needs a
  fixed-positioned `media_video` preserving its geometry + mask (see Change Log).

### Scorer blind-spots corrected (context for regressions)

The kit scorer (`score.mjs` + `import-site.php`) historically scored 100 while whole photo bands went
missing, and only ever flagged a *missing* backdrop (never a *wrongly-added* one). Current guards:
`srcImages` media-retention denominator; `wrongBg` (a hero bg video that is actually a rounded content
panel); `srcHeroVideo` gated by `$is_grid2` so a 2-column grid hero is never scored as a missed
backdrop.

## Change Log

Newest first. Each entry = one structural change to the deterministic converter.

- **2026-09-09 — Reconversion now purges the previous conversion's NAV MENUS (site-converter 1.8.68).** Every
  conversion builds a `"<Title> Header"` nav menu and assigns it to the theme's `primary` location; nothing ever
  removed the previous site's menu, so a shared install had accumulated **46** menus and the front page (the-line)
  was rendering **Sushima's** doubled `CHRONICLES/STANCES/LANDSCAPES/ARMORY` menu — the last-converted site had
  quietly stolen the `primary` slot. This was mis-read as a nav *detection* bug; it was menu accumulation, the same
  class of leak as the revision/attachment/child-theme bloat already handled by `cleanup_previous_conversion`. Fix:
  `FW_Site_Converter_Menus` stamps every menu it creates/reuses with term-meta `MENU_META` (`_fw_sc_menu`);
  `FW_Site_Converter_Bundle::cleanup_previous_conversion` purges all tagged menus on a DIFFERENT-site conversion
  (via `wp_delete_nav_menu`, which also clears the stale `nav_menu_locations` theme_mod), before the current import
  rebuilds its own — mirroring the deferred prev-theme purge. Same-site reconvert is untouched (menu reused by
  name). One-time cleanup of the 44 legacy menus done on localhost root; `primary` rebound to The Line Header — the
  nav now renders the correct PHILOSOPHY/PILLARS/PROJECTS/CONTACT. (Residual, header lane: the-line's own menu still
  includes the logo anchor + INQUIRE CTA as items — the builder captured all 6 header anchors.)
- **2026-09-09 — Converted DARK sites rendered WHITE — root-caused + fixed at two layers.** A converted
  dark site stored its dark `--site-bg-color` correctly, but the rendered `body` was white. Root cause: the
  mapper's `cs_decls` (mapper.php) split a computed-style string on `;` with a naive `explode(';')`, which
  **truncated a `background-image:url("data:image/svg+xml;base64,…")` data-URI at the `;` inside it** and
  mashed the following `transform`/`transition` declarations into an **unterminated `url("…` with a
  dangling `(`**. Once the asset-optimizer combined the stylesheets, that dangling `(` made the CSS
  tokenizer swallow every following `{`/`}` — including the theme's `:root{--site-bg-color:…}` block — so the
  var was present in the file but dropped by the browser (body fell back to white). Fixed at BOTH layers:
  (1) **generation** — new `cs_split()` (mapper.php) splits declarations `;`-safely, never inside quotes or
  `url(...)`/`calc(...)` parens, so the data-URI stays whole; (2) **defence** — `FW_AO_Minifier::close_unbalanced()`
  (asset-optimizer) closes a dangling string/paren/bracket PER FILE before combining, so one malformed source
  can never corrupt the whole bundle (with a 17-assertion regression test). Verified: colosseum `body`
  `rgb(255,255,255)` → `rgb(3,6,9)`, `--site-bg-color` now `#030609`. Also: the converter now calls
  `unysonplus_hf_regenerate_css()` after a programmatic Theme-Settings import (else the cached generated CSS
  kept stale defaults), and stops emitting a fragile prose `/* … */` comment into generated CSS.
- **2026-09-09 — Option A: page-wide fixed video → site-level fixed background layer (shipped).** For a
  genuine `position:fixed` FULL-VIEWPORT video behind all content: (1) Background-Pro's **video** layer
  gained a `position` key (`scroll`|`fixed`); (2) the parent theme renders a fixed full-viewport `<video>`
  once on `wp_body_open` — `unysonplus_render_site_bg_video` (theme `layout.php`), self-contained inline
  markup (deliberately NOT via the generated/combined CSS, so it can't be lost to CSS caching); (3) the
  converter **detector** `detect_page_fixed_video` (stitch.php) recognises a full-viewport `position:fixed`
  video wrapper and writes it to `general_layout/site_background.video` (fixed) in the `{url,attachment_id}`
  shape so `localize_media()` sideloads it; (4) a **deferral gate** in `detect_section_bg_video`
  (`el_is_page_fixed_layer`) so a page-fixed video is never also promoted to a section background. Verified:
  a full-viewport fixed site-bg video renders as `.site-bg-video{position:fixed;inset:0;z-index:-1}` with
  the `<video>` behind content.
- **2026-09-09 — Case B: fixed FLOATING video portals (lumina-arctic) → fixed-positioned media_video (shipped).**
  Not every "fixed video" is a full-viewport backdrop. lumina-arctic's `.video-portal` is `position:fixed;
  top:50%; right:5%; width:clamp(280px,35vw,520px); height:clamp(380px,55vh,720px); border-radius; radial
  mask` — a masked, positioned floating video that stays fixed on scroll but is NOT a background. Previously
  `detect_page_bg_video` claimed it and made it the first section's **full-bleed** 100vh background (blowing
  it up and dropping the mask/geometry). Now `fixed_layer_geometry($el)` (reading the portal's geometry from
  the `.video-portal` **stylesheet rule** via `el_style_props`, not just data-sc-cs) distinguishes a FLOATING
  portal (has offsets / non-full size) from a full-bleed backdrop: a floating one is emitted as a
  fixed-positioned `media_video` CONTENT block (prepended to section 0, `position:fixed` scoped Custom CSS
  carrying top/right/transform/clamp-size/border-radius/mask/filter) instead of a section background; a
  full-bleed video still becomes the section bg as before. **Gated on a FRAMED portal** (`border-radius`
  present): a floating video is only pinned as a portal when it is a defined CARD — lumina's rounded
  `.video-portal`. A large, UNFRAMED, softly-masked decorative layer (autonomous-supply-chain's
  `.visual-breach`: 55vw×80vh, z-index:0, pointer-events:none, radial fade, no radius) stays on the
  full-bleed section-bg path, where the harness reads its hero as a media-hero — without the gate it
  regressed that site's spacing (spc 100→0, a `media=true` hero lost). Verified: lumina-arctic's portal
  renders `position:fixed` at the top-right (~35vw), radial-masked, over the dark page; autonomous unchanged.
- **2026-09-09 — Lone-video column cell → contained `media_video` with carried shape (shipped, regression-clean).**
  `layout_cols` (stitch.php) now decomposes a **lone-video cell** (`cell_is_lone_video` — one
  self-hosted `<video>`, no heading/prose, no content image) into a real, editable `media_video`
  instead of a verbatim `.sc-tw` code block the offline path can't size. The clip's shape is carried as
  scoped `card_css` by `media_shape_css` — border-radius (+overflow), clip-path, mask, opacity, scale,
  and a filter COMPOSED from Tailwind utilities (`tw_filter_from_classes`: `contrast-125 saturate-50`
  → `contrast(1.25) saturate(.5)`, replacing Tailwind's unresolved `var(--tw-…)` form). Stylesheet-
  defined effects (a custom `.radial-portal` mask, `mix-blend-screen`) are read by reusing
  `bg_video_effect_css` against the cached source HTML (`self::$cur_html`). The video is forced `bg`=off
  (a grid-column clip is never the section backdrop). Verified: colosseum 100 (was rendering a blank
  code_block); every shaped-video content site (build-products, human-centric, kinetic-fashion,
  national-geographic, nox-liquid, reactive-forest, terraform, lumina-arctic) stayed 100; corpus
  `overall 99`, `bg_media`/`structure`/`verbatim`/`media_retention` all 100.
- **2026-09-09 — `classify_display` + `collapse_transparent_wrappers` primitives (added, not yet wired).**
  `classify_display($el, &$meta)` (stitch.php, near `section_is_multicol_grid`) returns
  `leaf | grid | flex-row | flex-col | block` from the CAPTURED computed `display` /
  `grid-template-columns` / `flex-direction` first, Tailwind tokens second; `$meta` carries `cols`,
  `regular` (a grid with template-areas / col-span / dense auto-flow is IRREGULAR), `gap`.
  `collapse_transparent_wrappers($el)` descends single-child, box-free wrappers (div-soup) to the first
  meaningful node (`wrapper_has_own_box` guards against skipping a card or a real layout band). Verified
  on real DOMs: colosseum/orbital → `grid cols=2`; apple-vision → `flex-col` stack; anime → `block`; no
  false collapse on 2-child bands. These are the reusable structure-detector primitives; the generic
  recursive walker will consume them next.
- **2026-09-09 — Grid-structure gate for hero videos (shipped, regression-clean).**
  `section_is_multicol_grid($el)` (stitch.php:9008) + an early gate in `detect_section_bg_video`
  (stitch.php:9034): a `grid-cols-[2-9]` / computed-2-track hero no longer promotes its video to a
  full-bleed section background — the video is column *content*. Matching `$is_grid2` exclusion in the
  scorer's `srcHeroVideo` (`import-site.php:87`). Verified: colosseum / orbital-horizon /
  apple-vision-pro / anime all 100, no regressions across the 58-site corpus (avg ~99.2).
