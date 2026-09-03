---
slug: design-decisions-url-prefix
title: "Why design-decision URLs keep the /decisions/ prefix"
authors: [jon]
tags: [documentation, naming, architecture]
date: 2026-09-03
description: The question was whether to flatten design-decision permalinks to the site root (/block-enrichment-…) instead of /decisions/block-enrichment-… — but the Manual docs instance already owns the root namespace at routeBasePath '/', so flattening would drop decision posts into the same flat namespace as every documentation page, risking URL collisions and erasing the signal that a page is a rationale post rather than reference docs; the decision is to keep the /decisions/ prefix.
---

**The question:** Is it better to make a design-decision permalink `https://docs.unysonplus.com/block-enrichment-which-types-stay-core` — flattened to the site root — instead of `https://docs.unysonplus.com/decisions/block-enrichment-which-types-stay-core`?

<!-- truncate -->

## Context

The docs site runs several Docusaurus instances. The **Manual** instance is mounted at
`routeBasePath: '/'`, so it *owns the site root*: `/intro`, `/shortcodes/*`, `/extensions/*`,
`/page-builder/*`, `/blocks/*` and the rest all resolve at the top level. The **Design Decisions** log
is a separate blog instance mounted at `/decisions`. The proposal was to drop the `/decisions/` segment
so each decision lives at the root, shaving ~11 characters off the URL.

## Options considered

- **Keep `/decisions/<slug>` (chosen).** Decision posts stay in their own namespace, clearly separated
  from reference documentation.
  - *Pro:* no collision with the root namespace the Manual already owns; the path segment tells a reader
    (and a search engine) that the page is a *rationale/blog* post, not a how-to; it's the conventional
    home for blog-style content; the two content types never compete for the same URL.
  - *Con:* a slightly longer URL.
- **Flatten to `/<slug>` at the root.**
  - *Pro:* marginally shorter, "cleaner"-looking URLs.
  - *Con:* drops decision posts into the *same flat namespace* as every Manual page — a decision slug
    could clash with a current or future doc route (e.g. a `/breadcrumbs` decision vs. a breadcrumbs
    doc); removes the content-type signal; mixes "why we decided" prose in with "how to use it"
    reference pages, muddying both.

## Decision

Keep the **`/decisions/`** prefix.

## Why

The saving is cosmetic (~11 characters) and the cost is structural. Because the Manual is served from
the root, a flattened decision URL isn't just "shorter" — it lands in a namespace that already belongs
to the documentation, where it can collide with real doc routes and where nothing distinguishes a
rationale post from a reference page. The prefix is not noise; it is the scope. A reader who sees
`/decisions/…` knows what kind of page they're on before it loads, and the log stays cleanly partitioned
from the Manual it explains. Namespace hygiene beats a shorter string.
