---
slug: extension-doc-urls-stay-under-extensions
title: "Should extension doc pages move from /extensions/<slug> to root /<slug>?"
authors: [jon]
tags: [documentation, architecture]
date: 2026-11-12
description: Flattening the extension docs to the root (e.g. /extensions/asset-optimizer → /asset-optimizer) was considered for shorter URLs. Decision — keep them under /extensions/<slug>, because the SEO gain is negligible and the root namespace is worth protecting.
---

**The question:** Would it be better to move the extension doc pages from `/extensions/<slug>` (e.g.
`/extensions/asset-optimizer`) to the root (`/asset-optimizer`), with 301 redirects, keeping the menu
as-is?

<!-- truncate -->

## Context

The main docs instance serves at root (`routeBasePath: '/'`), so the `/extensions/` prefix is a slug
choice, not a structural one. The sidebar/menu is independent of the URL, so it stays unchanged either
way, and the `@docusaurus/plugin-client-redirects` plugin is already wired for the 301s. So the move is
cheap to make — the question is whether it's worth making.

## Options considered

- **Keep `/extensions/<slug>`.** No change, clean root namespace, no redirect churn.
- **Flatten everything to root + redirects.** Shorter URLs, but ~30 new top-level routes and ~30
  permanent redirect entries, plus a reindex wobble on already-indexed pages.
- **Flatten only flagship extensions.** Short URLs for a promoted few (Site Converter, SEO, Analytics);
  the rest stay under `/extensions/`. Limits the collision surface but splits the convention.

## Decision

Keep `/extensions/<slug>`.

## Why

- **Root-namespace collision risk.** There are already root-level docs instances at `/seo`, `/crm`,
  `/animation-engine`, `/membership`, `/theme`, etc. Flattening the extensions would dump generic words
  into the root — `/forms`, `/security`, `/blog`, `/updates`, `/chat`, `/shortcodes`, `/woocommerce` —
  where `/shortcodes` risks clashing with the shortcodes reference and every future top-level page has to
  dodge an extension slug. The `/extensions/` prefix is what keeps that namespace clean and predictable.
- **Negligible SEO gain.** Modern search doesn't meaningfully reward one fewer path segment; the keyword
  is already in the slug, and a tidy `/extensions/` topical silo is a mild positive, not a drag.
- **Churn without upside.** Redirects prevent hard 404s, but moving ~30 indexed URLs causes a temporary
  reindex/ranking wobble and leaves ~30 redirects to maintain forever — to buy an invisible benefit.

Same reasoning rules out the flagship-only split: it trades a clean, consistent convention for a couple
of shorter URLs that don't rank any better.
