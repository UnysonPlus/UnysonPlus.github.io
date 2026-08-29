---
slug: page-webgl-background-selectable-tile
title: "Should the page-wide WebGL/scene options be one selectable background effect instead of a raw toggle + code fields?"
authors: [jon]
tags: [animation, extensions, architecture, page-builder]
date: 2026-08-30
description: "We built a page-wide Custom WebGL Background as a standalone on/off switch plus two code editors (Scene DOM + Scene code). It works, but it reads as three unrelated advanced fields bolted onto Page Settings. The question was whether to fold it into a single selectable effect. We made it a Custom (WebGL scene) tile in the page Background picker — page-only — mirroring the Preloader's Custom (code) style, because a picker tile makes it a first-class, discoverable choice while keeping raw admin code clearly distinct from the curated effects."
---

**The question:** The page-wide **Custom WebGL Background** shipped as an on/off **switch** plus two
code editors (**Scene DOM** and **Scene code (JS)**) sitting in Page Settings → Animations. It renders a
three.js scene behind the whole page. Should all of that instead be **one selectable effect** in the
Animation Engine — for pages only?

<!-- truncate -->

**Context.** We had just built the page-scene capability to clone an art-directed landing (a live
three.js temple carried behind the content, bound to page scroll). The controls ended up as: the page-wide
**Background Effect** picker (37 curated tiles), a **fixed-behind-content** toggle, and — separately — the
**Custom WebGL Background** switch + Scene DOM + Scene code. Conceptually these are all "what renders behind
the whole page," but the WebGL cluster read as three unrelated advanced fields, and a bare toggle is not how
the rest of the engine presents its effects (you *pick* an effect from tiles).

**Options considered.**

- **Leave it as a switch + two code fields.** Works, but undiscoverable and inconsistent — it doesn't feel
  like "an effect you choose," and the two code editors are always visible even when off.
- **Add a `custom_webgl` tile to the shared Background picker (bg_effect).** Tempting for unification, but
  that picker is **multi-instance / stackable** (petals + rain + fog…). A WebGL scene is **singular** — you
  never want twelve of them — so folding it into a stackable per-slot picker is a category mismatch, and it
  would also surface on the per-element/section Background card, where a full-viewport scene makes no sense.
- **A dedicated single-choice picker: None / Custom (WebGL scene).** A `multi-picker` whose tiles are
  *None* and *Custom (WebGL scene)*; choosing Custom reveals the Scene DOM + Scene code editors. Page-only.

**Decision.** The third option. The page WebGL background is now a **selectable tile** — `page_webgl` with a
`mode` picker (`none` / `custom`) — and the code editors live under the Custom tile's reveal. The standalone
enable switch is gone (selecting the tile *is* the enable). It is injected **only into the page picker**,
never the per-element/section Background card, and stays admin-gated (`unfiltered_html`). This is the exact
pattern the **Preloader** already uses (a *Custom (code)* style alongside the built-in styles).

**Why.**

- **A picker tile makes it first-class and discoverable** — "here is where I choose my page background, and
  *Custom* lets me paste a scene" — instead of an advanced switch a builder scrolls past.
- **Singular, not stackable.** Keeping it out of the multi-instance `bg_effect` card respects that a
  full-viewport scene is one thing, not a layer in a stack, and keeps the per-element picker clean.
- **Raw code stays clearly distinct from curated effects.** The 37 built-in backgrounds are safe, editable
  (color/speed pickers); a WebGL scene is admin-authored code — a black box. Its own tile that reveals code
  editors is honest about that difference while still living in the same "pick a background" control.
- **Consistency with the Preloader Custom style** means one mental model for "built-in options, plus a
  Custom code escape hatch," applied the same way across the engine.
- **Extensible.** The picker can later gain curated scene *presets* as additional tiles without changing the
  shape.

*Status: Accepted.* The render path and the `upw:scroll` hook are unchanged; only the option packaging moved.
