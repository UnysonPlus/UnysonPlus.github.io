---
sidebar_position: 2
title: "Sender profiles and email services (SendGrid, Mailgun, Postmark, Brevo, Amazon SES)"
sidebar_label: "Senders and email services"
description: "Choose who CRM email comes from and how it is sent: sender profiles with their own From name, address and Reply-To, marketing and transactional email kept apart, and sending through SendGrid, Mailgun, Postmark, Brevo or Amazon SES with bounces and complaints reported back."
keywords: [wordpress sendgrid newsletter, mailgun wordpress crm, postmark wordpress, brevo wordpress, amazon ses wordpress newsletter, transactional vs marketing email, email sender profiles, bounce webhook]
---

# Senders and email services

**CRM → Settings → Sending** decides who CRM email comes from and how it is sent.

## Two kinds of email

| Kind | What it covers |
|---|---|
| **Marketing** | campaigns and the post digest |
| **Transactional** | double opt-in confirmations, welcome emails, one-to-one email from a contact's page, and case replies |

Each kind has its own **default sender**, so newsletters can come from *news@* through an email service while
confirmations and replies come from *hello@* through your normal mail. Keeping them apart also protects the emails
people are waiting for: a spam complaint about a newsletter never hurts the delivery of a confirmation or a support
reply.

## Sender profiles

**Add a sender** with:

- a **name** for you (Newsletter, Support…);
- the **From name** and **From address** readers see;
- an optional **Reply-To**;
- **Send with**: the site's own mail (the Mailer extension, or any SMTP plugin) or one of the email services below.

The first sender you add becomes the default for both kinds; change that under the table. A campaign can pick any
sender in its **From** setting. **Send a test** sends a short email with the sender you choose, so you can check it
arrives before a campaign does. One-to-one email keeps the writer's own name as the From name.

The From address must be one your mail host or email service is allowed to send for (a verified domain), or the
email will be rejected or filed as spam.

## Email services

Shared hosting limits how many emails a site may send, and mail sent by a web server often lands in spam. An email
service fixes both. Supported:

| Service | What you need |
|---|---|
| **SendGrid** | an API key with Mail Send access |
| **Mailgun** | an API key, the sending domain, the region (US or EU), and optionally the webhook signing key |
| **Postmark** | the server API token, and optionally the message stream for campaigns (usually `broadcast`) |
| **Brevo** | an API key |
| **Amazon SES** | an access key ID, a secret access key and the region |

Open the service under **Email services**, paste the details and save; keys are stored encrypted. Then choose the
service on a sender. Until a service is set up, a sender that uses it falls back to the site's own mail, and the
table says so.

Mailgun and Amazon SES are used here without attachments, so an email with an attachment (such as a form's PDF
copy) goes through the site's own mail instead.

### Bounces and complaints come back

Each service shows a **webhook address**. Paste it into the service's webhook or event settings (for Amazon SES,
subscribe it to the SNS topic your configuration set sends bounce and complaint notifications to; the subscription
is confirmed automatically). From then on:

- a **hard bounce** marks the contact *bounced*,
- a **spam complaint** marks them *complained*,
- an **unsubscribe** made at the service unsubscribes them in the CRM,

and none of them is sent another campaign. Soft bounces are counted in the campaign report without changing the
contact.
