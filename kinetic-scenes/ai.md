---
sidebar_position: 11
title: AI
description: AI in Kinetic Scenes — AI assist through the AI Dev Kit on your own computer, plan first, explainers and tutorials with a voice-over, look and fix, quick scenes from a website, Edit my video, the published skill, the CLI and MCP tools, and WebMCP.
---

# AI

The AI runs through the [AI Dev Kit](/ai-dev-kit) on your own computer, using your own AI subscription (Claude through
Claude Code, ChatGPT through Codex, Cursor) or a local model. The Studio sends the request to the kit and the kit sends a
scene back. The Studio's server needs no AI keys and runs no AI calls, so there is no per-use cost to cover.

For whole videos (screen recordings, your own voice, music, frame checks), connect your own AI agent instead: see
[AI agents and projects](./ai-agents.md). AI assist is for quick ideas and small changes.

The AI writes a **scene file, not code**. It chooses presets from the catalogue and fills in their settings, so everything
it makes lands on the timeline as ordinary clips you can move, trim and change by hand. It never writes a custom code clip.

## AI assist

The **✦ AI assist** button at the bottom right of the stage opens the chat.

<img src="/img/kinetic-scenes/ai-assist.png" alt="AI assist, connected through the AI Dev Kit" width="440" />

- **What to change:** **This scene**, **Selected** (only the layers you selected) or **New scene**.
- **Settings** (the gear at the top of the panel): the **Style** to follow (a [style](./stage.md#styles), or none: the AI
  decides), the **Voice** for **Build with a voice-over**, and **Look and fix** (after building, the kit renders each part
  once it has landed and the AI fixes what it sees, below). A line under the scope buttons shows what is chosen; click it to
  change it. The connection shows as a green dot in the header, with the AI's name in the settings.
- Every answer is **one undo step**, with a **Go back to before this** link and a Check scene count; **Fix with AI** in the
  Check tab sends its findings to the AI.
- The rules the AI follows and the rules Check scene measures are the same, so its scenes start close to clean.

**Connecting.** Start the AI Dev Kit (start.bat or start.command). Browsers ask before a website may reach apps on your
own computer ("…wants to access other apps and services on this device"): choose **Allow** once. The kit answers only the
Studio's own address, so other websites cannot use your AI. The panel names the AI at work.

## Work in steps (with a project and Claude Code)

When a [project](./ai-agents.md#projects) is open and the AI Dev Kit's AI is **Claude Code**, AI assist can work in steps
instead of answering in one go: Claude Code runs as an agent inside the project's folder, with the Kinetic Scenes
tools. It reads the project notes, looks up the format, edits the scene, looks at the frames it changed, checks its work
and writes what it did into the notes. Each step shows in the chat as it happens, and the scene updates on the stage
every time it saves.

<img src="/img/kinetic-scenes/ai-assist-steps-working.png" alt="AI assist working in steps: the steps stream into the chat" width="400" />
<img src="/img/kinetic-scenes/ai-assist-steps-done.png" alt="The finished answer: what changed, what was checked, and the number of steps" width="400" />

- **Turn it on or off** in the AI assist settings (the gear): *Work in steps in the project*. The line under the request
  box says *In steps* while it is on. It is used for **This scene** and **Selected**; **New scene** still answers in one go.
- **What it may touch:** the files in the project folder, and the Kinetic Scenes tools (the guide, check scene, frames,
  the timeline, the notes). It cannot run commands, reach the web, start other agents, render, or save anywhere else.
- **Stop** stops it; whatever it already saved stays, and **Undo** goes back step by step.
- A request takes about a minute (15 or so steps for a small change), using your own Claude subscription through Claude
  Code. With another AI in the kit (an API key, a local model), AI assist answers in one go, as before.

## Plan first

Turn on **Plan first** for a new scene and choose what you are making:

- **Storyboard:** the hook in the first two seconds, each act (its length, what appears, its layout, its entrance and
  transition), the ending and the sound.
- **Explainer:** the narration, split into segments, each naming what the screen shows.
- **Tutorial:** the same, naming the exact code typed or changed in each segment.

Adjust the plan in the chat, then **Build it**. When the request names a length ("a 20 second explainer"), the script is
kept to what fits in it (about 2.6 spoken words a second).

## Explainers with a voice-over

For an explainer or a tutorial, **Build with a voice-over** has a free voice on your computer speak the approved script
(installed once, about 60 MB), times every word, and builds the scene on that clock, so each picture lands just before the
words that describe it. The voice-over stays editable in the scene's **Voice-over from a script** section.

## Look and fix

With **Look and fix** on, after building or changing a scene the kit renders the settled frame of every act and the middle
of every transition, and the AI looks at them with the Check scene report: cramped or unbalanced layouts, things
overlapping or cut off, text too small or too long, low contrast, an empty or cluttered frame, a muddy transition, a weak
ending. It returns only the layers it changes, and the result is checked again before you see it.

## A quick scene from a website

In a new scene, paste a website address under **Or start from a website**. The kit reads the site's real words, colours,
fonts and button labels and takes two screenshots; the AI builds an editable scene that shows the product in use, ending
on one of its real calls to action. Nothing is invented.

## Edit my video

With [footage](./video.md#footage) in the scene, **Edit my video** takes the footage's sound out and transcribes it (if it
isn't yet), then the AI adds captions and places 5 to 10 effects on the moments that suit them, each landing on its word:
a hook in the first two seconds, a snap zoom on a punchline, a grade on a change of mood, ticks on a list, the comment box
at the end. Footage, timing and sound stay exactly as they are; it only adds. Type what you want first to steer it.

It returns only what it adds, so the answer is short; how long the AI itself takes depends on the model chosen in the AI
Dev Kit (a faster model brings it under a minute).

## In video mode

AI assist follows the [video rules](./video.md#checks-for-video): the hook by two seconds, words out of the app's covered
areas, captions for a voice-over, a length that suits the platform, one camera move across every cut. A video it changes
stays a video, in the same formats.

## A skill for any AI

The workflow, the scene format, every preset, the motion rules and a checklist are published at
[kinetic-scenes.unysonplus.com/skill](https://kinetic-scenes.unysonplus.com/skill/) (and `llms.txt`), generated from the
Studio's own code so they never go stale, and copied into the AI Dev Kit. Any AI that can read a page can write a scene.

## Tools for agents

An agent such as Claude Code, Codex or Cursor can write a scene file directly and use the kit's scene tools to check it,
without the Studio open:

```bash
cd <kit>/assembled/UnysonPlus-Capture-Service/tools/design-capture
node studio-cli.mjs check scene.json          # validate + Check scene
node studio-cli.mjs inspect scene.json        # layers and clips in time, sound, key moments
node studio-cli.mjs stills scene.json         # a frame of each part once it has landed, with its layout measured
node studio-cli.mjs render scene.json --out scene.mp4   # --format webm|mov, --transparent, --cover
node studio-cli.mjs beats music.mp3           # tempo, beats and the strongest moments
node studio-cli.mjs transcribe voice.mp3      # every word with its time
node studio-cli.mjs separate clip.mp4         # the voice and the music as two WAV files
```

`stills` is the review step: one frame of every part at the moment it has fully landed, and a list of the layout problems
measured on each (words on words, ticks far from their words, uneven or off-centre lists, words crossing a panel). An
agent fixes those, then looks at each frame itself against the review list in the skill (alignment, spacing, panels,
balance, reading) before handing the scene over.

Add `--json` for machine-readable output. The same tools are a local MCP server, so the agent calls them as tools
(`scene_stills` returns the frames as images it can look at, `audio_separate` splits a clip). The server adds three more: `scene_guide` (the scene
format and the presets, so the AI writes valid scenes), `scene_link` (a Studio link that opens the scene in the
browser) and `scene_save` (writes a scene to a file). Every scene tool takes either a file path or the scene itself, so an
app without file access can still use them:

```bash
claude mcp add kinetic-scenes -- node <kit>/assembled/UnysonPlus-Capture-Service/tools/design-capture/studio-mcp.mjs
```

In **Claude Desktop** (or any MCP app), add the server to its MCP settings (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "kinetic-scenes": {
      "command": "node",
      "args": ["<kit>/assembled/UnysonPlus-Capture-Service/tools/design-capture/studio-mcp.mjs"]
    }
  }
}
```

Then ask for a scene in the conversation: it reads the guide, writes the scene, checks it, looks at the stills and gives
you a link that opens it in the Studio.

## An AI inside the open Studio

Where the browser offers it (WebMCP), the Studio registers its own tools, so an AI in the browser can work on the scene in
front of you: look at the scene, add and change layers and clips, seek and select, change by change, each with undo.
