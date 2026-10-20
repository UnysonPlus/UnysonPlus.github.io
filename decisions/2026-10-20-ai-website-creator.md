---
slug: ai-website-creator
title: "Where should the AI Website Creator live, and what should it reuse?"
authors: [jon]
tags: [site-creator, conversion, architecture]
date: 2026-10-20
description: "A creator that builds Unyson+ sites from a brief, like the CRM generator but general-purpose. Rather than a new product, it became an orchestration layer in the AI Dev Kit over the fresh-build path, the Site Converter and the CRM generator — with the style library authored natively rather than ported from React prompt packs."
---

**The question:** "I'm planning to create something like a website creator for AI agentic workflows — like Claude or Cursor — on Unyson+, just like crm.unysonplus.com. We can make the user use the AI Dev Kit, add skills for site creation, and use a library of design prompts. What do you think?"

<!-- truncate -->

## Context

The pieces already existed, scattered: the **AI Dev Kit** holds the fresh-build protocol; the **Site
Converter** and capture service turn a URL into a native build; the **CRM website generator**
(crm.unysonplus.com) already proves the pattern — pick an industry, get a `site-spec.json` plus a
build prompt that drives the kit's fresh-build path; several **aesthetic skills** cover named looks;
and the kit docs already carried a prose **"Site Generation Roadmap"** stub. The public design-prompt
libraries (Monochrome, Bauhaus, Terminal, and the like) showed the demand and the taxonomy, but their
prompts output React and Tailwind.

The open questions were where the creator should run, what it should accept, which SEO brain it uses,
how it relates to the CRM generator, and whether the style library could reuse those public prompts.

## Options considered

- **Where it runs.** (a) The AI Dev Kit as the engine, run in the person's own Claude Code / Cursor;
  (b) an in-wp-admin wizard driven by the AI Assistant; (c) a hosted web app that deploys into their
  WordPress. (b) and (c) feel more like a product but are a much larger build and need the agent loop
  wired into WordPress or into hosting.
- **Inputs.** A brief only, or also a URL, a design reference and a vertical template.
- **SEO brain.** Native Unyson+ / theme SEO vs. leaning on Rank Math and its MCP tools (as the
  third-party guides do) vs. supporting both.
- **CRM generator.** Fold it in as the first vertical vs. keep it a standalone sibling.
- **Style library.** Port the public design-prompt packs vs. re-author each look natively.

## Decision

- **v1 is the AI Dev Kit as the engine** — the creator is an orchestration layer (a `create-site`
  skill, an archetype catalogue, a style library, a composition guide) over the existing fresh-build
  and converter paths. The in-admin wizard and a hosted app are later surfaces on the same engine.
- **Four inputs**, one flow: a brief, a reference URL, a design reference, a vertical template.
- **Native Unyson+ / theme SEO**, no third-party SEO dependency.
- **The CRM generator becomes the first vertical** under the creator; its industry presets become the
  model for the shared vertical-template library.
- **The style library is authored natively.** A style maps a named look to Theme Settings presets,
  Animation Engine defaults and section treatments. The public prompt packs contribute *taxonomy and
  design direction only* — never their prompt text, preview media or brand names, which target React
  and live on someone else's CDN.
- The roadmap is recorded data-driven at `/ai-dev-kit/ai-website-creator` (the former Site Generation
  Roadmap, named and expanded), verified against the kit source tree like the other roadmaps.

## Why

Reuse wins. Almost every part already exists; the new work is orchestration, a style library and a
design-prompt catalogue, not new engines. The kit-first choice ships fastest and matches the stated
intent of making people use the AI Dev Kit. Native page-builder output is the moat — it is the one
thing the prompt-to-React tools cannot offer, so copying their React prompts would throw away the
only durable advantage (and create an IP and brand-name problem for nothing). Native SEO keeps the
whole thing in-ecosystem. And folding the CRM generator in as the first vertical turns a separate
product into a proven starting point, which is where its own roadmap was already heading.
