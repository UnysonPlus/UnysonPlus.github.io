---
slug: crm-grows-from-newsletter-crm
title: "Why grow the Newsletter / Subscriber CRM into the CRM instead of starting a new extension?"
authors: [jon]
tags: [extensions, architecture, storage-model]
date: 2026-10-14
description: "Unyson+ needs a powerful CRM: pipelines, email marketing, automations and scoring, with a Membership extension connecting to it later. The Newsletter / Subscriber CRM already has a working email builder, campaigns and sender, and nothing depends on its name, so it is renamed to CRM and reorganized into switchable modules rather than replaced."
---

**The question:** "Do we need a new extension for it? Do you think we should rebuild or rename the newsletter extension?" Then: "I want to have a very powerful CRM for Unyson+. Renaming it won't be a problem." And finally: "It would be easier if you grow the newsletter CRM by renaming it first to just CRM and reorganize it. We already made progress with the newsletter CRM, like the email builder." And on membership: "In the future, I also want to create something like a membership extension and hope it will be connected to the CRM. Do you think that membership ext should be another extension, right?"

<!-- truncate -->

## Context

The goal is a full customer system inside WordPress: contacts and companies, deals across several
pipelines, email campaigns, automations with waits and branches, lead scoring and membership access by
tag. The **Newsletter / Subscriber CRM** stores newsletter signups around a *subscriber* record, but it
also already holds real work: a block email builder and compiler, campaigns with a batched sending queue,
lists, tags and segments, double opt-in, a preference page, the contact form's subscribe action, the
Newsletter element listener, privacy tools and AI connector tools. No live site depends on it.

## Options considered

- **A brand-new CRM extension, retiring the old one.** A clean data model from the first table, but it
  would rebuild or copy the email builder, campaigns and sender that already work.
- **Keep the old name and bolt features on.** Least effort today, but "Newsletter" would describe a
  fraction of the product, and its subscriber-shaped record would stay at the centre.
- **Several separate extensions** (CRM, automations, membership). Each needs the same contact record, so
  they would spend their lives synchronising with each other.
- **Rename it to CRM and reorganize.** Keep every working part, give the extension the name and the
  module layout the product needs, and grow the subscriber record into a contact.

## Decision

Rename the Newsletter / Subscriber CRM to **CRM** (folder `crm`) and reorganize it into **one extension
with switchable modules**: contacts and companies always on; sales pipeline, email marketing, automations
and scoring switched on as needed, each loading no code while off. **Membership** becomes its own extension that connects to the CRM through a public, versioned API and events catalogue, so access can follow CRM tags and membership events reach the CRM, without either reaching into the other's tables. The subscriber record grows
into a contact (owner, lifecycle stage, companies, custom fields, a timeline). There is no data to migrate,
because nothing depends on it and its tables are already `fw_crm_*`. Everything that pointed at the old
name moves in the same release: the Site Converter, Visitor Insights, the `forms-add` connector tool and
the CRM website generator.

A contact is not a WordPress user; the Membership extension links one only when a contact needs to log in.

## Why

The rename costs nothing because nobody depends on the old name, and it keeps the most expensive pieces
already built (the email builder above all). Reorganizing into modules gives one shared contact record
without cross-extension plumbing, while a site that only wants a newsletter still runs only that. The
roadmap lives at [/extensions/crm/roadmap](/extensions/crm/roadmap) and tracks each phase against the code
as it lands.
