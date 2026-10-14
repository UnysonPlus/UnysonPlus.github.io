---
slug: crm-app-inside-wp-admin
title: "Why does the CRM fold the WordPress menu instead of replacing wp-admin?"
authors: [jon]
tags: [admin-ui, extensions, architecture]
date: 2026-10-14
description: "The CRM should feel like a SaaS CRM, with its own sidebar and top bar. Opening it folds the WordPress menu to icons, and an optional per-user focus mode hides the menu completely, with Back to WordPress in the CRM sidebar. Everything stays one admin page inside wp-admin, so permissions, notices, plugins and the admin skin keep working."
---

**The question:** "Do you think we can make a full interface of the CRM like the attached? I mean the main WordPress Dashboard menu will be hidden and swapped with the CRM menu? Then there should just be a link or icon that says back to WordPress, or if better the WordPress menu would automatically collapse if CRM is clicked."

<!-- truncate -->

## Context

A CRM is somewhere people spend whole working days: a sales rep lives in the contact list, the
profile and the pipeline. Hosted CRMs give it a full-screen app with its own navigation. In WordPress
the CRM is one admin page under **Unyson+**, so by default it sits inside the WordPress sidebar,
one menu among twenty, with its own areas squeezed into tabs.

## Options considered

1. **Tabs on a normal admin page** (what it had). Familiar, but the CRM's own areas (contacts,
   companies, deals, tasks, campaigns, reports) don't fit in one row of tabs, and the WordPress menu
   takes the left edge the CRM needs.
2. **Replace wp-admin with a separate screen** (its own route or a full-screen React app outside
   the admin). Looks most like a hosted CRM, but loses everything WordPress gives an admin page
   for free: capability checks, admin notices, the admin bar, other plugins' hooks, the Unyson+ admin
   skin and its dark mode. It also needs its own login landing and its own way back.
3. **Hide the WordPress menu always on CRM screens**, with only a Back to WordPress link. Clean,
   but it is surprising the first time and takes away the quickest way to the rest of the site for
   people who use the CRM now and then.
4. **Fold the WordPress menu to icons on CRM screens, and offer a focus mode that hides it.**

## Decision

Option 4. The CRM is still one admin page (`fw-crm`), drawn inside an app frame: its own sidebar
(Home, Contacts, Companies, Deals, Tasks, Calendar, Campaigns, Lists & segments, Reports, Import /
Export, Settings) and a top bar with search and a New menu.

- **Opening the CRM folds the WordPress menu** to its icons (the core `folded` state), so the CRM
  sidebar gets the room, and leaving the CRM gives the menu back.
- **Focus mode**, switched in the CRM sidebar and remembered per user, hides the WordPress menu
  completely. **Back to WordPress** is always in the CRM sidebar.
- Areas not built yet stay in the sidebar marked **Soon**, and their page says what they will do, so
  the shape of the CRM is visible from the first release.

## Why

- **Both answers to the question, in order of surprise.** Folding is the gentle default that
  everyone gets; hiding is a choice for people who live in the CRM. Neither strands anyone.
- **It stays a WordPress admin page**, so roles and capabilities, notices, the admin bar, the admin
  skin's light and dark modes, and every other plugin keep working with no extra code.
- **Extensible the same way as the rest of the CRM.** Modules and companion extensions (Membership,
  for one) add their own sidebar areas through a filter and render them on an action, instead of
  adding more WordPress menu items.
- **Small screens work by default.** On a phone the CRM sidebar becomes a slide-in menu next to the
  WordPress one, and focus mode is hidden there because WordPress already hides its menu.
