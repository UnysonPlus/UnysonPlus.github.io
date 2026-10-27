---
slug: kinetic-scenes-workspace
title: "Why do Kinetic Scenes projects live in a folder on your computer, shared with your AI agent?"
authors: [jon]
tags: [kinetic-scenes, architecture, storage-model]
date: 2026-10-27
description: Videos an AI agent made with the AI Dev Kit could not be previewed in the Kinetic Scenes Studio, because the Studio kept one scene in browser storage and the agent's files lived elsewhere on disk. Decision — projects are folders in a workspace kept by the AI Dev Kit, the Studio saves into them and follows outside changes live, and the Studio tells visitors that connecting their own agent gives a fuller result than AI assist.
---

**The question:** An explainer video was being built in stages by an AI agent, and the person expected to preview each
stage in the Kinetic Scenes Studio. There was nowhere to look: where do Kinetic Scenes files live, and how do the Studio and
an agent work on the same video?

<!-- truncate -->

## Context

The Studio kept the working scene as one draft in browser storage, and footage in the browser's own database. Nothing was
a file on disk unless it was downloaded. The agent, working through the AI Dev Kit, made scene files, screen recordings,
voice clips and music in a folder of its own. A web page cannot read files from the computer by path, so the agent's work
could not be opened in the Studio, and the only preview was a rendered video.

At the same time, AI assist in the Studio and an agent are different things: AI assist sends one request and gets one
scene back; an agent works in steps with tools (records the screen, narrates, makes music, looks at frames, fixes what it
sees).

## Options considered

- **Keep browser storage; hand scenes over by link or download.** Nothing new to build, but every hand-over is manual,
  footage cannot travel in a link, and edits in the Studio never reach the agent.
- **The browser's own folder access (File System Access API).** No kit needed, but only some browsers have it, the person
  has to pick the folder again each visit, and an agent outside the browser still cannot tell the Studio a file changed.
- **A workspace kept by the AI Dev Kit (chosen).** The kit already runs on the computer for rendering, voices and music. It
  owns a folder of projects, serves their media to the Studio, and tells the Studio when a file changes.

## Decision

- A **project is a folder**: `scene.json`, `media/`, `renders/`, inside a workspace (`Documents/Kinetic Scenes`, or the
  folder set in `KINETIC_WORKSPACE`). Media is referred to by paths relative to the project.
- The Studio opens projects with **File › Projects…**, **saves into the folder as you work**, writes footage, music and
  voice into `media/` on save, and **follows changes made in the folder live** (an undoable step). When both change the
  scene at the same moment, the folder wins and the Studio's edit is one Undo away.
- Agents reach the workspace with the kit's tools (`project_list`, `project_save`, `studio-cli project`) or by editing the
  files; `?project=<name>` opens a project in the Studio.
- Without the kit, the Studio works as before, in the browser.
- The Studio tells visitors, in AI assist, in Projects and in Help, that **connecting their own AI agent through the AI Dev
  Kit gives the fuller result**, and that AI assist is for quick ideas and small changes. It says what each is for rather
  than calling AI assist weak.

## Why

The person and the agent need one source of truth they can both see. A folder is the one thing a person, an agent and a
renderer all understand; the kit is already the bridge between the web page and the computer, so it can keep that folder
without anything new to install. Saying plainly which way of working gives the fuller result sets the right expectation
and points visitors to the AI Dev Kit, where the real capability is.
