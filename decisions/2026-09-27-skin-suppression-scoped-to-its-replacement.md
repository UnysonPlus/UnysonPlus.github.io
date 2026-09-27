---
slug: skin-suppression-scoped-to-its-replacement
title: "Why hiding a core affordance has to be scoped to wherever its replacement exists"
authors: [jon]
tags: [admin-ui, css, accessibility]
date: 2026-09-27
description: "On a phone the Admin Skin left no way to reach the front end at all. The cause was not a missing feature: it was a hide rule written for a replacement that only exists on desktop. The decision is about where a suppression rule may apply, and it generalises past this one item."
---

**The question:** At phone width the skin had no link out to the site — stock wp-admin puts a house in the toolbar whose menu holds Visit Site, and the skin hides that item. Should the skin grow its own front-end link in the off-canvas panel, or give core's item back?

<!-- truncate -->

## Context

The skin hides `#wp-admin-bar-site-name` for a good reason: it draws a brand row at the top of the sidebar carrying the site name, linking to the front end. Two links to the same place, one of them in a toolbar the skin is trying to keep sparse, is one too many.

The hide rule was written unconditionally. The brand row, however, is `display: none` below 783px — the sidebar is off-canvas there and starts with a search box. So on a phone the suppression stayed and the thing justifying it did not. There was no way out of wp-admin at all short of editing the URL.

## Options considered

**Add a "Visit Site" row to the off-canvas panel.** Reads well — the panel had empty space at the top where the search box floated, and a header row would have filled it. But it invents a second affordance for something core already solves, in a place no one has learned to look, and it means new DOM built in JS for a link that already exists in the markup.

**Show the brand row in the panel on mobile.** Reuses what is there. The brand row also carries the WordPress mark, whose menu opens on hover — which does not exist on touch, so half the row would be dead.

**Scope the hide rule to where the replacement is.** One media query. Core's item comes back exactly as core draws it: a 52px column with the site icon, and a menu holding Visit Site.

## Decision

The hide is wrapped in `@media screen and (min-width: 783px)`, and core's mobile display model for that item is restated after the skin's generic bar rules (which lay every `.ab-item` out as flex — and flex defeats the `text-indent` core uses to hide the site title behind its icon, so the title spilled across the toolbar until that was put back).

The general form: **a rule that suppresses a core affordance carries the same conditions as the thing replacing it.** If the replacement is desktop-only, so is the suppression.

## Why

The first two options both answer "the skin is missing a front-end link", and that was never true — the link was in the page, deliberately hidden by us. Building a new one would have left the old rule in place, still wrong, with a second implementation sitting next to it.

It is also the cheaper failure mode to reason about. A skin is a long list of "core does X, we do Y instead"; every one of those is a small promise that Y is actually present. When Y is conditional and the rule hiding X is not, the result is not a cosmetic difference — it is a function that silently disappears, which is exactly how this one was found.
