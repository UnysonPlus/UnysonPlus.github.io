---
sidebar_position: 7.97
title: "Video and news sitemaps"
sidebar_label: "Video and news sitemaps"
description: "Unyson+ SEO lists every page with a video, with thumbnail, title and description, and optionally the last 48 hours of articles in Google News format."
---

# Video and news sitemaps

Both are switched under **SEO → Sitemap → Video and news sitemaps**.

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
