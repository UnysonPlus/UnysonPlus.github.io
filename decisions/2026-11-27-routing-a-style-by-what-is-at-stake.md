---
slug: routing-a-style-by-what-is-at-stake
title: Why a generated site picks its design style from what the visitor is risking, not from the industry
authors: [jon]
tags: [site-creator, design, architecture]
date: 2026-11-27
description: Thirty style directions apply cleanly and nothing downstream can tell you a plausible one is wrong. The routing protocol asks what the visitor is risking, what shape the content is, who the audience is and how much theatre the brief earned — because industry is a weak proxy, and the expensive mistake runs in one direction only.
---

**The question:** "I really think we need to come up with a protocol for which design style to use for each type of
website. Like for Kinetic Typography style, it's usually used for magazines or news sites, right?"

<!-- truncate -->

## Context

The Site Creator ships thirty design directions. All thirty apply cleanly, which is the whole problem: the build
applies whatever the spec names, the ship gate measures contrast and Lighthouse, and a site can pass every gate while
looking like the wrong business entirely. Nothing in the pipeline can tell you that a plausible style is the wrong one.

This surfaced on a real build. A car-finance broker was routed to **Swiss**, which the style's own file warns against
in its second paragraph — *"squeezed, it reads as plain rather than as composed"*. The result was correct by every
rule and looked like an unstyled wireframe.

## Options considered

1. **A table from industry to style** — law firm to professional, gym to bold. The obvious shape, and the one that
   breaks first. A car-finance broker and a dental practice are unrelated trades with the *same* design problem: a
   stranger is being asked to trust them with something consequential. A tattoo studio and a record label are equally
   unrelated and share the opposite problem: nobody doubts they can do the work, so the site has to be interesting or
   it has failed. Industry predicts neither.
2. **Research the question properly** — a study of which aesthetic suits which sector, written up as guidance. This
   was considered seriously and rejected: the industry-to-style mapping is the artifact such research produces, and it
   is the artifact that had just failed. More prose that nothing enforces does not change a build.
3. **Route on the job the page is doing**, in four ordered questions, with a named list of traps.

## Decision

Option 3, written as [`styles/choosing.md`](https://docs.unysonplus.com/) in the AI Dev Kit and read at step 1 of the
create-site flow, with the spec gaining a `style_reason` field so the argument travels with the value.

The four questions, in order:

1. **What is the visitor risking?** Money, health, legal standing or their home gives a *conservative* register; a
   booking or a purchase gives *contemporary*; only their attention gives *expressive*.
2. **What shape is the content?** Long-form text, photography-led, product and data, a single short page, or
   irregular — each rules some directions out.
3. **Who is the audience, in their own register?** Consumers, businesses, developers and collectors are four
   different rooms.
4. **How much theatre has the brief earned?** Quiet, Measured or Full, defaulting to Measured.

The file also carries a **traps** section: nine styles that apply perfectly and are usually the wrong answer, each
with the reason. Swiss heads it, quoting its own warning. Neumorphism is there because its contrast is low *by
construction* — one surface colour with shape from light alone — so it fights the palette rule at every control.

## Why

**The failure is asymmetric, and that is what makes the first question the deciding one.** An expressive style on a
high-stake business reads as inexperience, which is the most expensive impression a site can make. A conservative
style on a creative business reads as dull, which costs less and is easier to fix. A protocol that gets only this
right is already worth having.

Recording `style_reason` matters more than it looks. A style id alone is unfalsifiable — a later reader cannot tell a
considered choice from a default. A sentence in the protocol's own terms makes a wrong pick visible as a wrong
*argument*, which is something a person can disagree with.

### The correction that prompted the question

Kinetic Typography sounds like it belongs to magazines. It is a full page style with its own preset and specimen
page, but its register is the one its own brief names — *festival graphics, protest posters, underground zines* — at
an 8–10x ratio between headline and body, uppercase at `line-height: 0.82`. That is a poster. Give it a news page and
the headline fills the screen with nowhere to put the article. **Magazines and news are Newsprint**, or Professional
and Academia for the long-read register.

Separately, *kinetic typography* as **motion** — animated lettering, lyric-video text — is a Kinetic Scenes job, not a
site style. Two unrelated things share the word, and the table says so explicitly so the pairing is not encoded wrong.

### What the level does and does not license

A follow-up correction, recorded here because it caused the original failure: **Measured is not undecorated.** The
level governs how many ideas a build spends, never whether it uses the framework at all. At Measured a site still
gets its surfaces chosen rather than defaulted, one band with real texture, one considered edge, presets edited rather
than accepted, and exactly one signature moment. Even Quiet chooses its presets. Reading a level as permission to
leave the component library unopened is how a correct build comes out generic.
