---
sidebar_position: 19
title: The scroll core
slug: /scroll-core
description: "The Animation Engine's own scroll motion core: scroll triggers, scrubbing, pinning, tweens on the browser's Web Animations, timelines and a text splitter, in about 7 KB. What runs on it, how to use it from your own code, and its limits."
keywords:
  - scroll trigger without gsap
  - gsap alternative wordpress
  - scroll pinning javascript
  - split text without splittext
---

# The scroll core

The Animation Engine's scroll motion runs on its **own scroll core**: two small scripts that do what GSAP,
ScrollTrigger and SplitText used to do for it. It shipped in Animation Engine 1.5.34
([why we left GSAP](/decisions/leave-gsap-for-our-own-scroll-core)).

| Script | Global | What it does | Size (gzipped) |
| --- | --- | --- | --- |
| `static/js/upw-scroll.js` | `window.upwScroll` | Scroll triggers, scrub (with smoothing), pinning, tweens, number tweens, timelines, eases | about 6.4 KB |
| `static/js/upw-split.js` | `window.upwSplit` | Splits text into characters, words or lines, and puts it back | about 1 KB |

Together they replace about 47 KB of GSAP + ScrollTrigger + SplitText, and they load only on pages that use them.

## What runs on it

- **[Scroll Motion](/animation-engine/scroll-motion)**, every effect: reveal, stagger, split text, parallax, pin, scrub,
  zoom, rotate, blur, clip, skew, flip, expand, count up and odometer, velocity skew, 3D tilt, scroll spin, mask wipe
  and colour scrub.
- **[Motion Sequence](/animation-engine/motion-sequence)**: a Section's reveals and staggers as one timeline.
- **[Motion Gallery](/animation-engine/motion-gallery)** scroll choreography and chained galleries: the pinned,
  scrubbed stage that hands one gallery to the next.
- **The [Scroll Ruler and Scroll Timeline](/animation-engine/scroll-timeline)** list its triggers and retime them.

You do not need to do anything: existing pages keep their settings and look the same. The only part of the engine
that still loads GSAP is a Scroll Motion **Custom Code** snippet, because that is your own GSAP code; GSAP and
ScrollTrigger then load on that page alone.

## How it works

- **Triggers.** Each animation watches one element. Its **start** and **end** read like GSAP's: *"the element's edge
  at the screen's edge"*, for example `top 85%` (when the element's top reaches 85% down the screen) or
  `center center`. Each edge is `top`, `center`, `bottom`, a percentage or a pixel value. The end can also be relative
  to the start: `+=100%` (one screen height further) or `+=400` (400 pixels).
- **Play or scrub.** A trigger either plays its animation as the element arrives (and, if you ask, reverses it when
  it leaves), or **scrubs** it: the animation follows the scroll position. A scrub can be smoothed, so it catches up
  over a fraction of a second instead of following every wheel step.
- **Pinning.** A pinned element holds still on screen while the page scrolls through the trigger's range. A spacer
  takes its place in the page and keeps the page's height, so everything below moves on after it.
- **Animations on the browser.** Movement, fades, blurs, clip paths and colours run on the browser's own Web
  Animations, so the browser can move them on its compositor. When an entrance ends in the element's natural look, the
  animation removes itself: a later hover effect or style change on the element is never overridden by a finished
  animation.
- **One clock.** Everything updates on the engine's shared frame loop, and only while something is moving. With
  [Smooth Scroll](/animation-engine/smooth-scroll), it reads the smoothed scroll position on the same frame.
- **Staying right.** Positions are worked out again when the window is resized, when web fonts and images finish
  loading, and when the page's height changes (an accordion opens, a section loads later).

## The engine's curves {#eases}

The whole Animation Engine eases with **one set of curves**, kept in the shared frame loop (`window.upwEase`, since
Animation Engine 1.5.35). The scroll core, [Page Timelines](/animation-engine/page-timelines),
[Scroll Keyframes](/animation-engine/scroll-keyframes) and the scroll choreography of the
[Text](/animation-engine/text-scroll-choreography) and [Image](/animation-engine/image-scroll-choreography) Scroll
Choreography elements all read from it, so a curve
moves the same way in every one of them ([why](/decisions/one-motion-core-internal-not-public)).

It understands:

- **Named curves:** `none`, `power1` to `power4` (also called `quad`, `cubic`, `quart`, `quint`), `sine`, `expo`,
  `circ`, `back(1.7)`, `elastic(1, 0.5)` and `bounce`, each with `.in`, `.out` (the default) or `.inOut`, for example
  `power3.out` or `back.out(1.7)`.
- **Every CSS curve:** `ease`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(…)`, `steps(…)`, and `linear(…)`,
  which is how the easing picker stores its springs and the Motion design curves.

Older short names keep their curves: Scroll Keyframes' *Out*, *In* and *In-out* are `power2` (cubic), *Back* is
`back.out`, *Sine* is `sine.inOut`; the scroll choreography's *In*, *Out* and *In-out* are `power1` (quadratic).

```js
const f = upwEase('back.out(1.7)'); // a function from 0..1 to 0..1
f(0.5);                              // ≈ 1.09: past the end, then back
upwEase('linear(0, 0.9 50%, 1)');    // a spring from the easing picker
upwEase('nonsense');                 // null: the caller keeps its own default
```

`upwScroll.ease(name)` gives the same functions, with `power2.out` for a name it does not know.

## The text splitter

`upwSplit(element, { type })` wraps each character, word or line in its own element so they can be animated one by
one, and `revert()` puts the original markup back. It:

- keeps **inline markup** (links, bold, italic, line breaks): each piece is wrapped where it stands;
- keeps words whole: a line never breaks inside a word;
- keeps **screen readers** reading the sentence: the element gets an `aria-label` with the original text and the pieces
  are hidden from assistive technology;
- re-splits **lines** when the element changes width.

Lines are regrouped only in plain text. Inside a heading with links or bold text, Split Text by lines falls back to
words, cascading in the same order.

## Using it from your own code

On a page that loads the core (any page with a Scroll Motion effect, or one where your theme enqueues it with
`upw_anim_scroll_handle()`), the same building blocks are available to your own scripts.

```js
// A reveal that plays once as the card arrives.
upwScroll.tween('.card', { opacity: 0, y: 40 }, {
  opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  stagger: { each: 0.1, from: 'start' },
  scrollTrigger: { trigger: '.cards', start: 'top 80%' }
});

// A section that pins for one screen height while its picture turns.
upwScroll.tween('.hero img', { rotation: 0 }, {
  rotation: 360, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=100%', pin: true, scrub: 0.5 }
});

// A number that counts up.
const n = { v: 0 }, out = document.querySelector('.stat');
upwScroll.value({ target: n, to: { v: 1200 }, duration: 1.5,
  onUpdate: () => { out.textContent = Math.round(n.v); },
  scrollTrigger: { trigger: out, start: 'top 90%' } });

// Words of a heading, one after another.
const s = upwSplit(document.querySelector('h2'), { type: 'words' });
upwScroll.tween(s.words, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, onComplete: s.revert,
  scrollTrigger: { trigger: 'h2', start: 'top 85%' } });
```

PHP: `upw_anim_scroll_handle()` enqueues the core and returns its handle (add it to your script's dependencies);
`upw_anim_scroll_handle( true )` also enqueues the splitter.

### Reference

| Call | Does |
| --- | --- |
| `upwScroll.tween(targets, from, to)` | Animates elements from one set of values to another. `to` takes `duration` (seconds), `delay`, `ease`, `stagger` (a number, or `{ each, from: 'start' \| 'end' \| 'center' \| 'edges' \| 'random' }`), `onComplete`, `paused`, `keep` (do not remove itself at the end) and `scrollTrigger`. Returns a controller: `play`, `reverse`, `restart`, `pause`, `resume`, `reset`, `complete`, `progress(p)`, `kill`. |
| `upwScroll.value({ target, to, duration, ease, onUpdate, scrollTrigger })` | Animates plain numbers on an object, for anything a style cannot express (counters, masks). Same controller. |
| `upwScroll.timeline({ scrollTrigger, onComplete })` | Places tweens on one timeline: `tl.fromTo(targets, from, to, position)` or `tl.add(tween, position)`, where position is seconds, `'<'` (with the previous one), `'>'` (after it), `'>-0.3'` or `'<+0.2'`. Played, or scrubbed by its trigger. |
| `upwScroll.create(vars)` | A trigger on its own: `trigger`, `start`, `end`, `scrub` (`true` or seconds of smoothing), `pin`, `pinSpacing`, `once`, `toggleActions` (`'play none none reverse'`…), `animation`, `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`, `onToggle`, `onUpdate`, `markers`. The trigger exposes `start`, `end`, `progress`, `direction`, `isActive`, `getVelocity()`, `refresh()`, `kill()`. |
| `upwScroll.set(targets, values)` | Sets values at once. |
| `upwScroll.ease(name)` | An ease as a function: `none`, `power1`–`power4`, `sine`, `expo`, `circ`, `back(1.7)`, `elastic(1,0.5)`, `bounce`, each `.in`, `.out` or `.inOut`; also `cubic-bezier(…)`, `linear(…)` and `steps(…)`. |
| `upwScroll.getAll()` / `refresh()` / `update()` / `kill()` | Every trigger on the page (in page order); work positions out again; update now; remove all. |
| `upwSplit(el, { type: 'chars' \| 'words' \| 'lines', linesClass })` | Returns `{ chars, words, lines, revert() }`. |

Values a tween animates: `x`, `y`, `z` (pixels), `xPercent`, `yPercent`, `scale`, `scaleX`, `scaleY`, `rotation`,
`rotationX`, `rotationY`, `skewX`, `skewY`, `transformPerspective`, `opacity`, `blur` (pixels), and any other CSS
property by its JavaScript name (`clipPath`, `color`, `backgroundColor`, `filter`…).

## Limits

- **A pinned element inside a transformed ancestor.** Pinning holds the element with `position: fixed`. An ancestor
  with a `transform`, `filter` or `perspective` makes "fixed" relative to that ancestor instead of the screen, so the
  pin would drift with it. Keep pinned sections out of transformed containers (GSAP's pinning has the same limit).
- **One transform per element.** A tween sets the element's whole `transform`. Two animations that both move the same
  element do not add up; nest one element inside another instead.
- **Triggers inside a pinned section** are measured where they sit in the page, not where the pin holds them. Animate
  the content of a pinned section with the pinned section's own scrub (a timeline), not with separate triggers.
- **Very old browsers.** Curves are handed to the browser as `linear()` easing; a browser without it (before 2023)
  runs the nearest standard ease instead.

## Checked

The core and the splitter have a test page of 22 checks (eases, a reveal waiting and cleaning up, scrub at exact
positions, a 360° spin, smoothing, a pin holding and releasing, refresh on resize, timeline positions, number tweens,
splitting and reverting) and every Scroll Motion effect was checked on the demo pages and on a test page of the
effects the demos do not show (count up and odometer, flip, expand, mask wipe, tilt, spin, velocity skew, colour
scrub, Motion Sequence) — with no GSAP on the page and no errors.
