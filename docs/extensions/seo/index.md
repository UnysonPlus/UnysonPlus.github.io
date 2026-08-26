---
title: "SEO"
---

# SEO

Dynamic titles and meta descriptions, generated automatically and overridable per page,
with canonical URLs, indexing control and XML sitemaps.

The guiding idea: **a site should be correctly described the moment the extension is
activated**, with no configuration. Every field has a sensible default, descriptions are
written from your content, and you only touch a page's SEO settings when you want something
different from what it already produces.

Activate it under **Unyson+ → Extensions**, then find its settings under **Unyson+ → SEO**.

---

## How it decides what to output

Every field resolves the same way. The first step that produces something wins.

| Step | Where it comes from |
| --- | --- |
| **1. Your text** | What you typed in this page's own SEO panel. |
| **2. The template** | The pattern set for this content type in the settings. |
| **3. Generated** | Written from the page's own content. |
| **4. Fallback** | The site title, or nothing at all. |

This is why the per-page fields start out filled in but *not saved*: the box shows what the
page will use, and until you edit it the page stays attached to its template. Change the
template later and every page still following it updates too. Edit one page and only that
page changes — clear the field again and it rejoins the template.

### Descriptions are written for you

If a page has no description of its own, one is generated from its content. On page-builder
pages the extension reads the **builder tree directly**, taking text from the elements that
actually carry prose — headings, text blocks, accordions — rather than flattening the
rendered markup. That is why generated descriptions on builder pages read like sentences
instead of a list of button labels.

You can switch this off under **Settings → General → Auto-generate descriptions**, though a
page with no description at all is rarely what you want.

:::note
A description is only ever generated for pages that have something to describe. Ordinary
pages with nothing to say get no description tag rather than a copy of the site tagline —
the same description repeated across a site is worse than none.
:::

---

## The per-page SEO panel

Every post, page and term gets an **SEO** panel with three tabs.

**General** holds a live search-result preview, the SEO title and the meta description.

- Template tags appear as **chips** — `Title`, `Separator`, `Site title` — rather than raw
  `%%tag%%` text. Use the buttons above each field to insert one, or **View all tags** to
  browse everything available with example values for the current page.
- The counters measure the **resolved** text, not the template: a title's width in pixels
  (Google truncates on width, not character count) and a description's length in characters.
- The preview line tells you where each value came from — your text, the template, or
  generated from the content.

**Social** holds the share title, description, image and card style. Every one of them is
optional — leave them alone and the card is built from the fields above. See
[Sharing cards](#sharing-cards).

**Advanced** holds the canonical URL and the indexing controls. Those sit behind a
*use the settings for this content type* switch, so the common case is one control rather
than eight.

---

## Settings

### General

Title separator, auto-generated descriptions, and canonical URLs. Canonical URLs are on by
default and tell search engines which address is the original for each page; paginated pages
correctly canonicalise to themselves rather than to page one.

### Titles &amp; Meta

A title and description template for every place a page can appear: the homepage, the blog
index, each content type, each taxonomy, author and date archives, search results and 404s.
Each also carries **No index** and **No follow** switches for the whole group.

Templates are written with [template tags](./template-tags.md), so
`%%title%% %%sep%% %%sitename%%` becomes *Hello world | My Site*. Tags that resolve to
nothing take their separator with them, so a template never renders `Title |  | Site`.

### Sitemap

Your sitemap lives at `/sitemap.xml` and is linked from `robots.txt`, which is how search
engines find it. Submit that URL once in Search Console — there is nothing to resubmit
afterwards.

- One sitemap per content type and taxonomy, chunked at 1,000 URLs.
- **Images are included** by default, so your media can be found in image search.
- Anything set to no index is left out automatically — a single page in its own SEO panel, or
  a whole content type in the settings. A sitemap should never advertise a URL whose page
  tells crawlers to ignore it.
- Opening a sitemap in a browser shows a readable table rather than raw XML.
- WordPress publishes its own sitemap at `/wp-sitemap.xml`; the extension switches that off by
  default so your site has one sitemap rather than two competing ones.

### Social

Everything about how a page looks when it is shared.

**Sharing cards** are on by default and need no configuration: the share title follows your
SEO title, the share description follows your meta description, and the image is found from
the page itself. Set a **default share image** for pages that have none, and a **card style**
— the large card is the better choice for almost every site.

Add your **X / Twitter account** so shared links are attributed to it.

**Social profiles** records the accounts that belong to this site. These are not decoration
and they are not links displayed anywhere: they exist to feed the `sameAs` property that
tells a search engine which accounts are genuinely yours. That structured data is still to
come, so for now these fields are stored and not yet emitted.

### Verification

Verification codes for Google Search Console, Bing, Yandex, Baidu and Pinterest. Paste only
the code from the tag each service gives you, not the whole tag.

---


---

## Sharing cards

A shared link shows a card: a title, a description and an image. Getting one of the three
wrong is the difference between a link people click and a grey box they scroll past.

The important thing here is that **nothing needs configuring**. The card is resolved from
the same chain as everything else:

| Card field | Comes from |
| --- | --- |
| Title | Your share title → the SEO title → the template |
| Description | Your share description → the meta description → generated from the content |
| Image | Your chosen image → the featured image → the first real picture on the page → your site-wide default |

Because the share title's *template* step is the resolved SEO title, changing a site-wide
title template updates search results and share cards together. They cannot drift apart —
which is the bug this replaces, since the two used to be calculated in different places.

Override any of it per page from the **Social** tab of the SEO panel.

### Finding the image

The third rung is worth explaining, because it is the one most plugins get wrong.

Finding "the first image on the page" by searching the rendered HTML almost always finds a
logo, an icon or a tracking pixel — they appear in the markup before your content does. Here
the **page-builder tree** is read instead, so the search covers the elements that actually
hold a picture, in the order a reader meets them.

Candidates are then filtered by size. Open Graph's own minimum is 200 × 200 and every network
refuses anything below it, so a smaller image is **skipped rather than used** and the search
continues. A card cropped from a 441 × 84 logo is a smear, and emitting one looks like it
worked.

Two deliberate limits:

- Only images **you host** can be measured. A remote URL is taken on trust rather than
  fetched — an HTTP request on every page render to check an image's size is not a fair
  trade.
- A **featured image is used whatever its size**, because you chose it. The size rule applies
  only where we are guessing.

:::note
`og:image:width` and `og:image:height` are emitted only for images we could actually measure.
A guessed dimension is worse than none, because it is believed.
:::

### What is emitted

Open Graph and Twitter tags are produced together from one resolution. Twitter's own fields
exist so a page can say something different on one network — and when it does not, they
inherit from Open Graph without anything being configured.

Posts are marked `article` with their published and modified times; pages and archives are
`website`. A static page is not news, and telling Google it is costs a real signal.

A large-image card with no image degrades to the small card on its own, rather than promising
an image that never arrives.


---

## Editing from the list

The posts list gains **SEO title** and **Meta description** columns, so you can review a
whole section without opening a single page.

The columns show the **resolved** value — what the page will actually emit — with a label
saying where it came from:

| Label | Meaning |
| --- | --- |
| **Custom** | Text you typed on this page |
| **Template** | The pattern for this content type |
| **Generated** | Written from the page's own content |
| **Fallback** | The site title, or nothing |
| **None** | Nothing is emitted at all |

Showing stored values instead would leave most rows blank, because most pages quite properly
have no override — a correctly configured site would look like an empty one.

A row also warns when a value is long enough that a search engine **may shorten** it. That is
phrased as a possibility rather than an error on purpose: a long title is not a mistake, and
treating it as one trains people to write to a counter instead of to a reader.

### Inline editing

**Quick Edit** carries the SEO title, the meta description and the no-index switch. Leaving a
field empty keeps the page following its template — and clearing a field that had an override
removes it, putting the page back on the template rather than storing an empty value.

:::note
The inline editor is filled from your **stored** overrides, never from the resolved text in
the column. If it copied what you can see, every page you quick-edited would silently acquire
a frozen copy of its template — and a later template change would then update nothing.
:::

### Filtering

A dropdown above the list filters by:

- **Not indexed** — everything currently carrying a `noindex`
- **Has custom SEO** — pages where you have written a title or a description
- **Following the template** — pages where you have written neither
- **No custom share image** — pages relying on the automatic image

You may notice there is no "pages with no description" filter, which is the one people ask
for first. It is missing deliberately rather than forgotten: a description is worked out when
the page renders — from an override, a template, or the content itself — so it is not a
stored fact and there is nothing for the database to search. Offering the filter anyway would
mean either a wrong answer or loading every page on the site into memory to check, which
breaks as soon as the list has more than one screenful.

The per-row labels answer it honestly for the page you are looking at. Answering it for a
whole site needs a stored index of resolved values, which is the
[site-wide audit](./roadmap.md#content-tools) on the roadmap.

## What the theme provides today

Some of what people expect from an SEO plugin is currently emitted by the **UnysonPlus
theme** rather than this extension. It works today; it simply lives somewhere else, and the
extension will take these over so they follow the same templates and per-page overrides as
everything else.

| Feature | Where it lives now |
| --- | --- |
| `Organization`, `WebSite` and `Article` structured data | UnysonPlus theme |
| `llms.txt` — a plain-text entry point for AI agents | UnysonPlus theme |
| Breadcrumbs and `BreadcrumbList` structured data | [Breadcrumbs extension](../breadcrumbs/index.md) |

See the [roadmap](./roadmap.md) for what is planned.

---

## Where your settings are stored

Per-page SEO values are stored as individual post and term meta keys (`_fw_seo_title`,
`_fw_seo_description`, and so on) rather than inside a single blob. That means they can be
queried — which is what makes the [list columns](#editing-from-the-list), their filters and
sitemap filtering possible.

Clearing a field removes the stored value entirely rather than saving an empty one, so the
page falls cleanly back to its template.
