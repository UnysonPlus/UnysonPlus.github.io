---
sidebar_position: 7.98
title: "A sitemap page for visitors"
sidebar_label: "HTML sitemap"
description: "The [seo_sitemap] shortcode lists your content on a page for visitors, pages nested under their parents and noindex content left out."
---

# A sitemap page for visitors

The XML sitemap is for search engines. For a page that lists your content for people, add the
`[seo_sitemap]` shortcode to any page, in a text element or the editor:

```
[seo_sitemap]                        every content type the SEO extension covers
[seo_sitemap types="page,post"]      these types, in this order
[seo_sitemap limit="50"]             at most the newest 50 of each type
[seo_sitemap exclude="12,48"]        leave these pages out (by ID)
```

Each content type gets its own heading; pages are nested under their parents. Anything kept out of
search results (by its own *No index* switch or its type's) is left out, as are password-protected
pages and the sitemap page itself. If a parent is left out, its children move up a level rather than
disappearing.
