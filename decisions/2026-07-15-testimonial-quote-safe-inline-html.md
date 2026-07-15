---
slug: testimonial-quote-safe-inline-html
title: "Why the testimonial quote allows safe inline HTML, not a rich editor"
authors: [jon]
tags: [option-types, shortcodes]
date: 2026-07-15
description: I asked whether the testimonial Quote field should become a full wp_editor so people can format quotes. The choice was a full WYSIWYG versus keeping a plain textarea rendered through a wp_kses inline subset. We kept the textarea + a safe subset (bold / italic / link / line-break), because a full editor invites block-level markup that breaks each design's typography and forces a rendering change across every template.
---

**The question:** Would it be better to make the testimonial Quote field a `wp_editor` (a full visual
editor) so authors can format their quotes?

<!-- truncate -->

## Context

The Quote is currently a plain `textarea`, and every testimonial design renders it with `esc_html()`.
The prompt was reasonable: give authors formatting. But a testimonial is a short quote, and the whole
design system leans on *controlled* typography — each design sets its own quote size and line-height.

There's also a rendering trap. Switching the field to `wp_editor` makes the saved value **HTML**
(`<p>…</p>`, `<strong>`, etc.). The moment that happens, `esc_html()` prints the tags as literal text —
so a "just change the field type" edit silently forces a change to the escaping in *every* design
template plus the shared card renderer.

## Options considered

- **Full `wp_editor`.** Most formatting freedom. But it's a TinyMCE instance per repeatable row, and it
  invites headings, lists, font sizes and colours pasted from Word — which blow out the marquee card, the
  split slide, the coverflow tile. And it forces the escaping change above across all templates.
- **Keep the textarea, leave it plain.** Zero risk, but no emphasis, links, or line breaks at all.
- **Keep the textarea, render a safe inline subset.** Run the value through `wp_kses` allowing only
  `<strong>`, `<em>`, `<a>`, `<br>` (newlines → `<br>`), stripping everything block-level. Authors get the
  only formatting a quote realistically needs; typography stays protected; no editor weight.

## Decision

**Textarea + a `wp_kses` inline subset.** A shared `sc_testimonial_quote_html()` helper renders the quote
with a tight allowlist (bold / italic / link / line-break) and is used in place of `esc_html()` across all
designs. No `wp_editor`.

## Why

Rich text is the wrong fit for a short endorsement: block-level content is almost never wanted, and when it
*is* pasted it fights the design's controlled type — which is a feature, not a limitation. The safe-subset
route gives the realistic 90% (emphasise a phrase, add a link) without a TinyMCE per row and without the
tag-leakage that a naïve field swap would cause. The one honest cost, noted in the changelog: a pre-existing
quote that contained a literal `<` now gets that fragment sanitised rather than shown verbatim — rare for
testimonials, and worth it for XSS-safe, typography-safe output everywhere.
