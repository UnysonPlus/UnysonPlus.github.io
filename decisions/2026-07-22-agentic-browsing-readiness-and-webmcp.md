---
slug: agentic-browsing-readiness-and-webmcp
title: "Whether to invest in agentic-browsing readiness — and whether to build WebMCP now"
authors: [jon]
tags: [architecture, accessibility, agentic-browsing]
date: 2026-07-22
description: AI agents consume a page through its accessibility tree and its server-rendered HTML (including structured data). The question was whether UnysonPlus should invest in being "agent-ready," and whether that includes building a WebMCP integration now. We decided yes to agent-readiness — it is a natural extension of the framework's clean-DOM selling point, and we shipped the ARIA-correctness fixes, schema.org JSON-LD (Organization/WebSite/Article, plus opt-in Review/Product/HowTo), an llms.txt entry point, robots Sitemap signals, and native head-meta fallback. But we decided to DEFER WebMCP to a future opt-in, read-only prototype rather than build it now, because the standard is still emerging and near-zero agents consume it today.
---

**The question:** An AI browsing agent reads a page two ways — through the **accessibility tree**
(roles, names, states) and through the **server-rendered HTML** (text, links, and machine-readable
structured data). Should UnysonPlus invest in being "agent-ready" across both channels? And does that
investment include building a **WebMCP** integration (page-exposed tools an in-browser agent can call)
now?

<!-- truncate -->

## Context

A full audit of the plugin + parent theme (three parallel read-only passes: ARIA correctness,
structured data & landmarks, crawl signals & JS fallback) found the **foundation strong** — interactive
shortcodes server-render their real text, `alt` is always emitted, decorative icons are `aria-hidden`,
landmarks are largely correct — with **two systematic gaps**:

- **A handful of malformed ARIA widgets** — mainly filter bars mislabelled as `role="tablist"` with no
  real tabs, a flip-box nesting interactive content inside `role="button"`, and a hotspot popover
  claiming `role="tooltip"` while holding a link.
- **Almost no schema.org structured data** — only breadcrumbs emitted any; no Organization, WebSite,
  Article, Review, Product, or FAQ/HowTo — and no crawl-signal infrastructure (robots additions,
  `llms.txt`, sitemap references) at all.

Separately, **WebMCP** — the emerging `navigator.modelContext` proposal that lets a page register
callable tools for an in-browser agent — had **zero surface in the codebase**. "Validating WebMCP
integrations" presupposed something that did not exist; the real question was whether to *build* one.

## Options considered

- **Do nothing / treat it as SEO's job.** Cheap, but leaves the malformed a11y tree (which also hurts
  assistive tech, not just agents) and forfeits the clean-DOM story that is a genuine UnysonPlus
  differentiator — the demo site literally shows the generated markup.
- **Invest in agent-readiness.** Fix the ARIA correctness cluster and add structured data + crawl
  signals. High value, low risk, and a direct extension of work already underway (descriptive links,
  accessibility-tree fixes). The schema/crawl additions are additive and SEO-plugin-aware (they step
  aside when Yoast/Rank Math/etc. are active), so they can't conflict.
- **Build WebMCP now (framework-wide).** Would let agents call site actions directly. But the spec is
  unstable, near-zero agents consume it in the wild today, and a broad integration risks rework as the
  API shifts.
- **Build WebMCP as a small opt-in prototype.** An inactive-by-default extension (like the Animation
  Engine) exposing a few read-only tools behind a feature-detect, isolated to one adapter file.

## Decision

**Invest in agent-readiness now; defer WebMCP to a future opt-in, read-only prototype.**

Shipped in this pass:

- **ARIA correctness** — filter bars → `role="group"` + `aria-pressed`; flip-box no longer wraps
  interactive content in `role="button"`; hotspot popover → disclosure; gallery thumbs → group; tab
  panels get `tabindex="0"`.
- **Structured data** — a theme JSON-LD layer (Organization, WebSite + SearchAction, Article/BlogPosting
  + ImageObject) that auto-detects a dedicated SEO plugin and steps aside; plus **opt-in per-shortcode**
  schema: Review + AggregateRating (star-rating, testimonials), Product + Offer (pricing-table,
  comparison-table), and HowTo (timeline) — each gated by a switch, mirroring the accordion's existing
  `faq_schema`.
- **Crawl signals** — a generated `/llms.txt` entry point (cached, filterable) and a robots.txt Sitemap
  reference; native canonical/OG/Twitter/description head-meta emitted only when no SEO plugin is
  present.
- **Single-H1 listings** and other polish (skip-link → `<main>`, carousel alt from the attachment,
  optional accessible-label on the icon shortcode, server-rendered rotating words in animated-heading).

WebMCP: **not built now.** If pursued later, it will be a small opt-in extension exposing read-only tools
(`search_site`, `get_page`, `list_recent_posts`, and review-style tools on relevant themes) behind a
single feature-detect + adapter file, so a spec change is a one-file edit.

## Why

Agent-readiness is the same discipline as accessibility and clean semantic HTML — work that pays off for
screen readers, search engines, **and** agents at once, and reinforces the framework's actual selling
point (an un-bloated, meaningful DOM). It is additive and reversible, and the SEO-plugin detection means
it never fights an existing setup.

WebMCP is different: it is a bet on an **unsettled** standard with **no meaningful consumer today**.
Building it broadly would mean maintaining a moving target for an audience that doesn't yet exist. The
disciplined move is to make the site *maximally legible to agents through the stable channels that exist
now* (semantics + structured data + a canonical `llms.txt`), and keep WebMCP as a cheap, isolated
prototype we can stand up quickly once the API and agent adoption justify it.

Status: **Accepted.** Agent-readiness shipped; WebMCP deferred to an opt-in prototype, revisited when the
spec stabilises.
