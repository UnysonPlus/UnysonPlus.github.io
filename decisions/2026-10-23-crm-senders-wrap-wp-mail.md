---
slug: crm-senders-wrap-wp-mail
title: "How should CRM email reach an email service without rewriting every place that sends mail?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-10-23
description: "The CRM sends mail from campaigns, confirmations, one-to-one email and case replies, all through wp_mail(). To add sender profiles and email services we wrap those calls in a short begin/end scope and let pre_wp_mail hand the message to the chosen service, instead of giving each path its own sending code or taking over every email the site sends."
---

**The question:** campaigns should be able to go out through SendGrid, Mailgun, Postmark, Brevo or Amazon SES, and
marketing email should come from a different address than confirmations and replies. Where does that switch live?

<!-- truncate -->

## Context

Four places in the CRM send mail (the campaign sender, confirmation and welcome emails, one-to-one email, and case
replies), and every one of them calls `wp_mail()`. That is deliberate: the Mailer extension and any SMTP plugin
govern the site's mail through it, and the campaign previewer relies on the sender going through one known path.

## Options considered

**Give each sending path its own service code.** Four copies of "if a service is set, call its API", which would
drift, and every future sender (automations, digests) would need a fifth.

**Take over all of the site's mail.** A global `pre_wp_mail` hook would also catch WooCommerce receipts, password
resets and form notifications, which the CRM has no business rerouting.

**Wrap the CRM's own calls (chosen).** Each CRM path calls `FW_CRM_Senders::begin( 'marketing' | 'transactional' )`
before `wp_mail()` and `end()` after. Only while that scope is open do the CRM's filters set the From name and
address, add the Reply-To and, when the sender uses a service, answer `pre_wp_mail` by sending through the
service's API.

## Decision

Sender profiles and email services act only inside a begin/end scope around the CRM's own `wp_mail()` calls. A
failure from a service is reported through `wp_mail_failed`, the same signal `wp_mail()` gives, so every caller's
existing error handling works unchanged. A service that is not set up, or cannot carry an attachment, leaves the
email to the site's own mail.

## Why

The sending code stays exactly as it was, so the preview still matches the real email and nothing the site sends
outside the CRM is touched. A new sending path only has to open the scope to get senders and services.

**Status:** Accepted (CRM 1.0.73).
