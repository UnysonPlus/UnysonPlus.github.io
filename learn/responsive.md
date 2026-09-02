---
sidebar_position: 4
title: Responsive Layout
description: How responsive web design works — mobile-first thinking, fluid layouts, media queries and flexible images so one site fits every screen.
keywords: [responsive design, mobile-first, media queries, css layout, viewport, breakpoints]
---

# Responsive Layout

**Responsive design means one website that adapts to any screen** — phone, tablet, laptop —
instead of a separate mobile site. Most of your visitors are on a phone, so this isn't
optional.

## The essentials

- **Design mobile-first.** Start with the narrow, single-column layout, then *add* columns and
  space for wider screens. It's far easier than cramming a desktop design onto a phone.
- **Let content reflow.** Use flexible, relative sizes so columns wrap to one column on mobile
  instead of overflowing or forcing a horizontal scroll.
- **Media queries do the switching.** A CSS `@media` rule applies different styles at different
  widths — this is the machinery behind "breakpoints".
- **Images must flex.** An image should never be wider than its container (`max-width: 100%`),
  and the browser can serve a smaller file to small screens.
- **Test on a real phone.** Your browser's device toolbar helps, but nothing beats checking on
  an actual handset.

## In UnysonPlus

Columns and layouts are responsive by default, with per-device controls that set the media
queries for you — so a three-column row becomes one column on a phone without any CSS.

**Learn more:** [MDN: media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) · [web.dev: Learn Design](https://web.dev/learn/design/)
