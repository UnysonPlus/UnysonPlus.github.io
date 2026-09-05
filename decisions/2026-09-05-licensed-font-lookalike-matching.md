---
slug: licensed-font-lookalike-matching
title: "Matching a licensed display font to a free lookalike: a curated deterministic map, not a per-conversion AI call"
authors: [jon]
tags: [conversion, typography, architecture]
date: 2026-09-05
description: "jukeboxburgers.com sets its headings in the commercial Neutraface Condensed Titling, backed by the web-safe Alfa Slab One. The converter can't rehost the licensed face, so it must render headings in the nearest FREE Google font. The reported symptom — headings rendering in Alfa Slab One (a wide slab, wrong proportions) — looked like the converter had 'ruled Alfa Slab One is closest'. It hadn't: the curated map already routes Neutraface → Oswald, but two plumbing bugs meant the lookalike was never inserted, so the browser fell through to the source's own coarse fallback. The question this raised — is a curated map the right tool, or should the local AI pick the match? The decision: keep the deterministic curated map + shape heuristic as the authoritative path (fast, offline, reproducible, reviewable), and reserve any AI assist for the narrow unknown-face fallback, cached back into the map — never a per-conversion model call on the hot path."
---

**The question:** jukeboxburgers.com sets its headings in **Neutraface Condensed Titling** — a commercial face we can't legally rehost — with the web-safe **Alfa Slab One** declared after it. Headings were rendering in Alfa Slab One (a *wide* slab — completely wrong proportions for a *condensed titling* face). Why did the converter "rule Alfa Slab One the closest match", and is there a fundamentally better way to pick the nearest font — should the **local AI** do it?

<!-- truncate -->

## Context

The converter never rehosts a licensed primary (a licensing minefield: Neutraface, Gotham, Avenir, DIN … are all paid). Instead it inserts the closest **free Google font** into the heading stack, right after the primary, so a heading that can't load its real face renders in a near-match rather than collapsing to the source's coarse web-safe fallback. That lookalike is chosen by `google_lookalike()` — a **curated map** of well-known commercial families → their closest free Google font (`neutraface → Oswald`, `gotham → Montserrat`, `futura → Poppins`, …), backed by a **name-shape heuristic** (a name containing *condensed/narrow* → Oswald, *slab* → Roboto Slab, *script* → Dancing Script, *titling/poster* → Anton, and so on).

So the premise was already false: the map **does** know `neutraface → Oswald`, and Oswald is exactly what independent research recommends for a condensed titling face (the geometric alternatives people suggest for Neutraface — Josefin Sans, Avenir Next — match the *non-condensed* Neutraface; the condensed titling cut wants a condensed grotesque, and Titling Gothic Condensed isn't on Google Fonts). The converter wasn't *choosing* Alfa Slab One at all. **Two plumbing bugs** meant the lookalike was never inserted, so the browser simply fell through to the next loadable face in the source's own stack — Alfa Slab One:

1. **The lookalike detector was fed the wrong value.** It keys off a stack carrying a *second named fallback* (the signal that the primary is a self-hosted/licensed face). But that signal was read from the single-family `fonts.heading` (`"Neutraface Condensed Titling"` alone), which collapses to "no fallback" — while the real multi-family stack sat unused in `fonts.heading_stack`. Fixed by preferring `heading_stack`.
2. **Two emit paths, only one patched.** Even with the stack right, `--font-heading` is emitted from a *different* method (`typography_layer`) that reads the raw captured stack — and the full theme CSS from yet another. Both bypassed the lookalike insertion. Worse, a carried **id-scoped section rule** (`#section-1 h2{font-family:"Neutraface…","Alfa Slab One",cursive}`, specificity 0,1,1) out-ranks the global `:is(h1…)` stack, so the hero heading stayed on Alfa Slab One even after the global var was fixed. Fixed by routing every emit path — the global var *and* the carried per-section/chrome CSS — through one shared `stack_with_lookalike()` / `augment_carried_font_stacks()` pass (web-safe/body families skipped so ordinary text is untouched; idempotent).

With both fixed, every heading — hero included — now renders in **Oswald** (rehosted locally), matching the source's condensed proportions.

That left the real design question the symptom raised: **is a curated map the right tool for font similarity, or should the local AI pick the match per conversion?**

## Options considered

- **Curated deterministic map + shape heuristic (status quo, now fixed).** A hand-authored table of the ~40 famous commercial faces → free Google lookalikes, plus shape-word fallbacks. *Pro:* instant, offline, 100% reproducible, reviewable and correctable in one place, and correct for the faces that actually show up (the commercial-font long tail is short — a few dozen families cover almost every real site). *Con:* returns nothing for a genuinely unknown, shapeless family name.
- **Local-AI match on the hot path.** Ask the bundled local model "closest free Google font to X" for every heading face. *Pro:* handles unknown names; *cons:* **non-deterministic** (two runs of the same site can diverge), adds latency + a model dependency to a step that must run headless on any host, and is *unreviewable* (no single place to see or fix the mapping). Font similarity is also a nearly-closed problem — a lookup table is the natural representation, not a generative one.
- **AI as a narrow fallback, cached into the map.** Keep the map authoritative; consult the AI **only** when `google_lookalike()` returns '' (unknown shape), and fold any answer back into the curated table as a durable entry. *Pro:* determinism preserved for the common case, AI cost paid only on a true miss, and each miss permanently improves the map; *con:* a little more machinery than either pure option.

## Decision

Keep the **curated deterministic map + shape heuristic as the authoritative path**, and fix the plumbing so its answer actually reaches every emitted stack (global heading var *and* carried per-section/chrome CSS, via one shared insertion helper). Do **not** put a model call on the conversion hot path. If unknown-face coverage ever proves insufficient in practice, add AI **only** as a fallback for the `google_lookalike() === ''` case, with its result curated back into the map — never as the primary matcher.

## Why

The bug made it *look* like the matcher was dumb, but the matcher was already right — the failure was that its answer never got applied. So the lesson isn't "the map is too crude, reach for AI"; it's "wire the map's answer through every path." A curated table is the *correct* shape for this problem: font-to-lookalike similarity is a small, slow-changing, human-judgement mapping that benefits from being explicit, diffable, and identical on every run and every host — exactly what a generative call gives up. Determinism matters especially here because the converter is supposed to produce the *same* site twice, and because it runs unattended on arbitrary hosts where a model dependency is a liability, not a feature. Reserving AI for the true unknown-face tail — and caching what it returns back into the map — keeps the fast, reproducible default while letting the rare miss make the deterministic path permanently better. It's the same principle the marquee and catalog recognizers followed: translate into an explicit, editable, native construct wherever the shape is known; fall back to something heavier only where it genuinely isn't.

*Status: Accepted.*
