---
slug: newsletter-crm-storage-model
title: "Where should newsletter subscribers live — a custom post type or custom tables — and how should lists, tags and segments be modelled?"
authors: [jon]
tags: [architecture, extensions, naming]
date: 2026-08-09
description: The [newsletter] element had a working form but nowhere to put a signup. Building the storage layer meant settling the shape it would still have once campaigns, automations and ESP sync arrive. Decision — five custom tables via dbDelta, with lists AND tags in ONE table discriminated by a type column, membership in ONE polymorphic pivot, and a segment stored as a saved query rather than denormalised membership. Rejected — a custom post type, a tags column on the subscriber row, and numbered list columns.
---

**The question:** The `[newsletter]` element already renders a form, validates a signup and emails
the site admin — but nothing stores it. Building that storage layer means choosing a shape now that
still works when campaigns, automations, contact timelines and Mailchimp/MailerLite/Brevo sync
arrive. So: **custom post type or custom tables?** And once that is settled, **how are lists, tags
and segments modelled** — because that is the decision that is expensive to reverse.

<!-- truncate -->

## Context

UnysonPlus had no custom-table extension at all, so whatever this one did would become the house
convention for the next one. That raised the stakes on getting it right rather than getting it
quickly.

Four mature WordPress newsletter/CRM plugins were studied first — FluentCRM, MailPoet, The Newsletter
Plugin and Groundhogg. The most useful finding was how unanimous they are: **not one of them stores
subscribers as a custom post type.** The second most useful was watching where they diverge, because
that is where the real choice lives.

## Options considered

### Storage: CPT vs custom tables

- **Custom post type.** Genuinely tempting: a free list table, free meta boxes, free REST, free
  export. But a subscriber is not content — no author, no permalink, no revisions, no editor — so
  every `wp_posts` column is dead weight and every subscriber field becomes a `wp_postmeta` row, i.e.
  a join per field. A 50,000-subscriber list becomes 50,000 `wp_posts` rows plus ~400,000 postmeta
  rows polluting every core query and every backup. The decisive problem is narrower than
  performance though: **`post_title` has no unique index**, so email uniqueness cannot be enforced by
  the database at all, and dedupe degrades into an application-level race.
- **Custom tables.** Costs us the free UI — which we were writing anyway, because a paginated,
  searchable, filterable data grid is not an options form. Buys a database-enforced unique email and
  segment queries that stay one indexed join instead of several `EXISTS` subqueries.

### Lists, tags and segments

- **Numbered list columns** (`list_1 … list_N`), as The Newsletter Plugin does. Caps the number of
  lists, needs an `ALTER TABLE` to add one, and makes "which lists is this person on" unanswerable
  without knowing N. This is the shape to design *away* from.
- **A `tags` text column on the subscriber row** (the obvious first sketch). Unqueryable and
  unjoinable — you cannot ask "everyone tagged VIP" without a `LIKE` scan, and `vip` matches
  `vip-lapsed`.
- **Separate `lists` and `tags` tables plus two pivots.** Correct, but lists and tags are
  structurally identical, so it is two copies of the same code forever.
- **One objects table + one polymorphic pivot** (FluentCRM's shape): lists and tags share a table
  discriminated by `type`, and one pivot (`subscriber_id`, `object_id`, `object_type`) carries
  membership for both.
- **Segments: store membership vs store the query.** MailPoet stores *filter rows*
  (`dynamic_segment_filters`) rather than materialised membership. Denormalised membership goes stale
  the instant anything changes.

## Decision

**Five custom tables** created by `dbDelta` behind a schema-version option:
`fw_crm_subscribers`, `fw_crm_lists`, `fw_crm_subscriber_pivot`, `fw_crm_subscriber_meta`,
`fw_crm_segments`.

- Lists **and** tags live in `fw_crm_lists`, discriminated by a `type` column, with membership for
  both in the single polymorphic `fw_crm_subscriber_pivot`.
- The subscriber row gets **neither** a `tags` column **nor** a `list_id` column — both were in the
  original sketch and both were dropped in favour of the pivot.
- A **segment stores its filter JSON**, in the same argument shape the repository's `query()` already
  takes, so saved segments and the admin screen's ad-hoc filtering are literally one code path.
- `status` is `varchar`, not `ENUM`, so adding `bounced` / `complained` later is a PHP whitelist
  change rather than a schema migration.
- Custom fields go in `fw_crm_subscriber_meta`, so adding one is never an `ALTER TABLE`.

## Why

The unique index is the crux. Dedupe by email is the single most important correctness property a
subscriber store has, and only a custom table can hand that job to the database, where it is atomic
and free. Everything a CPT would have given us was UI we were building anyway.

One table for lists and tags is the choice that will look smartest in a year. They differ only in how
a user *thinks* about them — a list is something you join, a tag is something we attach — and not at
all in structure. One table and one pivot means one set of queries, one set of repository methods,
one counts implementation, and any future object type (companies, say) joins the same pivot without a
schema change.

Storing the segment query rather than its results follows from the same instinct: keep exactly one
source of truth and derive the rest. Membership tables drift; a saved query cannot.

The rejected shapes are all the same mistake in different clothing — encoding a *many-to-many* as
something narrower (columns, a delimited string) because it is easier to write today. The Newsletter
Plugin's `list_N` columns are what that looks like after a decade of shipping.

One more rule fell out of the research and is worth recording beside the schema: **unsubscribing must
never delete the row.** A forgotten address is silently re-subscribed by the next CSV import, which
is a legal problem rather than a bug. The opt-out *is* the data, so the GDPR eraser anonymises the
row in place and keeps it as unsubscribed instead of removing it.
