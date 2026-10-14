---
sidebar_position: 7
title: "GDPR consent and privacy in the WordPress CRM"
sidebar_label: "Consent and privacy"
description: "GDPR-friendly email consent in the Unyson+ WordPress CRM: a consent log with exact wording, double opt-in, a preference page and data export."
keywords: [gdpr crm wordpress, email consent log, double opt-in wordpress, personal data export, right to be forgotten crm, privacy compliant crm, self-hosted crm gdpr]
---

# Consent and privacy

The CRM keeps your contacts in your own WordPress database, and it is strict about one thing: nobody is
emailed unless they agreed.

## Email consent

- **Only the person can subscribe themselves.** Adding a contact by hand, creating one through the API or
  linking one from a form without a consent box never subscribes them. Imports subscribe people only when
  you confirm they all agreed.
- **The consent log** on each contact's page records every time they agreed or withdrew: when, how (a form,
  a confirmation link, an import), from which page, and the exact wording of the box they ticked.
- **Double opt-in** (in CRM settings) sends a confirmation link before a signup counts.
- **A preference page** lets people choose which lists they stay on; an unsubscribe link leaves everything.
- **Per-list status**: leaving one list is remembered, so nothing puts them back by accident. See
  [Lists, tags and segments](./lists-tags-segments.md).

One-to-one emails you write to a contact are personal, not marketing, so they are not blocked by an
unsubscribe. See [One-to-one email](/crm/sales/email-and-replies).

## Personal data requests

The CRM plugs into WordPress's own **Tools → Export Personal Data** and **Tools → Erase Personal Data**, so a
request covers a person's CRM record too.

## What is stored

Contacts, companies, deals and everything about them live in the CRM's tables in your WordPress database.
Nothing is sent to an outside service by the CRM itself, except the email you choose to send through your
site's mail set-up. IP addresses at signup can be left out or shortened in settings.

## Frequently asked questions

**Is the CRM GDPR compliant?**
It gives you what compliance needs: recorded consent with its wording, double opt-in, easy unsubscribing,
and export and erasure through WordPress. How you use it is still up to you.

**Where is my data hosted?**
On your own hosting, in your WordPress database.
