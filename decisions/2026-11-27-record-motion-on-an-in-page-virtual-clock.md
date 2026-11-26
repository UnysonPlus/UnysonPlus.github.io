---
slug: record-motion-on-an-in-page-virtual-clock
title: Why the converter records a page's motion on an in-page virtual clock, and turns it into Interactions
authors: [jon]
tags: [site-converter, conversion, animation, animation-engine, architecture]
date: 2026-11-27
description: To bring a source page's entrance motion across exactly (roadmap Phase 10), the capture plays the page on a clock that lives inside the page and moves only when the recorder says, rather than on Chrome's own virtual time or in real time, and each recorded motion becomes a native Interaction rather than a Page Timeline or code.
---

**The question:** Phase 10 of the roadmap: "The Site Converter copies a page's layout and styles, but not its motion.
Bring a source page's animations across as native, editable motion, and prove the match frame by frame." How do we
record motion so the numbers can be trusted, and what native form should it land in?

<!-- truncate -->

## Context

Before this, a conversion guessed motion: a heuristic sweep scrolled the page with fixed waits and classified blocks
as "reveal" or "parallax", and a class-pair rule read hidden/shown CSS rules. Nothing measured timing, and nothing
could check the converted page's motion against the source's.

A measurement has to be the same on every run and on every machine. A capture runs on a busy computer, often next to
other captures and AI passes; a 0.8 s entrance sampled in real time comes out as anything from 0.6 to 1.2 s.

## Options considered

**Recording:**

1. **Real time with screenshots or video.** Simple, but the timing is only as good as the machine's load; two runs
   disagree, so a "drift" in the check could be the recorder's.
2. **Chrome's virtual time** (`Emulation.setVirtualTimePolicy`). Deterministic for timers and `requestAnimationFrame`,
   but measured on a test page: **CSS animations, transitions and Web Animations ignore it** and finish between two
   samples. Freezing their timeline (`Animation.setPlaybackRate 0`) holds them, but also **stops the page producing
   frames**, so IntersectionObserver callbacks never ran and nothing "in view" ever played.
3. **A clock inside the page.** An init script replaces `performance.now`, `Date.now`, timers and
   `requestAnimationFrame` with ones that move only when the recorder advances them, and holds every animation paused,
   setting its time from that clock at each 25 ms step. The page still renders and handles scroll in real time, so
   in-view triggers fire, within one step.

**Landing:**

1. **Page Timelines** (one timeline per page, tracks per element). Good for choreography, but they target builder item
   keys that only exist after the build, need a separate save step, and one timeline per motion is heavy to edit.
2. **Interactions on each element** ("On page load" / "In view", a step *From* the start state). One per element, set
   during the build like any other option, and shown in the Live Editor's interaction timeline.
3. **Custom CSS or a script.** Exact, but not editable as motion and invisible to the engine.

## Decision

Record on **a clock inside the page** (option 3), and land each measured entrance as **an Interaction on its element**
(landing option 2), with the source's delay, duration, start state and the closest engine easing (or its own
`cubic-bezier()`). Scroll-linked motion and loops keep their existing routes; what cannot be expressed is reported as
a motion gap, never hand-coded.

## Why

- **The numbers are the source's numbers.** On the test page every CSS / Web Animation came out with its exact delay,
  duration and curve, and script-driven motion within one step. Run it twice and it agrees with itself, so a drift in
  the check is a real drift.
- **It respects the page's own intent.** The first version advanced every animation, and the Animation Engine (which
  builds its animations paused and plays them on a trigger) appeared to play off-screen cards at load. Tracking the
  page's `play` / `pause` / `finish` calls fixed that: the recorder drives time, the page still decides what plays.
- **Interactions are what a person edits.** A converted entrance is an ordinary option on the element, visible in the
  Live Editor's interaction timeline, with nothing to keep in step with item keys or a second save.
- **The same recorder checks the result.** Recording the converted page the same way turns "does it move like the
  source" into a table of milliseconds and curve distances (6 of 7 on the first fixture; the seventh, a paragraph merged
  into a heading's subtitle, is reported with that reason), and every mismatch is already a findings-form tuple.

**Status:** Accepted. See [Recorded motion](/extensions/site-converter/how-it-works#recorded-motion).
