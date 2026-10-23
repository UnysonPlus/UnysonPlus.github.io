---
sidebar_position: 4
title: "Marketing automation in the WordPress CRM: workflows, drip emails and follow-ups"
sidebar_label: "Automations"
description: "Build automations in the Unyson+ WordPress CRM: start on a form, tag, list, field change, date, deal stage, email open or purchase, then send emails, wait, branch with if / else, update records and create tasks. Includes ready-made recipes, goals, exit conditions, a test run and a run log."
keywords: [wordpress marketing automation, crm workflows wordpress, drip email wordpress, email automation plugin, welcome series wordpress, lead nurture automation, birthday email wordpress, wp-cli cron]
---

# Automations

An automation starts when something happens to a contact and then runs its steps for that contact: send an
email, wait, take a different path depending on what they did, change their tags or fields, create a task or a
deal, and more. Switch on **Automations** in **CRM → Modules**, then open **Marketing → Automations**.

## Start from a recipe

Five ready-made automations are one click away. Each is added as a **draft**, so you can check the emails
first:

| Recipe | What it does |
|---|---|
| **Welcome series** | Three emails over a week for every new subscriber. |
| **Lead nurture** | Two helpful emails to a new lead, then a call task for the owner if they opened either one. Stops when they become a customer. |
| **Quote or booking follow-up** | Thanks them at once, tells the owner, follows up after three days unless they have replied. |
| **Re-engagement** | Asks quiet subscribers if they still want your emails; tags them inactive if they do not open it. |
| **Deal follow-up** | When a deal reaches a stage, a task for the owner and a nudge email a week later, skipped if the deal is won. |

## The editor

The flow reads top to bottom: **Starts when** at the top, then the steps, then **End**. Click **+** between any
two steps to add one, and click a step to edit it in the panel on the right. A number on a step shows how many
contacts are waiting there right now.

### What can start it

Contact added, subscribed to email, form submitted, tag added or removed, joined or left a list, a field changed
(optionally *changed to* or *changed from* a value), a date reached (a birthday or renewal date field, on the day
or days before or after, optionally every year), a task completed, a deal created / moved to a stage / won /
lost, a campaign email opened or a link clicked, a reply by email, a support case opened and, with WooCommerce,
a purchase (optionally of one product or above an amount). Other extensions can add their own.

### Steps

- **Send an email**: *marketing* emails go only to subscribed contacts and carry an unsubscribe link;
  *transactional* ones (a confirmation, a reminder) go to anyone with an address. Tags like `{{first_name}}` work.
- **Wait**: for a while (minutes to weeks), until a day and time ("next Monday at 9:00"), or until a date on the
  contact (three days before their renewal).
- **If / else**: contacts who meet the conditions take the **Yes** path, everyone else **No**. Conditions can
  test tags, lists, email status, lifecycle stage, any field, a segment, the deal's stage, and whether they opened
  or clicked an email during this automation.
- **Random split**: path A or B by percentage, to compare two follow-ups.
- **Contact**: add or remove tags, add to or remove from a list, update a field.
- **Team**: create a task, notify someone by email, assign an owner in turns (round robin).
- **Deals**: create a deal, move the deal to another stage.
- **Flow**: call a webhook, start another automation, end the contact's other automations.
- **Goal**: when the goal happens to someone still on an earlier step (they book, buy, reply), they jump straight
  to it, so they stop receiving the chasing emails.

### Who goes through it, and when they leave

Under **Who and when**:

- **A contact can go through it**: once ever (the default), again once they have finished, or every time it is
  triggered.
- **They leave as soon as**: conditions checked before every step, such as *Lifecycle stage is Customer*.

## Safe by design

- **Editing a live automation** never breaks the people inside it: they finish the version they started, and your
  changes apply to everyone who enters from then on.
- **No endless loops.** Automations that set each other off are stopped after a few rounds, and the same contact
  cannot enter the same automation twice within a minute.
- **The same event never starts it twice** (a form entry, an order).
- **Test run**: on the editor page, enter a contact's email under **Test run for one contact**. The saved steps
  run straight away: waits are skipped and emails come to you instead of them, but tags, fields and deals really
  change on that contact.

## Activity and progress

**Activity** on each automation lists everything that happened: who entered, each step done, skipped (with the
reason, such as *not subscribed*) or failed, goals reached, who left and who finished. The list shows each
automation's numbers: inside now, finished, and problems. Every contact page has an **Automations** panel showing
which automations they are in and their next step, with a **Remove** link.

## Make the timing exact: a server cron job

WordPress runs scheduled work only when someone visits the site, so on a quiet site a one-hour wait can end
hours late. The Automations screen shows whether the scheduler is running on time and, when it is not, the exact
line to add to your host's cron jobs (in cPanel: *Cron Jobs*), for example:

```
*/5 * * * * wget -q -O - "https://example.com/wp-cron.php?doing_wp_cron" >/dev/null 2>&1
```

On a VPS with WP-CLI, run the CRM directly every minute:

```
* * * * * cd /path/to/site && wp crm automations run --quiet && wp crm queue run --quiet
```

Then add `define( 'DISABLE_WP_CRON', true );` to `wp-config.php`.
