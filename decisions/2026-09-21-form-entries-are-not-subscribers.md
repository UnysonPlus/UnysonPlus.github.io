---
slug: form-entries-are-not-subscribers
title: "Why form submissions get their own Entries table instead of going into the newsletter list"
authors: [jon]
tags: [architecture, storage-model, extensions, security]
date: 2026-09-21
description: "Turning the contact form into a booking / quote / survey form raised the question of where the data should go — and whether the Newsletter CRM's subscriber list could simply hold it all. The decision: no. A subscriber is a person who consented to email; a submission is an event with arbitrary fields. They live in separate tables, joined by email, and a submission only ever becomes a subscriber through an explicit consent field and double opt-in. Entries live in the Forms extension; the CRM reads them for a subscriber's activity panel but never writes them."
---

**The question:** The Forms extension was mail-and-forget — a submission was emailed to the admin and discarded. To make the contact form usable as a booking form, a quote request or a survey, submissions have to be stored somewhere. Since the Newsletter CRM already has a table of people with emails, lists and tags, can the form data just go in there, so everything about a person is in one list?

<!-- truncate -->

**Context**

Two extensions were involved. The Newsletter CRM keeps a `subscribers` table: one row per email address, with a consent status (pending / confirmed / unsubscribed), list and tag membership, and tokened confirm / unsubscribe links. The Forms extension had a drag-and-drop builder and a `contact-forms` type that rendered a form and emailed the result; it stored nothing. The immediate need was "see all the data" from a booking-style form in the admin; the longer plan is a family of form types (booking, quote, registration, support, feedback, survey) built on one engine.

**Options considered**

1. **Store submissions as subscriber rows.** One table, one screen. But a subscriber row *is* a person: it has one email and one consent status. A person who books three tables and files a support ticket would need either four subscriber rows (four "people", four newsletters, unsubscribing one leaves three) or one row that somehow holds four submissions with different fields — which a flat table cannot represent. Every new form would add columns that mean nothing for the others (`party_size`, `order_number`). And the status column breaks: "confirmed" means *consented to email* for a signup, but means nothing for a support ticket — while the person who merely booked a table lands on the mailing list without having agreed to it.

2. **A new "Entries" extension.** Clean, but over-split: entries are meaningless without forms, and it would add a third repo, release and install step for one table.

3. **Entries in the Forms extension; Subscribers stay in the CRM; joined by email.** One row per *submission* in a `fw_form_entries` table with the fields as JSON (every form has a different shape, so columns per field would grow a column per form). One row per *person* in the CRM, created only when a consent field was ticked and confirmed by double opt-in. The subscriber's page can show their entries as an activity panel — a lookup by email, not a merge.

**Decision**

Option 3. Entries are submissions; subscribers are people. Two tables, joined by email. A submission never creates a subscriber by itself; that requires an explicit consent field and the CRM's own subscribe action, through the same double opt-in the newsletter uses, so the confirmation email is the real consent record. The CRM may read entries; it does not write them.

Two supporting rules shipped with it. Entries store `{ id, type, label, value }` per field with the **label captured at submit time**, so editing a form never makes old entries unreadable. And the seam is the existing `fw_ext_forms_frontend_submit` hook, extended to carry the submitted values — Entries, the CRM's future subscribe action, and any webhook all listen there rather than being threaded into the submit pipeline.

**Why**

- **It keeps consent honest.** A mailing list must contain only people who agreed to be on it. Putting bookings and tickets into it would put non-consenting addresses on a list — a GDPR / CAN-SPAM problem and a source of spam complaints that damage deliverability for everyone.
- **It is how every real CRM is shaped** — Contacts versus Activities. The shape is well understood, and it scales: a person with a hundred submissions is still one person.
- **It costs nothing later.** "Everything about this person" is a UI over two tables, not a reason to collapse them. The activity panel gives the unified view; the data stays correct underneath.
- **It sets the boundary for the rest of the Forms plan.** Payments stay with WooCommerce, deal pipelines are a different product, and "as powerful as a dedicated forms plugin" is not the target — three primitives (stored entries, on-submit actions, a few field types) plus starter templates cover the form types that matter.
