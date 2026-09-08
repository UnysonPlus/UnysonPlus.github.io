---
title: Performance & assets
sidebar_position: 7
slug: /troubleshooting/performance-and-assets
description: Fixes for the Unyson+ Asset Optimizer — an empty asset list behind a cache, and a script that broke after combining.
---

# Performance & assets

:::tip[💡 Web dev tip: measure before you optimize]
Combining and minifying assets only helps if it's actually solving a real bottleneck — the right
first step is always to measure, not guess. Run a page through a tool like Lighthouse or PageSpeed
Insights to see which requests are actually slow before deciding what to merge, defer or minify;
otherwise you can spend effort "optimizing" something that was never the problem.
[web.dev: Measure performance](https://web.dev/articles/vitals-measurement-getting-started)
:::

## Asset Optimizer lists no CSS/JS to combine

**Symptom:** the Asset Optimizer shows nothing to combine, even though the site loads assets.

**Cause:** it detects assets by doing an internal homepage render, which a **full-page cache** (e.g. WP
Engine) can serve from cache — hiding the real asset list.

**Fix:** visit any page with **`?fw_asset_optimizer_discover=1`** appended to force a fresh render, then
return to the settings and refresh. See [Asset Optimizer](/extensions/asset-optimizer).

## A script broke after I combined it

**Symptom:** a script stops working once it's included in the combined bundle.

**Cause:** JS combining is conservative by design (only safe local footer scripts are merged), but a
third-party script you ticked may not tolerate being merged.

**Fix:** **uncheck** that script so it loads on its own again. The combined bundle is dependency-ordered;
the **Defer** switch is safe, and the **Minify** switch is experimental — leave it off if you see issues.
