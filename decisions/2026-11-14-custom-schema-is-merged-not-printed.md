---
slug: custom-schema-is-merged-not-printed
title: "Where does schema that someone else wrote go, and why is it merged instead of printed?"
authors: [jon]
tags: [seo, architecture, extensions]
date: 2026-11-14
description: "A client's SEO specialist handed over two JSON-LD files, one for the whole site and one for the About page. Unyson+ had no place to put them. The SEO extension now takes pasted JSON-LD and merges it into its own graph by @id."
---

## The question

"What extension should handle these schemas? Should we add a feature that lets us add them
properly?" A client's SEO specialist had sent two ready-written JSON-LD files: a site-wide one
describing the business, and one for the About page only. Their notes said to *replace* the
Organization, WebSite and WebPage records the site already published, not to add to them.

<!-- truncate -->

## Context

The SEO extension already builds one JSON-LD `@graph` per page: the site identity
(Organization or Person), the WebSite, the page, and the author, plus FAQ, local business,
products, events, recipes and branch locations from its own fields. What it could not do was
accept structured data written somewhere else. The only route was a PHP filter
(`fw_seo_schema_graph`) in a child theme, which is not an answer for a site owner.

## Options considered

- **Paste the `<script>` blocks into the head** (a snippet, a theme setting). Simple, but it
  publishes the business twice: the built-in Organization beside the pasted business, and two
  records sharing `/about/#page` with different types. Search engines read that as conflicting
  data, which is exactly what the specialist's notes warned against.
- **A filter in each site's child theme.** Correct output, but code per site, invisible to the
  owner, and lost on a theme change.
- **Extend the built-in types** (add VacationRental, beds, amenities… to the Local business
  settings). Endless: every hand-over would need new fields, and the specialist's file would still
  have to be retyped.
- **A paste box in the SEO extension that merges by `@id`.** Pasted records replace built-in
  records with the same `@id`, are added otherwise, and can optionally take over the site
  identity, with the built-in references repointed.

## Decision

The **SEO extension** owns it, because it owns the graph. **Custom schema** has a site-wide box
(SEO → Structured data) and a per-page field (the page's SEO box → Advanced). Pasted JSON-LD
(bare, or as `<script type="application/ld+json">` blocks) is merged into the graph:

- same `@id` as a built-in record → replaces it in place;
- otherwise → added;
- "It replaces the site identity" → the first business-like pasted record stands in for the built-in
  Organization or Person, and every built-in reference to it is repointed;
- a page's record beats a site-wide one with the same `@id`.

Broken JSON is kept but not published, with the line and the reason shown under the box. It
travels with the settings export, the per-page spreadsheet and the AI tools.

## Why

- **One graph, one description of the business.** Merging by `@id` is how JSON-LD says two
  records are the same thing; using it means a hand-over can replace exactly what it means to
  replace, without the extension knowing the types involved.
- **The specialist's text goes in word for word.** No retyping into fields, so nothing drifts
  from what they wrote and checked.
- **No code per site.** It survives theme changes and moves between sites with the rest of the SEO
  settings.
- **Mistakes are visible.** A pasted block that silently fails is worse than none; the readout
  says what is published, and where the JSON breaks if it does.

*Status:* Accepted (SEO extension 2.0.67).
