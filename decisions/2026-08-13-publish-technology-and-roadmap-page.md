---
slug: publish-technology-and-roadmap-page
title: "Should we publish a public Technology & Roadmap page — and how do we frame the legacy?"
authors: [jon]
tags: [documentation, architecture]
date: 2026-08-13
description: A legacy-technology audit showed the "Unyson is outdated" reputation is largely stale for this fork (jQuery-free front end, PHP 8.2-clean, current libraries), with real legacy isolated to the admin builder UI (Backbone + Underscore + jQuery UI). The question was whether to publish a public technology page at all, given it would also expose the remaining legacy, and how to frame it. Decision — yes, publish it under Architecture, but lead with the modern foundation and present the remaining legacy only as a forward roadmap (React admin, native ES6+, more REST); keep the internal "confession" details (abandoned-dependency inventory, dead-weight KB, the version-mismatch bug) out of the public page.
---

**The question:** The framework's biggest reputational liability is the inherited "Unyson is
outdated" perception. A technology audit of the plugin showed that's largely stale for this fork.
Should we publish a public **Technology** page to rebut it — and if so, how do we handle the fact
that such a page also has to acknowledge the remaining legacy?

<!-- truncate -->

## Context

The audit (cross-checked against the live codebase) found a clear split: the visitor-facing front end
is **100% jQuery-free** (Splide, inline SVG, vanilla JS), the PHP is **8.2-clean across 1,200+ files**
with modern PHP genuinely in use, and the vendored libraries are current. The real legacy is **narrow
and isolated to the admin builder / options UI** — Backbone + Underscore templates + jQuery UI, plus a
couple of abandoned vendored jQuery plugins and some unused dead-weight libraries.

## Options considered

- **Don't publish.** Avoids drawing attention to any legacy. But it also forfeits the single strongest
  rebuttal to the outdated reputation, which is the framework's biggest marketing problem.
- **Publish the audit as-is.** Maximally transparent, but the internal report reads as a *confession*
  ("qTip2 abandoned, site offline", "Selectize abandoned", "~400 KB of dead weight"). Broadcasting an
  itemized list of your own abandoned dependencies feeds the very reputation you're fighting.
- **Publish a curated page: modern-foundation-first + roadmap-as-momentum.** Lead with the verifiable
  modern-stack evidence, then present the remaining legacy only as active, forward-looking direction.

## Decision

Publish a **Technology & modernization** page under **Architecture**. Lead with the modern foundation
(jQuery-free front end, PHP 8-ready, current libraries, flex/grid), state the stack honestly layer by
layer, and present the remaining legacy as a **modernization roadmap** (React admin UI, native ES6+
instead of Underscore, vanilla admin controls, more REST, a leaner bundle), framed as *actively
underway, no hard dates*. Keep the internal-only items — the abandoned-dependency inventory, the
dead-weight KB counts, and the plugin version-mismatch bug — **out** of the public page; those are
internal action items, not marketing.

## Why

- **It turns the biggest liability into a trust signal.** The evidence is strong and verifiable;
  saying it plainly is the highest-value counter-message available.
- **Developers reward honest roadmaps.** A confident "here's the modern foundation, here's what we're
  migrating next" reads as momentum; an itemized legacy confession reads as a liability. Same facts,
  opposite effect.
- **Architecture is the right home.** It's developer-facing reference content that also serves the
  repositioning, and it sits naturally beside the boot / extension-system / data-flow pages.
