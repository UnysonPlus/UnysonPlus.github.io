---
slug: forms-library-and-style-presets
title: "Should bookings merge into Forms or the CRM, and how should Forms grow into an all-in-one form builder?"
authors: [jon]
tags: [extensions, architecture, admin-ui, css]
date: 2026-10-19
description: Forms becomes the all-in-one form system, with form-type starters picked first, field styling on Form Styles presets in Theme Settings, and a form library. Reservations stay a separate Bookings extension that plugs into Forms and the CRM through a field, an action and a CRM module.
---

**The question:** A rental site needs a booking engine and wants its guests in the CRM. Should booking merge into the CRM
or into the contact form? And can Forms become one builder for every kind of form, with presets for the form types and
for the fields' design?

<!-- truncate -->

## Context

Forms already has a drag-and-drop builder, stored entries, conditional fields, nine starter forms and on-submit actions
that the CRM ("Add to the CRM") and Membership ("Register member") add to. But each form lives inside the Contact Form
element that shows it, the starters are hidden in the builder's Templates panel, and every element carries its own field
colours, radius and border. Buttons and boxes already keep their look on presets in Theme Settings; form fields do not.

The rental site's booking engine does things a form cannot: it knows which nights are taken, prices a stay, refuses a
clashing request and syncs calendars with the listing sites. Membership's courses and its CRM connection are modules
inside Membership, using the CRM's public hooks; the CRM knows nothing about memberships.

## Options considered

- **Merge booking into the CRM.** One place for guests and bookings, but it puts inventory, pricing and calendar sync
  into a contact system, and every CRM site carries it whether it takes bookings or not.
- **Merge booking into Forms.** A booking form is a form, but every contact form would carry calendar and pricing code,
  and Forms would turn into a booking engine.
- **A separate Bookings extension** that adds a dates-and-availability field and a reserve action to Forms, and a CRM
  module, the way Membership connects.
- **For field design:** keep styling per element, or move it onto presets.
- **For the form types:** leave the starters in the Templates panel, or show them first.

## Decision

- Forms grows into the all-in-one form system. In order: **Form Styles presets** in Theme Settings (the element picks a
  style and keeps only its own width, alignment and spacing), a **form-type picker** shown when a Contact Form element is
  added, then a **form library** (Unyson+ → Forms) whose saved forms the element can show on any page. Multi-step
  forms, richer fields, calculations, payments, quizzes and limits follow.
- Reservations stay a **separate Bookings extension**. It plugs into Forms with a field and an action, and into the CRM
  with its own CRM module (contacts, timeline, deals, automation triggers). It is built when a second booking site needs
  it; until then the rental site's own booking plugin gets the CRM module.

The plan is on the [Forms roadmap](/extensions/forms/roadmap).

## Why

Each extension keeps one job: Forms collects answers, the CRM manages people, Bookings manages what can be reserved, and
they meet through the hooks that already exist. Style presets follow the rule buttons and boxes already follow, so every
form on a site matches and one edit restyles them all. The picker makes starters that already exist findable. The
library is how every major form plugin works, because a form placed on several pages should be edited in one place.
