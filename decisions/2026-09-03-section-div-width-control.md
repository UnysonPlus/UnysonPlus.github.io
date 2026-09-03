---
slug: section-div-width-control
title: "Should a Section-tag Div be resizable, or always a full-width band?"
authors: [jon]
tags: [page-builder, shortcodes]
date: 2026-09-03
description: The uniform Div model offered a Width control on every box, including one tagged section — but a Section is a full-width band, so Width is now hidden on sections and Content Width is the tool for constraining a band's content.
---

**The question:** In the modern layout model every box is one primitive — a **Div** you tag
`section` / `div` / `article` / `aside` — so the **Width** control was offered on all of them,
including a Div tagged `<section>`. That let you make a *section* 5/6 wide. The classic Section
never could. Is a resizable section correct, or should a Section always be a full-width band?

<!-- truncate -->

## Context

A `<section>` is the page's **band** primitive — the full-bleed horizontal region you start a layout
with. In the uniform Div model it's just a Div with the `section` tag, and every Div exposes a
per-device **Width** (twelfths / fifths / content-sizing / custom) plus a **Content Width**
(constrain + centre the content inside a full-width band).

The two controls do very different things:

- **Width** sizes the box *as a flex item* — it makes the **whole band** narrower **and
  left-aligned** (it's a fraction of the parent, hugging the start edge).
- **Content Width** keeps the band **full-width** and centres its **content** to a max-width — the
  band-with-a-container pattern. A `section`-tag Div already does this automatically at the site
  width.

So a fractional Width on a section produces a narrow, off-centre band — almost never what anyone
intends, and something the classic Section (always full-width, container inside) never allowed. The
capability came from the uniform model, not from a deliberate "sections should be resizable" choice.

## Options considered

- **Leave Width on sections (fully uniform).** Every Div behaves identically — power-user flexible.
  But it makes an accidental narrow/left-aligned band a single mis-click away, and it muddies the
  "section = band" mental model that the whole modern layout system is trying to teach.
- **Hide Width only on *root* sections.** A top-level band can't be sized; a section nested inside a
  flex row keeps Width (there it's a legit flex item). More flexible, but "does this control exist?"
  now depends on where the section sits — less predictable, and nesting a `<section>` inside a flex
  row is itself an unusual thing to do.
- **Hide Width on all sections (chosen).** A `section`-tag Div is always full-width. Width is hidden
  in the editor and any stored Width is ignored on the front end; Content Width is the tool for
  constraining a band's content. Width stays on `div` / `article` / `aside`, which are genuine
  columns / flex items.

## Decision

**Hide the Width control whenever the Div's tag is `section`, and ignore any stored Width for a
section on render.** A Section is always a full-width band, matching the classic Section. To make a
band's content narrower, use **Content Width** (which keeps the band full-width and centres the
content). `div` / `article` / `aside` Divs keep Width — they're the columns and flex items.

Implementation: the front-end view neutralises `width` when `tag === 'section'` (one guard, so no
`fw-span` class and no scoped width rule are emitted); the editor skips mounting the width stepper
for a section and forces the canvas preview to full-width.

## Why

- **Semantics over uniformity.** The point of the section tag is "this is a band." A control that
  contradicts that — turning the band into a narrow left-aligned strip — is a footgun, not a feature.
  The one place a fractional width *is* meaningful (a box in a row) is exactly what `div` is for.
- **There's already a right tool.** Content Width covers the only sane reason to want a "narrower"
  section (a contained, centred content column in a full-bleed band), and does it correctly. Two
  controls that look similar but behave oppositely is worse than one clear one.
- **Consistency with the classic Section** keeps the two models interchangeable in users' heads and
  avoids "why did my section go narrow and slide left?" support cases.
