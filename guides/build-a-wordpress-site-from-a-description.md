---
title: "Build a WordPress site from a description"
sidebar_label: "Build a site from a description"
description: "Describe the business and get a real, editable WordPress site: pages, a design system, a header and footer, SEO. What the AI Website Creator asks you, what it builds, what it refuses to make up, and how to judge the result."
keywords:
  - build a wordpress site from a description
  - ai wordpress site generator
  - generate a wordpress website with ai
  - describe a website and build it
  - ai website builder wordpress
image: /img/page-builder.png
---

# Build a WordPress site from a description

There is a second way into WordPress that has nothing to do with converting an existing design.
**You describe the business, and the site gets built** — real page-builder pages, a design system in
Theme Settings, one header and one footer, per-page SEO. Nothing static, nothing you need a developer
to change afterwards.

This guide is about that path: what you are actually asked, what comes out, and — the part most tools
skip — **what it will refuse to invent**, which is the difference between a site you can publish and a
demo you have to clean up.

If you already have a design or a live page to reproduce, you want the
[Site Converter](/guides/build-a-free-wordpress-site-fast) instead. This page is for when there is
nothing to copy.

## The shape of it

```
a questionnaire  →  a site spec  →  your AI agent builds it  →  a scored check
```

1. **The [Site Creator](https://create.unysonplus.com/)** asks the questions, by industry, in a web
   form. It writes nothing to your site — it produces a **site spec**, a small structured file, plus a
   build prompt.
2. **Your own AI agent** — Claude Code, Cursor or similar — reads that spec through the
   [AI Dev Kit](/ai-dev-kit/) and builds the site on your WordPress. It runs on your machine, against
   your install. Nothing is uploaded anywhere, and there is no account to create.
3. **A gate at the end** decides whether it is finished, including a
   [scored design pass](/design-standard).

The full walkthrough for someone who has never driven an AI agent is
[Create a site](/create-a-site). What follows is the shorter version, plus the things worth knowing
before you start.

## What you are asked

Six things decide the site, and the first one is the only one that is mandatory.

| | Why it matters |
| --- | --- |
| **The business** | Name, what it does, where. Without a name there is no site; everything else can be left blank. |
| **The pages** | Propose fewer than you think. Five real pages beat nine with two padded. |
| **The style** | A design direction — Swiss, brutalist, luxury, monochrome, newsprint, modern dark, terminal, and more. Your own adjectives usually decide it: *"clean and editorial"* and *"raw and confident"* are different answers. |
| **The one action** | Book, call, enquire, buy. It decides every call to action and the header button. |
| **Real content** | Any copy, photos, logo, testimonials or numbers you already have. **This is the question that changes the result most**, for the reason in the next section. |
| **Where it is built** | Which WordPress install. |

Anything you leave blank is recorded as missing rather than guessed at.

## The rule that makes this usable: nothing gets invented

Most generated sites look better than they are, because the generator filled the empty slots with
something plausible. A testimonial from a customer who does not exist. "500+ happy clients." Opening
hours. A phone number.

This one will not. **If a fact was not given, the slot is left out and you are told.** Concretely:

- No testimonials you did not supply — so if you gave none, the site has **no proof section**.
- No statistics, no pricing, no opening hours, no service areas, no accreditations, no team members.
- No `LocalBusiness` structured data without a real address, because a schema with an invented address
  is worse than no schema: it is machine-readable misinformation about a real place.
- Where you gave no phone or email, the contact page is the form alone — the details column is simply
  not there.

That is deliberate, and it is why the last thing the build tells you is the list of what it left out.
A page with five honest sections is finished; a page with eight, three of them invented, is a
liability with a nice screenshot.

:::tip The single highest-value thing you can do
Spend ten minutes gathering **two or three real testimonials, any real numbers, and your contact
details** before you start. Supplying them is the difference between six pages and six pages with the
sections that actually persuade someone.
:::

## What gets built, in order

The order is not cosmetic — build it the other way round and every section acquires its own colours,
which then fight the design system when it arrives.

1. **The design system first.** Palette, type scale, buttons, corner radius, surfaces and spacing, into
   **Theme Settings**, before a single page exists. Change the primary colour later and the whole site
   follows, because nothing hard-coded it.
2. **The header and footer**, also Theme Settings — exactly one of each, inherited by every page.
3. **The pages**, one band at a time, from the shape the page type calls for: a home page is an index,
   a contact page *is* the call to action and does not need another one at the bottom.
4. **Motion last, and sparingly** — see [the design standard](/design-standard) on how much the brief
   has actually earned.
5. **The gate**: performance, accessibility, SEO, and then a score out of ten in four categories with a
   pass mark.

## Judging what comes back

Two checks tell you most of what you need, and neither needs any tooling.

**Open an inner page, not the home page.** The home page is where the effort goes. The About and
Services pages are where a generated site comes apart — a band of three cards and nothing else, a
heading three times the size of everything near it, spacing that does not match the page before it.

**Look at it on a phone.** Not a narrow browser window — an actual phone, or your browser's device
mode at 390px. Text that touches both edges of the screen, a heading that pushes a word off the side,
a two-column band that never stacks: all of it is invisible at desk width and obvious the moment
somebody opens it on the thing they actually carry.

Then read the list of what was left out, and decide which gaps you want to close.

## Three things that catch people out

**It builds drafts.** Pages arrive unpublished, deliberately — publishing is your decision, and it is
the one step that cannot be quietly undone. You publish when you have read them.

**Permalinks.** On a site installed in a subfolder, WordPress sometimes cannot write the `.htaccess`
file it needs, and the symptom is distinctive: the home page loads perfectly and **every other page
returns 404**. Go to *Settings → Permalinks* and click Save once; that rewrites the file. Nothing is
wrong with the site.

**The style you asked for may move slightly.** Every palette is contrast-checked in both directions —
as a button fill carrying a label, and as text on each surface it can land on. Where a colour cannot
carry text at a readable contrast, it is shifted to the nearest value that can, usually the same hue a
step darker, and you are told. A site that fails contrast is not a bolder site; it is one some of your
visitors cannot read.

## How good does it have to be?

There is a published bar, and it is worth reading before you form an opinion of the result:
**[the design standard](/design-standard)**. In short — every site is scored out of ten on Design,
Usability, Creativity and Content, weighted 40/30/20/10, and anything under 7.0 overall, or under 6 in
any single category, is not finished rather than delivered with notes.

The part that surprises people: **"award-grade" does not mean maximum animation.** Ask for a simple
site and you get a simple one. Ask for a car-finance site and you get restraint, because a cinematic
hero over a loan application reads as a company hiding something. The quality bar never moves; how
much spectacle the site is allowed does.

## FAQ

**Do I need to write a brief?** No. The questionnaire is the brief. A sentence helps — *"a barber shop,
warm and dark, booking-led"* already decides the style and the primary action.

**Can it build on my live site?** It can, and it will not do so unless you point it at one explicitly.
Build on a local install or a staging copy while you are learning.

**Is the result editable?** Entirely. Every page is page-builder content with real elements and Theme
Settings presets — open any page, change the headline. If that needed a developer, the build failed.

**What if I do not like the style?** The design system is one place, so a restyle is a Theme Settings
change, not a rebuild of fourteen sections.

**Does it cost anything?** Unyson+ and the AI Dev Kit are free. You bring your own AI agent and your
own hosting.

## See also

- [Create a site](/create-a-site) — the full walkthrough, written for a first-time agent user
- [The design standard](/design-standard) — the rubric the result is scored against
- [Set up AI for Unyson+](/guides/set-up-ai-for-unysonplus) — connecting Claude, an API key, or a free local model
- [Build a free WordPress site fast](/guides/build-a-free-wordpress-site-fast) — the other route, when you already have a design to reproduce
