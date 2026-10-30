---
sidebar_position: 6
title: "Structured data"
sidebar_label: "Structured data"
description: "The schema.org graph Unyson+ SEO emits: site identity, what each content type is, author entities and FAQ data from the accordion element."
---
# Structured data

Meta tags describe a page. Structured data describes what the site and its contents **are** —
which is what produces a knowledge panel, a proper site name in results, an author byline and
the sitelinks search box.

<img src="/img/seo/seo-structured-data.png" alt="The Structured data settings: site identity and what each content type is" width="1644" />

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

## Site identity

Under **Unyson+ → SEO → Structured data**, say whether the site represents **an organisation** or
**a person** — a freelancer, author or consultant. The whole graph is built around whichever
you choose.

Then the details worth stating explicitly rather than having guessed: name (when the legal or
brand name differs from the site title), an alternate name people also search for, a
description of the organisation rather than the website, a logo, and contact details.

Your [social profiles](./settings.md#social) become `sameAs` here — the property that tells a search
engine which accounts are genuinely yours. Only full URLs are published: a bare handle is
dropped rather than emitted, because `sameAs` only means anything if every entry resolves.

## What each content type is

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

## FAQ data

Switch on **FAQ Rich Snippet (Schema)** on an [accordion element](/shortcodes/interactive-elements/accordion)
and its questions and answers join this page's graph: the page becomes a `WebPage` **and** an
`FAQPage`, with each item as a `Question` and its content as the `Answer`. Several FAQ accordions on one
page are combined, and a question asked twice is listed once.

The accordion then leaves out the separate FAQ block it used to print, so the questions are published
exactly once. Without the SEO extension, or on a content type set to publish no structured data, the
accordion prints its own block as before, so they are never dropped either.

Use it only on a real list of questions and answers. Google shows FAQ results mainly for well-known
government and health sites now, so treat it as accurate description rather than a guaranteed
expandable result.

## Authors: expertise and profiles

<img src="/img/seo/seo-author-profile.png" alt="The 'Author profile for search engines' fields on a user's profile: job title, areas of expertise and profiles elsewhere" width="1672" />

Each author is already one `Person` across all their posts. On **Users → Profile**, under **Author
profile for search engines**, authors can add what search engines' guidelines ask about expertise and
experience:

| Field | Published as |
| --- | --- |
| **Job title** | `jobTitle` |
| **Areas of expertise** (comma-separated) | `knowsAbout` |
| **Profiles elsewhere** (one address per line) | `sameAs`: their social and professional profiles, an author page on another publication |

It is published with every article they wrote. Only `http://` and `https://` addresses are used.

## Local business

<img src="/img/seo/seo-local-business.png" alt="The Local business box: kind of business, address, map position, price range and opening hours for each day" width="1644" />

For a business people visit or call, choose its **Kind of business** under **Structured data → Local
business**. The site's organisation is then described as that kind of business (a `Restaurant`, a
`Dentist`, a `Plumber`… or plain `LocalBusiness`) with:

- its **address** and **map position** (latitude, longitude);
- its **price range** (`££`, `$$$`);
- its **opening hours**, one field per day: `09:00-17:00`, `12:00-15:00, 18:00-22:00` for a break,
  `9am-5pm`, `24 hours` or `closed`. Days with the same hours are combined, and a day left empty is
  simply not stated.

That is what produces the opening-hours line, map pin and directions link beside a search result. The
name, phone, email and logo come from **Site identity** above.

The [Business Info element](/shortcodes/components/business-info) uses these details for any field
left empty on the element itself, so the page and the structured data say the same thing.

## Products, events, recipes and branches

<img src="/img/seo/seo-structured-data-box.png" alt="The Structured data box on a post set to Recipe: preparation and cooking times, servings, course, cuisine, ingredients and steps" width="1372" />

The richest results need real per-page details. Each page has a **Structured data** box; choose what
the page **is** and fill in its fields:

| This page is a | Fields | Needed before it is published |
| --- | --- | --- |
| **Product** | name, brand, SKU, price, currency, availability, average rating and number of reviews | a price, or a rating |
| **Event** | name, start and end, in person / online / both, venue and address, online address, ticket price, status (on, postponed, rescheduled, cancelled) | a start date, and a venue or online address |
| **Recipe** | name, preparation and cooking minutes (the total is worked out), servings, course, cuisine, calories, ingredients and steps (one per line), keywords | the ingredients and the steps |
| **Business location** | kind of business, address, phone, map position, hours per day | an address |

Until the required fields are filled, the box says what is missing and nothing is published: a
half-filled entry earns no rich result and can earn a warning. Once complete, it says *Published with
this page*, and the entity joins the graph as what the page is about. The page's title, description and
image are used unless a name is given.

- **Ratings must be real reviews from customers.** Made-up ratings break search engines' guidelines and
  can cost the whole site its rich results. A rating with no review count is not published.
- **Business location** is how a business with several branches describes each one: a page per branch,
  each with its own address and hours, linked to the business as a whole (`parentOrganization`). Place a
  [Business Info element](/shortcodes/components/business-info) on the page to show the same details.
- The box is not added to WooCommerce products, which describe themselves.
- Who can see and edit it follows [Access and removal](./access-and-removal.md).
