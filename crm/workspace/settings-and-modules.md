---
sidebar_position: 4
title: "CRM settings and modules"
sidebar_label: "Settings and modules"
description: "Configure the Unyson+ WordPress CRM: switch modules on or off, set up email replies, double opt-in, signup emails and privacy options."
keywords: [crm settings wordpress, crm modules, double opt-in settings, crm email settings, configure wordpress crm]
---

# Settings and modules

**CRM → Settings** is for CRM managers and administrators.

## Modules

<img src="/img/crm/settings-modules.png" alt="Switch CRM modules on or off" width="938" />

Contacts and companies are always on. Every other part of the CRM is a module:

- **Sales pipeline**: deals, pipelines, products, the deals board and sales reports.
- **Email marketing**: campaigns, the email builder and the sending queue.

A module that is off loads no code and shows no menus, and its data waits until you turn it back on. Email
marketing cannot be switched off while a campaign is sending or scheduled. Automations and scoring are coming
in later phases (see the [roadmap](../roadmap.mdx)).

## Replies on the timeline

The inbound address and the mailbox the CRM checks for replies. See
[Email and replies](../sales/email-and-replies.md).

## Signups and email

- **Default list** for new signups, and whether a form can create new lists.
- **Double opt-in**: send a confirmation link before a signup counts, with the confirmation email's subject
  and text.
- **Welcome email** after someone confirms.
- **Notify the site admin** of new signups.
- **Privacy**: store the signup IP address or not, and shorten it.

## Remove all data

At the bottom of Settings, **Remove all data** deletes every CRM table and setting after you confirm. It is
never done automatically, not even when the extension is deactivated.
