---
slug: workspaces-live-in-core
title: "Where should \"CRM mode\" live: in the CRM, in the Extensions manager, or in core?"
authors: [jon]
tags: [architecture, admin-ui, extensions]
date: 2026-10-28
description: A site run as a CRM still opened to the WordPress dashboard, with the CRM tucked inside the Unyson+ menu. Decision — a per-role "workspace" setting in core that each app-like extension registers with, instead of a CRM setting or an Extensions-manager switch.
---

**The question:** A team CRM was going to move onto a WordPress site running the Unyson+ CRM, but the site
would still feel like WordPress: it opens to the dashboard, and the CRM sits inside the Unyson+ menu. Should a
setting that turns the site into "CRM mode" (or "Membersite mode") and hides menus live in the CRM, or in the
Extensions manager?

<!-- truncate -->

## Context

The CRM, Membership and SEO already draw their screens in the admin app shell (`FW_Admin_App`): their own
sidebar, a top bar, the WordPress menu folded to icons, and a per-person focus mode that hides it. What was
missing was anything above one screen: where people land after login, which WordPress menus a role sees, and
whether the app is a top-level menu item at all.

## Options considered

- **A setting in the CRM.** Quick, and the CRM is the first app that needs it. But "Membersite mode" is the
  same mechanism pointed at a different app, so Membership would grow its own copy, and the next app another.
  Several extensions each hiding menus and redirecting logins would fight each other.
- **A switch in the Extensions manager.** That screen installs and switches extensions on and off, a one-off
  chore. What a site opens to, for which people, is a daily experience setting that needs roles, a landing
  page and menu choices; it does not fit a list of extensions.
- **Core owns it; apps register.** One screen (Unyson+ → Workspaces) decides, per role, what the site opens
  to and which menus stay. Each app-like extension only declares itself: name, icon, page, capability.

## Decision

Workspaces live in **core**. Extensions register with `fw_register_workspace()`; core does the per-role login
landing, the Dashboard redirect, the menu trimming, the trimmed admin bar, focus mode by default and the
optional top-level menu item. Choices are **per role**, so a sales team opens to the CRM while the owner keeps
WordPress, and administrators can always switch back from the admin bar.

## Why

- One mechanism, many apps: the CRM and Membership both register today, and a future app costs one call.
- Per role is what makes a "CRM site" real: the people who work in it never see WordPress, and the owner never
  loses it.
- It stays honest about security. Hiding a menu is presentation; access stays with roles and capabilities,
  which the CRM already has (CRM Manager, Sales Rep). The settings screen says so, and warns when a role is
  set to an app it cannot open.
- The app's page stays registered where it was. A promoted item links to the same address, so screen ids,
  hooks and bookmarks do not change.

*Status: Accepted.*
