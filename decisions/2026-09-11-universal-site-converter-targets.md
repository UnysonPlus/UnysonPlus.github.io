---
slug: universal-site-converter-targets
title: "Why the Site Converter will target other page builders (and how the roadmap labels them)"
authors: [jon]
tags: [architecture]
date: 2026-09-11
description: "The Site Converter outputs Unyson+ pages and a Block Theme. Should it also convert to Elementor, Divi and Bricks? The decision: yes — the pipeline is already one builder-neutral tree with an emitter per target, so a new builder is a new emitter, not a new converter. The docs carry a roadmap page listing every target; a target in development is labelled Pre-Alpha build, not qualified with fidelity caveats."
---

**The question:** People search for ways to convert an HTML site into Elementor, Divi or Bricks. Should the Site Converter become universal and target those builders too, so that reach brings people to Unyson+?

<!-- truncate -->

## Context

The converter is two halves. The first — capture, recognizers, design tokens, presets, the class-string fixtures that prove every translation — knows nothing about any page builder. The second is the emitter, which writes a builder's page format. The Block Theme output already proved the seam: it is a second emitter over the same tree.

## Options considered

- **Stay Unyson+ only.** Simplest, but leaves the search intent for other builders unanswered.
- **A separate converter per builder.** Duplicates the hard part (recognition) for every target.
- **One neutral tree, one emitter per target.** Reuses everything up to the last step; each target is an emitter plus a global-styles writer, tuned by training sessions on real sites like the Unyson+ output was.

## Decision

One neutral tree, many emitters. The docs site gets a roadmap page listing every target with a status. A target in development is labelled **Pre-Alpha build** — no fidelity caveat sentence; the label alone tells a reader it is still being built. It becomes **Available** when it passes the same fixture and real-site checks as the Unyson+ output.

## Why

The recognition work is the value; emitting it into another format is comparatively small. A roadmap page answers the search intent today, and the Pre-Alpha label sets expectations without discouraging anyone from trying it.
