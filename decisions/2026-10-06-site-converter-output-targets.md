---
slug: site-converter-output-targets
title: "Where does a new page builder plug into the Site Converter — and what does it own?"
authors: [jon]
tags: [architecture, site-converter, conversion]
date: 2026-10-06
description: "The Site Converter is getting Elementor output, with Divi, Bricks and others behind it. The decision: one PHP analysis engine, a builder-neutral Site Model cut from its existing mapping, and one output target per builder behind a registry. Every target renders inside the Unyson+ theme, which keeps the header, footer and Theme Settings; a target owns only how a page body is stored. The native output must stay byte-identical while it moves behind the seam."
---

**The question:** Now that the converter is going to write Elementor pages — and Divi, Bricks and the rest after it — how should it be organised so that each new builder is cheap to add, and none of them can break the Unyson+ output that already works?

<!-- truncate -->

## Context

An audit of the converter found the "one neutral tree, many emitters" plan from September only half true in code. The capture service's JavaScript side has a neutral block tree, and the Block Theme emitter reads it. But on WordPress the **PHP** engine is authoritative — an import re-runs it and overwrites the JavaScript output — and in PHP the analysis (sections, roles, measured styles) runs straight into Unyson+ shortcode and Theme Settings shapes with no seam between them. The mapping the analysis produces is the closest thing to a neutral model, but a few recognizers write Unyson+ option values into it (a `{predefined, custom}` colour, a `row-cols-3` class, a container preset slug).

The PHP and JavaScript engines are also already the most expensive thing to maintain — every rule is written twice and they drift.

## Options considered

- **Branch inside the Mapper.** Fastest to start; forks a 16,000-line, almost entirely Unyson+-specific file per builder, so every later fix lands N times.
- **Build each new builder in JavaScript, like the Block Theme.** Inherits the weaker engine (the one PHP overwrites), and multiplies the PHP↔JS parity cost by every target.
- **One PHP engine; a neutral Site Model cut from the existing mapping; one output target per builder.** The analysis stays exactly as it is; a small translation layer turns the remaining Unyson+ vocabulary into plain facts (pixels, colours, counts); each builder is a target class behind a registry.

## Decision

The third. Concretely:

- **`FW_SC_Site_Model`** is the builder-neutral page description, built from the mapping. It is the *only* place Unyson+ spellings are translated back to facts, and a test fails if one leaks into it.
- **`FW_SC_Target`** is the contract (`unmet_requirements`, `import_pages`, `after_design_import`, `verify_profile`), **`FW_SC_Targets`** the registry, extensible through the `fw_site_converter_targets` filter. The Output picker, the request readers and the import all read the registry; a roadmap slug is a placeholder that converts to the native output until a real class replaces it.
- **Every target renders inside the Unyson+ theme**, which keeps the converted header, footer, menus and Theme Settings. A target owns only how a page *body* is stored. If the Unyson+ theme is missing, the converter offers to install it before converting.
- **Page creation is shared**: slugs, parent pages, the cross-source guard and the front page are the same code for every target; a target supplies only a writer for the body.
- **No new JavaScript emitters.** Targets are PHP, reading the PHP engine's analysis.
- **The native output must stay byte-identical** while it moves behind the seam — a snapshot test records every fixture's full output and gates the change.
- **Elementor first, as Pre-Alpha**: Flexbox Containers plus the free widget set (works on any current Elementor site without Pro), each block going down a counted fallback ladder — native widget, then a container of widgets, then an HTML widget — so a conversion reports how much of it is actually editable as Elementor, not only how close it looks.

## Why

The recognition work is where the value is, and it already exists once. Putting the seam *after* it, in the engine that actually runs, means a new builder adds a target class and touches nothing upstream — and when it does need something upstream, that is a missing fact in the Site Model, fixed once for every builder. Requiring the Unyson+ theme defers the hardest part of each builder (headers and footers, which free Elementor cannot build at all) without losing them: the theme already reproduces them. And a byte-identical gate is the only honest way to refactor a converter that works; anything looser lets the native output drift while attention is on the new one.
