---
slug: rich-nested-content-in-tabs-snippets
title: "How a Tab holds rich, nested content: reuse Snippets, not query-posts, id-targeting, or a parallel builder"
authors: [jon]
tags: [architecture, shortcodes, extensions, back-compat]
date: 2026-09-05
description: "The Site Converter mapped jukeboxburgers.com's tabbed #menu (each tab a full flexbox/grid layout) onto the Tabs shortcode, whose per-tab content is only a wp-editor field — so the rich layout had nowhere to live. The question was how to let a tab (and later accordion / other repeaters) hold real nested builder content. Four paths were on the table: Bricks-style query-posts (each tab a post), targeting a flexbox by CSS #id, a bespoke Nested Builder option type, or reusing the existing Snippets extension. The decision is Snippets — a snippet is real, reusable page-builder content rendered through the actual shortcode pipeline, and its CPT is non-public and not indexed — inserted via a universal Insert Snippet button on every wp-editor rather than a per-field picker, so it solves richness, reuse, and the SEO worry at once with one build and the least new code."
---

**The question:** The Tabs element's per-tab content is a single `wp-editor` field, but a converted section (jukeboxburgers.com's `#menu`) needs each tab to hold a full **flexbox + grid layout of menu cards**. How should a tab — and, by the same mechanism, an accordion or any other repeater — hold rich, nested page-builder content?

<!-- truncate -->

## Context

The Site Converter faithfully recognized the source as tabs and routed it to the `[tabs]` shortcode. But `[tabs]` was built for light content: a title and a `wp-editor` panel per tab. A tabbed menu whose panels are themselves builder layouts had nowhere to go, so the rich content was lost in conversion.

We had earlier started a **Nested Builder** option type — a lightweight embeddable page-builder canvas (subclassing the same base as form-builder / page-builder) with its own `pane` / `box` / `text` items — to drop into the Tabs popup. It works, but a nagging concern kept surfacing: it **reinvents content elements** the page builder already has. A quick test confirmed the friction — the page-builder shortcodes render from their saved **JSON meta** via `json_to_shortcodes()`, not from composed `[shortcode]…[/shortcode]` nesting, so a parallel item tree can't cleanly reuse their rendering. Reuse-maximal meant the tree had to *be* a page-builder tree.

Separately, research into how Bricks does nested tabs found it backs each tab with a **queried post** — which raised a real SEO worry: those posts can be indexed, appear in sitemaps, and be reached directly.

## Options considered

- **Query-posts (Bricks model): each tab is a post.** *Con:* SEO leak (indexable standalone URLs), and it pollutes the CMS with partial-content posts. Rejected.
- **Target a flexbox/container by CSS `#id`.** A "nested tab" shortcode points at a container elsewhere on the page. *Con:* fragile — JS hunting/moving DOM, id collisions, ordering, FOUC, breakage if the target moves or is deleted. Rejected.
- **Bespoke Nested Builder option type.** Author nested content inside the tab's option popup. *Pro:* inline authoring. *Con:* reinvents the content elements (the exact concern above), needs its own renderer, and can't cleanly reuse the real shortcodes' JSON-meta rendering. Kept, but **deferred** — labelled *Experimental* in the demo and paused.
- **Reuse the Snippets extension.** A tab's content can be a **snippet** — real page-builder content, embedded by reference. *Pro:* zero reinvention, real rendering, reusable anywhere, SEO-safe. *Con:* a snippet is a reusable library entity (edit-once-affects-all; a one-off makes a library row), and authoring is a separate step rather than inline.

## Decision

Use **Snippets as the rich-content unit**, inserted via a universal **"Insert Snippet" editor button** rather than a per-field picker. A first pass added a per-tab *Content Snippet* select on the Tabs element and proved the render pipeline end-to-end (a flip-box snippet rendered correctly inside a tab). But a select is a per-field, whole-panel, either/or control — one snippet per tab, no mixing with editor text, and it would have to be re-added to every repeater.

So the select was **replaced** by an *Insert Snippet* button that lives in the **Snippets extension** and attaches to **every `wp-editor`** — the Visual (TinyMCE) toolbar and the Text (Quicktags) toolbar both — via `mce_external_plugins` / `mce_buttons` and a shared picker modal (`window.fwSnippetPicker`). Clicking it drops `[snippet id="…"]` at the caret, which the editor content already renders through `do_shortcode()`. That means:

- **One build, universal reach** — tabs, accordion, plain post content, text widgets: anywhere content is edited, with nothing per-shortcode to wire.
- **Inline and mixable** — editor prose and one *or several* snippets can coexist in the same field, unlike the select's whole-panel replacement.
- **Discoverable** — a familiar "Add Form"-style button, so no one has to remember the `[snippet id]` syntax or the numeric id.

A myth worth recording: **wp-editor does not strip shortcodes.** `[snippet id="5"]` is plain text to TinyMCE and survives untouched — the stripping people hit is TinyMCE sanitising *raw HTML*, which is why the answer is "insert the shortcode," not "paste the rendered markup" (and why no kses/TinyMCE allow-listing was needed).

The **Nested Builder** option type is **deferred**, not deleted: it's marked *Experimental* and may return later as a true *inline* authoring canvas, but Snippets + the editor button carry rich content for now.

## Why

Snippets already are exactly the unit we were about to rebuild. A snippet is authored with the **full, real page builder** (every element), stored as builder JSON, and rendered through the **actual** shortcode pipeline — so a tab gains arbitrarily rich, nested layouts with **no reinvented shortcodes** and no second renderer to maintain. It answers the concern that spawned this whole thread ("it feels like you're creating shortcodes from scratch") by not creating any.

Crucially it also **resolves the SEO worry** the query-posts model raised: the `snippet` CPT is registered `public => false`, `publicly_queryable => false`, `exclude_from_search => true`, `has_archive => false`, `rewrite => false` — no front-end URL, not indexed. The content still renders *inline* in the host page's HTML (so it's indexed as part of that page, which is the *good* kind), but never as a separate indexable document. And because a snippet is just `[snippet id="…"]`, the same mechanism drops straight into any repeater — reuse for free.

The tradeoff (snippets are reusable, so one-offs create a library row and authoring is a separate step) is minor and often a feature; if it ever bites, a "create a new snippet from here" shortcut closes the gap without changing the architecture. Fidelity of reuse and SEO safety, for the least new code, beat the inline-authoring nicety of the bespoke builder — which we keep on the shelf rather than throw away.

*Status: Accepted.*
