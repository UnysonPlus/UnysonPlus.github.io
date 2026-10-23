---
sidebar_position: 1
slug: /
title: "CRM — a self-hosted CRM for WordPress"
sidebar_label: "CRM"
keywords: [wordpress crm, self-hosted crm, crm plugin for wordpress, free wordpress crm, sales pipeline wordpress, contact management wordpress, small business crm, gdpr crm, crm with email marketing]
description: "A self-hosted CRM for WordPress: contacts, companies, a sales pipeline, tasks, email and reports in your own database, with no per-contact fees."
---

# CRM

:::info Phases 1 and 2 are built
Contacts and companies (Phase 1) and the sales pipeline (Phase 2) are complete and arrive with the next
release. Email marketing, automations and scoring follow; the [roadmap](./roadmap.mdx) tracks each phase
against the code as it lands.
:::

The CRM is a complete customer system inside your WordPress site: the people and companies you work
with, the deals you are chasing, the emails you send them, and the automations that follow up for you.
Your data stays in your own database, with no per-contact fees and no outside service to sign up to.

It grows out of the **Newsletter / Subscriber CRM** extension, which is renamed to **CRM** and reorganized: its email builder, campaigns, sending queue, lists, tags, segments, double opt-in and form integration carry over, and the newsletter subscriber grows into a full contact.

## In this manual

**Start here:** [Getting started](./getting-started.md): turn the CRM on, choose modules, add your team and
bring in your contacts.

**Contacts and companies**

- [Contacts](./contacts/contacts.md): the contact record, stages, owners, notes and the timeline
- [Companies](./contacts/companies.md) and [custom fields](./contacts/custom-fields.md)
- [Lists, tags and segments](./contacts/lists-tags-segments.md)
- [Import and export](./contacts/import-export.md) (CSV import with a dry run and undo)
- [Leads from your forms](./contacts/forms-and-signups.md): contact, booking and newsletter forms
- [Duplicates and merging](./contacts/duplicates-and-merge.md)
- [Consent and privacy](./contacts/consent-and-privacy.md)

**Sales pipeline**

- [Pipelines and deals](./sales/pipelines-and-deals.md): the drag-and-drop deals board
- [Products and line items](./sales/products-and-line-items.md), including WooCommerce products
- [Tasks, calls and meetings](./sales/tasks-calls-meetings.md) and the [calendar](./sales/calendar.md)
- [Email and replies](./sales/email-and-replies.md): one-to-one email and replies on the timeline
- [Files on records](./sales/files.md) and [sales reports](./sales/sales-reports.md)

**Workspace and team:** [Home dashboard](./workspace/home-dashboard.md), [team roles](./workspace/team-roles.md),
[bin and audit log](./workspace/bin-and-audit-log.md), [modules and settings](./workspace/settings-and-modules.md).

**Developers:** [REST API](./developers/rest-api.md), [PHP API and hooks](./developers/php-api-and-hooks.md),
[create a custom module](./developers/custom-modules.md), [webhooks](./developers/webhooks.md).

## Finding your way around

Open **Unyson+ → CRM** and the CRM takes over the screen like an app of its own:

- **The CRM sidebar** lists every area: Home, Contacts, Companies, Deals, Tasks, Calendar, Campaigns,
  Lists & segments, Reports, Import / Export, Custom fields, Bin, Audit log, Webhooks, Modules and
  Settings. Areas that belong to a module you switched off are hidden.
- **The WordPress menu folds to its icons** while you are in the CRM and comes back when you leave.
  **Hide the WordPress menu** at the bottom of the CRM sidebar removes it altogether (your choice is
  remembered), and **Back to WordPress** takes you to the dashboard.
- **The top bar** has search across contacts and companies (press <kbd>/</kbd> to jump to it) and a
  **New** menu for a contact, a company, a deal, a task, an email campaign or a CSV import.
- **Home** shows where things stand: how many contacts and how many are new, contacts by lifecycle stage,
  the pipeline, your tasks, what happened lately, the newest contacts and your campaigns, in cards each
  person can rearrange. An empty CRM shows the three ways people
  arrive instead: added by hand, imported, or collected by a form on your site.
- **A contact's page** has their details and your own fields (edit them in place), a stage picker, notes
  and the full timeline, the companies they work at, their lists and tags, their email status and the
  consent log with the exact wording they agreed to. **A company's page** works the same way and lists
  its people.

Adding someone by hand never subscribes them to your emails; email consent only comes from the person.

## What it covers

The CRM is one extension: a small core that is always on, and modules you switch on under **CRM → Modules**
when you need them. A new site is asked what it will use the CRM for and starts with only that, so a
beginner is never faced with tools they do not use. A module that is off loads no code and adds no menus.

| Part | What it does |
| --- | --- |
| **The core** (always on) | People with an owner, a lifecycle stage and your own fields; lists, tags and rule-based segments; one activity timeline per record; tasks with reminders; files; CSV import and export; consent and privacy built in |
| **Companies** | The organisations your contacts work for, each with a record, a timeline and its people |
| **Sales pipeline** | Several pipelines with their own stages, a drag-and-drop deal board, deal pages, products and sales reports |
| **Calendar** | Calls, meetings and dated tasks on a month, week and day calendar |
| **Email conversations** | One-to-one email from a contact's record, and their replies on the timeline |
| **Audit log** | Who changed, exported, merged or deleted what |
| **Webhooks** | CRM events sent to other apps as signed JSON the moment they happen |
| **Email marketing** | Campaigns built in a block email builder from a template gallery, double opt-in, a preference page, batched sending through SMTP or an email service, and open and click reports |
| **Automations** | Triggers (a form, a tag, a date, a deal stage, a purchase) start a flow of steps: send an email, wait, branch, change tags, move a deal, create a task, call a webhook |
| **Scoring and site activity** | Points for what contacts do, and the pages known contacts read, so the warmest leads come first |

## Start from your industry

The free [CRM Website Generator](https://create.unysonplus.com/crm/) builds a whole CRM website for one kind of business: the pages, the
lead forms, the pipeline stages and the CRM set up to match. Pick your industry, choose what you need, and
copy the prompt for your AI agent.

- [Real estate CRM website](https://create.unysonplus.com/crm/real-estate/): a free CRM for realtors, agent teams and
  brokerages, with listings, showing requests and home valuations
- [Home services CRM website](https://create.unysonplus.com/crm/home-services/): quote requests, service areas and recent jobs for
  plumbers, electricians, roofers and other trades
- [Dental and medical clinic CRM website](https://create.unysonplus.com/crm/dental-clinic/): appointment requests, new patient
  information and check-up reminders
- [Law firm CRM website](https://create.unysonplus.com/crm/law-firm/): practice areas, consultation requests and an intake pipeline
- [Gym and fitness studio CRM website](https://create.unysonplus.com/crm/gym/): classes, memberships and free trial sign-ups
- [Salon and spa CRM website](https://create.unysonplus.com/crm/salon-spa/): services and prices, booking requests and rebooking
  reminders
- [Recruitment agency CRM website](https://create.unysonplus.com/crm/recruitment-agency/): a job board, applications with CV
  upload and vacancy requests from employers
- [Event and wedding venue CRM website](https://create.unysonplus.com/crm/event-venue/): date enquiries, venue tours and a
  pipeline to deposit paid
- [Any business](https://create.unysonplus.com/crm/): start from a description of your business

## How it fits with the rest of Unyson+

- **Other extensions.** The CRM offers a versioned PHP API, a catalogue of events and REST endpoints, so
  other extensions read and change contacts, tags and deals without touching its tables, and can add their
  own triggers, actions, fields and timeline entries. The **Membership** extension (its own extension,
  for members-only content, plans and renewals) connects this way, as does WooCommerce. See the
  [extension API](./developers/extension-api.md).

- **Forms.** A contact or booking form can add its senders to the CRM: it creates or updates the contact,
  saves the answers you choose (to contact fields or custom fields it creates for you), keeps the whole
  submission on the timeline, and can turn a booking into a deal or a meeting. People are only subscribed to
  your emails when they tick a consent box. See [Leads from your forms](./contacts/forms-and-signups.md).
- **Newsletter element.** Signups from the Newsletter element become contacts.
- **AI Assistant.** A connected AI app can set the CRM up through its tools (fields, lists, segments,
  pipelines, campaigns, automations), but no tool reads or contacts the people in it.
- **The CRM website generator** builds its sites on the CRM: a real pipeline and a welcome automation.

## Built for ordinary hosting

Sending and automations run as small batches in the background, so no single request runs long enough to
hit a host's time limit. Two things make it reliable on shared hosting such as cPanel:

1. **A real cron job.** WordPress's own scheduler only runs when someone visits the site, so an automation's
   "wait three days" could fire late on a quiet site. The CRM checks the scheduler and gives you the exact
   line to add as a cron job in your hosting panel (every five minutes is plenty).
2. **An email service for campaigns.** Shared hosts limit how many emails a site may send per hour, and
   their shared mail servers often land in spam. Campaigns are queued by the CRM and delivered through SMTP
   or an email service's API.

Sites with up to tens of thousands of contacts run comfortably on good shared hosting. Much larger lists
and very large sends are better on a VPS or managed WordPress hosting.

## Design decisions

- **Grow the existing extension, don't start over.** The Newsletter / Subscriber CRM already has a working
  email builder, campaigns and sender, so it is renamed and reorganized rather than rewritten.
- **One extension with switchable modules**, not several extensions: one download, one version, one
  settings screen, and every module shares one contact record.
- **A contact is not a WordPress user.** Contacts are light records; a WordPress user is linked to a contact
  only when someone needs to log in (the Membership extension does this).
- **Membership is a separate extension.** It has its own scope (levels, a member area, login, renewals,
  payments) and some membership sites need no CRM. It connects to the CRM through the public API, so access
  can follow CRM tags and lists, and membership events reach the CRM's timeline and automations.
- **Built to grow.** Other extensions use the public API and events, never the tables; every schema change
  is a numbered migration; and modules stay independent, so new ones can be added later without reworking
  the core.
- **Team roles from the start.** A CRM manager sees everything; a sales rep sees only the records they own.
