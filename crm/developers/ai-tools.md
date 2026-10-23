---
sidebar_position: 5
title: "Set up the WordPress CRM with an AI app: the CRM's AI Assistant tools"
sidebar_label: "AI Assistant tools"
description: "The Unyson+ CRM's AI Assistant tools let a connected AI app set the CRM up: lists, segments, settings, sales pipelines and stages, draft campaigns from templates, senders and the post digest, draft automations from recipes, and lead scoring rules. They never read or contact the people in the CRM."
keywords: [ai crm setup wordpress, ai assistant crm tools, mcp wordpress crm, claude wordpress crm, chatgpt wordpress crm, ai build sales pipeline]
---

# AI Assistant tools

With the [AI Assistant](/extensions/ai-assistant) extension on, a connected AI app (Claude, ChatGPT, Cursor and
others, through the Unyson+ connector) can set the CRM up for you. Every tool **sets things up**; none reads a
contact's details or history, and none emails anyone:

- campaigns are saved as **drafts**, and automations are created as **drafts**: you read them and switch them on;
- tools only report **counts** (how many people are on a list, how many deals sit in a stage), never names;
- the post digest's on/off switch, site activity (a privacy choice) and email service API keys are left to you.

| Tool | Module | What it does |
|---|---|---|
| `crm-describe` | (always) | The set-up: settings, lists, tags, segments, campaigns, the sender, and which modules are on |
| `crm-save-lists`, `crm-save-segment`, `crm-settings` | (always) | Lists and tags, saved segments, double opt-in and the signup emails (settings can be undone) |
| `crm-save-campaign` | Email marketing | A draft campaign from plain text or simple HTML |
| `crm-email-templates`, `crm-campaign-from-template` | Email marketing | The starter templates, and a draft campaign laid out by one with your texts, heading and button |
| `crm-sending` | Email marketing or conversations | Sender profiles (From name and address, Reply-To), the marketing and transactional defaults, and the post digest's set-up (can be undone) |
| `crm-pipelines`, `crm-save-pipeline` | Sales pipeline | Pipelines and their stages; saving matches the pipeline and its stages by name and never removes a stage that still holds deals |
| `crm-automations`, `crm-save-automation` | Automations | The automations, the recipes and every trigger and action available; create or update a **draft** automation from a recipe or from your own steps |
| `crm-scoring` | Lead scoring | Read or change the scoring rules, named scores and fading (can be undone) |

Access rules for members-only content are set up with the Membership extension's own tools.

## Ask in plain words

- "Set up a sales pipeline for my salon: new enquiry, booked, visited, rebooked."
- "Create a welcome series from the recipe and rewrite the emails in a friendly tone."
- "Give leads points for opening emails and visiting the pricing page, and take points away for the
  not-interested tag."
- "Draft an announcement campaign from the template for our new studio opening, for the newsletter list."

The [Site Creator](https://create.unysonplus.com/crm/)'s prompts use these tools: every enquiry arrives as a deal in
a real pipeline, and a welcome series and a booking follow-up are created as draft automations.
