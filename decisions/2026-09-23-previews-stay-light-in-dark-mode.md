---
slug: previews-stay-light-in-dark-mode
title: "Why a dark admin skin deliberately leaves some panels white"
authors: [jon]
tags: [admin-ui, option-types, architecture, accessibility]
date: 2026-09-23
description: "Building dark mode for the Admin Skin, the same question kept coming back in different clothes: this panel is still white, should it be darkened? Four times the answer was no. The rule that fell out is that anything rendering front-end output is a preview, and a preview has to look like the thing it previews — so you skin the chrome around it and never the preview itself."
---

**The question:** While sweeping the admin for light surfaces in dark mode, four separate panels came up as "still white — fix it?": the classic editor's writing area, the Box Style / Table Style / Border Hover Animation picker swatches, and the Box Shadow preview. Are those bugs, or are they meant to stay light?

<!-- truncate -->

## Context

The Admin Skin restyles the **real** wp-admin rather than replacing it, so its job is to recolour chrome: sidebars, tables, postboxes, form controls, modals. A dark-surface sweep is mostly mechanical — find a background whose channels sum above a threshold, point it at a token.

But wp-admin contains a second category of pixels. Some panels are not chrome at all: they are a rendering of what a **visitor** will see. The classic editor's canvas is an iframe loading the theme's front-end stylesheet. A Box Preset swatch draws the preset's real border, radius and shadow. The Box Shadow control renders the actual shadow being configured.

Those surfaces are white for a reason: the front end is a light surface, so that is the context the preview is emulating.

## Options considered

**Darken everything.** The sweep stays consistent, nothing looks out of place, and there are no "unfinished" white boxes left on a dark page. It is also the easy answer — each one is a one-line token swap.

The problem shows up later, at the point of use. A shadow is a soft dark edge; on a dark panel it is close to invisible, so the control stops communicating the thing it exists to configure. A border preset designed to read against white can look completely different against near-black, so the picker shows a choice that is not the one being made. And on a dark editor canvas, text colours picked by eye can turn out unreadable on the published page — the preview quietly stops being a preview and becomes decoration.

**Darken everything, but nest a light "preview area" inside each.** Honest, but it multiplies the chrome: every control grows a nested surface, and the nesting reads as clutter on controls that are already dense.

**Leave previews light, skin only their chrome.** Slightly inconsistent at a glance — there are pale rectangles on a dark page — but each one is pale *because that is the colour of the surface being previewed*.

## Decision

Anything that renders front-end output keeps its light surface in dark mode. The chrome **around** a preview — the trigger, the dropdown panel, the option labels, the row hover — follows the skin as normal.

Concretely that covers `.bsp__preview`, `.tsp__preview`, `.bha__preview`, the Box Shadow `.bsh-preview`, and the classic editor canvas. The canvas is the one case with an escape hatch: a `dark_canvas` setting exists for people who want it, and it is **off by default**, with the trade-off spelled out in its own description.

## Why

The alternative optimises the wrong thing. Visual consistency inside the admin is worth something, but not as much as a preview that tells the truth — and the cost of a dishonest preview is paid on the live site, by the visitor, long after the admin screen is closed.

It also gives a test for the next one of these, which is the real value. The question is never "does this look out of place in dark mode". It is "would recolouring this change what the user believes about the published page". If yes, it is a preview: leave it alone and skin around it.
