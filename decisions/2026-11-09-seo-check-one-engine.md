---
slug: seo-check-one-engine
title: "An SEO checker for the AI Dev Kit — copy a many-agent SEO plugin, or build one engine with two ways in?"
authors: [jon]
tags: [seo, ai-assistant, architecture]
date: 2026-11-09
description: A popular open-source SEO plugin for AI agents runs 26 skills and up to 17 agents per audit. We wanted an SEO checker in the AI Dev Kit. Decision — one engine (seo-check.mjs) that both the dashboard and an agent skill run, deterministic rules plus one AI read, fixes only through the SEO extension's tools in WordPress, and the AI's judgement kept out of the score.
---

**The question:** After looking at an open-source SEO plugin for AI agents, should the AI Dev Kit get an
SEO checker of its own — and if so, should it copy that plugin's shape (many skills, many agents), live
only in the agent, or also be a screen in the kit's dashboard?

<!-- truncate -->

## Context

The SEO extension already checks a site from the inside: stored titles and descriptions, near-duplicate
pages, broken links, backlinks. What nothing in Unyson+ did was check a site **from the outside** — what a
crawler actually gets, including what other plugins and the theme add — or judge the **writing**, which
rules cannot do. The plugin we looked at does both, with 26 skills and up to 17 agents running at once, and
it only reports: it cannot change a site.

## Options considered

1. **Copy the plugin's shape** — many skills, many agents. Thorough, but every audit spends a lot of AI
   usage, the checks live in prompts (so two runs can disagree), and it duplicates what the SEO extension
   already measures.
2. **A skill only.** Cheap to build, but useless to anyone without an AI agent, and the checks would again
   live in prose an agent re-interprets each time.
3. **A dashboard screen only.** Good for people, but agents could not use it, and it could not fix anything.
4. **One engine, two ways in.** A script (`seo-check.mjs`) holds every rule; the dashboard's SEO Check view
   and the kit's `seo-check` skill both run it. Deterministic rules for everything a rule can judge, one AI
   read for the content, and fixes only through the SEO extension's own tools, with the person's consent.

## Decision

Option 4.

- **One engine.** The rules, wording, ranking and score live in `seo-check.mjs`, with tests. Neither the
  dashboard nor the skill has checks of its own, so they cannot disagree, and a missed problem is fixed once.
- **Rules first, one AI pass.** Everything measurable is a rule. The AI reads up to six main pages once,
  for what rules cannot judge: vague content, missing proof, whether an AI answer would quote the page.
- **The AI is not scored.** Its findings are listed but take nothing off the score and are left out of the
  "fixed / new since last time" comparison: they are reworded on every run, so counting them would make an
  unchanged site look different.
- **It never changes a site.** The checker only reads. On a Unyson+ site, fixes go through the SEO
  extension's tools (each one previewed and undoable), from the AI Assistant in WordPress or an agent.
- **Left out on purpose:** paid data services, many parallel agents, and anything the SEO extension
  already reports inside WordPress (backlinks, search volumes, rankings).

## Why

A score is only useful if it moves when the site changes and stays put when it does not; rules give that,
and prompts do not. One engine keeps the person's screen and the agent's report identical. And keeping the
fixing in WordPress, through tools that already preview and undo, means the checker cannot break a site,
while a Unyson+ site gets the fixes a paste away. That is also the case for Unyson+ itself: on any other
site, the report shows what would be one click here.
