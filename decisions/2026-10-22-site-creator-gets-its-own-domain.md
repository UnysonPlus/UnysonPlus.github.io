---
slug: site-creator-gets-its-own-domain
title: "Where should the site generator live — and is it a new site, or the CRM generator grown up?"
authors: [jon]
tags: [site-creator, naming, architecture, documentation]
date: 2026-10-22
description: The AI Website Creator needed a home, and docs.unysonplus.com is for documentation. The question looked like naming, but underneath it was structural — the CRM website generator already does exactly this for one vertical, and the roadmap already says it becomes the first vertical. Decision — generalize the CRM generator in place as create.unysonplus.com rather than build a second generator beside it, with the CRM family at /crm/ and its industry pages nested under it.
---

**The question:** The AI Website Creator has no public home. `docs.unysonplus.com` should stay
documentation, so where does the generator live, and what is it called?

<!-- truncate -->

## Context

Three properties are already live, and they set a pattern: `docs.unysonplus.com` (documentation),
`crm.unysonplus.com` (the CRM website generator), `kinetic-scenes.unysonplus.com` (the Studio). Each is
`<thing>.unysonplus.com`, each its own repo deployed to GitHub Pages.

The naming question turned out to be the smaller half. **The CRM website generator already is the site
creator, for one vertical**: it takes a few choices and emits a build prompt plus a structured
`site-spec.json`; its `src/presets/*.js` are industry templates; it already ships an `any-business.js`
generic fallback. Phase 6 of the AI Website Creator roadmap had independently arrived at the same
place — *"the CRM Generator becomes the first vertical"*.

So the real question was whether to build a second generator beside it, or grow the one that exists.

## Options considered

**A second site at a new domain.** Clean separation, and the CRM generator keeps doing its job
undisturbed. But it means two generators, two preset libraries and two build pipelines that would
drift — and a visitor having to work out which one they want. The duplication would land on exactly
the asset the project has been most careful about elsewhere: one description of a thing, not two.

**Generalize the CRM generator in place.** One codebase, which is already the right shape for it: the
preset architecture *is* a vertical-template system. The cost is a rename, a restructure, and losing
the `crm.` domain's identity.

On the naming itself: `create` over `generator` (names the outcome, not the machine), `build`
(overloaded — CI builds), `sites` (a plural noun reads like a directory listing), `studio` (Kinetic
Scenes was *Animation Studio*; too close) and `new` (ages badly). `create` also already appears on four
surfaces — the `create-site` skill, the dashboard's "Create a Site" card, the `site-creator/` docs
folder and the `/create-a-site` page — so anything else would have been a fifth name for one thing.

## Decision

**Generalize in place.** `crm.unysonplus.com` becomes **`create.unysonplus.com`**, repo
**`UnysonPlus-Site-Creator`**, with the CRM family at `/crm/` and its industry pages nested under it:

```
create.unysonplus.com/                    the general creator
create.unysonplus.com/crm/                the CRM family hub
create.unysonplus.com/crm/real-estate/    an industry within it
create.unysonplus.com/ecommerce/          a future family, same shape
```

Documentation stays on `docs.unysonplus.com`. A tool that *does* something does not belong on a
documentation domain.

## Why

**The duplication was the deciding factor.** Two generators would have meant two preset libraries
describing the same industries, and the one that drifted would be the one nobody opened — the same
reasoning that makes a style entry a *mapping* onto an existing design skill rather than a second
description of the same look.

**The migration turned out to be free.** The eight industry pages were the one thing worth protecting,
because in this model the slug is the search term. GitHub Pages cannot issue a 301 and serves one
custom domain per repo, so preserving them would have meant keeping the old repo alive as redirect
stubs. That mattered right up until the traffic was checked: the CRM site is new and has had no
visitors. With nothing to preserve, the question changed from *what survives the move* to *what
structure do we want in two years* — and the tidier nested form won, since `/crm/real-estate/` says
CRM once where `/crm/real-estate-crm-website/` says it twice.

Had those pages been ranking, this decision would have gone the other way on structure: keep every
slug at root, change the domain only, and accept the redundancy.
