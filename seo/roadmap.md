---
title: "Roadmap"
sidebar_position: 20
---

# Roadmap

What is being considered for the SEO extension next. Everything from earlier versions of this page
has shipped and is documented in the [main documentation](./index.md); features move off this page
as soon as they are built.

:::note
New ideas are added here first, marked <span className="badge badge--warning">Coming soon</span>
when they are intended or <span className="badge badge--secondary">Exploring</span> while they are
being considered. No dates: items ship when they are properly done rather than on a schedule.
:::

---

## Data from outside your site, free

Everything the extension reports today comes from your own site or your own Google account. Some of
what hosted SEO suites show (who links to you, how often a phrase is searched) needs data about the
rest of the web. Most of that is sold, not given away, but two sources are free with a key you create
yourself, the same way the [Search Console](./reports/search-console.md) connection works.

### Links to your site, from Bing Webmaster Tools <span className="badge badge--warning">Coming soon</span>

Bing Webmaster Tools has an official API that lists the links its crawler found pointing at your site.
Connected with your own free API key, a **Backlinks** report would show:

- the **sites that link to you** (referring domains), with how many links each sends and which of your
  pages they point at;
- **new and lost** links since the last check, kept as a history so the change over months is visible;
- the links to pages that no longer exist, each with a one-click [redirect](./redirects.md#your-own-redirects),
  which is the cheapest way to win back the value of an old link.

Worth being plain about the limit: this is the part of the web **Bing** has crawled, which is smaller
than a commercial link index. It is real, it is about your site, and it costs nothing. Google's
Search Console has a links report too, but its API does not expose it.

### Search volumes, from Bing keyword research <span className="badge badge--secondary">Exploring</span>

The same connection offers Bing's keyword research data: how often a phrase is searched on Bing, with
related phrases. Bing's share of searches is small, so the figures are low in absolute terms, but they
are real searches and they rank phrases against each other honestly. It would sit beside [Topic
momentum](./reports/topic-momentum.md): Trends says which way interest is moving, this says roughly
how much there is.

### Authority score from a free open index <span className="badge badge--secondary">Exploring</span>

Open, free link-graph projects publish a rank per domain, built from the public web crawl. Shown next to
each referring domain, it would separate a link from a well-established site from one on a page nobody
visits. Only if a source stays free with a self-made key, and with the caveat stated beside every
number: it is a rough signal, not a score to optimise.

---

## Crawling your own site

The extension reads pages from inside WordPress, which is why it can see the page builder's structure.
What it cannot see from inside is what the server **actually answers** for every address a page links
to. That takes a crawl: fetching each address the way a browser or a search engine would.

### Broken link checker <span className="badge badge--warning">Coming soon</span>

Every link on the site (from the [link index](./reports/links.md), so links in buttons and cards
count too) checked in the background, internal and outgoing:

- **broken links**: a link to a page that answers "not found" or an error, with the page it is on and
  the link text;
- **redirected links**: a link that goes through a redirect, so it can be updated to point straight at
  the destination;
- **redirect chains and loops**: one of [your redirects](./redirects.md) leading to another, or back to
  itself;
- outgoing links to sites that have gone away.

Checked slowly and politely (a few requests a minute to any one outside site), re-checked weekly, and
each finding links to the page to fix it. Fixing a broken internal link in bulk would go through the
same undoable change history as the AI tools.

### Rendered-page checks <span className="badge badge--secondary">Exploring</span>

The checks only a fetched page can answer: **mixed content** (an `http://` image or script on an
`https://` page), **hreflang** pairs that do not point back at each other, images far larger than the
space they are shown in, and pages whose served `<title>` or canonical differs from what the SEO
settings say (a sign another plugin or the theme is overriding them). Results join the
[Audit](./reports/audit.md) as more lists of pages to fix.

### Import a crawler's export <span className="badge badge--secondary">Exploring</span>

For anyone already running a dedicated crawler (an open-source one you host yourself, or a desktop
one): drop its CSV or JSON export on an **Import / Export** screen and its findings are matched to your
pages and shown in the Audit, each with a link to the page's editor. What is imported can be exported
again unchanged. A convenience rather than a necessity: the checks above cover the same ground from
inside WordPress.

---

## Not planned

Some things are conspicuous by their absence in other SEO plugins' feature lists. These are
deliberate omissions rather than gaps.

| Feature | Why not |
| --- | --- |
| **Meta keywords** | No search engine has used the tag in over a decade. |
| **Sitemap priority and change frequency** | Google has stated for years that it ignores both. Offering them invites tuning that cannot have an effect. |
| **Search engine pinging** | Google retired its sitemap ping endpoint in 2023 and Bing followed. Discovery happens through `robots.txt` and Search Console. [IndexNow](./indexnow.md) is the live replacement. |
| **The `noodp` directive** | It instructed engines not to use DMOZ descriptions. DMOZ closed in 2017. |
| **Usage tracking** | The extension does not report anything about your site to us. |
| **Keyword search volume** | Nobody sells that number cheaply, because it comes from licensed clickstream data and web-scale crawling rather than from software. A plugin showing a volume figure would be showing you a guess. |
| **A Google Trends API connection** | The official API has been an application-gated alpha since 2025 — no self-serve key, no published quotas, no general-availability date. Either every user applies to a waitlist, or we proxy somebody else's data on their behalf. Revisit when it is generally available with a key the user creates themselves, as the Chrome UX Report key already works. The [CSV import](./reports/topic-momentum.md#importing-from-trends) is the route that works today. |
| **Trends through a scraper or proxy vendor** | A plugin cannot run a headless browser, and the commercial alternatives route requests through third-party residential networks. Both carry somebody else's terms-of-service problem onto your server. |
| **Capturing a download automatically** | WordPress runs on the server; a downloaded file lands on your own machine. No plugin can reach across that boundary — it is the browser security model, not a missing feature. Dropping the file on the import screen is one step, and the filename fills in the rest. |
| **A web-wide backlink index** | Knowing every link on the web means crawling the web: billions of pages, re-crawled constantly. Commercial tools charge for exactly that. The public web-crawl archives are free but measured in terabytes, far beyond a plugin. [Bing's links to your site](#links-to-your-site-from-bing-webmaster-tools) is the free slice that is realistic. |
| **Competitor site analysis** | Crawling somebody else's site to score it needs a hosted crawler, which means an account, a subscription and your data leaving your server. Everything here is built to work with no account and no network connection, and that is worth more than the feature. |
| **A single site score** | A number out of 100 is satisfying and not actionable. The [site audit](./reports/audit.md) lists the actual problems instead. |
| **A system status screen** | WordPress ships **Tools → Site Health**, which already reports the server, PHP, database and plugin state. A second copy of it inside an SEO screen is duplication, not a feature. |
| **A code snippet library** | Copy-paste PHP snippets to change plugin behaviour are a symptom: they exist because the setting they emulate is missing. Where a snippet is genuinely wanted often enough to publish, it should be a setting instead. |
