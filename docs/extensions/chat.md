---
sidebar_position: 14
title: "Free WordPress Live Chat and Floating Contact Button"
sidebar_label: "Chat"
description: "Free live chat for WordPress: visitors write in a chat window on your site and you answer from an inbox in wp-admin. Also links to WhatsApp, Messenger, Telegram, SMS and email."
---

# Chat

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Talk to your visitors while they're on your site.</p>
  <p class="ext-hero__sub">A floating button on every page. Turn on Live chat and it opens a real chat window: visitors write, you answer from an inbox in wp-admin. WhatsApp, Messenger, Telegram, SMS and email stay one tap away underneath.</p>
</div>

Chat adds a floating button to every page of your site. It works in one of two ways:

- **Live chat** (new in 1.0.6): the button opens a **chat window on your site**. Visitors type a message
  without leaving the page, and you answer it from **Unyson+ → Chat → Inbox**. Your other channels are
  offered under the message box ("Or chat through" WhatsApp, Messenger, email…), for visitors who
  prefer them.
- **Channels only**: the button links straight to WhatsApp, Messenger, Telegram, SMS, email or any
  link. With one channel it opens that app directly; with several it shows a small menu to pick from.

Everything is on its own page, **Unyson+ → Chat**, with three tabs: **Inbox**, **Settings** and
**Import / Export**.

## What visitors see

<img src="/img/extensions/chat/live-window.png" alt="The live chat window on a site: a greeting, the visitor's question, the team's answer signed Sam, a message box and the WhatsApp, Messenger and email links underneath" width="410" />

- A **chat window** above the button: your title and reply time ("We usually reply within a few
  hours"), a greeting, the conversation, and a message box. **Enter** sends; **Shift+Enter** starts a
  new line.
- **Your answers appear in the window on their own**, signed with your first name. The window checks
  for new messages every 4 seconds while it's open.
- **The conversation follows the visitor around the site.** Their browser remembers it, so they can
  change page, close the window or come back tomorrow and carry on. If you answer while the window is
  closed, a red count appears on the button.
- **"Or chat through"** under the message box lists your other channels, so a visitor who'd rather
  use WhatsApp or email still can.

### Asking for an email address

A visitor might ask a question and leave before you answer. So the window can ask for an email
address:

<img src="/img/extensions/chat/live-email-prompt.png" alt="The chat window after a first message: a small form says we may not be at our desk and asks for an email address and an optional name, with Send me the reply and No thanks buttons" width="410" />

When they leave one, **your reply is also emailed to them** once they've left the site, so the
answer still reaches them. The address shows in the inbox next to the conversation.

When to ask is a setting (**Ask for an email address**):

| Choice | The window asks… |
| --- | --- |
| **When nobody has the inbox open, or no reply comes within 2 minutes** (default) | right after the first message if no one on your team has the inbox open; otherwise only if 2 minutes pass without an answer. |
| **After the first message, always** | every time a new conversation starts. |
| **Never** | never; replies are seen only in the chat window. |

## The inbox: answering chats

<img src="/img/extensions/chat/inbox.png" alt="Unyson+ → Chat → Inbox: a list of conversations on the left (Visitor 17 with an unread count, Jane (Visitor 16) with her email) and the open conversation on the right, with the visitor's email, IP address, page, browser and a reply box" width="1672" />

**Unyson+ → Chat → Inbox** lists every conversation, newest activity first:

- **"Visitor 16"**: each conversation gets a number. When the visitor leaves their name it reads
  **"Jane (Visitor 16)"**.
- Under it, the visitor's **IP address, partly hidden** (`203.0.x.x`) and their **email** if they
  gave one, then the last message.
- A **green dot** means the visitor is on the site now; a **red count** is the number of messages you
  haven't read.
- **All / Open / Closed** filter the list, and the search box finds words in messages, emails, names
  and IP addresses.

Click a conversation to open it. Above the messages you see the visitor's **email**, **IP address**
(click **Show full IP** to see all of it), the **page they wrote from**, their **browser** and
when they **started**. Type your answer and press **Enter** (or **Send**).

- **On the site now** / **Has left the site** tells you whether they'll see your reply straight away.
  If they've left and gave an email address, the reply is emailed to them too (the inbox says so).
- **Close conversation** moves it to *Closed* when it's done. A new message from the visitor reopens
  it. **Delete** removes it for good.
- The inbox refreshes every 5 seconds. While it's open, visitors' windows count you as **online**.

**Where you get told about new messages:**

- **Unyson+ → Chat** in the admin menu, and **Chat** in the admin bar, show how many conversations
  are waiting for a reply.
- **An email** for a new message, at most one per conversation every 15 minutes, and none while
  someone has the inbox open (setting: **Email me about new messages**).

**Who can answer:** editors and administrators (anyone who can edit pages). **Settings** and
**Import / Export** are for administrators only.

## Set it up

1. Activate **Chat** from **Unyson+ → Extensions** (it ships inactive).
2. Open **Unyson+ → Chat → Settings**.
3. **Button** tab: turn on **Enable** and, if you like, change the label, position and colours.
4. **Channels** tab: turn on the channels you use (WhatsApp, Messenger…) and fill in each one's
   number, username, address or link. With Live chat on, these appear under the message box.
5. **Live chat** tab: turn on **Live chat** and check the title, reply time and greeting.
6. **Save Changes.** The button appears on every page.

<img src="/img/extensions/chat/settings-tabs.png" alt="The Settings tab's four sub-tabs: Button, Channels, Live chat and AI assistant" width="315" />

:::tip[💡 Web dev tip: say how fast you reply]
"We usually reply within a few hours" is honest and keeps people from leaving after a minute of
silence. If you're usually quicker, say so: a shorter promise makes more people write.
:::

## Settings

### Button

| Setting | What it does |
| --- | --- |
| **Enable** | Shows the button on every page. With Live chat off, at least one channel must be on for it to appear. |
| **Button label** | Text next to the icon ("Chat with us"). Empty = icon only. |
| **Position** | Bottom-right or bottom-left. |
| **Background color / Icon / text color** | The button's colours. The chat window's header and the visitor's messages use the same colours. By default they follow your theme's primary colour. |

### Channels

| Channel | Opens |
| --- | --- |
| **WhatsApp** | A WhatsApp chat with your number, with an optional pre-filled message. |
| **Messenger** | Your Facebook page on Messenger (the username after facebook.com/). |
| **Telegram** | Your Telegram username. |
| **SMS / Text** | A text message to your number. |
| **Email** | A new email to your address, with an optional subject. |
| **Custom link** | Any link: a booking page, `tel:`, `viber://`, a help desk. |

### Live chat

<img src="/img/extensions/chat/settings-live.png" alt="The Live chat settings: Live chat switch, window title, reply time, greeting, other channels label, ask for an email address, email notifications, the address to send them to, keep IP addresses and delete conversations after 90 days" width="1672" />

| Setting | Default | What it does |
| --- | --- | --- |
| **Live chat** | Off | The button opens the chat window instead of the channel menu. |
| **Window title** | Chat with us | The heading of the window. |
| **Reply time** | We usually reply within a few hours | The line under the title. Empty hides it. |
| **Greeting** | Hi! Send us a message… | The first message visitors see. |
| **Other channels label** | Or chat through | The text before the channel links under the message box. |
| **Ask for an email address** | When nobody has the inbox open… | See [Asking for an email address](#asking-for-an-email-address). |
| **Email me about new messages** | On | One email per conversation every 15 minutes at most, none while the inbox is open. |
| **Send them to** | the site's admin email | Where those emails go. Replies emailed to visitors use it as their reply-to address. |
| **Keep visitors' IP addresses** | On | Stores each visitor's IP address and shows it in the inbox (partly hidden until you click). Off stores none. |
| **Delete conversations after (days)** | 90 | Conversations are deleted this many days after their last message (checked once a day). 0 keeps them until you delete them. |

### AI assistant

With the [AI Assistant](./ai-assistant/index.md#front-end-3--the-chat-ai-channel) extension active, a
fourth tab adds an **Ask our assistant** channel that answers visitors from your published pages.
In Live chat it is listed with the other channels under the message box.

## Import / Export

<img src="/img/extensions/chat/import-export.png" alt="Unyson+ → Chat → Import / Export: download conversations as CSV or everything as JSON, and import a CSV or JSON file, optionally replacing the settings" width="800" />

**Unyson+ → Chat → Import / Export** saves your conversations and settings to a file and reads them
back:

- **Download conversations (CSV):** one row per message (conversation number, visitor, name, email,
  IP, page, browser, status, started, sender, author, message, time), to open in a spreadsheet.
- **Download everything (JSON):** every setting and every conversation, to move the chat to another
  site or keep a backup.
- **Import** takes either file back. Conversations get new numbers on the receiving site, but their
  messages, senders, names, emails and times are kept exactly. A conversation that's already there is
  skipped, so importing the same file twice adds nothing. Tick **Also replace the settings** to bring
  the settings in too (JSON only).

Times in both files are in UTC. Both files contain visitors' personal data, so store them carefully.

## Privacy

Live chat stores what a visitor writes, the name and email they choose to give, their IP address
(unless you turn that off), their browser's name and the page they wrote from.

- Conversations are deleted automatically after the number of days you set (90 by default).
- **Tools → Export Personal Data** and **Tools → Erase Personal Data** find conversations by the
  email address the visitor gave.
- A suggested paragraph for your privacy policy is added to **Settings → Privacy** while Live chat
  is on.

The visitor's browser keeps a random key for the conversation (in its local storage, not a cookie),
so nobody else can read it.

## Limits and spam protection

- A message can be up to **2,000 characters**, plain text.
- From one IP address: at most **10 messages a minute** and **5 new conversations an hour**.
- A hidden field and a short wait after opening the window stop most automated spam.
- Replies reach a visitor through **polling** (the window asks the site every few seconds), so it
  works on any normal hosting without an extra service. A reply takes up to 4 seconds to appear in
  an open window, and the inbox shows new messages within 5 seconds.
- "Online" means someone on your team has the **inbox page open**; there's no separate status
  switch.

## Coming from Theme Settings

Until Chat 1.0.6 the settings were in **Theme Settings → Site-wide UX → Chat Button**, where they
belonged to the theme: switching or converting a site to another theme lost them. They now live on
**Unyson+ → Chat** and stay put whatever the theme. The first page load after the update **copies
your old settings across automatically**; the old Theme Settings tab now only links to the new page.

## For developers

- **Hooks:** `fw_ext_chat_channels` (add, remove or reorder channels; an *action* channel fires the
  `upw-chat:action` DOM event), `fw_ext_chat_settings_fields` (add settings; they land in the matching
  tab by key prefix), `fw_ext_chat_channel_svg` (an icon for your own channel key),
  `fw_ext_chat_capability` (who may answer chats; default `edit_pages`) and `fw_ext_chat_visitor_ip`
  (read the IP from a trusted proxy header).
- **Reading settings:** `fw_ext( 'chat' )->get_option( 'chat_live_enable' )` returns `'yes'` / `'no'`
  for switches.
- **REST routes** under `unysonplus-chat/v1`: `send`, `poll` and `contact` for the visitor window, and
  `admin/threads`, `admin/thread/<id>` (+ `/reply`, `/status`, `DELETE`) for the inbox.
- **AI tools** (with the AI Assistant): `chat_settings`, `chat_settings_update`,
  `chat_conversations` and `chat_reply`, so an AI agent can set up the chat, read conversations and,
  with your OK, answer them.
