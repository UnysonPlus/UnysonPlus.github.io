---
sidebar_position: 7.72
title: "Filtered and sorted pages: keeping shop filters out of search"
sidebar_label: "Filtered and sorted pages"
description: "Unyson+ SEO keeps filter and sort addresses (?orderby=, ?filter_color=…) out of search results with noindex, follow, and can keep crawlers out of them in robots.txt. The faceted-navigation problem, handled for WooCommerce shops and any listing."
keywords: [faceted navigation seo, woocommerce filter urls seo, orderby noindex, filter parameters robots.txt, crawl budget shop]
---

# Filtered and sorted pages

Shop filters and sort orders turn one category into hundreds of addresses: `?orderby=price`,
`?filter_color=red&min_price=10`, `?orderby=rating&filter_size=xl`… Each one shows nearly the same products as
the category itself. Left alone, search engines spend their visits on these copies instead of on your real pages,
and some of them end up in search results competing with the category they came from. This is what SEO people
call the *faceted navigation* problem.

Unyson+ SEO handles it under **SEO → robots.txt → Filtered and sorted pages**.

<img src="/img/seo/seo-filtered-pages.png" alt="The Filtered and sorted pages box: a switch to keep filtered and sorted pages out of search results (on), a box for more filter parameters with the built-in list underneath, and a switch to also stop crawlers fetching them (off)" width="1644" />

## What it does

**Keep filtered and sorted pages out of search results** (on by default) adds `noindex, follow` to any address
carrying a filter or sort parameter:

- *noindex*: the address stays out of search results;
- *follow*: its links, to your products, still count.

The canonical link of such an address already points at the page without the parameters, because Unyson+ builds
the canonical from the page's own address, never from the query string. Pages 2, 3… of a listing are **not**
filters: each keeps its own canonical and stays indexable.

**Also stop crawlers fetching them** (off by default) adds `Disallow` lines for the same parameters to robots.txt,
two per parameter (one for `?orderby=` at the start of the query string, one for `&orderby=` after another
parameter). On a large shop this saves a lot of crawling.

:::tip Turn the second switch on later, not first
A crawler that is kept out of an address cannot see its `noindex`. If filtered addresses are already in Google,
leave the robots.txt switch off until they have dropped out (a few weeks), then turn it on.
:::

## Which parameters count as filters

Built in: `orderby`, `order`, `sort`, `sort_by`, `sortby`, `min_price`, `max_price`, `rating_filter`,
`stock_status`, `on_sale`, every parameter starting with `filter_`, `query_type_` or `pa_` (WooCommerce attribute
filters), `per_page`, `product_view` and `add-to-cart`.

Add your own in **More filter parameters**, separated by commas. End one with `*` to include every parameter that
starts with it: `color_*` covers `color_red`, `color_blue` and so on. Pagination (`paged`, `page`) and site search
(`s`, which has its own switch above) are never treated as filters, even if you list them.

## How to check it

- Open a filtered address and view its source: the robots tag reads `noindex, follow`.
- The [Crawler visits](./reports/crawler-visits.md) report shows how much of Googlebot's time goes to filter and
  sort addresses, before and after.
- With the robots.txt switch on, the preview at the top of the robots.txt tab shows the new lines.

## Limits

- It recognises filters by **parameter name**. A shop whose filters live in the path (`/shop/color/red/`) needs
  those paths marked noindex another way, or a `Disallow` rule of your own in robots.txt.
- Parameters are matched for every page on the site, not only the shop. If a plugin uses `order` or `sort` for a
  page you want indexed, take that parameter out of play by not relying on this switch for that site.
