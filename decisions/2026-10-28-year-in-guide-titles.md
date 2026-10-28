---
slug: year-in-guide-titles
title: "Should guide titles carry the year, and should it change automatically every January?"
authors: [jon]
tags: [architecture]
date: 2026-10-28
description: The headless guides put "(2026)" in their search titles. Decision — fill the year from each page's last commit (automatic, and never newer than the content), keep it out of the H1, and show "Updated <month year>" under the heading instead.
---

**The question:** The headless guides' search titles say "(2026)". Can that year update itself, so next year
they say 2027 without anyone editing them? And should the year go in the page's H1 too?

<!-- truncate -->

## Context

A year in a search title helps a fast-moving topic win the click ("is this guide current?"). But it has to
stay true: a "2027 guide" with 2026 screenshots and outdated versions is worse than no year at all, and
search engines discourage making pages look fresher than they are.

## Options considered

- **The calendar year at build time**, plus a rebuild every 1 January. Fully automatic, but every page
  would claim the new year whether or not anyone had checked it.
- **The year of the page's last commit.** Automatic too: editing a guide moves its year on. An untouched
  guide keeps its old year, which is accurate, and doubles as a list of guides due for review.
- **The year in the H1 as well.** The heading describes what the page is; a year there makes the page itself
  look dated and adds nothing a reader needs.

## Decision

Titles use a `{year}` placeholder that the docs build fills from each file's last commit
(`parseFrontMatter` in `docusaurus.config.js`; the deploy fetches the full git history). The H1 stays
timeless, and a line under it shows "Updated <month year>" from the same commit. The January review still
happens, as "check the guide and commit it" rather than "edit the year".

## Why

It is automatic without ever being untrue: the year a title shows is always a year someone actually worked
on the page. Readers get the freshness signal where they look (right under the heading), and search
results get it in the title, both from one source of truth.
