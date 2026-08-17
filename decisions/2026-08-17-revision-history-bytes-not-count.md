---
slug: revision-history-bytes-not-count
title: "Revision history was capped at 20 per page. Why did that turn into 150 MB?"
authors: [jon]
tags: [live-editor, performance, storage-model]
date: 2026-08-17
description: A count-based cap on Live Editor revisions let one site accumulate 150.6 MB of postmeta, and made a single unrelated get_post_meta() call pull 42 MB into memory. Decision — cap by bytes as well as count, compress the payload, and let a revision floor deliberately beat the budget. Includes why the count cap was not obviously wrong, and why compression turned out to matter more than pruning.
---

**The question:** Live Editor kept at most 20 revisions per page, which sounds like a
bounded feature. One site was holding **150.6 MB** of revision postmeta. Where did the
bound go?

<!-- truncate -->

## Context

Each revision stores the *full* page-builder model as JSON in its own postmeta row. On a
rich page that is around 1 MB. So "20 revisions" is really "up to 20 MB per page", and
the cap was counting the wrong unit.

That alone would be a storage complaint. What made it urgent is how WordPress caches post
meta: **per post, not per key.** The first `get_post_meta()` call for *any* key loads
every row that post owns into the object cache. Measured on the worst page:

```
get_post_meta( 3603, '_wp_page_template' )   →  42 MB into memory
```

11.5 MB of stored rows expanding to roughly 42 MB of live PHP structures, triggered by an
innocuous template lookup — on any request that touched that post at all. This turned out
to be the root cause of a memory exhaustion we had chased weeks earlier and attributed to
`after_setup_theme`, which was merely where the spike surfaced.

## Options considered

**Lower the count.** Twenty to five. Simple, and wrong in the same way as before: it still
measures the wrong unit. A page with 3 MB revisions keeps 15 MB; a page with tiny ones
loses history it could afford.

**Cap by bytes only.** Correct unit, but a page whose single revision exceeds the budget
would keep no history at all — the feature silently stops working exactly where the pages
are most valuable.

**Cap by bytes, with a floor.** Both caps, plus a minimum number of revisions that wins
over the budget.

**Move revisions out of postmeta.** A custom table removes the meta-cache amplification
entirely and is the architecturally cleaner answer. Much larger change, with a migration.

## Decision

Cap by bytes **and** count, with `REVISIONS_MIN_KEEP = 2` beating the budget — and
compress the payload.

Sizes are recorded in the revision index at write time, because the obvious
implementation of a byte cap is to read each revision to measure it, and *that would
trigger the very meta-cache load the cap exists to prevent*. Legacy entries are backfilled
with a single `LENGTH()` query, so MySQL reports the size without sending the payload.

The custom table was deferred, not rejected. If the budget proves insufficient it is the
next step.

## Why

The floor is the interesting part, because it deliberately breaks the guarantee the cap
appears to make. A page can still exceed 3 MB if two revisions are large. That is
accepted: history that always works is worth more than a budget that always holds, and the
failure mode of "no undo on your most complex page" is worse than "this page uses 5 MB".

## The part worth remembering

**Pruning alone barely helped.** Shipping the byte cap first and measuring gave:

| | Before | After pruning | After compression |
| --- | --- | --- | --- |
| Revision postmeta | 150.6 MB | 115.4 MB | **8.68 MB** |
| Worst page | 11.5 MB | 5.19 MB | 245 KB |

Pruning removed 23%. The floor was binding on exactly the pages that mattered, which the
code comment had predicted would need compression — so the prediction was written down
before the measurement proved it, and then nearly ignored.

Compression did the real work: **real builder JSON deflates about 27x**, measured on
actual rows rather than synthetic data. Builder JSON is extremely repetitive — the same
option keys recur for every item — so this is not a general result to expect elsewhere.

Two implementation notes that were nearly bugs:

- `set_transient()`-style thinking does not apply to `update_post_meta`, but the same
  trap appeared in the sibling rate-limiter work: **an expiry of `0` means "never
  expires", not "leave it alone"**. Worth stating because it reads like a no-op.
- The compressed marker (`gz1:`) was chosen to be something a JSON document can never
  begin with. That is what lets the reader accept old uncompressed revisions unchanged,
  with no migration flag and no version column.

## Status

Accepted, shipped in live-editor 0.2.57 with core 2.16.20. The measured install went from
150.6 MB to 8.68 MB, and the 42 MB meta-cache load to zero.
