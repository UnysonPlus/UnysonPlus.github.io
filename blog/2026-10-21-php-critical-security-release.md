---
slug: php-critical-security-release-october-2026
title: "Critical PHP security release — what Unyson+ users need to do"
authors: [jon]
tags: [security, announcement]
date: 2026-10-21
description: PHP is shipping an emergency fix for two critical remote code execution flaws. This is a server-level update, not an Unyson+ one — here is what to check.
---

The PHP Foundation is shipping an emergency security release today that fixes **two critical
remote code execution vulnerabilities in PHP itself**. The UK's National Cyber Security Centre
has issued an advisory urging organisations to update immediately.

**There is nothing to update in Unyson+.** The flaw is in the PHP interpreter your web host runs,
not in the framework, the theme or any extension. No plugin update will fix it, and you do not
need to wait for one from us.

<!-- truncate -->

## What is happening

Two vulnerabilities, both rated **9.2 — Critical**. Details leaked ahead of the planned
disclosure, which is why the warnings went public before the patch existed. The fix is scheduled
for **21 October 2026 at 14:00 UTC**.

Remote code execution means an attacker who can reach your server may be able to run their own
code on it. For a public website, that is as serious as it gets, which is why the NCSC advisory
goes as far as suggesting organisations take systems offline if they cannot patch promptly.

At the time of writing the affected version list has not been published. Reports conflict on
whether only PHP 8 is affected or earlier branches too, so wait for the official release notes
rather than assuming you are clear.

## What to do

**1. Find out what PHP version your site runs.** In WordPress, go to **Tools → Site Health →
Info → Server**. The PHP version is listed there.

**2. Ask your host, or check their status page.** This is their update to apply, not yours.
Managed WordPress hosts usually roll out a PHP security patch within hours and often without you
doing anything. Shared cPanel hosting tends to be slower, and that is where the real exposure
sits. If your host has not said anything by tomorrow, open a ticket and ask directly when they
are applying it.

**3. If your host lets you choose the PHP version yourself,** switch to the patched release once
it is out. Most control panels expose this under a "PHP version" or "MultiPHP" selector.

**4. Keep WordPress, your theme and your plugins current as usual.** That does not fix this
particular problem, but a server running old PHP alongside old everything else is a much easier
target.

## What this does not affect

Static sites are not affected at all — if a site has no PHP, there is nothing here to exploit.
That includes anything published through GitHub Pages or a similar static host.

## Where to read more

- [NCSC advisory](https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php) — the
  official UK government guidance, updated as the situation develops
- [PHP Foundation announcement](https://discourse.thephp.foundation/t/announce-upcoming-critical-php-security-release/6251)
  — the source notice, and where the affected versions will be confirmed
- [php.net downloads](https://www.php.net/downloads) — the released versions themselves

Press coverage refers to these as CVE-2026-109618 and CVE-2026-109619. Those identifiers come
from reporting rather than from the Foundation's own notice, so treat the official release notes
as the authority.

We will update this post once the release is out and the affected versions are confirmed.
