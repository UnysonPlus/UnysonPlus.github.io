---
slug: editable-elements-over-baked-cinematic-fidelity
title: "Replicating a cinematic site: live, user-replaceable elements over baked-in fidelity"
authors: [jon]
tags: [architecture, conversion, shortcodes]
date: 2026-07-24
description: "When rebuilding a heavily scroll-animated reference site (poly.app) as a UnysonPlus demo, there were two ways to hit the same look: bake the whole camera ride into one pre-rendered video/frame sequence that scrubs with scroll (max pixel fidelity, but the content is frozen in the footage), or build every card, device screen, image and heading as a LIVE page-builder element animated over an optional decorative backdrop (slightly less pixel-perfect, but every element stays editable/replaceable). We chose live elements. The whole reason people reach for UnysonPlus is to capture a site for inspiration and then easily add or swap any element in the builder — so content must never be locked inside baked footage. The only baked layer allowed is the decorative backdrop, and even that stays an uploadable option."
---

**The question:** to make the Poly demo's animation flow match poly.app, do we bake the
continuous desk "camera ride" into one pre-rendered video / frame sequence that scrubs with
scroll (the way poly.app itself does it), or do we keep every card, tablet screen, image and
line of copy as a **live page-builder element** and drive the camera moves with scroll
animation over an optional decorative backdrop?

<!-- truncate -->

## Context

poly.app achieves its look by pre-rendering the entire warm-desk journey as 3D footage: the
scattered file cards, the film strip, the tablet, the camera pan — all of it is baked into the
video, and the only live DOM on the page is the headings and the search box. That is why it
looks flawless and also why, as a *product* to hand a user, it would be a dead end: you cannot
replace a card, swap the tablet's screenshot, or change a photo, because none of those are
elements — they are pixels in a movie.

That collides head-on with the reason UnysonPlus exists. The pitch is: **capture a site you
like for inspiration, then add or replace any element right in the page builder.** A user
converts a reference site as a starting point and then makes it theirs, element by element,
entirely through the builder UI — the same principle already written into the "every
media/content element must be user-replaceable" rule and the converter's whole purpose.

A practical fact sealed it: we only have pre-rendered sequences for the hero (421 frames) and
the outro (215 frames). There is no baked footage for the long middle desk journey, so its
content was always going to be live elements regardless.

## Options considered

- **Bake the desk journey as one scrubbed backdrop video/sequence** (max fidelity). The camera
  pan, the scatter, the card rotations all come for free because they are in the footage. But
  the content is frozen: no swapping cards, screenshots, or copy in the builder. It turns the
  "starter you make your own" into a "video you cannot touch." Rejected — it breaks the core
  value even though it looks best.
- **All content as live page-builder elements** (galleries, image boxes, device mockups, text)
  animated with the Animation Engine over an optional decorative backdrop. Slightly less
  pixel-perfect than pre-rendered 3D, and it means building real scene-galleries (a scroll-driven
  scatter→organize morph, a device view-mode cycler, directional scene transitions) instead of
  getting them free from footage — but every element stays editable and replaceable. Chosen.

## Decision

**Content is always live and user-replaceable; only the decorative backdrop may be baked, and
even it stays an uploadable option.** We replicate the *motion* (the pinned scene, the beats
that cross-fade and pan, the scatter→organize, the device screen cycling) using live builder
elements plus the scrollytelling Stage, not by freezing the content into a rendered movie. The
new capabilities this requires — scene-based ("pinned Stage + beats") structure, new
scene-galleries, and directional/whoosh transitions — get built as real, editable framework
features rather than shortcuts baked into media.

## Why

Fidelity is worth nothing if the user can't edit the result. The one durable advantage
UnysonPlus has over "just export the design as a video" is that everything on the page is a real
element the user owns and can change. Chasing pixel-perfect parity by baking the camera ride
would spend that advantage to win a screenshot contest. Building the motion out of live elements
costs more engineering up front, but it is reusable across every future site (not just Poly),
it keeps the convert→customize promise intact, and it is what turns "capture for inspiration"
into "capture, then make it yours." When fidelity and editability conflict, editability wins.
