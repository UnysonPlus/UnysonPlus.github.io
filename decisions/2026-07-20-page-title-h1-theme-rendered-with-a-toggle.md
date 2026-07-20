---
slug: page-title-h1-theme-rendered-with-a-toggle
title: "Why the page-title H1 is theme-rendered with a toggle, not a per-page shortcode"
authors: [jon]
tags: [architecture, page-builder, live-editor]
date: 2026-07-20
description: Page Builder pages were rendering with no H1 because the theme's page-title header was skipped for builder pages (they're assumed to build their own layout), and nobody had added a heading in the content. Rather than require a special_heading H1 in every page's builder content, the theme now renders the page title as the H1 on builder pages too — gated by a global "Show Page Title on Builder Pages" default and the existing per-page Hide Page Title toggle — so every page gets exactly one H1 automatically, with the toggle handling landing pages that supply their own.
---

**The question:** Internal Page-Builder pages ship with **no `<h1>`**. Should we require a
`special_heading` (H1) in each page's builder content, or have the theme render the page title
as the H1?

<!-- truncate -->

## Context

`unysonplus_render_page_hero()` already emits `<h1 class="entry-title">the_title()</h1>`, and
there's a per-page **Hide Page Title** toggle. But `content-page.php` wraps the whole title/hero
header in `if ( ! $is_builder )` — it's **skipped for builder pages**, on the assumption a builder
page builds its own layout (including its heading). When a builder page is just content and nobody
added a heading, it ends up with **zero H1s** — an SEO problem, and it was happening across every
internal page of a converted site.

## Options considered

1. **A `special_heading` (H1) element in each page's builder content.** Full design control, but
   it's *manual* — every page must remember to add one (the exact failure mode that produced the
   bug), the heading text duplicates the page title, and it's easy to end up with a **missing** H1
   (forgot) or **two** H1s (added one where a hero already has one). For the converter pipeline,
   every generated page would have to inject a heading node.
2. **Theme renders the page title as the H1 on builder pages, with a toggle.** Automatic, one H1 =
   the page title (single source of truth), and a toggle handles the exception.

## Decision

Option 2. A global **Show Page Title on Builder Pages** default (`pages_show_title_on_builder`,
default **on**) makes `content-page.php` render the page title as `<h1 class="entry-title">` (in a
`.page-title-header`) at the top of builder pages. The existing per-page **Hide Page Title**
(`hide_page_title`) still wins — you switch it **off** on landing pages (e.g. a home page) that
supply their own H1 in the builder, avoiding a duplicate.

## Why

- **Correct-by-default, exception-by-toggle.** Most builder pages are plain content and want the
  title as their H1 — so the default gives every page exactly one H1 automatically. The few
  landing pages with their own hero H1 flip one checkbox. Option 1 inverts that: every page is
  manual work, and the *default* outcome is a missing H1.
- **Single source of truth.** The H1 is the page title (already filled), not duplicated heading
  text that can drift.
- **Chrome, not content.** A page's main heading is structural — the same argument that keeps the
  header/footer in the theme rather than in builder content. Relying on manual content for the H1
  is what left these pages with none.
- **Converter-friendly.** No per-page heading injection — a converted site's internal pages all
  get their H1 with zero extra nodes.

The one default choice worth noting: showing the title on builder pages by default means existing
builder landing pages that already have their own H1 need Hide Page Title switched on (a one-time,
per-landing-page toggle) to avoid a second H1.
