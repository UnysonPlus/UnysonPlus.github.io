---
sidebar_position: 7.5
title: "Redirects when an address changes"
sidebar_label: "Redirects"
description: "Unyson+ SEO keeps old addresses working when you rename a page, move it under another parent, or rename a category or tag — so links and search traffic follow the content instead of landing on a 404."
---

# Redirects when an address changes

Rename a page and its address changes. Every link to the old one — from other sites, from search
results, from someone's bookmarks — lands on a "page not found", and the search traffic that page had
quietly stops.

The SEO extension notices the change and keeps the old address working: a visitor or a search engine
asking for it is sent on to the new one with a permanent (301) redirect, which also tells Google to
move the page's standing across.

<img src="/img/seo/seo-redirects.png" alt="The Redirects view: old addresses on the left, where each now goes on the right, including a page, the child page that moved with it, and a renamed category" width="1644" />

**SEO → Redirects** lists every old address it is keeping alive and where each one leads now.

## What it covers

WordPress already redirects an ordinary **post** whose slug you change. It does nothing for the rest,
which is what this covers:

| Change | Covered by |
| --- | --- |
| A post's slug | WordPress itself |
| A **page's** slug | This extension |
| A page moved under **another parent** | This extension — and every **child page** moves with it, so each child's old address is kept too |
| A **category or tag** renamed | This extension |

Tracking links keep their tags: an old address with `?utm_source=newsletter` arrives at the new one
with the same query.

## How it behaves

- **No chains.** Rename a page twice and both old addresses go straight to the current one, never
  through the middle. Each entry remembers the *page*, not an address, so the destination is always
  wherever the page lives today.
- **Content always wins.** A redirect only fires on an address that would otherwise be a 404. If you
  publish a new page at an old address, that page is served and the redirect stops mattering.
- **Moving back undoes it.** Rename a page back to an address it used before and that address is live
  again, so its redirect is removed.
- **Gone means gone.** If the page is unpublished, the old address is not sent anywhere — the list
  says so, rather than redirecting to something nobody can see. Deleting the page or term removes its
  entries.

**Remove** on a row deletes that one redirect. The switch at the top turns the feature off — worth
doing only if another plugin already manages redirects for the site, so the two do not compete.

## Your own redirects

<img src="/img/seo/seo-redirect-manager.png" alt="The 'Your redirects' box: a form to add a redirect (old address, new address, type, group), the list of redirects with how often each was used, and Import / Export" width="1644" />

The automatic redirects only know about changes made on this site. **Your redirects**, under them,
covers the rest:

- **content that moved before this site existed**: addresses from an old platform or an old domain;
- **campaign links** printed or mailed that should now point somewhere else;
- **pages removed for good**, with nothing to replace them.

### Adding one

| Field | What to put |
| --- | --- |
| **Old address** | A path (`/old-page/`) or a full address from anywhere (`https://old-site.example/page.php?id=4`). Only the path, and the query string when you include one, is compared. **Letter case and a trailing slash are ignored**, so `/About-Us` and `/about-us/` are the same address. |
| **New address** | A path on this site (`/new-page/`) or a full address on another site. |
| **Type** | **301** for a page that has moved for good (the usual one). **302** or **307** for a temporary move. **410 Gone** for a page removed on purpose: it tells search engines to drop it, a clearer signal than redirecting it somewhere unrelated. A 410 needs no new address; visitors see your theme's not-found page. |
| **Group** | Optional, for keeping a long list in order: *Old shop*, *Campaigns*, *Old blog*. |

Tick **Regular expression** to move many addresses with one rule. The pattern is matched against the
path and query, with letter case ignored, and `$1`, `$2`… in the new address are filled with what the
brackets captured:

```
^/blog/(\d{4})/(.*)$   →   /news/$2/
/blog/2019/spring-sale  →  /news/spring-sale/
```

A rule that can't work is refused, with the reason: a broken regular expression, a redirect to the
same page, a missing new address, the home page as the old address.

### How they behave

- **Content wins.** A redirect only acts on an address that would otherwise be "not found". If you
  publish a page at that address, the page is shown.
- **Your redirects come first**, then the automatic ones.
- **Tracking is kept.** `/old-page/?utm_source=mail` arrives at `/new-page/?utm_source=mail`.
- **Each one counts its use.** The *Used* column shows how many visitors each carried and when it last
  did, so you can tell which still matter and which are dead weight.
- On a site that lives in a sub-folder (`example.com/shop/`), addresses are written **relative to the
  site**: `/old-page/`, not `/shop/old-page/`.

**Edit** loads a redirect back into the form; saving an old address that already has a redirect
replaces it. **Search** and the **group** filter narrow the list as you type.

### Import / Export

**Export CSV** (for a spreadsheet) or **Export JSON** gives every redirect; importing either file brings
them back unchanged. That is also how to load the redirects for a move from another platform:

```csv
source,target,code,regex,group
/old-shop/linen-throw,/shop/linen-throw/,301,no,Old shop
"^/journal/(\d{4})/(.*)$",/blog/$2/,301,yes,Old blog
/winter-offer,,410,no,Campaigns
```

Columns can be in any order. A file with **just two columns, old and new address**, and no header,
works too: that is what most other redirect tools export. Rows that can't be used are skipped, and the
message says which ones and why. A redirect for an old address that already has one replaces it.

Every 404 your visitors hit is listed under [404s](./not-found.md), with a button that fills this form
in for you.
