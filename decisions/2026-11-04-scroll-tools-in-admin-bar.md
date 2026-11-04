---
slug: scroll-tools-in-admin-bar
title: Where should the Scroll Ruler and Scroll Timeline triggers live — floating buttons or the admin bar?
authors: [jon]
tags: [admin-ui, animation-engine]
date: 2026-11-04
description: The two admin-only scroll author tools moved their toggles off fixed floating buttons into one "Scroll Tools" admin-bar menu, because the floating buttons sat in the same corners as the site's own on-page controls and blocked clicks.
---

**The question:** the Scroll Ruler and the Scroll Timeline each opened from a **fixed floating button** on
the rendered page (the Ruler's ⟺ bottom-left, the Timeline pill bottom-right). On real sites those corners
are exactly where on-page controls live — a chat FAB, back-to-top, a cookie bar — so the triggers overlapped
them and a logged-in admin couldn't cleanly click either. Where should these toggles live instead?

<!-- truncate -->

## Context

Both tools are **admin-only, front-end** author instruments: they read the page's live GSAP ScrollTriggers and
stay hidden until opened. The *panels* are fine — they're opt-in and only cover the page while you're using
them. The problem was the **persistent triggers**: two always-visible fixed buttons parked in the viewport
corners, competing for the same space as whatever floating chrome the site itself ships. It's an unwinnable
z-index fight, because the plugin doesn't control what a given site puts in those corners.

The reporting case was a demo site with a WhatsApp-style chat FAB sitting directly on top of the Timeline pill
— neither was cleanly clickable.

## Options considered

- **Keep them floating, but make them smarter** — draggable + collapsible, auto-dodging known FAB zones. A
  band-aid: it still competes with site chrome, adds fiddliness, and never fully guarantees no overlap.
- **Move them into the WordPress admin bar.** The admin bar is the canonical home for front-end admin tools
  ("Edit Page", "Customize", cache purgers), it's already gated to exactly this audience (logged-in admins,
  hidden for visitors), and it owns the top strip that no site-side control competes for — so the overlap, the
  click-blocking and the z-index fight all disappear at once. One caveat: the admin bar is hidden in
  fullscreen/customizer and collapses on mobile, but these are desktop authoring tools, so that's acceptable.

## Decision

Consolidate both into a **single "Scroll Tools" admin-bar menu** with a **Scroll Ruler** item and a
**Timeline** item, and drop the fixed floating triggers. Each module adds the shared parent node idempotently
(`admin_bar_menu`, node `upw-scroll-tools`) plus its own child; the module JS prefers the admin-bar link by id
and wires its click to the existing `toggle()`. The panels and the `Shift+R` / `Shift+T` shortcuts are
unchanged.

To avoid losing the entry point where the admin bar is turned off, each tool **falls back to its old floating
button only when the admin-bar node is absent** — graceful degradation, not a hard dependency.

## Why

It removes the whole *class* of problem rather than patching one instance: admin tools belong in admin
chrome, not in visitor space. It also reads as one coherent set (two related tools under one menu, room to add
future motion tools there) instead of accreting more floating widgets, and it costs nothing in capability —
same panels, same shortcuts, same audience gating the admin bar already enforces.
