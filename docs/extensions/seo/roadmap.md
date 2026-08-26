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

### Open Graph and Twitter cards <span className="badge badge--warning">Coming soon</span>

Control how a page looks when it is shared. Title, description and image per page, each
falling back through the same template chain as everything else, with an image fallback of
*your choice → featured image → first image in the content → a site-wide default*.

Currently emitted by the UnysonPlus theme from its own calculation. Moving it into the
extension means share cards follow your templates and per-page overrides instead of being
derived separately.

### Social profile URLs <span className="badge badge--warning">Coming soon</span>

One place to record the profiles that belong to this site — Facebook, X, Instagram, LinkedIn,
YouTube, TikTok, Pinterest and the rest. These are not decoration: they feed the `sameAs`
property that tells search engines which accounts are genuinely yours, so they belong with
the structured data below rather than in a separate social settings screen.

---

## Structured data

### Organisation and site identity <span className="badge badge--warning">Coming soon</span>

Editable fields for the `Organization` or `Person` your site represents — name, alternate
name, logo, contact details, founding date — feeding the `Organization` and `WebSite` nodes
that let Google show a proper site name and a sitelinks search box.

The theme already emits a basic version of this graph derived from your site identity, with
nothing to configure. This makes it explicit and editable, and the theme stands down when
the extension takes over so a page never carries two competing graphs.

### Per-type schema <span className="badge badge--warning">Coming soon</span>

Choose what each content type is: *Article*, *Blog Post*, *News Article*, and so on.

### Author profiles and E-E-A-T <span className="badge badge--secondary">Exploring</span>

Author expertise topics and profile links, expressed as `knowsAbout` and `sameAs` on the
author's `Person` node — the signals Google's guidelines describe under Experience and
Expertise.

### Element-level structured data <span className="badge badge--secondary">Exploring</span>

Because the page builder tree is available, an FAQ or accordion element could contribute
`FAQPage` data automatically, without anyone filling in a separate form. This is something
generic SEO plugins cannot do, since they only ever see the rendered markup.

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
hours and map. The [Post Types](/docs/data-modeling/post-types) extension can already register
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

### List columns and bulk editing <span className="badge badge--warning">Coming soon</span>

Titles, descriptions and indexing status shown as columns in the posts list and editable
without opening each page. Already possible because SEO values are stored as individual meta
keys rather than a single blob.

### Importing from other plugins <span className="badge badge--secondary">Exploring</span>

Bring existing titles, descriptions and settings across from Yoast, All in One SEO, Rank Math
or SEOPress, so moving does not mean retyping.

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

### SEO alerts <span className="badge badge--secondary">Exploring</span>

A small set of checks that catch the failures nobody notices until traffic drops — the
homepage left on noindex after a launch, a `robots.txt` returning an error, a sitemap that
has stopped generating.

These are worth doing precisely because they are dull. Every one of them is a site-wide
outage of your search presence caused by a single switch, and the gap between it happening
and somebody noticing is usually measured in weeks.

Notification by email; anything more elaborate can wait until the checks themselves have
proved reliable.

---

## Search Console

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

### Index coverage <span className="badge badge--secondary">Exploring</span>

The most actionable part, and the one nothing else surfaces: how many of your pages Google
has actually indexed, and for the rest, *why not* — crawled but not indexed, discovered but
not crawled, or excluded. Per page it can also show when it was last crawled, whether it was
seen as mobile or desktop, and which rich results it qualified for.

"Twelve pages have been discovered and never crawled" is a specific problem with specific
causes. A ranking chart is not.

:::note
Google's URL Inspection API is rate limited, so per-page index status has to be fetched
gradually and cached rather than refreshed on demand. Any honest implementation is a
background job, not a button.
:::

### Query reporting <span className="badge badge--secondary">Exploring</span>

Which search terms bring people to each page, with impressions, clicks and position history.

One clarification worth making, since competing plugins present this as a *rank tracker*:
Search Console reports an **average position across everyone who saw the result**, which
varies by location, device and personalisation. It is a useful trend and it is not your
ranking. A genuine rank tracker requires scraping search results from many locations, which
is a paid external service — not something this can honestly provide by reading Search
Console.

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

The most interesting item on this page. Model Context Protocol lets an AI client — Claude
Desktop, Claude Code, Cursor, VS Code — connect directly to your site and work with its SEO
data: *find posts missing meta descriptions*, *set titles across a section*, *create a
redirect*.

WordPress's Abilities API plus an MCP adapter makes this genuinely tractable rather than
speculative, and it fits how UnysonPlus is already built and used. The honest caveats: it
requires Application Passwords, it hands an AI client real write access to your content, and
that trade deserves a deliberate decision rather than a default-on switch.

### AI content suggestions <span className="badge badge--secondary">Exploring</span>

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
| **Competitor site analysis** | Crawling somebody else's site to score it needs a hosted crawler, which means an account, a subscription and your data leaving your server. Everything here is built to work with no account and no network connection, and that is worth more than the feature. |
| **A single site score** | A number out of 100 is satisfying and not actionable. The site audit above lists the actual problems instead. |
| **A system status screen** | WordPress ships **Tools → Site Health**, which already reports the server, PHP, database and plugin state. A second copy of it inside an SEO screen is duplication, not a feature. |
| **A code snippet library** | Copy-paste PHP snippets to change plugin behaviour are a symptom: they exist because the setting they emulate is missing. Where a snippet is genuinely wanted often enough to publish, it should be a setting instead. |
