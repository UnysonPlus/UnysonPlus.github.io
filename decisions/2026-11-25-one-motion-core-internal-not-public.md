---
slug: one-motion-core-internal-not-public
title: Why the scroll core becomes the engine's one motion core, and not a public animation library
authors: [jon]
tags: [animation-engine, animation, javascript, performance, architecture]
date: 2026-11-25
description: The scroll core already covers what GSAP gives web animators (tweens, timelines, eases, scroll triggers, a text splitter). Every Animation Engine module moves onto it, so motion behaves the same everywhere, but it is not published or marketed as a standalone library, because Unyson+ users animate with prebuilt presets, not code.
---

**The question:** "GSAP is just a collection of reusable functions used by web animators. Perhaps we create our own
GSAP-like library, or do we already have it? Should we reuse functions, or better not, since we're usually using
prebuilt animation templates?"

<!-- truncate -->

## Context

Since Animation Engine 1.5.34 the engine has its own [scroll core](/animation-engine/scroll-core) (`upwScroll` and
`upwSplit`, about 7 KB gzipped): tweens on the browser's Web Animations, timelines, eases, scroll triggers with scrub
and pinning, number tweens and a text splitter. Those are the building blocks GSAP offers, so the answer to "do we
already have it?" is yes.

The engine grew module by module, though, and several modules still carry private copies of the same pieces. The
scroll core, Page Timelines, Scroll Keyframes and the scroll choreography each had their own list of easing curves,
and the same curve name did not always mean the same curve ("out" was a cubic curve in one module and a quadratic one
in another). Many modules also run their own animation-frame loop or their own "is it on screen yet?" watcher.

## Options considered

1. **Publish a standalone library** (a GSAP alternative with its own name, site and npm package). It would be a
   marketing story, but it means years of upkeep, docs, versions and support for an audience that mostly does not
   write animation code. Unyson+ users pick prebuilt presets and fill in options.
2. **Leave the modules as they are.** No work, but every bug fix and every new curve has to be made in several places,
   and the same setting can move differently from one module to the next.
3. **Make it the engine's one internal motion core.** Every module eases with the same curves, runs on the same frame
   loop and uses the same triggers. The core stays documented for developers who want it in their own scripts, but
   it is not sold as a product.

## Decision

Option 3. The scroll core becomes the engine's one motion core, and each module moves onto it (roadmap
[Phase 11](/animation-engine/motion-core)). It stays an internal library: documented on the scroll core page,
usable from a theme's own scripts, but not published or marketed on its own.

The first step shipped in Animation Engine 1.5.35: one set of easing curves (`window.upwEase`) for the whole engine.
The scroll core's `upwScroll.ease()`, Page Timelines, Scroll Keyframes and the scroll choreography use it, and each
module's old short names map onto it with exactly the same curves as before. The move also fixed a bug: the scroll
core used to treat a spring curve (`linear(…)`) as a straight line wherever it eased by hand (scrubbed and number
tweens).

## Why

- **Presets are the product, the core is the plumbing.** People choose a preset; the core makes each preset behave the
  same wherever it is used. A new preset becomes a recipe of values instead of new code.
- **One place to fix things.** A curve, a timing bug or a reduced-motion rule is fixed once for every module.
- **Lighter pages.** A page with several effects ships one copy of the shared pieces instead of one per module.
- **No upkeep we do not need.** A public library is a second product with its own users and promises. If developers
  ask for one later, the core is already there to publish.

## Follow-up: "one way to tween" does not mean "everything through the scroll core"

*Decided the same day, while finishing Phase 11.* The plan's last step was to play every module's keyframes through
the scroll core's tweens and timelines. Looking at the code, Interactions and Layout Animation already play on the
browser's own Web Animations, the same mechanism the core's tweens use, with the shared curves. Routing them through
the scroll core would add its 6 KB to pages that need no scroll triggers, and Page Timelines' pinned scroll mode uses a
sticky wrapper that, unlike the core's fixed pinning, keeps working inside transformed containers and on the Live
Editor's canvas.

So "one way to tween" became: **every playback runs either on the browser's Web Animations or as a playhead on the
shared frame loop, eased by the shared curves, triggered by the shared in-view watcher, and measured with the shared
scroll-progress formula.** The scroll core is loaded only where scroll triggers, pinning or timelines are needed. The
Kinetic Scenes player is the Studio app's own player, shipped as a vendor file, and is not part of the engine's core.

**Status:** shipped. The rest of Phase 11 went out in Animation Engine 1.5.36: one shared frame loop and one in-view
watcher for every module (see [the motion core](/animation-engine/motion-core)). Moving the modules over also found and
fixed five bugs: three in the shared loop itself (an extra frame scheduled when a module re-subscribed mid-frame, and two
mid-frame removal cases), the Custom scroll-progress style overwriting the shared scroll-progress helper, and a Horizontal
Scroll section that never moved when its row sat inside a container.
