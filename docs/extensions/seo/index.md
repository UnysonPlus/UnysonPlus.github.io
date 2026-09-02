---
title: "Free WordPress SEO Plugin"
sidebar_label: "SEO"
description: "Free WordPress SEO plugin — dynamic titles and meta descriptions, canonical URLs, XML sitemaps, Open Graph and indexing control. A free alternative to Yoast SEO and Rank Math."
---

# SEO

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Premium SEO, ready in minutes.</p>
  <p class="ext-hero__sub">Dynamic titles and meta descriptions, canonical URLs, XML sitemaps, Open Graph tags and indexing control — the SEO toolkit Yoast and Rank Math gate behind a paid plan, built in and free.</p>
</div>

Dynamic titles and meta descriptions, generated automatically and overridable per page,
with canonical URLs, indexing control and XML sitemaps.

The guiding idea: **a site should be correctly described the moment the extension is
activated**, with no configuration. Every field has a sensible default, descriptions are
written from your content, and you only touch a page's SEO settings when you want something
different from what it already produces.

Activate it under **Unyson+ → Extensions**, then find its settings under **Unyson+ → SEO**.

---

:::tip[💡 Web dev tip: the two SEO basics come first]
Before any plugin trickery, get the fundamentals right: a **unique, descriptive `<title>` and meta description** on every page, and **one clear topic per page** written for humans. Search engines reward pages that genuinely answer a query; this extension just makes those signals easy to set. [Google: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) · [Web Dev Basics: SEO Basics](/learn/seo)
:::

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

You can switch this off under **Unyson+ → SEO → General → Auto-generate descriptions**, though a
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

Seven tabs under **Unyson+ → SEO**. The last, **Import**, is covered under [Importing from another plugin](#importing-from-another-plugin).

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

### Structured data

Whether the site represents an organisation or a person, its name, logo and contact details,
and what each content type publishes as. Covered in full under
[Structured data](#structured-data).

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


---

## Structured data

Meta tags describe a page. Structured data describes what the site and its contents **are** —
which is what produces a knowledge panel, a proper site name in results, an author byline and
the sitelinks search box.

The extension publishes one JSON-LD `@graph` per page. A single connected graph rather than a
pile of separate blocks, because the connections are the useful part:

- The page's `publisher` **references** your identity node instead of repeating it.
- Every author gets a stable `@id`, so the same writer across twenty posts is **one entity**
  rather than twenty unrelated names — which is what lets a search engine accumulate a
  reputation for them at all.
- The page declares itself `isPartOf` the website.

Everything in the graph is read from the same resolution chain as your meta tags. The
headline is the resolved SEO title, the description is the resolved meta description, the
image is the one your share card uses. They cannot drift apart — and structured data that
contradicts the tags beside it is worse than none, because it is the machine-readable copy
and it is the one that gets believed.

### Site identity

Under **Unyson+ → SEO → Structured data**, say whether the site represents **an organisation** or
**a person** — a freelancer, author or consultant. The whole graph is built around whichever
you choose.

Then the details worth stating explicitly rather than having guessed: name (when the legal or
brand name differs from the site title), an alternate name people also search for, a
description of the organisation rather than the website, a logo, and contact details.

Your [social profiles](#social) become `sameAs` here — the property that tells a search
engine which accounts are genuinely yours. Only full URLs are published: a bare handle is
dropped rather than emitted, because `sameAs` only means anything if every entry resolves.

### What each content type is

Each content type chooses what it publishes as: *Web page*, *Article*, *Blog post*, *News
article*, or *No structured data*.

The list is deliberately short. schema.org defines hundreds of types, most of which no search
engine treats differently, and a long dropdown invites picking something specific and wrong.
*News article* in particular is a claim to be a news publisher, which is a claim search
engines check.

A **Web page** carries no byline and no publisher, because most pages have neither in any
meaningful sense. Putting an author on a contact page is a small lie that a rich result will
happily repeat.

:::note
The **WebSite** node and its search box are emitted only on your home page. Google reads them
from there, and repeating them on every URL does not make a search box more likely — it just
makes every page claim to be the site.
:::

### FAQ data

The [accordion element](../../shortcodes/interactive-elements/accordion.md) publishes its own
`FAQPage` data when you switch on its FAQ rich snippet option, and that continues to work
unchanged. It is currently emitted as a separate block rather than joined into the graph
above — see the [roadmap](./roadmap.md#structured-data).

---


---

## Importing from another plugin

If the site already runs **Yoast SEO**, **Rank Math**, **SEOPress** or **All in One SEO**,
bring its data across from **Unyson+ → SEO → Import**. The other plugin does not need to be
active — only its data still present in the database.

What comes across, per page: SEO title, meta description, canonical URL, the no-index and
no-follow switches, and the sharing card title, description and image.

### Template tags are translated, not copied

This is the part worth understanding, because it is where a careless import does damage that
takes weeks to notice.

Each plugin writes template tags in its own syntax:

| Plugin | Its syntax |
| --- | --- |
| Yoast SEO | `%%title%% %%sep%% %%sitename%%` |
| Rank Math | `%title% %sep% %sitename%` |
| SEOPress | `%%post_title%% %%sep%% %%sitetitle%%` |
| All in One SEO | `#post_title #separator_sa #site_title` |

Yoast's is almost identical to ours, which is exactly the trap — it makes the whole job look
like copying strings. Copy a Rank Math title across unchanged and `%title%` is an
unrecognised tag, so it renders as **nothing**. The page quietly loses its title, and nobody
finds out until Search Console says so.

So tags are translated as they are read.

:::note
A tag with no equivalent here is **left in the text and reported**, never removed. You get a
list of what could not be translated and how often it appeared. Silently deleting it would
leave a title that reads perfectly well and is missing a word — the kind of error you cannot
see by looking.
:::

### It will not overwrite your work

By default the import **skips any field you have already filled in here**. Running it twice
is safe, and if you have started editing in this extension, what you wrote is newer than what
you are leaving behind.

Tick **Overwrite values already set here** to replace them instead. It asks for confirmation.

Two things it deliberately does not do:

- **Another plugin's "use the default" does not become a switch here.** Yoast stores a value
  meaning *index* on pages that were simply never configured; importing that as an explicit
  no-index decision would turn a site's defaults into hundreds of hard-coded overrides.
- **An empty value is not imported as an empty override.** All four plugins write blank rows
  freely; here, empty means "follow the template", and that difference matters.

### Large sites

The import runs in batches of 100 with a progress bar. One long request would race the
server's time limit, and a timeout halfway through is the worst possible result — partly
imported, with nothing to say how far it got. If a batch does fail, nothing already imported
is lost: run it again.

## What lives elsewhere

A few things people expect from an SEO plugin are produced by other parts of UnysonPlus. They
work today; they simply live somewhere else.

| Feature | Where it lives |
| --- | --- |
| `llms.txt` — a plain-text entry point for AI agents | UnysonPlus theme |
| Breadcrumbs and `BreadcrumbList` structured data | [Breadcrumbs extension](../breadcrumbs/index.md) |
| `FAQPage` structured data | [Accordion element](../../shortcodes/interactive-elements/accordion.md) |

The theme also ships a metadata fallback — description, canonical, share cards and a basic
schema graph — for sites running no SEO plugin at all. Activating this extension stands each
of those down individually as it takes them over, so a page never carries two of anything.

See the [roadmap](./roadmap.md) for what is planned.

---

## Where your settings are stored

Per-page SEO values are stored as individual post and term meta keys (`_fw_seo_title`,
`_fw_seo_description`, and so on) rather than inside a single blob. That means they can be
queried — which is what makes the [list columns](#editing-from-the-list), their filters and
sitemap filtering possible.

Clearing a field removes the stored value entirely rather than saving an empty one, so the
page falls cleanly back to its template.
