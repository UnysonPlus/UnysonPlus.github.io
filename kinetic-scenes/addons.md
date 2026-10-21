---
sidebar_position: 12.2
title: Add-ons
description: Extra tools Kinetic Scenes can use through the AI Dev Kit on your computer — Voicebox for voice-overs in your own voice, speech recognition, voices, voice and music separation, with Blender and sound identification coming soon.
---

# Add-ons

Add-ons are extra tools the Studio can use through the [AI Dev Kit](/ai-dev-kit) on your own computer. Open them from
**Add-ons** in the top bar to see what is connected or installed. Nothing is uploaded anywhere: the kit does the work
locally.

There are two kinds:

- **Connectors**, for apps you install yourself. The kit finds them where they usually are; if one is somewhere unusual,
  set its location once in the Add-ons panel.
- **Downloads**, which the kit installs itself the first time you use them.

| Add-on | Kind | What it does | Where you use it |
|---|---|---|---|
| **Voicebox** | Connector | Voice-overs in your own voice (or any voice you have the right to use) from your Voicebox profiles. | [Voice-over from a script](./sound.md#a-voice-over-from-a-script), AI assist's **Build with a voice-over** |
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

Only use a voice you have the right to use: your own, or someone's with their permission.

## For agents

The add-ons are listed by the kit at `GET /studio/addons`. A connector's location is set with `POST /studio/addons/<id>
{ "location": "…" }` (an empty location goes back to the usual place) and kept in the kit's `addons.json`. A voice-over
in a Voicebox voice is `POST /studio/voice { "lines": […], "voice": "voicebox:<profile id>" }`.
