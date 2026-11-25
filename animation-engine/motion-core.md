---
sidebar_position: 18.5
title: The motion core
slug: /motion-core
description: "The shared pieces every Animation Engine module runs on: one frame loop that pauses in background tabs, one set of easing curves, one in-view watcher, one scroll-progress formula and the reduced-motion and mobile checks. What each does, how to use them from your own module, and their limits."
keywords:
  - wordpress animation performance
  - requestanimationframe shared loop
  - intersectionobserver shared
  - animation easing curves
---

# The motion core

Every Animation Engine module, from a drifting background to a scroll-scrubbed timeline, runs on the same small set
of shared pieces: the **motion core**. A page that uses several effects loads these pieces once, and every effect
behaves the same way: the same curves, the same idea of "in view", the same pause when the tab is hidden.

It is an internal library: documented here for theme and module developers, but not a separate product
([why](/decisions/one-motion-core-internal-not-public)). It came together in roadmap Phase 11 (Animation Engine 1.5.35
and 1.5.36).

| Piece | Global | What it does |
| --- | --- | --- |
| The frame loop | `window.upwAnimRaf` | One animation-frame loop for every module; pauses while the tab is hidden |
| The curves | `window.upwEase` | Every easing curve, named or CSS, as a function ([the list](/animation-engine/scroll-core#eases)) |
| The in-view watcher | `window.upwInView` | Tells a module when an element enters or leaves the screen |
| Scroll progress | `window.upwScrollProgress` | How far an element is through the screen (or through its pinned stretch), from 0 to 1 |
| Visitor checks | `window.upwReduceMotion`, `window.upwIsMobile` | "Reduce motion" is on; the screen is phone-sized |
| The scroll core | `window.upwScroll`, `window.upwSplit` | Scroll triggers, pinning, tweens, timelines and the text splitter ([its own page](/animation-engine/scroll-core)) |

The first five live in one small file, `static/js/upw-raf.js` (about 3 KB gzipped). The scroll core is separate and
loads only on pages that need it.

## What runs on it {#what-runs-on-it}

Since Animation Engine 1.5.36 every module uses the motion core instead of private copies:

- **On the shared frame loop:** Page Timelines, Interactions (mouse follow, the "scrolled past" trigger), Marquee,
  Motion Path, Text Effects (count up, matrix, scramble, spotlight), the Hover text and WebGL effects, every Scroll
  Progress style, Scroll Text Highlight, Scroll Reveal, Scroll Variables, Confetti, Painted, Parallax, Scrollytelling,
  Horizontal Scroll, Sticky Stack, Scroll Colour Shift, Cursor, the Scroll Ruler and Scroll Timeline, SVG Draw and
  Morph, Rive, WebGL Object, Model Viewer, Parallax Scene, Interactive Reveal, Image Sequence, the Text and Image Scroll
  Choreography elements, and the Motion Gallery (every design, 2D and WebGL, shares one subscription per page).
- **On the in-view watcher:** Page Timelines, Interactions, Motion Path, the Kinetic Scenes Preset, Flip Card, Text
  Effects, the WebGL hover effect, Scroll Text Highlight, Scroll Reveal's Dissolve and Pixelate, Scroll Variables,
  Backgrounds, Physics, Confetti, Painted, Parallax, Scrollytelling, SVG Draw and Morph, Rive, WebGL Object, Interactive
  Reveal and the Motion Gallery.
- **Kept on their own clock, on purpose:** Smooth Scroll and Scroll Loop drive the smooth-scrolling library on their own
  loop, because they move the page itself and every other effect must read the position they have just set (measured:
  on the shared loop the others read it up to 277 pixels behind). Viewport Units has one resize throttle and no
  dependencies, so pages that only need it load nothing else. A few modules still wait a single frame for layout
  before starting a CSS transition; that is a wait, not a loop.

The difference is measurable: a Motion Gallery page went from up to a thousand frame requests a second (one loop per
design) to one per frame, and a page with several WebGL scenes from about 90 to about 33.

## The frame loop {#frame-loop}

An animation that changes every frame (a following cursor, a marquee, a counter, a canvas) asks the shared loop to
call it, instead of running a loop of its own.

- **One loop, however many effects.** The browser wakes up once per frame for the whole page.
- **Background tabs cost nothing.** While the tab is hidden the loop stops; it starts again when the visitor comes back.
- **Only while something moves.** When no effect is subscribed, the loop does not run at all.
- **Scroll read once.** At the top of each frame the loop reads the scroll position and the screen height once
  (`upwAnimRaf.scrollY`, `upwAnimRaf.vh`) for every effect, so no effect forces the browser to redo layout to read them.
- **A broken effect cannot stop the others.** An effect that throws an error is removed; the rest keep running.

```js
var raf = window.upwAnimRaf;
function step(time) {                // time: the frame's timestamp, in ms
  el.style.transform = 'rotate(' + (time / 20) % 360 + 'deg)';
  if (done) { return false; }       // return false to stop being called
}
raf.add(step);                       // start
raf.remove(step);                    // or stop from outside
```

Because the loop stops while the tab is hidden, the first frame after the visitor returns can come seconds after the
last one. An effect that moves by elapsed time caps the step, for example `Math.min(dt, 0.05)` seconds, so it does not
jump.

## The in-view watcher {#in-view}

`upwInView(element, callback, options)` calls `callback(inView, entry)` as soon as the element's state is known and
then each time it enters or leaves the screen. It returns a function that stops watching.

```js
var off = upwInView(card, function (inView) {
  card.classList.toggle('is-visible', inView);
}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

upwInView(counter, startCounting, { once: true }); // only the first time it comes into view
```

| Option | Default | Does |
| --- | --- | --- |
| `threshold` | `0` | How much of the element must be visible: `0` (any part) to `1` (all of it), or a list of values |
| `rootMargin` | `'0px'` | Grows or shrinks the screen area, like CSS margins: `'0px 0px -10% 0px'` waits until the element is 10% above the bottom |
| `once` | `false` | Stop watching after the first time the element is in view |
| `root` | the screen | Watch inside a scrolling element instead (that element gets its own watcher) |

One browser observer serves every element and every module that asks with the same `threshold` and `rootMargin`. The
first call can report `false` (the element starts below the fold), so an effect that reacts to "left the screen" should
not treat that first call as a leave. In a browser without `IntersectionObserver` the callback gets `true` at once, so
content is never left hidden.

## Scroll progress {#scroll-progress}

`upwScrollProgress(element, options)` returns a number from 0 to 1:

- **Passing through** (the default): 0 when the element's top reaches the bottom of the screen, 1 when its bottom
  leaves the top.
- **Pinned** (`{ pin: true, stageH }`): 0 when the pinned stretch starts and 1 when it ends, for an element that holds
  still while a taller wrapper scrolls past. `stageH` is the height of what holds still (the screen height by default);
  `align: 'center'` or a pixel offset when it is not held at the top.

Scroll Keyframes, Page Timelines' scroll trigger, Scrollytelling, Sticky Stack and the other scroll-scrubbed modules use
this one formula, so the same scroll position means the same progress everywhere.

## Visitor checks

- `upwReduceMotion()` is `true` when the visitor has asked their system to reduce motion. Each module combines it with
  its own setting, for example `if (cfg.reducedMotion !== false && upwReduceMotion()) { showFinalState(); }`.
- `upwIsMobile()` is `true` on screens up to 767 pixels wide, for a module's "turn off on phones" setting.

## Using it from your own module

A [module of your own](/animation-engine/custom-modules) gets the motion core by depending on its script handle:

```php
wp_enqueue_script( 'my-glow', get_stylesheet_directory_uri() . '/js/glow.js',
	array( upw_anim_raf_handle() ), '1.0', true );   // upw-anim-raf: the loop, curves, in-view, progress
```

`upw_anim_scroll_handle()` adds the scroll core when you need scroll triggers, pinning or timelines.

## Limits

- **One loop means one order.** Effects added later run earlier in the same frame. An effect must not depend on
  another effect having already run in that frame.
- **The scroll position is read at the top of the frame.** An effect that scrolls the page itself (smooth scrolling)
  keeps its own loop, so the others read the position it has just set.
- **Adding and removing mid-frame is safe.** An effect may stop itself, stop another one or start a new one while the loop
  runs; every other effect still runs exactly once in that frame, and a new one starts on the next.
- **Simulations step by elapsed time.** Physics and WebGL scenes run on the shared loop but compute their own step from
  the time between frames (capped), and start and stop with the in-view watcher.
