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

## The calendar and phone bookings

**Bookings → Calendar** shows a month at a glance: one row for each thing you rent out, one column per day, with
who is booked, what is waiting for you, blocked days and stays booked on other sites. A day is shaded by how full it
is. Click the **+** on a free day to add a booking taken by phone or in person; it is checked against the calendar
like any other, and the guest can be emailed a receipt.

## Listed on other booking sites too?

Each bookable can **import** the calendars of the other sites it is listed on (paste their iCal export address,
one per line). They are checked every hour, and a night booked there is never offered here. If a site is briefly
unreachable, its last known bookings stay in place, so dates never open by accident. Each bookable also has
**its own calendar address** to paste into those sites, so a booking made here closes the dates there too.

## Guests manage their booking

Every email a guest gets links to a private page with their booking and its status. They can cancel it there, up to
the number of hours before it starts that you choose (48 by default), or you can switch online cancelling off. You
get an email when a guest cancels.

## Taking payment when people book

A bookable can ask for **the whole price** or **a part of it now** (for example 30%) when someone books. Add the
**Take payment** action to the booking form (Settings → Actions) and the booking appears in the order with the
right amount, worked out on the server: the visitor pays by card, PayPal or bank transfer, whichever the form offers
([Forms payments](/extensions/forms)).

- When the payment goes through, the booking shows it as paid and can be **confirmed at once**.
- If a card or PayPal payment is never finished, the booking gives its place back after the time you set (an hour
  by default), so an abandoned checkout never blocks your calendar. Bank transfers are left for you to decide.
- A refund on the form entry takes the amount back off the booking.

## Guests in the CRM

When the [CRM](/crm) is on, every guest becomes a contact (a lead when they book, a customer once
confirmed) with each booking on their timeline. With the CRM's pipeline turned on, each booking is also a deal in a
**Bookings** pipeline, won when you confirm it and lost when it is declined or cancelled. Three contact fields, **Next
booking**, **Last booking ended** and **Confirmed bookings**, let you send a reminder before someone arrives or a
thank-you after they leave, and the CRM's automations can start on "Booking made", "confirmed", "declined" or
"cancelled". Bookings → **Bring past bookings into the CRM** adds the ones made before.

## Answer tags

Use these in the form's success message and emails: `{booking_ref}`, `{booking_item}`, `{booking_when}`,
`{booking_nights}`, `{booking_guests}`, `{booking_total}`, `{booking_deposit}`.

See the [roadmap](/extensions/bookings/roadmap) for what comes next: letting the visitor choose between several rooms or staff, weekday rates and extras, reminders, and moving an existing booking plugin over.
