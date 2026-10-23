---
sidebar_position: 5
title: "Lead scoring and site activity in the WordPress CRM"
sidebar_label: "Lead scoring and site activity"
description: "Score leads in the Unyson+ WordPress CRM: points for email opens and clicks, page visits, forms, purchases, logins, tags, fields and custom events, named scores per product, scores that fade, the pages known contacts visit (with consent), and segments and automations by score."
keywords: [lead scoring wordpress, wordpress crm lead score, track page visits known contacts, website visitor tracking crm, marketing qualified lead wordpress, custom events tracking wordpress]
---

# Lead scoring and site activity

Lead scoring gives contacts points for what they do, so the warmest leads come first. Switch on **Lead scoring and
site activity** in **CRM → Modules**, then open **Marketing → Lead scoring**.

## Rules

Each rule gives (or takes away) points when a contact:

| Does this | "Only when" narrows it to |
|---|---|
| Visits a page | an address containing, e.g. `/pricing` |
| Opens a campaign email / clicks a campaign link | one campaign |
| Submits a form | one form |
| Makes a purchase (WooCommerce) | an order total of at least an amount |
| Logs in | |
| Gets a tag | one tag, e.g. `not-interested` with negative points |
| Has a field set to a value | `field = value`, e.g. `lifecycle_stage = lead` |
| Does a custom event | a value |

**At most** caps how many times one contact can earn a rule (visiting pricing pages counts twice, not forty
times). Rules count from the moment you add them; removing one keeps the points already earned.

A common start: +5 for opening an email, +10 for a click, +15 for the pricing page, +30 for a form, and -10 for
a "not interested" tag.

## Named scores

Besides the main **Score**, add a score per product or interest (one per line under **Named scores**) and point
rules at it. Every contact page shows all their scores, the latest changes with the reason for each, and a box to
adjust a score by hand. A deal's page shows the highest score among its contacts.

## Fading

Interest from months ago is not interest today. Switch on **Scores fade when a contact goes quiet** to take a
share of the points (25% by default) from any score that has not gained points for a period (30 days by
default), and again every period after that.

## Use scores

- **Lists & segments**: *Score* and every named score are segment fields (*Score is more than 50*).
- **Automations**: the **Score reached a value** trigger fires once, on the way up past the value, so a contact
  crossing 50 can be handed to sales, tagged *hot* or sent a call task. **Add or remove points** is an automation
  step, and if/else conditions can test any score.
- **Warmest contacts** on the Lead scoring screen lists the top scores.

## Site activity: pages known contacts visit

Switch on **Record the pages known contacts visit** to see which pages a contact reads after they have identified
themselves: by sending a form that adds them to the CRM, clicking a link in a campaign or logging in. From then on:

- each visit puts one **Visited the site** entry on their timeline, and the pages appear under **Score &
  activity** on their page;
- page-visit rules add points;
- the **Visited a page** automation trigger can start a follow-up (someone reading the pricing page twice in a
  week).

Privacy:

- **Anonymous visitors are never recorded.** A visitor is recognised by a signed first-party cookie, which cannot
  be forged or used to look up anyone else.
- **Consent**: by default nothing is recorded unless your consent banner's cookie is set (enter its name).
  Choose *My privacy notice covers it* only if your notice does. Browsers that send **Do Not Track** or **Global
  Privacy Control** are always left out.
- **Never record addresses starting with** keeps the checkout, cart and account pages out by default.
- Mention it in your privacy policy. Deleting a contact deletes their activity and scores.

The tracking script works with page caching: it only does anything in the browser of someone who has the cookie.

## Events

Everything above is stored as **events**: page visits, logins, purchases, form submissions, email opens and clicks,
and your own. Events can also be used directly:

- **Segments**: *Did something (event)*, such as *webinar in the last 30 days*.
- **Automations**: the **Event happened** trigger.
- **Clicks on your pages**: add `data-crm-event="downloaded_brochure"` (and optionally `data-crm-value="…"`) to a
  button or link, and a known contact's click is recorded.
- **From code**:

```php
do_action( 'unysonplus_crm_track', $contact_id_or_email, 'webinar', array( 'value' => 'October' ) );
```
