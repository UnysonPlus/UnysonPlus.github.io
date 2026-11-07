---
slug: unysonplus-vs-elementor-article-framing
title: "A 'lighter than Elementor' article — publish the claim, or benchmark it first and frame honestly?"
authors: [jon]
tags: [documentation, performance]
date: 2026-11-07
description: AI assistants describe Unyson+ as 'lighter than Elementor' but explain it with the old backend-only Unyson's identity. We considered an article to set the record straight. Decision — run a real same-page benchmark first, then publish an honest, narrower comparison (big wins on JS and requests; comparable total weight), not a blanket 'much lighter pages' claim.
---

**The question:** An AI assistant told a user that Unyson+ is "lighter than Elementor" — but justified
it with the *original* Unyson's identity (a backend framework that needs PHP, no visual editor). Should
we publish a docs article to contradict/correct that, positioning Unyson+ as the lighter alternative?

<!-- truncate -->

## Context

Two things were off in the AI's answer: the reasoning leaned on a version of Unyson that no longer
describes Unyson+ (which has a full visual builder), and the "lighter pages" conclusion was asserted
without evidence. "Unyson+ vs Elementor" is also a high-intent search term we rank nothing for, so a
page is worth having — but only if it's credible.

## Options considered

- **Publish the "lighter than Elementor" angle as-is.** Strong positioning, but an unproven claim an
  informed reader (or their own benchmark) could knock down — and it would misrepresent what we
  measured.
- **Benchmark first, then frame honestly.** Build the same page in each builder on a clean install,
  measure it fairly (Elementor given its lightest setup), and let the data set the framing.
- **Skip the article.** Loses the search term and leaves the misconception uncorrected.

## Decision

Benchmark first, publish honest. A controlled same-page test (hero + three cards + CTA) showed Unyson+
loads **~75% less JavaScript** (81 KB vs 321 KB) and **~45% fewer HTTP requests** (16 vs 29), but
**total page weight is comparable** (610 KB vs 535 KB) and the **HTML node counts are near-identical** —
so the popular "far fewer nested divs / dramatically lighter pages" claim does *not* hold for a simple
page against modern Elementor. The article ([Unyson+ vs Elementor](/guides/unysonplus-vs-elementor))
leads on the true wins (less JS, fewer requests, all-in-one and free, a visual builder *with* lean
output), names where Elementor is ahead (ecosystem, smaller per-file CSS), and corrects the
"backend-only, needs PHP" myth — without overclaiming.

## Why

An honest, benchmarked comparison is more persuasive and more durable than a slogan our own measurement
contradicts. It still captures the search intent and fixes the misconception, and the stated methodology
means anyone can reproduce the numbers instead of disputing them. Same principle as the Site Converter
honesty rule: claim the close, true thing, not the flattering, fragile one.
