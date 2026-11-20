---
slug: schema-headline-and-author-are-per-type-opt-ins
title: "Why are an article's schema headline and author settings per content type, opt-in, and not on each page?"
authors: [jon]
tags: [seo, architecture, extensions]
date: 2026-11-20
description: "A site's guides needed an Article whose headline is the visible H1 and whose author is the business. The SEO extension now has two per-content-type settings for that, off by default, instead of a schema tab in every page's SEO box."
---

## The question

"We can update the SEO extension, but this should just be an opt-in option, right? Shall this create
another tab in the SEO post box for schema?" A site's travel guides needed structured data the extension
almost produced: an `Article` with the dates, image and publisher it already built, but a headline taken
from the visible H1 and an author that is the business itself, not the person who typed the post.

<!-- truncate -->

## Context

The extension already let each content type choose what it publishes as (Web page, Article, Blog post,
News article). For articles it used the SEO title as the headline and the WordPress user as the author,
with a `Person` record for them. Guides written "By the … team" contradicted both: the search title
differed from the page's heading, and no single person wrote them.

## Options considered

- **Paste the schema on every guide** (Custom schema field). Works today, but every guide needs its own
  hand-written block, and the modified date goes stale the first time someone edits the page.
- **A Schema tab in each page's SEO box** with headline and author choices. Puts a decision on every page
  that is really a decision about the kind of content; one forgotten guide publishes differently from the rest.
- **Change the defaults** to the page title and the site. Silently changes the structured data of every
  existing site that uses articles.
- **Two settings per content type, off by default**, beside the existing type choice.

## Decision

SEO → Structured data → "What each content type is" gains, for each content type, **Headline** (*The SEO
title* by default, or *The page title (its H1)*) and **Author** (*The person who wrote it* by default, or
*The site itself*). Both apply only when the type is an article or blog post. "The site itself" points the
author at the site identity, the same `@id` as the publisher, and follows a pasted identity from Custom
schema. No new tab in the page's SEO box.

## Why

- **The choice belongs to the content type.** Every guide is written the same way, so it is set once and
  every new guide is right without anyone touching schema.
- **Opt-in protects existing sites.** The defaults reproduce the previous output exactly; nothing changes
  until someone switches a type over.
- **No new decision per page.** Editors already have enough in the SEO box; a per-page override can be added
  later if a real case needs one.
- **One identity, not two.** Pointing the author at the publisher's `@id` describes "the business wrote it"
  without inventing a person.

*Status:* Accepted (SEO extension 2.0.69).
