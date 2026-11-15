---
slug: visitor-assistant-knowledge
title: "Where does the visitor AI assistant get its answers, and why can't a live site use the AI Dev Kit?"
authors: [jon]
tags: [ai-assistant, extensions, architecture, admin-ui]
date: 2026-11-15
description: "The Chat AI channel answered only from pages and stayed hidden without a word when no AI was connected. It now shows its status, reads owner-written facts, Markdown knowledge files and the site's business details, and has a Try it box. A live site still needs an AI provider of its own."
---

## The question

"Does the AI assistant show that it can be used? It should say that the AI Connectors should be
activated, right? And how does the AI assistant get the data? It should take data from the pages, or if
not in the pages, should it get it from an md file, with the user able to upload one?" And then:
"I don't have an AI API and can only use the AI Dev Kit. Can it use the AI Dev Kit? Like, I can just
leave my PC on?"

<!-- truncate -->

## Context

The Chat extension's **Ask our assistant** channel answered visitors from the site's published pages:
a keyword search picked four pages and the model answered only from them. Two gaps:

- With no AI connected, the channel was simply **hidden**, even with its switch on, and the settings
  tab said nothing. An owner could switch it on, save, and see nothing happen.
- Answers came **only from page content**. Opening hours, address and phone usually live in the footer
  or Theme Settings, which the search never reads; refund rules or delivery areas are often on no page
  at all.

The owner's only AI access is a Claude subscription used through the AI Dev Kit on their PC.

## Options considered

**Status.** (a) Keep hiding the channel quietly. (b) A status box on the tab: ready / ready on this
computer only / not ready, with the link to Settings → Connectors, plus today's use.

**Extra knowledge.** (a) Ask owners to put everything on pages. (b) A Markdown "facts" box and uploaded
`.md` / `.txt` files, stored as text in the database, looked up by section. (c) Files in the uploads
folder. (d) Meaning-based search (embeddings).

**The AI Dev Kit on a live site.** (a) A relay: the owner's PC polls the live site for visitor questions
and answers them with the Dev Kit. (b) A live site needs its own AI provider in Settings → Connectors;
the Dev Kit stays for local sites (building and testing).

## Decision

- A **status box** at the top of the AI assistant tab, and a **Try it** box that asks a test question and
  lists what the assistant was given (works while the channel is off, outside the daily limit).
- **Facts for the assistant** (Markdown) and **knowledge files** (up to 20 `.md` / `.txt` files,
  200 KB each), stored as **text in the database**, split at headings, and looked up by keyword next to
  the pages. All of it goes along while it is short.
- The **business details the site already has** (SEO local business address, hours and price range,
  the Chat contact channels) go with every question, switchable.
- **No relay to the owner's PC.** A live site uses an AI provider from Settings → Connectors; the AI Dev
  Kit powers the assistant only on a site running on the same computer, where it is ideal for writing
  and testing the knowledge.

## Why

- **Silence is the worst failure for a setting.** Saying "not ready, and here is where to fix it" turns a
  dead switch into a two-minute task.
- **Owners know facts no page states.** A facts box and files are the cheapest way to close that gap,
  and Markdown headings give the lookup natural sections without a new editor.
- **Text in the database, not files on disk:** nothing can be opened by address, it travels with the
  Chat JSON export, and the upload folder stays free of private-looking material. (Everything the
  assistant knows is still public by nature, and the screen says so.)
- **Keyword lookup first, meaning-based search later:** good headings and visitors' own words close most
  of the gap at no extra AI cost per question; embeddings would add a second paid step to every answer.
- **The business details were already there.** Reusing SEO's address and hours and the Chat channels
  answers the most common questions with no extra work.
- **A relay to a home PC is fragile and the wrong use of a personal plan:** it stops when the PC sleeps,
  restarts or loses its connection, each answer waits 10 to 30 seconds for the app to start, and
  answering the public automatically is what AI companies' paid APIs are for, not personal
  subscriptions. A per-question API cost with a daily cap is small and predictable.

*Status: Accepted (AI Assistant 1.0.55).*
