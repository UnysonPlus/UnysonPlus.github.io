---
slug: visitor-insights-not-just-heatmaps
title: "Why is the heatmap extension called Visitor Insights — and why build it ourselves?"
authors: [jon]
tags: [analytics, privacy, extensions, naming, architecture]
date: 2026-10-12
description: "A request for a heatmap became a modular, self-hosted analytics extension. The decision: name it Visitor Insights, build one privacy-first core (tracker, collector, pre-aggregated storage, consent gate) and hang switchable modules off it — heatmaps and builder-section analytics first, session recording last and consent-only. No data ever leaves the site."
---

**The question:** "Do you think you can create something like a heatmap for Unyson+?" — then, after the research: "We can call it Visitor Insights. We can add more features to it aside from heatmaps. What do you think?"

<!-- truncate -->

## Context

Heatmap tools all work the same way underneath: a small script records clicks, scroll depth and pointer
movement, batches them to a server, the server aggregates them into per-page grids, and a viewer paints
those grids over the page. The expensive part is that pipeline — the tracker, a collector that survives
page caching, storage that does not bloat the database, and a consent story that holds up in the EU and in
US wiretap suits. Once it exists, most other analytics features are a few hundred bytes of script and one
more aggregate table.

Unyson+ also has an advantage no hosted tool has: every builder section, column and element carries a
stable `unique_id`. Hosted tools guess elements from CSS selectors and lose accuracy when a layout reflows;
we can attribute every click and every second of attention to a named builder item.

## Options considered

**Embed a hosted tool.** Theme Settings can already print a hosted heatmap tag. Zero build cost, but the
data leaves the site, consent becomes the site owner's problem, and the tool knows nothing about builder
sections.

**Build only a heatmap extension.** Smaller scope, but it would build the whole pipeline and then use a
fraction of it. Goals, section reach, frustration signals and real-visitor Core Web Vitals would each need
the same pipeline again, or a second extension duplicating it.

**Adopt an open-source analytics platform as a base.** The permissive ones are full server stacks of their
own; the ones closest to what we need are AGPL and cannot be bundled into a GPL plugin. Their client-side
algorithms are the useful part, and the MIT / BSD / Apache libraries among them can be used directly.

**One core, switchable modules.** Build the pipeline once with privacy and consent inside it, and add
features as modules that each have their own switch and their own consent tier.

## Decision

Build **Visitor Insights** (`visitor-insights`), default-inactive, as one core plus modules:

- **Phase 1:** core, traffic dashboard, heatmaps, section analytics.
- **Phase 2:** goals and conversions, funnels, frustration and errors, real-visitor performance.
- **Phase 3:** form analytics, site search insights, section A/B testing, AI summaries.
- **Phase 4:** session recording — optional, always opt-in consent, masked by default.

Rendering uses a vendored permissive heatmap renderer, recording (Phase 4) a permissive DOM recorder; the
rest is our own code. The [roadmap](/extensions/visitor-insights/roadmap) is verified against the source
tree, so its status is a fact rather than a checkbox.

## Why

- **The pipeline is the cost; features are cheap on top of it.** A broader name lets the extension grow
  without a rename or a second extension.
- **Self-hosted is both the privacy story and the legal defence.** Data that never leaves the site removes
  international-transfer questions and the third-party "eavesdropper" theory behind US session-replay suits.
- **Two consent tiers, not one.** Aggregate, non-identifying statistics can fit the French and UK
  audience-measurement exemptions; recordings of individual visits never can. Keeping recording a separate,
  last, consent-only module means the default product carries the lightest obligations.
- **Builder-native analytics is the thing nobody else can ship.** Per-section reach and heat inside the Live
  Editor are what make it worth building rather than embedding.
- **What it will not do is part of the product:** no visitor identification, no advertising use, no data
  sent off the site.
