---
slug: bookings-own-extension
title: "Why are bookings a separate extension, and not part of Forms or the rental site's plugin?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-10-20
description: Reservations live in their own Bookings extension (bookables, one availability engine, a bookings table) and plug into Forms through a field and an action, instead of growing inside Forms or staying in one site's bespoke plugin.
---

**The question:** a rental site already has a working booking plugin with a "Stay dates" field and a "Reserve" action
for Forms. Should bookings now become part of Forms, stay in that plugin, or become an extension of their own?

<!-- truncate -->

## Context

Forms' Phase 10 is "Bookings plug in". The first booking field and action were built inside a bespoke plugin for a
single holiday rental: one villa, nights only, settings in one option. Other sites need several rooms, appointments
by time slot, tables, staff that can serve two people at once.

## Options considered

- **Put bookings into Forms.** One less extension, but Forms would carry availability rules, a bookings table,
  calendars and iCal for the many sites that only want a contact form.
- **Keep growing the site's own plugin.** Fast for that site, useless for anyone else, and its single-villa model
  (one option, nights only) does not stretch to rooms or slots.
- **A Bookings extension that plugs into Forms.** Bookables as a post type, one bookings table, one availability
  engine; Forms gets a field and an action through its existing hooks, exactly like the CRM and Membership.

## Decision

Bookings is its own extension. Every surface (the calendar, the server check, REST, the admin) asks one class,
`FW_Bookings_Availability`, so what a visitor sees and what the server accepts cannot drift apart. The Reserve action
books under a database lock and is on by default but idle on forms without the booking field. The rental site keeps
its plugin until Bookings covers what it needs (iCal and the CRM are next), then moves over.

## Why

- **Forms stays a form builder.** No booking code in it; a site without Bookings loads none of it.
- **One model for every kind of booking.** "How many at once" plus "by the night or by slot" covers a villa, a
  hotel's rooms, a salon and a restaurant without separate code paths.
- **The pioneer was not wasted.** The field, the action and the calendar ideas came from the bespoke plugin and
  were generalised, not thrown away.
