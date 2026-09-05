---
slug: motion-gallery-rename
title: "\"3D Gallery\" → \"Motion Gallery\": rename what users see, keep the internal identifiers"
authors: [jon]
tags: [naming, shortcodes, animation-engine]
date: 2026-09-06
description: "The gallery element shipped as \"3D Gallery\", but only some of its design families are 3D — the roadmap adds Grid, Reveal & Wipe, Spotlight & Focus, Film Strip and more, none of them 3D. The one property every design shares is that it animates, so \"3D Gallery\" was set to become a misnomer the moment a non-3D design landed. Decision (pre-launch): rename the user-facing element to \"Motion Gallery\", but DON'T rename the internal folder / tag / CSS prefix / Gutenberg block — that's 1000+ references across a block with build artifacts, a preview option-type, the playground and demos, and Model Viewer already sets the precedent that a display name need not match its internal ids. So the rename is a display-wording sweep, not an identifier refactor."
---

**The question:** the gallery element launched under the name **"3D Gallery"**. But is that the right name? Only some of its designs are actually 3D — and the roadmap makes that gap worse, not better. Should we rename it before launch, and if so, how far does the rename go — just the label, or the folder / tag / CSS / block underneath too?

<!-- truncate -->

## Context

The element is not a "3D gallery" — it's a **gallery-design system** with families, and only some are 3D:

- **3D & Perspective** (ships now): Carousel Ring, Panorama Wall, Card Sphere, Orbit Globe, Card Tunnel, Spiral Stream, Depth Stack… — genuinely 3D.
- **Stack & Scatter**: Photo Scatter, Card Stack — 2.5D at most.
- **Devices & Screens**: Device Cycler — a device mockup, not 3D.
- **Coming**: **Grid**, **Isometric**, **Reveal & Wipe**, **Spotlight & Focus**, plus Film Strip / Focus Slider / Mosaic Marquee — several flatly **not** 3D.

So the moment a visitor picks "Grid" or "Reveal & Wipe" inside a thing called **3D Gallery**, the name is lying. The one property *every* design shares is that it **animates**.

The second question — how deep to take the rename — matters here because the element is large and old, the opposite of the tiny brand-new Scroll Choreography element (whose folder/tag we *did* align to its title). A blast-radius grep found **1048 references across 45+ files**: the shortcode, a **~500-use `tdg__` CSS prefix**, a dedicated `gallery-3d-preview` option-type, **a Gutenberg block** (`blocks/gallery-3d/` with compiled build artifacts), registrations, the build manifest, the playground and the demos. And the `gallery_3d` tag + the block name live in saved content.

## Options considered

**What to call it**

- **Keep "3D Gallery."** Accurate only for the family that ships today; a guaranteed future misnomer. Rejected.
- **"Animated Gallery."** Clear, literal umbrella. Good, but a touch plain.
- **"Motion Gallery."** Same accurate umbrella, more premium ring for a design-forward builder. *Chosen.*

**How far to rename**

- **Display name only, keep internal ids.** Rename the title / description / builder strings / docs / demo wording to "Motion Gallery"; leave `gallery-3d` / `gallery_3d` / `tdg__` / the block untouched. *Chosen.*
- **Full internal rename** (folder + tag + `tdg__` + block + preview option-type + build artifacts + playground + demos). ~1000 edits, a Gutenberg-block rebuild, and it orphans the `gallery_3d` tag + block name in every saved page. High risk, zero user-visible benefit. Rejected.

## Decision

- **User-facing name → "Motion Gallery."** Builder title, description, preview label, the "coming soon" copy, CATALOG, the Dev Kit doc, the demos (menu, home card, page headings) and the playground all now read "Motion Gallery." Technical "3D" wording that describes actual geometry (3D scene, 3D driver, 3D Curve, Pure CSS 3D) is left alone — it's accurate.
- **Internal identifiers unchanged.** `gallery-3d` folder, `gallery_3d` tag, `tdg__` CSS prefix, the `gallery-3d-preview` option-type and the Gutenberg block keep their names. Saved pages and content are unaffected.

## Why

This is the mirror image of the Scroll Choreography naming call, and deliberately so. There, the element was brand-new and ~10 references, so aligning folder + tag + title to one name was free and worth it. Here the element is mature and 1000+ references deep, spanning a block with build artifacts and content-embedded identifiers — so forcing internal consistency would be a large, risky refactor that no user would ever see. The codebase already blesses the split: **Model Viewer's** folder is `model-viewer` yet its CSS block is `fw-model`. The principle: **align internal ids to the display name when it's cheap and the element is young; once an element is large and its ids are load-bearing in saved content and build output, rename only what users read.**

(Unrelated but done in the same pass: the code carried a third company's product name in developer comments — the reference system the designs were modelled on. All of it was removed; only neutral wording ("the reference design") remains.)
