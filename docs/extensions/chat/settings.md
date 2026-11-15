---
title: "Chat settings reference"
sidebar_label: "Settings"
sidebar_position: 5
description: "Every Unyson+ Chat setting on the Button, Live chat, Channels and AI assistant tabs: what it does, its default, and how settings are stored."
keywords: [wordpress chat settings, live chat settings wordpress, chat button settings]
---

# Settings

**Chat → Settings** (administrators only) has four tabs. Change anything, then **Save Changes** at the
bottom: the button on the site updates straight away. The settings on all four tabs are saved together,
so you can switch tabs before saving.

<img src="/img/extensions/chat/settings-tabs.png" alt="The Settings tab's four sub-tabs: Button, Live chat, Channels and AI assistant" width="315" />

## Button

<img src="/img/extensions/chat/settings-button.png" alt="The Button tab: Enable switch, button label, position (bottom-right or bottom-left), background colour and icon / text colour" width="1672" />

| Setting | Default | What it does |
| --- | --- | --- |
| **Enable** | Off | Shows the button on every page. It appears once Live chat or at least one channel is on. Turning it off hides the button everywhere (conversations stay in the inbox). |
| **Button label** | Chat with us | Text next to the icon. Leave it empty for an icon-only button. Screen readers read the label (or the window title if there is none). |
| **Position** | Bottom-right | Bottom-right or bottom-left. The chat window opens above the button, on the same side. |
| **Background color** | Theme's primary colour | The button's colour. Pick one of your theme's colours (it follows the theme if you change it later) or any colour. |
| **Icon / text color** | White | The colour of the icon and label. |

The two colours are also used by the chat window: its header and the visitor's own messages. Pick a
pair with enough contrast (at least 4.5 : 1) so the label and messages stay readable.

When your theme has a back-to-top or dark-mode button in the same corner, they stack neatly above one
another instead of overlapping.

## Live chat

<img src="/img/extensions/chat/settings-live.png" alt="The Live chat tab: Live chat switch, window title, reply time, greeting, other channels label, ask for an email address, email notifications, the address to send them to, keep IP addresses and delete conversations after 90 days" width="1672" />

| Setting | Default | What it does |
| --- | --- | --- |
| **Live chat** | Off | The button opens a chat window on your site instead of the channel menu. See [Live chat](./live-chat.md). |
| **Window title** | Chat with us | The heading at the top of the window. |
| **Reply time** | We usually reply within a few hours | The line under the title, with a green dot. Empty hides it. |
| **Greeting** | Hi! Send us a message and we will answer right here. | The first message in the window. Empty shows no greeting. |
| **Other channels label** | Or chat through | The text before the channel links under the message box. Empty shows just the links. |
| **Ask for an email address** | When nobody has the inbox open, or no reply comes within 2 minutes | When the window asks visitors for an email address so replies can reach them after they leave. [The three choices →](./live-chat.md#asking-for-an-email-address) |
| **Email me about new messages** | On | An email when a visitor writes: at most one per conversation every 15 minutes, none while the inbox is open. [Details →](./inbox.md#being-told-about-new-messages) |
| **Send them to** | *(empty: the site's admin email)* | Where those emails go. Also the reply-to address of replies emailed to visitors. |
| **Keep visitors' IP addresses** | On | Stores each visitor's IP address with the conversation and shows it in the inbox, partly hidden until you click. Off: no IP address is stored for new conversations. |
| **Delete conversations after (days)** | 90 | Conversations are deleted this many days after their **last** message, checked once a day. `0` keeps them until you delete them. |

## Channels

WhatsApp, Messenger, Telegram, SMS / Text, Email and a Custom link, each with an on/off switch and its
details. What to enter for each one is on the [Channels](./channels.md) page.

## AI assistant

Only shown when the [AI Assistant](../ai-assistant/index.md#front-end-3--the-chat-ai-channel) extension is
active: the **Ask our assistant** channel, its label, greeting, notes, pages to leave out, daily limit,
team hours, conversation log and prices. Those settings are explained on the AI Assistant page.

## Where the settings are stored

The settings belong to the Chat extension and are stored for the whole site, so they **stay the same
when you change theme**. (Before Chat 1.0.6 they were part of the theme's settings; see
[Coming from Theme Settings](./index.md#coming-from-theme-settings).)

To copy the settings to another site, use **Download everything (JSON)** and import it there with
*Also replace the settings*. See [Import / Export](./import-export.md).

An AI agent connected through the AI Assistant can read and change these settings with the
`chat_settings` and `chat_settings_update` tools; every change it makes can be undone with `undo_change`.
