---
sidebar_position: 7
title: "Free WordPress Asset Optimizer — Combine CSS and JS"
sidebar_label: "Asset Optimizer"
description: "Free WordPress performance plugin — combine and minify CSS and JavaScript to cut HTTP requests and speed up page loads. The asset optimization premium performance plugins charge for."
---

# Asset Optimizer

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Premium performance — faster pages in minutes.</p>
  <p class="ext-hero__sub">Combine and minify enqueued CSS and JavaScript to cut HTTP requests and speed up load times — the asset optimization premium performance plugins charge for, free.</p>
</div>

**Asset Optimizer** combines your front-end **CSS** and **JavaScript** into single cached files,
cutting the number of HTTP requests a visitor's browser has to make. It detects every enqueued asset
on your site and lets you pick exactly which ones to merge, so you stay in control.

Activate it from **Unyson+ → Extensions**, then open its settings, which has a **CSS** tab and a
**JavaScript** tab.

:::tip[💡 Web dev tip: fewer, smaller requests — but measure]
Combining and minifying CSS/JS cuts the number and size of downloads, which speeds up loading — but always **measure** before and after with real tools, because aggressive combining can occasionally backfire. Pair it with browser caching and right-sized images for the biggest wins. See [Performance](/performance).
:::

## How it discovers assets

To know what to combine, Asset Optimizer needs to see your front end render. It does a one-time
internal request to your homepage and remembers the stylesheets and scripts that load. To re-scan
later (after activating a new plugin or theme, or if your site is behind a full-page cache like WP
Engine), visit any page with **`?fw_asset_optimizer_discover=1`** appended to the URL, then return to
the settings and refresh.

## CSS

Every stylesheet detected on the front end is listed and **checked by default**. Uncheck any you
*don't* want merged, those keep loading as separate requests; the rest are combined into one cached
file.

The list is shown in the order the combined file uses, with the **theme stylesheets floated to the
end** (parent then child) so the cascade is preserved, your child theme's CSS still has the authority
to override the framework and shortcode styles.

### Finding things in a long list

A real site registers a couple of hundred stylesheets, so the list is folded into **collapsible
groups** — WordPress core, the framework, shortcodes, each extension, animation effects, the parent
and child themes, generated CSS, and other plugins. Groups come from each asset's *path*, which is
what actually identifies its owner, rather than its handle name, which a plugin can choose freely.

Each group header carries a **tri-state checkbox** (checked, partially checked, unchecked) that
toggles the whole group, and a count of how many of its stylesheets are being combined. Above the
list are **Check all** / **Uncheck all**, a **filter box** that matches on handle or path, and an
**Only unchecked** toggle for reviewing just the exclusions. A group with nothing selected is greyed
out, so a glance down the collapsed list shows what is being left out without opening anything.

Groups are ordered by where their first stylesheet falls in the cascade, and handles keep their
cascade order *inside* each group — the list is grouped, never re-sorted, so it still reads
top-to-bottom the way the combined file is assembled.

:::note Animation effects
The Animation Engine's effect partials get their own group. Their classes are applied by JavaScript
after the page loads, which makes them the easiest thing on the page to break by excluding the wrong
handle — so they are kept visible as one set rather than scattered through the list.
:::

## Removing unused CSS

Combining solves the number of requests; it does not make the CSS smaller. A typical page uses
under 15% of the stylesheet it downloads — the framework and every shortcode ship all the variants
they *can* render, and a page uses one of them.

Switch on **Remove unused CSS** and each page gets its own copy of the bundle with the rules nothing
on it can match taken out. WordPress's own inline block styles are trimmed at the same time — on a
page built with the page builder rather than blocks those are typically **70% unused**. On a measured site the homepage went from **39.3 KiB to 16.3 KiB
gzipped** with no rendering change at all. The purged copy is generated the first time a page is
viewed and cached from then on, so visitors never wait for it.

It needs **Combine CSS** on and **CSS delivery** set to *Linked file* — with inline delivery the
stylesheet is already in the page before this step can run.

:::caution Test it before you rely on it
This is the one setting here whose mistakes are quiet. A rule removed in error does not raise an
error: it shows up as a button with no hover, or a mobile menu that opens wrong, on a page nobody
re-tested. After switching it on, click through a few pages — open the menu, expand an accordion,
hover the buttons, tab through the links.

If something looks wrong, add `?fw_ao_nopurge=1` to the URL. That serves the full stylesheet for
that one request, so you can tell immediately whether this feature is the cause.
:::

### The safelist

A page is scanned as it arrives, and a lot of CSS exists for moments that scan never sees — a menu
opened, a row hovered, a slider started, an element scrolled into view. Those are protected
automatically: state classes (`is-`, `has-`, `active`, `open`…), every hover and focus rule,
animation and slider classes, the Animation Engine's effects, and anything driven by an attribute
such as `aria-expanded`.

Add to **Never remove (safelist)** only for class names your own JavaScript adds. One per line; a
plain entry keeps any selector containing that text, and slashes make it a regular expression:

```
promo-banner
/^\.seasonal-/
```

## Preloading the hero image

A slow "largest contentful paint" usually is not about file size — it is about *when* the browser
finds out the image exists. Normally it cannot know until it has downloaded the stylesheet, built
the layout and reached that element.

**Preload the hero image** tells it straight away. It also removes the `loading="lazy"` attribute
from that one image, which matters more than it sounds: the page builder marks every image lazy,
including the one in your hero — so the browser was being told to *delay* the very element the
score is measured on.

On a test page over a typical mobile connection this took the largest contentful paint from
**3.2 seconds to 2.3** — nearly a second, with no change to the page itself.

The hero is the first reasonably-sized image after your header, ignoring logos and icons. If a page
has no such image, nothing is added.

:::tip Measure it on a real connection
On a local site this setting appears to do nothing — there is no network latency to hide, so the
order things are fetched barely matters. Test it with throttling on, or on the live site.
:::

## Caching of generated files

The combined and purged files are cached by the browser for a year. This is safe because their
filenames contain a hash of their contents — change anything and the filename changes, so a visitor
can never be served a stale file. Nothing to configure; an `.htaccess` is written alongside them.

If your server is nginx rather than Apache, that file is ignored and the same rule belongs in your
server config:

```nginx
location ~* /uploads/unysonplus/asset-optimizer/.*\.(css|js)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## JavaScript

Scripts detected on the front end are listed too, but combining JS is more delicate than CSS, so the
defaults are conservative:

- **Only first-party scripts** (the UnysonPlus plugin and your active theme) are checked by default.
  Tick a third-party script to include it as well.
- **Unsafe scripts are skipped automatically, even if checked.** Only local footer scripts with no
  `async`/`defer` strategy and no inline or localized data are ever merged. WordPress core, external /
  CDN scripts, and anything carrying per-request data are always left alone.

Two switches tune the combined bundle:

| Option | What it does |
| --- | --- |
| **Defer combined script** | Adds `defer` to the bundle so it loads without blocking render. Safe because the bundle is self-contained and dependency-ordered. |
| **Minify combined script** | Strips comments and redundant whitespace (conservative, string/template/regex-aware). Most scripts are already minified, so the saving is usually small, experimental. |

## Typical workflow

1. Activate **Asset Optimizer** and open its settings (the asset lists populate from a homepage scan).
2. On the **CSS** tab, leave the stylesheets you want merged checked; uncheck any to keep separate.
3. On the **JavaScript** tab, the first-party scripts are pre-selected; tick any safe third-party
   scripts you also want combined, and optionally enable **Defer**.
4. Save. The combined, cached files are served on the front end; re-scan with
   `?fw_asset_optimizer_discover=1` whenever your asset set changes.

:::tip[It pairs with the clean output]
Because the theme already compiles its design into [one generated stylesheet](/theme/settings-to-css)
and the page builder emits [clean markup](/page-builder/clean-dom), Asset Optimizer has little to
clean up, it mostly folds the remaining plugin/element stylesheets and scripts into one request each.
:::
