---
slug: converter-improvements-via-shared-reports
title: "Who edits the Site Converter — and how kit users feed it back"
authors: [jon]
tags: [conversion, architecture, documentation]
date: 2026-07-19
description: The AI Dev Kit told every agent to improve the converter's algorithm as part of the build — but a site-builder can't (no repos in the reference-driven kit) and shouldn't (a local fork diverges from upstream). So we split the audience, made the conversion report the feedback artifact instead of a code fork, and chose an opt-in, anonymized Google Form → Sheet channel over GitHub issues so submitters need no account and no client's site content ever leaks.
---

**The question:** Should other developers using the AI Dev Kit have their agents change the Site
Converter — and if we instead want them to *report* improvements back, is GitHub the right place,
given not everyone has an account?

<!-- truncate -->

## Context

The **AI Dev Kit** is deliberately **reference-driven**: it ships per-shortcode / per-option-type /
per-module markdown so an agent can build a UnysonPlus site **without** the plugin source. But the
kit's own Phase-0 process told that agent, when the converter mis-maps a *class* of things, to
**"improve the converter algorithm (JS + PHP paths)."** That instruction is a design bug:

- A kit user usually **doesn't have** the converter repos at all (that's the whole point of the
  reference-driven kit), so it *can't* follow the instruction.
- Even when it can, it *shouldn't* — a fix made in a **local** converter copy **diverges from
  upstream**, benefits no one else, and `update.ps1` may clobber it on the next pull.

So there are really **two audiences** the kit had conflated: **site builders** (who just need *this*
site right) and **converter contributors** (who improve the shared algorithm for everyone). The
valuable thing a builder can contribute isn't a code fork — it's the **evidence of the miss**. And
that evidence already exists: every capture writes a **conversion report** tracing each source
element → the shortcode it became, flagging `fallback` (code_block catch-alls), `opportunity`,
`styling-drop`, and over-large/under-segmented sections.

That reframes the question into a channel question — how does a builder get that report to us? — with
two real constraints: many designers/agencies **have no GitHub account**, and a raw report is derived
from a **third party's site** (often a client's unreleased or NDA'd design), so its content can't be
exposed publicly or shipped wholesale to us without copyright/PII risk.

## Options considered

| Option | Trade-off |
|---|---|
| **Kit agents edit the shared converter** (status quo wording) | Can't — no repos in the reference-driven kit. Shouldn't — a local fork diverges, helps no one, and is clobbered on update. |
| **GitHub issues as the intake channel** | Familiar and searchable, but an **account barrier** for non-devs, and a raw report/DOM snippet in a **public** issue **leaks a client's site**. Fine as an optional link, wrong as the front door. |
| **Opt-in, anonymized report → Google Form → Sheet → inbox** | No submitter account, no server to host, structured collection. Payload is **structural-only** so copyright/PII risk is designed out. Consent-gated. Google hosts the endpoint for free. |
| **Self-hosted POST endpoint** | Best UX and auto-aggregation, but needs real hosting + a privacy note. Deferred until hosting exists — and it's a drop-in swap of the Form later. |

## Decision

**Split the audience; make the report (not a code fork) the contribution; ship an opt-in, anonymized
Google-Form channel.**

- **Site builders never fork the shared converter.** They close *this* site's delta with native
  options / `misc_custom_css`. Improving the **algorithm** is a **contributor** task — it requires the
  converter repos and the fix must be **upstreamed and mirrored across BOTH paths** (JS
  `to-pages.mjs` / `capture-extract.mjs` and PHP `-mapper.php` / `-stitch.php`). This is now the
  wording in the kit's `AGENTS.md`, `PLAYBOOK.md`, and `docs/extensions/site-converter.md`.
- **The conversion report is the feedback artifact.** A builder **opts in** to share an **anonymized**
  version upstream instead of editing code.
- **Channel: Google Form → Sheet → the project inbox is primary**; a local `share-report.json` + a
  `mailto:` draft is the fallback; GitHub stays an optional secondary link. A self-hosted endpoint is
  the future upgrade — swapping the `responseUrl` is the only tool-side change. (GitHub Pages, where
  our docs live, can't be that endpoint — it's static and can't receive a POST.)
- **Anonymization is structural-only, and opt-in per run.** The sanitizer keeps element roles,
  detected/mapped shortcode, the fallback/opportunity/styling-drop flags, source tag names, class
  **tokens** (content-bearing arbitrary values like `bg-[url(...)]` are redacted to `bg-[…]`), and
  computed-style property **names**. It strips the **URL/host** (kept only as a salted hash so the same
  site dedupes without being revealed), all **content text**, **images**, **links/hrefs**, and PII.
  Nothing is built or sent unless the developer passes `--share-preview` (build + inspect) or `--share`
  (build + submit) — the latter being the explicit per-run consent.

## Why

- **The report is analytical metadata, not a reproduction of the source work.** "This DOM shape mapped
  to this shortcode; here are its class tokens" is functional data about *our* converter, not the
  client's content — which is what keeps the copyright/GDPR exposure out. Opt-in + anonymized + no
  public exposure is the combination that makes sharing defensible; the risk lived entirely in
  transmitting raw content, so we removed the raw content.
- **A local fork is the anti-pattern.** Per-site converter edits diverge, get clobbered, and help no
  one. Centralizing improvement through reports means every converted site makes the converter smarter
  for **everyone** — the same reason we keep the JS and PHP paths in lockstep rather than letting each
  site carry private patches.
- **Google Form is the lowest-friction real endpoint.** It needs **no submitter account** and **no
  server on our side**, yet it's a genuine POST target (straight to `formResponse`, no URL length
  limit) that lands in a Sheet and notifies the inbox. It gets the loop working *today* and upgrades to
  a hosted endpoint later without changing the tool's UX.

Status: **Accepted.** The client-side half is built and **proven end-to-end** (capture → sanitize →
Google Form → Sheet, verified with zero URL/content/PII leakage). Open/future: a self-hosted endpoint
when hosting is available; an optional sanitized *markup snippet* behind a second explicit consent;
and a retention policy (mark-processed, never auto-delete) on the response Sheet.
