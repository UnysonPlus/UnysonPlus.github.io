---
slug: crm-automation-registration
title: "How do other extensions plug their own triggers and actions into CRM Automations?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-10-14
description: "The Membership extension needs to register triggers (joined, renewed, payment failed…) and actions (grant a plan…) for an Automations engine that is not built yet. We settled on two registration filters and one event action, with slugs namespaced by extension, contact ids rather than objects, plain-value contexts and an optional dedupe key, so integrations can register today and the engine can be built against them later."
---

**The question:** The Membership extension asked how it should register automation triggers and
actions with the CRM: "Automations is still 'soon' in your modules list, so I need the registration
shape." It proposed two filters for triggers and actions and one action to fire when something
happens.

<!-- truncate -->

## Context

The CRM's Automations module (Phase 4) is planned but not built. It will store each contact's
progress through an automation as a row with a next-run time, so a wait of months costs nothing. It
will also log every run and guard against loops. The integrations registry (Phase 6) promises that
"extensions register themselves as CRM integrations: their own triggers and actions appear in
Automations… The CRM never needs to know about them in advance."

Membership is being built now, in parallel, and needs a stable shape to register against. Whatever we
choose has to survive the engine being written later. That means:

- everything a trigger passes along must be storable in a run row;
- actions must be safe to run from a background job;
- the same event arriving twice must not start the same automation twice.

## Options considered

**Wait for the engine.** No guessing, but Membership would ship without CRM automation hooks and
have to be revisited, and the engine would be designed without a real second consumer.

**A registry class with `register_trigger()` / `register_action()` methods.** Explicit, but it
forces load-order care: the registering extension must run after the CRM has loaded its class, and
calling it while the module is off needs guards everywhere.

**Two filters plus one event action (Membership's proposal).** These are WordPress's usual extension
points. Registering is harmless while Automations is off: the filters are simply never read. Firing
the event is harmless too, because nothing listens yet.

## Decision

Membership's proposal, with refinements so it fits the engine:

- **`unysonplus_crm_automation_triggers`**: `slug => { label, group, description?, fields?, match? }`.
  - `fields` are the options a person sets on the trigger (e.g. which plan), shaped like `key => { label, type: select|number|text, options? }`. `options` may be a callable, so choice lists load only when the editor opens.
  - By default an automation matches when every field it sets equals the event's context value (or is among the values chosen). An optional `match( $settings, $context )` callable replaces that rule.
- **`unysonplus_crm_automation_actions`**: `slug => { label, group, description?, settings, callback }`.
  - `callback( $contact_id, $settings, $context )` returns `true` or a `WP_Error`.
  - The engine catches errors and exceptions and records the step as failed with the reason.
  - Callbacks run in the background, with no logged-in user, so they must not rely on the current user.
- **`do_action( 'unysonplus_crm_automation_event', $trigger_slug, $contact_id, $context )`**: fired when something happens.
  - `$contact_id` is the CRM contact. The firing extension finds or links the contact first; an event with no contact is ignored.
  - `$context` holds plain values only (numbers, strings, arrays of those), because the engine stores it with the run.
  - An optional `$context['dedupe']` key, such as `renewed:{membership_id}:{period_end}`, makes a repeated event start nothing new.
- **Slugs are namespaced by extension**: `membership.joined`, `membership.grant_plan`. The CRM's own will be `crm.tag_added` and so on. `group` is the heading they appear under in the editor.

## Why

- Filters and an action are how every other CRM integration point already works (panels, timeline types, Home cards, the calendar). Using them again means an integration learns one pattern.
- Passing ids and plain values rather than objects is what lets a run sit in a table for a month and still be replayed correctly.
- The dedupe key is cheap to give at the source, which knows what makes an event unique. The engine cannot work that out after the fact.
- Dates such as a renewal date should be exposed as a **managed date field** on the contact, not as a trigger that fires "N days before". The engine's generic "date reached" trigger can then offer reminders before, on or after any date, for any extension's field.
