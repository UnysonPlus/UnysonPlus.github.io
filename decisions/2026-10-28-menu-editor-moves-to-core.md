---
slug: menu-editor-moves-to-core
title: "Why did the admin menu editor move from the Admin Skin into core Workspaces?"
authors: [jon]
tags: [architecture, admin-ui, extensions]
date: 2026-10-28
description: A drag-and-drop admin menu sorter was asked for, and the Admin Skin already had a per-role menu layout that only worked with the skin on. Decision — one editor in core (Workspaces → Menus), applied on the server, with the skin lending its groups; the skin's saved layouts are imported.
---

**The question:** Workspaces let a role open to an app and keep a few WordPress menus. Could that become a full
drag-and-drop menu sorter, and where should it live?

<!-- truncate -->

## Context

The Admin Skin already had an Admin Menu tab: per role, an item's group, its order and whether it was hidden. The
order and groups were applied in the browser by the skin's own grouping pass, so they only existed while the skin
was on. Workspaces, in core, had a separate "menus to keep" list per role. Two tools were deciding what a role's menu
showed, and only one of them worked without the skin.

## Options considered

- **A new sorter beside the skin's tab.** Quickest to add, and the worst outcome: two editors writing two options
  about the same menu, with no rule for which wins.
- **Grow the skin's tab.** Keeps the code where it is, but a site without the skin, or a person who switches the skin
  off, would lose their menu, and workspaces would depend on a theme-like extension.
- **One editor in core, the skin lends its groups.** The order, names, icons and hidden items and sub-items are applied
  on the server to the menu WordPress prints, so they hold with or without the skin. When the skin is on, its groups
  become drop targets and a moved item is marked so the skin's grouping places it.

## Decision

The editor lives in core as **Workspaces → Menus** (`FW_Admin_Menu_Editor`). It replaces both the skin's Admin Menu
tab and the workspace "menus to keep" list. The skin answers one filter with its groups, and its tab now links to the
editor. Layouts saved in the skin are imported once, so nobody's menu changes.

## Why

- One source of truth for what a role's menu looks like, and it is the same with or without the skin.
- Server-side order also survives a plugin that turns on WordPress's own custom menu order: the same order is returned
  from that sort, last.
- Items are known by their `<li>` id, the key the skin already used, so the import is lossless and the browser and the
  server agree on every item.

*Status: Accepted.*
