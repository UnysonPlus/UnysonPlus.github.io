---
slug: page-ab-tests-render-both-versions
title: Why a page A/B test renders both versions at one address, and what "keep the winner" changes
authors: [jon]
tags: [analytics, architecture, performance, page-builder]
date: 2026-11-27
description: Roadmap 8g extends Visitor Insights' section A/B tests to whole pages. Page A's address renders A's and B's builder content and an early script shows one, as section tests already did; the share of visitors for B is a setting; and Keep rewrites the page's builder content (deleting the losing section, or copying B into A) with the old content kept for Undo.
---

**The question:** Roadmap 8g: "Two versions of a page (or of a section) shown to a share of visitors each, with the goal
measured in Visitor Insights and the winner kept with one click." Section tests already existed. How should a whole
page be split, and what should "keep the winner" actually do?

<!-- truncate -->

## Context

Section tests put both sections on the page; a few bytes in `<head>` pick one per page view and CSS hides the other.
Because the choice happens in the browser before paint, there is no flicker and page caches keep working. Stopping a
test with a winner only hid the loser with CSS, so the losing section stayed in the page for ever unless someone deleted
it by hand.

## Options considered

**Splitting a page:**

1. **Redirect half the visitors to page B's address.** Simple, but it flickers (a second request), changes the URL
   people share, splits search ranking, and fights page caches.
2. **Swap the content on the server per visitor** (a cookie). No flicker, but a cached page serves one version to
   everyone, and the cookie needs consent in many places.
3. **Render both versions at page A's address** and let the existing early script show one, each version in a
   `display:contents` wrapper so the theme's layout does not see an extra box.

**Keeping the winner:** keep hiding the loser with CSS (as before), or change the page itself.

## Decision

Option 3 for pages, with version B as an ordinary page or draft (a **Make a draft copy** button makes it), and a
**share** setting (10-90 %) for how many visitors see B, in the same early script. **Keep A / Keep B** changes the page
itself: a section test deletes the losing section from the builder content; a page test that B wins copies B's builder
content into page A. The content it replaces is stored on the experiment, and **Undo keep** writes it back.

## Why

- **One mechanism.** Page tests reuse the section tests' head script, exposure tracking, rollup and statistics; only
  what is on the page differs. Same address, no flicker, cache-safe, no cookie.
- **Only the design is tested.** The page's title, SEO, header image and links stay page A's, so a test cannot hurt
  search results or break links, and the result measures the content alone.
- **Keep means keep.** A test that ends should leave a clean page, not a hidden section waiting to be found later.
  Writing the change (with Undo) is what "kept with one click" promises.
- **Unequal shares are safe.** Each version's rate is measured on its own visitors, so showing a risky B to 20 % costs
  nothing in fairness, only in time to a result.

The cost: while a page test runs, the page's HTML carries both versions. It ends when the test does.

**Status:** Accepted. See [A/B tests](/extensions/visitor-insights/ab-tests).
