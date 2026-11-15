---
title: "Free WordPress Live Chat and Floating Contact Button"
sidebar_label: "Overview"
sidebar_position: 1
description: "Free live chat for WordPress: visitors write in a chat window on your site and you answer from an inbox in wp-admin. WhatsApp, Messenger, Telegram, SMS and email stay one tap away."
keywords: [wordpress live chat free, wordpress chat plugin, live chat inbox wordpress, whatsapp button wordpress, messenger chat button wordpress, floating contact button wordpress]
---

# Chat

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Talk to your visitors while they're on your site.</p>
  <p class="ext-hero__sub">A floating button on every page. Turn on Live chat and it opens a real chat window: visitors write, you answer from an inbox in wp-admin. WhatsApp, Messenger, Telegram, SMS and email stay one tap away underneath.</p>
</div>

Chat adds a floating button to the corner of every page. It works in one of two ways, and you can
switch between them at any time.

<img src="/img/extensions/chat/live-window.png" alt="The live chat window on a site: a greeting, the visitor's question, the team's answer signed Sam, a message box and the Messenger, Text message and Email links underneath" width="410" />

## Two ways to use it

**Live chat** (since Chat 1.0.6). The button opens a chat window on your own site. Visitors type a
message without leaving the page, you answer it from the **Chat** inbox in wp-admin, and your reply
appears in their window a few seconds later. Your other channels are still offered underneath
("Or chat through" WhatsApp, Messenger, email…) for people who prefer them.
[How the window works →](./live-chat.md)

**Channels only.** The button links to the apps people already use: WhatsApp, Messenger, Telegram,
SMS, email or any link of your choice. With one channel, a tap opens that app directly; with several,
the button shows a small menu to pick from. No inbox, nothing stored on your site.
[About the channels →](./channels.md)

| | Live chat | Channels only |
| --- | --- | --- |
| Where the conversation happens | On your site, in a chat window | In WhatsApp, Messenger, the visitor's email app… |
| Where you answer | **Chat → Inbox** in wp-admin | In those apps |
| What the visitor needs | Nothing: no app, no account | The app for the channel they pick |
| Stored on your site | The messages, and the email / name / IP address the visitor gives | Nothing |
| Best for | Questions while people browse, sales, bookings, support | Businesses that already live in WhatsApp or Messenger |

## Set it up in two minutes

1. Activate **Chat** in **Unyson+ → Extensions** (it ships inactive).
2. Open **Chat** in the main admin menu (right under Comments) and go to the **Settings** tab.
3. **Button:** turn on **Enable**. Change the label, position and colours if you like.
4. **Live chat:** turn on **Live chat** and check the title, reply time and greeting.
5. **Channels:** turn on the channels you use and fill in each number, username, address or link.
6. **Save Changes.** The button appears on every page of the site.

Every option is explained in [Settings](./settings.md).

:::tip[💡 Web dev tip: say how fast you reply]
"We usually reply within a few hours" is honest and keeps people from leaving after a minute of
silence. If you're usually quicker, say so: a shorter promise makes more people write.
:::

## Where things are

Everything lives on one page, **Chat** in the main admin menu, with three tabs:

| Tab | What it's for | Who sees it |
| --- | --- | --- |
| **Inbox** | Reading and answering conversations. [Answering chats →](./inbox.md) | Editors and administrators |
| **Settings** | The button, the live chat window, the channels and the AI channel. [Settings →](./settings.md) | Administrators |
| **Import / Export** | Conversations and settings to and from a file. [Import / Export →](./import-export.md) | Administrators |

The menu item and the **Chat** item in the admin bar show how many conversations are waiting for a
reply.

## In this section

- [Live chat: what visitors see](./live-chat.md): the window, how replies arrive, the email prompt, phones.
- [Answering chats](./inbox.md): the inbox, replying, closing, notifications, who can answer.
- [Channels](./channels.md): WhatsApp, Messenger, Telegram, SMS, email, custom links and the AI channel.
- [Settings](./settings.md): every option on the Button, Live chat, Channels and AI assistant tabs.
- [Import / Export](./import-export.md): the CSV and JSON files, moving the chat to another site.
- [Privacy and spam protection](./privacy-and-spam.md): what is stored, for how long, and how spam is kept out.
- [For developers](./developers.md): hooks, REST routes, data tables and the AI tools.

## Coming from Theme Settings

Until Chat 1.0.6 the settings were in **Theme Settings → Site-wide UX → Chat Button**, where they
belonged to the theme: switching theme, or converting a site to a new child theme, lost them. They
now belong to the Chat extension itself, on the **Chat** page, and stay put whatever the theme.

- **Nothing to redo.** The first page load after the update copies your old settings across
  automatically: channels, numbers, usernames, label, position and colours.
- The old **Theme Settings → Site-wide UX → Chat Button** tab now only shows a link to the new page.
- Live chat starts **off** after the update, so the site looks the same until you turn it on.

Chat is a **site-wide** feature, not a page element: there's nothing to drop into the page builder.
