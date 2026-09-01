---
sidebar_position: 1
title: Overview
description: How Unyson+ works with the WordPress block editor — and why it joins the block ecosystem instead of replacing what already works.
---

# Blocks

Unyson+ speaks the WordPress block editor's language while keeping everything it
already has — the page builder, the header/footer builder, the shortcode library,
Theme Settings and the classic PHP templates.

That is a deliberate position, not a transitional one.

## The principle: join, don't convert

WordPress is consolidating around a set of **interchange formats** — `theme.json`
for the design system, block markup for content, `block.json` for components,
Block Bindings for dynamic data, and the Interactivity API for front-end behaviour.
Every new platform capability plugs into one of them.

A framework that does not speak those formats is not *broken* — nothing about it
stops working — but it becomes an **island**: new WordPress capabilities arrive as
things it can only watch.

So the question Unyson+ asks is not *"how do we become a block theme?"* It is:

> For each format WordPress is standardising, is Unyson+ a **participant** or an
> **island** — and what is the cheapest way to participate?

Every step on the [roadmap](./roadmap) is **additive**. Nothing existing is removed,
deprecated, or rewritten.

## What this means in practice

- **Classic themes are not deprecated** by WordPress, and Unyson+ does not treat them
  as legacy. The parent theme stays a classic PHP-template theme.
- **The page builder is not going away.** Blocks are a second *authoring* surface,
  never a second *rendering* path — block output is produced by the same server-side
  code as the equivalent shortcode, so the front end is identical either way.
- **You can use both.** A site can build some pages with the page builder and others
  in the block editor, and they render through the same pipeline.

## Where things stand

| Area | Status |
|---|---|
| Design system published to `theme.json` | Shipped |
| Blocks extension (block library) | Built, not yet released |
| Block Bindings for custom fields | Source + editor picker built |
| Section Styles as block style variations | Built |
| Page-builder → block markup export | Exploring |

See the [roadmap](./roadmap) for detail and for what changes next.
