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

Every post, page and term gets an **SEO** panel with two tabs.

**General** holds a live search-result preview, the SEO title and the meta description.

- Template tags appear as **chips** — `Title`, `Separator`, `Site title` — rather than raw
  `%%tag%%` text. Use the buttons above each field to insert one, or **View all tags** to
  browse everything available with example values for the current page.
- The counters measure the **resolved** text, not the template: a title's width in pixels
  (Google truncates on width, not character count) and a description's length in characters.
- The preview line tells you where each value came from — your text, the template, or
  generated from the content.

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

### Verification

Verification codes for Google Search Console, Bing, Yandex, Baidu and Pinterest. Paste only
the code from the tag each service gives you, not the whole tag.

---

## What the theme provides today

Some of what people expect from an SEO plugin is currently emitted by the **UnysonPlus
theme** rather than this extension. It works today; it simply lives somewhere else, and the
extension will take these over so they follow the same templates and per-page overrides as
everything else.

| Feature | Where it lives now |
| --- | --- |
| Open Graph and Twitter cards | UnysonPlus theme |
| `Organization`, `WebSite` and `Article` structured data | UnysonPlus theme |
| `llms.txt` — a plain-text entry point for AI agents | UnysonPlus theme |
| Breadcrumbs and `BreadcrumbList` structured data | [Breadcrumbs extension](../breadcrumbs/index.md) |

See the [roadmap](./roadmap.md) for what is planned.

---

## Where your settings are stored

Per-page SEO values are stored as individual post and term meta keys (`_fw_seo_title`,
`_fw_seo_description`, and so on) rather than inside a single blob. That means they can be
queried — which is what makes bulk editing, list-table columns and sitemap filtering possible.

Clearing a field removes the stored value entirely rather than saving an empty one, so the
page falls cleanly back to its template.
