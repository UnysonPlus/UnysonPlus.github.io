---
slug: crm-cases-own-statuses
title: "Why do support cases have their own statuses instead of reusing the sales pipeline?"
authors: [jon]
tags: [extensions, storage-model]
date: 2026-10-23
description: "The roadmap said cases would reuse the pipeline engine for their statuses. We built them with four fixed statuses of their own, because the pipeline is an optional module, its stages carry money and probability, and a support status means something different from a sales stage."
---

**The question:** the CRM roadmap planned support cases as "a light support-ticket record that reuses the pipeline
engine for its statuses". When it came to building them, should they?

<!-- truncate -->

## Context

The sales pipeline lives in an optional module. Its stages belong to pipelines that a manager edits, and each stage
carries a win probability and a "stalled after N days" rule; deals end as won or lost. A support case needs four
plain states: new, open, waiting on the customer, solved.

## Options considered

**Reuse pipelines and stages.** One board engine for both. But Support cases would then need the Sales pipeline
module switched on, a "support pipeline" would show up among the sales pipelines and in the sales reports, and every
case status would carry a probability and a won/lost ending that mean nothing for a support request.

**Own statuses, shared look (chosen).** Cases get their own table with four fixed statuses (developers can rename or
add through a filter). The board reuses the deals board's styles and drag behaviour, and the conversation reuses the
CRM timeline, so nothing is built twice that a user would see.

## Decision

Cases have their own statuses and do not depend on the Sales pipeline. What they share with deals is the look of the
board and the timeline, not the data model. Replies thread back by the case number in the subject (`[Case #12]`).

## Why

A site that only does support should not have to switch on sales to get cases, and the sales reports should never
count a support request as an open deal. The parts worth sharing (the board, the timeline) are shared; the parts that
mean something different stay separate.

**Status:** Accepted (CRM 1.0.72).
