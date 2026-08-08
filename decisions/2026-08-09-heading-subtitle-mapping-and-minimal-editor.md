---
slug: heading-subtitle-mapping-and-minimal-editor
title: "The special-heading subtitle was almost never used by the converter — should we map a following paragraph into it, and should the field become a rich editor?"
authors: [jon]
tags: [conversion, shortcodes, option-types]
date: 2026-08-09
description: The deterministic Site Converter rarely populated the special_heading's subtitle, so a heading's intro line usually landed as a separate Text Block. Two questions — should a short paragraph right after a title fold into the subtitle, and should the subtitle field move from a plain text input to a rich editor. Decision — yes, fold a SHORT single intro paragraph into the subtitle (brevity-guarded so real body copy stays a Text Block), and make the field a MINIMAL wp-editor (a config variation of the existing wp-editor option type, inline in options.php — not a new option type and not a shared helper).
---

**The question:** In practice the `special_heading` **subtitle** was almost never used by the Site
Converter — a heading's intro line came through as a separate `text_block`. Two things to settle:
(1) should the converter **fold a paragraph right after a title into the subtitle**, and (2) should the
subtitle option stop being a single-line **`text`** field and become a **rich editor**?

<!-- truncate -->

## Context

A `special_heading` is an **overline → title → subtitle** stack with dedicated spacing, size and colour
controls per part. Its whole reason to exist is to keep a heading and its supporting line as **one
well-spaced, editable unit** — which also feeds the `element_spacing` control that governs the
title→subtitle gap (see the heading-spacing work that preceded this).

Yet on real conversions the subtitle stayed empty. Two causes:

- The subtitle detector (`suggest_mapping`: "first plain text after a title → subtitle") ran on the
  **top-level** mapping, but **decomposed content columns** (hero / CTA bands) have their blocks built
  *later* and never saw that pass. So a plain `title + intro paragraph` was only caught in the simplest
  sections; hero/CTA intros became standalone `text_block`s.
- The subtitle field was `type => 'text'` — a single-line input. Even if we mapped a paragraph in, an
  intro with an inline link or `<br>` couldn't be entered or edited faithfully. (The **render** was
  never the blocker: the view already emits `wp_kses_post( subtitle )` inside `<p class="heading-subtitle">`.)

## Options considered

**Mapping the paragraph:**

- *Never fold* (status quo) — always a separate Text Block. Safe, but the subtitle is dead weight and
  headings lose the single-unit spacing/editing benefit.
- *Fold any following paragraph* — maximal, but risks eating a real body paragraph (multi-sentence,
  lists, links) into a muted-styled subtitle line.
- *Fold only a SHORT single paragraph* (chosen) — a brevity guard: single `<p>`, no block-level
  structure (lists / sub-headings / tables / multiple paragraphs), under a ~two-sentence length cap.
  Longer / structured copy stays a Text Block, honouring the field's own intent ("keep it to a sentence
  or two; for longer copy use a Text Block").

**The field:**

- *Keep plain `text`* — brief by construction, but can't hold inline formatting or a mapped paragraph.
- *Full `wp-editor`* — faithful, but a kitchen-sink TinyMCE invites pasting whole articles into a
  subtitle, fighting the component's purpose and its muted styling.
- *Minimal `wp-editor`* (chosen) — the standard `wp-editor` option type with a restricted config:
  `media_buttons => false`, `wpautop => false`, `quicktags => false`, and a `tinymce` toolbar limited to
  `bold, italic, link, unlink`. Inline formatting only; no media, no block formats.

**How to build the minimal editor** — a new option type, a shared helper field, or inline config?

## Decision

1. **Fold a short intro paragraph into the subtitle, brevity-guarded.** A single `is_heading_subtitle()`
   guard (single `<p>`, no block-level tags, ≤ ~220 plain chars) gates the fold, applied in **both** the
   top-level detector *and* the decomposed-column section loop — so hero/CTA intros finally fold too.
   The subtitle keeps the paragraph's **inline HTML** (its outer `<p>` unwrapped, since the view
   re-wraps in `.heading-subtitle`), so links / `<strong>` / `<em>` survive.
2. **Make the subtitle a MINIMAL `wp-editor`** — a **config variation of the existing option type**, not
   a new option type. `FW_WP_Editor_Manager` already forwards `media_buttons` / `tinymce` / `quicktags` /
   `wpautop` to `wp_editor()`, so "minimal" is purely args. (Note: the manager strips the `teeny`
   shortcut, so the minimal look comes from the `tinymce.toolbar1` list, not `teeny`.)
3. **Inline the config in `options.php`, no shared helper.** Every other `wp-editor` usage in the
   codebase is inline; a helper here would be the outlier, and the config is a few readable lines.

## Why

- **A new option type was unwarranted** — the machinery to restrict the editor already exists; a new
  type would duplicate `wp-editor` for no behavioural gain and add a surface to maintain.
- **The brevity guard is the crux** — it's what lets us be aggressive about folding (fixing "almost
  never used") without regressing real body copy into a subtitle. It also encodes the component's stated
  intent in code, so the mapping and the field agree.
- **`wpautop => false` + an inline-only toolbar** avoids the one real render trap: a block `<p>` from the
  editor nesting invalidly inside the view's own `<p class="heading-subtitle">`.
- **Inline over a helper** was a deliberate readability call by the maintainer — direct visualisation in
  `options.php`, consistent with the existing `wp-editor` fields, over DRY.
- The change is **backward-compatible**: legacy plain-text subtitles still load in the editor, and the
  PHP (`Mapper`) and JS (`to-pages`) converter paths were kept in lock-step, covered by the FreshPaws
  golden fixture (the CTA band now converts to `special_heading + button`, its subtext folded in).
