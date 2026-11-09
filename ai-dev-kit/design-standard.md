---
title: The Design Standard
sidebar_label: The Design Standard
sidebar_position: 3.8
slug: /design-standard
description: How good a created site has to be before it ships — the four-part design rubric, the three theatre levels, and the one signature moment every Unyson+ site above the quiet level gets.
---

# The design standard

Every site the creator builds is measured twice. The first measurement is the one most tools stop at:
is it fast, is it reachable, is it indexed. The second is newer and harder — **is it any good**.

This page explains the second one, because it decides what you actually get when you ask for a site.

## Why a second measurement exists at all

A generated page can pass every technical check and still be forgettable. Performance 95,
accessibility 100, SEO 100 — and a layout anyone has seen a thousand times. Nothing in a build
pipeline ever objects to that, which is exactly why generated sites tend to look generated.

So the creator carries a design rubric of its own, the same four-part model working design juries use,
re-stated for a page-builder site:

| What is judged | Weight | What it means on your site |
| --- | --- | --- |
| **Design** | 40% | Hierarchy, type, colour, spacing — and whether it holds up on *every* page, not just the home page |
| **Usability** | 30% | Can a visitor tell where they are in three seconds, does it load fast, does the phone layout work |
| **Creativity** | 20% | One idea that belongs to your business and could not be moved to a competitor |
| **Content** | 10% | Real words and real pictures, arranged deliberately |

It is scored out of ten in each category, weighted, and **a site below 7.0 — or below 6 in any single
category — is not finished**. That is not a note attached to a delivered site; it is the build not
being done yet.

:::note Usability is the one that catches people out
At 30%, it outweighs creativity on its own. A beautiful site that loads slowly or breaks on a phone
scores *below* a plain one that works. This is why the creator treats speed and mobile layout as part
of designing a page rather than as a test run afterwards.
:::

## Three levels of theatre

Here is the part worth understanding before you ask for anything, because it is the most common
misunderstanding about award-grade design: **it does not mean maximum animation.**

The quality bar never moves. What changes is how much spectacle the site is allowed, and that is
decided by what the site is *for*.

| Level | Used for | What you get |
| --- | --- | --- |
| **Full** | Brand launches, portfolios, studios, hospitality, property — sites whose job is to be felt | A signature moment with real machinery, page transitions, scroll choreography |
| **Measured** | Most commercial sites — finance, legal, medical, trades, services, B2B | The same care in type, layout, colour and pacing, and one signature moment that makes the subject *clearer* |
| **Quiet** | When you ask for simple | Entrances and state feedback. Nothing that performs |

**Measured is the default**, and it is where most sites should land.

### Say "simple" and you get simple

The level follows your words first. Ask for *"a simple car loan site"*, or basic, or minimal, or
nothing fancy, and you get the Quiet level — a clean, fast, well-typeset site with no performance in
it. Ask for *"a stunning brand launch"* and you get Full. Say nothing either way and you get Measured.

A person who asked for simple and received a scroll-choreographed home page did not get a better site
than they asked for. They got one they now have to strip back, in a builder they are still learning.

### Why your loan site is not a light show

Take the example directly: *"build me a car loan site."* That lands on Measured, and deliberately.

Buying finance is a trust decision. A cinematic hero over a loan application reads as a company
hiding something, and it costs points twice — once with any visitor deciding whether to enter their
income, and once against the 30% usability weight. The spectacle budget goes somewhere more useful: a
**rate explainer that moves as you change the term**, so the numbers become legible. That is an idea
about loans. It earns the creativity marks *and* makes the page work harder.

Measured is not a lesser build. It still has a designed colour system, a real type scale, genuine
content, a phone layout somebody thought about, and one memorable thing. What it does not have is
motion competing with the task the visitor came to do.

## The one signature moment

Above the quiet level, every site gets **exactly one** thing a visitor would describe to someone else.
One per site — not one per page, and not one per section. Everything else stays deliberately still, and
that restraint is what makes the single moment land.

It only counts when all four are true:

1. **It belongs to your business.** Moved to a competitor, it should break. A fade-in is not a
   signature moment, it is a default.
2. **It is where people already look.** A moment nobody scrolls far enough to see did not happen.
3. **It still works when it cannot run.** Reduced motion, keyboard-only, an old phone — each ends
   somewhere readable, and that fallback is designed at the same time, not bolted on later.
4. **It is built from the framework.** An [Animation Engine](/animation-engine/) module, a
   [Kinetic Scene](/kinetic-scenes/), a Motion Gallery, a page transition — never a one-off script
   welded beside the page builder, because you would never be able to edit it again.

### The best ones are things you can touch

The obvious form is motion that plays when you scroll past. It is also the weakest.

The moments that genuinely separate a memorable site from a merely well-made one are usually
**something the visitor operates**, built out of the subject itself: a keyboard site that lets you
type on the product, a loan site whose explainer responds as you drag the term, a studio site whose
work assembles under the cursor.

The test in rule 1 makes the difference obvious. A fade-up transplants to any business in ten seconds.
Something a visitor *uses*, made of your own subject, cannot be transplanted at all.

This costs less than it sounds, because those surfaces already exist as elements — a form that
calculates, a flip card, a gallery, a cursor treatment, a stepped sequence. The work is choosing well,
not building from nothing.

## Each style has its own moves

The creator ships several [design directions](/ai-dev-kit/ai-website-creator) — Swiss, brutalist,
luxury, monochrome, newsprint, modern dark, terminal — and each one names the moments that suit it and
the ones it must never use.

That matters more than it sounds. A cinematic reveal on a Swiss grid is not a bold choice, it is a
style error: it reads as though a different designer was let in halfway through. A luxury site does not
bounce. A newsprint site has no third dimension to animate through. The constraint is what keeps each
direction recognisable.

## What this means in practice

- **Ask in plain language, and say if you want it simple.** That one word changes the level.
- **Expect to be told what was left out.** Content you did not supply stays absent rather than
  invented — and a missing testimonial section is the difference between a site and a demo.
- **Expect a score, with reasons.** Every point lost is attached to a named defect, so it is something
  you can have fixed rather than a verdict you have to accept.
- **A site under the floor is not delivered as "done with notes".** It goes back.

## For agents working in the kit

The standard is `docs/site-creator/design-jury.md` in the AI Dev Kit — the rubric, the level routing,
the signature-moment definition, a worked score, and the honesty rules that stop a self-scored pass
from flattering itself. The build rules that enforce it are rules 11 and 12 in
`skills/create-site/build-rules.md`, and the scored pass is check 5 of
`docs/site-creator/ship-gate.md`.

Performance, accessibility and SEO targets are not repeated there. They stay in the Site Converter's
standards document, which remains the one authority for them; their numbers feed the usability score
rather than duplicating it.
