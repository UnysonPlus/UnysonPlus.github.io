---
slug: sell-templates-not-prompts
title: "Why sell landing page templates instead of prompts?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-11-18
description: "Looking at prompt libraries for AI site builders as a paid product, we chose to sell Unyson+ starter sites and landing page templates instead, bought once and downloaded from build.unysonplus.com, imported with a free Starter Sites import and personalised with the AI Assistant. No license key in the plugin."
---

## The question

"I want to replicate a prompt-library site using Unyson+'s WordPress framework. We can offer paid
premium subscriptions on a new subdomain like build.unysonplus.com. I mean we can just give them
prompts, right?" Then: "I think it would be better if we're just going to sell these as landing page
templates. No need for prompts. They can just use the prompt to modify it. We can sell the bundled
shortcodes and templates files, right?"

<!-- truncate -->

## Context

Prompt libraries sell copyable prompts, with a live preview of each design, that people paste into AI
site builders. Unyson+ is free and already has a page builder template format, a Template Library that
installs templates (with their photos) in one click, a Membership extension with plans and PayPal /
Stripe payments, and an AI Assistant that edits pages on request.

## Options considered

1. **A prompt library on Unyson+.** Possible (a post type, previews, a copy button, Membership for paid
   access), but the result of a prompt varies by AI builder, the customer still builds and hosts the site
   elsewhere, the category is crowded, and none of it grows Unyson+.
2. **Prompts plus a matching Unyson+ section.** Better, but still two products to make and test.
3. **Unyson+ landing page templates.** Finished pages and sections, installed from wp-admin, looking
   exactly like the preview, personalised by hand or with the AI Assistant.

## Decision

Sell **access to a library of Unyson+ landing page templates** (free plugin, paid templates) at
build.unysonplus.com: Free, Pro, Agency and possibly Lifetime plans through the Membership extension; a
license key that unlocks Pro templates in every site's Template Library; templates built only from
built-in elements and presets; any truly new element shipped as an extension, not loose shortcode files.
Installed templates keep working after a plan ends.

## Why

- **A template is a finished, trustworthy product**: it installs exactly as previewed, every time. A
  prompt is instructions whose outcome depends on someone else's tool.
- **The AI is used where it helps most**: after install, to make the page the buyer's own ("make it
  about my bakery"). That needs no prompt library.
- **It grows Unyson+**: every buyer becomes an Unyson+ site, and the free templates in every Template
  Library are the way in.
- **Most of it exists already**: the template format, one-click install with photos, Membership
  payments, the AI Assistant. The new work is license keys and a private catalog.
- **Built-in elements only** keeps templates working through every update and editable by the AI;
  extensions, not loose shortcode files, when a new element is unavoidable.
- **Selling access fits the GPL**: buyers may share GPL files, so the value is the growing library,
  updates, one-click install and support. Letting installed templates keep working after a plan ends
  matches that and builds trust.

## Update: no license key in Unyson+, and Starter Sites instead

The first plan delivered Pro templates through a **license key** entered in the Template Library, with
locked templates until then. The answer to that: "I don't want to put license key input on the Unyson+
plugin. It makes the whole plugin a freemium." A key field, locks and "Get Pro" buttons would make Unyson+
look like a "lite" plugin and change how the whole framework is seen.

So the plugin gets nothing commercial at all. Instead it gains a free **Starter Sites** import / export
in the Template Library, the modern successor of the original Unyson "Backups & Demo Content" demo
importer (the question that led there: "doesn't the original Unyson have a demo import extension? I think
we can update or have a modern version of that"). The old importer restores a full database backup and
replaces the site; Starter Sites imports a light, data-only package (pages, the look, header and footer,
menus, forms, photos), lets you choose what to bring over, never overwrites existing pages, and can be
undone. Its export is how the kits are made, and how anyone moves a design between their own sites.

The store sells **starter sites** (whole small websites) as well as landing page templates, as
members-only downloads on build.unysonplus.com; no license system is needed. Plan limits (own sites on
Pro, client work on Agency) are terms of use, not technical locks. The old demo importer stays in Backups
& Demo Content for themes that rely on it.

## Update: buy each kit once, no subscriptions

Then the plans themselves: "Can we just make it purchase to download? No need for plan? It's not like
people would want a subscription for a website he will only install once and use forever." Agreed: a
person building one site wants one kit, once, and a subscription only adds friction and the worry of
what happens on cancelling. So each kit is **bought once and downloaded forever, with free updates to
it** (suggested $29-59 a starter site, $15-25 a landing page, three kits free). An "All kits" bundle for
freelancers and agencies comes later, only if they ask for it.

That also changes the store's tool: per-item digital sales with a cart, downloads in My Account and the
order email, coupons and tax are what **WooCommerce** does, through the Unyson+ WooCommerce extension.
The Membership extension, the right tool for plans and subscriptions, is no longer needed for the store.

*Status: Accepted, as updated. Plan: Template Library → Roadmap.*
