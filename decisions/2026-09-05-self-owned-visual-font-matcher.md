---
slug: self-owned-visual-font-matcher
title: "Matching an arbitrary licensed font to a free one: build a self-owned visual matcher, don't adopt an existing model"
authors: [jon]
tags: [conversion, typography, architecture]
date: 2026-09-05
description: "The curated name→lookalike map handles the ~40 famous licensed faces, but not the long tail: an arbitrary bespoke heading font a future site might use. We can't parse the source font (it's licensed, undownloadable) — but the source site RENDERS it, so a rendered sample is always obtainable. We surveyed the field: mixfont/lens and FontCLIP's weights are non-commercial; O'Donovan's crowd-similarity set is 200 fonts of 2014 vintage, font→font only, no image input, unlicensed; Intellifont is Apache and architecturally ideal but a 1-star repo whose shipped DB is a stub in an incompatible format. The decision: build our OWN visual matcher — one headless-browser canvas measures a 6-feature shape vector from the source's live-rendered glyphs AND from Google-font files, so the two are comparable by construction — and keep the curated map as the front door, with the visual match filling the gap only on a map miss."
---

**The question:** the converter can't rehost a licensed source font, so it substitutes the nearest **free** Google font. A curated name→lookalike map nails the ~40 famous faces (Gotham, Neutraface, Söhne…), but what about the **long tail** — a bespoke or obscure licensed heading font on some *future* site the map has never heard of? Is there a tool that finds the closest free font for an *arbitrary* face, and should we adopt it or build our own?

<!-- truncate -->

## Context

The hard constraint shapes everything: **we never have the source font file** (that's the whole problem — it's licensed and undownloadable). But the source site *renders* it, so the capture service — which already drives a headless browser over the source — can always obtain a **rendered sample**. So the matcher's *candidates* can be parsed from Google-font files offline, but the *target* must be described from the name and/or the rendered pixels.

We surveyed the field thoroughly (two research passes, and we actually ran the two most promising tools on real data):

- **mixfont/lens** — a ResNet18 image→font recognizer returning the closest *open-source* font. Exactly the right shape, offline. **Non-commercial license** — disqualified for shipping (and reverse-engineering the weights would just produce a prohibited derivative). Its author sells a paid API powered by the same model; integration is precisely what they monetize.
- **FontCLIP** — MIT *code*, but the repo also ships a **CC BY-NC-SA** license file: the weights/data are non-commercial. Code is usable to train our own; the model is not shippable.
- **O'Donovan crowd font-similarity** — a genuinely good perceptual-attribute set, and its attribute-space nearest-neighbour is genre-correct. But it's **200 fonts of 2014 vintage** (no Montserrat/Jost/Bebas/Anton), **font→font only within that set** (no image input, can't take a licensed name), and the **dataset carries no explicit license**. Reference only.
- **Intellifont** — **Apache-2.0**, offline, name+image, ships a Google-Fonts-inclusive signature DB: architecturally ideal. But it's a **1-star, solo, brand-new repo**, and it shows — the npm engine ships only a 4.7 KB *seed* DB; the real 2 MB DB lives only inside the browser-extension zip in an **incompatible bincode format** the Node engine can't read; the ML-similarity path needs a model file that isn't shipped; and the name path is just fuzzy string-matching (`DIN`→`Aladin`). Its glyph-signature engine *is* good — but only once we build the DB ourselves from font files.

Tellingly, when we built a small glyph DB from real font files, **both** Intellifont and a 150-line prototype of our own produced the same genre-correct answers (Josefin Sans→Jost, Oswald→Fjalla One/Anton, Playfair→Merriweather). The *method* is sound and reproducible; the *packaged tools* are each blocked by license, staleness, or immaturity.

## Options considered

- **Adopt lens / FontCLIP.** Right shape, wrong license (non-commercial). Rejected — can't ship, and can't launder via reverse-engineering.
- **Adopt Intellifont's package.** Apache and modern, but its shipped DB is unusable out of the box (format mismatch), its name/ML paths don't work, and depending on a 1-star solo repo for a core feature is fragile. Rejected as a dependency.
- **Ship O'Donovan's data.** Can't — unlicensed, tiny, dated, and structurally can't take our input (no image, licensed name absent). Kept as a design reference only.
- **Build our own visual matcher.** Reproduce the *method* (which is not secret — render glyphs, extract shape features, nearest-neighbour) on our own OFL-font-built index. Own it outright: no license, no attribution, GPL-clean, reliable.

## Decision

**Build our own**, layered behind the curated map:

1. **Curated name map stays the front door** — instant, exact, reviewable, and it *wins whenever it has an entry* (so `Neutraface → Josefin Sans` from the map, not the visual pick).
2. **A self-owned visual matcher fills the tail.** One **headless-browser canvas** measures a 6-feature shape vector — `widthRatio, xHeightRatio, weight, contrast, serif, round` — from rasterized probe glyphs. The *same* engine builds the offline index from ~130 Google-font files **and** measures the source font from its **live rendering** on the source page, so a font measured from its file and the same font measured from its pixels yield the same vector — the property that makes cross-modal matching valid. The capture service records the nearest free font as `fonts.heading_visual`; the PHP theme generator uses it **only on a map miss**. Deterministic, offline, no ML, no third-party model.

Verified end-to-end: measuring the *real* Neutraface Condensed Titling as it renders on the live source returns **Staatliches / Bebas Neue / Anton** — a defensible all-caps condensed-titling match produced with zero prior knowledge of the font. And the map still wins where it has an entry, so nothing regressed.

## Why

The survey's lesson wasn't "pick the best tool" — it was that **the method is common and reproducible while every packaged tool is blocked** (license, staleness, or immaturity). Font-shape similarity is measurement, not magic: a handful of geometric features over rasterized glyphs already clusters sans-with-sans, serif-with-serif, condensed-with-condensed. Building it ourselves is ~150 lines plus a regenerable index, and it buys three things a dependency can't: it's **licence-clean** (ships in a GPL plugin, no NC trap), it's **reliable** (no solo-repo bus factor, no format-mismatch surprises), and it's **ours to tune** — the genre-vs-shape trade-off that makes Neutraface resolve to Josefin Sans (genre) *or* Bebas Neue (shape) is just feature weights we control. The map-first / visual-fallback split keeps the fast, exact, human-reviewed path for the fonts that actually recur, and reserves the measured matcher for the genuine unknowns — where any answer beats collapsing to a coarse web-safe fallback. It's the same principle as the marquee and catalog recognizers: translate into an explicit, owned construct wherever we can; never take on a dependency we can't ship or trust for the long tail.

*Status: Accepted.*
