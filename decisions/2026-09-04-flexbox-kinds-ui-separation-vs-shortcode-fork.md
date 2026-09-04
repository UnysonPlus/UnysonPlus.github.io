---
slug: flexbox-kinds-ui-separation-vs-shortcode-fork
title: "Why the Flexbox stays one shortcode, split only in the UI"
authors: [jon]
tags: [architecture, page-builder, shortcodes, accessibility]
date: 2026-09-04
description: The Flexbox modal felt packed because one element served four different jobs (Section band, Flex, Grid, Block) toggled by an html_tag and a display that nobody actually switches after drop — so the question was whether to fork it into separate shortcodes per kind, and the decision is to keep one shortcode and renderer while separating the kinds in the UI (distinct palette tiles plus a per-kind-conditioned modal), because a code fork would triplicate ~600 lines of shared layout logic that would inevitably drift.
---

**The question:** The Flexbox options modal feels disorganized — a single element renders a Section
band, a Flex row, a Grid, or a plain Block depending on an **HTML Tag** and a **Display** select, and the
one modal shows *every* option for *every* kind. Since nobody switches a root section to a div, or a flex
to a grid, after dropping it — should we **split the Flexbox into separate shortcodes / item types per
kind** so each has its own clean, tailored option set?

<!-- truncate -->

## Context

The Flexbox is one page-builder element that outputs a chosen semantic tag (`div` / `section` / …) with a
chosen CSS `display` (`flex` / `grid` / `block`), and lets its children lay out directly — no
Section → Row → Column scaffolding. Recent work added full section-parity (shape dividers, background
pattern, section variant, full-width band) so a Flexbox `<section>` can be a real hero band.

The side effect: the modal now carries band-only decoration, flex-only flow controls, grid-only track
controls, and child-in-parent placement controls all at once, hidden from each other with reactive JS.
The user's framing was apt — it was like a select whose every choice's options are all shown at once,
instead of revealing only the ones that apply to the current choice. And two observations sharpened it:
the **HTML Tag** is effectively chosen at drop time (a root section is never re-tagged to a div), and so
is **Display** (you drop a "Grid", you don't drop a "Flex" and convert it).

## Options considered

- **Fork into separate shortcodes / item types** (`flexbox_section`, `flexbox_flex`, `flexbox_grid`).
  Each gets its own `options.php`, builder class, and — critically — its own copy of the ~600-line
  `view.php` renderer. *Pro:* the cleanest possible separation, and almost no conditioning JS. *Con:* the
  renderer is shared logic (the width/grid-span mapping, the `{base,md,lg}` responsive migration, the
  parent-grid detection, the divider port). Forking it means every future fix lands three or four times
  and the copies **will** drift. This is a maintenance trap that compounds over time.
- **One modal, keep conditioning.** Least work, but the modal stays conceptually one packed thing, which
  is the complaint.
- **UI separation on a shared shortcode (chosen).** Keep one shortcode + one renderer, but present the
  kinds as distinct **palette tiles** (Section / Flexbox / Grid / Block — the builder already supports
  multiple tiles for one item type), each of which drops the element pre-set to that kind. The modal then
  reveals only that kind's option groups. The Display / Tag selects stay **visible but secondary**, so an
  in-place flex→grid conversion is still possible (a genuinely-used escape hatch) without forcing a
  rebuild-and-re-drag of every child.

## Decision

Keep the Flexbox as **one shortcode and one renderer**, and separate the kinds **in the UI only**:
distinct palette tiles plus a modal that conditionally shows each kind's groups. Two independent axes
drive the reveal — **Display** (Grid tracks vs. Flex flow vs. the shared Gap/Justify/Align "Arrange"
group, hidden entirely for Block) and **HTML Tag** (band-only Section Style / Shape Dividers /
Full-Width Band for `section`; the child-in-parent Placement group for everything *but* `section`).
The Display and Tag selects remain visible but demoted. Separately, the page-content Tag list is trimmed
to `div / section / article / aside` — the `header` / `footer` / `nav` / `main` landmarks belong to the
Theme / Header-Footer Builder, and duplicating them inside page-body content produces invalid,
a11y-hostile markup (they stay available in the Theme Builder editors, where site chrome is authored).

## Why

The user's instinct — per-kind clarity, distinct entry points — is right, and it matches how Elementor
(Container), Bricks (Section/Block/Div) and Divi present these. But "separate the tools" is a *UI* need,
not a *code* need: a Flexbox that is flex vs. grid vs. block is the same element with a different
`display`, and section vs. div is the same element with a different tag. Forking the code to express a
UI distinction would triplicate shared logic for no runtime benefit and a large, ongoing maintenance
cost. The palette already offers Section / Flexbox / Grid tiles, so the separation the user wanted mostly
existed already at the entry-point level; the missing piece was a modal that reads as tailored per kind,
which conditioning delivers on the shared element. Keeping the selects visible preserves in-place
conversion (which, unlike re-tagging a root section, people *do* use for flex↔grid) at near-zero cost.

Reorganizing for the reveal also surfaced a real bug: **Gap / Justify / Align** had been nested inside
the flex-only group, so a **Grid could not reach Gap at all** from the modal. Splitting the shared
arrangement controls into their own group (shown for Flex *or* Grid) fixed that independently of the
separation decision.

*Status: Accepted.*
