---
slug: remove-connect-ai-page
title: "Why remove the one-click Connect AI page when the AI Assistant has settings?"
authors: [jon]
tags: [ai-assistant, admin-ui]
date: 2026-10-22
description: Unyson+ had two AI screens — a core "Connect AI" page with a one-click setup, and the AI Assistant's own settings. The setup switched the theme and turned on ten extensions, three of which most sites never use. Decision — remove the page, keep its one useful part (a connection check) inside the AI Assistant's settings, and leave extensions to the Extensions screen or to the AI, which asks before turning one on.
---

**The question:** After activating the AI Assistant there were two settings pages for it: **Connect AI**
and **AI Assistant**. The Connect AI setup also turned on CRM, Post Types & Taxonomies and Custom Fields,
which not everyone needs. Is the Connect AI page worth keeping at all?

<!-- truncate -->

## Context

Connect AI lived in **core**, because the public download is core-only: on a fresh site the AI Assistant
is not installed yet. One button ran five steps:

1. switch to the Unyson+ Theme;
2. install and turn on ten extensions (including CRM, Post Types & Taxonomies, Custom Fields);
3. change "Plain" permalinks to "Post name";
4. let outside AI apps read and write;
5. test that an AI app could reach the connector.

Since then the AI Assistant gained a full Settings screen — access for outside AI programs, connection
passwords, roles — and the AI itself can install or turn on an extension after asking.

## Options considered

1. **Keep both pages.** Two places to set the same thing, and a button that changes the theme by surprise.
2. **Merge it as a "Setup" tab of the AI Assistant.** One menu, but the tab still repeats what the
   Settings tab does, and still bundles extensions most sites do not need.
3. **Remove it, and keep only what nothing else does.** Each of the five steps either already lives
   elsewhere or is a single check.

## Decision

Option 3.

- **Removed:** the Connect AI page, its theme switch and its fixed extension bundle.
- **Kept, in AI Assistant → Settings → Outside AI programs:** a **Check the connection** box. It tests
  permalinks (with a one-click switch from "Plain" to "Post name"), the access setting, the connector
  answering inside the site and from outside, the sign-in details AI apps look for, and public HTTPS.
  Each failed line says what to fix.
- **On a fresh core-only site:** a dismissible notice links to **Extensions**, where the AI Assistant
  installs in one click.
- **Extensions such as CRM, Post Types and Custom Fields** are turned on from the Extensions screen,
  or by the AI when a job needs one — it asks first.

## Why

- **One place for AI settings.** Two screens setting the same access option is how people end up unsure
  which one is true.
- **No surprise changes.** Switching the active theme and turning on unrelated extensions is a lot to
  hide behind one button, which is why that page needed a "use this on a fresh site" warning.
- **Install only what a site needs.** Most sites never use the CRM or custom post types. Turning them on
  for everyone adds menus and load for nothing, and the AI can turn one on the moment a build calls for it.
- **The check was the real value.** "Can an AI app on the internet actually reach my site, and if not,
  why?" is the question people get stuck on, so it stays, where the access setting itself lives.
