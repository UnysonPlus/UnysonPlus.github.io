---
title: "WhatsApp, Messenger, Telegram, SMS and email buttons for WordPress"
sidebar_label: "Channels"
sidebar_position: 4
description: "Add WhatsApp, Facebook Messenger, Telegram, SMS, email or any link to the Unyson+ Chat button: what each channel needs, how the button behaves with one or several, and how they appear under the live chat."
keywords: [whatsapp button wordpress, whatsapp chat wordpress free, messenger button wordpress, telegram button wordpress, click to text wordpress, floating contact button]
---

# Channels

Channels are the apps visitors can reach you on: WhatsApp, Messenger, Telegram, text message, email
or any link. Turn them on in **Chat → Settings → Channels**.

<img src="/img/extensions/chat/settings-channels.png" alt="The Channels tab: a switch and the details for WhatsApp, Messenger, Telegram, SMS / Text, Email and a Custom link" width="1672" />

## How the button uses them

**With Live chat off**, the button is made of your channels:

- **One channel on:** the button opens it directly. One tap and the visitor is in WhatsApp (or
  Messenger, their email app…).
- **Several channels on:** the button opens a small menu, and the visitor picks one.

<img src="/img/extensions/chat/channels-chooser.png" alt="The channel menu above the Chat with us button: Messenger, Text message and Email" width="232" />

- **No channel on:** the button doesn't appear.

**With Live chat on**, the button opens the chat window, and every channel you've turned on is listed
under the message box, after "Or chat through". See [Live chat](./live-chat.md).

Channels appear in this order: WhatsApp, Messenger, Telegram, SMS, Email, Custom link. A channel that
is switched on but has no number, username or address is left out.

## The channels

### WhatsApp

| Setting | What to enter |
| --- | --- |
| **WhatsApp** | On / off. |
| **WhatsApp number** | Your full international number, **digits only**: country code, then the number, without `+`, spaces, dashes or a leading 0. For example `447700900123` for a UK mobile, `639171234567` for the Philippines. Any `+`, spaces or dashes are removed for you. |
| **WhatsApp prefilled message** | Optional. Text already typed in the visitor's WhatsApp when it opens, e.g. "Hi! I have a question about…". They can change it before sending. |

Opens `https://wa.me/<number>`: the WhatsApp app on phones, WhatsApp Web or the desktop app on
computers. It works with both WhatsApp and WhatsApp Business numbers.

### Messenger

| Setting | What to enter |
| --- | --- |
| **Messenger** | On / off. |
| **Messenger username** | Your Facebook **page** username: the part after `facebook.com/` in your page's address, e.g. `john-doe` for `facebook.com/john-doe`. A leading `@` or `/` is removed for you. |

Opens `https://m.me/<username>`: a Messenger conversation with your page. Your page must have
messaging turned on in its Facebook settings.

### Telegram

| Setting | What to enter |
| --- | --- |
| **Telegram** | On / off. |
| **Telegram username** | Your Telegram @username, with or without the `@`. |

Opens `https://t.me/<username>`.

### SMS / Text

| Setting | What to enter |
| --- | --- |
| **SMS / Text** | On / off. |
| **SMS number** | The number that receives texts, ideally in international form, e.g. `+14155550100`. Spaces and dashes are removed for you. |

Opens the phone's messaging app with your number filled in (an `sms:` link). On a computer it opens
whatever app handles text messages there, if any, so it's most useful for phone visitors.

### Email

| Setting | What to enter |
| --- | --- |
| **Email** | On / off. |
| **Email address** | Where emails go. It must be a valid address, or the channel is left out. |
| **Email subject** | Optional. The subject already filled in, e.g. "Question from the website". |

Opens the visitor's email app with a new message to you (a `mailto:` link). The address is written
into the page in a disguised form so simple spam bots don't harvest it.

### Custom link

| Setting | What to enter |
| --- | --- |
| **Custom link** | On / off. |
| **Custom link label** | The name shown for it, e.g. "Viber", "Call us", "Book a call". "Chat" if left empty. |
| **Custom link URL** | Any web address (`https://…`) or app link: `tel:+14155550100` for a phone call, `viber://chat?number=…`, a booking page, a help desk. |

A web address on another site opens in a new tab; a link to your own site opens in the same tab.

## The AI assistant channel

With the [AI Assistant](../ai-assistant/index.md#front-end-3--the-chat-ai-channel) extension active, the
**AI assistant** tab adds an **Ask our assistant** channel. It opens a separate window where an AI
answers from your published pages, and offers your other channels when it can't help. It's listed
first, before WhatsApp.

## Which channels to offer

:::tip[💡 Web dev tip: fewer choices, faster contact]
Offer the one or two channels you actually answer quickly. A menu of six options makes people stop and
think; one obvious way to reach you gets more messages. With a single channel and Live chat off, the
button skips the menu entirely and opens it straight away.
:::

Developers can add channels of their own (a different app, a phone call button with its own icon);
see [For developers](./developers.md#add-a-channel).
