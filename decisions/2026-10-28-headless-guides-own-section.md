---
slug: headless-guides-own-section
title: "Should the headless WordPress guides live under the Headless extension, or in their own section?"
authors: [jon]
tags: [architecture, extensions]
date: 2026-10-28
description: The headless guides started as pages under the planned Headless extension. Decision — give them their own docs section at /headless, and keep one page for the extension itself.
---

**The question:** The headless pages began under `/extensions/headless/`. Should they stay there, or become
a section of their own, with the extension keeping a single page?

<!-- truncate -->

## Context

The section grew from a roadmap into a set of guides: how headless WordPress works, four tested
front-end examples (plain JavaScript or Next.js, with ACF + CPT UI or with Unyson+), GraphQL, custom
endpoints, hybrid pages and static export. Almost all of it works today without the Headless extension,
and half of it does not involve Unyson+ at all.

## Options considered

- **Keep everything under `/extensions/headless/`.** No move, but the address and sidebar say "you need
  this extension", which is not true, and the guides sit among dozens of extension pages where nobody
  searching for "headless WordPress" looks.
- **Give the guides their own section, like Guides, CRM and Membership already have.** Its own sidebar,
  short addresses (`/headless/nextjs-acf`), a footer link, and room for more guides. The extension keeps
  one page about what it will add.

## Decision

The guides are their own docs section at `/headless`, with the overview at `/headless` itself (not
`/headless/headless-wordpress`, which repeats the keyword). `/extensions/headless-wordpress` is a single page for the
planned extension and its roadmap, pointing to the guides. Every earlier address redirects.

## Why

The guides are about a way of building, not about a product feature, and they bring in search traffic
from people who have never heard of Unyson+. A section of their own describes them honestly, gives them
addresses that match what people search, and lets the Unyson+ option appear next to the common
alternatives, where it can be compared.
