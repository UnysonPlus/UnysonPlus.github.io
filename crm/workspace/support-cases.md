---
sidebar_position: 5
title: "Support cases in the WordPress CRM"
sidebar_label: "Support cases"
description: "Track customer questions and problems in the Unyson+ WordPress CRM: cases with a status, priority, owner and due date, a board and a list, email replies that thread back to the case, and cases opened from contact forms or incoming email."
keywords: [wordpress help desk, support tickets wordpress crm, customer support cases, ticket board wordpress, support email wordpress, contact form to ticket, crm cases]
---

# Support cases

A case is a question or a problem from a customer. It has a **status**, a **priority**, an **owner** and an
optional **due date**, and everything that happens on it (your replies, their answers, internal notes and every
change) stays on its timeline. Switch it on in **CRM → Modules → Support cases**.

## Statuses

| Status | Meaning |
|---|---|
| **New** | Just arrived; nobody has answered yet. |
| **Open** | Someone is working on it. |
| **Waiting on customer** | You asked the customer something and are waiting for their answer. |
| **Solved** | Done. The case page shows how long it took. |

Change the status on the case page's status bar, or drag the card on the board.

## The board and the list

**CRM → Cases** opens a **board** with a column per status. Drag a card to change its status; the counts update
at once. The Solved column shows the last 14 days. Switch to **List** for a table you can sort through by status.

Both views filter by **owner** (everyone's, mine, unassigned or a teammate), **priority**, **age** (older than 1, 3,
7, 14 or 30 days) and a **search** by words or by case number (`#12`). Urgent and high-priority cards are outlined
so they stand out.

## Open a case

- **New case** on the Cases screen, or **Cases → New case** on a contact's or company's page.
- **From a contact form**: in the form's **Add to the CRM** action, set **Also create** to **A support case**.
  The case takes its title from a field such as *Subject* or *Topic* (otherwise the first dropdown, otherwise the
  start of the message), and the whole submission is its first entry. See
  [Forms and signups](../contacts/forms-and-signups.md).
- **From email** (needs the **Email conversations** module and its forwarding address or mailbox): on the List
  view, a CRM manager can turn on **Open a case for each new email a customer sends to the CRM's address**.

A new case goes to the contact's owner. If the contact has none, it goes to the person chosen in **New cases go
to**, or stays unassigned. Someone who only sees their own records sees their cases **and the unassigned ones**,
and can press **Take it** to make one theirs.

## Answer by email

With the **Email conversations** module on and a contact with an email address, the case page has an **Answer**
box. The email goes out with the subject *[Case #12] the case title*, so the customer's answer finds its way back:
it lands on the case's timeline and a case that was waiting or solved opens again. Leave **Then wait for the
customer** ticked to move the case to *Waiting on customer* when you send.

Emails your team sends from a contact's page, and their replies, stay conversations: they never open a case.

**Internal notes** under the answer box are for your team only; they are never emailed.

## On the contact's page

A **Cases** panel lists the contact's (or company's) cases with their status. Their timeline notes when a case
was opened and when it was solved, and the case page lists their other cases beside it.

## For developers

Cases are stored in their own table; the conversation is the case's timeline. Hooks:
`unysonplus_crm_case_created`, `unysonplus_crm_case_updated`, `unysonplus_crm_case_status_changed`,
`unysonplus_crm_case_deleted`, and the filter `unysonplus_crm_case_statuses` to rename or add statuses. See
[PHP API and hooks](../developers/php-api-and-hooks.md).
