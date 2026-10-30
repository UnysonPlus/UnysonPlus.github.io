---
title: "Roadmap"
sidebar_position: 20
---

# Roadmap

What is being built for the SEO extension, and what is being considered. This page is kept
current as work lands — anything marked <span className="badge badge--warning">Coming
soon</span> is intended; anything marked <span className="badge badge--secondary">Exploring</span>
is under consideration and may not happen.

Shipped features move off this page and into the [main documentation](./index.md).

:::note
No dates. Items ship when they are properly done rather than on a schedule, and the order
below is a rough intent rather than a queue.
:::

---

## Social sharing

Open Graph and Twitter cards **shipped in 2.0.6** — see
[Sharing cards](./sharing-cards.md) in the main documentation.

Social profile URLs shipped alongside them, under **Unyson+ → SEO → Social → Social profiles**,
and are emitted as the `sameAs` property on your `Organization` (or `Person`) node — see
[Structured data](./structured-data.md).

---

## Structured data

Site identity and per-type schema **shipped in 2.0.8** — see
[Structured data](./structured-data.md).

### Author profiles and E-E-A-T

**Shipped.** See [Authors: expertise and profiles](./structured-data.md#authors-expertise-and-profiles): job title, areas of expertise and profiles elsewhere on each user's profile, published as `jobTitle`, `knowsAbout` and `sameAs`.

### FAQ data in the graph

**Shipped.** See [FAQ data](./structured-data.md#faq-data): FAQ accordions join the page's graph as `FAQPage`, and the accordion stops printing its separate block, so the questions appear exactly once.

### Product, event and recipe types

**Shipped.** See [Products, events, recipes and branches](./structured-data.md#products-events-recipes-and-branches): a Structured data box per page, which says what a rich result still needs instead of publishing a half-filled entry.

---

## Local business

### `LocalBusiness` structured data

**Shipped.** See [Local business](./structured-data.md#local-business): site-level kind of business, address, map position, price range and opening hours, which the Business Info element also uses for fields left empty, so the two never disagree.

### Multiple locations

**Shipped.** See [Business location](./structured-data.md#products-events-recipes-and-branches): one page per branch, each with its own address and hours, linked to the business as a whole.

---

## Crawl control

These do not change what you say about a page. They reduce the number of low-value URLs a
search engine has to crawl at all, which matters most on large sites.

### Attachment URL handling

**Shipped.** See [Attachment pages](./attachment-pages.md) — send them to the post the file belongs
to, to the file itself, or keep them, from **SEO → General**.

### Feed cleanup

**Shipped.** See [Feeds you don't use](./settings.md#feeds-you-dont-use): comment, taxonomy, author, search and content-type feeds can be switched off; their head links go and their addresses redirect to the page they belong to.

### Archive defaults

**Shipped.** See [Archive defaults](./settings.md#archive-defaults): date archives are noindex by default, and author archives too on a site with one author; a saved setting always wins.

## More sitemaps

The general sitemap ships today, images included. These are the specialised ones.

### Video sitemap

**Shipped.** See [Video and news sitemaps](./settings.md#video-and-news-sitemaps): videos from the builder's video elements and from the content, each with thumbnail, title and description; a video without a thumbnail is left out.

### News sitemap

**Shipped.** See [Video and news sitemaps](./settings.md#video-and-news-sitemaps): the last 48 hours of articles in Google News' format, off until switched on.

### HTML sitemap

**Shipped.** See [A sitemap page for visitors](./settings.md#a-sitemap-page-for-visitors): the `[seo_sitemap]` shortcode, with pages nested and noindex content left out.

## Images

### Global alt and title text

**Shipped.** See [Image alt text](./settings.md#image-alt-text): a Missing alt text filter and column in the Media Library to write the real thing, and an opt-in fallback (title, caption or the page's title) for images still without. Title attributes are not generated: they add nothing a screen reader or search engine uses.

## Redirects

### Automatic redirects when a slug changes

**Shipped.** See [Redirects](./redirects.md) — pages, pages moved under another parent (with every
child page), and renamed categories and tags keep their old addresses working. Ordinary posts were
already covered by WordPress.

### Redirect manager

**Shipped.** See [Redirects → Your own redirects](./redirects.md#your-own-redirects): exact or
regular-expression rules (case and trailing slash ignored, query strings matched when given), 301 /
302 / 307 / 410, a hit counter and last use per rule, groups and search, and CSV / JSON import and
export (a plain two-column file from another tool imports too).

### 404 monitoring

**Shipped.** See [404s](./not-found.md): every address that came back "not found", with requests, last
seen and where visitors came from, bots and scanner probes left out, and a **Redirect it** button per
row.

### Whole-site moves

**Shipped.** See [Redirects → Moving the whole site](./redirects.md#moving-the-whole-site-to-a-new-domain):
one setting sends every address to the same path on the new domain (301, query kept), with a preview,
and the dashboard, login and REST API left alone so the switch can always be turned off.

---

## Content tools

### Focus keyphrase and content analysis <span className="badge badge--secondary">Exploring</span>

Set a keyphrase for a page and get specific, checkable feedback — is it in the title, the
first paragraph, a heading, the URL, the image alt text — along with readability scoring.

Deliberately unhurried. Scores are trusted by the people reading them, and a check that is
wrong is worse than a check that is missing.

### Site-wide audit <span className="badge badge--secondary">Exploring</span>

The same checks, run across every page rather than the one you are editing, listing what is
wrong and where — pages with no description, a missing or duplicated title, no focus
keyphrase, a heading structure that skips levels.

The useful output here is **a list of specific, fixable problems per URL**, not a single
number. A score out of 100 tells you nothing actionable and invites optimising the score
rather than the site; "these eleven pages have no meta description" is a morning's work with
a clear finish line.

This only makes sense after the per-page checks above exist — it is the same engine pointed
at the whole site.

Part of the ground is already covered: [Pages going stale](./reports/going-stale.md) reports age
and length across the site today, and the [list columns](./list-editing.md) show
which pages are following a template rather than saying something of their own. What is missing is
the keyphrase and structure checks, which need the per-page analysis first.


### Guardrails for generated pages <span className="badge badge--secondary">Exploring</span>

Generating many pages from one template and a dataset — a page per service, per location, per
product — is a legitimate way to cover demand nobody could write their way through by hand. It is
also the fastest way to get a whole site discounted, because the penalty for mass-produced thin
pages is not applied page by page.

The dividing line is whether each page carries something a reader would actually want that the
others do not. The extension cannot supply that data, but it can say when it is missing:

- **Near-duplicate detection.** Going stale reports pages that are *thin* or *old*; it cannot say
  "these 340 descriptions are 94% identical to one another", which is the number that matters for
  templated pages. It needs no external data at all.
- **Keep pages out of the index until they are substantial.** A rule holding a post type below a
  word count out of the index, reusing the thin-page threshold that already exists. It lets someone
  generate a thousand pages and expose only those carrying real content.
- **Index coverage at scale.** Of the pages generated, how many did Google keep? That comes free
  with [index coverage](#index-coverage) above, and it is the number that says whether the whole
  approach is working or being ignored.

---

## Page speed

### Diagnostics, not just the verdict

**Shipped.** See [What to fix](./reports/page-speed.md#what-to-fix) — a lab test of any page on the
site naming the files and elements slowing it down, below the field data that says whether speed
is worth the work.

---

## Topic research

### Trends import <span className="badge badge--secondary">Exploring</span> {#trends-import}

Google Trends answers what no amount of on-page work can: whether interest in a topic is rising or
draining away, when in the year it peaks, and which of two phrasings people actually type. It does
not report search volume and never will — its numbers are relative to the peak of whatever you
asked for.

There is no API to connect to (see [Not planned](#not-planned)), but every panel in Trends exports
a CSV, so the import is the route. Download the file, drop it on the **Import / Export** screen,
and the filename is parsed so the term, report type, geography and date range fill themselves in.
Each import is stored with the parameters it was taken under, because two exports made under
different terms or ranges are not comparable, and quietly treating them as if they were would be
worse than not storing them at all.

The screen will say plainly which settings to use — twelve months, one country. Trends defaults to
a short worldwide window built for news desks, which reads as pure noise for anything editorial.

### Topic momentum <span className="badge badge--secondary">Exploring</span>

The import on its own is a curiosity. What makes it worth building is the join with data the
extension already holds, which nothing else in the stack is positioned to do:

| What it sees | What it means | What to do |
| --- | --- | --- |
| Rising, already getting impressions, page exists | Positioned for something growing | Refresh before the peak — the most valuable row on the screen |
| Rising, getting impressions, no real page | Ranking by accident on a growing topic | Write the page you are already half-ranking for |
| Rising, no impressions, no page | An open gap, ranked by momentum | A candidate for the calendar |
| Falling, page exists, traffic down | The market moved, not the page | Nothing. Explicitly do not spend a week "fixing" it |

That last row matters as much as the others. Knowing a drop was the topic rather than the site
saves the fortnight that would otherwise go into repairing something which was never broken.

A fourth signal is already in the product: the site's own search log. A phrase visitors typed into
your search box **and** which is rising in Trends is about as strong a content signal as a small
site will ever get.

The matching stays deterministic and explainable. Where the AI Assistant belongs — when it is
switched on — is turning an accepted row into a proposed title or outline, never into the analysis
itself. That is the same companion described under
[AI content suggestions](#ai-content-suggestions), pointed at a topic rather than a page.

---

## Alerts and digests

### The failures nobody notices

**Shipped.** See [Site health](./reports/site-health.md): a daily check, by fetching the site the way a search
engine would, for the site left on "discourage search engines", a noindex homepage, a robots.txt that
errors or blocks everything, a stray robots.txt file, a dead or empty sitemap, and a Search Console
connection that has expired. Critical problems raise an admin notice; all of it shows in
Tools → Site Health too.

### Being told, instead of remembering to look

**Shipped.** See [Alerts](./reports/alerts.md): checked daily and shown on the Dashboard, at the top of
the page's SEO box and in an optional weekly email that never repeats itself. Pages set to noindex
while getting clicks, impressions halved, seen but not clicked, old and still visited, just off page
one, site searches that find nothing, and a broken Search Console connection (the one also raised as
an admin notice). Every alert has a minimum-volume floor, and at most eight show at once.

Not built: "a query brings impressions but no page targets it". Search Console reports a page for
every query that brings impressions, so "no page targets it" cannot be told apart from "the page
targets it badly" without guessing; [Where pages rank](./reports/where-pages-rank.md) covers the
useful half.

---

## Internal linking

### Link report and orphaned pages

**Shipped.** See [Links](./reports/links.md): every link in the content and the page builder is
indexed (kept current on save), and the report lists the pages nothing links to, the affiliate links
missing rel="sponsored", and the outside sites linked to most. Each page's SEO box also says how many
pages link to it.

### Internal link suggestions

**Shipped.** See [Links → Suggestions](./reports/links.md#suggestions-where-links-could-go): each
page's SEO box lists the pages that already mention its subject without linking to it, and the pages
whose subject it mentions, each with the sentence and the words to link highlighted. The page builder's
text is read like the content, and every suggestion is explained by the words that matched.

---

## Editing at scale

### List columns and inline editing

**Shipped in 2.0.7** — see [Editing from the list](./list-editing.md).

A **site-wide audit** — "which of my 400 pages emit no description at all" — is still open,
and is listed under [Content tools](#content-tools). It needs something the columns do not:
an index of resolved values. A description is worked out at render time, so it cannot be
queried until it has been stored somewhere.

### Importing from other plugins

**Shipped in 2.0.10** — see [Importing from another plugin](./importing.md).

Site-wide settings (title templates per content type, social defaults) are not imported yet;
only per-page values are. Templates are a handful of fields you set once, and getting them
wrong site-wide is a bigger blast radius than getting one page wrong.

---

## Smaller additions

**Shipped.**

- **IndexNow**: see [IndexNow](./indexnow.md).
- **Additional verification code**: **Other services** under [Verification](./settings.md#verification).
- **RSS attribution**: the **RSS feed** box under [General](./settings.md#general).
- **Paginated titles**: **Number the pages of a list** under [General](./settings.md#general).
- **Editor access by role** and **complete removal on uninstall**: see
  [Access and removal](./access-and-removal.md).

---

## Tools

### robots.txt editor

**Shipped.** See [robots.txt editor](./robots-txt.md) — block internal search, block AI training or AI
search crawlers by name, add your own Allow / Disallow rules, and preview the exact file.

### Import and export settings

**Shipped.** See [Moving settings](./settings-transfer.md) — every site-wide SEO setting in one
file, with a preview before import and credentials left out unless asked for.

### Reset settings

**Shipped.** See [Resetting a screen](./settings.md#resetting-a-screen): per screen, never all at once.

## Search Console

The connection itself has shipped and sits under
[Reports](./reports/search-console.md). What follows is what it could report next.

Everything in this section is **your own data from Google Search Console**, shown inside
WordPress instead of in another tab.

That is worth distinguishing from the vendor services listed under *Not planned*. Connecting
Search Console means authorising your own Google account to read your own site's data — no
subscription, no third-party crawler, and nothing about your site sent anywhere except
between you and Google. It is the one case where connecting an external account genuinely
earns its place.

### Search performance <span className="badge badge--secondary">Exploring</span>

Impressions, clicks, click-through rate and average position over time, per page — and more
usefully, the change in each. Which pages are gaining, which are slipping, and which have
impressions but no clicks (usually a title and description problem, which is precisely what
this extension can fix).

### Index coverage

**Shipped.** See [Index coverage](./reports/index-coverage.md) in the manual — whether Google kept
each page, which canonical it chose, and when it last crawled it, gathered in the background
through the Search Console connection.

### Query reporting

**Shipped.** See [Where your pages rank](./reports/where-pages-rank.md) — the searches almost on page
one, and in the editor every search a page appears for, with its position and how it moved.

Still to come: position history over longer than two four-week windows, so a slow slide over a
quarter is visible rather than reading as a series of small wobbles.

---

## AI and LLM search

Last in the order deliberately. This is the least settled area in SEO, the conventions are
changing month to month, and the fundamentals above matter more to a real site than anything
here.

That said, UnysonPlus is not starting from behind. The theme already publishes an
[`llms.txt`](https://llmstxt.org) entry point so AI agents get a clean, plain-text map of
your site, and the capture service already ships an AI companion that uses **your own** API
key or local CLI rather than a metered credit balance.

### Let an AI assistant work on your SEO (MCP)

**Partly shipped.** With the AI Assistant extension active, an AI can read a page's effective SEO,
update its title, description and other fields, and audit up to a hundred pages for missing or
duplicate values — see [With the AI Assistant](./ai-assistant.md). The same tools are exposed to
external AI clients through the site's MCP connection.

Still open: creating redirects and changing site-wide settings from an AI client, which want the
same deliberate, revertible handling the page-level tools already have.

### AI content suggestions <span className="badge badge--secondary">Exploring</span> {#ai-content-suggestions}

Descriptions, titles, FAQs and key points suggested from the page you are editing, with
defaults for tone and audience so suggestions sound like your site rather than like
everyone's. Would use the existing AI companion — your key, your usage, no credits to buy.

### Visibility in AI search <span className="badge badge--secondary">Exploring</span>

Which sites get cited when someone asks an AI assistant a question is becoming a real
channel, and there is a genuine case for reporting on it.

Worth being clear-eyed about the limits, though. Answers from a language model are not a
ranking — they vary between runs, between users and between model versions, and asking a
model which brands rank is asking it to guess. Any report of this kind should be presented as
a sample of what an assistant said on a given day, not as a position you can track. It also
means real API calls to third-party providers on every query, so it will only ever work with
your own key.

---

## Not planned

Some things are conspicuous by their absence in other SEO plugins' feature lists. These are
deliberate omissions rather than gaps.

| Feature | Why not |
| --- | --- |
| **Meta keywords** | No search engine has used the tag in over a decade. |
| **Sitemap priority and change frequency** | Google has stated for years that it ignores both. Offering them invites tuning that cannot have an effect. |
| **Search engine pinging** | Google retired its sitemap ping endpoint in 2023 and Bing followed. Discovery happens through `robots.txt` and Search Console. IndexNow, above, is the live replacement. |
| **The `noodp` directive** | It instructed engines not to use DMOZ descriptions. DMOZ closed in 2017. |
| **Usage tracking** | The extension does not report anything about your site to us. |
| **Keyword search volume** | Nobody sells that number cheaply, because it comes from licensed clickstream data and web-scale crawling rather than from software. A plugin showing a volume figure would be showing you a guess. |
| **A Google Trends API connection** | The official API has been an application-gated alpha since 2025 — no self-serve key, no published quotas, no general-availability date. Either every user applies to a waitlist, or we proxy somebody else's data on their behalf. Revisit when it is generally available with a key the user creates themselves, as the Chrome UX Report key already works. The [CSV import](#trends-import) is the route that works today. |
| **Trends through a scraper or proxy vendor** | A plugin cannot run a headless browser, and the commercial alternatives route requests through third-party residential networks. Both carry somebody else's terms-of-service problem onto your server. |
| **Capturing a download automatically** | WordPress runs on the server; a downloaded file lands on your own machine. No plugin can reach across that boundary — it is the browser security model, not a missing feature. Dropping the file on the import screen is one step, and the filename fills in the rest. |
| **Competitor site analysis** | Crawling somebody else's site to score it needs a hosted crawler, which means an account, a subscription and your data leaving your server. Everything here is built to work with no account and no network connection, and that is worth more than the feature. |
| **A single site score** | A number out of 100 is satisfying and not actionable. The site audit above lists the actual problems instead. |
| **A system status screen** | WordPress ships **Tools → Site Health**, which already reports the server, PHP, database and plugin state. A second copy of it inside an SEO screen is duplication, not a feature. |
| **A code snippet library** | Copy-paste PHP snippets to change plugin behaviour are a symptom: they exist because the setting they emulate is missing. Where a snippet is genuinely wanted often enough to publish, it should be a setting instead. |
