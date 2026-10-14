---
slug: crm-generator-claude-app-track
title: "Why do beginners build the CRM site from the Claude app instead of a coding agent?"
authors: [jon]
tags: [ai-assistant, architecture, security]
date: 2026-10-14
description: "The CRM generator's prompt assumed a coding agent, a terminal and a local WordPress. For someone who knows nothing about web development and has only a Claude subscription, the plugin's own MCP server and browser sign-in make a no-code route possible, so that became the main beginner track."
---

**The question:** "What if a newbie, who knows nothing about web development, wants to create the CRM, and only has a Claude subscription? We really need to make the process seamless for a typical user."

<!-- truncate -->

## Context

The CRM generator turned a form into a prompt for an AI **coding agent** (Claude Code, Cursor, Codex).
Eight end-to-end test builds all finished, but each one assumed the person could install a local
WordPress, run an agent in a terminal, approve its permission prompts, and later move the site to a
host. Every one of those is a place a beginner gets stuck.

Meanwhile the AI Assistant extension already had an **MCP server** with about fifty build tools
(pages, elements, Theme Settings, presets, menus, post types, custom fields, forms, Theme Builder,
SEO) and an **OAuth sign-in** for web connectors: the person approves access on a consent screen
inside their own wp-admin, and no password is ever pasted anywhere.

## Options considered

- **Keep the coding-agent prompt only and write better setup docs.** Cheapest, but it leaves the
  terminal, the local install and the migration in the beginner's way. Docs cannot remove steps.
- **Have the person paste host logins into the agent.** Simple to explain, but passwords end up in
  chat transcripts, clipboards and files. Rejected outright.
- **Build from the Claude app through the connector.** Uses the person's subscription directly (no API
  key, no AI Dev Kit on their computer), needs no terminal, and shares no password. Costs: the site must
  be public and on HTTPS, Claude cannot see the rendered pages, and the plugin needed tools it did not
  have (the CRM setup, the build docs) plus a one-click setup page for the steps that must happen
  before the connector exists.

## Decision

Two tracks in the generator. **In the Claude app** is the default and the beginner route: a fresh
WordPress on a web host, Unyson+ installed, **Unyson+ → Connect AI** run once, the connector added in
Claude, then the prompt. **With a coding agent** stays for people who already use one, with safer host
options (build locally and move it later, SSH keys, or a temporary user with an Application Password).

A **fresh WordPress is a prerequisite** on both tracks: the generator no longer tries to help people
install WordPress, and the build never runs on a site with real content.

## Why

The tools for a no-code build already existed; what was missing was a CRM tool set, a way for the
kit's knowledge to reach an app with no disk, and a setup that a beginner can finish with one button.
Those are small, testable pieces, and they remove every step that needed a terminal or a password.
Design quality, which Claude cannot check by looking, is carried by structure instead: presets and
section templates, a structural check after each page, and the person looking at each page when asked.
A long build is split into stages with a resume message, because a subscription's usage limit can end
a chat mid-build and the site itself is the record of what is done.
