---
sidebar_position: 2
title: Membership and the CRM
description: How the Unyson+ Membership extension connects to the Unyson+ CRM — one person, one contact; plans mirrored to tags; CRM conditions in access rules; membership events on the timeline and in automations — and what each extension needs from the other.
---

# Membership and the CRM

Membership and the [CRM](/crm) are separate extensions that are made to work together. Membership works
without the CRM (plenty of members sites need no CRM), and the CRM works without Membership. When both are
on, Membership's **CRM module** switches on by itself and joins them into one system: every member is a
contact, the contact page shows their memberships, access can follow CRM tags and segments, and membership
events drive CRM automations and campaigns.

## What the connection does

### One person, one contact

- When someone registers, Membership finds the CRM contact with that email address, or creates one, and
  links it to the new WordPress user. Someone who was already a newsletter subscriber keeps their history.
- The CRM's contacts already have a place for this link; a contact gets a WordPress user only when the person
  needs to log in, which is exactly what registration is.
- Email changes on either side stay in sync, and a duplicate contact is never created.
- Consent given on the registration form goes into the CRM's consent log with the wording the person saw.
- Profile fields can be stored as CRM contact fields, so a member's details live in one place.

### Plans mirrored to tags

- Each plan maps to a CRM tag (created for you, such as *Member: Gold*) and optionally to a list.
- The tag is added when a membership starts and removed when it ends, and a nightly check corrects any
  drift.
- **The membership record stays the source of truth; the tag is a mirror.** Tags alone drift: in a plugin we
  studied that used tags as the only record, cancelling or resetting left tags behind and people kept access.

### CRM conditions in access rules

With the CRM on, the **who** side of an access rule, and the Members fields on every element, gain CRM
conditions:

- has tag (any / all / none of), is on a list, is in a segment
- lifecycle stage, contact field values, lead score
- combined with plans, roles and login state in the same rule

These are evaluated by the CRM's own filter engine, the same one behind its segments, campaign audiences and
automation conditions, so there is one rule language across both extensions. A tag added by a CRM automation
(say, after someone attends a webinar) can open content without any membership plan at all.

### The timeline and the contact page

- Joined, trial started, renewed, payment failed, payment recovered, plan changed, paused, cancelled and
  expired each land on the contact's timeline.
- The contact page gets a **Membership** panel: current plans and status, payments, and buttons to grant,
  extend or pause a plan.
- A **Members** card on the CRM home shows members, revenue and churn at a glance.

### Automations and campaigns

Membership registers its own triggers and actions with the CRM's automations:

| Triggers | Actions |
| --- | --- |
| Member joined (any plan or a chosen plan) | Grant a plan (for a set time or until revoked) |
| Trial ending in N days | Extend a membership |
| Renewal due in N days | Pause or resume a membership |
| Payment failed / recovered | Revoke a plan |
| Plan changed (upgrade or downgrade) | Send a coupon |
| Cancelled / expired | |
| Drip content unlocked | |
| Inactive for N days | |

Together with the CRM's own steps (send an email, wait, branch, tag, create a task), these cover the common
membership flows without extra plugins: an onboarding series, a trial-to-paid nudge, a failed-payment
sequence, a win-back offer after expiry, and a check-in task for a high-value member who has gone quiet.

### Member value in segments

Each contact carries a membership summary: plan, status, member since, monthly revenue and lifetime value.
Segments can use it directly, for example *Gold members past due* or *members for over a year who never
upgraded*, and those segments become campaign audiences.

### Emails

Member emails are sent through `wp_mail()` either way. With the CRM on, they are designed in the CRM's email
builder from its template gallery, so receipts and reminders match the newsletters.

## How it is built

The connection follows one rule from the CRM's design: **other extensions use the CRM's public API and
events, never its tables.**

| Membership needs | The CRM provides | CRM roadmap |
| --- | --- | --- |
| Find or create a contact; link a WordPress user | The public PHP API, `fw_crm()`, and the contact-user link | Phase 6 · Public PHP API; Ready for the Membership extension |
| Add and remove tags and lists; check tag, list and segment membership | The same API | Phase 6 · Public PHP API |
| Rule conditions on tags, lists, segments and fields | The shared filter engine | Phase 1 · Rule-based segments |
| Timeline entries and the contact-page panel | Integrations registry (timeline types, contact panels, fields) | Phase 6 · Integrations registry |
| Triggers and actions in automations | Integrations registry and the automation engine | Phase 4 · Automations; Phase 6 · Integrations registry |
| Plan, status and value per contact | Purchase summaries | Phase 6 · Purchase summaries |
| A card on the CRM home | Dashboard widget registry | Phase 6 · Dashboard widget registry |
| Listen to contact changes (email changed, contact deleted) | The events catalogue | Phase 6 · Events catalogue |

In the other direction, the CRM listens to Membership's documented events (one per status change, all with
the same payload) rather than reading Membership's tables.

The CRM already has the foundations: contacts carry a WordPress user link, a relations table links any two
kinds of record (a membership attaches to its contact there), there is an activity timeline, and the CRM
fires an event for each contact, tag and list change. What is still to come is the public API and the
registries in CRM phase 6. So the order of work is:

1. Membership phases 1 to 3 (plans, access, accounts, payments) need nothing from the CRM.
2. CRM phase 6's **public API**, **events catalogue**, **integrations registry** and **Membership link** are
   built next, alongside them.
3. Membership phase 4, the CRM module, is then built on those, with no shortcuts into CRM tables.

## When the CRM is off

Everything in the [core](./index.md#what-every-site-gets-the-core) still works. Access rules use plans,
roles and login state; profile fields are stored on the WordPress user; member emails use Membership's own
simple templates. Switching the CRM on later links existing members to contacts in one background pass.
