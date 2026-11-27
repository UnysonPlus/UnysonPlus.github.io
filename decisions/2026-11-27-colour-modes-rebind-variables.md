---
slug: colour-modes-rebind-variables
title: Why Colour Modes re-bind the palette's CSS variables, and which mode wins
authors: [jon]
tags: [theme-settings, color, css, architecture, back-compat]
date: 2026-11-27
description: Roadmap 8d gives the Theme Settings colours more than one set of values. A mode re-binds the existing CSS variables on <html> or on an element, preset CSS now writes palette colours as var() with the hex as fallback, and the order of precedence is section, visitor's dark choice, page, site.
---

**The question:** Roadmap 8d: "Give the Theme Settings colours (and sizes) more than one set of values (Light, Dark, a
second brand) and switch a section, a page or the whole site between them; a visitor's dark-mode preference can pick
the mode." How should a mode reach everything on the page, and when two apply, which one wins?

<!-- truncate -->

## Context

Everything coloured on an Unyson+ site comes from the palette (Color Presets), which the generated CSS publishes as
`--color-{slug}` variables plus `.text-` / `.bg-` classes. The theme's own surfaces (page background, text, header,
footer, menus) are variables too. The theme already had a Dark Mode toggle, but it swapped a fixed list of chrome
colours, so the palette, the buttons and the boxes stayed light-mode colours.

## Options considered

1. **Generate a full second stylesheet per mode.** Exact, but every preset rule would exist once per mode, and a
   section in another mode would need every rule scoped to it.
2. **Re-bind the variables.** A mode is a block of variable values on `<html>` (site, page) or on an element (a
   Section / Div). Everything drawn with the variables follows by inheritance, with no extra rules.
3. **A script that swaps classes.** Works without touching the CSS, but flashes on load and does nothing for cached or
   script-free visitors.

## Decision

Option 2. A mode is `:root[data-fw-mode="{slug}"], .fw-mode-{slug} { --color-…: … }`, plus the element's own text and
background when the mode sets them. The mode marked **Use as Dark mode** is also written for the toggle's
`data-bs-theme="dark"` and, optionally, for `prefers-color-scheme: dark`.

Two consequences were decided with it:

- **Preset CSS writes palette colours as `var(--color-{slug}, #hex)`** instead of the literal hex. Buttons, boxes,
  tables and section styles render exactly as before when no mode applies, and follow one when it does. The literal
  resolver stays for the places that need a real colour (block style variations).
- **Precedence, strongest first: a Section's own mode, the visitor's dark choice, the page's mode, the site's.** A band
  someone set on purpose is the most specific choice; a visitor who asked for dark should get it on every page; a page
  overrides the site default.

## Why

- **Nothing to keep in step.** A mode is a few hundred bytes of variables. A new preset or a new element follows every
  mode the day it ships, because it already reads the variables.
- **No flash and no script.** The page mode is in the HTML, and the dark choice is resolved before paint (the existing
  toggle's boot script) or by the media query.
- **Scoped by nature.** CSS variables inherit, so `.fw-mode-dark` on a band re-colours exactly that band and what is
  inside it.
- **Sizes come along.** The same mechanism takes any variable, so a mode can also change heading sizes or corner radius
  through *Other variables*, without a separate feature.

**Status:** Accepted. See [Colour Modes](/theme/components/colour-modes).
