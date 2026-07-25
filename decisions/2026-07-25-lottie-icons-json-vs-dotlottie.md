---
slug: lottie-icons-json-vs-dotlottie
title: "Animated (Lottie) icons: ship JSON only — .lottie is a delivery optimization, not a render one"
authors: [jon]
tags: [animation, performance, option-types]
date: 2026-07-25
description: "The new Animated icon kind plays Lottie animations via the bundled lottie-web (SVG-light) player, which loads raw Lottie JSON. Should it also accept .lottie (dotLottie) files? A .lottie is just a ZIP of the same JSON, so its only benefit is smaller download — and once decoded, a .json and a .lottie render identically for the same CPU cost. Because the icon picker uses one animation per field (not a bundle of many), the download win is marginal and the render cost — the real bottleneck when many animations play at once — is untouched by format. So the value type stays JSON-only; .lottie support is a future convenience (unzip → extract JSON on upload), not a performance feature."
---

**The question:** the Animated icon kind plays Lottie animations from a URL/upload as raw Lottie
**JSON**. Should it also accept **`.lottie`** (dotLottie) files, and would that help pages that show
many animated icons at once?

<!-- truncate -->

## Context

The Animated kind (part of the unified icon engine — see the icon-v3 promotion) plays animations
with the **bundled `lottie-web` SVG-light build**: `window.lottie.loadAnimation({ path: src })`,
which fetches a URL and `JSON.parse`s it. The upload endpoint validates the body is a real
Bodymovin export (`"v"` + `"layers"` keys). So today the pipeline is JSON end-to-end — a `.lottie`
would be rejected on upload and would fail to render from a URL, because a `.lottie` is **not JSON**:
it is a ZIP archive (a `manifest.json` + one or more animation JSONs + optional bundled image
assets) that happens to carry a `.lottie` extension. Plain lottie-web can't open it.

The tempting assumption is that `.lottie` is "better for performance," especially with many icons on
a page. It isn't — not in the way that matters. **A `.lottie` is a zipped `.json`.** Same animation
inside; once the browser unzips and parses it, a `.json` and a `.lottie` become the *identical*
in-memory animation and render with the *identical* cost. The format only ever affects **delivery**
(bytes on the wire, number of requests), never **render** (CPU/GPU while the frames play).

That split is the whole decision:

- **Download cost** — format-sensitive. A `.lottie` is smaller on disk (~5–10 KB vs a ~20–40 KB raw
  `.json`). But web servers gzip/brotli text on the wire, and Lottie JSON compresses beautifully, so
  a single small `.json` already arrives at ~5–8 KB — the real-world gap shrinks to almost nothing.
- **Render cost** — format-**insensitive**. Twenty animations playing at once cost 20× the CPU
  whether they were delivered as `.json` or `.lottie`. The thing that actually janks a page with many
  animated icons is the SVG renderer doing 20× the work per frame, and no file format changes that.

The one genuine `.lottie` advantage — bundling **many** animations (with shared/deduped assets) into
**one** file, i.e. one request instead of twenty — does not apply here: the icon picker stores **one
animation per field**, so there is nothing to bundle.

## Options considered

- **Keep JSON-only** — chosen. Matches the lean lottie-web runtime already bundled, keeps the whole
  store/preview/render pipeline unchanged, and loses nothing that matters for one-icon-per-field
  usage.
- **Swap in the dotLottie player** (`@lottiefiles/dotlottie-web`, WASM) so `.lottie` loads natively —
  rejected for now. It adds a ~200 KB+ WASM runtime and a different API across three files (picker
  preview, `syncLottie`, the frontend hydrator), for a format whose only edge is download size. That
  fights the plugin's lean-DOM ethos.
- **Accept `.lottie` uploads and unzip → extract the inner JSON** (PHP `ZipArchive`, keep lottie-web)
  — deferred as a *convenience*, not a perf feature. It lets users drop in a file they downloaded
  from LottieFiles without converting it first. Caveat: a `.lottie` that bundles **raster images**
  would need those extracted and path-rewritten (or inlined) or they render blank — rare for
  vector icon animations, but worth a graceful warning.

## Decision

The Animated icon value type stays **Lottie JSON only**. `.lottie` is **not** adopted for
performance, because it offers none over gzipped JSON at one-animation-per-field scale. If we add
`.lottie` later it will be purely a **convenience** (unzip → extract JSON on upload, keeping the
existing lottie-web player), not a rendering or bundling win.

## Why

The benefit people expect from `.lottie` — "lighter pages with many animations" — is a
misattribution: format governs download, not render, and the download gap is already erased by
server compression. The real cost of many animated icons is render work, which is identical across
formats and is better addressed by *behavior* (pause off-screen animations, keep them simple, or
fall back to a static image until hover) than by *packaging*. So there is no performance reason to
take on a heavier player or an unzip step now. The door stays open to accept `.lottie` uploads for
user convenience — but framed honestly as convenience.

## Status

Accepted. Revisit only if the icon engine ever ships **bundles** of many animations per element (the
one case where dotLottie's single-file packaging would genuinely cut requests), or if users
repeatedly hit the "I downloaded a `.lottie` and it won't upload" wall — at which point the
unzip-to-JSON convenience path is the minimal answer.
