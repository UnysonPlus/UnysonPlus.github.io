---
slug: motion-snippet-execution-gate
title: "Securing author-written JS: gate execution, not the UI"
authors: [jon]
tags: [security, javascript]
date: 2026-07-24
description: "The Motion Snippet field lets a user write raw GSAP that runs on the front end — arbitrary JavaScript, the classic privilege-escalation surface. The first instinct was to hide the field from users who lack unfiltered_html. That turned out to be both insecure-feeling and functionally broken — gating the choice made the saved value fragile, and hiding UI is not a security boundary anyway. The real gate is at execution, keyed to the page author's capability, exactly as WordPress gates page-level custom scripts."
---

**The question:** the Motion Snippet (rung 5 of the GSAP ladder) lets a user type GSAP that executes
on the front end. That's arbitrary JavaScript — the same trust surface as a Custom HTML block or a
theme's custom-JS box. How do we make it safe without breaking it, and where does the capability
check actually belong?

<!-- truncate -->

## Context

WordPress already has a bar for "this user may supply raw markup/JS": the `unfiltered_html`
capability (admins, and editors on single-site; nobody below). The naive design is "only show the
code field to users who have it." But two things went wrong with that, discovered by building it:

1. **Gating the *choice* corrupted saved data.** The snippet lived as a `custom` choice in the Scroll
   Effect multi-picker. When the choice was only *registered* for capable users, any server-side
   re-validation that ran without that user context — notably `json_to_shortcodes`, which regenerates
   post_content — didn't see `custom` as a valid choice and silently reset the value to `none`. The
   snippet vanished on the next content regeneration.
2. **Hiding UI is not a trust boundary.** A hidden field is still POST-able; a custom role could
   expose it; and the value has to survive round-trips regardless of who's looking. "They can't see
   it" was never actually the security property.

## Options considered

- **UI gate** — only capable users see the field. Fragile (above) and not a real boundary.
- **Save-time sanitize** — strip the code on save for users without the cap (kses-style). Correct as
  *defense in depth*, but on its own it's brittle: it depends on the exact save path running kses,
  and the field's value shape isn't plain markup.
- **Execution gate** *(chosen)* — always allow the field and store the code; only ever *run* it when
  the current page's **author** has `unfiltered_html`, checked per request at output.

## Decision

The `custom` choice is **always** registered (so the value is never reset by re-validation). The code
is base64-stamped into `post_content` as a `data-upw-snip` attribute — static, exactly like every
other `data-upw-g*` attribute, so it survives without re-running shortcodes. Execution is gated at
render: a footer script emits `window.upwSnippetsOK = 1` **only** when the queried singular's author
can `unfiltered_html`, and the runtime runs a snippet **only** if that flag is set. This mirrors the
theme's existing `page_custom_js`, which checks the author capability at `wp_footer` output.

kses stripping the attribute from a non-capable user's save remains true as a second layer, but the
primary guarantee is the per-request execution gate.

## Why

- **The capability question is really "does the responsible author get to run JS on this page?"** —
  and that's an author-and-request property, not a "who is currently editing" property. Checking the
  author at output is the only place that answer is stable and correct. It's also precisely how
  WordPress already treats page-level scripts, so it's a known-good model, not a bespoke one.
- **Separating storage from execution fixes the fragility.** The value is plain data that always
  round-trips; safety doesn't ride on the value being present or absent. A contributor-authored page
  can *contain* a snippet (e.g. pasted by an admin earlier) and it simply won't run until a trusted
  author owns the page — no data loss, no silent reset.
- **Defense in depth without depending on any single layer.** Execution gate (primary) + kses on
  untrusted saves (secondary) + reduced-motion skip + a `new Function` boundary that can't reach the
  options-render AJAX. Any one failing doesn't open the door.

## Status

Accepted. The rule generalizes: **for any author-supplied executable content, store it as inert data
and gate execution on the responsible author's capability per request — never rely on hiding the
input.** Applies to future snippet-like surfaces (custom cursors, custom shaders, etc.).
