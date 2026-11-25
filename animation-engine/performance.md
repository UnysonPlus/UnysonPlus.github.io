---
sidebar_position: 2
title: Performance
---

# Performance

Most animation tools make you pay for everything up front — one big CSS + JavaScript bundle with
every effect, loaded on every page, running its loops even when nobody's looking. The Animation
Engine is built the opposite way: **a page ships only the effects it actually uses, and running
animations pause the moment the tab isn't visible.**

## A page loads only what it uses

Every effect is its own tiny file. Add a *Fade In Up* entrance or an *aurora* background to a page,
and only that one effect's code is sent to the browser — the hundred others are never downloaded.
Add nothing, and the page ships **zero** engine code.

| If a page uses… | It loads roughly… | Instead of a full bundle |
| --- | --- | --- |
| One hover effect (CSS-only, e.g. Jelly) | ~0.4 KB CSS, **no JavaScript** | ~22 KB |
| One entrance animation (e.g. Fade In Up) | ~3.5 KB | ~72 KB |
| One animated background (e.g. Particles) | ~5–8 KB | ~27 KB |
| A custom cursor | ~9–11 KB | ~44 KB, on every page |
| A page transition | ~3.5 KB | ~21 KB, on every page |

This is why the engine can offer **hundreds** of effects without any single page feeling heavy: the
number of effects that *exist* has no bearing on what a visitor *downloads*. Even the shared parts
are split further — an animated background only pulls in the particle engine if you actually chose a
particle style, and only the metaball blob engine for a metaball background.

:::info[Nothing on pages that don't use it]
A page with no animations ships none of the engine's CSS or JavaScript. The site-wide pieces —
[custom cursor](/animation-engine/cursor), [page transitions](/animation-engine/page-transitions),
[scroll progress](/animation-engine/scroll-progress) — load only when you've switched them on, and only the one
style you picked.
:::

## Background tabs cost nothing

Continuous animations — a drifting background, a following cursor, a floating element — all run on a
**single shared frame loop**. When the visitor switches to another tab, that loop **pauses entirely**
and resumes when they return. A backgrounded page spends **no CPU** on animation, so you're never
draining a laptop battery or spinning up a fan for a page nobody is looking at.

Off-screen elements are skipped too: a background or physics effect below the fold doesn't animate
until it scrolls into view. Every module shares the same loop and the same "in view" watcher, so a page with ten effects
costs the browser one loop and a handful of watchers, not ten of each. See [the motion core](/animation-engine/motion-core).

## Respectful by default

- **Reduce motion** — if the visitor has "reduce motion" enabled in their operating system, the
  engine honors it: animations are skipped and content is shown in its final state.
- **Touch devices** — pointer-only effects (magnetic hover, the custom cursor, 3D tilt) are skipped
  automatically on touch screens, where they don't make sense.
- **No layout shift** — effects animate transforms and opacity rather than layout, so they don't
  push content around or hurt your Core Web Vitals.

## The rules every effect follows {#guardrails}

Every motion feature ships with these. They are part of the design, not an afterthought:

- **It respects reduced motion.** When a visitor has "reduce motion" set, heavy effects swap for instant or minimal
  states. This is mandatory.
- **It is throttled on mobile.** Mobile GPUs slow down when they get hot, so effects cap their work and resolution, and
  pause when they are off-screen or the tab is hidden.
- **It enhances, never replaces.** WebGL is detected and falls back to a still image or a video. The real content
  always lives in the HTML (for search engines and screen readers); 3D is a layer over the page, never the only copy
  of the content.
- **Web Vitals come first.** On content and conversion pages the light path ships by default; spectacle is kept for
  pages where it adds meaning.
- **One scroll engine.** [Smooth Scroll](/animation-engine/smooth-scroll) and [Scroll Loop](/animation-engine/scroll-loop)
  share a single Lenis instance (`window.__upwLenis`; whichever boots first owns it), so everything that scrolls
  scrubs against the same clock and turning both on never starts two.

## What we build, and what stays hand-made {#build-vs-curated}

The engine aims to deliver most premium motion (GSAP-quality scroll, smooth scroll, text reveals, light 3D) as
**presets** anyone can pick, plus a small, performance-budgeted set of WebGL and Rive flourishes. Fully bespoke studio
scenes stay hand-built: trying to make every one of them a generic setting is where builders drown.

| Built as presets | Used inside the engine, curated | Not planned |
| --- | --- | --- |
| Site-wide smooth scroll | Three.js for a few parametric scenes | A user-facing shader editor |
| One shared scroll engine | Shader presets (image transitions, Motion Gallery WebGL designs) | Composing open 3D scenes from scratch |
| Beat keyframes on pinned sections, Page Timelines | An optional no-code hero object | Arbitrary per-project camera fly-throughs |
| Rive, Model Viewer and image-transition presets | | Whole-page WebGL as the only content layer |
| Text reveals everywhere | | A full video editor in the Live Editor ([Kinetic Scenes](/kinetic-scenes) is its own app; the Animate workspace stays lean) |

## Fewer requests, if you want them

Because every effect is a separate file, a page using several effects makes a few small requests. On
modern HTTP/2 connections that's a non-issue — but if you'd rather combine them, the **Asset
Optimizer** extension can concatenate a page's effect files into a single request, keeping the
"only what you use" savings while collapsing them into one download.

:::tip[The short version]
Turn on as many effects as you like across your whole site. Each visitor still downloads only the
handful their page actually uses, and those animations quietly stop whenever the tab isn't on
screen. Big library, light pages.
:::
