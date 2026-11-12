---
sidebar_position: 3
title: "Automatic post digest emails from WordPress"
sidebar_label: "Post digest"
description: "Send subscribers a weekly or monthly email of your latest WordPress posts automatically with the Unyson+ CRM: choose the day, the audience, the sender and how many posts, and nothing is sent when nothing new was published."
keywords: [wordpress post digest email, weekly newsletter latest posts, rss to email wordpress, automatic newsletter wordpress, blog digest email]
---

# Post digest

A post digest is a recurring email of your latest posts, sent without you writing it each time. Set it up in
**CRM → Settings → Sending → Post digest**.

Tick **Send a post digest** to switch it on (it needs the Email marketing module).

- **How often**: every week on a chosen day, or every month on the 1st, from a chosen hour (by default every
  Monday from 9:00).
- **Posts**: posts, or any other public content type, and at most how many (5 by default, up to 20).
- **Audience**: a list, a tag and/or a segment (empty = everyone subscribed).
- **Sender**: which [sender](./senders-and-services.md) it comes from (the default for campaigns unless you choose
  another; shown once you have added a sender).
- **Subject** and **Opening line**. Tags such as `{{site_name}}` work in both.

Each time it is due, the posts published **since the last digest** become an ordinary campaign: each post with its
featured image, title, a short excerpt and a *Read more* link. The campaign is queued at once and shows up under
**Campaigns** with its own report. If nothing new was published, nothing is sent. The very first digest takes
the posts of the last week (or month, for a monthly digest).

**Save and send now** builds and queues one immediately from the posts since the last digest, which is a good way to
see what your readers will get.
