---
slug: posts-per-design-css-loading
title: "Why Posts loads card CSS per-design, auto-detected by filename"
authors: [jon]
tags: [architecture, performance, shortcodes]
date: 2026-07-15
description: With the Posts shortcode carrying 20+ card designs, I wanted only the design actually used on a page to ship its CSS, not all of them. The choice was one bundled stylesheet versus splitting each design's CSS into its own file loaded on demand — and, if split, whether the enqueue reads a registry key or auto-detects the file by name. We split per-design and auto-detect by filename, keeping only shared/structural CSS in the always-loaded base.
---

**The question:** Posts now has 20-plus card designs. The markup only ever outputs the chosen design, but
does the *CSS*? Should every page with a Posts block load all designs' styles, or only the one in use — and
if only one, how do we wire that without a list to maintain as designs keep growing?

<!-- truncate -->

## Context

Posts' `styles.css` is positioning-only and had grown to hold every card design's rules. The dispatcher
already renders only the selected `card-<part>.php`, so the *HTML* is only-used. But the bundled stylesheet
meant a page using one design still downloaded the CSS for the other 22 — and that only gets worse as we add
more.

Testimonials had solved the same problem with a registry `css` key + a per-instance enqueue hook. Posts
could copy that, or do something lighter.

## Options considered

- **Keep one bundled stylesheet.** Simplest, one cached request. But it violates the "only what's used"
  goal and grows unbounded with every new design.
- **Split + registry `css` key** (the Testimonials approach). Each design declares its CSS filename in the
  registry; the hook enqueues it. Explicit, but every design needs a registry field kept in sync with the
  file.
- **Split + filename auto-detect.** Each design's CSS lives at `static/css/card/<style>.css`; the
  per-instance hook enqueues it **iff the file exists**. No registry bookkeeping — dropping the file *is*
  the wiring. The base keeps only the shared/structural CSS (grid modes, card base, side-layout, meta,
  pagination) that every design uses; the seven original structural styles have no file.

## Decision

**Split per-design and auto-detect by filename.** The base `styles.css` carries only shared CSS; each
design's own CSS is `static/css/card/<key>.css`, enqueued only for instances that use that style via the
`fw_ext_shortcodes_enqueue_static:posts` per-instance hook. Adding a design with its own CSS needs no
enqueue list — the hook finds it by name.

## Why

Only-used loading was the actual requirement, and the filename convention makes it self-maintaining: "add a
design" already means "add `card-<key>.php`", so "add `card/<key>.css`" is the same muscle, with nothing to
register. It scales to any number of designs without inflating every Posts page. We knowingly diverged from
Testimonials' registry-`css`-key here — Posts has many more, mostly-optional design CSS files, so
convention-over-configuration pays off; Testimonials' handful is fine as-is. The one caveat worth recording:
the hook fires during normal page/builder content parsing, so a design rendered via a raw `do_shortcode()`
*outside* `the_content` wouldn't get its CSS — acceptable, and fixable with a render-time fallback if that
usage ever appears.
