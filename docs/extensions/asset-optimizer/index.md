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

**Most of it is already on.** Activating the extension switches on everything that cannot change how a
page looks without you noticing:

| On out of the box | What it does |
| --- | --- |
| Combine CSS and JavaScript | Fewer requests |
| CSS combining scope: Site-wide | One shared bundle, cached across pages |
| [Serve WebP images](/extensions/asset-optimizer/images#serve-webp-images) | Usually 25–80% off every photo |
| [Generate missing image sizes](/extensions/asset-optimizer/images#generate-missing-image-sizes) | Stops phones downloading full-size originals |
| [Preload the hero image](/extensions/asset-optimizer/images#preload-the-hero-image) | Finds the main image sooner |
| [Inline small leftover stylesheets](/extensions/asset-optimizer/css#inline-small-leftover-stylesheets) | Removes the last few blocking requests |
| [Defer combined script](/extensions/asset-optimizer/javascript#defer-combined-script) | Scripts stop blocking the first paint |
| [Instant navigation](/extensions/asset-optimizer/instant-navigation): Prefetch | The next page is fetched before the click |

Each of those is reversible and leaves your originals alone. So the honest first step is: **activate it,
look at your site, and measure.**

### Then, one at a time

These are the faster settings, left off because each one *can* change how a page looks on a site nobody
has checked yet. Turn on **one**, click through a few pages — open the menu, expand an accordion, hover
the buttons — and measure before moving to the next:

1. **[Remove unused CSS](/extensions/asset-optimizer/unused-css)** — usually the single biggest win, and
   the one whose mistakes are quietest. Add `?fw_ao_nopurge=1` to a URL to rule it in or out instantly.
2. **[Serve AVIF images](/extensions/asset-optimizer/images#serve-avif-images)** — another 28% under
   WebP. Off by default only because it works through your whole media library in the background, which
   is something to opt into rather than inherit.
3. **[Inline the first screen's CSS](/extensions/asset-optimizer/css#inline-the-first-screens-css)** and
   **[Move late CSS into the head](/extensions/asset-optimizer/css#move-late-css-into-the-head)** — both
   rearrange when CSS arrives, so watch the top of a few pages as they load.
4. **[Browser cache for static files](/extensions/asset-optimizer/caching-and-scope#browser-cache-for-static-files)**
   — free for repeat visits, but it writes a block to `wp-content/.htaccess`, so it asks first by being off.

## How it discovers assets

To know what to combine, Asset Optimizer needs to see your front end render. It does a one-time
internal request to your homepage and remembers the stylesheets and scripts that load.

To re-scan later — after activating a new plugin or theme, or if your site sits behind a full-page
cache — use **Re-scan the frontend** on the settings page. It forgets the remembered stylesheets and
scripts, clears the cached bundles, and crawls your front end again.

### When an asset stops being used

The remembered list is not append-only. Each stylesheet and script carries the date it was last seen
on a page, refreshed every time a page that uses it is viewed, and anything unseen for **14 days**
drops out of the combined bundle.

That matters when a theme or plugin stops loading an asset without deleting it — a child theme that
calls `wp_dequeue_style()` on its parent's stylesheet, for example. The file is still on disk, so
"the file is gone" cannot be the test. Without the date the combiner would go on folding that CSS
into every page, where it re-enters the cascade and can override the theme that deliberately dropped
it. Use **Re-scan the frontend** if you would rather not wait out the 14 days.

Dropping an asset is deliberately the safe direction to get wrong: one left out of the bundle simply
loads as its own request again, and the next page view puts it back.

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
| [Inline small leftover stylesheets](/extensions/asset-optimizer/css#inline-small-leftover-stylesheets) | **On** | Absorb the tiny files combining could not reach |
| [Record which script each line came from](/extensions/asset-optimizer/javascript#finding-out-which-script-a-report-is-blaming) | Off | Map bundle line numbers back to real files |
| [Drop admin-only stylesheets](/extensions/asset-optimizer/css#drop-admin-only-stylesheets) | Off | Stop shipping dashboard CSS to visitors |
| [Move late CSS into the head](/extensions/asset-optimizer/css#move-late-css-into-the-head) | Off | Stop elements jumping into place |
| [Preload the hero image](/extensions/asset-optimizer/images#preload-the-hero-image) | **On** | Tell the browser about the hero immediately |
| [WebP quality](/extensions/asset-optimizer/images#webp-quality) | 80 | How hard the WebP copies are compressed |
| [Image quality](/extensions/asset-optimizer/images#image-quality) | 82 | How hard the theme's own crops are compressed |
| [Generate missing image sizes](/extensions/asset-optimizer/images#generate-missing-image-sizes) | **On** | Fill in the sizes WordPress never made |
| [Serve WebP images](/extensions/asset-optimizer/images#serve-webp-images) | **On** | Show visitors WebP copies instead of JPG/PNG |
| [Serve AVIF images](/extensions/asset-optimizer/images#serve-avif-images) | Off | Offer AVIF copies as well — another 28% under WebP |
| [AVIF quality](/extensions/asset-optimizer/images#avif-quality) | 60 | How hard the AVIF copies are compressed |
| [Browser cache for static files](/extensions/asset-optimizer/caching-and-scope#browser-cache-for-static-files) | Off | Cache images, fonts and plugin assets for a year |
| [Load below-the-fold images early](/extensions/asset-optimizer/images#load-below-the-fold-images-early) | Off | Warm lazy images before the reader scrolls |
| [Instant navigation](/extensions/asset-optimizer/instant-navigation) | **Prefetch** | Fetch or render the next page before the click |
| [How early to start](/extensions/asset-optimizer/instant-navigation#how-early-to-start) | **Moderate** | How keen the browser should be |
| [Never speculate cart, checkout or account](/extensions/asset-optimizer/instant-navigation#keeping-it-away-from-the-wrong-pages) | On | Keep shop pages out of speculation |
| [Never speculate these paths](/extensions/asset-optimizer/instant-navigation#keeping-it-away-from-the-wrong-pages) | Empty | Your own exclusions |
| [Only for logged-out visitors](/extensions/asset-optimizer/caching-and-scope#only-for-logged-out-visitors) | Off | Serve un-combined assets to editors |
| [Exclude URLs](/extensions/asset-optimizer/caching-and-scope#exclude-urls) | Empty | Skip the combiner on particular pages |
| [Stylesheets to combine](/extensions/asset-optimizer/css#choosing-which-stylesheets-to-merge) | All checked | The CSS tab's per-file list |
| [Defer combined script](/extensions/asset-optimizer/javascript#defer-combined-script) | **On** | Stop scripts blocking the first paint |
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
   **Re-scan the frontend** whenever your asset set changes.
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
