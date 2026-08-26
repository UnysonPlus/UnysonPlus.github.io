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

### AI assistance <span className="badge badge--secondary">Exploring</span>

Suggest a description or a title for the current page. UnysonPlus already ships an AI
companion with the capture service, so this would use that rather than a metered third-party
service.

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
