---
slug: converter-feedback-findings-and-consent-cadence
title: "Converter feedback: carry the agent's got-vs-expected, and how often may it ask to send?"
authors: [jon]
tags: [conversion, architecture]
date: 2026-08-03
description: "The Site Converter's upstream feedback (--share → Google Form) auto-generates a structural report from the converter's own trace. Two questions: does that give the maintainer enough to act on, and how should an external AI agent handle consent — batch or per-bug, and may it re-ask after a no? We added an agent-supplied findings[] (got-vs-expected) channel and fixed the consent cadence to once-per-site, one-yes-covers-the-report, a-no-is-final."
---

**The questions:** the opt-in `--share` flow sanitizes each conversion into a structural-only JSON and
POSTs it to a Google Form. (1) Will an external developer's AI agent send us something we can actually
use to improve the converter? (2) What's the right consent cadence — does it send cumulatively or per
bug; does one "yes" cover the rest of the site; and is it OK to keep asking after a "no"?

<!-- truncate -->

## Context
The share report is **auto-generated from the converter's own trace** — the agent's only real decision is
*whether* to run `--share`, not what to put in it. The payload carries per-element `role / detected /
mapped-shortcode / fallback+opportunity flags / the converter's own "why" / tag / class tokens`, section
decisions + styling-drop property names, aggregate stats, and a salted host hash. Anonymization is solid
(no URL, content, images, links, PII).

Two gaps surfaced in the audit:

1. **Got, but not expected.** The build protocol tells the agent to flag misses as "element → got vs.
   expected," but the payload had no `expected` field and no free-text — so the agent's *diagnosis* (the
   single most actionable signal) was dropped, and a **confident-but-wrong** mapping (no fallback flag, so
   the row looks clean — exactly the class of bug we fixed all week) was **invisible**.
2. **Consent cadence was unspecified.** The protocol said only "get consent," leaving room for an
   over-eager agent to fire per bug, re-ask after a yes, or nag after a no.

## Options considered
- **Add many Google Form fields per finding.** Rejected — the `payload` field is an opaque JSON blob; more
  fields = field-id churn and a brittle schema. A single JSON blob + one human summary is the right shape.
- **Leave the payload as-is; rely on aggregate mining.** Rejected — good for *ranking* recurring misses,
  but never recovers "what it should have been" for a specific/novel miss, and can't see silent-wrong maps.
- **Add an agent-supplied `findings[]` inside the existing payload JSON** (no Form change), enrich the
  summary with a findings count, and codify the consent cadence in the protocol. **Chosen.**

## Decision
- **`findings[]` rides inside the payload JSON** (`{ ref, got, expected, note, systematic }`), written by
  the agent to `share-findings.json` and merged by `--share`. `note` is capped at 120 chars and
  auto-redacted of URLs/emails/quoted content, so it stays structural. The `summary` field gains an
  `N agent-findings` count for at-a-glance Sheet triage. **No new Google Form field is required** — the
  data is a new key in the opaque blob; an optional human-readable "findings" field is a Tier-2 ergonomics
  nice-to-have, not needed for the mechanism.
- **Consent cadence: ASK ONCE → then auto-send each bug with a notification** (explicit in
  `site-build-protocol.md`). The agent asks **exactly once, upfront**; a **yes** authorizes streaming for the
  WHOLE site, and it then sends each finding immediately via a new `send-finding.mjs` (a lean
  `{ hostHash, version, one finding }` ≈ a few hundred bytes, throttled ≥1s apart) and **notifies the user
  concisely each time** (`⚑ reported: code_block → special_heading`). A stats-only `--summary` goes once per
  site. **Never ask per bug; a "no" is final** (never re-prompt); consent is the site *owner's* so it does
  not carry to a different site. A **batch** alternative (`share-findings.json` + `--share`, one report at the
  end) remains for those who prefer it.

## Why
The auto report is a good *aggregate* signal and a safe pipe, but it isn't a precise bug channel until the
agent's got-vs-expected can travel — so we gave it a sanitized field inside the existing blob rather than
restructuring the transport.

On cadence we iterated. A pure end-of-run **batch** keeps the Sheet clean, but (a) a very large page's full
report can approach the 50k Google-Sheets cell limit, and (b) a single silent send is *less* transparent —
the owner consents to an unseen blob. **Per-bug** sending fixes size but risks Sheet noise, burst
rate-limiting, and the ask-per-bug dark pattern. The chosen **ask-once → stream + notify** takes the best of
both: one informed yes (no nagging), **lean** per-bug payloads that can never hit the cell limit however many
bugs a site has, and a **per-bug notification** that makes the single consent genuinely informed (the user
watches what goes out and can stop it). Throttling neutralizes the rate-limit risk; a once-per-site `stats`
summary preserves the aggregate signal without repeating the report. Consent still belongs to the
site/owner, and a "no" is still final — re-asking would be a coercive dark pattern that erodes an opt-in
feature. (Superseded the initial "batch once per site" conclusion after weighing size + transparency.)
