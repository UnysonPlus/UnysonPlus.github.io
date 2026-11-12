---
sidebar_position: 6
title: "Find and merge duplicate contacts in WordPress"
sidebar_label: "Duplicates and merging"
description: "Find contacts entered twice in the Unyson+ WordPress CRM by name or phone and merge them into one record that keeps the whole history."
keywords: [merge duplicate contacts wordpress, crm duplicates, deduplicate contacts, merge contacts crm, duplicate detection wordpress crm]
---

# Duplicates and merging

The same person sometimes ends up in the CRM twice: once from a form with their work email, once added by
hand with their phone. Merging joins the two into one record without losing anything.

## How duplicates are found

The same email address can never belong to two contacts. Possible duplicates are contacts with:

- the **same phone number** (compared on the last nine digits, so `+44 7700 900001` matches `07700 900001`), or
- the **same full name**.

Phone numbers need at least six digits to be compared, and contacts in the bin are left out.

A contact's page shows its likely duplicates in a **Possible duplicates** panel. **Find duplicates** on the
contacts list opens **Possible duplicates**, which lists every group found (up to 100 at a time), each
labelled same name, same phone number, or both.

## Merge two contacts

1. On a contact's page, click **Merge…** next to a possible duplicate, or click **Compare and merge** on a
   group in Possible duplicates.
2. The two records show side by side. Choose which record to keep (**Keep the other one instead** swaps them),
   and for each detail that differs (name, email, phone, job title, owner, main company, address, source…)
   which value to keep.
3. Confirm. The other record is merged into the one you keep.

What happens when contacts merge:

- **Everything moves to the kept contact**: timeline, notes, consent log, lists and tags, companies, deals,
  support cases, tasks, files, campaign history, tracked events and purchase history, and the site account
  link. Custom field values move too; where both have a value, the kept contact's wins.
- **Email status** becomes the safer of the two (for example, if either unsubscribed, the result is
  unsubscribed).
- **Lifecycle stage** becomes the more advanced one; **lifetime value** is added together, and so are the
  points of each [lead score](../email-marketing/lead-scoring.md); the **earliest** date added and the latest activity
  are kept.
- The merge is written on the timeline and in the [audit log](/crm/workspace/bin-and-audit-log).

Two contacts linked to two different WordPress accounts cannot be merged, because one person cannot be two
logins.

Merging is for CRM managers.
