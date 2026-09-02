---
sidebar_position: 2
title: Semantic HTML
description: What semantic HTML is and why it matters — using the right element (headings, lists, buttons, tables, landmarks) instead of a div for everything.
keywords: [semantic html, html elements, accessibility, seo, headings, landmarks]
---

# Semantic HTML

**Semantic HTML means using the element that describes what the content *is*** — a `<button>`
for a button, a `<nav>` for navigation, an `<h1>` for the main heading — instead of a generic
`<div>` for everything.

Why care? The browser, screen readers and search engines all read your HTML to understand the
page. Meaningful elements give them that understanding *for free*; a wall of `<div>`s tells
them nothing.

## The essentials

- **Headings are an outline.** `<h1>`–`<h6>` form the page's structure — use one `<h1>`, and
  don't skip levels. Choose the level for *meaning*, then size it with styles.
- **Landmarks frame the page.** `<header>`, `<nav>`, `<main>` (exactly one) and `<footer>` let
  people jump straight to a region.
- **Lists are lists.** A set of related items belongs in a `<ul>` or `<ol>`, so it's announced
  as "list, N items".
- **A link navigates, a button acts.** Use `<a href>` to go somewhere, `<button>` to *do*
  something (submit, open, toggle).
- **Tables are for data.** Rows and columns of related values — with `<th>` header cells —
  never page layout.

## In UnysonPlus

Every element outputs proper semantic markup — real headings, lists, buttons and tables — so
you get these benefits by choosing the right element (for example, the right **Title Tag**),
not by writing code.

**Learn more:** [MDN: HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) · [MDN: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
