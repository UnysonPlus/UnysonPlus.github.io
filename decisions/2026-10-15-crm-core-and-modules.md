---
slug: crm-core-and-modules
title: "How do we keep the CRM from overwhelming a beginner?"
authors: [jon]
tags: [extensions, architecture, admin-ui]
date: 2026-10-15
description: "The CRM had grown companies, deals, a calendar, one-to-one email, campaigns, an audit log and more, all visible from the first click. We split it into a small always-on core and switchable modules shown as cards with switches, asked new sites what they will use the CRM for, kept every existing site exactly as it was, and opened the same module system to other plugins, with outbound webhooks as the first new module."
---

**The question:** "I don't want the CRM to overwhelm the beginner user with a bunch of tools. We can keep the
basic features and make the other features modules the user can activate when they want to. What do you
think?" And, once that was settled: can users build their own module, and is there an API or webhooks they
can use?

<!-- truncate -->

## Context

By the end of Phase 2 the CRM showed, from the first click, Companies, Deals, Tasks, Calendar, Campaigns,
Lists & segments, Reports, Import / Export, Custom fields, Bin, Audit log and Settings, plus email
conversations and inbound mail settings. Only two parts (the sales pipeline and email marketing) could be
switched off, from a list buried in Settings, and both were on by default.

Someone who only wants to keep track of their clients met a sales tool, a newsletter tool and an admin
console at once. The Membership extension had already solved the same problem with a Modules screen:
cards, each with an icon, a description and a switch, and a core that is always on.

Two constraints shaped the answer:

- **Nothing on an existing site may disappear.** Sites already using deals, companies or campaigns must look
  the same after the update.
- **"Off" has to mean off.** A switched-off module must load no code, run no background job and register no
  REST route, not just hide a menu. Otherwise the split only moves the clutter somewhere else.

## Options considered

**Leave everything on and rely on good empty states.** No work, but a beginner still sees twelve areas, and
every one of them loads code on every request.

**Separate extensions per area (a Deals extension, a Campaigns extension…).** Truly optional, but each needs
its own download, version and update, and they all share one contact record and one timeline. Every
cross-feature link (a deal's company, a campaign's bounce on a contact) would become an inter-extension
dependency. We had already decided against this when the CRM was designed.

**One extension, a small core, switchable modules (chosen).** One download and version; modules share the
contact model; each module's files live in their own folder and load only when switched on.

For what is core, the test was: *would a person who only keeps a list of clients miss it?* Contacts, notes,
tags, lists, segments, tasks, files, import and export, custom fields and the bin pass. Companies, the
pipeline, the calendar, one-to-one email, campaigns, the audit log and webhooks do not, so they became
modules. Companies stays core *data* (the table, the API, the links to contacts) and only its screens are
switched, because deals, imports and the API all refer to companies and must not break when the screens are
hidden.

## Decision

- **A Modules screen** in the CRM sidebar, laid out like Membership's: cards grouped by Sales, Marketing,
  Team and records, and Connections, each with an icon, a description, a "Needs …" line when it depends on
  another module, and a switch. Planned modules (automations, scoring, cases) are listed as coming soon.
  The list left Settings.
- **New sites start with the core only** and are asked once, on Home, *What will you use the CRM for?*
  ("Keep track of people", "Sell to customers", "Send newsletters", "Email people one to one"). The answers
  switch on the matching modules; "Skip" keeps it simple.
- **Existing sites keep what they use.** A one-time migration switches on every module the site has data for
  (companies, dated tasks, sent or received email, audit entries) and keeps the two modules that used to be
  on by default. A site that already has contacts is never asked the first-run question.
- **Off means off.** Module files live in `modules/<name>/` and are loaded only while the module is on. Files
  that had to move out of `includes/` were moved, because the framework loads every top-level file there on
  its own.
- **Other plugins can add modules** through the same filter the CRM uses for its own, with the same switch,
  the same "is turned off" screen for a hidden area, and a documented example.
- **Outbound webhooks are the first new module.** Signed JSON events, queued, retried and logged, so other
  apps can react to the CRM without polling the REST API.

## Why

The beginner sees only what they asked for, and the CRM grows with them one switch at a time. Experienced
users lose nothing: the first-run question takes seconds, and every module is one switch away. Existing
sites are untouched, because the migration reads what they actually use rather than resetting them to the
new defaults.

Making "off" mean off keeps the cost of unused modules at zero, which matters on the shared hosting many
small businesses run on. Using one registration mechanism for the CRM's own modules and everyone else's
means the extension API is tested by the CRM itself every day, rather than being a second path that drifts.
Webhooks answer "can I connect this to my other tools?" without the CRM having to know those tools in
advance.

**Status:** Accepted (CRM 1.0.67).
