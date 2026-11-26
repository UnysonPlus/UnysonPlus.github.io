---
slug: design-skills-stay-out-of-the-kit
title: Why third-party design skills and scraped style libraries stay out of the AI Dev Kit
authors: [jon]
tags: [site-creator, design, documentation, architecture]
date: 2026-11-27
description: A generated site looked generic, so the obvious fix was to bundle a design skill or adopt a library of style specs scraped from real sites. Neither addresses the actual failure, one of them cannot be licensed, and the kit already had the tool that would have caught it.
---

**The question:** "Why is it that every time you create a website from scratch, it always ends up as generic AI slop?
Should we gather prompts like a public UI library to improve site creation? Should we put design skills like
`impeccable` inside the AI Dev Kit?"

<!-- truncate -->

## Context

A generated site came out flat — correct contrast, correct structure, and nothing anyone would look at twice. The
instinct was that the kit lacks design taste and should import some: either the design skills already installed in
the workspace, or a public catalogue of design specs.

The diagnosis did not survive inspection. Four things had gone wrong on that build, and **none of them was a matter
of taste**:

- The **Animation Engine was inactive**. It ships that way in the core plugin, so all of its modules — animated
  backgrounds, scroll reveals, text effects, marquees, parallax — were silently absent, with no error to say so.
- **Twelve background patterns and six shape dividers** were one option away on bands the build was already creating.
  Nothing told it they existed.
- **The signature-moment rule was mandatory and ignorable**, because nothing asked for its output.
- `padding_top` **was not an option at all** on the element being used, so every band's padding was silently dropped
  and rendered at the stock value.

Missing inventory and missing enforcement, four times over.

## Options considered

1. **Bundle an existing design skill** (`impeccable` or similar) into the kit. It carries real design judgment, and
   it is already written.
2. **Adopt a public library of style specs.** The candidate was a free catalogue of roughly 1,300 `DESIGN.md` files
   aimed at coding agents, each holding the colours, type and rules of a real company's website.
3. **Write the inventory and the enforcement the kit was missing**, and keep pointing at outside skills as optional.

## Decision

Option 3.

The kit gained a **components inventory** — every pattern, divider, surface, box preset, animated background, scroll
reveal and module, with its option id and value shape — written in the same shape as the imagery rule that had
already proved itself. The rule is *a band carrying no component needs a reason*. The Animation Engine switch became
step 0 of the design-system phase. The signature moment became a **ship-gate check that demands one written
sentence**, with no sentence meaning no pass.

Outside design skills stay outside, recommended rather than bundled. The scraped style catalogue is not adopted at
all.

## Why

**A design skill would not have caught any of the four failures.** Every one was mechanical — a non-existent option
name, an inert CSS property, an extension switched off, a rule nothing checked. A skill written for CSS and React
authorship cannot know the Unyson+ option surface, so it would have had nothing to say about any of them while
appearing to address the complaint.

**Bundling also contradicts rules the kit already holds.** The styles library says to reuse rather than duplicate and
that we do not ship other people's words. The same question was settled for the three.js skills pack: do not bundle a
third-party pack, recommend it opt-in, and if it proves useful write a small kit-native skill that links to it rather
than copying it. The reasoning transfers intact.

**The scraped catalogue fails on licensing, not taste.** Its value is precisely the brand name attached to each
spec — it is a set of design specifications extracted from named real companies' websites, offered free with no
licence stated and no permission from any of those brands. That collides head-on with the standing rule that no
external site or brand name appears anywhere in or shipping with UnysonPlus. Looking at such a catalogue the way one
looks at any website is ordinary reference; turning it into kit content is not available to us.

**The underlying instinct was right, though, and is worth keeping:** a dense, concrete spec beats prose guidance. The
kit already has thirty of those, written in our own vocabulary against Theme Settings values. The gap was never the
number of style descriptions.

### The part that stung

The kit already shipped `layout-audit.mjs`, and the ship gate already named it the **primary** lens for a created
site. It had simply never been run. On its first run against the generated page it immediately failed a heading
sitting 22px under an 80px shape divider — a blocking finding, invisible in a screenshot, and exactly the case its
own header says it was written for.

So the fix for the missing tool was not to build one. It was to make the existing one unskippable: the gate now
spells out the loop across every page, and the skill carries the command inline rather than a link. **The gap was
never tooling or taste. It was that nothing required either to be used.**
