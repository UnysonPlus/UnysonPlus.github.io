---
sidebar_position: 0.7
title: "Audit: what to fix, page by page"
sidebar_label: "Audit"
description: "The Unyson+ SEO audit checks every published page and lists the specific pages behind each problem: duplicate titles and descriptions, near-duplicate text, heading structure, missing keyphrases, thin pages. Plus guardrails for pages generated in bulk."
---

# Audit

<img src="/img/seo/seo-audit.png" alt="The Audit report: groups of pages with the same title or description, near-duplicates, and each problem with the number of pages, one group opened to show its pages" width="1644" />

**SEO → Audit** checks every published page and lists **the pages behind each problem**, never a score.
"These eleven pages have no description" is a morning's work with a clear finish line; "73 out of 100"
tells you nothing to do.

## What it reports

| Problem | Why it matters |
| --- | --- |
| **Same title** | Pages with one title compete with each other and look identical in search results. |
| **Same description** | One description over several pages describes none of them. |
| **Near-duplicates** | Pages whose text is 90% or more the same (see below). |
| **No description at all** | Search engines pick a snippet of their own. |
| **No description written** | An automatic one is used: fine as a fallback, but a written one earns more clicks. |
| **Title over 60 characters** / **description over 160** | Likely cut off in results. |
| **Heading structure** | A level skipped, or an H1 in the content. |
| **Focus keyphrase missing** | The page's [focus keyphrase](../content-analysis.md) isn't in its title, description, first paragraph or text. |
| **No focus keyphrase** | Optional; the checks need one to measure against. |
| **Thin** | Fewer words than the thin-page threshold under [Going stale](./going-stale.md). |

Each group opens to the list of pages, each linking to its editor. The audit runs by itself every day,
each page is re-checked when you save it, and **Check again now** runs it on demand. It works in the
background, about a minute for a few hundred pages.

## Pages generated in bulk

Making many pages from one template and a list (a page per town, per service, per product) can cover
searches nobody could write for by hand. It is also the fastest way to get a whole site discounted,
because search engines judge mass-produced thin pages as a whole. Three guardrails help:

- **Near-duplicate detection.** The audit compares the text of every page with every other page of the
  same type and groups the ones that are 90% or more the same, a number "thin" and "old" can't give.
  Give each page something of its own (local details, prices, photos, reviews), or merge them.
  Pages under 50 words are too short to compare; they show as thin instead.
- **Keep thin pages out of search results.** Under **Pages generated in bulk**, tick the content types
  to guard. A page of those types is kept out of search results and out of the sitemap until it has
  more words than the thin-page threshold. Generate a thousand pages, and only the ones with real
  content are offered to search engines; each is let in automatically as soon as it grows.
- **How many Google kept.** With [index coverage](./index-coverage.md) connected, the audit shows how
  many pages of each type Google has indexed, which is the number that says whether the approach is
  working or being ignored.

## Limits

- Near-duplicate comparison is pairwise within a type, up to 1,500 pages per type.
- The checks read what is in the content and the page builder, not text a theme adds around it.
