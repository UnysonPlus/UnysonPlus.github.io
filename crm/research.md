---
sidebar_position: 3
title: Research
description: What other CRMs, WordPress CRM plugins and membership plugins do, how they stay reliable on ordinary hosting, and what that means for the Unyson+ CRM and Membership extensions.
---

# Research

Before the CRM's first line of code, we studied how comparable products are built, so the data model is
right from the start and the [roadmap](./roadmap.mdx) isn't missing anything people rely on. This page is
the summary: what they have, how they cope with ordinary hosting, what our plan lacks, and the lessons
worth taking.

:::note What was studied (October 2026)
- **An email-automation and sales CRM** (hosted): email designer and templates, visual automations,
  deals and pipelines, scoring, site tracking.
- **A cloud CRM with cases, calls and invoices** (hosted): contacts, companies, deals, cases, calls,
  calendar and booking pages, documents, products, invoices, campaigns, SMS, rule-based automations, AI.
- **A WordPress membership plugin built on a hosted CRM**: access rules driven by CRM tags, one-click login
  links, a course system (LMS), payments, utilities.
- **Five WordPress CRM and newsletter plugins** that keep their data inside WordPress, the closest
  comparison to what we are building.
- **Three large hosted CRMs**, only for how they structure records, pipelines, timelines and permissions.

Products are described rather than named on this site. About 110 pages of public documentation were read;
where a source was blocked or silent, the finding is marked as inferred.
:::

## What this research settles

These are the choices that are expensive to change later, so they go into phase 1:

1. **Custom tables from the first release.** Every serious WordPress CRM stores its data in its own tables.
   One had to move off posts and post meta in a major version; for 100,000 contacts it took over half an
   hour, changed record IDs and switched off incompatible add-ons. We start where they ended up.
2. **The busiest values are real columns on the contact**: owner, company, lifecycle stage, source,
   timezone, score total, lifetime value and last activity. Custom field values live in their own table.
   Segments then stay simple, fast queries.
3. **Subscription status is not the lifecycle stage.** Whether someone may be emailed (pending, subscribed,
   unsubscribed, bounced, complained) is tracked **per list**, with timestamps, separately from where they
   are in the customer journey (subscriber, lead, customer).
4. **One relations table** with labelled, two-way links between any two records. Companies, deals, future
   cases and the Membership extension's memberships attach through it without changing the schema.
5. **Field types beyond text**: a lookup (link to another record), auto-number, address and calculated
   fields, so custom objects can follow later without a redesign.
6. **Nothing is lost by accident**: a bin with restore for deleted records, imports that can be rolled back
   as a batch, and saved column mappings.
7. **A consent log**: what each person agreed to, the wording they saw, when and where.
8. **One filter engine** behind list views, segments, campaign audiences, automation conditions and, later,
   Membership's access rules, so there is one rule language everywhere.
9. **One permission layer** every query passes through. Two plugins had bugs where a sales rep could see
   another rep's contacts, or create a WordPress user with more rights than they had.

## How they stay reliable on ordinary hosting

### Scheduling

WordPress runs its scheduled jobs only when someone visits the site, and every product we studied names this
as its number-one support problem. They all:

- recommend turning off the visit-based trigger and adding a **real server cron job**, every minute where the
  host allows it (cPanel and similar control panels can);
- ship a **status page**. The best one shows:
  - whether the scheduler's address can be reached;
  - when the last run **started** and when it **completed** (started but never completed means a crash or a
    time-out);
  - the last error;
  - queue counts by status;
  - data-integrity checks (orphaned tasks or queue rows) with a **Fix** button.

The CRM's scheduler check copies that design, and shows a warning when the last completed run is too old.

### Sending

- **Expect modest speeds on shared hosting**: single digits to low teens of emails per second. One sender
  manages about three a second over SMTP. Sending through an email service's API is several times faster
  than SMTP, because there is no handshake per email.
- **One queue row per recipient**, and each email is **claimed atomically** before it is sent, so two workers
  can never send the same email twice.
- **A speed cap**: emails per second, or "N emails per M minutes" presets per kind of host.
- **A per-campaign speed limit**, because a big send can flood your own site with opens and clicks. One
  plugin's users saw their server return errors for an hour after a 50,000-an-hour send.
- **Housekeeping**: purge stored email bodies after sending and keep the statistics.

### Background work

The common tool is a queue library that processes small batches (25 jobs, at most 30 seconds, one batch at a
time by default) and keeps going through short follow-up requests. Raising the concurrency can take a shared
site down. On a VPS the scaling path is the command line, so the CRM gets WP-CLI commands for sending and
automations.

### Large lists

- Index the activity log by (contact, time) and (type, time).
- Store tracked links once in a short-URL table, not per email.
- Plan for growth: mid-size lists reach several gigabytes within a year or two, so retention settings
  (purge raw opens and email bodies, keep totals) are part of the first email release.
- Imports and exports run in batches with a progress bar.

## What others have, and where it fits

✓ in the plan · ◐ partly · ✗ not yet

| Area | Common in the products studied | Our plan |
| --- | --- | --- |
| Contacts, companies, custom fields | Everywhere | ✓ Phase 1 |
| Tags and lists with a per-list status | Most | ◐ Phase 1, status per list to add |
| AND / OR segments | Most | ✓ Phase 1 |
| Relations between records, custom objects | The larger CRMs | ✗, relations table to add in Phase 1 |
| Merge duplicates, bin and restore, import rollback | Some | ✗, to add in Phase 1 |
| Deals, pipelines, board | The sales CRMs | ✓ Phase 2 |
| Weighted forecast, lost reasons, stalled-deal alerts | The sales CRMs | ◐ forecast in Phase 2, the rest to add |
| Calls and meetings logged, calendar view | Several | ✗, to add in Phase 2 |
| Files on records | Several | ✗, to add in Phase 2 |
| Products and line items on deals | Several | ✗, optional in Phase 2 |
| Inbound email on the timeline | Several | ✗, to add with one-to-one email |
| Cases / support tickets | Two | ✗, proposed as a light record type after deals |
| Booking pages | Two | ✗, better as its own extension |
| Quotes and invoices | Two | ✗, better as its own extension; WooCommerce for payments |
| Campaigns, templates, double opt-in | Everywhere | ✓ Phase 3 (largely built) |
| SMS and messaging channels | Several | ✗, channel design in Phase 3, channels later |
| Visual automations with goals | The automation tools | ✓ Phase 4 |
| Automation run log and per-contact state | Most | ✗, to add in Phase 4 |
| Lead scoring | A few | ✓ Phase 5, several named scores to add |
| Site and custom event tracking | A few | ✓ Phase 5 |
| Dashboard widgets | Everywhere | ✗, widget registry to add |
| REST API, hooks, AI tools | Most; two already offer AI tools | ✓ Phases 1, 6 and 7 |
| A scheduler status page | Two | ✓ Phase 4 |

## Proposed changes to the roadmap

These are proposals; the [roadmap](./roadmap.mdx) changes once they are approved. Sizes: S is days, M one
to two weeks, L several weeks.

| Proposal | Where | Size |
| --- | --- | --- |
| Per-list subscription status with timestamps | Phase 1 | S |
| Relations table (labelled, two-way) | Phase 1 | M |
| Lookup, auto-number, address and calculated field types | Phase 1 | M |
| Busiest values as real contact columns | Phase 1 | S |
| Bin and restore; import rollback with saved mappings | Phase 1 | S |
| Merge duplicates | Phase 1 | M |
| Consent log | Phase 1 | S |
| Audit log of admin changes | Phase 1 | S |
| Form protection (rate limit, captcha, allowed origins) | Phase 1 | S |
| Calls and meetings as activities, with a calendar view | Phase 2 | M |
| Files on records | Phase 2 | S |
| Lost reasons, stage probability overrides, stalled-deal alerts | Phase 2 | S |
| Inbound email (BCC or mailbox) on the timeline | Phase 2 | M |
| Optional products and line items on deals | Phase 2 | M |
| Basic dashboard (tasks due, deals by stage, recent activity, list growth, queue health) | Phase 2 | M |
| **Cases**: a light support-ticket record that reuses the pipeline engine | New phase 2b | M |
| Atomic claims, speed caps, per-campaign limits, body purge, short-URL table | Phase 3 | M |
| Sender profiles; transactional versus marketing email | Phase 3 | S |
| Smart links (tag on click); recurring digests of new posts | Phase 3 | S |
| Filter out link-scanner clicks | Phase 3 | S |
| A message-channel design so SMS can plug in later | Phase 3 | S |
| Run log, per-contact automation state, loop guard, once-per-contact limits | Phase 4 | M |
| Safe edits to live automations; a test run for one contact | Phase 4 | M |
| "Changed to / changed from" conditions; date and birthday triggers; random split; round-robin owner | Phase 4 | S |
| WP-CLI commands for sending and automations | Phase 3 / 4 | S |
| Several named scores; a generic events table | Phase 5 | M |
| Dashboard widget registry; custom objects API | Phase 6 | M / L |
| Per-provider purchase summaries (WooCommerce, Membership) | Phase 6 | S |

**Not in the CRM:** booking pages, quotes and invoices would each be their own extension that writes into
the CRM through its API. Telephony and e-signatures get integration hooks only.

## For the Membership extension

What the membership plugin we studied does, and what ours should plan for:

- **Levels that map to CRM tags**, in priority order, with a failed-payment state. Memberships are real
  records that are *mirrored* to tags. Tags alone drift: unenrolling or resetting a course left the tags
  behind in the plugin we studied.
- **Access rules** per page, post, post type and term, using the CRM's filter engine (levels, tags any /
  all / none, field values, list status, login state, role, purchases, course progress).
- **Visibility modes and one clear fallback when access is denied**: a teaser excerpt, then a redirect,
  then a "not found" page. The order is shown in the interface, because overlapping redirect rules were the
  most confusing part of what we studied.
- **Visibility on every page-builder element**, and menus per level.
- **One-click login links in emails that are signed, expire and work once.** The plugin we studied used a
  shared code with no documented expiry, so anyone holding a link could log in.
- **Account security**: one session at a time, lockout after failed logins, logout when idle.
- **A course system**: courses with ordered lessons, quiz gates, progress stored per lesson, plus drip
  release and certificates (which the plugin we studied lacks).
- **Payments through WooCommerce**, with upgrades, downgrades and pausing, rather than a limited payment
  module of its own.
- **A client area** where a member sees their files, orders and course progress.

## Lessons

1. **Ship the scheduler status page on day one.** Cron is every vendor's number-one support problem.
2. **Don't promise speed on shared hosting.** Recommend an email service, and offer presets per host.
3. **Get the schema right before version 1**, so no migration ever changes record IDs.
4. **Plan for data growth** with retention settings and the right indexes from the first email release.
5. **Keep the tracking endpoint light**, and let each campaign cap its speed.
6. **Check memory and time headroom in every background job and log the last error.** Low PHP memory can
   otherwise stop sending without a trace.
7. **Protect automations**: loop guards, once-per-contact limits, staged edits and test runs. People
   complain loudest when an edit breaks contacts already in a flow.
8. **One permission layer for every query**, and capability checks before creating or linking WordPress
   users.
9. **Fewer, bigger modules** beat dozens of add-ons, which confused users of two plugins.
10. **Settle hook names and argument order once**, and return real HTTP error codes from the REST API.
11. **Rate-limit** confirmation resends and form posts.
12. **Be honest about what is free.** Reviewers called out a "free" CRM whose free plan had no email at
    all.
