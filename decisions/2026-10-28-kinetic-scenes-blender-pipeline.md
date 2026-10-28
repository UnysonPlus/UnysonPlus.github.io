---
slug: kinetic-scenes-blender-pipeline
title: How should an AI agent use Blender for Kinetic Scenes?
authors: [jon]
tags: [kinetic-scenes]
date: 2026-10-28
description: The AI Dev Kit runs Blender in the background on agent-written Python and returns a GLB model or a transparent video; the official Blender connector stays the tool for live, hands-on Blender work.
---

**The question:** we want an AI agent like Claude to create anything in Blender and use it in Kinetic Scenes. Should
that go through Claude's Blender connector, an open-source Blender MCP project, or something of our own?

<!-- truncate -->

## Context

Claude's official Blender connector (built by the Blender developers) lets Claude work in a live Blender window through
an add-on whose server is started each session; it is made for hands-on modelling. Open-source projects such as
claude-blender add export and rendering tools, but are early (a dozen commits, no releases). Kinetic Scenes needs
something narrower and repeatable: the *result* of Blender in a scene, made by any agent, on any machine with Blender,
without anyone sitting in Blender. Its 3D layers already play glTF models live in the browser; its footage layers play
transparent video.

## Options considered

- **Use the official connector.** Mature and interactive, but needs Blender open and its server started, works per
  session, and doesn't put anything into a scene by itself.
- **Build on an open-source Blender MCP.** Has export and render tools, but is young and keeps a socket server running
  inside Blender.
- **Our own background pipeline in the AI Dev Kit.** The agent writes bpy; the kit runs Blender headless, normalises and
  exports a GLB (or renders a transparent WebM), renders preview views for the agent to check, and returns a ready layer.

## Decision

**A background pipeline in the AI Dev Kit (`blender_model`, `blender_render`), with the official connector recommended
for hands-on Blender work.**

## Why

It needs nothing but Blender installed: no window, no add-on, no server to start, so any agent can use it from the
command line or MCP, and every run starts from a clean scene. The kit owns the parts that make a result usable in a
scene (centring and sizing, applying modifiers, web-sized warnings, exact brand colours, transparent encoding, previews
the agent must look at), which a general Blender tool doesn't. The official connector remains the right tool when a
person wants to work in Blender alongside the AI.
