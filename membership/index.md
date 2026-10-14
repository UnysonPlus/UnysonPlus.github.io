---
sidebar_position: 1
slug: /
title: "Membership — members-only content, plans and payments for WordPress"
sidebar_label: "Membership"
description: "The planned Unyson+ Membership extension: plans, one access engine for every page, element and menu, a member area designed in the page builder, your own payment accounts with no transaction fee, and a full connection to the Unyson+ CRM."
---

# Membership

:::info In progress
Phase 1 is built: the Membership app, plans, members, and access rules with the one access engine behind
them, so holding a plan now opens content. It arrives with the next release. Accounts and registration come
next, then payments. The [roadmap](./roadmap.mdx) tracks each task against the code. The design comes from a
study of the leading membership plugins and platforms, summarised under [Research](./research.md).
:::

## Finding your way around

Open **Unyson+ → Membership** and it takes over the screen like an app of its own, the same way the
[CRM](/crm) does:

- **The Membership sidebar** lists every area: Home, Members, Plans and Access rules; Payments and Coupons;
  Reports; Emails, Modules and Settings. Areas still being built are marked **Soon**, and their page says
  what they will do.
- **The WordPress menu folds to its icons** while you are in Membership. **Hide the WordPress menu** at the
  bottom of the sidebar removes it altogether (your choice is remembered), and **Back to WordPress** takes
  you to the dashboard. With the CRM on, **Open the CRM** is there too.
- **The top bar** searches members by name or email (press <kbd>/</kbd> to jump to it) and has a **New**
  menu for a member or a plan.
- **Home** shows members with access, active, cancelled and ended memberships, members by plan, recent
  changes and who is ending in the next two weeks. A fresh install shows the first three steps instead.
- **A plan's page** holds its name, prices (several per plan, such as monthly and yearly), how long it
  lasts (until cancelled, a set time, or until a date), what other plan it includes, its priority and a
  member limit. A plan with members is archived rather than deleted.
- **A member's page** shows each membership with its status, dates and source, with **Extend**, **Change
  plan**, **Cancel at end date**, **End now** and **Reactivate**, a form to add another plan, and the
  history of every change and who made it.
- **Access rules** each say what is protected (the entire site, all items of a type, a single page or post,
  the pages under a page, a category or tag, a post type archive, or addresses such as `/members/*`, with
  "Except" lines for exceptions), who may see it (plans, roles, or anyone logged in) and what everyone else
  sees: a teaser and a prompt to log in or join, a trip to the login page, another page, or "page not found".
  Every rule that covers a page must be passed.
- **Modules** lists every switchable module with the phase it arrives in.

## Protecting content

- **A rule** under Membership → Access rules protects many things at once.
- **One item**: the **Membership** box in the editor sets a page or post to *Members only* (any plan or chosen
  plans), *Open to everyone* whatever the rules say, or *Follow the access rules*, and lists the rules that
  cover it now.
- **Part of a page**: every page-builder element, section and column has a **Membership** field in its
  Advanced tab (members, people without a plan, members of chosen plans, everyone except them, logged in or
  out). The **Paywall Prompt** element is the "this is for members" box to place yourself, usually shown only
  to people without a plan.
- **Menus**: each menu item has the same **Show to** choice; a hidden item takes its sub-items with it.
- **Check it**: on the site, **View as** in the admin bar previews any page as a logged-out visitor, a
  logged-in user without a plan, or a member of any plan. Administrators otherwise see everything.

Protection holds wherever the content could surface: archives, search, RSS feeds, the REST API, comments,
the XML sitemap, attachments, and the description and social tags the SEO extension writes. Protected pages
are sent with no-cache headers so a page cache never shows one person's view to another. A plan can also give
a WordPress role while it lasts, applied on the fly; roles that can manage the site are never offered.

Membership turns a Unyson+ site into a members site: free and paid plans, content that opens only to the
right people, a member area designed in the page builder like any other page, and payments taken with your
own payment accounts. With the [CRM](/crm) switched on, every member is also a contact, and access can
follow the CRM's tags, lists and segments ([how they connect](./crm.md)).

## The idea in one paragraph

Most membership plugins are a pile of separate features that each check access in their own way, and
the gaps between them are where content leaks and settings conflict. Membership is built the other way
round: **one access engine** answers "may this person see this?" and everything else asks it, whether
that is a page, an archive, a search result, the REST API, a page-builder element, a menu item, a file
or a course lesson. Plans, payments, drip, groups and courses are modules on top of that one engine, and
any module you don't need is switched off and loads no code.

## What every site gets (the core)

These are always on when the extension is active. They are what a membership site cannot do without,
and none of them is held back for a higher tier.

| Area | What it does |
| --- | --- |
| **Plans** | Unlimited plans, each with any number of prices (free, one-time, monthly, yearly, custom interval, fixed-date renewal, lifetime), trials, setup fees, expiry, sign-up limits, a priority when someone holds several, and inheritance (a higher plan includes what lower ones unlock) |
| **Membership records** | A real record per person and plan, with a status (trialing, active, past due, paused, cancelled, expired), dates, the source that granted it and a full history; several plans per person |
| **Access rules** | **What** is protected (the entire site, post types, single items, categories and tags, archives, child pages, URL patterns), **who** may see it (plans any / all / none, logged-in state, roles) and **when** (now, after N days, from a date). A default per post type, with a protect / open / hide override on any single post |
| **Leak-proof gating** | Protection applies to archives, search, feeds, the REST API, comments, sitemaps and attachments, not only the single page |
| **What non-members see** | One clear fallback per rule: a teaser with an upgrade prompt, a login form, the pricing table, a redirect or "not found"; a **Paywall prompt** element to design the upgrade box |
| **Element and menu visibility** | Every page-builder element, section and column gets **Members** fields under Advanced → Display conditions; Gutenberg blocks and menu items get the same choices |
| **Accounts** | Registration through the Forms extension (a **Register member** action, plus username and password fields), login, logout, password reset, optional email verification and approval |
| **Member area** | **Member login**, **Member account** and **Paywall prompt** elements, styled by your theme: profile, memberships, payments, invoices, payment method and security in one place |
| **Member emails** | Every lifecycle email (welcome, receipt, reminder, payment failed, cancelled, expired) editable with placeholders, sent through `wp_mail()` so your mail settings apply |
| **Membership app in wp-admin** | Home, Members, Plans, Access rules, Payments, Reports, Emails, Modules and Settings; grant, extend, change or revoke by hand; a "view as member of…" preview |
| **Safe by default** | Admins always have access, a rescue link restores a locked-out admin, protected pages are never served from a page cache to the wrong person, and switching the extension off changes no roles |
| **Privacy and developers** | Personal-data export and erasure, documented events for every status change, a PHP API (`fw_membership()`), REST endpoints and AI Assistant tools |

## What you switch on when you need it (modules)

Every module is one switch on the **Modules** screen. A module that is off loads no code and adds no
menus, so a simple members area stays as light as a simple members area should be.

| Module | Switch it on for |
| --- | --- |
| **Payments** | Selling plans with your own payment accounts: cards and wallets, PayPal, bank transfer; subscriptions billed by the payment service; a one-page checkout and a pricing table element; upgrades and downgrades with proration; receipts and invoices. No transaction fee from Unyson+ |
| **Coupons** | Percentage or fixed discounts, first payment or forever, with limits, expiry and bulk codes |
| **Tax** | Rates by country and region, EU VAT with number validation and reverse charge, or automatic tax by the payment service |
| **CRM** | Turns on by itself when the CRM is active: members become contacts, plans mirror to tags, access rules use CRM conditions, membership events drive automations ([details](./crm.md)) |
| **Drip** | Content that opens N days after joining, on a date, or in sequence, with an email when it opens |
| **Metered paywall** | A few free articles per period, then a free registration wall or a subscription |
| **Protected downloads** | Files served only through an access check, with limits and a log |
| **Pay per item** | Selling one post, page or file without a plan |
| **Retention** | Failed-payment recovery with retries and card-update links, pause instead of cancel, a cancellation survey with a save offer, reminders and win-back coupons |
| **Gifts** | Buy a plan for someone else, redeemed by code or link |
| **Groups** | Team and company plans: one buyer, N seats, invitations by email, link or domain, and a team page |
| **Directory** | A searchable member directory and public profiles, with privacy per field |
| **Membership cards** | Printable or digital cards with a QR code for check-in |
| **WooCommerce** | Products that grant plans, member prices and free shipping, members-only products, store subscriptions as the billing source |
| **Reports** | Monthly recurring revenue, churn, lifetime value, trial conversion, recovered payments, cohorts |
| **Account security** | Limits on simultaneous sessions, one-click login links that are signed and single-use, passkeys, and a login and access log |
| **Importers** | Members, plans and live subscriptions from CSV or from other membership plugins, keeping renewals running |
| **Courses** | Courses with lessons, progress, quizzes and certificates on the same access engine |

## How it fits with the rest of Unyson+

- **CRM.** Optional but made for each other: one person, one contact; plans mirrored to tags; CRM
  conditions in access rules; membership events on the timeline and in automations. See
  [Membership and the CRM](./crm.md).
- **Forms.** Registration is a Forms action, so a sign-up form is built, styled and extended like any
  other form, and can also run the CRM's action in the same submission.
- **Page builder.** The member area, pricing tables, checkout and paywall prompts are elements, and every
  existing element gains members-only visibility.
- **Theme Builder.** Access rules use the same "where" vocabulary as Theme Builder templates, so one way
  of picking pages runs through the whole product.
- **Security.** Login throttling and two-factor login come from the Security extension; Membership adds
  session limits and passkeys on top.
- **WooCommerce.** An optional module, for stores that want products to grant plans; Membership's own
  checkout does not need it.

## Design decisions

- **One access engine, everywhere.** Every gate asks the same resolver, so a rule means the same thing on
  a page, in a search result, in the REST API and on an element.
- **Core plus switchable modules, no feature tiers.** The things a membership site needs are in the core;
  everything else is a module you switch on, not a higher plan you buy.
- **Your payment accounts, no transaction fee.** Subscriptions are billed by the payment service itself, so
  renewals do not depend on WordPress's visit-driven scheduler.
- **WordPress users, not a parallel login system.** Members are WordPress users; plans grant roles and
  capabilities on the fly and never rewrite roles permanently.
- **Real tables from the first release.** Plans, memberships, rules and payments live in indexed tables
  with numbered migrations, so the data model never has to be moved later.
- **Membership is its own extension.** Many membership sites need no CRM, so Membership works alone and
  connects to the CRM through its public API when both are on.
