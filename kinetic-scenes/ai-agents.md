---
sidebar_position: 11.2
title: AI agents and projects
description: Connect your AI agent (Claude Code, Codex, Cursor) to Kinetic Scenes through the AI Dev Kit. Projects are folders on your computer that you and the agent share; the agent records, narrates, adds music and checks frames, you watch each step in the Studio and export.
keywords: [kinetic scenes, ai agent, claude code, mcp, workspace, projects, explainer video, screencast]
---

# AI agents and projects

There are two ways to work with AI in Kinetic Scenes.

| | **AI assist** (in the Studio) | **Your AI agent** (through the AI Dev Kit) |
|---|---|---|
| Setup | the AI Dev Kit | the AI Dev Kit, plus an agent such as Claude Code |
| Good for | quick ideas and small changes to the scene in front of you | whole videos: explainers, tutorials, reels, promos |
| What it can do | write and change the scene | record your screen, narrate with your own voice, make music, check every frame, fix what it finds, and change the scene |
| Where the work lives | this browser | a project folder on your computer |

AI assist sends one request at a time and gets one scene back. An agent works in steps with the kit's tools, the way a
person would: it records, listens back, looks at frames and fixes what it sees. For a finished video, connect your agent.

## Projects

A **project** is a folder on your computer, kept by the AI Dev Kit:

```
Documents\Kinetic Scenes\          ← the workspace (you can choose another folder)
  Product launch\                  ← a project
    scene.json                     ← the scene
    media\                         ← footage, voice, music, pictures
    renders\                       ← exported videos
```

In the Studio, **File › Projects…** lists them. Open one, or turn the scene in front of you into a new project. The
project's name shows under the Kinetic Scenes logo, with *saved* or *saving*.

- **It saves as you work** into `scene.json`. **File › Save** saves at once; **File › Download a copy** still downloads the
  scene file.
- **Changes made in the folder appear in the Studio at once.** When your agent edits `scene.json` or adds media, the open
  project updates and a note says so. **Undo** goes back.
- **Media plays from the folder.** Footage you add while a project is open, music and voice-overs are written into
  `media\` when the project saves, so the scene file stays small and a project can be copied or backed up as a folder.
- If the scene changed in the folder at the same moment you edited it, the folder's version wins and your edit is one
  Undo away.
- The Studio reopens the last project the next time you visit, and `kinetic-scenes.unysonplus.com/?project=<name>` opens a
  project directly (the link an agent gives you).

Without the AI Dev Kit running, the Studio works as before: the scene is kept in this browser.

**Where the workspace is:** a `Kinetic Scenes` folder in your **Documents** folder, wherever your computer keeps it
(on Windows, Documents can be moved to another drive or to OneDrive, and the workspace follows it; on a Mac it is
`~/Documents`). To use another folder, click **Change…** in File › Projects and pick it in your computer's folder window
(**Back to Documents** undoes it). Projects already made stay where they are: move their folders if you want them there
too. An administrator can also fix the folder with `KINETIC_WORKSPACE` when the kit starts.

## Connect your agent

1. Install and start the [AI Dev Kit](/ai-dev-kit) (see [Set up AI for Unyson+](/guides/set-up-ai-for-unysonplus)).
2. Register the Kinetic Scenes tools with your agent. For Claude Code:

   ```
   claude mcp add kinetic-scenes -- node <kit>/assembled/UnysonPlus-Capture-Service/tools/design-capture/studio-mcp.mjs
   ```

   Other agents that use MCP (Codex, Cursor) take the same command in their own MCP settings.
3. Ask for the video: *"Make a 60-second vertical explainer of our page builder in my voice, as a Kinetic Scenes
   project."* The agent writes into a project, gives you its link, and you watch it fill in.
   It does not render the video until you ask: you preview it in the Studio, ask for changes, and export it
   yourself (or ask the agent for the file) when it is right.

Once your agent has used the kit's Kinetic Scenes tools, the Studio shows it as connected (*Connected: Claude Code*, with
when it was last active) in AI assist and in File › Projects.

The tools the agent gets: `project_list` and `project_save` (the workspace), `scene_guide` (how to make a good scene),
`scene_check`, `scene_inspect`, `scene_stills` (it looks at frames), `scene_render`, and `audio_beats`,
`audio_transcribe`, `audio_separate`. Agents that run commands also have the kit's command line
(`studio-cli record`, `screencast`, `music`, `project`), which records the screen and builds the scene around the
recording.

## Exporting

Export from the Studio as usual (**Export › Video**). With the AI Dev Kit running, the video is rendered on your computer,
frame by frame.
