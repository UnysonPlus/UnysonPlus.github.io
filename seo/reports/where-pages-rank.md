---
sidebar_position: 6
title: "Where your pages rank"
sidebar_label: "Where pages rank"
description: "The searches each page already appears for in Google, at what position and whether it moved — plus the searches sitting just below page one, where a small improvement pays. Read from your own Search Console data."
---

# Where your pages rank

Search Console already knows the average position each page appeared at for every search that
showed it. This puts that to work in two places: a list of the searches **almost on page one**, and,
in the editor, **every search the page you are editing appears for**.

It runs on the [Search Console](./search-console.md) connection — nothing further to set up.

---

## Almost on page one

<img src="/img/seo/seo-rank-near-page-one.png" alt="The Almost on page one report: searches at positions 8 to 15 with the page, position, impressions and clicks" width="1644" />

Searches where a page sits at **positions 8 to 15**, most-seen first. That band is where effort
pays: close enough to the first page that a modest improvement moves it there, far enough down
that almost nobody scrolls to it. A page at position 40 needs a different page; a page at 11 often
needs a better title, a section that answers the search directly, or a link from a related page.

Only searches with at least **30 impressions** over the last four weeks are listed. Below that an
average position is a handful of people on one day, and rewriting a page because of it is acting
on noise.

Each page links straight to its editor.

## In the editor

<img src="/img/seo/seo-rank-editor.png" alt="A collapsed panel above the SEO fields reading Appears in Google for 4 searches, open to show each search with position, change, impressions and clicks" width="1358" />

Above the SEO panel, a collapsed line — *Appears in Google for 4 searches* — opens to the searches
this page already shows up for, with the most-seen first. It is collapsed because it is useful when
you are rewriting the title and in the way the rest of the time.

The **Change** column compares the last four weeks with the four before:

| Shows | Means |
| --- | --- |
| ↑ 2.9 | Moved up almost three places — a smaller position number is better. |
| ↓ 1.1 | Slipped about one place. |
| – | Moved less than half a place, which is noise. |
| new | The page did not appear for this search in the previous four weeks. |

It only appears on published pages, once Search Console is connected and has something to report
for the page.

---

## What this is not

**It is not a rank tracker.** The position is Google's **average across everyone who saw the
result** — different places, devices and personal histories. Treat it as a trend. Your position on
one screen, in one city, can be several places away from it.

**It cannot show a search you have never appeared for.** No impressions means no row. Tools that
report a position for any keyword do it by querying Google from many locations on a schedule, which
is a paid scraping service — not something your own Search Console data can provide.

**It is about four weeks old at its newest edge.** Search Console data lags by about three days, and
the windows are four weeks long so a single quiet day does not read as a collapse. Results are
cached for six hours.
