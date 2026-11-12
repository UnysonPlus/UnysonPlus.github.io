---
sidebar_position: 1
title: "Free WordPress Asset Optimizer — Combine CSS and JS"
sidebar_label: "Asset Optimizer"
description: "Free WordPress performance plugin — combine and minify CSS and JavaScript, strip unused CSS, serve WebP, preload the hero image and prefetch the next page. The asset optimization premium performance plugins charge for."
---

# Asset Optimizer

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Premium performance — faster pages in minutes.</p>
  <p class="ext-hero__sub">Combine and minify enqueued CSS and JavaScript, strip the rules nothing uses, right-size and convert your images, and fetch the next page before it is clicked — the asset optimization premium performance plugins charge for, free.</p>
</div>

**Asset Optimizer** makes an existing WordPress site faster without changing how it looks. It combines
your front-end **CSS** and **JavaScript** into cached files, removes the rules nothing on the page can
use, fixes the image delivery problems that usually dominate a slow page, and can fetch the next page
before a visitor clicks it.

Activate it from **Unyson+ → Extensions**, then open **Unyson+ → Asset Optimizer**. Its settings are
in three tabs: **General** (everything below), **CSS** (which stylesheets to merge) and **JavaScript**
(which scripts to merge).

:::tip[💡 Web dev tip: measure, then change one thing]
Every option here is a trade, and the right answer depends on your site. Take a baseline with
PageSpeed Insights or WebPageTest, change **one** setting, and measure again. Two changes at once and
you will not know which one helped — or which one hurt. See [Performance](/performance).
:::

## Start here

If you want a sensible setup without reading the whole manual, do this in order and measure after each
step:

1. Leave **Combine CSS** and **Combine JavaScript** on, and leave the per-file lists alone.
2. Turn on **[Remove unused CSS](/extensions/asset-optimizer/unused-css)**, then click through a few pages to check nothing
   broke. This is usually the single biggest win.
3. Turn on **[Serve WebP images](/extensions/asset-optimizer/images#serve-webp-images)** and
   **[Generate missing image sizes](/extensions/asset-optimizer/images#generate-missing-image-sizes)**.
4. Turn on **[Preload the hero image](/extensions/asset-optimizer/images#preload-the-hero-image)**.
5. Turn on **[Defer combined script](/extensions/asset-optimizer/javascript#defer-combined-script)**.
6. Only once the page itself is fast, consider **[Instant navigation](/extensions/asset-optimizer/instant-navigation)**.

Steps 2 and 3 are where most of the time is. Steps 4–6 are refinements.

## How it discovers assets

To know what to combine, Asset Optimizer needs to see your front end render. It does a one-time
internal request to your homepage and remembers the stylesheets and scripts that load.

To re-scan later — after activating a new plugin or theme, or if your site sits behind a full-page
cache — visit any page with **`?fw_asset_optimizer_discover=1`** appended to the URL, then return to
the settings and refresh.

## Every setting, and where it is explained

The General tab is long because each option is a different trade. This is the whole list:

| Setting | Default | What it is for |
| --- | --- | --- |
| [Combine CSS](/extensions/asset-optimizer/css#combine-css) | On | Master switch for merging stylesheets |
| [Combine JavaScript](/extensions/asset-optimizer/javascript#combine-javascript) | On | Master switch for merging scripts |
| [CSS combining scope](/extensions/asset-optimizer/css#css-combining-scope) | Site-wide | One shared bundle, or one per page |
| [CSS delivery](/extensions/asset-optimizer/css#inline-or-linked-the-render-blocking-question) | Linked file | A cached file, or printed into the page |
| [Remove unused CSS](/extensions/asset-optimizer/unused-css) | Off | Strip rules nothing on the page can match |
| [Never remove (safelist)](/extensions/asset-optimizer/unused-css#the-safelist) | Empty | Protect classes your own JavaScript adds |
| [Inline the first screen's CSS](/extensions/asset-optimizer/css#inline-the-first-screens-css) | Off | Split the stylesheet so the first paint never waits |
| [Inline small leftover stylesheets](/extensions/asset-optimizer/css#inline-small-leftover-stylesheets) | Off | Absorb the tiny files combining could not reach |
| [Record which script each line came from](/extensions/asset-optimizer/javascript#finding-out-which-script-a-report-is-blaming) | Off | Map bundle line numbers back to real files |
| [Drop admin-only stylesheets](/extensions/asset-optimizer/css#drop-admin-only-stylesheets) | Off | Stop shipping dashboard CSS to visitors |
| [Move late CSS into the head](/extensions/asset-optimizer/css#move-late-css-into-the-head) | Off | Stop elements jumping into place |
| [Preload the hero image](/extensions/asset-optimizer/images#preload-the-hero-image) | Off | Tell the browser about the hero immediately |
| [WebP quality](/extensions/asset-optimizer/images#webp-quality) | 80 | How hard the WebP copies are compressed |
| [Image quality](/extensions/asset-optimizer/images#image-quality) | 82 | How hard the theme's own crops are compressed |
| [Generate missing image sizes](/extensions/asset-optimizer/images#generate-missing-image-sizes) | Off | Fill in the sizes WordPress never made |
| [Serve WebP images](/extensions/asset-optimizer/images#serve-webp-images) | Off | Show visitors WebP copies instead of JPG/PNG |
| [Browser cache for static files](/extensions/asset-optimizer/caching-and-scope#browser-cache-for-static-files) | Off | Cache images, fonts and plugin assets for a year |
| [Load below-the-fold images early](/extensions/asset-optimizer/images#load-below-the-fold-images-early) | Off | Warm lazy images before the reader scrolls |
| [Instant navigation](/extensions/asset-optimizer/instant-navigation) | Auto | Fetch or render the next page before the click |
| [How early to start](/extensions/asset-optimizer/instant-navigation#how-early-to-start) | Auto | How keen the browser should be |
| [Never speculate cart, checkout or account](/extensions/asset-optimizer/instant-navigation#keeping-it-away-from-the-wrong-pages) | On | Keep shop pages out of speculation |
| [Never speculate these paths](/extensions/asset-optimizer/instant-navigation#keeping-it-away-from-the-wrong-pages) | Empty | Your own exclusions |
| [Only for logged-out visitors](/extensions/asset-optimizer/caching-and-scope#only-for-logged-out-visitors) | Off | Serve un-combined assets to editors |
| [Exclude URLs](/extensions/asset-optimizer/caching-and-scope#exclude-urls) | Empty | Skip the combiner on particular pages |
| [Stylesheets to combine](/extensions/asset-optimizer/css#choosing-which-stylesheets-to-merge) | All checked | The CSS tab's per-file list |
| [Defer combined script](/extensions/asset-optimizer/javascript#defer-combined-script) | Off | Stop scripts blocking the first paint |
| [Minify combined script](/extensions/asset-optimizer/javascript#minify-combined-script) | On | Strip comments and whitespace from the bundle |
| [Scripts to combine](/extensions/asset-optimizer/javascript#choosing-which-scripts-to-merge) | First-party | The JavaScript tab's per-file list |

Two more behaviours have no setting at all and are always on:
[caching of the generated files](/extensions/asset-optimizer/caching-and-scope#caching-of-generated-files) and
[learning about stylesheets that arrive late](/extensions/asset-optimizer/css#stylesheets-that-arrive-late).

## The sections

- **[CSS](/extensions/asset-optimizer/css)** — combining, scope, delivery, critical CSS, and the housekeeping options.
- **[Removing unused CSS](/extensions/asset-optimizer/unused-css)** — the biggest win, and the one to test before relying on.
- **[JavaScript](/extensions/asset-optimizer/javascript)** — combining, deferring, minifying, and diagnosing a slow script.
- **[Images](/extensions/asset-optimizer/images)** — WebP, quality, missing sizes, the hero preload and lazy-image warming.
- **[Instant navigation](/extensions/asset-optimizer/instant-navigation)** — prefetch and prerender the next page.
- **[Caching and scope](/extensions/asset-optimizer/caching-and-scope)** — browser caching, and limiting where any of this applies.

## Typical workflow

1. Activate **Asset Optimizer** and open its settings (the asset lists populate from a homepage scan).
2. On the **CSS** tab, leave the stylesheets you want merged checked; uncheck any to keep separate.
3. On the **JavaScript** tab, the first-party scripts are pre-selected; tick any safe third-party
   scripts you also want combined, and consider **Defer**.
4. Save. The combined, cached files are served on the front end; re-scan with
   `?fw_asset_optimizer_discover=1` whenever your asset set changes.
5. Once the page itself is fast, consider **Instant navigation** to take the wait out of the next
   click. Prefetch first; try prerender only after testing it.

:::tip[It pairs with the clean output]
Because the theme already compiles its design into [one generated stylesheet](/theme/settings-to-css)
and the page builder emits [clean markup](/page-builder/clean-dom), Asset Optimizer has little to
clean up — it mostly folds the remaining plugin and element stylesheets and scripts into one request
each.
:::

## When a score will not move

Worth knowing before you spend an afternoon on it: these options divide into ones that change what a
synthetic audit measures and ones that change what a visitor experiences, and they are not the same
set.

A page-speed score is dominated by what happens on the **first screen of a single page**. Options that
help a **second** page view — caching, a shared bundle, instant navigation — are invisible to it by
construction, because the test only ever loads one page. Options that spend bandwidth for the
reader's benefit, like [warming lazy images](/extensions/asset-optimizer/images#load-below-the-fold-images-early), can even make
the number slightly worse while making the page nicer to read.

That is not a reason to skip them. It is a reason to decide what you are optimising for before you
start, and to be suspicious of any advice — including a score — that only ever looks at one page.
