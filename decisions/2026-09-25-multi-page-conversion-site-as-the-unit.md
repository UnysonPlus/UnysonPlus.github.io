---
slug: multi-page-conversion-site-as-the-unit
title: "Why converting a multi-page site is one conversion, not one per page"
authors: [jon]
tags: [site-converter, architecture]
date: 2026-09-25
description: "Converting a site a page at a time makes every page re-derive and rewrite the whole site's design — theme, chrome, menus, permalinks. The decision: the unit of conversion is the SITE. One crawl produces one bundle; site-level phases run once, page phases loop, and shared chrome is derived from what the pages agree on rather than from whichever page was imported last."
---

**The question:** The converter has always been pointed at a single page — in practice a homepage. Converting a real site means converting its inner pages too. Should that be N single-page conversions run one after another, or one conversion of the whole site?

<!-- truncate -->

## Context

Every capture is currently imported as a complete conversion that happens to contain one page. The import runs media, presets, theme settings, theme generation, the style guide, the page itself, then menus. That is exactly right for the first page and quietly wrong for the second, because most of those phases are **site-level**: there is one theme, one header, one footer, one menu, one permalink structure and one media library, no matter how many pages a site has.

Running it per page was measured on a captured source with three inner pages, and the failure modes were not subtle:

- The generated theme is named after the capture, so converting three inner pages built three child themes named after those pages and **activated each in turn**. The last page converted decided how the whole site looked.
- Header and footer were re-derived from each page's own measurements. Four captures produce four competing accounts of the same shared chrome, and the last import wins.
- The guard that protects a user's Theme Settings edits from a later conversion saw that churn as editing. Two consecutive imports went from **0 protected keys to 26** — after which the converter could no longer write the footer's columns, padding or border at all.
- Menus were rebuilt during each page's import, linking to pages that did not exist yet.
- The permalink structure — a site-level setting — was being decided inside a page import.

None of these are bugs in a phase. They are the same bug in the *unit*: the conversion is scoped to a page, and the work is scoped to a site.

## Options considered

- **Keep one conversion per page, and guard each site-level phase.** The smallest change, and the direction the code had already started drifting: skip the theme when a converted theme is active, protect settings with fingerprints, make inner pages reachable. It works, but every guard is a patch for a page pretending to be a site, and each one needs its own "is this really an inner page" test. The settings guard is the warning — it was added to protect a real user edit and ended up locking the converter out of its own keys.
- **Convert pages independently, then reconcile.** Import each page, then run a pass that decides which chrome wins. This keeps the contention and adds a second place for it to be resolved wrongly.
- **Make the SITE the unit.** One crawl emits one bundle holding N page snapshots plus a single site-level design. One import runs site phases once and loops the page phases.

## Decision

The unit of conversion is the **site**.

- **Capture** crawls the source once and writes one bundle: a snapshot per page, plus one site-level design (tokens, presets, media, chrome).
- **Chrome is a consensus.** The header and footer are derived from what the pages agree on, because they are shared by definition. A page that genuinely differs — a landing page with no nav — gets a page-level override rather than rewriting the site.
- **Import runs site phases once** (media, presets, theme settings, theme, permalinks) and then loops the page phases. **Menus run last**, once every page they link to exists.
- **The settings baseline is taken once**, at the end of the whole site import, when the settings state is by definition the converter's own work.

Until the import side is split, an inner page must not touch the design system: convert the front page first to establish the design, then capture inner pages with the section-only scope the importer already honours, so they contribute body content and nothing else.

## Why

The crawl is the part that sounds expensive, and it is already written — the capture carries the page list, per-page slugs and front-page detection, parked behind a single flag while the single-page output was being perfected. The work that remains is splitting the import into site-scoped and page-scoped phases, which is also the thing that retires the guards instead of adding to them.

Deriving chrome from agreement rather than from recency is the part worth insisting on. "Last import wins" is not a rule anyone chose — it is what falls out when four measurements of one header are written to one place. Consensus makes the shared thing explicitly shared, and makes a genuine per-page difference an override that has to be asked for, which is the behaviour a reader of the settings would expect.

The alternative is not cheaper for long. Each new site-level phase added to the converter would otherwise arrive needing its own inner-page test, and each one is a chance to get that test subtly wrong on a source nobody has captured yet.
