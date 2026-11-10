---
slug: optimise-for-visitors-not-for-the-audit
title: "Why CSS combining scope now defaults to site-wide, and when a PageSpeed number is lying to you"
authors: [jon]
tags: [performance, architecture, javascript, documentation]
date: 2026-11-11
description: A PageSpeed report flagged forced reflow on a live site. Decision — fix the reflow because it is real work being wasted, but change the CSS combining scope default to site-wide and stop treating single-page audit scores as the target, because an audit loads one page and therefore cannot observe the savings that caching exists to produce.
---

**The question:** A live site scored 84 on mobile PageSpeed and the report flagged a *Forced reflow*
panel naming our own JavaScript. Can that be fixed, and is it what is costing the points?

<!-- truncate -->

## Context

Two things came up together and turned out to be the same question wearing different clothes.

The first was the forced-reflow panel. It named four of our files, and it was right: all four made the
same mistake — write to the page, then immediately measure it, in a loop, so each iteration pays for a
full layout. That is genuinely wasteful and we fixed it (113.5 ms of forced layout down to 28.1 ms on
an A/B test under 4× CPU throttling).

The second was that the fix moves the score by approximately nothing. Forced reflow is main-thread
work, main-thread work is scored by Total Blocking Time, and that site's Total Blocking Time was
already a perfect 100 out of 100. The panel is marked **Unscored** precisely because it is a
diagnostic rather than a scored audit. The actual 16-point gap was a hero image that downloaded in
132 ms and then waited 2,064 ms to paint, because 203 KB of CSS was being inlined into every page.

So the report pointed at real waste and at the same time pointed away from the thing that mattered.
That raised the more general question, which is what this entry is really about: **when is a
performance number measuring the visitor's experience, and when is it measuring the measurement?**

The CSS combining scope setting is the cleanest example in the product. *Per-page* builds a separate
combined stylesheet for every page, containing only what that page uses. *Site-wide* builds one bundle
and reuses it everywhere. Per-page had been the default.

## Options considered

**Keep per-page as the default.** It wins the audit. Lighthouse's "unused CSS" diagnostic rewards it,
and a one-page test genuinely does transfer fewer bytes. For a single landing page this is simply
correct, with no caveat.

**Default to site-wide.** One bundle, downloaded once. The first page a visitor opens pays for it;
every page after that is a cache hit costing nothing. The trade is that any given page carries some
CSS it does not personally use — which is exactly what the audit penalises.

**Make it adaptive** — pick per-page or site-wide based on, say, how many pages the site has. Rejected:
it makes a cheap, legible setting into a thing nobody can predict or debug, and the right answer
depends on visitor behaviour (do they browse?) which the server cannot see.

## Decision

**Site-wide becomes the default** (Asset Optimizer 1.1.76). Per-page stays, documented as the right
choice when most visitors land on one page and leave. Sites that have already saved a scope keep it;
only sites that never touched the setting move.

The forced-reflow bugs were fixed in the same pass, and the AI Dev Kit gained a "Never read geometry
after writing to the DOM" convention so the pattern is not reintroduced.

We also corrected a claim in our own documentation while we were at it. The *Load below-the-fold
images early* option said the warmed images "never load during an audit whether this is on or off".
They do: warming starts from the `load` event whether or not anyone scrolls, so an audit downloads
them inside its measurement window. On a measured site it took a phone page load from 0.7 MB to about
2 MB. The option lowers the score slightly rather than leaving it unchanged, and the docs now say so.

## Why

**An audit loads one page. Caching pays off on the second one.** That asymmetry is the whole argument.
A single-page test can never observe the saving a shared bundle exists to produce, while it always
observes the unused bytes that bundle carries. The scoring is not wrong, it is just structurally
blind to half the trade — so optimising for it makes the second and third page of a real visit slower
in exchange for a better number on a test nobody's customers run.

A visitor who reads four pages under per-page CSS downloads four stylesheets that are largely the same
bytes, and none of them warms the cache for the next. That is the common case for a blog, a shop, or
any site with a real menu, and it is the case the default should serve.

**The honest framing we want to keep using:** a score is a proxy, and the job is the thing it is a
proxy for. The forced reflow was worth fixing even though it earns zero points, because 85 ms of
pointless layout work is 85 ms a real phone spends. The per-page default was worth dropping even
though it earns points, because the points came from a blind spot rather than from a faster site. Both
decisions fall out of the same rule once it is stated plainly: **optimise for the visitor, then check
the number — not the other way round.**

The exception is honest and narrow, which is why per-page survives as an option. On a single landing
page there is no second visit for a cache to pay off on, so the smaller file really is better and the
audit really is right.
