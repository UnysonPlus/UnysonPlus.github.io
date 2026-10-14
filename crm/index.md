---
sidebar_position: 1
slug: /
title: "CRM — a self-hosted CRM for WordPress"
sidebar_label: "CRM"
description: "The Unyson+ CRM (planned): contacts and companies, a sales pipeline, email marketing, automations and lead scoring, all inside your own WordPress site, built to run on ordinary hosting and open to other extensions through a public API."
---

# CRM

:::info Planned
The CRM is being designed now. Nothing on this page ships yet; the [roadmap](./roadmap.mdx) shows the
phases and tracks each one against the code as it lands.
:::

The CRM is a complete customer system inside your WordPress site: the people and companies you work
with, the deals you are chasing, the emails you send them, and the automations that follow up for you.
Your data stays in your own database, with no per-contact fees and no outside service to sign up to.

It grows out of the **Newsletter / Subscriber CRM** extension, which is renamed to **CRM** and reorganized: its email builder, campaigns, sending queue, lists, tags, segments, double opt-in and form integration carry over, and the newsletter subscriber grows into a full contact.

## What it covers

The CRM is one extension made of modules. **Contacts and companies** is always on; every other module is
switched on in the CRM's settings, and a module that is off loads no code and adds no menus.

| Module | What it does |
| --- | --- |
| **Contacts and companies** | People and companies with an owner, a lifecycle stage and your own fields; lists, tags and rule-based segments; one activity timeline per record; CSV import and export; consent and privacy built in |
| **Sales pipeline** | Several pipelines with their own stages, a drag-and-drop deal board, deal pages, tasks with reminders, notes, one-to-one email and sales reports |
| **Email marketing** | Campaigns built in a block email builder from a template gallery, double opt-in, a preference page, batched sending through SMTP or an email service, and open and click reports |
| **Automations** | Triggers (a form, a tag, a date, a deal stage, a purchase) start a flow of steps: send an email, wait, branch, change tags, move a deal, create a task, call a webhook |
| **Scoring and site activity** | Points for what contacts do, and the pages known contacts read, so the warmest leads come first |

## How it fits with the rest of Unyson+

- **Other extensions.** The CRM offers a versioned PHP API, a catalogue of events and REST endpoints, so
  other extensions read and change contacts, tags and deals without touching its tables, and can add their
  own triggers, actions, fields and timeline entries. A planned **Membership** extension (its own
  extension, for members-only content, levels and renewals) connects this way, as does WooCommerce.

- **Forms.** Every contact form gets an **Add to the CRM** action that creates or updates the contact, adds
  tags and lists and records consent. Submissions are still kept under Form Entries either way.
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
