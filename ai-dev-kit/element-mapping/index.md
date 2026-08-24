---
title: Element Mapping Reference
sidebar_label: Overview
slug: /element-mapping
description: How the UnysonPlus Site Converter recognizes each source element and maps it to a native page-builder shortcode — with per-shortcode, option-by-option coverage so you can see what's mapped, reproduced via CSS, or unmapped.
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Element Mapping Reference

When you convert a site, the **Site Converter** doesn't screenshot the source — it **recognizes** each
block and rebuilds it as a **native UnysonPlus shortcode**. This section documents what the
deterministic converter recognizes, what it becomes, and — per shortcode — **how each option is
filled**, so you can spot options that aren't mapped or are only reproduced via CSS.

How to read it:

- **Priority** — relative evaluation order (**higher runs first**). Specialized structural recognizers
  take the **high** numbers and are tried first; text primitives run later (lower numbers); anything no
  recognizer claims falls back to `code_block`, the **universal fallback**, so nothing is ever lost.
- The curated shortcodes below have their **own page** with a full option-by-option coverage table; the
  rest of the registry is listed in the [Recognizers](#recognizers) table with its rule and target.
- **Coverage** counts only design options (`native + via-css + gap + unmapped`); auto plumbing is excluded.
- **⚠️ Gaps vs ⚪ Default** — a *gap* is an option a source realistically expresses that the converter doesn't derive **yet** (a real to-do). *Default* means there's no reliable source signal, or it's an intentional UnysonPlus-specific choice — those are **correct** left unmapped. The goal is **faithful reproduction**, not maxing the native %.

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

### Nothing is dropped silently

Two backstops guarantee no source content is lost:

- **`code_block` fallback** — anything no recognizer claims is preserved verbatim as a `code_block`, so
  it still renders while staying hand-editable.
- **Safety net + drop report** — after mapping, a salvage pass (`salvage_dropped()`) rescues any real
  text node that fell through, and the converter writes a **`conversion-drops.json`** coverage report
  into the bundle: what was *rescued* (real content the net had to recover) vs. *decorative* (safely
  skipped). The golden-fixture regression tests assert a **drop budget** so a recognizer change can't
  quietly start losing content.

> Generated from the converter's recognizer + block-builder registries (with a PHP↔JS parity twin in
> the to-pages path). This set is **expanding** — more shortcodes are added as they're documented.
> Converting a source? See also [Theme Settings Mapping](../theme-settings-mapping/index.md) (the
> design system side) and [How It Works](../how-it-works.md).

## Coverage at a glance

| Shortcode | Becomes | Native | Via CSS | Gaps | Default | Coverage |
| --- | --- | --- | --- | --- | --- | --- |
| [Code Block](./code-block.md) | [`code_block`](/docs/shortcodes/content-elements/code-block) | ✅ 1 | 🟡 0 | ⚠️ 0 | ⚪ 8 | **11%** |
| [Special Heading](./special-heading.md) | [`special_heading`](/docs/shortcodes/content-elements/special-heading) | ✅ 18 | 🟡 0 | ⚠️ 3 | ⚪ 11 | **56%** |
| [Instagram](./instagram.md) | `instagram` | ✅ 3 | 🟡 0 | ⚠️ 0 | ⚪ 6 | **33%** |
| [WooCommerce Products](./wc-products.md) | `wc_products` | ✅ 4 | 🟡 0 | ⚠️ 2 | ⚪ 9 | **27%** |
| [Posts](./posts.md) | [`posts`](/docs/shortcodes/components/posts) | ✅ 7 | 🟡 0 | ⚠️ 2 | ⚪ 47 | **13%** |
| [Avatar](./avatar.md) | [`avatar`](/docs/shortcodes/components/avatar) | ✅ 1 | 🟡 0 | ⚠️ 0 | ⚪ 15 | **6%** |
| [Gallery](./gallery.md) | [`gallery`](/docs/shortcodes/media-elements/gallery) | ✅ 2 | 🟡 0 | ⚠️ 5 | ⚪ 8 | **13%** |
| [Media Video](./media-video.md) | [`media_video`](/docs/shortcodes/media-elements/media-video) | ✅ 1 | 🟡 0 | ⚠️ 1 | ⚪ 4 | **17%** |
| [Media Image](./media-image.md) | [`media_image`](/docs/shortcodes/media-elements/media-image) | ✅ 1 | 🟡 0 | ⚠️ 0 | ⚪ 9 | **10%** |
| [Image Box](./image-box.md) | [`image_box`](/docs/shortcodes/media-elements/image-box) | ✅ 11 | 🟡 0 | ⚠️ 5 | ⚪ 16 | **34%** |
| [Icon Box](./icon-box.md) | [`icon_box`](/docs/shortcodes/components/icon-box) | ✅ 13 | 🟡 0 | ⚠️ 3 | ⚪ 8 | **54%** |
| [Newsletter](./newsletter.md) | [`newsletter`](/docs/shortcodes/interactive-elements/newsletter) | ✅ 8 | 🟡 0 | ⚠️ 2 | ⚪ 10 | **40%** |
| [Text Block](./text-block.md) | [`text_block`](/docs/shortcodes/content-elements/text-block) | ✅ 5 | 🟡 0 | ⚠️ 4 | ⚪ 7 | **31%** |
| [Counter](./counter.md) | [`counter`](/docs/shortcodes/interactive-elements/counter) | ✅ 12 | 🟡 0 | ⚠️ 1 | ⚪ 4 | **71%** |
| [Feature List](./feature-list.md) | [`feature_list`](/docs/shortcodes/components/feature-list) | ✅ 9 | 🟡 0 | ⚠️ 0 | ⚪ 9 | **50%** |
| [Button](./button.md) | [`button`](/docs/shortcodes/components/button) | ✅ 9 | 🟡 0 | ⚠️ 2 | ⚪ 3 | **64%** |
| [Testimonials](./testimonials.md) | [`testimonials`](/docs/shortcodes/components/testimonials) | ✅ 3 | 🟡 0 | ⚠️ 0 | ⚪ 20 | **13%** |
| [Badge](./badge.md) | [`badge`](/docs/shortcodes/content-elements/badge) | ✅ 11 | 🟡 0 | ⚠️ 5 | ⚪ 14 | **37%** |
| [Accordion](./accordion.md) | [`accordion`](/docs/shortcodes/interactive-elements/accordion) | ✅ 10 | 🟡 0 | ⚠️ 8 | ⚪ 10 | **36%** |
| [Table](./table.md) | [`table`](/docs/shortcodes/content-elements/table) | ✅ 3 | 🟡 0 | ⚠️ 5 | ⚪ 13 | **14%** |

## Recognizers

The **complete** recognizer registry, in evaluation order (higher runs first). Linked rows have a full
per-option coverage page; the rest document the recognizer rule and its target shortcode.

| Priority | Recognizer | Matches when | Becomes | Fallback |
| --- | --- | --- | --- | --- |
| 99 | `code (universal fallback)` | Anything the converter can’t map to a more specific element — the genuinely bespoke markup. This is the **universal fallback**, so nothing is ever lost. | [Code Block](./code-block.md) → [`code_block`](/docs/shortcodes/content-elements/code-block) | — (this is the fallback). |
| 99 | `pricing_table` | A row of ≥2 price cards (each with a plan name, a currency-prefixed amount, and a feature list / CTA). | `pricing_table` | Degrades to a `card_grid` of columns, then `code_block`. |
| 98 | `steps` | An ordered how-it-works / process sequence (numbered badges + title + blurb per step). | `steps` | Degrades to `card_grid`, then `code_block`. |
| 97 | `timeline` | A vertical timeline (dated / connector-line entries down a spine). | `timeline` | Degrades to `card_grid`, then `code_block`. |
| 96 | `progress` | Labeled progress / skill bars (a track with a percentage-width fill). | `progress` | Degrades to `text_block`, then `code_block`. |
| 95 | `tabs` | A tabbed panel (a tab strip whose buttons toggle sibling panels). | `tabs` | Degrades to stacked sections, then `code_block`. |
| 94 | `lottie` | A `<lottie-player>` / `dotlottie` element or a `.json`/`.lottie` animation source. | `lottie` | Degrades to `media_image` (poster), then `code_block`. |
| 94 | `instagram_feed` | An Instagram feed embed / grid of Instagram post tiles. | `instagram` | Degrades to a `gallery`, then `code_block`. |
| 93 | `svg_draw` | An inline `<svg>` with strokeable paths meant to draw-on (line-art / signature / illustration). | `svg_draw` | Degrades to `media_image`, then `code_block`. |
| 92 | `testimonials` | A group of ≥2 quote/review cards (quote text + author, often an avatar or star rating). | `testimonials` | Degrades to `card_grid`, then `code_block`. |
| 91 | `image_grid` | A grid of ≥3 image tiles with no per-tile text (a photo gallery / masonry). Recovers a 25/50/25-style column ratio from the tile widths. | `gallery` | Degrades to stacked `media_image`, then `code_block`. |
| 91 | `counter_grid` | A stats row of ≥2 big-number + label pairs (animated counters). | `counter` | Degrades to `card_grid`, then `code_block`. |
| 90 | `card_grid` | A row of ≥2 feature cards (icon + title + copy). Each cell becomes an `icon_box`, carrying its per-card icon colour + badge. | `icon_box` | Degrades to stacked `text_block`s, then `code_block`. |
| 89 | `accordion` | An FAQ / disclosure list (clickable summary rows revealing collapsible panels). | `accordion` | Degrades to stacked heading + text, then `code_block`. |
| 88 | `table` | A real `<table>` (or an ARIA grid) of rows and cells. | `table` | Degrades to `code_block` (markup preserved). |
| 85 | `card_grid_cs` | A card grid detected from computed styles rather than utility classes (CSS-first sites). | `icon_box` | Degrades to stacked `text_block`s, then `code_block`. |
| 84 | `avatar_group` | A cluster of overlapping/adjacent avatar images (a people / social-proof row). | `avatar` | Degrades to a `gallery`, then `code_block`. |
| 82 | `layout_row` | A generic multi-column flex/grid row that no specialized recognizer claimed — split into native columns. | `row / columns` | Degrades to stacked blocks, then `code_block`. |
| 81 | `call_to_action` | A CTA band (heading + supporting line + one or more buttons on a distinct background). | `call_to_action` | Degrades to heading + button blocks, then `code_block`. |
| 80 | `heading` | A semantic heading tag (`<h1>`–`<h6>`), or a text node the heuristics score as a heading. Level ≤ 2 becomes a page **Title** (larger Display type); level ≥ 3 a section heading. | [Special Heading](./special-heading.md) → [`special_heading`](/docs/shortcodes/content-elements/special-heading) | Degrades to `text_block`, then `code_block`. |
| 79 | `text_list` | A `<ul>`/`<ol>` of text items (often check/tick-marked) — a feature / benefit list. | `feature_list` | Degrades to `text_block`, then `code_block`. |
| 76 | `badge` | A small pill/label chip (padded, rounded-full, short text — a tag or status badge). | `badge` | Degrades to `text_block`, then `code_block`. |
| 75 | `badge_verbatim` | A compound chip (inline + inner span) or an unusually-styled chip best preserved exactly as authored. | `code_block` | Kept verbatim (this IS the preservation path). |
| 70 | `instagram` | An Instagram feed embed — a grid of Instagram posts tied to a @username. | [Instagram](./instagram.md) → `instagram` | Degrades to `code_block`. |
| 70 | `pill` | A short eyebrow/kicker pill that sits above a heading — pulled in as the heading's overline where possible. | `special_heading (overline)` | Degrades to `text_block`, then `code_block`. |
| 68 | `wc_products` | A product grid on a WooCommerce-style page — repeating product cards (image, title, price, add-to-cart). | [WooCommerce Products](./wc-products.md) → `wc_products` | Degrades to `code_block`. |
| 66 | `posts` | A blog/post grid — repeating cards each with an image, title, and meta (a "latest articles" section). | [Posts](./posts.md) → [`posts`](/docs/shortcodes/components/posts) | Degrades to `code_block`. |
| 65 | `avatar` | An overlapping avatar stack — a row of small round profile images with a "+N" counter (a "trusted by" / "join N customers" cluster). | [Avatar](./avatar.md) → [`avatar`](/docs/shortcodes/components/avatar) | Degrades to `code_block`. |
| 64 | `gallery` | An image gallery / grid — three or more images in a repeating grid or collage (fewer than three falls back to code). | [Gallery](./gallery.md) → [`gallery`](/docs/shortcodes/media-elements/gallery) | Degrades to `code_block` (fewer than 3 images). |
| 62 | `video` | A `<video>` or a video embed (YouTube / Vimeo) that isn’t a full-screen section background. | [Media Video](./media-video.md) → [`media_video`](/docs/shortcodes/media-elements/media-video) | Degrades to `code_block`. |
| 60 | `image` | A content `<img>` (not a background image, an icon, or part of a decomposed composite). | [Media Image](./media-image.md) → [`media_image`](/docs/shortcodes/media-elements/media-image) | Degrades to `code_block`. |
| 60 | `button` | An `<a>`/`<button>` styled as a call-to-action (utility-class button). | `button` | Degrades to a text link inside `text_block`, then `code_block`. |
| 58 | `image_box` | An image paired with a title + text (a media card / feature block — image beside or above a heading and copy). | [Image Box](./image-box.md) → [`image_box`](/docs/shortcodes/media-elements/image-box) | Degrades to `code_block`. |
| 55 | `floating_card` | A floating badge/card overlaid on a hero image (an icon + title + subtitle chip), or an icon + title + text card. | [Icon Box](./icon-box.md) → [`icon_box`](/docs/shortcodes/components/icon-box) | Degrades to `code_block`. |
| 55 | `newsletter` | An email sign-up form — an email field + a subscribe button (often with a name field, on a call-to-action band). | [Newsletter](./newsletter.md) → [`newsletter`](/docs/shortcodes/interactive-elements/newsletter) | Degrades to `code_block`. |
| 55 | `button_cs` | A button detected from computed styles (padding + background + radius) rather than classes. | `button` | Degrades to a text link, then `code_block`. |
| 50 | `text` | A paragraph / body-copy block (typically `<p>` or a text container) that isn't a heading, button, or other recognized primitive. Short ALL-CAPS or eyebrow-classed text is refined to an **overline** instead. | [Text Block](./text-block.md) → [`text_block`](/docs/shortcodes/content-elements/text-block) | Degrades to `code_block`. |
| 50 | `counter` | A big animated stat — a number (often with a prefix/suffix like $ or %) shown as a "count-up" figure with a small label. | [Counter](./counter.md) → [`counter`](/docs/shortcodes/interactive-elements/counter) | Degrades to `code_block`. |
| 45 | `list` | A `<ul>` or `<ol>` list — bulleted, numbered, or an icon list. | [Feature List](./feature-list.md) → [`feature_list`](/docs/shortcodes/components/feature-list) | Degrades to `code_block` (an empty list). |
| 45 | `video` | A `<video>` / `<source>` (mp4/webm/ogv/mov) or a section whose background is a video. Backgrounds are sideloaded to the media library so the source stays editable in the Background → Video picker. | `media_video / section background video` | Degrades to a poster `media_image`, then `code_block`. |
| 40 | `button` | A `<button>`, or an `<a>` styled as a button (a `btn` / `button` / `cta` class, or button-like padding + fill). | [Button](./button.md) → [`button`](/docs/shortcodes/components/button) | Degrades to `code_block`. |
| 40 | `image` | An `<img>` / `<picture>` / a CSS `background-image` on a content block. | `media_image` | Degrades to `code_block`. |
| 35 | `testimonials` | A review / quote block — a customer quote with a name, role, avatar, and often a star rating; one or several as a set. | [Testimonials](./testimonials.md) → [`testimonials`](/docs/shortcodes/components/testimonials) | Degrades to `code_block`. |
| 35 | `image_wrapper` | An image wrapped in a link / figure / decorative frame — unwrapped to the image with its frame preserved. | `media_image` | Degrades to `code_block`. |
| 30 | `badge` | A small pill / chip / label — a short rounded element with sub-tag text, a leading/trailing icon, and an optional link (an eyebrow, a status badge, a "what’s new" chip). | [Badge](./badge.md) → [`badge`](/docs/shortcodes/content-elements/badge) | Degrades to `code_block`. |
| 30 | `image_overlay` | An image with text/controls overlaid (a captioned hero tile / media card). | `media_image + icon_box` | Degrades to stacked image + text, then `code_block`. |
| 25 | `accordion` | A toggle / disclosure group — a set of clickable headers each revealing a panel of content (an FAQ, a details list). | [Accordion](./accordion.md) → [`accordion`](/docs/shortcodes/interactive-elements/accordion) | Degrades to `code_block`. |
| 25 | `logo_strip` | A row of ≥2 brand marks — `<img>` logos, inline `<svg>` logos, OR icon-font + label pairs (as-seen-in / partner strip). | `logo_grid` | Degrades to a `gallery`, then `code_block`. |
| 20 | `table` | A `<table>` with at least one row and column. | [Table](./table.md) → [`table`](/docs/shortcodes/content-elements/table) | Degrades to `code_block`. |
