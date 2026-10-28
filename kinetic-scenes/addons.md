---
sidebar_position: 12.2
title: Add-ons
description: Extra tools Kinetic Scenes can use through the AI Dev Kit on your computer — Voicebox for voice-overs in your own voice, ACE-Step for background music, speech recognition, voices, voice and music separation, with Blender and sound identification coming soon.
---

# Add-ons

Add-ons are extra tools the Studio can use through the [AI Dev Kit](/ai-dev-kit) on your own computer. Open them from
**Tools → Add-ons** to see what is connected or installed. Nothing is uploaded anywhere: the kit does the work
locally.

The AI Dev Kit is a free helper you install once. If the Studio cannot find it, the Add-ons panel and AI assist show
**Get the AI Dev Kit** and **How to set it up** ([the setup guide](/guides/set-up-ai-for-unysonplus)); once it is
running, click **Check again**.

There are two kinds:

- **Connectors**, for apps you install yourself. The kit finds them where they usually are, or you tell it once where
  they are: an address, or the app's folder or program. With a folder or program set, the kit **starts the app when it
  is needed**, so you do not have to open it first.

**Find it** looks in the usual install places: the program folders and the top two levels of each drive (so
`D:\AI\voicebox` is found). If it finds the app, it fills in the path. **Browse…** opens your computer's own file or
folder picker (through the kit; a web page cannot read a real path from your disk). **Type it** lets you paste a path.

### One AI tool on the graphics card at a time

Voicebox and ACE-Step each load a large model onto your graphics card, and two at once can overfill a 6 GB card and
make both slow or fail. So before one starts working, the kit closes the other **if the kit opened it**, waits for the
memory to come back, then goes on. Making a voice-over and then music opens Voicebox, closes it, then opens ACE-Step.
An app you opened yourself is never closed. Anything the kit opened also closes after ten idle minutes, and when the
kit itself closes.

- **Downloads**, which the kit installs itself the first time you use them.

| Add-on | Kind | What it does | Where you use it |
|---|---|---|---|
| **Voicebox** | Connector | Voice-overs in your own voice (or any voice you have the right to use) from your Voicebox profiles. | [Voice-over from a script](./sound.md#a-voice-over-from-a-script), AI assist's **Build with a voice-over** |
| **ACE-Step music** | Connector | Background music made on your computer, free to use: an instrumental in the style, tempo and length you ask for. | **Insert → Music…**, AI assist settings |
| **Speech recognition** | Download | Every word of a voice-over with its time (Whisper). | An audio clip's **Words** |
| **Built-in voices** | Download | Voice-overs from a script in a free synthetic voice (Piper). | Voice-over from a script |
| **Voice and music separation** | Download | Splits a clip's sound into the voice and the music (Demucs). | [Footage tools](./video-effects.md#separate-voice-and-music), an audio clip's **Voice and music** |
| **Blender** | Connector | Builds 3D objects from a description, for 3D layers. | Coming soon |
| **Sound identification** | Download | Names the sounds in a clip (a door slam, a music hit, ambience). | Coming soon |

## Voicebox

[Voicebox](https://github.com/jamiepine/voicebox) is a free, open-source voice studio that clones a voice from a short
recording. While it is open, it runs a small server on your computer, and the kit finds it there
(`http://127.0.0.1:17493`). If yours uses a different address, click **Set its address** in the Add-ons panel. The kit
only accepts an address on your own computer.

Your voice profiles then appear in the **Voice** menu of Voice-over from a script as "Voicebox: *name*". The kit asks
Voicebox for each line in turn, using the engine the profile is set to, joins the lines with short pauses, and times
every word with speech recognition, so scenes and captions follow it exactly. The first line can take a few minutes
while Voicebox loads its model; after that, each line takes seconds.

To have the kit open Voicebox for you, set its **Program** in the Add-ons panel: **Find it**, or **Browse…** to
`voicebox.exe` (not `voicebox-server.exe`). When a voice-over needs Voicebox and it is closed, the kit starts it and
waits until it answers; the first line then takes a minute or so while it loads.

Only use a voice you have the right to use: your own, or someone's with their permission.

## ACE-Step music

[ACE-Step 1.5](https://github.com/ace-step/ACE-Step-1.5) is a free, open-source music generator (MIT licence) that runs
on your own graphics card; the quick model needs less than 4 GB of graphics memory. Install it as its project
describes, then in the Add-ons panel set ACE-Step's **Location** to its folder (the one with `start_gradio_ui.bat`,
for example `D:\AI\ACE-Step-1.5`).

**Insert → Music…** (also in the AI menu, Tools and AI assist's settings) opens **Make music**: pick a style
(Upbeat, Corporate, Cinematic, Chill, Tech) or describe your own, set the length (it starts at the scene's) and the
tempo, and click **Make music**. The track goes in as a **Music** clip: it drops under a voice-over by itself, and its
beats are found straight away, so [Snap reveals to the beat](./sound.md#music-and-the-beat) works at once.

When ACE-Step is not running, the kit starts it with its own launcher, with its API on and its update check off, and
no browser window. The first track takes a minute or so while it loads; after that, half a minute of music takes well
under a minute. The kit stops the ACE-Step it started after ten minutes without a request, to give your graphics card
back. If you opened ACE-Step yourself, the kit uses it as it is and never closes it, but it needs its API: set
`ENABLE_API=--enable-api` in its launcher, or close it and let the kit start it. The kit only ever runs ACE-Step's own
launcher, inside the folder you chose.

## Blender

An AI agent can build 3D models and animated shots in Blender and bring them into your scenes; see
[Blender](./blender.md). Blender 4.2 or later is found where it is usually installed (or set `BLENDER` to its path), and
the kit runs it in the background when an agent asks: there is nothing to open or start.

## Check this computer

At the bottom of **Add-ons**, **Check this computer** lists what this computer has for Kinetic Scenes, as plain text
ready to paste into a bug report:

- the kit's version, the capture service's version and Node;
- the operating system, processor and memory;
- ffmpeg and ffprobe (needed for video, audio and previews);
- the browser the kit renders with (Chrome, Edge or Playwright's Chromium);
- the graphics card and its free memory;
- the AI the kit is connected to (or "off");
- Blender, if it is installed;
- the workspace folder and its free disk space;
- every add-on with its state and where it is.

**Copy the report** puts it on the clipboard. Nothing is sent anywhere. From the command line it is
`node studio-cli.mjs doctor` (add `--json` for the data), and agents have the `kit_doctor` tool: run it first when a
render, a voice or an add-on fails.

## For agents

The add-ons are listed by the kit at `GET /studio/addons`. A connector's location is set with `POST /studio/addons/<id>
{ "location": "…" }` (an empty location goes back to the usual place; add `"field": "app"` for Voicebox's program) and
kept in the kit's `addons.json`. `POST /studio/addons/<id>/find` searches and saves (`{ found }`);
`POST /studio/addons/<id>/browse { field }` opens the computer's picker (`{ chosen }`, null when cancelled). A voice-over in a Voicebox voice is `POST /studio/voice { "lines": […], "voice":
"voicebox:<profile id>" }`. Music is `POST /studio/music { "prompt": "…", "seconds": 30, "bpm": 120 }`, then poll
`GET /studio/music/<id>` for `{ state, step, result: { src, bpm, seconds } }`. The computer check is `GET /studio/doctor` (`{ report, text }`). From the command line:
`node studio-cli.mjs music "upbeat pop instrumental" --seconds 30 --bpm 120 --out music.mp3`.
