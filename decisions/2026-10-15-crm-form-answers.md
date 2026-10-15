---
slug: crm-form-answers
title: "When a form adds someone to the CRM, where do their answers go?"
authors: [jon]
tags: [extensions, storage-model]
date: 2026-10-15
description: "A booking form asks for a name, phone, date, package, make and model, and a message. We decided that answers describing the person go on the contact, answers about one request stay with the submission on the timeline, the person chooses per field with a pre-filled table, and the CRM creates custom fields itself only for the fields chosen, never for every field automatically."
---

**The question:** "If the visitor enters his name and email in a form, does it get sent to the CRM? How will
the other fields be saved? Like on a booking form, there's a custom package field. Will the CRM auto-create the
custom fields?"

<!-- truncate -->

## Context

Until now a contact form reached the CRM only to subscribe someone to the newsletter, and only when they ticked
a consent box. An enquiry without that tick never became a contact, which is the opposite of what a CRM is for.
The fix had to keep the consent rule (nobody gets campaign emails without agreeing) and answer a harder
question: a booking form holds a full name, a phone number, a date, a package, a car's make and model, and a
message, and they are not all the same kind of data.

Form Entries already keeps every submission with all of its fields, so nothing is ever lost whatever the CRM does.

## Options considered

**Create a custom field for every form field automatically.** No setup, but the date, package and message would
become contact fields that each new booking overwrites, and contact pages would fill up with one-off answers.

**Save only name, email and phone.** Simple, but the person's car (or company, or anything else they tell you
that stays true) never becomes searchable or usable in a segment.

**Let the user choose per field, pre-filled (chosen).** A table of the form's fields, each with a dropdown:
contact fields, existing custom fields, "+ New custom field", or "Only on the timeline". Name, email, phone and
fields matching an existing custom field are filled in automatically; everything else starts on the timeline.

## Decision

- A contact form can **add the sender to the CRM** (status "none": in the CRM, not subscribed). Subscribing stays
  a separate switch that needs a ticked consent box.
- **Answers that describe the person go on the contact; answers about one request stay with the submission.**
  The whole submission is always on the contact's timeline, with a link to its entry.
- The CRM **creates custom fields only for the fields set to "+ New custom field"**, from the form field's
  label, type and options, when the page is saved. The link follows the field, not its label.
- An existing contact's details are **only filled where empty** by default, and differences are noted.
- A booking can also become **a deal** (the package as its product and value, the date as its close date) or
  **a meeting** on the chosen date. That is where per-booking data becomes something to act on.

## Why

A contact record is about a person, so it should only hold what stays true about them. A booking's date and
package belong to that booking: on the timeline, they keep every booking side by side; as a deal or meeting, they
land on the pipeline or calendar where someone follows them up. Pre-filling the table keeps the common case to one
switch, and leaving the rest on the timeline means a beginner never ends up with a cluttered contact page they did
not ask for.

**Status:** Accepted (CRM 1.0.68).
