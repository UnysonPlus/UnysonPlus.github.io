---
slug: csv-import-blank-cells-and-id-matching
title: "What should a blank cell in a CSV import mean — and what should an import never do?"
authors: [jon]
tags: [architecture, security]
date: 2026-10-14
description: A spreadsheet import writes across an entire site in one click. We settled three rules — match on post ID only, consider only the columns the file contains, and treat a blank cell in a present column as a deliberate clear — plus a hard boundary that an import touches SEO meta and nothing else.
---

**The question:** The SEO extension exports every page to a CSV so titles and descriptions can be
written in a spreadsheet. On the way back in, what does an **empty cell** mean — "leave this alone"
or "clear it"? And should an import be able to remove a post whose ID isn't in the file?

<!-- truncate -->

## Context

The extension already stores per-page SEO values as discrete post meta, which is what makes a
spreadsheet round trip possible at all. The export is harmless. The import is not: it is a single
click that writes across every row in the file, and the person clicking it has usually just been
editing in Excel, where it is easy to sort rows, delete a column, or paste into the wrong place.

The second question answers itself — an import must never delete a post — but the first is genuinely
ambiguous, and both readings are defensible.

## Options considered

**A blank cell means "no change."** Safe against a partially filled sheet. But it makes clearing a
value impossible through the file, which is a real need: the whole point of reviewing three hundred
descriptions is sometimes deciding a page is better off on its template.

**A blank cell means "clear this override."** Consistent with every other surface in the extension,
where an empty field means *follow the template* and clearing deletes the stored row rather than
saving an empty one. But on a hand-built sheet containing only `ID` and `SEO title`, a naive
implementation would read every other column as blank and wipe the site's descriptions.

## Decision

A blank cell **clears** the override — with two conditions that make it safe.

**Only the columns present in the file are considered.** A sheet with `ID` and `Meta description`
edits descriptions and does not touch anything else. The absent columns are not "blank"; they are
absent, which is a different thing.

**The export writes the current override into the editable cell.** So exporting and re-importing
unchanged is a no-op: a cell that was empty on the way out is empty on the way back, and the value
was empty before and after. Emptying a cell that had content in it is therefore a deliberate act.

Clears are counted and reported **separately** in the preview — *"7 values would be cleared,
putting those pages back on their template"* — so the destructive half is never folded into a
general "42 changes" number.

Alongside that, three boundaries an import does not cross:

- **Rows match on post ID and nothing else.** Titles repeat and slugs change; matching on either
  would eventually write one page's description onto a different page, and that failure is silent.
- **It writes SEO fields only** — never creates a post, never deletes one, never touches content,
  title, status, dates or terms. A CSV is a list of edits to meta, not a description of what the
  site should contain.
- **A post whose ID is absent is not visited.** Absence means "nothing to say about this one", never
  "remove it". A row for a post that is not on the site is reported and ignored.

Nothing is written until a preview has been shown and confirmed.

## Why

The deciding argument is that the *consistent* reading and the *safe* reading only conflict when the
file is partial — and "consider only the columns present" removes that conflict entirely, rather
than trading one away. After that, blank-means-clear is both the consistent choice and a safe one.

The ID rule is worth stating as a rule rather than an implementation detail because the tempting
alternative — fall back to matching on slug when an ID is missing — fails in exactly the case
nobody tests: two posts that legitimately share a title, on a site large enough that no one reads
every row of the result.

One security note that belongs with this decision: values beginning `=`, `+`, `-` or `@` are
escaped on export and unescaped on import. Those characters make a cell a formula in every major
spreadsheet, so an exported meta description starting with a dash would otherwise be able to run
code on the machine of whoever opened the file. An export is precisely the file someone opens
without thinking.
