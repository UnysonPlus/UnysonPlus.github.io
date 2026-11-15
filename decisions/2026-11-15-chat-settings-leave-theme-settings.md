---
slug: chat-settings-leave-theme-settings
title: "Why did the Chat settings move out of Theme Settings onto their own page?"
authors: [jon]
tags: [extensions, theme-settings, storage-model, admin-ui]
date: 2026-11-15
description: "When the Chat extension gained an on-site live chat with an inbox, its settings moved from Theme Settings → Site-wide UX to Unyson+ → Chat, stored site-wide instead of with the theme."
---

## The question

"Do you think it's better to move the chat out of the theme settings and put it in the Unyson+
extension settings, like under the Unyson+ menu?" This came up while planning a live chat for the
Chat extension: visitors writing in a window on the site, the team answering from wp-admin.

<!-- truncate -->

## Context

Until then, Chat was a floating button that linked to WhatsApp, Messenger, SMS and email. Its
settings were a sub-tab of **Theme Settings → Site-wide UX**, stored in the theme's own options
(the `chat_button` group). That was reasonable for a small piece of site decoration.

The live chat changes what Chat is: it gains conversations, an inbox someone opens every day,
notifications, retention, privacy tools and an import / export. None of that fits inside Theme
Settings, and some of it (the inbox) is used by editors who should not need the theme's settings at
all.

## Options considered

1. **Keep the settings in Theme Settings, add an inbox page elsewhere.** No migration, but the
   settings and the conversations they control would live in two places, and the settings would
   still belong to the theme.
2. **Move everything to its own page under the Unyson+ menu, stored with the extension.** One page
   with Inbox, Settings and Import / Export tabs. Needs a one-time copy of existing values.
3. **Use the Extensions manager's generic settings form.** Site-wide storage for free, but no room
   for an inbox, and the form is not where people look for "my chats".

## Decision

Option 2. **Unyson+ → Chat** holds the inbox, the settings (Button, Channels, Live chat, AI
assistant) and Import / Export. The values are stored in the extension's own site-wide settings.
The first load after the update copies the old Theme Settings values across once; the old Theme
Settings sub-tab stays as a short note with a link to the new page.

## Why

- **Theme Settings are saved per theme.** Switching theme, or converting a site (the Site Converter
  activates a generated child theme), silently turned the chat off and lost its numbers and
  usernames. A contact channel is part of the business, not of the design, so it should survive a
  theme change.
- **The inbox needs a page anyway**, and the settings belong next to what they control.
- **People look for features by name.** "Where do I answer chats?" leads to a *Chat* menu item, not
  to Theme Settings › Site-wide UX.
- **It matches the other Unyson+ features with their own pages** (Mailer, SEO, Membership, Short
  Links), and keeps Theme Settings about how the site looks.
- The copy-once migration and the signpost tab mean no site loses its settings and nobody is left
  searching the old place.

*Status: Accepted (Chat 1.0.6).*
