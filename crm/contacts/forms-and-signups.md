---
sidebar_position: 5.5
title: "Capture leads from WordPress contact and booking forms"
sidebar_label: "Leads from your forms"
description: "Send WordPress contact, booking and quote form submissions into the Unyson+ CRM: create contacts, save each answer to a contact field or a new custom field, keep the whole submission on the timeline, and turn bookings into deals or meetings."
keywords: [wordpress form to crm, contact form crm wordpress, booking form crm, capture leads wordpress, save form entries to crm, form custom fields crm, newsletter signup crm, wordpress lead capture]
---

# Leads from your forms

The people who fill in your site's forms become contacts in the CRM: an enquiry, a booking request, a quote
request or a newsletter signup. You choose which answers are saved on the contact, and the whole submission is
kept on their timeline.

## The Newsletter element

Signups from the **Newsletter** element always reach the CRM. The person becomes a contact with their name,
joins your default list (or the list the element names), and is subscribed to your emails. With double
opt-in on, they count as subscribed once they click the confirmation email.

## Contact forms

A contact form reaches the CRM when you switch it on, form by form. Open the form in the page builder, go to
**Settings → Actions → Add to the CRM**, and switch on **Add the sender to the CRM**.

From then on, every submission with an email address:

- **creates the contact**, or updates them if that email address is already in the CRM;
- **saves the answers you chose** on the contact (below);
- **puts the whole submission on the contact's timeline**, every answer, with a link to the entry under
  Form Entries;
- **adds the form's tags**, so you can see and segment people by the form they came from;
- and, if you ask it to, **creates a deal or a meeting** from the submission.

**It never subscribes anyone to your emails.** A contact added by a form is in the CRM but not on your mailing
list. To let people subscribe, add a **Consent** field set to "Newsletter" and switch on **Subscribe them to the
newsletter when they tick consent**: only the people who tick it are subscribed, with double opt-in if it is on.

The form needs an **Email** field: the CRM finds and creates contacts by email address.

### Choose where each answer goes

Under **Save the answers**, every field of the form is listed with a choice of where its answer goes:

<img src="/img/crm/form-crm-settings.png" alt="The Save the answers table of a booking form: Full Name to the contact's name, Phone to phone, Make/Model to a custom field, the rest only on the timeline" width="502" />

| Choice | What happens |
| --- | --- |
| **Only on the timeline** | The answer is kept with the submission, not on the contact. Best for anything that changes every time: a booking date, a chosen package, a message. |
| **A contact field** | Name (split into first and last), first name, last name, phone, job title, company, street, city, region, postcode, country. A company is found by name, or created, and linked. |
| **An existing custom field** | Any contact [custom field](./custom-fields.md). |
| **+ New custom field** | The CRM creates a custom field for this answer when you save the page: same name, and the matching type. A dropdown or single choice becomes a choice field with the same options, a multiple choice a multiple-choice field, a date a date field. |

It fills itself in for you. Email identifies the contact; fields called name, first name, last name, phone,
company, job, address, city, postcode or country go to those contact fields; a field with the same name as an
existing custom field goes to that field; everything else starts as **Only on the timeline**.

A new custom field stays linked to its form field, even if you rename the form field later. Options you add to
a dropdown later are added to the custom field too. Anti-spam, Recaptcha, Hidden, File Upload and Password
fields are never saved on the contact.

**Which answers belong on the contact?** The ones that describe the person and stay true: their phone, their
company, their car's make and model. Keep answers about one request (a date, a package, a message) on the
timeline, where every submission keeps its own. Saving them on the contact would overwrite the previous one.

### When the person is already in the CRM

**When the contact already exists** decides what happens to their details:

- **Fill empty fields only** (the default): new answers fill gaps, and what your team typed is never
  overwritten. When an answer differs from what is stored, the timeline says so.
- **Replace their details with the newest answers.**

A contact in the bin who sends a form again is restored.

<img src="/img/crm/form-on-timeline.png" alt="A booking form submission on a contact's timeline, with every answer and a note that the stored phone number was kept" width="794" />

### Turn bookings into deals or meetings

**Also create** makes each submission into something your team follows up:

- **A deal in the sales pipeline** (Sales pipeline module). It is named after the answer you pick under
  **Deal name from** (by default the first dropdown, such as the package) and the person's name, and starts
  in the first stage of the pipeline you choose. **Date from** sets its expected close date. If the chosen
  package has the same name as one of your [products](../sales/products-and-line-items.md), it is added as the
  deal's line, so the deal gets the product's price as its value.
- **A task, call or meeting** on the date the person chose, attached to the contact, with their answers in its
  notes. It appears on the [calendar](../sales/calendar.md) and in Tasks.

## Form Entries keeps every submission too

Whatever you switch on, every submission is also kept under **Unyson+ → Form Entries** with all of its fields,
as long as **Keep every submission as an entry** is on (it is by default). New fields you add to a form appear
there automatically, and the CSV export has a column for each.

## For developers

- Action `unysonplus_crm_form_submitted( $contact_id, $ctx, $created )` runs after a submission reaches the CRM.
- The [webhook](../developers/webhooks.md) event `form.submitted` sends the contact and every answer to another
  app, for example a booking system.
- The automation event is `crm.form_submitted`.
- The filter `unysonplus_crm_form_targets` adds contact fields to the **Save the answers** choices.

## Related

- [Custom fields](./custom-fields.md)
- [Lists, tags and segments](./lists-tags-segments.md)
- [Consent and privacy](./consent-and-privacy.md)
- [Pipelines and deals](../sales/pipelines-and-deals.md)
