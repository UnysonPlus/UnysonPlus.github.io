---
sidebar_position: 8
title: "Run your membership site with the AI Assistant"
sidebar_label: "With the AI Assistant"
description: "Ask the Unyson+ AI Assistant, or an AI app connected to your site, to set up plans, pages, rules, courses and coupons, look members up and change memberships, in plain words."
keywords: [ai membership site, ai assistant wordpress membership, set up membership with ai, claude membership site, chatgpt wordpress membership, mcp wordpress membership]
---

# Run your membership site with the AI Assistant

With the [AI Assistant](/extensions/ai-assistant) extension on, you can ask an AI to do most Membership
jobs for you in plain words: "make a Free and a Member plan at 8 a month", "lock the Members only category",
"give Jane a free month of Pro", "how many paying members do we have?". It works in the Assistant panel
inside WordPress, and in AI apps you connect to your site (such as Claude or ChatGPT) through the
Assistant's connection.

The AI uses the same steps you would on the Membership screens, with your own permissions: it can only do
what your WordPress account may do.

## What it can do

**Setting up**

- Describe what you have: plans, rules, modules and settings (counts only, never names).
- Switch modules on or off ("turn on Payments and Coupons").
- Create or change plans, with their prices, length, what they include, and options such as which plans
  members may switch to, team seats and devices at once.
- Create the member pages (Join, Log in, My account, Checkout) with their elements already placed, and point
  the settings at them.
- Protect content with access rules, including drip delays ("open this 7 days after joining") and free reads.
- Payment settings: currency, the checkout page, how upgrades are charged, invoice details, which ways to pay
  and the bank-transfer instructions.
- Coupons, a course with its lessons and quizzes, selling one post or page on its own, the wording of member
  emails, and profile fields.

**Running the site**

- Find members by name, email, plan or status.
- Give someone a plan (making an account for a new email if you ask), extend, change plan, cancel, end or
  reactivate a membership.
- Read the Reports numbers: monthly recurring revenue, paying members, lifetime value, trials, month by month.

## What it never does

- **It never handles your payment keys.** Card (Stripe) and PayPal keys are pasted by you under
  **Membership → Payments → Payment settings**. If you ask the AI to set one, it refuses and tells you where
  to paste it.
- **Reports are totals only.** Asking how the site is doing never returns a list of people.
- It does not delete members, plans or payments.

## Things to know

- **Some changes can be undone with one click, some cannot.** Settings, modules, payment settings, emails
  and profile fields are saved as a change the Assistant can undo. Plans, rules, members, coupons and courses
  live in Membership's own tables: the AI tells you what it changed and where to edit it, and you change it
  back there if needed.
- **Check the result as your members see it.** You are an administrator, so you see everything. Use
  **View as** in the admin bar, or a private browser window, to check a protected page.
- **Modules switch on from the next page load.** If you ask for Payments and a coupon in one breath, the AI
  switches Payments on first and makes the coupon in its next step.

## Example requests

- "Set up a membership site: a Free plan, a Member plan at 8 a month or 80 a year, member pages, and lock the
  Members only category for Member."
- "Turn on Courses and make a four-lesson course called Growing vegetables from seed for Pro members, with a
  short quiz after lesson two and a certificate at the end."
- "Make a code SPRING20 for 20% off the first payment, ending on the last day of April."
- "Who joined this week?" then "Extend Tom Okafor's membership to the end of the year."
- "How many paying members do we have, and what is our monthly recurring revenue?"

## Next steps

- [Modules](./modules.md): what each module adds.
- [Access rules](../basics/access-rules.md): how protection works, so you can check what the AI made.
- [Members](../basics/members.md): the same member actions on the screen.
