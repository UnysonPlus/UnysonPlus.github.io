---
sidebar_position: 5
title: "How to import and export WordPress members and your membership set-up"
sidebar_label: "Import / Export"
description: "Import members into Unyson+ Membership from a CSV file, a WordPress role or a user field, keep their Stripe or PayPal subscriptions renewing, export members to CSV, and move your whole set-up (plans, prices, access rules and settings) to another site with one JSON file."
keywords: [import members wordpress csv, export members csv wordpress, migrate membership plugin, move members between sites, copy membership settings to another site, export membership plans and rules, import stripe subscriptions wordpress, bulk add members wordpress, assign plan by user role, membership csv columns]
---

# Import / Export

Moving to Unyson+ Membership from somewhere else? Starting a members site for a club whose members are in a
spreadsheet? Bring them in with a CSV file, or give a plan to everyone who already has a certain WordPress role
or user field. Going the other way, you can download your members as a CSV file in exactly the format the
importer reads, and your whole **set-up** (plans, prices, access rules and settings) as one JSON file. So moving
a members site from one Unyson+ site to another is two downloads and two imports.

:::info Module
This is the **Import / Export** module ("Export members (CSV) and the whole set-up (a JSON file) and bring them
in on another site; import members and live subscriptions from a CSV file (such as an export from another
plugin), or give plans to everyone with a WordPress role or user field."). Switch it on under
**Membership → [Modules](./modules.md)** (off by default). It adds **Import / Export** under **Setup** in the
sidebar. **Members → Export CSV** is part of the core and always available on **Membership → Members**, with or
without the module.
:::

## What is on the screen

**Setup → Import / Export** has these panels, top to bottom:

| Panel | What it does |
|---|---|
| **Export** | Two buttons: **Download members (CSV)** and **Download set-up (JSON)**. See [Export](#export). |
| **From a set-up file (JSON)** | Reads a file made by **Download set-up (JSON)**, from this site or another. See [Move your set-up to another site](#move-your-set-up-to-another-site). |
| **From a CSV file** | Imports members from a spreadsheet. See [Import a CSV, step by step](#import-a-csv-step-by-step). |
| **From WordPress roles** | Gives a plan to everyone with a role. See [Give a plan by WordPress role](#give-a-plan-by-wordpress-role). |
| **From a user field** | Gives a plan by the value of a user field. See [Give a plan by user field](#give-a-plan-by-user-field). |

## Export

The **Export** panel offers *"Two files, both read back by this screen on any site with Membership"*:

- **Download members (CSV)**: one row per membership, for a spreadsheet or to move members. It is the same file
  as **Members → Export CSV**, but always with **all** members (Members → Export CSV gives only the members the
  current filter shows). The columns are listed under [The export columns](#the-export-columns).
- **Download set-up (JSON)**: a file named `membership-setup-YYYY-MM-DD.json` with every plan and price, every
  access rule, and all Membership settings. No members, and never your payment keys. See
  [Move your set-up to another site](#move-your-set-up-to-another-site).

## Prepare the CSV file

A CSV file is a spreadsheet saved as plain text. In Excel, Google Sheets, Numbers or LibreOffice, use
**Save as / Download → CSV**. Put **one row per membership** (someone with two plans has two rows) and a header
row with column names.

The importer understands these columns. Only `email` is required.

| Column | What to put in it | Example |
|---|---|---|
| `email` | The member's email. Required. | `jo@example.com` |
| `first_name` | First name (used only for a new account). | `Jo` |
| `last_name` | Last name (used only for a new account). | `Bloom` |
| `plan` | The plan: its slug, its name or its id. | `member`, `Member` or `3` |
| `status` | One of `active`, `trialing`, `past_due`, `paused`, `cancelled`, `expired`, `refunded`, `pending`. Anything else, or empty, becomes `active`. | `active` |
| `started_at` | When the membership started. Empty = now. | `2025-03-01` |
| `ends_at` | When access ends. Empty = no end date. | `2026-03-01` |
| `renews_at` | The next renewal date, for a subscription. | `2026-03-01` |
| `gateway` | Where the subscription lives: `stripe`, `paypal` or `offline` (bank transfer). | `stripe` |
| `subscription_id` | The subscription's id at that payment service. | `sub_1Abc…` |
| `customer_id` | The Stripe customer id (Stripe only). | `cus_9Xyz…` |

Good to know about the file:

- The column names do not have to match exactly: `First Name` and `first_name` are the same, and you can match
  any column by hand in the next step.
- Commas or semicolons both work as separators (the importer detects which), and a file saved with a byte-order
  mark (common from Excel) reads fine.
- Dates can be written in any common way (`2025-03-01`, `1 March 2025`, `2025-03-01 09:30`) or as a Unix timestamp.

:::tip Example
The Larkspur Garden Club's old spreadsheet:

```
email,first_name,last_name,plan,status,started_at,ends_at
jo@example.com,Jo,Bloom,Member,active,2025-03-01,2026-03-01
sam@example.com,Sam,Fern,Pro,active,2024-09-15,
lee@example.com,Lee,Moss,Free,active,2025-06-10,
```
:::

## Import a CSV, step by step

1. Go to **Membership → Modules**, switch on **Import / Export**, click **Save modules**.
2. Make sure every plan in the file exists under **Membership → Plans** (moving from another Unyson+ site? Import
   the [set-up file](#move-your-set-up-to-another-site) first and the plans are there).
3. Go to **Setup → Import / Export**. In **From a CSV file**, choose your file and click **Upload and match
   columns**.
4. **Match the columns.** For each **Membership field** on the left, pick the **Column in your file** that holds
   it, or **— not in the file —**. Columns with the same or a similar name are matched for you. **First row**
   shows the value from your first data row, so you can check the match is right.
5. Choose the options below the table (see [The import options](#the-import-options)). **Dry run first** is
   ticked: keep it ticked the first time.
6. Click **Import**. The dry run changes nothing and reports, for example, *"Dry run: 120 would be imported, 85
   new accounts, 3 already here, 2 problems."* Any problems are listed with their line number, such as
   *"Line 14: no valid email."* or *"Line 22: no plan called "Gold"."*
7. Fix the problems in your file (or accept that those rows are skipped), untick **Dry run first** and click
   **Import** again. The result reads *"Imported 120 (85 new accounts); 3 were already here; 2 problems."*
8. Check **Membership → Members**: the imported memberships have the source **Import**.

<img src="/img/membership/import.png" alt="The Import / Export screen: an Export panel with Download members (CSV) and Download set-up (JSON), then From a set-up file (JSON), From a CSV file, From WordPress roles and From a user field" width="1400" />

The uploaded file is kept for one hour while you match and dry-run. If you take longer, you see *"The upload
expired. Please upload the file again."*

### The import options

| Option | What it does | Default | Tip |
|---|---|---|---|
| **Plan for rows without one** | A plan for rows whose `plan` cell is empty (or for every row, when the file has no plan column). Those rows get this plan. | — no plan — | Handy for a club spreadsheet with no plan column: pick **Member** and every row joins Member. Left at **— no plan —**, rows without a plan are listed as problems. |
| **Make accounts for emails that have none** | Creates a WordPress account (with the site's default role and a random password) for each email that has none. Untick it to import only people who already have an account; the others are listed as problems. | On | Leave on when moving from another system. |
| **Email new accounts a link to set their password** | Sends WordPress's new-account email to each account made, with a link to choose a password. | Off | Turn on when you are ready for members to log in. Leave off to import quietly and announce the move yourself later (they can use **Lost your password?** or a login link). |
| **Dry run first (report only, change nothing)** | Reports what would happen without changing anything. | On | Always do one dry run. |

### Rows that are skipped

A row is counted as **already here** and skipped when the person already holds that plan with access, or holds
that plan from an earlier import, or holds a membership linked to the same `subscription_id`. That makes it safe
to run the same file twice: the second run changes nothing it already imported.

## Keeping live subscriptions renewing

If members pay through Stripe or PayPal today, you do not have to ask anyone to pay again. Fill in `gateway` and
`subscription_id` (and for Stripe also `customer_id`) and the membership is **linked to that subscription**.
Renewals, failed payments and cancellations then keep arriving from the payment service and being applied, just
as for a member who joined through your own checkout.

For this to work:

1. Switch on the **Payments** module and connect the **same** Stripe or PayPal account under Payment settings.
2. Import while Payment settings are in the mode (test or live) the subscriptions belong to. The Stripe customer
   id is saved for the current mode.
3. Fill in `renews_at` with the next renewal date and `ends_at` with the end of the period paid for.
4. Make sure the plan has a price: the membership is linked to the plan's first price.

Afterwards you can check every subscription against the payment service with
`wp membership reconcile --dry-run` (see [Scheduled jobs and WP-CLI](./scheduled-jobs-and-cli.md)).

## Give a plan by WordPress role

If your members were simply a WordPress role (for example *Subscriber* or a custom *Club member* role):

1. Go to **Setup → Import / Export → From WordPress roles**: *"If your members were a role, give everyone with
   that role a plan."*
2. Each role is listed with how many people have it (administrators and editors are not listed).
3. Pick a plan next to the roles you want, and leave **— no plan —** for the others.
4. Keep **Dry run** ticked and click **Give the plans**: *"Dry run: 240 would get a plan; 12 already have it."*
5. Untick **Dry run** and click **Give the plans** again.

Everyone gets an **active** membership starting now, with **no end date** (it lasts until you end it). Only
people who already have an account are involved, so no accounts are made and no emails are sent.

## Give a plan by user field

If a level or tier was kept in a user field (user meta), for example `club_level` with the values `basic` and
`premium`:

1. Go to **Setup → Import / Export → From a user field**.
2. Type the field name in **Field (meta key)** and click **Show its values**. Up to 50 different values are shown.
   If nobody has the field: *"No accounts have that field."*
3. Pick a plan for each value: `basic` → **Member**, `premium` → **Pro**.
4. Run it with **Dry run** first, then without. As with roles, the memberships start now and have no end date.

## Export members to CSV

There are two ways to download members:

- **Setup → Import / Export → Download members (CSV)** downloads **every** membership (needs the module).
- **Membership → Members → Export CSV** downloads the memberships the list shows (always available):
  1. Go to **Membership → Members**.
  2. Narrow the list if you want: a status tab (**All**, **With access**, **Active**…), a plan in **All plans**, or
     a name or email in the search box, then **Filter**.
  3. Click **Export CSV**. A file named `members-YYYY-MM-DD.csv` downloads with **every membership matching the
     current filters** (not only the page you are looking at).

<img src="/img/membership/members-list.png" alt="The Members list with its status tabs, the All plans filter, the name or email search, Filter, and the Export CSV and Add a member buttons" width="1400" />

### The export columns

The file has one row per membership. The **first eleven columns are exactly the importer's columns**, in the
same order: `email`, `first_name`, `last_name`, `plan` (the plan's slug), `status`, `started_at`, `ends_at`,
`renews_at`, `gateway`, `subscription_id`, `customer_id`.

Then, for reading:

| Column | Holds |
|---|---|
| `membership_id` | The membership's id on this site. |
| `user_id` | The WordPress user id. |
| `display_name` | The name shown on the site. |
| `plan_name` | The plan's name. |
| `source` | How the membership started (`payment`, `registration`, `manual`, `gift`, `group_seat`, `woocommerce`, `import`, `crm_automation`). |
| `trial_ends_at` | When a free trial ends. |
| `cancelled_at` | When it was cancelled. |
| `created_at` | When the record was made. |

The file opens correctly in Excel with accented names (it starts with a byte-order mark).

### Formula safety

A spreadsheet treats a cell that starts with `=`, `+`, `-` or `@` as a formula and may run it. A member who typed
`=HYPERLINK(…)` as their name could otherwise trick whoever opens the file. So any text cell starting with one of
those characters (or a tab or line break) gets an apostrophe in front, which spreadsheets show as plain text.
Numbers, including negative ones, are left alone.

## Move your set-up to another site

Built your plans, access rules, emails and settings on a staging site, or starting a second members site that
should work like the first? Instead of setting it all up again by hand, download the **set-up file** on one site
and import it on the other.

### Step by step

1. On the **old** site, switch on the **Import / Export** module, go to **Setup → Import / Export** and click
   **Download set-up (JSON)**. A file named `membership-setup-YYYY-MM-DD.json` downloads.
2. On the **new** site, create the pages and posts your access rules protect, and the categories and tags they
   use, **with the same addresses (slugs)** as on the old site. Do the same for your member pages (account, login,
   join, checkout). Anything the importer cannot find is left out and listed (see below), so this step saves you
   fixing it later.
3. On the new site, switch on **Import / Export** too and go to **Setup → Import / Export → From a set-up file
   (JSON)**.
4. Choose the file. **Dry run** is ticked: keep it ticked and click **Import the set-up**. Nothing changes; you see
   what would happen, for example *"Dry run: 3 plans would be added and 0 updated, 5 access rules added and 0
   updated, 8 groups of settings replaced."* plus a list of anything that is not on this site.
5. Fix what the list names if you want (create the missing page, or plan to choose it again later), then untick
   **Dry run** and click **Import the set-up** again: *"Set-up imported: 3 plans added, 0 updated; 5 access rules
   added, 0 updated; 8 groups of settings replaced."*
6. Check **Plans**, **Access rules** and **Settings**. If a member page was not found, choose it again in
   **Settings**. Add the payment keys under Payment settings (they are never in the file).
7. To bring the members over too, import the members CSV next (see
   [Move members from one Unyson+ site to another](#move-members-from-one-unyson-site-to-another)).

### What is in the file, and what is not

| In the file | Not in the file |
|---|---|
| Every plan: name, slug, description, status, priority, which plan it includes, duration or fixed end date, sign-up limit, its other settings (such as which plans members can switch to) and all its prices. | Members and their memberships (they travel in the members CSV). |
| Every access rule: name, status, priority, drip timing, who may see it (plans, roles, logged-in), what everyone else sees, and what it protects. | Payment secret keys and tokens: never written to the file. |
| The Membership settings: member pages, emails, profile fields, modules, payments, paywall, retention, directory, cards and the CRM connection. | Payments, invoices, coupons, gifts, course progress and other records. |
|  | The pages, posts and terms themselves: rules and settings only name them. |

### How matching works

Ids are different on every site, so the file names things instead, and the importer looks them up:

- **Plans are matched by slug.** A plan with the same slug on this site is **updated**; any other plan is
  **added**.
- **Access rules are matched by name.** A rule with the same name is updated; any other rule is added.
- **Nothing is deleted.** Plans and rules on this site that are not in the file stay as they are.
- **Settings in the file replace this site's settings**, group by group (member pages, emails, profile fields,
  modules and so on). A group the file does not have is left alone. **This site's payment keys are always kept.**
- **Pages and posts are found by their type and address** (for example `page:about/team`), and **categories and
  tags by their slug** (for example `category:members-only`).
- **A price that has not changed keeps its row**, so members already paying with it are not touched.
- Importing a file on the site it came from changes nothing: every plan and rule matches itself.

### Things the importer could not find

Anything that is not on this site is listed in the message after the dry run or the import (up to ten lines),
for example:

- *"Rule "Members area": page:about is not on this site, so it was left out."* The rule is still imported, but
  without that page. Create the page and add it to the rule, or import the file again once the page exists.
- *"Page page:join is not on this site: choose it again in Settings."* A member page (account, login, join or
  checkout) was not found. Pick it again in **Settings**.

The message is a warning (yellow) when something was listed, and a success (green) when everything was found.
Other messages: *"Choose a set-up file (.json)."* when no file was chosen, *"That file is not valid JSON."* and
*"This is not a Membership set-up file."* when the file is something else.

### What the file looks like

You never need to edit it, but it is plain JSON you can open in any text editor. A shortened example:

```json
{
  "format": "unysonplus-membership-setup",
  "version": 1,
  "exported_at": "2026-11-12T09:30:00+00:00",
  "plans": [
    {
      "slug": "member",
      "name": "Member",
      "description": "Full access to the club pages.",
      "status": "active",
      "priority": 10,
      "includes": "free",
      "duration_value": 0,
      "duration_unit": "",
      "fixed_end_date": "",
      "signup_limit": 0,
      "settings": { "switch_to": ["pro"] },
      "prices": [
        { "label": "Yearly", "amount": 30, "currency": "GBP", "billing": "year",
          "interval_count": 1, "trial_days": 0, "setup_fee": 0 }
      ]
    }
  ],
  "rules": [
    {
      "name": "Members area",
      "status": "active",
      "priority": 0,
      "drip_days": 0,
      "drip_date": "",
      "who": { "plans": ["member", "pro"], "roles": [], "logged_in": false, "extra": [] },
      "denied": { "action": "prompt", "message": "", "redirect": "", "teaser_words": 55, "hide": false, "metered": false },
      "targets": [
        { "mode": "include", "type": "post", "sub_type": "", "object": "page:resources", "pattern": "" },
        { "mode": "include", "type": "term", "sub_type": "", "object": "category:members-only", "pattern": "" }
      ]
    }
  ],
  "options": {
    "settings": { "account_page": "page:account", "login_page": "page:login", "join_page": "page:join" },
    "emails": { "…": "…" },
    "modules": { "…": "…" }
  }
}
```

Plans in `includes`, `switch_to` and a rule's `who.plans` are named by **slug**, and pages, posts and terms by
`type:address`, which is what lets the file work on another site.

## Move members from one Unyson+ site to another

1. Move the set-up first ([above](#move-your-set-up-to-another-site)), or create the same plans **with the same
   slugs** on the new site by hand (the members file names plans by slug).
2. On the old site, download the members: **Setup → Import / Export → Download members (CSV)** for everyone, or
   **Members → Export CSV** on the **With access** tab to leave out ended memberships.
3. On the new site, import the file under **From a CSV file** as above, with a dry run first. The extra columns
   are simply left as **— not in the file —**.
4. If members pay by subscription, connect the same payment account on the new site first (see
   [Keeping live subscriptions renewing](#keeping-live-subscriptions-renewing)), and point the payment
   service's notifications (webhooks) at the new site.

The same members export is available on the command line: `wp membership export members.csv --status=access`.

## Good to know

**Does importing send emails?**
No, unless you tick **Email new accounts a link to set their password**. Plans are not announced with the welcome
email either. Importing a set-up file sends nothing.

**Can I import passwords?**
No. New accounts get a random password; members set their own with the email link, **Lost your password?** or a
login link.

**What about members' payment history?**
The importer brings memberships, not past payments. Past invoices stay in your old system or the payment service.

**Can I undo an import?**
Not with one button. Every imported membership has the source **Import**, so you can find them on the Members
screen. A set-up import replaces settings, so download your own set-up file first: importing it back puts them
as they were (plans and rules it added stay, since nothing is deleted). Take a database backup before a large
import.

**Can I use the set-up file as a backup?**
Yes, for the set-up. Download it before big changes; importing it back on the same site restores the plans,
rules and settings in it. It does not hold members, so download the members CSV as well.

**Does the Import / Export screen also read other membership plugins?**
It reads a CSV file, a role or a user field. Export from the other plugin to CSV, then match its columns. The
set-up file is only made by Unyson+ Membership.

## Next steps

- Check everything after the move: [Scheduled jobs and WP-CLI](./scheduled-jobs-and-cli.md).
- Keep data requests in order: [Privacy and data](./privacy-and-data.md).
- Back to the [Membership overview](/membership).
