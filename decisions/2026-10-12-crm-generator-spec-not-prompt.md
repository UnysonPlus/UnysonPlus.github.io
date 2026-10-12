---
slug: crm-generator-spec-not-prompt
title: "Why does the CRM generator output a spec, and why does the CRM live in the plugin?"
authors: [jon]
tags: [architecture, extensions, conversion]
date: 2026-10-12
description: "A request for a CRM website prompt generator became a static page that emits a structured site-spec.json plus a short prompt. The CRM itself stays in Newsletter CRM rather than being written per site by an AI agent, and the page is plain HTML for search visibility."
---

**The question:** "I want to create something like a CRM tool generator for Unyson+ … a form and fields the user can select and it will just create a full prompt for the user to send to his AI agent. That AI agent will then fully build a full CRM website like a real estate site using Unyson+. Is there a better plan?"

<!-- truncate -->

## Context

Most of a real estate CRM site already ships with Unyson+: the Properties blueprint (post type,
taxonomies, listing fields), Forms with stored entries and consent-gated actions, and Newsletter
CRM (contacts, lists, tags, segments, campaigns). The AI Dev Kit already tells an agent how to
build a site. What was missing was a way for a non-technical owner to describe the site they want.

## Options considered

1. **A form that writes a free-text prompt.** Simplest. The result depends on how each agent
   reads a paragraph, so two runs of the same choices produce different sites.
2. **A form that writes a structured spec plus a short prompt.** The spec holds every choice as
   data; the prompt explains order and rules and points at the kit. The spec can be versioned,
   validated and later applied without AI.
3. **Let the agent write the CRM for each site.** Fastest to demo, but every site gets different,
   unmaintained code that stores personal data.
4. **Host as a React app vs. plain HTML.** React adds a build step and puts page content behind
   JavaScript; plain HTML keeps every word in the served page.

## Decision

Option 2, with the CRM kept in the plugin, and the page built as plain HTML, CSS and JavaScript on
GitHub Pages at `crm-generator.unysonplus.com`. The spec (`spec_version` 1.0) is embedded at the
end of the prompt so a single paste carries everything. Pipeline stages are tags in Newsletter CRM
until a pipeline board ships there. Live MLS data is never promised: the generator offers manual
listings, an existing IDX provider, or both.

## Why

- **Repeatability.** A spec is exact; a paragraph is interpreted. It also gives a direct path to a
  WordPress importer that applies post types, fields, forms and CRM setup with no AI at all.
- **Maintenance and privacy.** CRM features written once in Newsletter CRM get fixes and updates
  everywhere. Per-site agent-written CRM code would not, and it holds people's contact details.
- **Honesty.** MLS access needs the owner's own IDX agreement; no tool can generate it.
- **Search.** The page targets "free CRM website generator". Plain HTML with structured data
  (WebApplication, HowTo, FAQPage) is fully readable by crawlers, with no build step.
