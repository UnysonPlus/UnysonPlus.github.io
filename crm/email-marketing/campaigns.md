---
sidebar_position: 1
title: "Email campaigns and newsletters in the WordPress CRM"
sidebar_label: "Campaigns and the email builder"
description: "Write email campaigns in the Unyson+ CRM's block email builder, start from a template, send to a list, tag or segment at a safe pace, and see opens, clicks and bounces. Includes smart links that tag the contacts who click."
keywords: [wordpress newsletter plugin, email campaigns wordpress, email builder wordpress, newsletter templates, email marketing crm, smart links tag on click, double opt-in wordpress]
---

# Campaigns and the email builder

Switch on **Email marketing** in **CRM → Modules**, then open **Marketing → Campaigns → New campaign**.

## Write it

- **Email builder**: drag blocks (heading, text, image, button, columns, social links, divider, spacer, table,
  video, menu, logo and footer) onto the canvas. They are compiled to email-safe HTML that works in Outlook and on
  phones. Personal tags such as `{{first_name}}` and `{{site_name}}` fill in per reader.
- **Templates**: start from Announcement, Newsletter digest, Product promotion, Welcome, **Follow-up**, Event
  invitation or Plain letter, or save your own design as a template and reuse it.
- **Preview** shows the email exactly as it will be sent, on desktop and phone widths and as plain text.

## Choose who gets it

Pick a **list**, a **tag** or a **segment**. Only people who are **subscribed** are ever sent a campaign: pending,
unsubscribed, bounced and complained addresses are left out automatically, even if they match.

## Send

**Send now**, **Schedule** for later, or **Send a test** to yourself first. Sending happens in small batches in the
background, so a big list never hits your host's time limit. Set a **speed limit** per campaign to spread a big send
over time. Choose **From** to send it with a [sender](./senders-and-services.md) other than the default.

Once a campaign starts sending it can no longer be edited, so everyone receives the same email.

Every campaign carries an unsubscribe link and the one-click unsubscribe headers mailbox providers require. People
can also choose which lists they are on from the **preference page** linked in every email, and new signups confirm
their address first when double opt-in is on (CRM → Settings).

## Results

The campaign report shows how many people opened and clicked, the most-clicked links, opens by hour, bounces and
spam complaints. Clicks from corporate link scanners are filtered out. A hard bounce or a spam complaint stops all
further campaigns to that address.

## Smart links: tag the people who click

A link can **tag the contact who clicks it**, so a click on *See pricing* puts that person in a *pricing* segment or
starts a follow-up.

- On a **Button** block, fill in **Tag on click** (for example `interested-in-pricing`; separate several with
  commas).
- On any other link, add `#crm-tag=your-tag` to the end of its address.

The tag is added only when a person clicks (not a link scanner), and the marker is removed from the address before
the reader is sent on, so nobody ever sees it. Smart links need **click tracking** on (CRM → Settings).
