---
slug: headless-is-its-own-extension
title: "Headless WordPress with Unyson+: a new extension, or more REST options in Custom Fields?"
authors: [jon]
tags: [architecture, extensions]
date: 2026-10-28
description: Running WordPress headless with Unyson+ in place of ACF and a custom post types plugin. Decision — a separate Headless extension that builds on the REST support already in Custom Fields and Post Types, and serves builder pages both rendered and as structured JSON.
---

**The question:** Can a headless WordPress site use Unyson+ instead of ACF and a custom post types plugin,
reading everything over the REST API? And if so, where does that work live?

<!-- truncate -->

## Context

Unyson+ already has the pieces of a headless CMS. Post Types registers post types and taxonomies with
`show_in_rest` on, and Custom Fields can expose a field group as `unysonplus_fields`. But that output is
raw (an image is an attachment ID), read-only and limited to posts. Theme Settings, menus and Page Builder
content are not in the API at all, and builder pages exist only as shortcodes that render to HTML.

## Options considered

- **Add more REST options to Custom Fields.** Small, but headless is wider than fields: settings, menus,
  builder layouts, preview, rebuild webhooks and CORS have nothing to do with Custom Fields, and most sites
  never need them.
- **A separate Headless extension.** One place for everything a headless site needs, off unless a site
  activates it, with its own repo and release sequence. It reuses the existing REST field and adds to it.
- **Builder content: rendered HTML only.** Easy, but it ties the front end to Unyson+ markup and CSS.
- **Builder content: structured JSON only.** Truly headless, but every front end must build a component
  for every element before a single page shows.

## Decision

Build a **Headless extension** (`headless`, repo `UnysonPlus-Headless-Extension`) on top of the existing
Custom Fields and Post Types REST support, without replacing it. Serve builder content **both ways**:
rendered HTML with the CSS it needs, and the structured layout tree. The front end chooses.

## Why

Keeping it separate keeps the core lean, the same rule as for every other extension: sites that never go
headless carry none of it. Offering both builder formats lets a project start with rendered pages on day
one and move element by element to its own components, without changing the API.

The plan is on the [Headless roadmap](/extensions/headless/roadmap).
