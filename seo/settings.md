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

- **[Attachment pages](./attachment-pages.md)**: what happens to the page WordPress makes for every
  uploaded file.
- **RSS feed**: a line added to the end of every item in your feed. Sites that copy content
  automatically usually take it from the feed, so the copies end up linking back to the original.
  Leave it empty to add nothing. `%%post_link%%` becomes a link to the post and `%%site_link%%` a
  link to your site, and basic HTML is allowed:

  ```
  The post %%post_link%% first appeared on %%site_link%%.
  ```

- **[Access and removal](./access-and-removal.md)**: which roles may edit SEO fields, and whether
  deleting the extension deletes its data.

### Feeds you don't use

<img src="/img/seo/seo-feeds.png" alt="The RSS feed box: the link-back line, and checkboxes to switch off comment, taxonomy, author, search and content-type feeds" width="1644" />

WordPress publishes a feed for nearly everything: every category, tag and author, every search, every
post's comments. Few sites use more than the main one, and the rest are thin copies search engines
crawl anyway. Under **RSS feed → Switch off these feeds**, tick the kinds you don't use:

| Kind | Example |
| --- | --- |
| Comment feeds | `/comments/feed/`, `/my-post/feed/` |
| Category, tag and other taxonomy feeds | `/category/news/feed/` |
| Author feeds | `/author/sam/feed/` |
| Search result feeds | `/?s=bread&feed=rss2` |
| Content type archive feeds | `/recipes/feed/` |

A feed switched off is no longer linked from your pages' `<head>`, and its address redirects (301) to
the page it belongs to: `/category/news/feed/` → `/category/news/`, the site comment feed → the home
page. **The main feed (`/feed/`) is never switched off**: it is the one people subscribe to.

### Image alt text

<img src="/img/seo/seo-images.png" alt="The Images box: how many images lack alt text with a Write them button, and the fallback for images without alt text" width="1644" />

Alt text is how someone using a screen reader learns what an image shows, and how search engines read
it. The **Images** box helps in two ways:

- **Writing the real thing.** It says how many images in the Media Library have no alt text, and
  **Write them** opens the Media Library filtered to just those, with an *Alt text* column showing
  what each image has. The same **Missing alt text** button sits at the top of the Media Library's
  list view.
- **A fallback** for images still without: the image's **title**, its **caption**, or the **title of
  the page it is on**. It is used only for an image with no alt text of its own. An empty `alt=""`
  written into the content on purpose (for a decorative image) is left alone, and a title that is just
  a camera file name (`IMG_4021`) is skipped. Off by default.

A fallback is better than nothing and worse than a sentence someone wrote, which is why the first half
comes first. It applies wherever WordPress draws an image (featured images, the content, galleries);
an element that prints its own `<img>` tag without WordPress's image functions is not changed.

### Archive defaults

Under **Titles & Meta**, **date archives** are kept out of search results by default, and so are
**author archives on a site one person writes**, where the author archive is the blog again. A site
with several authors keeps author archives indexable. Either default can be switched; a saved setting
always wins, so a site that already chose keeps its choice.

## Titles &amp; Meta

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

The same tab has the **[IndexNow](./indexnow.md)** switch, which tells Bing, Yandex and other search
engines about a page the moment it is published or updated.

### Video and news sitemaps

**Video sitemap** (on by default) lists every page with a video, and for each video the thumbnail,
title and description search engines need to show it as a video result:

```xml
<url>
  <loc>https://example.com/harbour-tour/</loc>
  <video:video>
    <video:thumbnail_loc>https://i.ytimg.com/vi/…/hqdefault.jpg</video:thumbnail_loc>
    <video:title>Harbour tour</video:title>
    <video:description>A ten-minute walk along the quay…</video:description>
    <video:player_loc>https://www.youtube.com/embed/…</video:player_loc>
  </video:video>
</url>
```

Videos are found in the page builder's **Video** and **Video popup** elements (with their poster), and in
the content: YouTube and Vimeo links and embeds, and `<video>` files. The thumbnail is the video's
poster, then YouTube's own thumbnail, then the page's featured image; a video with none of those is left
out, since search engines require one. The title is the element's caption or the page title, the
description the page's SEO description. Each video is listed once per page; noindex and
password-protected pages are left out.

**News sitemap** (off by default) lists articles published in the **last 48 hours** in Google News'
format, with the publication name and language. It only helps a publisher accepted into Google News, so
switch it on only then. Set the **Publication name** exactly as it appears in Google News (the site
title is used if empty), and which **content types** count as news (`post` by default).

Both appear in the sitemap index at `/sitemap.xml` as `sitemap-video-1.xml` and `sitemap-news-1.xml`
when they have entries.

### A sitemap page for visitors

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

## Resetting a screen

Every settings screen has **Reset this screen to defaults** next to **Save Changes**. It returns that
screen's settings, and only that screen's, to their defaults; every other screen is left exactly as it
is. You are asked to confirm first, and on the Search Console screen the confirmation warns that the
client ID and secret go too. Reports and lists on the screen (redirects, the 404 log) are not settings
and are not touched.

To be able to go back, [export your settings](./settings-transfer.md) first.
