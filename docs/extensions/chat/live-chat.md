---
title: "Live chat on your WordPress site: what visitors see"
sidebar_label: "Live chat"
sidebar_position: 2
description: "How the Unyson+ live chat window works for visitors: sending a message, replies arriving, conversations that follow them across pages, the unread badge, the email prompt, and phones."
keywords: [wordpress live chat window, chat widget wordpress, website chat box wordpress, live chat email capture, chat without app wordpress]
---

# Live chat: what visitors see

With **Live chat** on (Chat → Settings → Live chat), the floating button opens a chat window on your
site. This page follows a visitor through it. For the team's side, see [Answering chats](./inbox.md).

## The window

<img src="/img/extensions/chat/live-window.png" alt="The live chat window: header with title and reply time, the greeting, the visitor's question on the right, the team's answer on the left signed Sam, the message box, and Messenger, Text message and Email links at the bottom" width="410" />

From top to bottom:

| Part | Comes from | Notes |
| --- | --- | --- |
| **Title** | Live chat → *Window title* ("Chat with us") | |
| **Reply time** with a green dot | Live chat → *Reply time* | Leave it empty to hide the line. |
| **Greeting** | Live chat → *Greeting* | Shown as the first message every time the window opens. It is not stored and you don't see it in the inbox. |
| **The conversation** | | The visitor's messages on the right in your button colour; yours on the left, signed with your **first name** (your display name if you have no first name) and the time. |
| **Message box** | | Up to 2,000 characters. **Enter** sends; **Shift+Enter** starts a new line. The box grows as they type, up to a few lines. |
| **Or chat through** | Your [channels](./channels.md) | Every channel you have turned on, as small links. Leave *Other channels label* empty to show only the links. |

The header and the visitor's messages use the button's colours (Settings → Button), which follow your
theme's primary colour unless you choose others.

## Sending a message

1. The visitor clicks the button, types and presses **Enter** (or the send arrow).
2. The message appears straight away, slightly faded until the site confirms it, then solid.
3. If it could not be sent (no connection, or too many messages too fast), it turns red, a short note
   explains why, and the text is put back in the box so it can be sent again.

The first message starts a **new conversation**. In your inbox it appears as **"Visitor 12"**, with
the page they wrote from.

## How replies arrive

There is no "refresh" button: the window asks your site for new messages on its own.

| Window | Checks for replies every |
| --- | --- |
| Open | 4 seconds |
| Closed, on the same page | 30 seconds |
| Browser tab in the background | 60 seconds |

So a reply appears in an open window within about 4 seconds. If the window is closed, a **red count**
appears on the button within half a minute; opening the window shows the reply and clears the count.

This works on any ordinary WordPress hosting, with no extra service or server to set up.

## The conversation follows the visitor

The visitor's browser remembers their conversation, so they can:

- go to another page and open the window again: the whole conversation is there;
- close the tab and come back tomorrow: same conversation, with any replies you sent meanwhile
  (and the red count on the button if they haven't seen them);
- write again days later: the message joins the same conversation in your inbox.

It is remembered **per browser**. On another device, or after clearing their browsing data, a visitor
starts a new conversation. If you **delete** a conversation, or it is deleted after the
[retention period](./privacy-and-spam.md#how-long-conversations-are-kept), their window simply starts
fresh next time.

Nothing about the conversation is in the page itself, so it works the same with page caching.

## Asking for an email address

A visitor might ask a question and leave before you answer. So the window can ask for an email
address:

<img src="/img/extensions/chat/live-email-prompt.png" alt="The chat window after a first message: a small form says we may not be at our desk and asks for an email address and an optional name, with Send me the reply and No thanks buttons" width="410" />

- **Send me the reply** saves the address (and the name, if given). The window says "Thanks! We will
  reply here and by email." In your inbox the conversation shows the email, and the name replaces
  "Visitor 12" ("Jane (Visitor 12)").
- **No thanks** closes the form. It is not asked again in that browser.
- After they leave the site, **each reply you send is also emailed to them**, so the answer reaches
  them anyway. While they are still on the site (their window has checked in within the last
  minute), replies are not emailed: they see them in the window.

When the form appears is up to you (Settings → Live chat → **Ask for an email address**):

| Choice | The form appears… |
| --- | --- |
| **When nobody has the inbox open, or no reply comes within 2 minutes** (default) | right after the first message if nobody on your team has the inbox open. If someone does, only when 2 minutes pass without an answer while the window is open. |
| **After the first message, always** | after the first message of every new conversation. |
| **Never** | never. Replies reach the visitor only in the chat window. |

"Someone has the inbox open" means a team member's **Chat → Inbox** page has refreshed within the
last 2 minutes. See [Answering chats](./inbox.md#online-and-away).

## On phones

On screens narrower than about 520 px, the window fills the width of the screen, above the button, and
uses most of its height. The message box uses a 16 px font so iPhones don't zoom in when it's tapped.

## Keyboard and screen readers

- **Tab** reaches the button; **Enter** or **Space** opens the window and puts the cursor in the box.
- **Esc** closes the window and returns focus to the button.
- New messages are announced by screen readers (the conversation is a live region).
- The window respects *reduce motion*: no open/close animation.

## With the AI assistant

With the [AI Assistant](../ai-assistant/index.md#front-end-3--the-chat-ai-channel) extension active and its
channel on, **Ask our assistant** is listed with the other channels under the message box. It opens
the assistant's own window, which answers from your published pages. The live chat (a person
answering) and the assistant are separate conversations.

## Turning live chat off

Turn **Live chat** off and the button goes back to linking to your [channels](./channels.md).
Existing conversations stay in the inbox (until the retention period), and visitors with an open
conversation simply see the channel menu instead.
