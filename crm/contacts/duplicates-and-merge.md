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

A contact's page shows its likely duplicates. **Contacts → Possible duplicates** lists every group found.

## Merge two contacts

1. Open the duplicate and choose **Merge**, or pick a group in Possible duplicates.
2. Choose which record to keep, and for each detail that differs (name, email, phone, job title…) which value
   to keep.
3. Confirm. The other record is merged into the one you keep.

What happens when contacts merge:

- **Everything moves to the kept contact**: timeline, notes, consent log, lists and tags, companies, deals,
  tasks, files, campaign history and custom field values.
- **Email status** becomes the safer of the two (for example, if either unsubscribed, the result is
  unsubscribed).
- **Lifecycle stage** becomes the more advanced one; **lifetime value** is added together; the **earliest**
  date added is kept.
- The merge is written on the timeline and in the [audit log](/crm/workspace/bin-and-audit-log).

Two contacts linked to two different WordPress accounts cannot be merged, because one person cannot be two
logins.

Merging is for CRM managers.
