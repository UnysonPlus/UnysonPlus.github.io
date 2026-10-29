---
sidebar_position: 12
title: "What lives elsewhere, and where settings are stored"
sidebar_label: "Elsewhere & storage"
description: "SEO-adjacent features that live in other parts of Unyson+, and exactly where the SEO extension stores its settings and per-page values."
---
# What lives elsewhere

A few things people expect from an SEO plugin are produced by other parts of UnysonPlus. They
work today; they simply live somewhere else.

| Feature | Where it lives |
| --- | --- |
| `llms.txt` — a plain-text entry point for AI agents | UnysonPlus theme |
| Breadcrumbs and `BreadcrumbList` structured data | [Breadcrumbs extension](/extensions/breadcrumbs) |
| `FAQPage` structured data | [Accordion element](/shortcodes/interactive-elements/accordion) |

The theme also ships a metadata fallback — description, canonical, share cards and a basic
schema graph — for sites running no SEO plugin at all. Activating this extension stands each
of those down individually as it takes them over, so a page never carries two of anything.

See the [roadmap](./roadmap.md) for what is planned.

---

# Where your settings are stored

Per-page SEO values are stored as individual post and term meta keys (`_fw_seo_title`,
`_fw_seo_description`, and so on) rather than inside a single blob. That means they can be
queried — which is what makes the [list columns](./list-editing.md), their filters and
sitemap filtering possible.

Clearing a field removes the stored value entirely rather than saving an empty one, so the
page falls cleanly back to its template.
