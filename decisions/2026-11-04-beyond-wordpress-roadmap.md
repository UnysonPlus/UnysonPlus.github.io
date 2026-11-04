---
slug: beyond-wordpress-roadmap
title: "Can Unyson+ be ported to other platforms, and where should it go first?"
authors: [jon]
tags: [architecture, extensions]
date: 2026-11-04
description: Ports of Unyson+ to OpenCart, Joomla, Shopify, Astro and Sanity were weighed. Decision — build a shared renderer and Astro components first, feed them from headless WordPress, then Sanity and Payload, with ecommerce ports after. The plan gets its own docs section.
---

**The question:** Can Unyson+ be ported to other CMSs such as OpenCart, Joomla or Shopify, or become a page
builder for Astro and Sanity? Which comes first, and do the docs for it belong with Headless WordPress?

<!-- truncate -->

## Context

Unyson+'s PHP depends on WordPress throughout, so no port is a copy. Its data (builder JSON, presets, Theme
Settings) and its output (HTML, CSS, motion) do not depend on WordPress. Sites built on Astro with a headless CMS
are fast but rarely have a full visual builder.

## Options considered

- **Port to a PHP ecommerce CMS first (PrestaShop, OpenCart).** Existing PHP can be reused, but each port needs its
  own adapter and the audience is limited.
- **Build a Shopify app first.** The largest market, but a hosted rebuild with app review, hosting and support.
- **Start with a shared renderer and Astro components.** A contained project with no marketplace or hosting, and
  it becomes the core for headless WordPress, Sanity and a Shopify app.
- **Docs: merge into Headless WordPress, or a separate section.** Merging is simpler, but those guides are about
  what works today, and this is mostly a plan and a set of tutorials.

## Decision

Build a CMS-agnostic renderer and Astro components first. Feed them from headless WordPress, then add a Sanity
Studio builder, then Payload, and consider Strapi or Storyblok on demand. Ecommerce ports follow, with PrestaShop
as the first PHP port and Shopify as a separate track, started through converter output.

The plan lives in its own section, [Beyond WordPress](/beyond-wordpress), linked both ways with Headless WordPress.

## Why

The shared core is needed by every later target, so it pays off each time. Starting from headless WordPress keeps
the builder people already know and needs no new admin. A separate section keeps exploratory plans from being read
as features of an extension that exists today.

Status: exploratory. The plan is on the [roadmap](/beyond-wordpress/roadmap).
