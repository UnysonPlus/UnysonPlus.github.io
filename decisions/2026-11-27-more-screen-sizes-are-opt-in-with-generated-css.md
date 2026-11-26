---
slug: more-screen-sizes-are-opt-in-with-generated-css
title: Why Phone landscape, Wide and Full HD sit behind a switch, with their CSS generated from the Large desktop rules
authors: [jon]
tags: [option-types, architecture, css, performance, back-compat, theme-settings]
date: 2026-11-27
description: Roadmap 8e adds three screen sizes to every per-device option. They appear only when a site turns on More Screen Sizes, values set for them survive turning it off, and their layout classes are generated from the existing Large desktop rules into one cached file instead of being shipped to every site.
---

**The question:** Roadmap 8e: "Larger-than-desktop sizes and phone landscape … in every responsive option." Seven tabs
on every per-device control, and three more copies of every layout class. Do we give every site all of that?

<!-- truncate -->

## Context

Per-device options edit four tiers: Phone (base), Tablet (768px), Desktop (992px) and Large desktop (1200px). The
three new ones are Phone landscape (576px), Wide (1400px) and Full HD (1920px), reusing the grid's own `sm` / `xxl`
names so every saved class stays valid.

Two costs come with them. In the editor, every per-device option grows from four tabs to seven, though most sites
never set a value on a turned phone or a 1920px screen. In the page, the layout classes those tabs write
(`fw-span-xxl-4`, `fw-flex-sm-row`, `section--cols-xxl-center`, the spacing and gap utilities) need CSS at each tier,
and the static sheets only carry md / lg / xl copies.

## Options considered

**Showing the tiers:**

1. **Always seven tabs.** Simple and uniform, but it crowds every option for everyone to serve the few who need it.
2. **Opt-in per site.** A Theme Settings switch, off by default. Off, the editor is exactly as before.
3. **Opt-in per option** (a "more sizes" toggle inside each control). Precise, but a hidden state on every option is
   harder to understand than one site-wide choice.

**The CSS:**

1. **Ship three more copies in the static sheets.** Every site pays the bytes, used or not.
2. **Per-element inline CSS.** Only what is used, but each class would need its body known to PHP, and the cascade
   (a Phone landscape rule must lose to a Tablet one) would have to be rebuilt in every view.
3. **Generate the extra tiers from the Large desktop rules,** only on a site that turns the switch on, into one cached
   file loaded after the other styles.

## Decision

Option 2 for the tabs (**Theme Settings → General → Layout → More Screen Sizes**, off by default) and option 3 for the
CSS: the generator rewrites every `-xl` rule in the source sheets' `@media (min-width:1200px)` blocks to `-sm`, `-xxl`
and `-xxxl`, skips classes the sheets already define (Bootstrap's `fw-col-sm-*`), and repeats the md / lg / xl rules
of the same families after the Phone landscape ones so a later Tablet value still wins. The spacing and gap utilities
join the generated Theme Settings CSS the same way, only when the switch is on.

Two rules make the switch safe to flip: a value for an extra tier is **stored only when set** (so pages keep their
four-key shape), and turning the switch **off keeps the values**: they ride along in a hidden panel each time an
element is saved, and come back when it is turned on again.

## Why

- **Nobody pays for what they do not use.** A site that never turns it on has the same editor and the same CSS as
  before, byte for byte.
- **One source for every tier.** The extra tiers are derived from the Large desktop rules, so a fix to an xl rule
  reaches Phone landscape, Wide and Full HD on the next page load, and nothing can drift between copies.
- **The cascade stays mobile-first.** Repeating the md / lg / xl rules after the generated Phone landscape ones keeps
  "a larger screen's value wins" true without touching specificity.
- **Flipping the switch is never destructive.** Off hides and ignores; it does not delete.

One rule needed care: a flex Div's *Responsive Collapse* stacks its children full width below 768px with `!important`.
A width set on the Phone landscape tab is an explicit choice for 576–767px, so the generated file carries an override
for that range that keeps the Div's gap-aware width.

**Status:** Accepted. See [More screen sizes](/options/option-types/responsive#more-screen-sizes).
