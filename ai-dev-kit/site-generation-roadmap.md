---
title: Site Generation Roadmap
sidebar_label: Site Generation Roadmap
sidebar_position: 8.5
description: The phased plan for building beautiful animated Unyson+ sites from scratch with AI — a curated catalogue of section recipes that outputs editable page-builder pages, not throwaway React.
---

# Site generation roadmap

The Site Converter answers "I have a site, make it Unyson+". This page is about the other half:
**"I have nothing, make me a beautiful animated site"** — AI-assisted creation from a brief, seeded
by a curated library of Unyson+ **section recipes** so the result is composed rather than improvised.

:::note Status: planned, not started
Nothing on this page is built yet. It is here so the plan survives outside a chat log — see
[the house rule on roadmaps](/decisions). Pricing, ordering and scope will move; the framing below is
what we have agreed so far.
:::

## Why this, and why now

Prompt-to-site tools are everywhere, and they all produce the same thing: **React and Tailwind** that
a WordPress user then has to rebuild by hand. The output looks good in a screenshot and is of no use
on the site they actually run.

That gap is the opportunity. Unyson+ already owns the hard parts — a page builder with a real data
model, Theme Settings presets, and the Animation Engine for motion. A generator that emits **our**
vocabulary produces a page the person can open in the builder and edit on the spot. Nothing is
transcribed, nothing is rebuilt.

We surveyed a public library of ~130 motion-generation prompts to learn what people actually ask for.
The shape of that demand is lopsided and useful to know:

| Archetype | Share of the sample |
| --- | --- |
| Hero sections | ~68% |
| Navbars | ~14% |
| Buttons | ~14% |
| Video backgrounds | ~12% |
| Marquees | ~11% |
| Badges, feature grids, footers, CTAs | the remainder |

Recurring treatments: video backgrounds, glassmorphism, dark mode, and light 3D. Landing pages and
heroes dominate; whole-site generation is rare.

:::caution We take the taxonomy, not the library
That survey is **inspiration for categorisation only**. We do not bundle, copy or redistribute any of
it: its preview media sits on someone else's CDN, and its entries carry third-party brand names.
Every recipe we ship is authored here, and every preview points at **our own demo pages**.
:::

## The principle: native output is the moat

A recipe must emit **page-builder JSON + Unyson+ shortcodes + Animation Engine effects**, with design
tokens applied through **Theme Settings presets** rather than baked onto each element. That one rule
is what separates this from every prompt-to-React tool, and it is also what keeps the output
maintainable: change the preset later and every section wearing it changes with it.

It follows that porting an existing prompt library is not possible even in principle — those prompts
describe React components. What transfers is the *taxonomy*: which archetypes matter, and in what
proportion.

## Phase 1 — The archetype catalogue

A curated set of **section archetypes**, each one a small document in the kit holding:

- **When to use it** — the job the section does on a page, in plain language.
- **The composition** — the exact shortcode arrangement, as a builder-JSON template.
- **The motion** — which Animation Engine effect(s) pair with it, and the restrained default.
- **The tokens** — which Theme Settings presets it expects, so colour and type come from the design
  system rather than from the recipe.
- **A live preview** — a link to the matching demo page on our own demos network.

Start where the demand is, not at 130 entries: **heroes, navbars, feature grids, CTAs, footers and
marquees**. Breadth is the trap here; a dozen recipes that produce genuinely good pages beat a
hundred that produce plausible ones.

## Phase 2 — The composition guide

A catalogue of parts is not a site. Phase 2 is the sequencing layer that turns a brief into a page,
and it slots onto the existing build protocol rather than replacing it:

**Design system first → chrome (header/footer) → sections, region by region → motion → ship gate.**

This is the same order a careful human build follows, and the same order the conversion protocol
already enforces. The generator should not be allowed to skip to "write sections" any more than we
are.

## Phase 3 — From a brief

Only once the parts and the sequencing are sound: take a plain-language brief ("a barber shop, warm
and dark, booking-led") and compose a whole page from the catalogue — picking archetypes, filling
copy, selecting a palette, and applying motion within the budget.

## At a glance

| Phase | Deliverable | Impact |
| --- | --- | --- |
| **1** | Section archetype catalogue (the high-frequency set) | High |
| **2** | Composition guide wired onto the build protocol | High |
| **3** | Brief → composed page | Very high |

## Risks we are naming up front

- **Scope.** The temptation is to cover everything. The sample is 68% heroes; shipping six excellent
  archetypes is worth more than sixty thin ones.
- **A quality bar per recipe, not per release.** Each archetype carries the same accessibility and
  performance obligations as everything else we ship — reduced-motion handling, a sane Web Vitals
  cost, real content in the HTML. A recipe that fails the ship gate does not go in the catalogue.
- **Drift.** Recipes store option *values*, so they go stale when shortcode options change — the same
  maintenance problem we already manage for the Preset Library and the documentation screenshots, and
  it needs the same discipline rather than a new one.

## What this is not

- Not a React or Tailwind generator, and not a port of anyone else's prompt library.
- Not a replacement for the Site Converter — conversion and generation are two entry points to the
  same builder.
- Not a licence to bundle third-party preview media or brand names. See the caution above.
