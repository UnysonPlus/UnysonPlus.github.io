---
slug: kinetic-scenes-ai-director
title: "How can Kinetic Scenes make the best AI videos on a subscription alone?"
authors: [jon]
tags: [architecture, animation, ai-assistant]
date: 2026-10-17
description: Not with a bigger prompt but with a way of working. The AI Dev Kit gives any subscription AI a skill, tools and a loop (plan, build, check, look at frames, fix), plus a quick scene from any website, and the Studio offers its own tools to AIs in the browser.
---

**The question:** Tools such as brag, video-use and HyperFrames' skills turn a website or footage into polished videos with
an AI. How does the AI Dev Kit connected to Kinetic Scenes become more intelligent than all of them, using only Claude,
ChatGPT or Cursor subscriptions, and should it also offer a quick "paste a URL, get a video" generation?

<!-- truncate -->

## Context

AI assist sends one request with our motion rules and gets one scene back. It cannot see what it made. The tools we studied
(brag, video-use, HyperFrames and its skills, all open source) are good for reasons that have little to do with the model:
they write a plan before building, follow measured timing rules, analyse the music, keep sound disciplined, and above all
render their result and look at it before showing anyone. Users here bring their own subscription; there are no API keys and
no per-use cost to us.

## Options considered

- **A bigger, better prompt.** Cheap, but the AI still works blind: it cannot catch a cramped layout or a muddy transition.
- **Our own hosted AI service.** Full control, but it needs servers, keys and billing, against the no-server, bring-your-own-AI
  design.
- **A skill, tools and a loop, run by the user's own subscription.** The kit exposes tools (inspect, check, stills, beats,
  render) as commands and a local MCP server; a generated skill teaches any agent the craft; the AI plans, builds, checks,
  looks at rendered frames and fixes. The Studio also registers its own tools with the browser (WebMCP) for AIs that live there.

## Decision

The third option, as Phase 11 of the roadmap ("The AI director"): the Kinetic Scenes skill (generated from the Studio,
published on the Kinetic Scenes site and copied into the kit), the kit's tools and MCP server, plan-first storyboards,
a look-criticise-fix pass on rendered stills, subscription backends for Claude (`claude`), ChatGPT (`codex`) and Cursor
(`cursor-agent`), WebMCP tools in the Studio, and the craft rules from the tools we studied. **Quick generation from a URL
is in**, built on the kit's existing capture service, which already renders a site and takes its colours, fonts, copy and
screenshots; the result is an editable scene, not a finished file.

## Why

What makes the other tools good is the loop and the eyes, and both can run on the user's own subscription. Quick generation
costs us little because the capture service already exists, and it beats the URL-to-video tools on the point that matters
most to users: what comes out can still be edited on the timeline, and serves a website and a video alike.
