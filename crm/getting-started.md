---
sidebar_position: 2
title: "Getting started with the WordPress CRM"
sidebar_label: "Getting started"
description: "Set up the Unyson+ CRM in WordPress: turn it on, choose modules, add your team, import contacts from CSV and capture leads from your forms."
keywords: [wordpress crm setup, how to set up a crm in wordpress, wordpress crm plugin, self-hosted crm, import contacts csv wordpress, crm for small business wordpress, unyson+ crm]
---

# Getting started with the CRM

The Unyson+ CRM runs inside your own WordPress site: no outside service to sign up to and no per-contact
fees. This page takes you from a fresh install to a working CRM: turning it on, picking the parts you need,
adding your team and getting your first contacts in.

## 1. Turn the CRM on

1. In WordPress, open **Unyson+ → Extensions** and activate **CRM**.
2. Open **Unyson+ → CRM**. The CRM opens as an app of its own, with its own sidebar and search.

The first time it opens, Home shows the three ways contacts arrive: added by hand, imported from a
spreadsheet, or collected by a form on your site.

<img src="/img/crm/home.png" alt="The CRM Home screen in WordPress with contact counts, contacts by stage, the sales pipeline, recent activity and tasks" width="1920" />

## 2. Choose the modules you need

Open **CRM → Settings**. Contacts and companies are always on; the rest are modules you switch on or off:

| Module | Turn it on if you… |
| --- | --- |
| **Sales pipeline** | track deals, quotes or bookings through stages, with products, tasks and sales reports |
| **Email marketing** | send newsletters and campaigns to lists, tags or segments |

A module that is off loads no code and adds no menu items, and its data stays until you turn it back on.
See [Settings and modules](./workspace/settings-and-modules.md).

<img src="/img/crm/settings-modules.png" alt="CRM settings: switch the sales pipeline and email marketing modules on or off" width="938" />

## 3. Add your team

Give each person a WordPress account with one of the CRM roles:

- **CRM Manager**: sees and edits everything, runs campaigns, imports and exports, and changes settings.
- **Sales Rep**: sees and works the contacts, companies, deals and tasks they own.

Administrators always have full access. See [Team roles](./workspace/team-roles.md).

## 4. Get your contacts in

- **Import a spreadsheet.** CRM → **Import / Export** reads a CSV file, guesses which column is which, and
  lets you check the whole file before anything is saved. Every import can be undone. See
  [Import and export](./contacts/import-export.md).
- **Add people by hand** with **New → Contact** in the top bar.
- **Collect them from your site.** Every contact form gets an **Add to the CRM** action, and the Newsletter
  element's signups become contacts.

Adding or importing someone never subscribes them to your emails. Email consent only comes from the person
(a signup form, a confirmed opt-in), or from an import where you confirm everyone agreed.

## 5. Set up your sales process (optional)

If you turned on the sales pipeline, open **Deals → Edit pipelines** and rename the stages to match how you
sell. A first "Sales" pipeline is ready to use: New lead, Contacted, Proposal sent, Negotiating, Won and
Lost. Add your products under **Deals → Products** so deal values add themselves up. See
[Pipelines and deals](./sales/pipelines-and-deals.md).

## 6. Make it reliable on your host

WordPress runs scheduled jobs (task reminders, sending, checking a mailbox for replies) when someone visits
the site. On a quiet site that can be late. If your host offers cron jobs (cPanel and most others do), add
one that calls `wp-cron.php` every five minutes and the CRM's background jobs run on time.

## Frequently asked questions

**Is the CRM free?**
The CRM is part of Unyson+. There are no per-contact or per-user fees: your contacts live in your own
WordPress database.

**Do I need a separate email service?**
No for one-to-one email and reminders, which go through your site's mail set-up. For newsletters to many
people, an SMTP or email service is strongly recommended, because shared hosts limit how much a site may
send.

**Can I try it on a staging site first?**
Yes. Everything is stored in your WordPress database, so a staging copy of your site carries the CRM with it.

## Next steps

- [Contacts](./contacts/contacts.md) and [companies](./contacts/companies.md)
- [Lists, tags and segments](./contacts/lists-tags-segments.md)
- [Pipelines and deals](./sales/pipelines-and-deals.md)
