---
slug: retargeting-replaces-approved-pages
title: "Why retargeting a site to a new source replaces its pages — but only the ones you tick"
authors: [jon]
tags: [site-converter, architecture, conversion, admin-ui]
date: 2026-09-30
description: "Converting a new source into an install that still held a previous source's pages forked silently: `about` was taken, so the fresh page became `about-2` and the live URL kept stale content. The guard behind it was right — one source must not eat another's page — but wrong as a default. The decision: keep the guard, move the choice to the person, and let provenance pick the defaults."
---

**The question:** the converter never seemed to overwrite pages like `/about/` — they kept content from
an earlier conversion. Should it force an overwrite, with a notice so the user can opt a page out?

<!-- truncate -->

## Context

The reported symptom was "it never overwrites". The database said something worse: it *forked*.

```
 92  home    ← _upw_source_url = https://previous.example/
 94  about   ← _upw_source_url = https://previous.example/about
399  home-2  ← _upw_source_url = https://new.example/
401  about-2 ← _upw_source_url = https://new.example/about
```

Pages that collided got a `-2` slug; pages with no collision (`faq`, `services`) got their natural
ones, which is why only *some* pages looked stale. The live `/about/` served the old conversion while
the new one sat at `/about-2/`, which nothing linked to — and every reconvert added another duplicate.

The cause was not an oversight. The importer deliberately refuses to let a page recorded against one
source be overwritten by a different source, and forks instead. As a safety rule that is correct: two
unrelated sources sharing a slug must not silently consume each other. As a *default* it is wrong in
the one case that matters most — retargeting an install to a new source, where replacing is the entire
intent.

## Options considered

**Always overwrite on slug match.** Simple, and what the report literally asked for. Rejected: it
cannot tell a page from a previous conversion (ours to replace) from a page the user wrote themselves
(theirs), and would quietly destroy the second. The converter writes to installs that also hold
hand-made pages; a rule that cannot see the difference will eventually eat one.

**Keep forking, add a cleanup step afterwards.** Leaves the live URL wrong until someone notices, and
the duplicates keep accruing in the meantime. It treats the symptom.

**Keep the guard; make it something the person can lift, per page.** The importer still refuses to
cross a source boundary on its own. The review step lists the collisions, and only the slugs ticked
there may replace.

## Decision

**The third.** `plan_collisions()` reports, for every incoming page that would land on an existing one,
*whose* that page is:

- `converter` — a previous conversion's page (its source is recorded). Ours to replace, ticked by default.
- `user` — no source recorded, so nobody converted it. Theirs. **Unticked** by default.
- `same` — this very source's page. An ordinary idempotent update; not shown, because nothing is at risk.

plus `edited`, true when the page's builder tree no longer matches the fingerprint stamped when the
converter last wrote it. An edited page is unticked whatever its provenance.

Only slugs handed back through `set_replace_approved()` may cross a source boundary. Everything else
keeps the old forking behaviour, unchanged.

## Why

The useful distinction was never "overwrite or not" — it was **whose page is this**. That question has
an answer already stored on the post (`_upw_source_url`), and it maps cleanly onto a default: replace
what we made, keep what they made, and ask about anything ambiguous.

Defaulting the user's own pages to *unticked* is the part worth insisting on. A confirmation list is
only a safeguard if the defaults are already the safe answer; a list that arrives fully ticked is a
formality people click through, and the one page it quietly destroys is the one nobody converted.

The fingerprint closes the same gap from the other side. Without it, "ours to replace" is a claim about
who created a page, not about whether anyone has since worked on it — and a page converted last month
and hand-edited since is, in every sense that matters, theirs now. This mirrors what the marketing and
demo importers already do, so the whole codebase now answers "may I overwrite this?" the same way.

One limit, stated plainly: pages converted *before* the fingerprint existed carry no stamp, so
divergence cannot be detected for them and they will report as unedited. Only pages written from here
on are protected that way.
