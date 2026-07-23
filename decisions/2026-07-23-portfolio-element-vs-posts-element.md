---
slug: portfolio-element-vs-posts-element
title: "Why [portfolio] grew into a rich element instead of deferring to [posts]"
authors: [jon]
tags: [portfolio, shortcodes]
date: 2026-07-23
description: The posts element can already list projects via post_type="fw-portfolio", so the portfolio grid could have stayed a thin wrapper. It grew into a full element instead, because its defining features — featured-first meta queries, hide-from-archive flags, card thumbnails, lightbox card mode, AJAX taxonomy filtering that cooperates with load-more — are portfolio-domain concepts that don't belong in the generic posts option surface.
---

**The question:** `[posts post_type="fw-portfolio"]` already renders project listings with
layouts, card styles and pagination. Should `[portfolio]` stay a lightweight filter-grid and
steer users to `[posts]`, or grow into the full portfolio element?

<!-- truncate -->

## Context

The 1.0.13-era design intent was explicitly "grids of projects are the job of the generic posts
element". Meanwhile `[portfolio]` had one layout, no pagination, and a render-then-hide filter.
Growing it duplicates some of posts' machinery; deferring keeps one listing engine but pushes
portfolio-specific needs into a generic element's options.

## Options considered

- **Defer to [posts]** — one engine, but featured-only meta filters, hidden-project exclusion,
  card-thumbnail preference, lightbox card mode and metro cell sizes would all become
  portfolio-only options polluting the generic posts UI (which serves every CPT).
- **Grow [portfolio]** *(chosen)* — a portfolio-domain element sharing the extension's render
  helpers with the archive templates, borrowing proven *patterns* (AJAX pagination, layout set)
  from posts rather than its code paths.

## Decision

`[portfolio]` is the portfolio listing element: grid/masonry/list layouts, real AJAX category
filtering (server re-query, deep-linkable), load-more pagination, lightbox card mode, hover and
ratio presets — all built on the same shared helpers the archive/taxonomy templates use.
`[posts post_type="fw-portfolio"]` remains available as the generic alternative.

## Why

- **Domain features stay in the domain.** Featured-first, hide-from-archive, card thumbnails and
  lightbox mode read from portfolio meta the generic element rightly knows nothing about.
- **One CSS/markup contract for element AND archive.** The archive templates and the element
  render through the same card/grid helpers, so a site's archive and its builder-placed grids
  can never drift apart visually.
- **The posts element stays generic.** No portfolio-only switches in an options panel used for
  blogs, docs and every other post type.
