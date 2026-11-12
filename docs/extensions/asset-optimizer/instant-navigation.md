---
sidebar_position: 6
title: "Instant navigation — prefetch and prerender"
sidebar_label: "Instant navigation"
description: "Fetch or fully render the next page before a visitor clicks it, using the browser's Speculation Rules API, and keep speculation away from cart, checkout and anything that acts when merely loaded."
---

# Instant navigation

<img src="/img/extensions/asset-optimizer/instant-nav.png" alt="Instant navigation, How early to start, and the two exclusion controls" width="1658" />

Click an internal link on most WordPress sites and you wait. The browser asks the server for the page,
the server renders it (unless a page cache answers first), and then the browser throws away everything
it had and parses every stylesheet and script over again. A single-page app built with something like
React feels immediate on the same click for two reasons: it never tears the document down, and its
router quietly fetched the next page before you clicked.

The second half of that is available to any ordinary WordPress site, and it is what **Instant
navigation** switches on. The browser fetches — or, if you ask it to, fully renders — a page you look
likely to visit, so by the time you click, it is already there. Done well, an internal link stops
feeling like a page load and starts feeling like a tab.

This rides on the browser's Speculation Rules API, which WordPress supports in core from 6.8. Core
does the careful parts, and this extension deliberately does not duplicate them:

- It switches the whole feature **off for logged-in users**, and for any site not using pretty
  permalinks. (So you will not see it while you are working — check it in a logged-out window.)
- It excludes `wp-admin`, `wp-*.php`, your uploads and theme folders, and **every URL carrying a query
  string**, which covers action links such as `?add-to-cart=` or a logout link.
- It honours `rel="nofollow"`, and a `no-prefetch` or `no-prerender` class on a link or any of its
  parents, so a single link can opt out on its own.

What this extension adds is the part core leaves to plugins: choosing the behaviour from a settings
screen instead of a code snippet, and keeping speculation away from pages where it causes harm.

## Prefetch or prerender

**Prefetch** fetches the page's HTML and nothing more. No scripts run, nothing on the page executes.
It removes the download from the click, which is most of the wait on a cached site, and it is safe
anywhere. Start here.

**Prerender** goes further and renders the page completely in a hidden tab, so clicking it can feel
genuinely instantaneous — the page is already laid out and painted. The cost is that the page *really
runs*:

- Its JavaScript executes. Scroll-triggered animations may start, and in some cases play out entirely,
  before anyone sees the page. If your pages use the Animation Engine's scroll motion, test this
  properly before relying on it.
- Analytics can record a visit nobody made. Well-behaved scripts wait for the
  [`prerenderingchange`](https://developer.chrome.com/docs/web-platform/prerender-pages) event; many
  do not.
- It costs real work on the server and in the visitor's browser for a page that may never be opened.

**Auto** — the default — leaves the decision to WordPress, which currently prefetches conservatively.
An existing site therefore behaves exactly as it did until you change this.

## How early to start

Eagerness decides how keen the browser is:

| Setting | When it starts | Waste |
|---|---|---|
| **Conservative** | On mouse-down over a link | Almost none — the click is already happening |
| **Moderate** | After the pointer rests on a link for ~200ms | Low; usually ready before the click lands |
| **Eager** | As soon as a link looks like a candidate | Highest — pages fetched and never visited |

Conservative sounds too late to help, but it is not: the gap between pressing and releasing a mouse
button is enough to cover a good part of a fast page's load, and it wastes essentially nothing.
Moderate is the sweet spot for most sites. Keep **Eager** for small sites with few outgoing links, and
remember that every speculated page you do not visit is bandwidth your host paid for — doubly so with
prerender, which also spends a full render on it. The browser caps how many speculations it runs at
once whatever you ask for.

## Keeping it away from the wrong pages

Two controls, and the first is more important than it looks.

**Never speculate cart, checkout or account pages** (on by default). Core already excludes every link
with a query string, which handles add-to-cart and logout links. It does not handle a cart or checkout
page on a normal permalink — `/cart/`, `/my-account/orders/` — and **WooCommerce does not exclude them
either.** Fetching one starts a shopping session for a visitor who never went there; prerendering one
also runs its scripts, which can fire a begin-checkout event or log a stray page view. These pages are
found by asking WooCommerce and Easy Digital Downloads directly rather than guessing from slugs, so a
renamed or translated checkout is still covered. If neither is installed, the conventional slugs are
covered instead.

**Never speculate these paths** takes one path per line, each starting with a slash, with `*` as a
wildcard; a full URL pasted from the address bar is reduced to its path for you, and a line starting
with `#` is a comment.

```
/members/*
/downloads/*
/unsubscribe/*
```

Use it for anything that *does something* when it is merely loaded — a download link, a one-click
unsubscribe, a link that marks something as read. You do not need entries for wp-admin, your uploads,
or anything with a query string; those are already excluded.

## What to expect, honestly

**Only Chromium browsers act on this today** — Chrome and Edge. Safari and Firefox ignore the rules
and navigate exactly as they always have. Nothing breaks there; those visitors simply do not get the
speed-up. That also means this is safe to leave on.

**It is not a fix for a slow server.** Speculative loading removes the *wait* from a click by moving
it earlier; it does not make the page cheaper to produce. If a page takes three seconds to render,
prefetching it three seconds early hides that, but only when the visitor hovers for long enough, and
you have simply moved the cost rather than removed it. A page cache, right-sized images and a lean
asset payload are still the work. This is the layer on top.

**It will not show up in a page-speed score.** An audit loads one page and measures it; there is no
second click for a prefetch to have helped. This is one of the clearest cases where the thing that
makes a site feel fast and the thing that scores well are simply different.

**To check that it is on**, open the site in a logged-out Chrome window, then **DevTools → Application
→ Speculative loads**. It lists every candidate link and what happened to it — prefetched, not
eligible, or excluded — which is also the quickest way to confirm one of your exclusions is doing what
you meant.

**It pairs well with per-page CSS.** If you have switched
[CSS combining scope](./css#css-combining-scope) to per-page, each page's combined stylesheet is
generated on its first view. A prefetch is a real request, so it warms that cache ahead of the visit
too.

:::tip[Advanced: removing a built-in exclusion]
Core's `wp_speculation_rules_href_exclude_paths` filter can only *add* paths. To drop one of the
commerce exclusions above — say you have made your cart page safe to prefetch — use
`fw:ext:asset-optimizer:speculation_sensitive_paths`, which receives this extension's list before it
is merged.
:::
