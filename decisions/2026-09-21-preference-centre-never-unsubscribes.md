---
slug: preference-centre-never-unsubscribes
title: "Why the newsletter preference centre reuses the unsubscribe token, and why saving it never unsubscribes anyone"
authors: [jon]
tags: [architecture, extensions, security, storage-model]
date: 2026-09-21
description: "Giving subscribers a page to pick which lists they receive raised two small design questions with long tails: which credential opens the page, and what happens when someone unticks every list. The decision: the page is keyed by the existing never-expiring unsubscribe token rather than a new one, and saving is purely a list-membership edit — a person on zero lists is still a subscriber. Opting out of everything is a separate, explicit link to the unsubscribe endpoint."
---

**The question:** The Newsletter CRM had only two public endpoints — confirm and unsubscribe. With multiple lists, a subscriber needs a way to say "keep the product news, drop the offers" without leaving entirely. That page needs a credential in the email link, and it needs an answer to the obvious edge case: what does the CRM do when the reader unticks everything and presses Save?

<!-- truncate -->

## Context

Every email the CRM sends already carries `{{unsubscribe_url}}`, keyed by a per-subscriber token that never expires (an unsubscribe link in a two-year-old email must still work). The confirm token, by contrast, is single-purpose and consumed on use. The preference centre is a new public endpoint (`?fw-crm-preferences=<token>`) alongside those two, reachable from a new `{{preferences_url}}` placeholder.

The CRM's model is that list membership and subscription status are different things: `status` (`pending` / `subscribed` / `unsubscribed`) says whether the person may be emailed at all, and lists are a filter on top of that. A campaign sent to "everyone" reaches every subscribed person regardless of lists.

## Options considered

**Credential**

- *A dedicated preferences token.* Cleanest on paper — one token per purpose. But it is one more column, one more thing to rotate, and one more way for an old email's link to be dead. Nothing about it is more secure: whoever holds an email holds both links.
- *Reuse the unsubscribe token.* Same trust level (possession of the email), already in every footer ever sent, already never-expiring. Chosen.

**Empty save**

- *Treat "no lists" as "unsubscribe".* Feels helpful, and some tools do it. But it conflates two decisions, makes an accidental untick a status change the person must re-consent to undo, and silently removes them from "everyone" campaigns they never opted out of.
- *Saving only edits lists; unsubscribing is its own control.* A separate "Unsubscribe from all emails" link on the same page goes to the existing unsubscribe endpoint. Chosen.

## Decision

The preference centre is keyed by the unsubscribe token. GET renders every `list`-type list with the subscriber's membership ticked; POST calls `Service::set_membership()` add/remove per list and nothing else. A person left on zero lists keeps `status = subscribed`. An already-unsubscribed person sees a message rather than checkboxes — coming back is a signup with consent, not a checkbox on a page reached from an old email.

## Why

Two different questions deserve two different controls. "Which of your lists do I want?" and "Do I want to hear from you at all?" have different consequences under consent law and different undo paths, so a single Save button must not answer both. Reusing the token keeps the credential model to one sentence — *the token is the credential, possession of the email is the proof* — which is the same reasoning already used for RFC 8058 one-click unsubscribe.
