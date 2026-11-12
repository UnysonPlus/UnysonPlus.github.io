---
sidebar_position: 10
title: Membership and the CRM
description: How the Unyson+ Membership extension connects to the Unyson+ CRM — one person, one contact; plans mirrored to tags; CRM conditions in access rules; membership events on the timeline and in automations — and what each extension needs from the other.
---

# Membership and the CRM

:::tip Built
The connection described here is built (Membership 1.0.9): it switches itself on while the CRM is active, with
its options under **Membership → Settings → CRM connection**, including **Bring every member up to date in the
CRM now**, a button that brings every existing member into the CRM at once. For a step-by-step guide to setting it up and every option, see
[The CRM connection](./running-your-site/crm-connection.md).
:::


Membership and the [CRM](/crm) are separate extensions that are made to work together. Membership works
without the CRM (plenty of members sites need no CRM), and the CRM works without Membership. When both are
on, Membership's **CRM module** switches on by itself and joins them into one system: every member is a
contact, the contact page shows their memberships, access can follow CRM tags, lists and segments, and
membership events drive CRM automations.

## What the connection does

### One person, one contact

- When someone gets a membership, Membership finds the CRM contact with that email address, or creates one,
  and links it to their WordPress user. Someone who was already a newsletter subscriber keeps their history.
- The CRM's contacts already have a place for this link; a contact gets a WordPress user only when the person
  needs to log in.
- A contact already linked to someone else is never taken over, and a duplicate contact is never created.
- Name and email changes travel one way, from the WordPress account to the contact: an edit in the CRM never
  changes the address someone logs in with.

### Plans mirrored to tags

- Each plan maps to a CRM tag, created for you and named like *Member: Gold* (its slug is the **Plan tags start
  with** prefix plus the plan's slug, `member-gold` by default). Optionally, contacts also get a **Member** tag
  while they have access and a **Former member** tag after.
- The tags are worked out again from the person's memberships after every change, so they are added and removed
  as memberships start and end and cannot drift. Membership only adds and removes its own tags, never a
  contact's others.
- **The membership record stays the source of truth; the tag is a mirror.** Tags alone drift: in a plugin we
  studied that used tags as the only record, cancelling or resetting left tags behind and people kept access.

### CRM conditions in access rules

With the CRM on, the **Who can see it** side of an access rule gains **CRM tags, lists and segments**:

- **With any of these CRM tags**, **On any of these CRM lists**, **In any of these CRM segments**
- combined with plans, roles and login state in the same rule: passing any one ticked choice is enough

Segments are checked by the CRM's own segment engine, so a segment means the same thing in both extensions. A
tag added by a CRM automation (say, after someone attends a webinar) can open content without any membership
plan at all. CRM conditions never pass in a **View as** preview, which has no real person behind it.

### The timeline and the contact page

- Joined, trial started, renewed, payment failed, payment recovered, plan changed, paused, resumed, cancelled,
  reactivated, ended and refunded each land on the contact's timeline, and so does every payment.
- The contact page gets a **Membership** panel: each plan with its status and dates, the total paid, and **Open
  the member page**.
- A **Members** card on the CRM home shows the members with access, how many joined and left in the last 30
  days and what was taken, with **Open Membership**. The CRM sidebar gets a **Membership** link.
- Optionally, a failed renewal adds a follow-up task for the contact's owner.

### Automations

Membership registers its own triggers and actions with the CRM's automations, each with a **Plan** choice:

| Triggers | Actions |
| --- | --- |
| Member joined a plan | Give a membership plan (for a number of days, or the plan's own length) |
| Member started a free trial | Extend a membership |
| Membership renewed | Cancel a membership |
| Renewal payment failed | |
| Membership cancelled | |
| Membership ended | |
| Member changed plan | |

Together with the CRM's own steps (send an email, wait, branch, tag, create a task), these cover the common
membership flows: an onboarding series, a failed-payment sequence and a win-back offer after a membership ends.
Renewal and end dates are also on the contact as fields (below), for the CRM's own date-based triggers.

### Member value in segments

Each contact carries managed membership fields, kept up to date by Membership and read-only in the CRM:
**Membership status** (Member, Former member or Waiting), **Membership plans**, **Member since**, **Membership
renews on**, **Membership ends on** and **Total paid for membership**. Segments and filters can use them
directly, for example *members for over a year* or *renews in the next 7 days*, and those segments become
campaign audiences.

### Emails

Member emails are Membership's own (edited under **Membership → Emails**) and sent through `wp_mail()`, with or
without the CRM.

## How it is built

The connection follows one rule from the CRM's design: **other extensions use the CRM's public API and
events, never its tables.**

The CRM side of the connection is built (since CRM 1.0.43 and 1.0.44):

| Membership needs | The CRM provides |
| --- | --- |
| Find a member's contact, or link one | `FW_CRM_Contacts::find_by_user()`, `id_for_user()` (one cached query, for every page view), `link_user()` and `unlink_user()`, which refuse to link a contact that belongs to someone else |
| Create the contact at registration | `FW_CRM_Contacts::create()`, which finds an existing contact by email instead of making a duplicate |
| Mirror plans to tags | `FW_CRM_Lists::get_or_create()` with `managed_by => 'membership'`, then `FW_CRM_Tags::add()` and `remove()`. Managed tags are locked in the CRM, so staff cannot break the mirror by hand |
| Tag, list and segment conditions in access rules | `FW_CRM_Contacts::user_has()` and `FW_CRM_Segments::contact_matches()` |
| Plan, status and renewal date on the contact | Managed custom fields, written with `FW_CRM_Fields::set_values()` and filterable in segments ("Gold members past due", "renews in the next 7 days") |
| Timeline entries | `FW_CRM_Activity::log()` with Membership's own types, labelled through `unysonplus_crm_activity_types` |
| A Membership panel on the contact page | The `unysonplus_crm_contact_panels` filter |
| A card on the CRM home, a link in the CRM sidebar | `unysonplus_crm_dashboard_cards` and `unysonplus_crm_nav` |
| React when a contact changes | `unysonplus_crm_contact_updated`, which passes the old and new value of every changed field |
| Triggers and actions in automations | The `unysonplus_crm_automation_triggers` and `unysonplus_crm_automation_actions` filters, and `unysonplus_crm_automation_event` to fire a trigger |

In the other direction, the CRM listens to Membership's documented events
(`unysonplus_membership_joined`, `_renewed`, `_cancelled`, `_expired` and the rest, plus
`unysonplus_membership_changed` for all of them, each with the same arguments) rather than reading
Membership's tables. Email changes travel one way only, from the WordPress account to the contact: an edit
in the CRM never changes the address someone logs in with.

## When the CRM is off

Everything in the [core](./index.md#what-every-site-gets-the-core) still works. Access rules use plans,
roles and login state; profile fields are stored on the WordPress user. Switching the CRM on later links each
member to a contact the next time their membership changes; **Bring every member up to date in the CRM now**
under **Membership → Settings → CRM connection** does them all at once.
