---
sidebar_position: 1
slug: /
title: "Membership — members-only content, plans and payments for WordPress"
sidebar_label: "Membership"
description: "The planned Unyson+ Membership extension: plans, one access engine for every page, element and menu, a member area designed in the page builder, your own payment accounts with no transaction fee, and a full connection to the Unyson+ CRM."
---

# Membership

:::info In progress
Phases 1 and 2 are built: the Membership app, plans, members, access rules with the one access engine
behind them, sign-up forms with email confirmation and approval, the login and account pages, member emails,
profile fields, a REST API and AI Assistant tools. Phase 3 is built too: plans are sold by card, PayPal or
bank transfer, with coupons, tax, invoices, and upgrades and downgrades members make themselves. Phase 4 connects Membership to the [CRM](./crm.md): members are contacts, plans are tags, and
access rules can use CRM tags, lists and segments. Phase 5 adds drip content, a metered paywall, protected downloads and
selling single items. Phase 6 adds everything for keeping members, and gift memberships. Phase 7 adds team memberships, a member directory and membership cards. Phase 8 connects Membership to WooCommerce. Phase 9 adds reports. Phase 10 adds account security, importers, a scheduler check and command-line tools. All of it arrives with the next release. The
[roadmap](./roadmap.mdx) tracks each task against the code. The design comes from a study of the leading
membership plugins and platforms, summarised under [Research](./research.md).
:::

## Finding your way around

Open **Unyson+ → Membership** and it takes over the screen like an app of its own, the same way the
[CRM](/crm) does:

- **The Membership sidebar** lists every area: Home, Members, Plans and Access rules; Payments and Coupons;
  Reports; Emails, Modules and Settings. Areas still being built are marked **Soon**, and their page says
  what they will do.
- **The WordPress menu folds to its icons** while you are in Membership. **Hide the WordPress menu** at the
  bottom of the sidebar removes it altogether (your choice is remembered), and **Back to WordPress** takes
  you to the dashboard. With the CRM on, **Open the CRM** is there too.
- **The top bar** searches members by name or email (press <kbd>/</kbd> to jump to it) and has a **New**
  menu for a member or a plan.
- **Home** shows members with access, active, cancelled and ended memberships, members by plan, recent
  changes and who is ending in the next two weeks. A fresh install shows the first three steps instead.
- **A plan's page** holds its name, prices (several per plan, such as monthly and yearly), how long it
  lasts (until cancelled, a set time, or until a date), what other plan it includes, its priority and a
  member limit. A plan with members is archived rather than deleted.
- **A member's page** shows each membership with its status, dates and source, with **Extend**, **Change
  plan**, **Cancel at end date**, **End now** and **Reactivate**, a form to add another plan, and the
  history of every change and who made it.
- **Access rules** each say what is protected (the entire site, all items of a type, a single page or post,
  the pages under a page, a category or tag, a post type archive, or addresses such as `/members/*`, with
  "Except" lines for exceptions), who may see it (plans, roles, or anyone logged in) and what everyone else
  sees: a teaser and a prompt to log in or join, a trip to the login page, another page, or "page not found".
  Every rule that covers a page must be passed.
- **Modules** lists every switchable module with the phase it arrives in.

## Sign-ups, logins and the member area

- **Sign-up forms are ordinary contact forms.** Switch on **Register a member** in the form's
  Settings → Actions and choose the plan it gives (usually a free one). The form needs an Email field; add the
  **Username** and **Password** fields from the form builder if people should choose them, otherwise the
  username comes from the email and they get an email to set a password. The password is never stored with
  the form entry, never in the notification email and never shown again.
- **Email confirmation** (on by default) sends a link that works once and for a limited time; opening it shows
  a button that confirms, so mail scanners that open every link cannot confirm for someone. Until then the
  person cannot log in and the plan has not started.
- **Approval**: a form can also make each sign-up wait for you. You get an email; approve them on their member
  page, and they are emailed back.
- **If something is wrong** (the email already has an account, the plan is full) the visitor sees the message
  on the form and nothing is sent or stored.
- **Member Login** element: a login form in your site's style, with "forgot your password" and a sign-up link.
  Logging in goes through WordPress's own login, so the Security extension's login protection and two-factor
  login always apply. Members land where their plan says, or on their account page, never in wp-admin.
- **Member Account** element: the member's details (changing the email needs their password), their
  memberships with their dates and **Cancel** (access continues to the end date; you can switch cancelling
  off), changing the password, and signing out of other devices.
- **Member emails** under Membership → Emails: confirm your email, welcome, waiting for approval, a sign-up to
  approve (to you), approved, cancelled and ended. Each is editable with placeholders such as `{first_name}`
  and `{plan}`, can be switched off, and can be sent to yourself as a test.
- **Settings**: the account and login pages, where people land after confirming, how long links work, who
  hears about sign-ups to approve, whether members may cancel, and the button classes Membership uses so its
  buttons match your Theme Settings button presets. Membership data is included in WordPress's personal-data
  export and erase tools.

## Selling plans

Switch on **Payments** in Membership → Modules, then open **Membership → Payments → Payment settings**.

- **Two pages do the selling.** Put the **Pricing Plans** element on one page: it shows your plans as cards,
  with a Monthly / Yearly switch when plans have both, a highlighted plan, and "Your plan" on the ones the
  visitor already holds. Put the **Membership Checkout** element on another page and choose that page as the
  **Checkout page** in the payment settings. Each plan's **Join** button goes to the checkout with that plan
  and price.
- **The checkout** shows the plan, its price, any free trial and setup fee, and asks a new buyer for their
  name, email and a password, so the account is made in the same step. Someone whose email already has an
  account is asked to log in first, never attached to that account. Add a **Terms page** in the settings and
  buyers must tick that they accept it. A free plan skips payment altogether.
- **Card payments (Stripe).** Paste your Stripe secret key and a webhook signing secret (the settings show the
  address to give Stripe and the events to choose). The buyer pays on Stripe's own checkout page, so card
  details never touch your site, and cards, Apple Pay and Google Pay all work there. Prices that repeat
  become Stripe subscriptions: Stripe bills each renewal, and the membership follows. A paid renewal pushes
  the end date out, a failed one makes the membership **Past due** while Stripe retries (access continues
  for 3 days after the paid period), and a cancellation in Stripe ends it at the period end. Test mode
  uses your test keys and no real money moves. Unyson+ takes no fee.
- **PayPal.** Paste the Client ID and Secret of a PayPal app, and the ID of a webhook pointed at the address
  the settings show. One-off prices are paid as PayPal orders; repeating prices become PayPal subscriptions,
  with trials, setup fees, tax and discounts built in. PayPal cannot move a subscription to another plan
  without the buyer approving it again, so members who pay with PayPal change plan by cancelling and joining
  the new one.
- **Bank transfer or cash.** Write your payment instructions (use `{reference}` for the payment's reference).
  The buyer sees them after checkout, the membership waits, and you start it with **Mark paid** on the
  Payments screen. Bank transfer is offered for one-off prices only, since nothing renews by itself.
- **Coupons** (switch on the Coupons module): a percentage or an amount off the first payment, the first few
  months or every payment, for chosen plans, with a total limit, a limit per person and start and end dates.
  **Make many codes** creates single-use codes in one go and downloads them as a CSV. Buyers type a code at
  the checkout, or follow a link ending in `?coupon=CODE` (to the pricing page or the checkout). With Stripe,
  the discount is applied by Stripe itself, so renewals are discounted for exactly the right months.
- **Tax** (switch on the Tax module; its settings are in Payment settings): your own rates by country, and by
  state or region where it matters, with prices that include tax or have it added. The checkout asks for the
  country first and shows the exact total, tax and discount included, before anything else. Turn on **EU VAT
  numbers** and a business in another EU country that gives a valid VAT number (checked with the EU's VIES
  service) pays no VAT, marked as reverse charge. If you use Stripe Tax, choose it instead and Stripe works out
  the tax on its payment page.
- **Invoices.** Every paid payment gets the next number in one unbroken sequence, with your prefix, business
  name, address and tax number (Payment settings → Invoices). Members open their invoices from their account
  page and the receipt email, and can print them or save them as PDF.
- **Members change plan themselves.** On a plan's page, tick the plans its members may move to under
  **Members can switch to**. Their account page then shows **Change plan** with each choice and what will
  happen. A move to a dearer plan happens at once: the difference for the rest of the period is charged now,
  or the new price starts at the next renewal if you prefer (Payment settings → **When a member upgrades**).
  A move to a cheaper or free plan takes effect at the next renewal, so nobody loses time they paid for, and
  until then the member can choose **Keep my current plan**. A member without a subscription (added by hand,
  or on a one-off price) moves to a paid plan through the checkout, and their old membership ends once the new
  one is paid. On the Pricing Plans element those plans say **Change plan** rather than selling a second
  membership.
- **Membership → Payments** lists every payment, renewal and refund with its status and reference, and
  what was taken in the last 30 days. **Refund** refunds a card payment through Stripe; refunding a first
  payment ends the membership.
- **For members**, the account page lists their payments and has an **Update your payment method** button
  that opens Stripe's billing page, where they can change their card or see their invoices. A receipt is
  emailed after each payment, and a "payment failed" email when a renewal does not go through. Both are
  editable under Emails.
- **Developers** can add another payment method with the `unysonplus_membership_gateways` filter, and change
  the Stripe checkout (for example to allow promotion codes) with `unysonplus_membership_stripe_session`.

## Drip, free reads, downloads and single items

Each of these is a module you switch on under **Membership → Modules**.

- **Drip content.** On an access rule, **Opens after (days)** releases it that many days after the person
  joined, and **Opens on (date)** releases it on a date. Until then, members who would otherwise see it get
  "This opens for you in 3 days", their account page lists what is **Coming up for you**, and they get an
  email the day it opens. For a course-like sequence, give each lesson its own rule: 0, 7, 14 days.
- **Metered paywall.** Tick **Free reads** on a rule and people without access can read a few of those items
  each month (or week, or day) before the prompt appears: visitors a few, and people with a free account more,
  which turns it into a registration wall (**Membership → Settings → Metered paywall**). Each item counts once,
  and a short note says how many free articles are left. Visitors are counted in their browser, so clearing
  cookies resets it, as with any metered paywall.
- **Protected downloads.** Upload files under **Membership → Downloads** and choose who may download them
  (plans, any member, anyone logged in) and how many times a month. Files are kept in a folder with a random
  name that the web server refuses to serve, under random file names, so there is no address to guess or
  share; every download goes through an access check and is logged. Put a file on a page with the **Member
  Download** element. On Nginx, the random names are the protection; add a `deny` rule for the folder if you
  want belt and braces.
- **Selling one item.** The **Sell on its own** box on any post or page (and the price field on a protected
  file) sells that one item through the same checkout, for ever or for a number of days. People who are not
  allowed to see it get a **Buy this for $5** button on the prompt, and buyers can open it even when it is also
  part of a plan they do not hold. Coupons, tax, invoices and every payment method work as for plans.

## Keeping members

Switch on **Retention** under Membership → Modules; its options are under **Membership → Settings → Keeping
members**, and **Membership → Retention** shows why people leave and what kept them.

- **When a renewal payment fails**, the member keeps access for a few days while the payment service tries
  again, gets emails on the days you choose, and every email has a one-click link to update the card (it does
  not log anyone in by itself: whoever opens it logs in as themselves first). Members whose card expires before
  their next renewal get a warning (card payments).
- **Pause instead of cancel.** Members can pause for one to three months (or up to your limit). Nothing is
  charged and there is no access meanwhile; it starts again by itself on the day, or earlier with **Resume
  now**. A membership without a subscription gets the paused time added to its end date.
- **Before someone cancels**, they are asked why (your list of reasons) and offered one thing: a discount for
  the next few months (card payments), a pause, or a cheaper plan. **Cancel anyway** is always one click away.
- **Reminders** go out a few days before a renewal, before a free trial ends, and before a membership that will
  not renew ends (with a link to renew). A while after a membership ends, a **win-back** email can offer a
  one-time discount code for their old plan (with the Coupons module).

## Gift memberships

Switch on **Gift memberships** (with Payments). The Pricing Plans element then shows **Give as a gift** under
each plan. The buyer gives the recipient's name and email and a message, and pays once: a monthly plan is given
as one month, and nothing renews. When the payment arrives, the recipient gets an email with a link to start
their membership, into a new account or the one they have (if they already hold that plan, it is extended).
**Membership → Gifts** lists every gift, with **Send again** and **Cancel**.

## Teams, the directory and cards

- **Team memberships** (Groups and teams module). Give a plan **Team seats** (Plans → the plan → Options) and
  whoever holds it can bring that many people in besides themselves: by email invitation, by a join link they
  share, or automatically for everyone with an email at their organisation's domain. Each team member has the
  same plan as the owner and it follows the owner's: renewed, paused, cancelled or ended together. The owner
  manages the team on their account page (invite, withdraw an invitation, remove someone, which frees the seat
  at once); members can leave. **Membership → Groups** lists every team and lets you change its seats.
- **Member directory** (Member directory module). Put the **Member Directory** element on a page: a searchable,
  filterable grid of members, each with a profile page. By default only members who tick **Show me in the
  member directory** on their account page are listed, and you choose whether members only or everyone can
  browse. Each profile field has its own **In the directory** setting (not shown, members, everyone): name and
  picture are always shown, the email address never is, and fields a visitor may not see cannot be searched or
  filtered either.
- **Membership cards** (Membership cards module). Members find their card on their account page and can open it
  full screen to show at the door, or print it. Scanning its QR code with any phone shows "Valid membership" or
  "Not valid"; staff who are logged in also see who it is and can **Check in** the member, which is noted in
  their history.

## WooCommerce

With WooCommerce active, switch on the **WooCommerce** module.

- **Products that give a plan.** On a product's **Membership** tab, choose the plan buying it gives. The plan
  starts as soon as the order is paid, and ends if the order is refunded or cancelled; buying it again extends
  it. A guest buyer gets an account made from their billing email. With WooCommerce's subscriptions add-on, a
  subscription product's plan follows the subscription: on hold, cancelled and expired are all reflected.
- **Member perks.** On a plan's page (Options), give members a store discount (on everything, or on chosen
  product categories) and free shipping. Members see a **member price** against the normal one; the best
  discount of the plans they hold applies, and a sale that is already cheaper wins.
- **Members-only products.** On the product's Membership tab, tick the plans whose members may buy it; everyone
  else sees "For members of …" instead of the Add to cart button. To hide products from non-members entirely,
  use an access rule on them like on any other content.

## Reports

Switch on **Reports**, then open **Membership → Reports**. Everything is worked out from the memberships, their
history and the payments, so the past months are filled in straight away:

- **Monthly recurring revenue** now and by plan (a yearly price counts as a twelfth each month; trials and one-off
  prices do not count), with a chart of the last 12 months.
- **Month by month:** members at the start, new members, upgrades and downgrades, members lost, churn, failed and
  recovered payments, and revenue.
- **Lifetime value** (paid, minus refunds, per paying member), **trial conversion**, and the share of failed
  payments that were recovered.
- **Cohorts:** of the people who joined in each month, the share still members one, two, three… months later; and
  the share still members by how they came (paid sign-up, free sign-up, gift, team seat, store order…).
- **Most-read members-only content:** counted each time a member opens a protected page or post, per item and
  month, with no record of who.

**Download as CSV** exports two years month by month. Amounts stay in their own currency.

## Account security and running the site

- **Devices at once** (Account security module). A plan can allow, say, two devices signed in at a time; logging
  in on a third signs out the one used least recently. It discourages sharing an account without getting in
  anyone's way, and members see where they are signed in on their account page.
- **Login links.** Under every Membership login form, **Email me a login link instead** sends a link that works
  once, for 15 minutes. Opening it shows a **Log me in** button, so email scanners that open every link cannot
  use it up, and asking for one never reveals whether an address has an account.
- **Passkeys.** Members add a passkey (their fingerprint, face or device PIN) on their account page, then use
  **Log in with a passkey** on any login form, including the WordPress one. A passkey is already two factors in
  one, so it is not asked for a second step.
- **The log.** Each member's page shows their logins (and how), wrong passwords, pages they were turned away from
  and plan changes, and how many places the account was used from in the last 30 days, a hint that an account is
  being shared. Addresses are only kept as a scrambled fingerprint, and entries go after 90 days.
- **Importers.** **Membership → Import** reads a CSV file (any columns: you match them, with a dry run first).
  Include each member's payment-service subscription ID and their renewals keep arriving as before. It can also
  give a plan to everyone with a WordPress role, or with a value in a user field, for sites where members used to
  be stored that way. Running the same import again changes nothing.
- **Scheduled jobs.** Membership → Home shows whether the jobs that end memberships, send drip emails and
  reminders run on time, and if not, the line to add to your server's scheduler. Site Health checks it too.
- **Command line.** With WP-CLI: `wp membership list`, `plans`, `grant`, `extend`, `expire`, and `reconcile`,
  which checks every subscription with its payment service and fixes any that drifted.

## Profile fields, the API and AI

- **Profile fields** (Membership → Profile fields): extra details to keep about members, such as a company,
  a phone number or a birthday. Each is text, longer text, a choice, a tick box, a date, a number, a phone
  number or a web address; it can be required, limited to some plans, and editable by members or only by you.
  Members fill them in on their account page, a sign-up form fills one when it has a field with the same label,
  and you see and edit them on the member's page. They are part of the personal-data export and erase.
- **REST API** at `/wp-json/fw-membership/v1/`: the open plans with their prices (`/plans`), whether the current
  visitor may see an item (`/access?post=ID`) and the member's own memberships (`/me`), all useful for pricing
  tables and headless front ends; and, for membership managers, members, granting and changing memberships, and
  the access rules. Every change goes through the same rules as the app, so the history and emails stay whole.
- **AI Assistant**: a connected AI app can describe your membership set-up and create or change plans, access
  rules and settings. It never reads a member's details.

## Protecting content

- **A rule** under Membership → Access rules protects many things at once.
- **One item**: the **Membership** box in the editor sets a page or post to *Members only* (any plan or chosen
  plans), *Open to everyone* whatever the rules say, or *Follow the access rules*, and lists the rules that
  cover it now.
- **Part of a page**: every page-builder element, section and column has a **Membership** tab (next to
  Advanced, present while the extension is on): show it to everyone, members, people without a plan, members of
  chosen plans, everyone except them, or logged-in or logged-out people, and choose what everyone else gets in
  its place: nothing, or the members prompt. The **Paywall Prompt** element is that prompt to place yourself.
- **Blocks**: WordPress's own blocks get the same **Membership** panel in the block sidebar, for content
  written in the block editor.
- **Anywhere else** (the classic editor, text widgets, other builders): the `[member_content]` shortcode.

  ```text
  [member_content]Members of any plan see this.[/member_content]
  [member_content plans="gold,silver"]Gold or Silver members see this.[/member_content]
  [member_content show="non_members"]Join today![/member_content]
  [member_content plans="gold" prompt="yes"]Others see the members prompt instead.[/member_content]
  [member_content plans="gold" else="Upgrade to Gold to read this."]…[/member_content]
  ```

- **Menus**: each menu item has the same **Show to** choice; a hidden item takes its sub-items with it.
- **Check it**: on the site, **View as** in the admin bar previews any page as a logged-out visitor, a
  logged-in user without a plan, or a member of any plan. Administrators otherwise see everything.

Protection holds wherever the content could surface: archives, search, RSS feeds, the REST API, comments,
the XML sitemap, attachments, and the description and social tags the SEO extension writes. Protected pages
are sent with no-cache headers so a page cache never shows one person's view to another. A plan can also give
a WordPress role while it lasts, applied on the fly; roles that can manage the site are never offered.

Membership turns a Unyson+ site into a members site: free and paid plans, content that opens only to the
right people, a member area designed in the page builder like any other page, and payments taken with your
own payment accounts. With the [CRM](/crm) switched on, every member is also a contact, and access can
follow the CRM's tags, lists and segments ([how they connect](./crm.md)).

## The idea in one paragraph

Most membership plugins are a pile of separate features that each check access in their own way, and
the gaps between them are where content leaks and settings conflict. Membership is built the other way
round: **one access engine** answers "may this person see this?" and everything else asks it, whether
that is a page, an archive, a search result, the REST API, a page-builder element, a menu item, a file
or a course lesson. Plans, payments, drip, groups and courses are modules on top of that one engine, and
any module you don't need is switched off and loads no code.

## What every site gets (the core)

These are always on when the extension is active. They are what a membership site cannot do without,
and none of them is held back for a higher tier.

| Area | What it does |
| --- | --- |
| **Plans** | Unlimited plans, each with any number of prices (free, one-time, monthly, yearly, custom interval, fixed-date renewal, lifetime), trials, setup fees, expiry, sign-up limits, a priority when someone holds several, and inheritance (a higher plan includes what lower ones unlock) |
| **Membership records** | A real record per person and plan, with a status (trialing, active, past due, paused, cancelled, expired), dates, the source that granted it and a full history; several plans per person |
| **Access rules** | **What** is protected (the entire site, post types, single items, categories and tags, archives, child pages, URL patterns), **who** may see it (plans any / all / none, logged-in state, roles) and **when** (now, after N days, from a date). A default per post type, with a protect / open / hide override on any single post |
| **Leak-proof gating** | Protection applies to archives, search, feeds, the REST API, comments, sitemaps and attachments, not only the single page |
| **What non-members see** | One clear fallback per rule: a teaser with an upgrade prompt, a login form, the pricing table, a redirect or "not found"; a **Paywall prompt** element to design the upgrade box |
| **Element and menu visibility** | A **Membership** tab on every page-builder element, section and column, the same panel on block-editor blocks, a `[member_content]` shortcode, and the same choice on every menu item |
| **Accounts** | Registration through the Forms extension (a **Register member** action, plus username and password fields), login, logout, password reset, optional email verification and approval |
| **Member area** | **Member login**, **Member account** and **Paywall prompt** elements, styled by your theme: profile, memberships, payments, invoices, payment method and security in one place |
| **Member emails** | Every lifecycle email (welcome, receipt, reminder, payment failed, cancelled, expired) editable with placeholders, sent through `wp_mail()` so your mail settings apply |
| **Membership app in wp-admin** | Home, Members, Plans, Access rules, Payments, Reports, Emails, Modules and Settings; grant, extend, change or revoke by hand; a "view as member of…" preview |
| **Safe by default** | Admins always have access, a rescue link restores a locked-out admin, protected pages are never served from a page cache to the wrong person, and switching the extension off changes no roles |
| **Privacy and developers** | Personal-data export and erasure, documented events for every status change, a PHP API (`fw_membership()`), REST endpoints and AI Assistant tools |

## What you switch on when you need it (modules)

Every module is one switch on the **Modules** screen. A module that is off loads no code and adds no
menus, so a simple members area stays as light as a simple members area should be.

| Module | Switch it on for |
| --- | --- |
| **Payments** | Selling plans with your own payment accounts: cards and wallets, PayPal, bank transfer; subscriptions billed by the payment service; a one-page checkout and a pricing table element; upgrades and downgrades with proration; receipts and invoices. No transaction fee from Unyson+ |
| **Coupons** | Percentage or fixed discounts, first payment or forever, with limits, expiry and bulk codes |
| **Tax** | Rates by country and region, EU VAT with number validation and reverse charge, or automatic tax by the payment service |
| **CRM** | Turns on by itself when the CRM is active: members become contacts, plans mirror to tags, access rules use CRM conditions, membership events drive automations ([details](./crm.md)) |
| **Drip** | Content that opens N days after joining, on a date, or in sequence, with an email when it opens |
| **Metered paywall** | A few free articles per period, then a free registration wall or a subscription |
| **Protected downloads** | Files served only through an access check, with limits and a log |
| **Pay per item** | Selling one post, page or file without a plan |
| **Retention** | Failed-payment recovery with retries and card-update links, pause instead of cancel, a cancellation survey with a save offer, reminders and win-back coupons |
| **Gifts** | Buy a plan for someone else, redeemed by code or link |
| **Groups** | Team and company plans: one buyer, N seats, invitations by email, link or domain, and a team page |
| **Directory** | A searchable member directory and public profiles, with privacy per field |
| **Membership cards** | Printable or digital cards with a QR code for check-in |
| **WooCommerce** | Products that grant plans, member prices and free shipping, members-only products, store subscriptions as the billing source |
| **Reports** | Monthly recurring revenue, churn, lifetime value, trial conversion, recovered payments, cohorts |
| **Account security** | Limits on simultaneous sessions, one-click login links that are signed and single-use, passkeys, and a login and access log |
| **Importers** | Members, plans and live subscriptions from CSV or from other membership plugins, keeping renewals running |
| **Courses** | Courses with lessons, progress, quizzes and certificates on the same access engine |

## How it fits with the rest of Unyson+

- **CRM.** Optional but made for each other: one person, one contact; plans mirrored to tags; CRM
  conditions in access rules; membership events on the timeline and in automations. See
  [Membership and the CRM](./crm.md).
- **Forms.** Registration is a Forms action, so a sign-up form is built, styled and extended like any
  other form, and can also run the CRM's action in the same submission.
- **Page builder.** The member area, pricing tables, checkout and paywall prompts are elements, and every
  existing element gains members-only visibility.
- **Theme Builder.** Access rules use the same "where" vocabulary as Theme Builder templates, so one way
  of picking pages runs through the whole product.
- **Security.** Login throttling and two-factor login come from the Security extension; Membership adds
  session limits and passkeys on top.
- **WooCommerce.** An optional module, for stores that want products to grant plans; Membership's own
  checkout does not need it.

## Design decisions

- **One access engine, everywhere.** Every gate asks the same resolver, so a rule means the same thing on
  a page, in a search result, in the REST API and on an element.
- **Core plus switchable modules, no feature tiers.** The things a membership site needs are in the core;
  everything else is a module you switch on, not a higher plan you buy.
- **Your payment accounts, no transaction fee.** Subscriptions are billed by the payment service itself, so
  renewals do not depend on WordPress's visit-driven scheduler.
- **WordPress users, not a parallel login system.** Members are WordPress users; plans grant roles and
  capabilities on the fly and never rewrite roles permanently.
- **Real tables from the first release.** Plans, memberships, rules and payments live in indexed tables
  with numbered migrations, so the data model never has to be moved later.
- **Membership is its own extension.** Many membership sites need no CRM, so Membership works alone and
  connects to the CRM through its public API when both are on.
