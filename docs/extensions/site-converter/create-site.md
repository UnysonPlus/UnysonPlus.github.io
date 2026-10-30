---
sidebar_position: 11
title: Create site
---

# Create site

**Create site** is the AI Dev Kit dashboard's way in to building a new website. It is at
**`http://localhost:4600/#create`**.

It does two things: it opens the **[Site Creator](https://create.unysonplus.com/)**, where you
describe the business, and it receives what the Site Creator produces so you can hand it to the Kit
Assistant or to your own AI agent.

:::note It briefs the build; it does not build
The site is built by an **AI agent** with file access — Claude Code, Cursor, or whatever you use —
following the kit's `create-site` skill. This panel produces the brief. Nothing here writes to
WordPress.
:::

## Why the questions are asked somewhere else

The dashboard used to carry its own form. The Site Creator asks the same things with a **tailored set
of questions per industry** — salons, clinics, law firms, trades, venues, recruitment and more — so
keeping a second, generic copy meant two forms producing one schema, which drifted.

The Site Creator runs **entirely in your browser**. It is a static site with no server behind it, so
nothing you type about a business is transmitted anywhere.

## The three steps

1. **Describe the business** — press *Open the Site Creator*, pick the industry closest to the
   business, and fill in the form. It asks straight out what real content already exists.
2. **Bring it back** — the Site Creator gives you a prompt with a **site spec** inside it. Copy the
   whole thing and paste it into the *Bring it back* box.
3. **Hand it over** — either **Send to the Kit Assistant** (it goes into the chat on this machine), or
   **Copy** and paste it into your own agent. **Save site-spec.json** saves just the spec.

The panel reads what you paste. If it finds a site spec — whether on its own or embedded in the
prompt — it confirms so and summarises it: the business, the pages, the action, the style, where it
builds into, and the **missing** list. If you paste a prompt with no spec in it, it says so; that
still works, but the spec is the part the `create-site` skill actually reads.

## The missing list

This is the part worth understanding. Everything you did **not** say you already have is recorded in
the spec's `missing` array, and the prompt tells the agent to **leave those sections out rather than
fill them in**.

No testimonials supplied means no testimonials section. That looks like less, and it is the difference
between a site and a demo — an invented testimonial is not a placeholder, it is a fabricated claim
about a real business.

## The site spec

The spec is the source of truth: **anything not in it was not asked for**. It conforms to
`skills/create-site/site-spec.schema.json` in the AI Dev Kit, and carries the business, the pages and
what each is for, the brand direction, the one action a visitor should take (`primary_action`), what
to build into, and `missing`.

Both the Site Creator and the kit read that one schema, so a spec made in one is understood by the
other.
