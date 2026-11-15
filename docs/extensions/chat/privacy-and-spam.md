---
title: "Live chat privacy and spam protection"
sidebar_label: "Privacy and spam"
sidebar_position: 7
description: "What the Unyson+ live chat stores, for how long, how visitors' data can be exported or erased with WordPress's privacy tools, and how spam and abuse are kept out."
keywords: [live chat gdpr wordpress, chat privacy policy wordpress, live chat spam protection, chat data retention wordpress]
---

# Privacy and spam protection

The live chat stores conversations on your own site, in your WordPress database. Nothing is sent to
an outside chat service. This page covers what is kept, for how long, and how spam is kept out.

## What is stored

Only when **Live chat** is on and a visitor writes. With *channels only*, nothing is stored: the
visitor goes straight to WhatsApp, Messenger and so on.

| Data | When | Shown to |
| --- | --- | --- |
| The visitor's messages and your replies | Always | Your team, in the inbox |
| Email address and name | Only if the visitor leaves them | Your team |
| IP address | Unless you turn *Keep visitors' IP addresses* off (Settings → Live chat) | Your team, partly hidden until clicked |
| Browser identification (e.g. Chrome on Windows) | Always | Your team |
| The page they wrote from | Always | Your team |
| Times of the conversation and messages | Always | Your team |
| Who on your team sent each reply | Always | Your team; visitors see the first name |

**In the visitor's browser** the chat keeps one small item in its local storage (not a cookie): a
random key for the conversation, the newest message it has seen, and whether the email question was
answered. The key is what lets the conversation follow them from page to page. Only a scrambled
version of it is stored on your site, so nobody can take over a conversation from the database.

The visitor's requests to your site carry no login cookies, so even a logged-in user chats as a
visitor.

## How long conversations are kept

**Delete conversations after (days)** (Settings → Live chat, 90 by default) deletes each conversation,
with all its messages, that many days after its **last** message. The check runs once a day. `0`
keeps conversations until you delete them yourself.

You can also delete any conversation straight away from the inbox (**Delete**). Turning Live chat
off, or deactivating the Chat extension, does **not** delete conversations: they stay in the
database. The daily clean-up only runs while the Chat extension is active, so delete old
conversations before deactivating it if you no longer want them.

## Visitors' rights (GDPR and similar laws)

The chat plugs into WordPress's own privacy tools, which find a visitor's conversations by the **email
address they left**:

- **Tools → Export Personal Data:** includes every conversation with that email: start time, name,
  email, IP address, browser, page and all messages.
- **Tools → Erase Personal Data:** deletes those conversations.

A visitor who never left an email address can't be found by these tools; find their conversation in
the inbox (search for a word they wrote, or their IP address) and delete it there.

## Your privacy policy

While Live chat is on, **Settings → Privacy → Policy Guide** offers a suggested paragraph under
"Unyson+ Chat" for your privacy policy: what the chat keeps and for how long (it uses your retention
setting). Copy it into your privacy policy page and adjust it to your situation. Mention the chat in
your cookie or privacy notice if your law requires telling visitors about local storage.

## Spam and abuse protection

A public message box attracts bots. The chat blocks most of them without bothering real visitors:

| Protection | What it does |
| --- | --- |
| **Hidden field** | The form has a field people can't see. Bots that fill in every field give themselves away, and the message is refused. |
| **A short pause** | The first message of a conversation is refused if it arrives within 1.5 seconds of opening the window: faster than a person can type. |
| **Message limit** | At most **10 messages a minute** from one IP address. |
| **New conversation limit** | At most **5 new conversations an hour** from one IP address. |
| **Length** | Up to **2,000 characters** a message. |
| **Plain text only** | HTML is removed from messages, so nothing a visitor types can run in your inbox or their window. |

A visitor who hits a limit sees a short message asking them to wait. If you still get spam from one
address, its IP is in the inbox: you can block it at your host or firewall.

Many visitors behind one shared connection (an office, a school, a mobile network) share one IP
address and so share these limits. They are set high enough not to matter for normal use.

## Email notifications

Notification emails to your team and replies emailed to visitors are sent through WordPress's normal
email. For reliable delivery, send them through a proper mail service with the
[Mailer](../mailer.md) extension or an SMTP plugin.
