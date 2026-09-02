---
slug: native-options-over-inline-styles
title: "Why author page JSON with native shortcode options instead of inline styles"
authors: [jon]
tags: [architecture, page-builder]
date: 2026-09-02
description: A demo steps list used an inline style on the ol for max-width, margin and colour even though text_block already has native max_width, spacing and text_color options — so the rule is settled to read the shortcode kit doc and use native options, reserving inline style for content that genuinely cannot be an option.
---

**The question:** A demo panel's numbered steps were emitted as
`<ol style="max-width:60ch;margin:0 auto 1.5rem;color:#3a4757;line-height:1.9">…</ol>` inside a
`text_block` — even though `text_block` already has native **max width**, **spacing (margin/padding)**,
**text colour**, **line-height** and **font-size** options. Why reach for inline CSS at all, and how do
we stop this recurring across sessions that build demos or sites?

<!-- truncate -->

## Context

Pages are authored as a page-builder JSON tree — each node is a shortcode with an `atts` object. It is
easy, when generating that tree in a build script, to drop a styled chunk of HTML into a `text_block`'s
WYSIWYG `text` and get the look "for free" with an inline `style=`. It renders fine. But it is the wrong
layer: the inline values bypass the theme (a hard-coded `#3a4757` instead of the theme's body colour),
can't be tuned in the builder afterwards, and drift from every other block on the page.

The native options were already there. `text_block` alone carries `max_width` (a readability
multi-picker whose `read` preset is ~65 characters **and centres the block**), `spacing`,
`text_color` / `link_color`, `font_size_preset`, `text_align`, `line_height`, `para_spacing`, `columns`,
`lead` and `dropcap`. The kit doc for `text_block` even states the rule outright — *"Prefer the Styling
atts over inline HTML styling so the block stays theme-consistent."* The inline `<ol style>` simply
hadn't consulted it.

## Options considered

- **Leave it — inline style renders the same.** True pixel-for-pixel, but it defeats the whole point of
  a themed page builder: the block can't be edited natively, ignores the palette, and teaches the wrong
  pattern to the next session that copies the helper.
- **Use the native options, and make "read the kit doc first" the standing rule.** The steps list
  becomes `max_width:'read'` + `line_height` + inherited theme colour — themed, editable, consistent.
  The cost is one habit: before emitting a shortcode's atts, open its
  `UnysonPlus-AI-Dev-Kit/docs/shortcodes/<name>.md` and use the real option.
- **A lint that rejects `style=` in generated page JSON.** Tempting, but too blunt — a handful of inline
  styles are legitimate (an inline SVG icon glyph; a deliberate visual *demo prop* like a card whose
  only job is to show an entrance animation). A rule with judgement beats a rule that fights the
  legitimate cases.

## Decision

**Author page JSON with native shortcode + Theme-Settings options; never hand-rolled inline `style=`
for layout, spacing, colour, size or alignment.** Before writing a node's atts, read that shortcode's
kit doc and use its options. Inline `style=` inside a `text_block`'s content is reserved for the narrow
cases that genuinely cannot be an option (an inline SVG icon; a demo prop). The convention is recorded
in two always-read places: the shared shortcodes reference
([`docs/shortcodes/README.md`](/ai-dev-kit)) for every page-building session, and the demos
`AGENTS.md` for demo builds specifically. The offending `setup()` helper was corrected to
`max_width:'read'` + native line-height, inheriting the theme's text colour.

## Why

A themed page builder's value *is* its options — width, spacing, colour and type flowing from the theme
so a page stays coherent and editable. An inline `style=` quietly opts a single block out of all of
that. Making "consult the kit doc, use the native option" the reflex keeps generated pages
indistinguishable from hand-built ones, and keeps the kit docs — not guesswork or inline CSS — the
source of truth for how a shortcode is configured.
