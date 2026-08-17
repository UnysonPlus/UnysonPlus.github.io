---
slug: rate-limiting-public-endpoints
title: "Every public endpoint already checked a nonce. Why add rate limiting?"
authors: [jon]
tags: [security, architecture, performance]
date: 2026-08-17
description: The framework's six wp_ajax_nopriv_ endpoints all verified a nonce, sanitized input and validated it — and one of them sent an email on every call with nothing stopping a loop. Decision — a shared limiter keyed on a salted IP hash, REMOTE_ADDR only, failing open, with editors exempt. Each of those four choices had a defensible opposite.
---

**The question:** an audit flagged "no rate limiting" on the framework's public AJAX
endpoints. But every one of them verifies a nonce, sanitizes its input and validates it.
Is a nonce not sufficient?

<!-- truncate -->

## Context

Six actions are registered with `wp_ajax_nopriv_*` so front-end features work for
logged-out visitors: newsletter signup, posts load-more and filter, portfolio load, and
two WooCommerce endpoints.

They are written carefully. `fw_newsletter_subscribe` checks a nonce, has a honeypot,
runs `sanitize_email()` then validates with `is_email()`, and passes the source URL
through `esc_url_raw()`. That is better than most plugins manage.

**A nonce is not a secret on a public page.** It is printed into the HTML every visitor
receives. Anyone can read it and replay the endpoint as fast as they can open
connections. Nonce verification proves a request came from a page we rendered; it says
nothing about how many times.

That is tolerable for a `WP_Query`. It is not tolerable for the newsletter handler, which
calls `wp_mail()` on every successful request. Unthrottled, that is an outbound mail
flood, an unusable inbox, and on a shared host a damaged sending reputation. A grep for
throttling across the entire plugin returned nothing.

## Options considered

**A CAPTCHA on the form.** Solves the mail case, adds a third-party dependency, hurts
conversion, and does nothing for the five query-backed endpoints.

**Per-endpoint ad-hoc guards.** Fastest to write, guarantees six subtly different
implementations and six places to get it wrong.

**One shared helper in core.** More upfront design; one definition of "too often" that
extension authors can also reach for.

## Decision

A shared limiter in core — `fw_rate_limit_exceeded()`, `fw_rate_limit_ajax()`,
`fw_rate_limit_id()` — applied to all six, with limits set from what each request *costs*:
5 per 10 minutes for newsletter signup, 40–90 per minute for the query-backed ones.

Four sub-decisions mattered more than the structure, and each has a reasonable opposite:

**Hash the IP.** Without a persistent object cache these counters live in the options
table. A throttle should not quietly accumulate a log of visitor IP addresses as a side
effect of counting. A salted hash counts identically and is not personal data at rest.

**`REMOTE_ADDR` only.** The opposite — reading `X-Forwarded-For` — is what most
implementations do, and it is exactly backwards: that header is caller-controlled unless a
known proxy sets it, so trusting it by default lets anyone bypass every limit by varying
one header. Sites genuinely behind a proxy supply the real address through
`fw_rate_limit_client_ip`, having validated the proxy themselves.

**Fail open.** If the transient layer misbehaves, visitors keep working and the site loses
throttling. Failing closed would let a cache problem take the front end down — a worse
outcome than the one being prevented. This is the choice most likely to be questioned, and
it is deliberate: the limiter protects against nuisance, not against an adversary who can
also break your cache.

**Exempt `edit_posts`.** They are authenticated, already trusted with far more damaging
capabilities, and are the people most likely to trip a limit while legitimately testing
their own form.

## Why

The framing that settled it: **authentication, authorization and rate are three different
questions.** A nonce answers the second. The codebase had conflated it with the third
because for most endpoints the distinction costs nothing — and then one endpoint sent
mail.

Being honest about the ceiling also shaped the design. This runs inside PHP, so WordPress
has already booted by the time it says no. It is a courtesy limiter, not a DDoS defence;
anything at that scale belongs in front of the application. Naming that plainly in the
source keeps someone from mistaking it for perimeter security later.

## The part worth remembering

The first implementation had a bug that testing caught and review would not have:
`set_transient( $key, $hits, 0 )` was used to mean "update the count, keep the existing
expiry". **In WordPress an expiry of `0` means the transient never expires.** That would
have overwritten the draining counter with a permanent one and locked a visitor out of the
endpoint *for the life of the site* — a rate limiter that becomes a permanent ban is
strictly worse than no rate limiter.

It now carries the remaining TTL forward, and falls back to a sliding window when a
persistent object cache is handling transients and `_transient_timeout_*` is absent.

The test that found it was not "does it block at 6" — that passed from the start. It was
"does it stop blocking afterwards".

## Status

Accepted, shipped in core 2.16.20. Verified over real HTTP: five signups succeed, the
sixth returns 429, and the counter drains when the window elapses.
