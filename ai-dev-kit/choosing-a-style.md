---
title: Choosing a Style
sidebar_label: Choosing a Style
sidebar_position: 3.75
slug: /choosing-a-style
description: The creator ships thirty design directions and all of them apply cleanly, so nothing downstream can tell you a plausible one is wrong. This is how to pick — by what your visitor is risking, not by what industry you are in.
---

# Choosing a style

The creator ships **thirty design directions**, and every one of them applies cleanly. That sounds like
generosity and is actually the hard part: your site can pass every check — contrast, speed,
accessibility, structure — and still look like the wrong business entirely. No tool can tell you that a
plausible style is the wrong one.

A style is not a coat of paint. It is a claim about what kind of organisation you are, made before anyone
reads a word.

:::tip Pick it before the build, not after
Styles differ in which section shapes they use, not only in colour and type. Changing one after the pages
exist means rebuilding the pages. Settle it with the spec.
:::

## Do not pick by industry

The obvious approach — *law firm, therefore serious; gym, therefore bold* — is the one to resist, because
industry turns out to be a weak predictor.

A car-finance broker and a dental practice are in unrelated trades and have the **same** design problem: a
stranger is being asked to trust them with something consequential, so the site has to read as careful. A
tattoo studio and a record label are equally unrelated and share the opposite problem: nobody doubts they
can do the work, so the site has to be *interesting* or it has failed.

Pick by the job the page is doing. Four questions, in order.

## 1. What is your visitor risking?

This is the deciding question.

| What is at stake | What your design must do | Register |
| --- | --- | --- |
| Money, health, legal standing, their home | Look like you will still be here next year | **Conservative** |
| A booking, a purchase, a subscription | Look competent and current | **Contemporary** |
| Their time and attention only | Be worth looking at | **Expressive** |

**The mistake runs one way far more often than the other.** An expressive style on a high-stake business
reads as inexperience, which is the most expensive impression a website can make. A conservative style on
a creative business reads as dull — which costs less, and is easier to fix later.

## 2. What shape is your content?

| You have | Reach for | Avoid |
| --- | --- | --- |
| Long articles, many pages | Professional, Academia, Newsprint, Monochrome | Poster styles — nowhere to put 600 words |
| Photography, few words | Luxury, Botanical, Organic, Monochrome | Loud surfaces that fight the picture |
| A product, data, features | Modern Dark, Enterprise, SaaS, Flat Design | Textured and ornamental styles |
| One short page, one message | Bold Typography, Kinetic, Neo-brutalism | Dense editorial styles |
| Sections with no shared rhythm | SaaS, Enterprise, Material, Modern Dark | **Swiss** — see the traps |

## 3. Who is your audience, in their own register?

Consumers, businesses, developers and collectors are four different rooms. Terminal and Web3 are fluent to
one audience and illegible to the rest. Claymorphism and Playful Geometric read as friendly to consumers
and as unserious to a procurement committee.

## 4. How much spectacle has the brief earned?

Quiet, Measured or Full — see [the design standard](/ai-dev-kit/design-standard). **Measured is the default.**

:::warning Measured is not undecorated
The level governs *how many* ideas your site spends, never *whether* it uses the framework at all. At
Measured a site still gets its surfaces chosen rather than defaulted, one band with real texture, one
considered edge where two very different bands meet, presets edited rather than accepted, and exactly one
signature moment. Even Quiet chooses its presets.
:::

## The traps

Styles that apply perfectly and are usually the wrong answer. These are listed because the mistake is easy
and the failure is invisible until someone looks at the finished site.

| Style | Only right when | Why it goes wrong |
| --- | --- | --- |
| **Swiss** | Your content is genuinely regular and you have real white space | Its own brief warns that squeezed, it reads as plain rather than composed. On ordinary marketing content it produces a wireframe |
| **Terminal** | Your audience is developers and the subject is a shell or CLI | Elsewhere it is a costume, and monospace at body length is slower to read |
| **Neumorphism** | Almost never on a public site | One surface colour with shape from light alone, so contrast is low *by construction* and it fights accessibility at every control |
| **Cyberpunk, Vaporwave, Maximalism** | Entertainment, music, gaming, nightlife | Saturation that reads as atmosphere to the designer and as noise to everyone else. None survives a form |
| **Neo-brutalism** | You are deliberately anti-corporate | On a professional service it reads as an unfinished site rather than a decision |
| **Sketch, Claymorphism** | Children, education, crafts | Hand-drawn wobble beside a price or a legal term undercuts both |
| **Kinetic, Bold Typography** | Few words, one message | Poster scale needs almost no copy |
| **Retro** | Nostalgia is the product | Otherwise it reads as a broken stylesheet |
| **Luxury** | Your prices really are high | Expensive restraint on a budget service opens a gap between the page and the quote |

### One naming trap worth knowing

**Kinetic** sounds like it belongs to magazines. It does not. Its register is festival graphics and
protest posters, with an 8–10x ratio between headline and body. Give it a news page and the headline fills
the screen with nowhere for the article. **Magazines and news are Newsprint**, or Professional and Academia
for long reads.

(Separately, *kinetic typography* as animated lettering is a [Kinetic Scenes](/kinetic-scenes) job, not a
site style. Two different things share the word.)

## If you have already decided

**Your choice wins.** You can see your business and the creator cannot. It should tell you the cost once,
in one line, and then build what you asked for:

> *Swiss over six pages of finance copy will read as plain rather than composed — its own brief warns about
> exactly this. Building it; say the word and I'll put it on Enterprise instead.*

It should not quietly substitute a different style. A style you chose after a warning is a decision; one
swapped behind your back is a defect.

## Recording the choice

The spec keeps the reason next to the value, so a later session does not re-argue it:

```json
"brand": {
  "style": "enterprise",
  "style_reason": "High-stake purchase, irregular content across six pages, consumer audience."
}
```

A style id on its own is unfalsifiable — you cannot tell a considered choice from a default. A sentence
makes a wrong pick visible as a wrong *argument*, which is something you can disagree with.
