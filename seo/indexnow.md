---
sidebar_position: 7.8
title: "IndexNow: tell search engines when a page changes"
sidebar_label: "IndexNow"
description: "Unyson+ SEO can notify Bing, Yandex and the other IndexNow search engines the moment a page is published or updated, with no account or API key."
---

# IndexNow

Search engines find out about a new or changed page when they next crawl your site, which can take
days. **IndexNow** lets the site tell them straight away. One notification reaches every search engine
taking part, because they share what they receive: Bing, Yandex, Naver, Seznam and others.

**Google does not take part.** It keeps finding changes through your [sitemap](./settings.md#sitemap),
which the extension already keeps up to date, so nothing changes for Google either way.

<img src="/img/seo/seo-indexnow.png" alt="The IndexNow box on the Sitemap settings: the switch, the key file address and the pages sent most recently" width="1644" />

## Turning it on

**SEO → Sitemap → IndexNow → Send new and updated pages.** That is all: no account to create and no
key to copy from anywhere.

The site proves the notifications come from its owner with a **key file**. When the feature is first
used, it makes a random key and serves it as a small text file at `https://your-site/<key>.txt`. The
search engine fetches that file to check. The box shows the address so you can open it.

## What is sent

- A post, page or other public content type when it is **published**, and every time it is
  **updated while published**.
- Not drafts, private posts, autosaves or revisions, and nothing from a content type the SEO
  extension does not cover.
- Not a page you take down. By the time it is unpublished WordPress has already changed its address,
  so the search engine finds out on its next visit.

Notifications are sent after the page has saved, without waiting for a reply, so saving is never
slower. The same address is not sent again within ten minutes, so a burst of saves sends once. The
box lists the last ten addresses sent.

## Limits

- Nothing is sent while **Settings → Reading** asks search engines not to index the site.
- A local test site cannot be reached by the search engine, so its notifications are ignored.
- IndexNow is a hint to crawl the page sooner. It does not make a page rank, and it does not make a
  search engine index a page it would otherwise skip.
- Switching it off stops both the notifications and the key file.
