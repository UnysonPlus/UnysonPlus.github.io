---
title: Components and Motion
sidebar_label: Components and Motion
sidebar_position: 3.85
slug: /components-and-motion
description: Why a generated site can come out as plain rectangles even when every check passes — the component library a build is supposed to use, the extension that ships switched off, and the one moment every site above the quiet level has to name.
---

# Components and motion

A generated site reads as generated when it is built from rectangles: a tinted band, a white card, a
photograph, repeat. That is almost never a limit of the framework. It is a build that did not know what it
had.

This page is the inventory, and the one rule attached to it.

:::info The rule
A band that carries **no** component — no pattern, no divider, no preset beyond the defaults, no motion —
**needs a reason**. "I didn't know the library was there" is not one, and neither is a restrained style:
Swiss and Monochrome are *spare*, not *undecorated*.
:::

## First: the Animation Engine ships switched off

This is the single thing most likely to make a site come out flat, and it is silent.

**The Animation Engine is inactive in the core plugin.** Until it is activated, every motion module is
simply absent — 35 animated backgrounds, 22 scroll reveals, text effects, marquees, parallax, sticky
stacks, page transitions. Nothing fails. No warning appears. A whole site can be built, pass its checks and
ship with the entire motion library turned off.

Activate it in **Unyson+ → Extensions** before building, or have your agent do it as part of applying the
design system.

:::caution Verify it in a fresh page load
The request that activates the extension still reports it inactive. Check after a reload, or you will
believe a false negative.
:::

## What is in the box

Counts are what a stock install registers; your site may have more.

| Library | Roughly | Attaches to |
| --- | --- | --- |
| Background patterns | 12 | a band |
| Shape dividers | 6 | a band's top or bottom edge |
| Section styles (surfaces) | 5 | a band |
| Box presets | 5 | any card or column |
| Icon badge presets | 5 | icon elements |
| Container widths | 5 | a band |
| Animated backgrounds | 35 | containers |
| Scroll reveals | 22 | any element |
| Animation Engine modules | 35 | varies |

**Patterns:** dots, grid, diagonal stripes, vertical stripes, horizontal stripes, checkerboard, crosshatch,
triangles, chevron, circles, scales, confetti.

**Shape dividers:** tilt, curve, wave, triangle, layered wave, layered slants.

**Scroll reveals:** twenty clip-wipe directions (up, down, iris, diagonal, split, blinds, bars and more),
plus two canvas styles — pixelate and dissolve.

## A budget, not a buffet

The opposite failure is a page wearing all of it at once, which reads as noise and loses on usability at the
same time. For a Measured site:

- **One surface treatment** that is not a flat fill — usually a pattern on the band carrying repeated cards.
- **One edge** — a divider where two bands of very different colour meet, so the change reads as designed
  rather than as a seam.
- **One motion idea**, which is the signature moment below.
- **Box and button presets chosen**, not defaulted. The shipped Card preset is a starting point to edit.

## The signature moment

Every site above Quiet gets **exactly one** idea a visitor would describe out loud — one per site, not per
page — and everything else stays deliberately still around it. This is the rule that turns a competent page
into a memorable one, and it is now a **ship-gate check**: the build has to name the moment in a sentence,
and no sentence means no pass.

It qualifies only when all four hold:

1. **It belongs to this business.** Moved to a competitor, it should break.
2. **It is on the path the visitor already takes.** A moment nobody scrolls to did not happen.
3. **It survives its own failure** — reduced motion, keyboard, a slow phone.
4. **It is built from the framework's own machinery**, not a script bolted beside the page builder.

> **Make the motion mean something.** Three cards fading up together is decoration. The *same* three
> staggered 120 milliseconds apart, on a broker's site, is offers arriving one after another — the
> business's own argument, told in motion. Same module, same cost, and only one of them is a reason.

## Before you call it done

- The Animation Engine is active, confirmed on a fresh page load.
- Every band either carries a component or you can say why it does not.
- The signature moment is named, in one sentence.
- Reduced motion is on and the page still makes sense with every animation disabled.
- The layout audit has run **on every page**, not just the home page — it reports spacing collisions,
  content touching the screen edge and headings jammed under a shape divider, none of which a screenshot
  reliably shows.
