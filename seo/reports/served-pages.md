---
sidebar_position: 0.8
title: "Rendered-page checks: what your pages actually serve"
sidebar_label: "Rendered-page checks"
description: "Unyson+ SEO fetches each page as a visitor and reports mixed content, titles and canonicals overridden by a theme or plugin, oversized images and hreflang links that are not returned."
---

# Rendered-page checks

The [Audit](./audit.md) reads your pages from inside WordPress, which misses whatever the theme and other
plugins add on the way out. These checks fetch each published page as a logged-out visitor and look at what
came back. The findings appear in the Audit alongside its other lists, each naming the page and showing
what was found.

<img src="/img/seo/seo-audit-served.png" alt="The Audit with a finding that a page is served a different title, shown with the title that was served, and a line under the list saying when pages were last fetched, with a Fetch pages now button" width="1644" />

It runs by itself once a week, five pages at a time. **Fetch pages now**, under the Audit's lists, starts a run
straight away.

## What it checks

| Finding | What it means | What to do |
| --- | --- | --- |
| **Mixed content** | An `http://` image, script, stylesheet, frame or video on an `https://` page. Browsers block it or warn about it. | Change the address to `https://`. The first three are shown. |
| **A different title** | The `<title>` served is not the one the SEO settings produce: the theme or another plugin is overriding it. | Find what is overriding it. The title that was served is shown. |
| **A different canonical** | The canonical served differs from the SEO settings, or there is more than one. Two canonicals can make a search engine ignore both. | Find what is adding its own. |
| **Oversized images** | An image at least twice as wide as the width it is given and at least 800 pixels wide, or any file of 1 MB or more. | Use a smaller size, or compress the file. |
| **Language links** | A page's `hreflang` link names another page of this site that does not name it back. Language links only count when both sides agree. | Fix the language links on the page shown. |

A plain link to an `http://` page is not mixed content, so links are not reported.

## Limits

- **Oversized images** are judged from the page's HTML, not from a browser's layout. An image that declares no
  `width`, or has a `srcset` (where the browser picks the size), can only be flagged for file size. Only files
  in your Media Library folder are measured.
- **Language links** to another domain cannot be checked, because that site's pages are not read.
- Only published pages without a password are fetched, and only addresses that answer 200. The count of pages
  that did not answer is shown beside the button.
- A page cached by your host or a caching plugin is checked as served, which may lag a recent edit by however
  long the cache lasts.
- Each page costs one request to your own site. A run on a large site takes a while on purpose.
