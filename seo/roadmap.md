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

## Crawling your own site

### Fix a broken link everywhere at once <span className="badge badge--secondary">Exploring</span>

The [broken link checker](./reports/broken-links.md) names each broken link and the page it is on, and today
each one is fixed in that page. A bulk fix would replace one address with another across every page, in the
content and the page builder, through the same undoable change history as the AI tools.

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
| **Google search volume** | Google publishes no free figures: the numbers other tools show come from licensed clickstream data and estimates. A plugin showing a Google volume would be showing you a guess. [Bing's real counts](./reports/search-volumes.md) are the honest free alternative. |
| **A Google Trends API connection** | The official API has been an application-gated alpha since 2025 — no self-serve key, no published quotas, no general-availability date. Either every user applies to a waitlist, or we proxy somebody else's data on their behalf. Revisit when it is generally available with a key the user creates themselves, as the Chrome UX Report key already works. The [CSV import](./reports/topic-momentum.md#importing-from-trends) is the route that works today. |
| **Trends through a scraper or proxy vendor** | A plugin cannot run a headless browser, and the commercial alternatives route requests through third-party residential networks. Both carry somebody else's terms-of-service problem onto your server. |
| **Capturing a download automatically** | WordPress runs on the server; a downloaded file lands on your own machine. No plugin can reach across that boundary — it is the browser security model, not a missing feature. Dropping the file on the import screen is one step, and the filename fills in the rest. |
| **A web-wide backlink index** | Knowing every link on the web means crawling the web: billions of pages, re-crawled constantly. Commercial tools charge for exactly that. The public web-crawl archives are free but measured in terabytes, far beyond a plugin. [Bing's links to your site](./reports/backlinks.md) is the free slice that is realistic. |
| **Competitor site analysis** | Crawling somebody else's site to score it needs a hosted crawler, which means an account, a subscription and your data leaving your server. Everything here is built to work with no account and no network connection, and that is worth more than the feature. |
| **A single site score** | A number out of 100 is satisfying and not actionable. The [site audit](./reports/audit.md) lists the actual problems instead. |
| **A system status screen** | WordPress ships **Tools → Site Health**, which already reports the server, PHP, database and plugin state. A second copy of it inside an SEO screen is duplication, not a feature. |
| **A code snippet library** | Copy-paste PHP snippets to change plugin behaviour are a symptom: they exist because the setting they emulate is missing. Where a snippet is genuinely wanted often enough to publish, it should be a setting instead. |
