---
sidebar_position: 4
title: Research
description: What the leading WordPress membership plugins and hosted membership platforms do, where they fall short, and what that means for the Unyson+ Membership extension.
---

# Research

Before designing Membership, we studied how the market's membership products are built and sold, so the
data model is right from the start and the [roadmap](./roadmap.mdx) is not missing anything members sites
rely on. This page is the summary.

:::note What was studied (October 2026)
- **Six WordPress membership and access plugins, read at source level**: a roles-and-capabilities manager,
  a rule-based access-level plugin, a classic levels-plus-payment-buttons plugin, a community and profiles
  plugin, a form-builder-turned-membership suite, and a long-running login-and-restriction plugin.
- **About fifteen commercial WordPress membership and course plugins**, from their feature, pricing and
  documentation pages: the all-in-one market leaders, a sales-focused plugin, a value plugin with many
  add-ons, the leading course plugin, store-based memberships, and several lighter access layers.
- **Six hosted membership, community and publishing platforms**, for pricing models, retention features and
  paywalls.
- **Public reviews and support threads** for the complaints people repeat.

Products are described rather than named on this site. Prices and tiers come from vendors' own pages where
they could be read; figures from third-party sources were treated as unconfirmed.
:::

## What this research settles

These are the choices that are expensive to change later, so they go into phase 1:

1. **One access engine for every gate.** The plugins that only filter the page content leak through
   archives, search, feeds, the REST API and menus, and two of them say so in their own FAQ. The best one
   studied hooks every leak point from one class. Ours does the same from the first release.
2. **Rule targets as indexed rows, looked up by context.** The cleverest engine studied does not test every
   rule against the page; the page reports its context (ID, terms, author, post type, template) and one query
   finds the matching rules. Speed stays flat however many rules a site has. Others store serialized lists
   and search them with `LIKE`, which is slow and fragile.
3. **Separate records for separate things**: the plan (what you get), the price (how you pay), the
   membership (a person holding a plan, with a status and a source), the payment, and an append-only event
   log. The plugin that merged plan and access rule needed a "row 1 means the protection list" hack.
4. **WordPress users only.** One plugin keeps its own user table, password and login cookie alongside
   WordPress's, and has to keep them in step. Members are WordPress users.
5. **Plans grant roles and capabilities on the fly, never permanently.** Switching the extension off then
   leaves every role exactly as it was, and an admin can never be locked out by a plan.
6. **A real membership record, mirrored to CRM tags.** A tag-driven plugin we studied drifted when access was
   removed and the tags stayed.
7. **Modules that load no code when off.** The suite with the most features (about 150,000 lines) already
   ships its features as switchable modules; we do the same from day one rather than retrofitting it.
8. **Custom tables built with the house installer rules**: no enum columns, no zero dates, no foreign keys
   to the users table (each breaks on some hosts or on multisite), and numbered migrations.
9. **One rule model.** One suite carries two restriction systems and permanent migration code between them.
   We design one model before the first release.

## What the market sells

Across the products studied, features fall into three groups.

**Everyone has these (table stakes):** unlimited plans; free, one-time and recurring prices; trials;
coupons; upgrades and downgrades; restriction by page, post, post type and category; a teaser with a
message, login form or redirect; menu items by plan; drip by days since joining; an account page with
payments and cancellation; editable lifecycle emails; card payments and PayPal; captcha and login
throttling; a members list and basic revenue figures.

**The leaders compete on these (differentiators):** visibility on single blocks and builder elements;
proration; fixed-date renewals; several plans per person; pause; gifts; group and company seats; protected
downloads; metered paywalls and registration walls; member directories; failed-payment recovery and
cancellation save offers; tax and EU VAT; recurring revenue, churn and lifetime-value reports; a full REST
API and webhooks; importers from other plugins; two-factor login and limits on account sharing; AI tools.

**Niche:** pay what you want and donations; membership cards with QR check-in; restriction by email domain or
IP; multisite networks sold as plans; regional payment gateways; SMS notifications.

## Where they fall short

1. **Feature tiers and renewal shock.** Nearly every commercial plugin sells first-year prices at about half
   of list and renews at list, and holds core features back for its top tier: the REST API, group accounts,
   two-factor login, pay-per-post and even element-level locking. This is the most repeated complaint in
   reviews.
2. **Transaction fees.** Several plugins and platforms take 2 to 10 percent on top of the payment service's
   fee, usually on the entry tier.
3. **Seams between bundled products.** Store memberships plus store subscriptions, or a course plugin plus a
   membership plugin, means two access systems to keep in agreement. A single engine shared by content,
   courses and commerce removes the seam.
4. **Retention is missing or off by default.** Failed-payment retries are off by default in the most common
   store subscription add-on; pause, save offers and cancellation surveys are standard on hosted platforms but
   third-party extras on WordPress.
5. **Dated member areas.** Account pages, directories and pricing tables are rated "basic" in reviews. A
   member area built from page-builder elements that follow the site's design system is a natural edge for
   Unyson+.
6. **Brand churn.** Several plugins were absorbed or renamed in 2025 and 2026, with security fixes promised
   only to a set date. Their users are looking for a stable home, which makes importers worth building.
7. **Lock-in.** One leader reportedly locked its admin screens when a licence lapsed. Members' data and the
   admin must never be held hostage.
8. **Tax is second-class**, often a top-tier add-on or an outside service.
9. **No passkeys anywhere.** No membership plugin studied signs members in with passkeys.
10. **Caching is an afterthought.** Members pages are hard to cache safely; one vendor now sells
    membership-aware caching as a hosting product.

## Trends for 2025–2026

- **AI as an operator.** Leading plugins now expose their operations to AI apps (create a plan, grant
  access, refund, report), with previews and approval for risky actions. WordPress's Abilities API makes
  this a standard path; Unyson+'s AI Assistant already uses it.
- **Community and courses converge with membership**: spaces, forums and cohorts sold as plans.
- **Payments**: wallets everywhere, bank debits, buy-now-pay-later, automatic tax, and "no platform fee" as a
  selling point. Rulings that let apps link out to web checkout make web-first membership checkout more
  valuable.
- **Retention as a feature**: pause and skip, save offers, cancellation surveys, churn-risk signals.
- **Teams and companies**: seat-based plans for businesses.
- **Metered and registration walls** for publishers.
- **Security**: two-factor login and session limits are now routine; passkeys are the open opportunity.

## Ideas worth taking

From the source-level study, the patterns we are adopting, and where they show up in the roadmap:

| Idea | Roadmap |
| --- | --- |
| Context-indexed rule lookup with "except" groups | Phase 1 · Access rules |
| A default per post type plus a protect / open / hide override per post | Phase 1 · Access rules |
| Plan inheritance (a higher plan includes the lower ones) and priority | Phase 1 · Plans and prices |
| Capabilities granted or denied per plan, applied on the fly | Phase 1 · Plans and prices |
| One gate covering archives, search, feeds, REST, comments, attachments and menus | Phase 1 · Leak-proof content gating |
| Block and element visibility through one filter | Phase 1 · Visibility on every element |
| An administrator rescue link; admins always pass | Phase 1 · Access engine |
| Registration that ends in auto-approve, email verification or review, per plan | Phase 2 · Email verification and approval |
| Membership history as an append-only event log | Phase 1 · Status rules and events |
| A price as its own record (plan × gateway × interval) that can be placed anywhere | Phase 1 · Plans and prices; Phase 3 · Checkout |
| Limits on simultaneous logins and a login log | Phase 10 · Account sharing limits; Login and access log |
| Triggers that grant plans (purchase, form, role, CRM tag) | Phase 4 · Automation triggers; Phase 8 · Products that grant plans |
| Abilities for AI apps and WP-CLI commands | Phase 2 · REST API and AI tools; Phase 10 · Command line |

## Lessons

1. **Test the leak points, not the page.** Every gate has a test against archives, search, feeds, REST and
   the page cache before it ships.
2. **No tiers inside the extension.** Modules are switched on, not bought.
3. **Renewals run on the payment service**, so a quiet site never misses one; the scheduler status card
   covers what still runs on WordPress (reminders, drip, expiries).
4. **Recovery on by default.** Failed-payment retries and card-update emails are not opt-in.
5. **Never lock the admin or the data**, whatever happens to a licence or a setting.
6. **Design the member area as elements**, so it looks like the rest of the site.
7. **Get the schema right before version 1**, so no migration ever changes record IDs.
