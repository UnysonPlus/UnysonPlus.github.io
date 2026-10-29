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

The [accordion element](/shortcodes/interactive-elements/accordion) publishes its own
`FAQPage` data when you switch on its FAQ rich snippet option, and that continues to work
unchanged. It is currently emitted as a separate block rather than joined into the graph
above — see the [roadmap](./roadmap.md#structured-data).
