---
title: "Answer website chats from your WordPress dashboard"
sidebar_label: "Answering chats"
sidebar_position: 3
description: "The Unyson+ Chat inbox: see every visitor conversation with their page, browser and IP address, reply from wp-admin, get notified of new messages, close and search conversations."
keywords: [wordpress live chat inbox, reply to website chat wordpress, chat notifications wordpress, live chat admin wordpress]
---

# Answering chats

Visitors' messages arrive in **Chat → Inbox**: **Chat** is in the main admin menu, right under
Comments. For what the visitor sees, see [Live chat](./live-chat.md).

<img src="/img/extensions/chat/inbox.png" alt="The Chat inbox: a list of conversations on the left (Visitor 17 with an unread count, Jane (Visitor 16) with her email) and the open conversation on the right, with the visitor's email, IP address, page, browser and a reply box" width="1672" />

## The conversation list

Every conversation, newest activity first. Each row shows:

- **The visitor:** "Visitor 16", a number given when the conversation starts. If they leave their name
  with their email, it reads "**Jane (Visitor 16)**".
- **A green dot** while the visitor is on your site (their window checked in within the last minute).
- **When** the last message was sent ("now", "5 min. ago", "2 days ago").
- **Their IP address, partly hidden** (`203.0.x.x`), and their **email** if they gave one.
- **The last message.** Your own replies start with "You:".
- **A red count** of messages you haven't read yet. Unread conversations are in bold.

Above the list:

- **All / Open / Closed** shows every conversation, or only the open or the closed ones.
- **Search** finds a word in any message, or a name, an email address or (part of) an IP address.
  Results update as you type.

## Reading a conversation

Click a conversation to open it on the right. Opening it marks it **read** (its count disappears from
the list, the menu and the admin bar).

The bar at the top shows the visitor and **On the site now** or **Has left the site**. Below it:

| Detail | What it tells you |
| --- | --- |
| **Email** | The address they left, as a link to write to them directly. |
| **IP address** | Partly hidden; **Show full IP** reveals it. Useful to spot the same person writing from different browsers, or spam. Not shown if you turned *Keep visitors' IP addresses* off. |
| **Writing from** | The page they last wrote from, as a link (opens in a new tab). |
| **Browser** | Browser and system, e.g. "Chrome · Windows", "Safari · iOS". |
| **Started** | When the conversation began. |

Messages read top to bottom: the visitor's on the left, yours on the right with the name of whoever
on your team sent it, each with date and time. Small yellow notes in the middle are for your team only
(for example "Left an email address for the reply: jane@example.com"); the visitor never sees them.

## Replying

Type in the box at the bottom and press **Enter** (or **Send**). **Shift+Enter** starts a new line.

- If the visitor is **on the site now**, the reply appears in their window within about 4 seconds.
- If they **have left and gave an email address**, the reply is also emailed to them. The inbox says
  "Sent, and emailed to the visitor." The email comes from your site, with the reply-to address set
  to *Send them to* (Settings → Live chat), so if they answer the email, it reaches you.
- If they **have left without an email address**, a note says so: they will see your reply when they
  next open the chat on your site, in the same browser.

Replies are plain text, up to 2,000 characters. Links are shown as text.

## Closing, reopening and deleting

- **Close conversation** when it's done. It moves to the *Closed* filter and stops counting as waiting.
  If the visitor writes again, it reopens on its own.
- **Reopen** puts a closed conversation back among the open ones. Replying to a closed conversation
  also reopens it.
- **Delete** removes the conversation and all its messages for good (it asks first). The visitor's
  window starts a new conversation next time.

Conversations are also deleted automatically some time after their last message (90 days by default;
see [Privacy](./privacy-and-spam.md#how-long-conversations-are-kept)).

## Being told about new messages

- **The menu:** **Chat** in the admin menu shows the number of conversations waiting for a reply, and so
  does **Chat** in the admin bar (on the site too, when you're logged in). The browser tab title of the
  inbox shows it as well, e.g. "(2) Chat".
- **Email:** with *Email me about new messages* on (the default), you get an email when a visitor writes:
  the message, the page and a link straight to the conversation. At most **one email per conversation
  every 15 minutes**, and **none while someone has the inbox open**, so an active conversation doesn't
  flood your mailbox. Emails go to *Send them to*, or to the site's admin email address.

Emails are sent with WordPress's normal email (`wp_mail`), so they follow the [Mailer](../mailer.md)
extension's settings, or an SMTP plugin, if you use one.

## Online and away

There is no status switch. **You count as online while the Chat inbox is open** in a browser tab
(it refreshes every 5 seconds, which tells the site someone is there), and for 2 minutes after.

While someone is online:

- visitors' windows don't ask for an email address straight away (with the default setting);
- new-message emails are not sent, since someone is already watching.

To be "away", just close the inbox tab.

## Who can answer

- **Editors and administrators** (anyone who can edit pages) see the **Chat** menu and can read and
  answer conversations. They see only the **Inbox** tab.
- **Administrators** also see **Settings** and **Import / Export**.
- Several people can have the inbox open at once: each reply is signed with its author's name, and
  the list refreshes for everyone.

A developer can change who answers with the `fw_ext_chat_capability` filter
([For developers](./developers.md#who-can-answer)).

## Answering with an AI agent

With the [AI Assistant](../ai-assistant/index.md) extension, an AI agent connected to your site can read
the inbox (`chat_conversations`) and draft or send replies (`chat_reply`). It's told to show you a reply
and get your OK before sending, because a reply reaches a real visitor and can't be taken back.
