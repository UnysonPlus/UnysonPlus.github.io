---
slug: naming-tools-vs-naming-sites
title: "Why the docs name the tools, plugins and AI products Unyson+ works with, but never the sites it converted"
authors: [jon]
tags: [documentation, naming, site-converter]
date: 2026-09-30
description: "A rule written to keep converted source sites and clients out of the product had grown into 'never name any product', which made setup instructions vague. The line is now: name the tools, AI products, browsers and plugins Unyson+ works with; never name a site that was copied or a client."
---

**The question:** The product-name rule is about site conversion. Can the docs simply name AI products, tools, agents and WordPress plugins?

<!-- truncate -->

## Context

The Site Converter is tested on real captured sites. To keep those sources (and any client whose site was
rebuilt) out of anything that ships, a rule said: never name another site or brand anywhere in
Unyson+. Over time it was read literally, so the manual started saying "a multilingual plugin that supports
linked translations" instead of Polylang, "the browser built into Macs" instead of Safari, and "your AI
subscription" instead of Claude — and the Site Converter pages stopped saying which design tools' exports
they accept. The tool names had to be carved back in for the conversion guides, because a guide that cannot
say the tool's name cannot be found by the people searching for it.

## Options considered

- **Keep the blanket ban** (names only in `guides/`). Safe by construction, but the manual gets vaguer
  exactly where precision matters: setup steps ("install Node.js"), compatibility ("works with Polylang"),
  troubleshooting ("Safari blocks this; use another browser").
- **Name tools and products; never name sites or clients.** Matches what the rule was for. Naming a tool is
  a statement about what the software works with, like "supports WooCommerce".

## Decision

The docs may name the **tools, AI products and agents, design and AI site builders, browsers, WordPress
plugins, and developer platforms** Unyson+ works with. They never name a **specific site that was captured
or converted** (its name or domain), a **conversion test or fixture site**, or a **client**. Those are
described generically ("a converted source") or keyed to a neutral id (`fixture-01`).

## Why

The rule protects the people whose sites were used for testing, not the vendors of the tools we
interoperate with. Treating the two alike cost the manual clarity and protected nobody. The test when in
doubt: *am I naming a tool we work with, or a site we copied?* A tool is fine; a site never is.
