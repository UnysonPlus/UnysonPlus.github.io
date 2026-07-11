---
sidebar_position: 7
title: Asset Optimizer
---

# Asset Optimizer

**Asset Optimizer** combines your front-end **CSS** and **JavaScript** into single cached files,
cutting the number of HTTP requests a visitor's browser has to make. It detects every enqueued asset
on your site and lets you pick exactly which ones to merge, so you stay in control.

Activate it from **Unyson+ → Extensions**, then open its settings, which has a **CSS** tab and a
**JavaScript** tab.

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

:::tip It pairs with the clean output
Because the theme already compiles its design into [one generated stylesheet](/theme/settings-to-css)
and the page builder emits [clean markup](/docs/page-builder/clean-dom), Asset Optimizer has little to
clean up, it mostly folds the remaining plugin/element stylesheets and scripts into one request each.
:::
