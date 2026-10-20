---
title: "Free WordPress Booking System"
sidebar_label: "Bookings"
description: "Free WordPress bookings: rooms and rentals by the night, appointments, tables and classes by time slot, with a live availability calendar inside any form, seasonal prices, and confirm or decline from the email."
---

# Bookings

Take reservations on your own site, with no commission: a holiday rental or a few rooms booked by the night, or
appointments, tables and classes booked by time slot. Bookings works with [Forms](/extensions/forms): the booking form is a
normal form, so you add your own questions to it.

## What can be booked

Under **Bookings → Bookables**, add each thing people book:

- **By the night.** A nightly rate with seasons (for example a holiday rate from 15 December to 10 January), a
  cleaning fee, a security deposit, the shortest and longest stay, check-in and check-out times.
- **By time slot.** Opening hours per day ("Mon-Fri | 09:00-12:00, 13:00-17:00"), how long each slot is, a break
  after each booking, minimum notice, and a price per booking or per person.
- **How many at once.** Three identical rooms, two therapists, eight tables: the same date or time can be booked
  that many times before it shows as taken.
- **Waiting for you, or straight away.** New bookings can wait for you to confirm them (the default) or be confirmed
  automatically. While a booking waits, its place is held, so nobody else can take it meanwhile.

## The booking form

Add a **Contact Form** element and pick **Stay request** or **Appointment** in the form-type picker, or add the
**Dates and availability** field to any form you already have, and choose what it books in the field's settings.
Visitors see a live calendar: taken dates are struck through, free times are listed, and the price is worked out as
they choose. The server checks everything again when the form is sent, so two people can never book the last place
at the same moment.

The **Reserve** action (Settings → Actions) is on by default and only does something on a form with this field.

## Answering bookings

- You get an email for each booking with **Confirm** and **Decline** links that work without logging in. The guest
  gets a receipt, then an email when you answer.
- **Bookings** in the admin lists what is coming up, what is waiting for you, and past bookings, with Confirm,
  Decline and Cancel. The menu shows how many are waiting.
- **Block dates or times** for a stay booked elsewhere, maintenance or a day off.

## Answer tags

Use these in the form's success message and emails: `{booking_ref}`, `{booking_item}`, `{booking_when}`,
`{booking_nights}`, `{booking_guests}`, `{booking_total}`, `{booking_deposit}`.

See the [roadmap](/extensions/bookings/roadmap) for what comes next: a calendar view, syncing with other booking sites, deposits paid
online and the CRM connection.
