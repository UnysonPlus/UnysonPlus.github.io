---
slug: keep-section-background-inline-not-page-css
title: "The Section now routes Min Height, Container Width and vertical-align to stylesheets — should the background (color/gradient/image/overlay) move to the per-page page-{id}.css too, or stay an inline style?"
authors: [jon]
tags: [architecture, page-builder, shortcodes, performance]
date: 2026-08-11
description: "We moved the Section's Min Height (→ predefined .section--minh-* classes), Container Width and vertical-align out of inline styles and into stylesheets, leaving the background (color/gradient/image/overlay) as the last inline style=. Decision — keep the background inline: unlike the reusable/enumerable values, it is arbitrary, unique per section, and performance-sensitive (a hero background inline paints without waiting on a render-blocking stylesheet), so relocating it to page-{id}.css would hurt LCP for zero byte savings and break live-preview. The full placement rule: fixed enum → class; library/reusable → page file; genuinely per-instance per-URL appearance → inline."
---

**The question.** We just moved the Section shortcode's per-instance styling out of inline `style=`
and into stylesheets: **Min Height** (a fixed enum) became predefined `.section--minh-{40|60|80|100}`
classes, **Container Width** (a user-extensible named-width library) and the **vertical-align** flex
became `.u{hash}`-scoped rules in the per-page `page-{id}.css`. The **background**
(color / gradient / image / overlay) is now the *only* thing the section still prints as an inline
`style="background-…"`. Should it move to `page-{id}.css` as well — for a fully inline-free markup —
or stay inline?

<!-- truncate -->

**Context.** The Section routes each setting to the leanest layer that fits it: a fixed-enum value
becomes a predefined utility class; a user-library or otherwise-reusable value becomes a
`.u{hash}`-scoped rule written into the per-page `page-{id}.css` (aggregated by `dynamic-css.php`);
genuinely per-instance appearance stays inline. `sc_bg_pro_style()` builds the background string —
`background-color`, then a stacked `background-image` (overlay tint over the image `url()` over a base
gradient), plus `background-position` / `repeat` / `attachment` / `size` when an image is present — and
the view prints it on the `<section>`'s `style`. Because the scope class and the aggregator already
exist, moving it is mechanically trivial: emit a `.u{hash}{background-…}` rule and drop the inline
attribute. So "is it possible?" is *yes* — the real question is *should we*.

**Options considered.**

- **Move the background to `page-{id}.css`** (a fully inline-free `<section>`). Consistent with the
  other section styling and satisfying if the goal is "zero inline styles." But the background is a
  per-instance, per-URL value with **no reuse**, so relocating it dedupes nothing — it just moves
  ~200 bytes from the HTML into a CSS file and *adds a file dependency*. Worse, it puts the **hero
  background behind a render-blocking stylesheet**: an inline background is available the moment the
  HTML parses, whereas a background in `page-{id}.css` can't paint until that file downloads and
  parses — landing squarely in front of the largest paint. And the front-end builder, which mutates
  the inline `style` live as you drag the Background controls, would need a file-regen round-trip.
- **Keep the background inline** (status quo). One inline `style=` remains on sections that carry a
  background, but it is the *right* place: per-instance, immediately available, WYSIWYG-friendly, and
  best for LCP.

**Decision.** **Keep the background inline.** The Min Height / Container Width / vertical-align cleanup
was worth doing because those were *reusable, small-vocabulary* values that had been *wrongly* inlined
(a preset class, or one library value edited in a single place). The background is *arbitrary, unique
per section, and performance-sensitive* — the textbook case for the inline bucket in our own placement
rule, not a lazy holdout.

**Why.** The line is drawn by the value's **nature**, not by a blanket "no inline" aesthetic:

- **Reuse** decides *class vs. file*: a value shared across sections (a variant, a named width) earns
  a shared class or one shared rule; a value unique to one section earns neither.
- **Performance** decides *inline vs. file* within the unique bucket: a hero background is usually the
  LCP element, and inline paints it without waiting on a stylesheet. Moving it to `page-{id}.css` adds
  a render-blocking dependency for **zero** byte savings, and re-invalidates the whole per-page file on
  any single background edit.
- **Editability** favors inline: the live editor updates `style` directly; a file-based background
  needs regeneration to preview.

So the placement rule, stated in full: **fixed enum → predefined class; user-library or
arbitrary-but-reusable → a `.u{hash}` rule in `page-{id}.css`; genuinely per-instance, per-URL,
performance-sensitive appearance (the background) → inline `style=`.** Background is the one value the
rule deliberately *sends* to inline — which is why it was the last thing standing after the cleanup,
and why it should stay there.

*(Related: [container widths as a converter-populated preset family](/decisions/container-widths-as-a-converter-populated-preset-family)
and the [never-drop CSS placement rule](/decisions/never-drop-css-placement-rule).)*
