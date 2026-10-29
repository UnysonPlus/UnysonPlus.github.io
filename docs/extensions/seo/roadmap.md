---
title: "Roadmap"
sidebar_position: 3
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
[Sharing cards](./index.md#sharing-cards) in the main documentation.

Social profile URLs shipped alongside them, under **Unyson+ → SEO → Social → Social profiles**.
They are recorded but not yet emitted: their purpose is the `sameAs` property on your
`Organization` node, which arrives with the structured data below.

---

## Structured data

Site identity and per-type schema **shipped in 2.0.8** — see
[Structured data](./index.md#structured-data).

### Author profiles and E-E-A-T <span className="badge badge--secondary">Exploring</span>

Authors already get their own `Person` node with a stable `@id`, so the same writer across
twenty posts is one entity rather than twenty unrelated names. What is still missing is the
part authors have to supply: expertise topics and profile links, expressed as `knowsAbout`
and `sameAs` — the signals Google's guidelines describe under Experience and Expertise.

### FAQ data in the graph <span className="badge badge--secondary">Exploring</span>

The [accordion element](../../shortcodes/interactive-elements/accordion.md) can already emit `FAQPage`
structured data — switch on its FAQ rich snippet option and the questions and answers are
published for search engines to show as an expandable result.

What is left is a smaller, tidier problem than it first appears: that block is emitted
separately from the main graph, so nothing connects the FAQ to the page it is on. Linking
them means one representation rather than two adjacent ones. Worth doing, and worth doing
carefully — emitting the questions twice would be worse than the current arrangement.

### Product, event and recipe types <span className="badge badge--secondary">Exploring</span>

The types that produce the richest results, and the ones that need real per-page fields
rather than a site-wide setting.

---

## Local business

### `LocalBusiness` structured data <span className="badge badge--secondary">Exploring</span>

For a business with a physical presence, search engines want the name, address, phone number,
opening hours and business type as structured data — the thing that produces an opening-hours
line, a map pin and a directions link next to a result.

Worth being specific about what is actually missing here, because it is less than it looks.
UnysonPlus already collects all of this. The
[Business Info](../../shortcodes/components/business-info.md) element holds the name, address, phone,
email, website and map link, plus a seven-day opening-hours grid with per-day open, close and
closed states — and it already computes a live open/closed status from the site timezone. The
[Map](../../shortcodes/media-elements/map.md) element already renders locations, with OpenStreetMap as well as
Google, so no API key is needed to show a map at all.

So the gap is not the data or the display. It is that none of it is currently expressed as
`LocalBusiness` and `openingHoursSpecification` schema, which is the part search engines read.

The open design question is where that data should live. Today it belongs to an element on a
page, which is right for display and awkward for a site-wide claim about the business. The
likely answer is site-level fields that the element can also read, so the two never disagree
— but that is a decision to make deliberately rather than discover.

### Multiple locations <span className="badge badge--secondary">Exploring</span>

A business with several branches needs one entry per location, each with its own address,
hours and map. The [Post Types](/data-modeling/post-types) extension can already register
a Locations content type; what it would need is the schema and a way to place a specific
location on a page.

---

## Crawl control

These do not change what you say about a page. They reduce the number of low-value URLs a
search engine has to crawl at all, which matters most on large sites.

### Attachment URL handling <span className="badge badge--warning">Coming soon</span>

WordPress creates a page for every uploaded file. They are thin, near-duplicate pages that
get indexed anyway. Redirect them to the file itself or to the post that uses it.

### Feed cleanup <span className="badge badge--secondary">Exploring</span>

Switch off the RSS feeds a site does not use — author feeds, comment feeds, search feeds,
attachment feeds — redirecting them rather than leaving them to be crawled.

### Archive defaults <span className="badge badge--secondary">Exploring</span>

Author and date archives are thin, near-duplicate listings on most sites and are worth
keeping out of the index by default, while staying available for sites that genuinely publish
by author.

---

## More sitemaps

The general sitemap ships today, images included. These are the specialised ones.

### Video sitemap <span className="badge badge--secondary">Exploring</span>

A separate sitemap listing video content with its title, description, thumbnail and duration,
which is what search engines read to show a video thumbnail next to a result.

The builder helps here in the same way it helps with descriptions: video elements are found
by walking the builder tree, so the title and thumbnail are already known rather than being
scraped out of an embed's markup.

### News sitemap <span className="badge badge--secondary">Exploring</span>

Google News accepts a sitemap of articles published in the last 48 hours. Genuinely useful if
you are an approved publisher and worth nothing at all if you are not, so it belongs behind a
switch rather than on by default.

### HTML sitemap <span className="badge badge--secondary">Exploring</span>

A human-readable page listing your content, for visitors rather than crawlers. Small and
easy, and the one people actually ask for.

---

## Images

### Global alt and title text <span className="badge badge--secondary">Exploring</span>

Set what image `alt` and `title` attributes should contain site-wide, written with the same
[template tags](./template-tags.md) as everything else — the attachment title, its caption,
the post it appears in — so images uploaded with no alt text are still described rather than
silent.

Worth stating the limit honestly: generated alt text is a fallback, not a substitute for
writing it. `alt` exists so that someone using a screen reader knows what the image shows,
and a filled-in template is better than an empty attribute while being worse than a sentence
someone wrote. Anything built here should make the hand-written case easy, not merely fill
the gap.

---

## Redirects

### Automatic redirects when a slug changes <span className="badge badge--warning">Coming soon</span>

Rename a page and its old URL stops working — along with every link and bookmark pointing at
it. Recording a redirect automatically at the moment the slug changes prevents the most
common cause of avoidable 404s, and needs no attention from anyone.

### Redirect manager <span className="badge badge--secondary">Exploring</span>

Manual rules for everything the automatic case cannot cover: content that moved before the
site did, URLs from an old platform, campaign links that should point somewhere new.

What such a thing needs to be useful rather than merely present:

- **Sensible matching** — optionally ignoring a trailing slash or letter case, since those
  produce the same page but a different URL, with regular expressions for the awkward cases.
- **Several sources to one target**, because a page that moved twice has two old URLs.
- **A hit counter per rule**, so you can tell which redirects still carry traffic and which
  are dead weight.
- **The full set of status codes** — 301 and 302, but also 410 Gone for content deliberately
  removed, which is a clearer signal than redirecting it somewhere irrelevant.
- **Grouping and search**, because redirect lists grow into the hundreds and become
  unmaintainable without them.

### 404 monitoring <span className="badge badge--secondary">Exploring</span>

A log of URLs that returned 404, so a redirect can be created from the evidence rather than
guessed at. Most useful immediately after a migration, which is also when nobody has time to
go looking.

### Whole-site moves <span className="badge badge--secondary">Exploring</span>

Redirect an entire site to a new domain in one rule, preserving paths — the thing you need
exactly once, on a day when getting it wrong is expensive.

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

Part of the ground is already covered: [Pages going stale](./index.md#pages-going-stale) reports age
and length across the site today, and the [list columns](./index.md#editing-from-the-list) show
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

### Diagnostics, not just the verdict <span className="badge badge--secondary">Exploring</span>

The Page speed report shows field data from real visits, which answers whether the site is slow
for the people actually using it. It cannot say *what to fix*.

The PageSpeed Insights API is free and needs no account or OAuth at all, and returns the
diagnostics that name the cause — the render-blocking resource, the oversized image, the element
shifting the layout. Field data decides whether it is worth your afternoon; lab diagnostics decide
where the afternoon goes.

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

### The failures nobody notices <span className="badge badge--secondary">Exploring</span>

A small set of checks that catch the failures nobody notices until traffic drops — the
homepage left on noindex after a launch, a `robots.txt` returning an error, a sitemap that
has stopped generating.

These are worth doing precisely because they are dull. Every one of them is a site-wide
outage of your search presence caused by a single switch, and the gap between it happening
and somebody noticing is usually measured in weeks.

They come first, before anything below, because they are the only ones that are unambiguously
urgent — and because the checks have to prove reliable before anything more elaborate is worth
building on top of them.

### Being told, instead of remembering to look <span className="badge badge--secondary">Exploring</span>

Every report in the extension is pull-based. Site search, Going stale, Page speed and Search
Console all sit behind a menu, and a report nobody opens may as well not exist. Most of what would
be worth saying is already computed, and simply never leaves the screen that computed it.

The test for anything allowed to interrupt someone: **it names a page, names an action, and is
rare enough to be believed.** On that test, these qualify:

- The Search Console connection **stopped working** — including the seven-day expiry that catches a
  Google Cloud project left on "Testing". Without this, every report quietly goes stale while
  continuing to look fine.
- A page, or the whole site, **accidentally went `noindex`**.
- A page gets **many impressions and almost no clicks** — a title not telling people what they
  would get.
- A page's impressions **dropped sharply** against the previous four weeks.
- A page sits at **position 8–15**.
- A query brings impressions but **no page targets it**.
- A page passed the staleness threshold **and still gets traffic**. Old pages nobody visits do not
  matter, and that distinction is what makes the alert worth sending.
- Visitors **searched the site and found nothing**.

Where it would appear, in the order worth building: a **dashboard widget**, seen on login and
intruding on nothing; an **inline note in the editor**, because the moment to say "this is two
years old and still gets 300 visits a month" is when the post is already open; then an opt-in
**weekly email**; and an **admin notice** reserved for the broken-connection class of problem
alone.

Two constraints decide whether this is useful or unbearable. **Every alert needs a minimum-volume
floor** — a site with fifty impressions a month cannot have a meaningful "30% drop", and without
floors small sites would receive nothing but false alarms. And **SEO moves in months**, so weekly
is the ceiling; a daily alert misrepresents the tempo of the thing it reports on.

The detection must work with the AI Assistant switched off, since it ships inactive and needs a
model connection. Where the Assistant earns its place is translation: "CTR 0.9% at position 8.3"
is not an instruction. "4,000 people saw this page and 36 clicked — the title probably does not say
what they would get" is.

---

## Internal linking

### Link report and orphaned pages <span className="badge badge--secondary">Exploring</span>

Internal links are one of the few on-page factors you fully control, and the usual problem is
not knowing what the current state is. A link report would index every link on the site and
answer the questions that actually matter:

- **Which pages have no internal links pointing at them?** Orphaned pages are reachable only
  from a menu or a sitemap, and they are easy to accumulate without noticing.
- **Where do outbound links go?** A count per external domain, so you can see at a glance
  which third parties your site links to most.
- **Which links are internal, external or affiliate?** Affiliate links are worth separating,
  since they generally want `rel="sponsored"` rather than passing authority.

### Internal link suggestions <span className="badge badge--secondary">Exploring</span>

Given the above, suggest pages that could reasonably link to each other, in both directions —
pages that should link out to this one, and pages this one could link to.

Worth noting where the page builder helps: link extraction reads the builder tree rather than
parsing rendered HTML, so a link inside a button, a card or an accordion is found as reliably
as one in a paragraph. Tools that only see the finished markup have to guess at which links
are content and which are chrome.

---

## Editing at scale

### List columns and inline editing

**Shipped in 2.0.7** — see [Editing from the list](./index.md#editing-from-the-list).

A **site-wide audit** — "which of my 400 pages emit no description at all" — is still open,
and is listed under [Content tools](#content-tools). It needs something the columns do not:
an index of resolved values. A description is worked out at render time, so it cannot be
queried until it has been stored somewhere.

### Importing from other plugins

**Shipped in 2.0.10** — see [Importing from another plugin](./index.md#importing-from-another-plugin).

Site-wide settings (title templates per content type, social defaults) are not imported yet;
only per-page values are. Templates are a handful of fields you set once, and getting them
wrong site-wide is a bigger blast radius than getting one page wrong.

---

## Smaller additions <span className="badge badge--warning">Coming soon</span>

- **IndexNow** — tell Bing and Yandex about new and updated pages as you publish.
- **Additional verification code** — a field for any service without a dedicated box.
- **RSS attribution** — append a link back to your site on every feed item, so content
  scrapers link to the original.
- **Paginated titles** — a site-wide suffix for page 2 and beyond, without editing every
  template.
- **Editor access by role** — control which roles may edit SEO fields.
- **Complete removal on uninstall** — an option to delete every setting and stored value when
  the extension is removed.

---

## Tools

### robots.txt editor <span className="badge badge--warning">Coming soon</span>

WordPress generates `robots.txt` dynamically — there is no file on the server to edit — and
the extension already appends your sitemap to it. What is missing is a way to add your own
rules without writing a filter.

The useful shape is a small table of *user agent → directive → value* rather than a raw text
box, because the common mistakes here are syntax errors, and a preview of the finished file
underneath so you can see what crawlers will actually receive.

Two things worth having built in, since almost everyone wants them and almost nobody writes
them correctly by hand:

- **Blocking AI crawlers** — GPTBot, CCBot, Google-Extended and the rest, individually or all
  at once. Whether to block them is a genuine editorial decision and not one this extension
  should make for you, but making it a checkbox rather than a research project is fair.
- **Blocking internal search URLs** — `/?s=` produces an unlimited number of thin, duplicate
  pages, and it is one of the few crawl-budget problems that is both common and trivially
  fixed.

:::note
`robots.txt` controls **crawling**, not indexing. A URL blocked there can still appear in
results if something links to it — and because the page was never crawled, its `noindex` was
never seen. To keep a page out of the index, use the noindex switch and leave it crawlable.
:::

### Import and export settings <span className="badge badge--secondary">Exploring</span>

Export your SEO configuration to a file and import it into another site. The obvious use is
an agency running the same setup across many sites; the less obvious one is having a copy
before you change something.

This pairs with **importing from other plugins** under *Editing at scale* above — same
machinery, different source.

### Reset settings <span className="badge badge--secondary">Exploring</span>

Restore defaults, per settings group rather than all at once, for when a site has been
configured into a corner.

## Search Console

The connection itself has shipped and sits under
[Reports](./index.md#reports). What follows is what it could report next.

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

### Index coverage <span className="badge badge--warning">Coming soon</span> {#index-coverage}

The most actionable part, and the one nothing else surfaces: how many of your pages Google
has actually indexed, and for the rest, *why not* — crawled but not indexed, discovered but
not crawled, or excluded. Per page it can also show when it was last crawled, which canonical
Google chose against the one you declared, and which rich results it qualified for.

This is the next thing to build. It answers the most common question in SEO — *why is this
page not showing up* — which today can only be guessed at, and it needs **no new credential**:
it runs on the Search Console connection that is already set up and already explained.

On a site generating pages from a template it is also the only honest measure of whether that
is working at all: of two thousand pages, how many did Google keep?

"Twelve pages have been discovered and never crawled" is a specific problem with specific
causes. A ranking chart is not.

:::note
Google's URL Inspection API is rate limited, so per-page index status has to be fetched
gradually and cached rather than refreshed on demand. Any honest implementation is a
background job, not a button.
:::

### Query reporting <span className="badge badge--secondary">Exploring</span>

Which search terms bring people to each page, with impressions, clicks and position history.

The view worth building is per page: the queries a post ranks for, its average position, and
whether that position is improving or slipping. **Positions 8–15 are where attention pays** —
close enough to the first page to be worth the effort, far enough down to be invisible — and
nothing in the admin currently points at them.

One clarification worth making, since competing plugins present this as a *rank tracker*:
Search Console reports an **average position across everyone who saw the result**, which
varies by location, device and personalisation. It is a useful trend and it is not your
ranking. It also only covers queries you have **already appeared for** — a keyword you have
never shown up for has no impressions, so there is no row and nothing to report. A genuine
rank tracker requires scraping search results from many locations, which is a paid external
service — not something this can honestly provide by reading Search Console.

---

## AI and LLM search

Last in the order deliberately. This is the least settled area in SEO, the conventions are
changing month to month, and the fundamentals above matter more to a real site than anything
here.

That said, UnysonPlus is not starting from behind. The theme already publishes an
[`llms.txt`](https://llmstxt.org) entry point so AI agents get a clean, plain-text map of
your site, and the capture service already ships an AI companion that uses **your own** API
key or local CLI rather than a metered credit balance.

### Let an AI assistant work on your SEO (MCP) <span className="badge badge--secondary">Exploring</span>

The most interesting item on this page. Model Context Protocol lets an AI client — a desktop AI app, a command-line coding agent, an IDE
assistant — connect directly to your site and work with its SEO
data: *find posts missing meta descriptions*, *set titles across a section*, *create a
redirect*.

WordPress's Abilities API plus an MCP adapter makes this genuinely tractable rather than
speculative, and it fits how UnysonPlus is already built and used. The honest caveats: it
requires Application Passwords, it hands an AI client real write access to your content, and
that trade deserves a deliberate decision rather than a default-on switch.

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
