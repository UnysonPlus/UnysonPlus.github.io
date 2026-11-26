---
sidebar_position: 7
title: "Caching and scope"
sidebar_label: "Caching and scope"
description: "Cache images, fonts and plugin assets in the browser for a year, understand how the generated files are cached, and limit the optimizer to particular visitors or exclude particular pages."
---

# Caching and scope

Three of these are about how long the browser keeps things; two are about restricting where any of
this applies at all — the escape hatches for when one page misbehaves.

## Browser cache for static files

<img src="/img/extensions/asset-optimizer/cache-headers.png" alt="Browser cache for static files" width="1658" />

The combined and purged files are already cached for a year (below). Everything *else* your site
serves — your uploaded images, your fonts, the stylesheets and scripts that belong to plugins and
themes — is left to whatever your host decides, and hosts are usually conservative. On one measured
site that was seven days for images and fonts, and **no caching instruction at all** for some plugin
scripts, so returning visitors re-downloaded them every time.

**Browser cache for static files** extends the same one-year policy to all of it, by adding a block to
`wp-content/.htaccess`. Anything already in that file is left untouched, and switching the option off
removes only the block it added.

Be clear about what this is worth: it only helps people who come back. A first-time visitor downloads
everything either way, so this will not rescue a slow page — and it will not move a page-speed score,
which only ever measures a first visit. It is a small, free improvement for repeat visits.

:::note[When could this serve someone a stale file?]
Almost never, by design. Plugin and theme files carry a version in their URL that changes when they
update, and WordPress never reuses an upload filename — it adds `-1` instead. Both cases produce a new
address, so the old cached copy is simply never asked for again.

The exception is replacing a file *in place* — over FTP, or with a "replace media" plugin. Someone who
already has the old one keeps it until they hard-refresh. This is also why the rule deliberately stops
short of marking files `immutable`: that would tell browsers to ignore even a hard refresh.
:::

This needs Apache or LiteSpeed. On nginx the setting shows you the equivalent configuration to paste
into your server config instead, since an `.htaccess` there would do nothing at all.

## Caching of generated files

The combined and purged files are cached by the browser for a year. **Nothing to configure.**

This is safe because their filenames contain a hash of their contents — change anything and the
filename changes, so a visitor can never be served a stale file. An `.htaccess` is written alongside
them.

If your server is nginx rather than Apache, that file is ignored and the same rule belongs in your
server config:

```nginx
location ~* /uploads/unysonplus/asset-optimizer/.*\.(css|js)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### How much disk the cache uses

One file per distinct bundle, not one per page. Two pages whose combined CSS comes out identical
share the same file, because the filename is a hash of the bytes produced — so a site with 200
pages that all load the same stylesheets keeps **one** combined file, not 200.

A page whose asset mix genuinely differs does get its own file, and [Remove unused
CSS](/extensions/asset-optimizer/unused-css) is per-page by nature, so a large site with purging on
will hold more. Two things keep that bounded:

- Anything not served for **7 days** is deleted. Being served refreshes that clock, so a bundle in
  active use is never evicted.
- A hard ceiling of **256 MB** on the whole directory, oldest evicted first.

Everything in there is regenerable, so if the cap ever evicts something still wanted, the next
request rebuilds it. You can empty it any time with **Clear cache** on the settings page.

:::note[If you are on an older build]
Before Asset Optimizer 1.1.82 the filename hashed the *inputs* rather than the output, and the input
order was not stable between pages — so the same stylesheets, concatenated in a different order,
were stored again under a new name for each URL. On a large site that reached gigabytes. Updating
fixes it going forward; use **Clear cache** once to reclaim what the old builds left behind.
:::

## Only for logged-out visitors

<img src="/img/extensions/asset-optimizer/scope-limits.png" alt="Only for logged-out visitors, and Exclude URLs" width="1658" />

Serves the combined files only to visitors. Logged-in users — you — get the un-combined assets.

Two reasons to want that. It is **handy while editing**, because a stylesheet you are actively
changing shows its effect immediately rather than after a bundle rebuild. And it **sidesteps admin-bar
edge cases**, where something the toolbar needs has been bundled away.

The cost is that you are then no longer looking at what your visitors see, so anything that goes wrong
with combining becomes invisible to you until someone reports it. Treat it as a temporary convenience
while working on the site, not a permanent setting — and always check the front end in a logged-out or
private window before calling a change done.

## Exclude URLs

One path per line. The combiner is skipped entirely on matching pages, and assets load un-combined
there.

The match is against the request path and `*` is a wildcard:

```
/cart/
/checkout*
*?no-combine=1
```

This is the blunt instrument, and that is the point. When one page on a site breaks under combining
and you cannot immediately work out which asset is responsible, excluding that page restores it at
once while you investigate — rather than turning combining off for the whole site.

Checkout and account pages are the usual candidates: they carry per-request data, they are the pages
where a mistake costs real money, and they are not the pages anyone is measuring for speed.

:::tip[Narrow it afterwards]
An exclusion is a permanent cost on that page, so it is worth going back. Once you know which handle
was at fault, unticking that one stylesheet or script on the **CSS** or **JavaScript** tab is almost
always better than excluding the whole page — you keep the benefit everywhere else.
:::
