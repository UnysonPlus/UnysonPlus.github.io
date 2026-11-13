---
sidebar_position: 6.5
title: "Custom schema (your own JSON-LD)"
sidebar_label: "Custom schema"
description: "Paste JSON-LD written by an SEO specialist or a schema generator, for the whole site or one page. Unyson+ SEO merges it into its own structured data, so nothing is described twice."
keywords: [custom schema, json-ld, structured data, schema markup, vacationrental, localbusiness, aboutpage]
---
# Custom schema (your own JSON-LD)

An SEO specialist, a client or a schema generator often hands over structured data that is
already written: a `VacationRental` with its beds and amenities, a `Hotel`, an `AboutPage` with
its breadcrumb. **Custom schema** is where it goes, in two places:

- **Site-wide:** **SEO → Structured data → Custom schema**, published on every page.
- **One page:** the page's SEO box → **Advanced** → **Custom schema (JSON-LD)**.

No code and no theme files. Paste it, save, and the readout under the box says what was
published.

## Why it is merged, not pasted into the head

The extension already publishes a [structured data graph](./structured-data.md) on every page:
your organisation, the website, and the page itself. Pasting a second `<script>` block beside it
would describe the site twice: two organisations, or two records with the same `@id` and
different types. Search engines read that as conflicting data.

So pasted records are **merged** into the graph:

| Pasted record | What happens |
| --- | --- |
| Has the same `@id` as a built-in record | It **replaces** the built-in record, in place. |
| Has an `@id` nothing else uses, or no `@id` | It is **added** to the graph. |
| Is the business itself, with **It replaces the site identity** on | It **stands in for** the built-in Organization or Person, and every built-in record that pointed to the old identity now points to it. |
| Is on a page, and has the same `@id` as a site-wide pasted record | The **page's** record wins on that page. |

The built-in records keep their usual addresses, so to replace one, use its `@id`:

| Built-in record | Its `@id` |
| --- | --- |
| The site identity | `https://your-site/#organization` (or `#person`) |
| The website (home page and posts page) | `https://your-site/#website` |
| A page | the page's address + `#page`, for example `https://your-site/about/#page` |

The page's own `@id` is also shown in the description under its Custom schema field.

## Site-wide schema

<img src="/img/seo/seo-custom-schema.png" alt="The Custom schema box: the pasted JSON-LD, the 'It replaces the site identity' switch, and the readout listing a VacationRental that replaces the site identity and a WebSite" width="1644" />

1. Go to **SEO → Structured data** and open **Custom schema**.
2. Paste the JSON-LD into **JSON-LD for every page**. It can be bare JSON, or one or more
   `<script type="application/ld+json">` blocks exactly as they were handed over, HTML comments
   included.
3. If it describes the business itself (a `LocalBusiness`, `VacationRental`, `Hotel`, `Restaurant`…),
   switch on **It replaces the site identity**.
4. Save. The readout lists every record it will publish, and marks the one that replaces the site
   identity.

**Which record is the identity?** The first pasted record that describes a thing rather than a
page. Pages, the website, breadcrumbs, images, lists, articles, products, events and reviews are
never picked. If none qualifies, the readout says so and the built-in identity stays.

When the identity is replaced, the [Site identity](./structured-data.md#site-identity) and
[Local business](./structured-data.md#local-business) settings stop being published, because the pasted
record now speaks for the business. Keep them filled in anyway: the
[Business Info element](/shortcodes/components/business-info) still reads them.

## Schema for one page

<img src="/img/seo/seo-custom-schema-page.png" alt="The Custom schema field in a page's SEO box, Advanced tab, with an AboutPage record and the readout 'Published: 1 record'" width="1358" />

1. Edit the page and open its SEO box → **Advanced**.
2. Paste the JSON-LD into **Custom schema (JSON-LD)**.
3. Update the page. The readout under the field lists what is published.

A typical use: an `AboutPage` for the About page. Give it the page's own `@id`
(`https://your-site/about/#page`) and it replaces the plain `WebPage` record instead of sitting
beside it.

Categories, tags and other terms have the same field in their SEO section.

## When something is wrong

Broken JSON is **kept** (nothing you pasted is lost) but **not published**, and the readout says what
is wrong and on which line, counted from the top of the box:

> **Not published:** line 14: Expected a "quoted" property name here. Look for a comma after the
> last item, or a missing quote.

The usual causes are a comma after the last item in a list, and curly quotes (“ ”) from a word
processor where JSON needs straight ones (").

The readout also warns about:

- two records with the same `@id` (only the last one is published);
- a record with no `@type` (skipped);
- an `@context` other than schema.org (the records are published with the schema.org context).

Only `<script type="application/ld+json">` blocks are accepted. A script that runs code is refused.

## Checking the result

Open the page and run it through Google's
[Rich Results Test](https://search.google.com/test/rich-results) or the
[Schema Markup Validator](https://validator.schema.org/). There should be one JSON-LD block, and each
`@id` should appear once.

Keep the pasted data in step with the page: if a description in the schema repeats the page's first
paragraph, change both together. Structured data that contradicts the visible page is worse than
none.

## Export, import and bulk editing

- **Site-wide:** the box and the identity switch travel with
  [Settings export / import](./settings-transfer.md) (`custom_schema`, `custom_schema_identity`).
- **Per page:** the [spreadsheet](./bulk-editing.md) has a **Custom schema (JSON-LD)** column. Export,
  edit and import it back like the other columns.
- **AI tools:** the AI Assistant and MCP agents set a page's schema with `seo_update_page`
  (`schema`) and the site-wide one with `seo_update_settings` (`custom_schema`,
  `custom_schema_identity`).

## Limits

- Custom schema is part of the graph, so switching off **Structured data** under Site identity turns
  it off too.
- It is published as written. The extension checks that it is valid JSON, not that schema.org or
  Google accept every property: use the tests above for that.
