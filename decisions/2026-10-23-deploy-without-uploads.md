---
slug: deploy-without-uploads
title: "Why must an AI-built site reach its host without the owner uploading anything?"
authors: [jon]
tags: [ai-assistant, site-creator, architecture]
date: 2026-10-23
description: Putting a redesigned homepage on a managed host took four manual uploads — a plugin, a parent theme, a child theme and a one-time seed plugin — because the AI connection could not install a theme from data, could not write theme files on that host, and could not create content beyond pages. Decision — close those three gaps in the AI Assistant, keep niche features (casino reviews) in the child theme rather than turning them into extensions, and give the AI Dev Kit thin clients that only package and call the new tools.
---

**The question:** A redesigned homepage reached a WP Engine dev site only after the owner uploaded four
zips by hand. That cannot work once the site creator builds sites for people who never open
Appearance → Themes. What has to change so nobody uploads anything?

<!-- truncate -->

## Context

Everything that could go through the MCP connection did: Theme Settings, presets, patterns, dividers,
media, the page itself, the front-page setting, the animations. Four things could not:

- **The plugin and parent theme updates** — the site simply did not have the fixes yet.
- **The child theme** — `create-child-theme` failed on the host with "Could not write the theme files",
  and `install-theme` only takes a public `.zip` URL.
- **The content the homepage reads** — the casino reviews with their review fields and logos, the latest
  posts, the author and reviewer accounts, the menus, the affiliate short links. No tool creates them, so
  they went in a one-time "seed" plugin the owner had to upload, activate and delete.

## Options considered

1. **Move the casino features (review post type, toplist shortcodes) into an installable extension**,
   so `manage-extension` could fetch them from GitHub. Rejected: casino reviews are a niche; an extension
   in the general catalogue for one vertical is clutter for everyone else. They stay in the child theme.
2. **Ask for SFTP or a host API.** Rejected as the default: it is per-host, needs credentials the site
   creator should never hold, and was always meant as the last resort.
3. **Close the gaps in the AI Assistant itself** — install a theme from data sent in pieces, fix theme
   file writes on managed hosts, and add content tools (any post type with its fields, users, menus,
   short links) — then let the kit only package and send.

## Decision

Option 3. AI Assistant roadmap phases 28–30 add the plugin tools; phase 31 adds the kit's `push-theme`,
`export-content`, `push-content` and `push-file`, which do no work on the site themselves. Plugin and
parent-theme fixes still arrive through the normal release updater — that is not a manual upload.

## Why

The child theme is where site-specific code belongs, so the fix is to make the child theme *deliverable*,
not to move niche code out of it. Doing every write through one set of plugin tools means the AI
Assistant chat, an outside agent and the site creator all behave the same, with the same permission
checks and the same undo. The only things left for the owner are two one-time switches (allow outside
AI programs; allow PHP writes) — settings, not uploads.
