---
slug: silence-unload-console-violation
title: "Why we silence Chrome's “unload” Permissions-Policy console violation on the editor screens"
authors: [jon]
tags: [page-builder, gutenberg, back-compat]
date: 2026-09-27
description: "Opening the post editor logged a red “[Violation] Permissions policy violation: unload is not allowed in this document” in Chrome's console. It comes from WordPress core's bundled TinyMCE, is completely harmless, and cannot be caught from JavaScript — but a red violation reads as “this plugin is buggy” to anyone who opens DevTools. The decision: on the editor screens only, opt back into `unload` — a Permissions-Policy header for the top document AND an allow=\"unload\" stamp delegating it into TinyMCE's editor iframe — so Chrome stops flagging it and the admin console stays clean."
---

**The question:** Adding a new page logs a red **`[Violation] Permissions policy violation: unload is not allowed in this document`** in Chrome's console, traced to `wp-tinymce.js`. It's harmless — the editor and builder work perfectly — but a red "violation" in DevTools reads as *this plugin is broken* to anyone who looks. Do we leave it (it's not our code), or make it go away?

<!-- truncate -->

## Context

The violation is emitted by **WordPress core's bundled TinyMCE** — the Classic editor, which the builder keeps loaded underneath itself as the "Default Editor" fallback. TinyMCE still registers a legacy `unload` event handler. Chrome is in the middle of **deprecating `unload`**; as its gradual rollout flips the default Permissions Policy for the `unload` feature from allowed to disallowed, the browser logs a red `[Violation]` for every `unload` handler on the page. It is not a script error and nothing malfunctions — it is a browser deprecation notice. There is no `wp-tinymce.js` anywhere in the plugin; the handler is core's.

Two facts shaped the answer:

- **A `[Violation]` can't be caught from JavaScript.** It is native browser console output, not a `console.error`, so overriding `console.*` does nothing. The only way to remove the message is to stop the violation from happening in the first place — i.e. make `unload` allowed again for that document.
- **The message is pure perception risk.** It changes no behavior, but a red line in DevTools is exactly the kind of thing that makes a careful user distrust a product. The cost of the noise is entirely reputational, and it lands on us even though the handler is core's.

## Options considered

- **Leave it, explain it in the docs.** *Pro:* it's genuinely core/TinyMCE, not ours, and it will vanish on its own when WordPress updates TinyMCE. *Con:* every user who opens DevTools sees a red violation attributed (visually) to the editor, and most won't read a doc first — the plugin looks buggy when it isn't.
- **Try to patch TinyMCE to drop the handler.** *Con:* it's WordPress core; any patch is overwritten on the next update and risks breaking the editor. Not viable.
- **Opt back into `unload` on the editor screens (chosen).** Re-allow `unload` so the browser stops reporting TinyMCE's handler. *Pro:* removes the violation at its source, scoped to exactly the screens that load TinyMCE, and becomes a harmless no-op the day WordPress drops `unload`. *Con:* it re-enables a feature the browser is deprecating — but only on admin edit screens, where the downside of `unload` (it disqualifies a page from the back/forward cache) is irrelevant, since you never want a half-typed editor served from bfcache anyway.

  The catch that made this a two-part fix: a `Permissions-Policy: unload=*` **header only grants the feature to the top document.** It does *not* propagate to same-origin iframes created by script — and TinyMCE registers its handler inside its own editor **iframe**. Measured in a browser with the deprecation forced on, the header alone took the editor from three violations down to two; the iframe's stayed. A feature reaches an iframe only when the iframe carries an `allow` attribute, so the header has to be paired with `allow="unload"` on the iframe. Header + iframe-allow together measured **zero** violations.

## Decision

**On the post-editor screens only (`post.php` / `post-new.php`), opt back into `unload` in two places at once:**

1. **Top document** — send `Permissions-Policy: unload=*` (added on `admin_init`, skipped if headers are already sent, appended to rather than clobbering any Permissions-Policy a security layer already set, and deferred entirely if that header already speaks to `unload`).
2. **Iframes** — a tiny script printed early in `admin_head`, before the editor initializes, stamps `allow="unload"` on every iframe at creation, so the feature is delegated into TinyMCE's editor iframe.

Together they take the console from a red violation to clean (verified: zero violations with Chrome's `unload` deprecation forced on). Both halves share one switch, `fw_pb_silence_unload_violation` (default on), for anyone who would rather keep the browser's deprecation warning. Nothing on the front end or any other admin screen is touched.

## Why

The warning is harmless but the *impression* it creates is not, and the impression is the whole problem: a red violation in DevTools makes a working plugin look broken. Since the message is native browser output that can't be caught in JavaScript, the only lever is the document's permission policy — and re-allowing `unload` is the browser-sanctioned way to opt out of the deprecation. It has to be done in both scopes because the handler lives in an iframe and the header stops at the top document; neither half alone clears the console. Scoping it to the two editor screens keeps the change surgical — it only affects pages that actually load the Classic editor, and only re-enables `unload` where bfcache was never wanted. When WordPress finally ships a TinyMCE without the `unload` handler, both halves stop mattering and can be removed with no behavior change; until then they buy a clean console for the cost of one narrowly-scoped, reversible header plus one iframe attribute. Keeping it filterable leaves the browser's deprecation signal available to any developer who prefers to see it.
