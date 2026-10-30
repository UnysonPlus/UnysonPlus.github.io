---
sidebar_position: 3
title: "The SEO settings screen"
sidebar_label: "The settings screen"
description: "A tour of Unyson+ SEO settings: General, Titles & Meta, Sitemap, Social, Reports, Structured data, Verification and Import / Export."
---
# Settings


<img src="/img/seo/seo-sidebar.png" alt="The SEO sidebar, grouped into Search appearance, Site, Reports and Tools" width="260" />
**Unyson+ → SEO** opens as its own screen: the WordPress menu folds to icons and SEO's own menu takes
the left edge, grouped into **Search appearance**, **Site**, **Reports** and **Tools**. Each entry is
its own address (`…&view=social_tab`), so a screen can be linked to and bookmarked, and only the view
you are on does any work — the four reports used to be queried on every load of the page.

"Hide the WordPress menu", at the foot of the sidebar, puts the screen on its own; the setting is
remembered for you and applies to every Unyson+ app screen. (The frame itself is the framework's —
see [Admin app shell](/developers/admin-app-shell) if you are building one.)

The report views are covered under [Reports](#reports), and **Import / Export** under
[Importing from another plugin](./importing.md).

## General

Title separator, auto-generated descriptions, and canonical URLs. Canonical URLs are on by
default and tell search engines which address is the original for each page; paginated pages
correctly canonicalise to themselves rather than to page one.

**Number the pages of a list** (on by default). Page 2 of the blog, a category or a search used to
carry the same title as page 1, so search results showed several identical titles. With this on,
page 2 and beyond get the page number added: *Recipes | My Site | Page 2 of 7*. A template that
already says which page it is, with the `%%page%%` or `%%pagenumber%%` [tag](./template-tags.md),
is left as it is, so the number never appears twice.

The same tab holds:

- **[Image alt text](./image-alt-text.md)**: images without alt text, and an optional fallback.

- **[Attachment pages](./attachment-pages.md)**: what happens to the page WordPress makes for every
  uploaded file.
- **[RSS feeds](./feeds.md)**: a link back on every feed item, and the feeds to switch off.
- **[Access and removal](./access-and-removal.md)**: which roles may edit SEO fields, and whether
  deleting the extension deletes its data.

## Titles &amp; Meta

Date archives, and author archives on a one-author site, start out of search results: see
[Archive defaults](./archive-defaults.md).

A title and description template for every place a page can appear: the homepage, the blog
index, each content type, each taxonomy, author and date archives, search results and 404s.
Each also carries **No index** and **No follow** switches for the whole group.

Templates are written with [template tags](./template-tags.md), so
`%%title%% %%sep%% %%sitename%%` becomes *Hello world | My Site*. Tags that resolve to
nothing take their separator with them, so a template never renders `Title |  | Site`.

## Sitemap

Your sitemap lives at `/sitemap.xml` and is linked from `robots.txt`, which is how search
engines find it. Submit that URL once in Search Console — there is nothing to resubmit
afterwards.

- One sitemap per content type and taxonomy, chunked at 1,000 URLs.
- **Images are included** by default, so your media can be found in image search.
- Anything set to no index is left out automatically — a single page in its own SEO panel, or
  a whole content type in the settings. A sitemap should never advertise a URL whose page
  tells crawlers to ignore it.
- Opening a sitemap in a browser shows a readable table rather than raw XML.
- WordPress publishes its own sitemap at `/wp-sitemap.xml`; the extension switches that off by
  default so your site has one sitemap rather than two competing ones.

The same tab has the [video and news sitemaps](./video-and-news-sitemaps.md), the
[sitemap page for visitors](./html-sitemap.md), and the **[IndexNow](./indexnow.md)** switch, which tells Bing, Yandex and other search
engines about a page the moment it is published or updated.

## Social

Everything about how a page looks when it is shared.

**Sharing cards** are on by default and need no configuration: the share title follows your
SEO title, the share description follows your meta description, and the image is found from
the page itself. Set a **default share image** for pages that have none, and a **card style**
— the large card is the better choice for almost every site.

Add your **X / Twitter account** so shared links are attributed to it.

**Social profiles** records the accounts that belong to this site. These are not decoration
and they are not links displayed anywhere: they exist to feed the `sameAs` property that
tells a search engine which accounts are genuinely yours. They are published as `sameAs` in the
site's [structured data](./structured-data.md).

## Reports

Three read-only views, plus the handful of settings that feed them: how long to keep recorded search
phrases, when to call a page stale, and the API key for speed data. Covered under
[Reports](#reports).

## Structured data

Whether the site represents an organisation or a person, its name, logo and contact details,
and what each content type publishes as. Covered in full under
[Structured data](./structured-data.md).

## Verification

Verification codes for Google Search Console, Bing, Yandex, Baidu and Pinterest. Paste only
the code from the tag each service gives you, not the whole tag.

For any other service, use **Other services** and paste the **whole tag** it gives you, one per
line:

```html
<meta name="facebook-domain-verification" content="a1b2c3d4e5" />
<meta name="norton-safeweb-site-verification" content="x9y8z7" />
```

Each one is added to the head of every page. Only `<meta>` tags with a `name` and a `content` are
used; anything else pasted here (a script, a link, a redirect) is ignored, because this text goes
into every page.

Every screen can be [reset to its defaults](./reset-settings.md).
