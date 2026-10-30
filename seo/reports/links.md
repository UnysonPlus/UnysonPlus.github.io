---
sidebar_position: 1.5
title: "Links: orphaned pages, affiliate links and where your links go"
sidebar_label: "Links"
description: "The Unyson+ SEO link report indexes every link in your pages, page builder included, and lists the pages nothing links to, affiliate links missing rel=sponsored, and the sites you link to most."
---

# Links

Internal links are one of the few things about search you fully control, and the usual problem is not
knowing where things stand. **SEO → Links** reads every link in your pages and answers three questions.

<img src="/img/seo/seo-links.png" alt="The Links report: totals at the top, then the pages nothing links to, the affiliate links missing rel=sponsored, and the outside sites linked to most" width="1644" />

## Which pages does nothing link to?

An **orphaned page** is one no other page on the site links to. Visitors and search engines can only
reach it through a menu or the sitemap, and search engines read a page the site itself never mentions
as unimportant. Orphans pile up without anyone noticing: a post nobody linked from older articles, a
landing page left out of the content.

The fix is a link from a related page. The list shows each orphan with its type and date, newest first,
and links to its editor. The home page and the blog page are left out, since everything reaches them
through the menu.

The same answer shows **in the editor**: the page's SEO box says *Linked from 4 other pages on the
site*, or that nothing links to it, so you find out while you are already working on the page.

## Which affiliate links still pass authority?

Search engines ask for paid and affiliate links to carry `rel="sponsored"` (or `nofollow`). A link
without it passes your site's authority to the advertiser, which they treat as a link scheme. The report
lists each affiliate link that has neither, with the page it is on and its text.

A link counts as **affiliate** when:

- it goes through the usual redirect folders on your own site: `/go/`, `/out/`, `/recommends/`,
  `/refer/`, `/visit/`, `/aff/`…;
- it is one of your [short links](/extensions/short-links), which almost always redirect to an advertiser;
- it carries an affiliate tracking parameter such as `aff_id=`, `affid=` or `clickref=`;
- it matches one of your own patterns (below).

**Your own patterns:** under **Affiliate links → Also count as affiliate**, one per line: a folder on
your site starting with `/` (`/deals/`), or a site's address (`partner.example.com`, which also covers
its subdomains). **Rebuild** after changing them.

## Where do your links go?

Every outside site you link to, with how many links and from how many pages, most-linked first. It shows
at a glance which third parties your content points readers to.

## What is read

- **The content** of every published page, post and other content type the SEO extension covers.
- **The page builder**: link fields on buttons, cards, icon boxes and other elements, and links inside
  rich text. A link on a button is found as reliably as one in a paragraph. A button's *nofollow* switch
  counts as its `rel`.
- **Not** the header, footer, menus or sidebars. They link to everything on every page, and counting
  them would hide every orphan.

Images, background images, `#` placeholders and `mailto:` / `tel:` links are not counted.

## Keeping it current

The first time the report is opened, it reads every page in the background, 50 pages at a time; a site
with a few hundred pages takes well under a minute. After that each page is re-read **when it is
saved**, and its links disappear from the report when it is unpublished or deleted. **Rebuild** reads
everything again.

## Limits

- A link to an archive (a category, a tag, the blog) is counted as internal but doesn't make any page
  "linked to". Orphans are about individual pages and posts.
- Links that a theme or another plugin adds when the page is shown are not in the content, so they are
  not counted.
- Affiliate detection is a pattern match. A link through a tracking service it doesn't recognise
  counts as external; add its address under *Also count as affiliate*.
