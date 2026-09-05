---
slug: image-scroll-choreography-placement-and-tabs
title: "A new scroll-choreographed IMAGE element: where it lives, what we call it, and which builder tabs an invisible overlay should expose"
authors: [jon]
tags: [architecture, naming, shortcodes]
date: 2026-09-05
description: "The Model Viewer's Scroll Choreography (pin a fixed layer, keyframe position/scale/rotation/opacity to scroll, with an authoring guide) was so useful people wanted it for flat images too. We built that as a new element — but three questions followed: does a self-contained element that reuses the choreography pattern belong in the shortcodes extension (grouped by dependency, always-on) or in the Animation Engine next to Model Viewer (grouped by concept)? Should it be called 'Scroll Choreography' or 'Image Scroll Choreography'? And which of the standard Styling/Animation/Advanced tabs make sense on an element that renders as an invisible, zero-height, fixed overlay? Decisions: Animation Engine (concept over dependency), 'Image Scroll Choreography' (qualify the namespace), and Advanced-only (skip the tabs that have nothing to act on)."
---

**The question:** the Model Viewer's **Scroll Choreography** — pin the element in a fixed, transparent, z-indexed layer and drive its position, scale, rotation and opacity from the page scroll via keyframes, with an opt-in authoring guide — turned out to be the exact "kage-style" foreground effect people wanted for **flat images**, not just 3D models. So we ported the engine to a new image element. That raised three placement/shape decisions: **(1)** it's self-contained (its own runtime, no hard Animation-Engine dependency) and its closest *structural* sibling (Parallax Scene) lives in the **shortcodes** extension — so does it go there, or in the **Animation Engine** next to Model Viewer, its closest *conceptual* sibling? **(2)** Is "Scroll Choreography" the right element name, or should it be qualified? **(3)** The standard builder adds Styling / Animation / Advanced tabs only when a shortcode opts in — which of them make sense here?

<!-- truncate -->

## Context

The element renders as a **zero-height anchor** (the runtime measures scroll travel from it) plus one **`position:fixed`, `pointer-events:none` foreground layer** that page sections scroll under. It holds a set of image layers; each has a corner anchor and an Appear → Hold → Exit choreography keyed to a shared scroll timeline. The whole thing is deliberately self-contained — its own CSS/JS runtime, so it works whether or not the Animation Engine extension is active, exactly like Parallax Scene.

Two facts pull in opposite directions on placement:

- **By dependency**, it belongs with the other self-contained scroll-imagery shortcodes (Parallax Scene) in the **shortcodes** extension, which is always active.
- **By concept**, it *is* the Model Viewer's Scroll Choreography for flat images — same fixed-layer + keyframe + guide pattern, minus the 3D camera — and Model Viewer lives in the **Animation Engine** (which ships inactive by default, activated in Extensions).

## Options considered

**1. Where it lives**

- **Shortcodes extension (grouped by dependency).** Always available; matches Parallax Scene's precedent; no gate. But it separates the two scroll-choreography elements (this one and Model Viewer) into different extensions, so a user exploring "scroll choreography" wouldn't find them together, and the vocabulary parallel is lost.
- **Animation Engine (grouped by concept).** Sits next to Model Viewer; the two choreography elements are discovered together; the name parallels Model Viewer's "Scroll Choreography" tab. Cost: it's gated behind activating the Animation Engine — but that's identical to Model Viewer, and a user who wants scroll choreography is already in AE territory. *Chosen.*

**2. What we call it**

- **"Scroll Choreography."** Short, but generic and namespace-greedy — it collides conceptually with Model Viewer's feature of the same name and leaves no room to name a future non-image choreography element.
- **"Image Scroll Choreography."** Qualifies *what* it choreographs, parallels Model Viewer's "Scroll Choreography" while disambiguating, and future-proofs the namespace. Slightly longer. *Chosen.* (The internal shortcode tag stays `scroll_choreo` — tag ≠ display title, so nothing saved in existing pages breaks.)

**3. Which builder tabs**

The framework adds standard tabs only when a shortcode defines them, so this is a per-element choice:

- **Styling** (background / padding / image-style presets): acts on the element's *box*. This element has no box — it's an invisible, zero-height anchor whose visible content is a separate fixed layer. Background/padding would do nothing (or, worse, give the anchor height and shift the scroll measurement). **Omitted.**
- **Animation** (a wrapper *entrance* animation): meaningless — the element *is* a scroll animation, and animating the zero-height anchor animates nothing. **Omitted.**
- **Advanced** (CSS id / class / scoped Custom CSS / position): the id/class (to target the scene, e.g. `.your-class .fw-choreo__layer`) and per-element Custom CSS (e.g. a drop-shadow on the layers) are genuinely useful. The **Position** sub-group is *not* — forcing `position` onto the scroll-measuring anchor would break the choreography — so we include a **trimmed Advanced tab** (id / class / Custom CSS, no Position). **Kept, trimmed.**

## Decision

- **Live in the Animation Engine** (`animation-engine/shortcodes/scroll-choreo`), next to Model Viewer — concept over dependency.
- **Name it "Image Scroll Choreography"** (display title); keep the internal tag `scroll_choreo`.
- **Expose only a trimmed Advanced tab** (CSS id / class / scoped Custom CSS); no Styling, no Animation, no Position — because an invisible, zero-height, fixed-overlay element has nothing for those controls to act on.

## Why

Group by **what a thing is**, not by what it happens not to depend on: the payoff is discoverability and a coherent vocabulary (two "Scroll Choreography" elements, one for models and one for images, sitting together). Self-containment is an implementation virtue, not a reason to file the element away from its concept. Qualifying the name costs one word and buys a clean namespace. And tabs are not free chrome — a control that can't affect anything (or that would break the element) is worse than absent, so an overlay-only element earns only the tabs that have something to act on. This becomes the convention for any future fixed-overlay / zero-height-anchor element: **Advanced-only, trimmed of Position.**
