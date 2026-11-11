---
slug: exit-animation-its-own-card
title: "Exit animations: why a separate card that starts on \"Reverse the entrance\", and why exits are entrances played backwards"
authors: [jon]
tags: [animation, shortcodes, motion-gallery, admin-ui, architecture]
date: 2026-11-11
description: Elements could animate in but never out, and on the Motion Gallery the Animations tab's per-item entrance only worked on one design. Decision — an Exit Animation card of its own beside the Entrance (starting on "Reverse the entrance"), every exit built as an entrance keyframe run backwards, timed from the element's middle; and the gallery's entrance and exit cascade on each photo's inner layer on every design that shows photo cards.
---

**The question:** The Motion Gallery designs had no entrance unless someone switched one on, and nothing anywhere had an exit. Should exits be a setting inside the Entrance card, or their own card? What if someone wants a different animation on the way out? And can the 3D galleries, whose cards move every frame, take entrance and exit animations at all?

<!-- truncate -->

## Context

- Every element has an **Entrance Animation** on its Animations tab (Animate.css, 56 effects). Its *Sequence Items* switch promised a one-by-one cascade on collections "including the 3D gallery", but on the Motion Gallery it only worked on Mosaic Marquee. The other designs skipped it, because they rewrite each card's transform every frame and an animation on the card would fight that.
- The Motion Gallery's own Style-tab **Entrance** already played on each photo's **inner layer** (`.tdg__inner`), the one layer the designs never pose. That layer composes with any 3D motion.
- There was no exit anywhere, only *Replay On Scroll*, which re-plays the entrance when the element comes back into view.
- Animate.css ships out-effects as separate keyframes, and none were bundled.

## Options considered

1. **An exit setting inside the Entrance card** ("When it leaves: Stay / Reverse / Exit effect"). Exits pair with entrances, so they can't drift apart. But it's hidden: a user scanning the Animations tab never sees that exits exist.
2. **A separate Exit Animation card** in the tab, beside the Entrance. Visible and easy to understand, and it can hold a completely different effect, but it has to stay in step with the entrance.
3. **Ship the Animate.css out-effects** (about 40 more CSS partials) and map each exit to its keyframes.
4. **Build every exit as an entrance played backwards** (`animation-direction: reverse` on the entrance's own keyframes): Fade In Up run backwards is Fade Out Down.

For the 3D galleries: leave them whole-element (the code's previous choice), or animate each photo's inner layer.

## Decision

- **A separate Exit Animation card** (option 2), under its own **Exit** filter. It **starts on "Reverse the entrance"**, which mirrors the entrance and follows it if it changes, so the common case needs no choice at all. Its picker also offers **43 exits** for a different way out. The Entrance card gets **"+ Add a matching exit"**.
- **Every exit is an entrance played backwards** (option 4). Up and Down swap, Left and Right keep their names; Hinge, already an exit, plays forwards. No new CSS ships, and an exit always matches the entrances. The picker tiles are the entrance tiles run backwards too.
- **Timing comes from the element's middle.** The exit plays when the middle crosses 30% of the screen (scrolling down) or 80% (scrolling up), and the entrance plays again once it's back in the central band. An element only exits after it has been on screen.
- **The Motion Gallery cascades both on each photo's inner layer, on every design that shows photo cards**, while the design keeps moving. One-photo designs, Photo Scatter and pinned Scroll-scrub stay whole-element. Phone Lineup's 3D bodies copy their screen's computed animation.
- **New galleries start with an entrance through the builder palette, not through an option default.** The page builder gives an element dropped from the palette its shortcode's `new_atts`.

## Why

- **Visible beats tidy.** The user's point: people understand what they can see in the Animations tab. A card makes exits discoverable. Starting it on "Reverse the entrance" keeps the pairing that option 1 offered, without hiding the feature.
- **Reversing keeps it light and consistent.** Shipping out-effects would add a second set of keyframes that look subtly different from the entrances. Reversing the entrance's own keyframes needs one CSS rule and can never look mismatched.
- **The middle, not the edges.** The first build timed exits from the element's edges. On a real page the exit then played under the sticky header, or after a gallery's photos had already left (its box has empty stage above and below the photos). Measuring the middle makes the exit visible on short headings and tall galleries alike.
- **The inner layer was already the answer for 3D.** A live test put a real Animations-tab Zoom In on a rotating ring, a 130-photo sphere and an orbit: each photo zoomed in on its own while the design kept moving. "3D can't take entrance animations" was only true of the card layer.
- **Option defaults are merged at render.** Making Zoom In the gallery's option default turned it on for every saved gallery without an `animation` att: demo pages, importers, the AI Dev Kit and the Site Converter. `new_atts` changes only new elements, so existing pages stay exactly as they were.

**Found on the way:** the entrance's *Animation Delay* and each item's *Stagger* had never applied. Animate.css reads `--animate-delay` only through its delay classes, and the variable was set without them. The runtime now sets a real `animation-delay`.
