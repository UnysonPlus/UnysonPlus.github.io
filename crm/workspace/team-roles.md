---
sidebar_position: 2
title: "CRM team roles: managers and sales reps"
sidebar_label: "Team roles"
description: "CRM Manager and Sales Rep roles in the Unyson+ WordPress CRM: who sees which contacts, deals and tasks, and who can import, export and merge."
keywords: [crm user roles wordpress, sales rep permissions, crm team access, wordpress crm permissions, crm manager role, record ownership crm]
---

# Team roles

The CRM adds two WordPress roles. Give each team member an account with the role that fits.

| | CRM Manager | Sales Rep |
| --- | --- | --- |
| Sees | Every contact, company, deal and task | The records they own, and tasks on them |
| Adds and edits records | Yes | Their own; what they add is theirs |
| Reassigns owners | Yes | No |
| Support cases | Every case | Their own and the unassigned ones |
| Campaigns, lists and segments, automations, lead scoring | Yes | No |
| Import, export, merge, custom fields | Yes | No |
| Pipelines and products | Edit | Use |
| Bin (restore, delete for good), audit log, webhooks, modules, settings | Yes | No |
| Reports | Everyone's | Their own |

Administrators always have full access, as managers. Only administrators can change
[CRM mode](./run-the-site-as-a-crm.md).

## How ownership works

Every contact, company and deal has an **owner**. A sales rep sees and works the records they own: the
contacts list, search, Home, the deals board, the calendar, reports and the REST API all show only theirs.
A manager sees everything and can change owners.

Ownership limits what people see in the CRM. Other extensions working in the background (for example
Membership checking whether someone has a tag) are not limited by it.

## Add a team member

1. **Users → Add New** in WordPress.
2. Choose the role **CRM Manager** or **Sales Rep**.
3. They log in and find **CRM** in their menu. With [CRM mode](./run-the-site-as-a-crm.md) on, they land
   straight in the CRM.

Both roles can upload files to the records they can edit.
