---
slug: interactions-on-web-animations
title: "Why Interactions run on the browser's Web Animations, not GSAP, and pick targets by selector"
authors: [jon]
tags: [animation, animation-engine, architecture, performance, live-editor]
date: 2026-11-11
description: Roadmap I1 (one trigger animating other elements) planned GSAP as its runtime. Decision — build it on the Web Animations API with the individual translate/scale/rotate properties, store targets as CSS selectors, and let the Live Editor turn a click on the canvas into a selector.
---

**The question:** The Framer & Webflow analysis planned Interactions (a trigger on one element that animates other elements) on GSAP, because Scroll Motion already loads it. When it came to building it, two choices were still open. Which animation runtime should it use? And how should a step remember the element it animates?

<!-- truncate -->

## Context

- An Interaction is a trigger (hover, click, page load, in view, scrolled past) and up to three steps. Each step has its own target: the element itself, elements inside it, or elements anywhere on the page.
- Hover and click need **reversible** sequences. Leaving a card halfway through its lift must reverse from wherever it got to, in mirrored order.
- Targets often already carry motion: an Entrance Animation, a Hover effect, Scroll Motion. Any of them can set `transform`.
- The engine's rule is that a page loads only what it uses, and many pages with an interaction have no GSAP on them otherwise.

## Options considered

**Runtime**

1. **GSAP timelines.** Mature, with timelines and reverse built in. But it adds about 70 KB to every page with an interaction, and its tweens write `transform`, which clashes with the other effects on the same element unless every module agrees on one transform owner.
2. **Web Animations API (chosen).** Built into every current browser, so it costs no download. The individual CSS properties `translate`, `scale` and `rotate` are applied **on top of** `transform`, so an Interaction composes with whatever else moves the element. Partial keyframes start from (or return to) the element's current look. One shared end time per sequence makes `reverse()` mirror it exactly.

**Naming the target**

1. **A builder id stamped on every element.** Exact, but it changes every element's markup on every page, for a feature most elements never use.
2. **A CSS selector (chosen)**, the same thing a developer would type, with a click-to-pick in the Live Editor that fills it in. The pick uses the element's CSS ID, or adds a short `ix-…` class to it, as an ordinary undoable edit.

## Decision

Interactions run on the **Web Animations API** with the individual transform properties, opacity and blur. Targets are **CSS selectors**. In the Live Editor, **Pick on the page** turns a click on the canvas into one.

## Why

- **Nothing extra to download**, and nothing fights over `transform`. Interactions layer on top of the rest of the Animation Engine instead of replacing it.
- **Reversing is exact.** Sequences mirror without timeline bookkeeping, which hover and toggles need.
- **Selectors keep the markup clean** and stay readable for people and for the AI Dev Kit. Picking on the canvas covers the case where you don't know the selector.
- GSAP stays where it earns its place: scroll-scrubbed and pinned motion (Scroll Motion, Scroll Keyframes). A later **timeline for every trigger** (roadmap I4) can still write the same step data.

*Status: Accepted.*
