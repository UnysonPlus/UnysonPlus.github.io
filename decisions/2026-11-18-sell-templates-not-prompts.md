---
slug: sell-templates-not-prompts
title: "Why sell landing page templates instead of prompts?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-11-18
description: "Looking at prompt libraries for AI site builders as a paid product, we chose to sell Unyson+ landing page templates instead: installed from wp-admin with a license key and personalised with the AI Assistant, at build.unysonplus.com."
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

*Status: Accepted. Plan: Template Library → Roadmap.*
