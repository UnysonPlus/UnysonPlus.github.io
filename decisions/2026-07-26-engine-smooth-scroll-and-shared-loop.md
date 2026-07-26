---
slug: engine-smooth-scroll-and-shared-loop
title: "Smooth scroll belongs to the engine, and the scroll clock is a shared loop — not a ScrollTrigger port"
authors: [jon]
tags: [animation, architecture, performance]
date: 2026-07-26
description: "Phase 0 of the motion roadmap asked two questions: where does site-wide inertia smooth-scroll live, and how do we make every scroll effect share one clock? We chose a new Animation Engine module (not an extension of the theme's anchor-link smooth-scroll), and a shared requestAnimationFrame loop for unification (not a wholesale GSAP ScrollTrigger port). This records why the lower-risk paths won."
---

**The question:** Phase 0 of the Animation Engine's motion roadmap is "make scrolling feel effortless
everywhere, and give every scroll-driven effect one shared clock." That raised two forks. **(1)** Where
should the new *inertia* smooth-scroll live — a new engine module, or an extension of the theme's
existing anchor-link "Smooth Scroll"? **(2)** How do we unify the scroll-reactive modules so they stay
in lockstep — port them all to GSAP's ScrollTrigger, or reuse the engine's own shared animation loop?

<!-- truncate -->

## Context

The runtime today is deliberately lightweight and lazy:

- **Lenis** (the smooth-scroll library) is already vendored, but private to one module (Scroll Loop).
- **GSAP + ScrollTrigger** is private to one module (Scroll Motion) and loads only on pages that use it.
- The **sticky scroll modules** (Scrollytelling, Sticky Stack, Horizontal Scroll, Scroll Color Shift,
  Image Sequence) are library-free — each reads `getBoundingClientRect()` in its own small
  `requestAnimationFrame` loop.
- A shared scheduler already exists — **`window.upwAnimRaf`** — one rAF loop that many modules subscribe
  to and that *pauses itself while the tab is hidden*.
- The **theme** already ships a CSS "Smooth Scroll for Anchor Links" toggle (`scroll-behavior: smooth`),
  which is a different thing from inertia wheel-smoothing.

There is no shared GSAP loader, no shared scroll-progress helper, and no shared reduced-motion helper —
each is either reimplemented per module or owned privately by one.

## Options considered

**Where smooth-scroll lives:**

- **Extend the theme's existing "Scrolling" group.** Keeps all scroll UX in one place — but it lives in
  the *theme*, off-pattern for an engine feature, and it conflates CSS anchor-smoothness with real
  inertia scrolling under one label.
- **A new Animation Engine module (chosen).** Mirrors the four existing site-wide effects (Cursor, Page
  Transitions, Preloader, Scroll Progress): its own Theme Settings sub-tab, ships assets *only when
  enabled*, and keeps motion where motion belongs. Labeled **"Smooth (inertia) scrolling"** so it reads
  as clearly distinct from the theme's anchor-link toggle.

**How the scroll clock is unified:**

- **Port every sticky module to ScrollTrigger.** Industry-standard and powerful — but it's a *large*,
  behaviour-parity-risky rewrite of the flagship Scrollytelling (pinned stage, backdrop scrub, persist
  ranges, published progress), and it would force GSAP to load on every page that uses *any* of these
  effects. That fights the engine's "ship only what a page uses" principle.
- **Reuse the shared `upwAnimRaf` loop (chosen).** Extract two shared helpers (`upwScrollProgress` and
  `upwReduceMotion`) and move each sticky module's per-frame reader onto the one ordered loop that
  already pauses off-screen. Same felt result — one smooth, synchronized scroll — with no wholesale
  rewrite and no forced GSAP.

## Decision

**A new engine module** (`smooth-scroll`) providing inertia smooth-scroll site-wide, and a **shared-loop
unification**: sticky modules ride `upwAnimRaf` and read from shared progress/reduced-motion helpers,
rather than being ported to ScrollTrigger.

## Why

- **Risk.** A faithful ScrollTrigger port of Scrollytelling is a project on its own; the shared-loop path
  moves the *tick*, not the *logic*, so behaviour can't drift.
- **Page weight.** The shared loop keeps GSAP where it already earns its place (Scroll Motion). Lenis
  still bridges to ScrollTrigger *when it's present* (`gsap.ticker` drives Lenis; `lenis.on('scroll',
  ScrollTrigger.update)`), so scroll-motion pages stay in lockstep — but a page with only a smooth
  background and a sticky stack never pays for GSAP.
- **Reuse over rebuild.** `upwAnimRaf` already gives ordered updates and tab-hidden pausing for free;
  we add the two helpers the engine was missing and adopt them everywhere, which also closes existing
  gaps (e.g. Scroll Color Shift had no JS reduced-motion guard).
- **On-pattern.** Smooth-scroll as a site-wide engine module is copy-paste consistent with Cursor / Page
  Transitions / Scroll Progress — same options shape, same enqueue gating, same config bridge — so it's
  predictable to build and to maintain.

*Status: Accepted — Phase 0 of the motion roadmap. Increment 1 (the smooth-scroll module) is built
first; the sticky modules move onto the shared loop one at a time after.*
