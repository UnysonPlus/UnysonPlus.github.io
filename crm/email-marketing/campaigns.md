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

- **Editor**: choose the **Visual editor** for a short note, or the **Email builder** for anything designed.
- **Email builder**: drag blocks (logo, heading, text, image, button, divider, spacer, menu, social links, hero,
  video, table, footer and HTML) onto the canvas, and change a block's width to put blocks side by side in
  columns. They are compiled to email-safe HTML that works in Outlook and on
  phones. Personal tags such as `{{first_name}}` and `{{site_name}}` fill in per reader.
- **Templates**: start from Announcement, Newsletter digest, Product promotion, Welcome, **Follow-up**, Event
  invitation or Plain letter, or save your own design as a template and reuse it.
- **Preview** shows the email exactly as it will be sent, on desktop and phone widths and as plain text.

## Choose who gets it

Under **Send to**, pick a **list**, a **tag** and/or a **segment** (leave them empty for everyone subscribed). The
screen shows how many people the campaign matches. Only people who are **subscribed** are ever sent a campaign:
pending, unsubscribed, bounced and complained addresses are left out automatically, even if they match.

## Send

**Send now**, **Schedule** for later, or **Send a test** to yourself first. Sending happens in small batches in the
background, so a big list never hits your host's time limit. Set a **speed limit** per campaign to spread a big send
over time. Choose **From** to send it with a [sender](./senders-and-services.md) other than the default.

A campaign that is sending or scheduled can be **paused** from the Campaigns list and **resumed** later. WordPress
runs the sending only when the site has visitors, so on a quiet site use **Run sending now**, or a server cron job
(see [Automations](./automations.md#make-the-timing-exact-a-server-cron-job)). The overall pace and batch size are
in CRM → Settings → Campaign sending.

Once a campaign starts sending it can no longer be edited, so everyone receives the same email.

Every campaign carries an unsubscribe link and the one-click unsubscribe headers mailbox providers require. People
can also choose which lists they are on from the **preference page** linked in every email, and new signups confirm
their address first when double opt-in is on (CRM → Settings).

## Results

The campaign report shows how many people opened and clicked, the most-clicked links, opens and clicks by hour,
unsubscribes, bounces and spam complaints, and the latest activity. Clicks from corporate link scanners are filtered out. A hard bounce or a spam complaint stops all
further campaigns to that address.

## Smart links: tag the people who click

A link can **tag the contact who clicks it**, so a click on *See pricing* puts that person in a *pricing* segment or
starts a follow-up.

- On a **Button** block, fill in **Tag on click** (for example `interested-in-pricing`; separate several with
  commas).
- On any other link, add `#crm-tag=your-tag` to the end of its address.

The tag is added only when a person clicks (not a link scanner), and the marker is removed from the address before
the reader is sent on, so nobody ever sees it. Smart links need **click tracking** on (CRM → Settings).
