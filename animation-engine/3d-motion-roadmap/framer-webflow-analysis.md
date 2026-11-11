---
sidebar_position: 7
title: Framer & Webflow analysis
slug: /framer-webflow-analysis
description: How designers animate in Framer and Webflow, how the Unyson+ Animation Engine compares feature by feature, and the plan to match their power without losing what makes Unyson+ easy.
---

# Framer & Webflow: how they animate, and how Unyson+ catches up

*Analysis written November 2026. It answers one question: can the Unyson+ Animation Engine be as powerful as Framer and Webflow, and what would it take?*

## The short answer

**Yes, and the gap is narrower than it looks, but it isn't where most people expect.**

Unyson+ already ships more ready-made motion than either tool: 56 entrances and 43 exits, about 40 hover interactions, 38 text effects, 19 GSAP scroll effects, 27 physics effects, 37 motion paths, 11 card stacks, 15 horizontal-scroll styles, 29 scrollytelling transitions, 23 page transitions, 42 cursors, WebGL, 3D models and the Motion Gallery. On **effect count**, Unyson+ is ahead.

Where Framer and Webflow are ahead is the **authoring model**: one consistent way to say *"when this happens, animate these things like this"*, aimed at any element on the page, previewed live on the canvas. In Unyson+ each effect family is its own module with its own panel, and almost every effect animates only the element it's attached to.

So the plan isn't "add more effects". It's **one interaction model underneath, with the existing modules as presets on top of it.**

## How Webflow models motion

Webflow rebuilt its interactions on **GSAP** (it acquired GSAP in late 2024 and launched *Interactions with GSAP* in summer 2025). Its help centre describes four parts:

- **Triggers:** user or system events that start an interaction. The common ones are page load, click, hover, scroll into view, *while scrolling in view* (scroll-linked, with scrub and pin) and mouse move.
- **Targets:** what the interaction animates. This can be the element itself or other elements, including every element with a class, so one interaction serves the whole site.
- **Actions:** the steps. These include *Animation* (a GSAP tween of position, scale, rotation, opacity, size, colour, filters and more), *Set* (an instant change at a point in time), *Lottie* control, and in the GSAP version repeat, stagger and **split text**.
- **Timeline:** a horizontal, video-editor-style timeline docked under the canvas where actions are placed, timed and eased. Custom actions can be **saved as reusable presets**.

Webflow's guidance on what designers mostly build: scroll-triggered reveals, scroll-linked parallax and progress, sticky-header changes on page scroll, mouse-move parallax in heroes, hover image swaps, and click-to-open modals and menus. It also warns that heavy animation can hurt perceived performance.

## How Framer models motion

Framer (the site builder, built on its own animation library) works in two layers:

- **Layer effects**, for "one layer needs motion with little setup": **Appear** (on load or as it scrolls into view), **Hover**, **Press**, **Drag**, **Loop** and **Scroll** (Scroll Transform from a start state to an end state, and Scroll Speed for parallax).
- **Text effects**, by character, word, line or element.
- **Variants**, the heart of Framer: a component has named states (Default, Hover, Pressed, Open…), and **interactions** (click, mouse enter, mouse leave) move between them. Framer animates every property that differs, with spring or tween transitions, and hover on a parent can drive its children.
- **Scroll Sections and scroll variants**: name sections of the page, then switch a component's variant when a section reaches the viewport. With sticky positioning, this is how Framer builds sticky feature showcases and navigation that changes colour as you scroll.
- **Ticker** (infinite marquee), sticky positioning, and **code overrides** for anything else, such as cursor-position effects (no-code cursor tracking isn't built in, per third-party guides).

Comparisons generally call Framer the easier, smoother tool for motion-heavy sites and Webflow the more controllable one, with snappier GSAP motion.

## What designers actually use

Across the tutorials, showcases and both tools' own guidance, the same handful of patterns covers most real sites:

1. **Reveal on scroll**: fade or slide in, often staggered across a group. *(Unyson+: yes.)*
2. **Scroll-linked motion**: parallax, zoom or rotate tied to scroll progress, often with the section **pinned**. *(Unyson+: yes, Scroll Motion and Scroll Keyframes.)*
3. **Sticky storytelling**: a pinned visual that changes as text steps scroll past. *(Unyson+: yes, Scrollytelling.)*
4. **Hover states that move several things**: a card lifts, its image zooms, its arrow slides. *(Unyson+: partly; hover effects animate only the element they're on.)*
5. **Click to open or toggle**: menus, modals, accordions, tabs, with animated open and close. *(Unyson+: built into elements, but not a general "click this, animate that".)*
6. **Navigation that reacts to scroll**: shrink, recolour or hide the header after a point. *(Unyson+: partly, through Theme Settings header options.)*
7. **Text effects**: split, staggered, scramble. *(Unyson+: yes, 38.)*
8. **Mouse-move parallax** in heroes. *(Unyson+: yes, Parallax and Physics.)*
9. **Page transitions and marquees.** *(Unyson+: yes.)*

Patterns 1–3 and 7–9 are covered. **Patterns 4–6 are the gap**, and they all need the same missing piece: **one trigger animating other elements.**

## Side by side

| Capability | Webflow | Framer | Unyson+ today |
| --- | --- | --- | --- |
| Ready-made effects | Presets + reusable custom presets | Effect presets | **Most: hundreds across ~30 modules** |
| Reveal on scroll, staggered | ✓ | ✓ Appear | ✓ Entrance, Scroll Motion stagger, Motion Sequence |
| Exit when leaving the screen | ✓ (scroll out of view) | Partly | ✓ Exit Animation |
| Scroll-linked (scrub) | ✓ with pin | ✓ Scroll Transform / Speed | ✓ Scroll Motion, Scroll Keyframes, Image Sequence |
| Pinned / sticky storytelling | ✓ | ✓ Scroll Sections + sticky | ✓ Scrollytelling, Card Stack, Horizontal Scroll |
| Visual timeline | ✓ under the canvas | — (variants, not a timeline) | Partly: front-end **Scroll Timeline** with keyframe lanes, scroll-driven only |
| **One trigger animates other elements** | ✓ targets | ✓ variants drive children | **Missing** (each effect animates its own element) |
| **Apply one interaction to a whole class** | ✓ | ✓ via components | **Missing** (presets are per element) |
| **States / variants** (Open, Active…) | Partly (via actions) | ✓ core feature | **Missing** (fixed hover presets only) |
| Click / toggle animations | ✓ | ✓ | Partly, inside specific elements |
| Mouse-move driven | ✓ | Code overrides | ✓ Parallax, Physics, Hover tilt |
| Split text | ✓ action | ✓ text effects | ✓ Text Effects |
| Lottie / Rive control | ✓ Lottie action | Components | Partly: Rive and Lottie elements, no "control it from another trigger" |
| **Live preview while editing** | ✓ on canvas | ✓ on canvas | **Partly**: Motion Gallery and some previews in the builder; most effects play only on the front end |
| **Per-breakpoint motion** | ✓ | ✓ | **Partly**: "run on mobile" switches, not per-breakpoint values |
| 3D / WebGL / models | Custom code, Spline | Components | **✓ ahead**: WebGL Object, Model Viewer, Motion Gallery |
| Motion graphics scenes | — | — | **✓ ahead**: Kinetic Scenes |
| Build motion from a prompt | — | — | **✓ ahead**: AI Dev Kit |
| Runs inside WordPress | — | — | **✓** |

*A few Webflow and Framer details above come from third-party tutorials rather than first-party docs (marked "partly" where unsure); the core models (Webflow's triggers, targets, actions and timeline; Framer's effects, variants and scroll sections) are confirmed by their own help and Academy pages.*

## The gaps that matter, ranked

1. **Interactions that target other elements.** The single biggest gap: "hover the card → lift the card, zoom its image, slide its arrow", "click the button → open that panel", "scroll past here → shrink the header". Everything else builds on this.
2. **Live preview in the builder.** Designers iterate by watching. Saving and reloading the front end for every tweak is the biggest workflow cost today.
3. **States (variants).** Named states for an element or a group (Open / Closed, Active, Expanded), with transitions between them, cover toggles, tabs, menus and hover cards in one idea.
4. **Reuse: save an interaction once and apply it to every matching element** (a class, or every card in a grid), and edit it in one place.
5. **A timeline for any trigger, not just scroll.** The Scroll Timeline already has the editor surface, so this extends it to click, hover and load sequences.
6. **Per-breakpoint motion**: different distances, durations or *no motion* on tablet and phone, per interaction.

## Recommended approach

**One interaction engine underneath; today's modules become presets on top of it.**

### The model

An **Interaction** is *trigger → timeline of steps → targets*:

- **Trigger:** page load · scroll into view · leave the screen · while scrolling (scrub, optional pin, start and end) · hover in / out · click (toggle) · mouse move · a custom event from another interaction.
- **Targets**, picked visually: this element · its children · a named element on the page · every element with a class.
- **Steps on a timeline:** *Animate* (any transform, opacity, blur, colour, size, clip, CSS variable, with easing, delay, duration and stagger), *Set*, *Split text*, *Play / pause* (Lottie, Rive, video, Kinetic Scene), and *Toggle state*.
- **States:** named sets of property values on a target, so a step can say "go to *Open*".
- **Breakpoints:** any value can differ on tablet and phone, and an interaction can switch off per device.

### Built on what exists

- **Runtime: GSAP**, already loaded by Scroll Motion, with ScrollTrigger for scroll triggers and the shared frame scheduler and reduced-motion guards the engine already uses.
- **Editor:** a new **Interactions** card on the Animations tab, plus the existing **Scroll Timeline** overlay grown into the timeline for every trigger. Its keyframe lanes and per-page persistence are already built.
- **Presets:** today's Hover, Scroll Motion, Entrance and Exit effects stay exactly as they are for most users. Each can be opened as an interaction and customised, so presets become the starting point rather than a ceiling.
- **Data:** one JSON shape for interactions, so the AI Dev Kit can write them from a prompt, and so they export and import like everything else.

### Phases

| Phase | What ships | Why first |
| --- | --- | --- |
| **I1 · Targets** | Hover / click / load / scroll-into-view triggers that animate *other* elements (named element, children, class), with a simple step list | Closes the biggest gap (patterns 4–6) |
| **I2 · Live preview** | Play any interaction or effect inside the builder, on the element, while editing | The biggest workflow win |
| **I3 · States** | Named states plus "go to state" and toggle; hover cards, menus and tabs built from them | Framer's strongest idea |
| **I4 · Timeline for every trigger** | The Scroll Timeline overlay edits click, hover and load sequences too | Reuses the shipped editor |
| **I5 · Reuse and breakpoints** | Save an interaction as a preset, apply it by class, per-breakpoint values | Scale and polish |

## What stays our advantage

- **Presets for non-designers.** Most site owners will never open a timeline. Keep the one-click effects front and centre and make the interaction model the *power* layer underneath.
- **WordPress.** All of this runs on sites people already own, with their content and plugins.
- **3D, WebGL, Motion Gallery and Kinetic Scenes**, which neither tool has built in.
- **AI.** An interaction model with one JSON shape is something an agent can write: "make the cards lift and their images zoom on hover" becomes a single interaction.

## Open questions

1. **How far to go in the builder?** Full canvas preview of every effect is a large job. Previewing interactions and the most-used presets first may be enough.
2. **States inside the page builder:** should states live on elements (like Framer variants) or on interactions (like Webflow actions)? The proposal above keeps them on elements and lets interactions switch between them.
3. **Should existing modules be rebuilt on the new engine, or only interoperate?** Interoperating is safer: existing pages must keep rendering exactly as they do.

## Sources

- Webflow: [Introducing Webflow Interactions powered by GSAP](https://webflow.com/updates/introducing-webflow-interactions-powered-by-gsap) · [Triggers, targets, actions and animations overview](https://help.webflow.com/hc/en-us/articles/42832297904019-Triggers-targets-actions-and-animations-overview) · [Interactions timeline](https://help.webflow.com/hc/en-us/articles/42861689104531-Interactions-timeline) · [Interactions with GSAP vs. Classic Interactions](https://help.webflow.com/hc/en-us/articles/46300264646803-Interactions-with-GSAP-vs-Classic-Interactions) · [New actions: Lottie & Set, custom presets](https://webflow.com/updates/new-actions-in-interactions-with-gsap-lottie-set) · [Glossary for Interactions with GSAP](https://help.webflow.com/hc/en-us/articles/42861691922963-Glossary-for-Interactions-with-GSAP) · [When to use interactions (Webflow University)](https://university.webflow.com/videos/when-to-use-interactions)
- Framer: [Framer animations overview](https://www.framer.com/academy/lessons/framer-animations-overview) · [Animating between variants on scroll](https://www.framer.com/academy/lessons/framer-animations-scroll-variants) · [Effects (Academy)](https://framer.com/academy/topics/effects) · [Scroll (Academy)](https://framer.com/academy/topics/scroll) · [Animations features](https://framer.com/features/animations) · [Text animations](https://www.framer.com/blog/text-animations/)
- Comparisons and tutorials (third party, opinion): [Zapier: Framer vs Webflow](https://www.zapier.com/blog/framer-vs-webflow) · [Framer vs Webflow in 2025](https://www.toools.design/blog-posts/webflow-vs-framer-in-2025-an-honest-in-depth-comparison) · [Framer University: scroll animations](https://framer.university/blog/10-scroll-animations-to-make-your-website-stand-out) · [Scroll Speed and Transform in Framer](https://designcode.io/framer-web-design-scroll-effects)
- Unyson+: the Animation Engine inventory (`CATALOG.md`), the [Roadmap](./roadmap.md) and the [Scroll Timeline](/animation-engine/scroll-timeline).
