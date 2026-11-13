---
sidebar_position: 9.65
title: Word pins (timed by the words)
description: Pin a layer, a group or a clip in Kinetic Scenes to a word of the voice-over, so it appears when the voice says it and moves by itself when the voice is re-recorded, reworded, trimmed or translated.
keywords: [word pins, sync text to voice-over, kinetic scenes, timed to narration, voice-over timing, kinetic typography]
---

# Word pins: timed by the words

In a video with a voice-over, most things on screen belong to a spoken word: the headline lands on "database", the
screenshot appears on "page builder", the price pops on "only". Typed as seconds, those times break the moment the voice
changes: a better take is half a second slower, a line is reworded, the start is trimmed, the video is translated.

A **word pin** times something by the word instead of by the clock. Pin a layer, a group or a clip to a word (or a
phrase) of a voice clip, and it plays when the voice says it, whatever the voice does next.

## What can be pinned

| Pin | Where | What it does |
|---|---|---|
| **Appears on a word** | Inspector › Timing (a layer or a group) | The layer, with all its clips, moves so it appears on the word. A group moves with everything inside it. |
| **Disappears on a word** | Inspector › Timing (a layer or a group) | The layer's end follows the word. Set **At: When it ends** to leave just after the word. |
| **Starts on a word** | Inspector › Clip (a selected clip) | Only that clip moves: a pop, a highlight, a sound landing on the word. |

## Pin something to a word

1. Make or add a voice-over with its words: **Audio › Voice-over from a script**, or a recording you transcribe
   (**Tools › Transcribe a voice-over**). A pin needs the voice's words and their times.
2. Select the layer (or the clip) and open **Timing**. Under **Appears on a word**, click **Pin to a word**.
3. Pick the voice (when there is more than one), then **click the word** in the list of words. **Shift-click a later
   word** to pin to the whole phrase ("login screen"). Hovering a word shows when it is said.
4. Fine-tune with **At** (when the word begins, or when it ends) and **Offset** (seconds before or after, e.g. -0.2 to
   land the picture just before the word).

<img src="/img/kinetic-scenes/word-pin.png" alt="Appears on a word: the voice-over's words listed, database highlighted as the pinned word at 1.62 s, with At and Offset below" width="307" />

The pinned word shows beside the pin with its time ("database" · 1.62 s). While a pin is on, the time follows the word:
move it with the **Offset**, not the time field. **Unpin** puts it back to ordinary seconds, where it is.

## What moves it

Pins are applied whenever the scene changes and whenever it plays, so the timeline always shows the real times:

- **A new take** of the line, faster or slower: everything pinned follows the words.
- **Editing by the words** (cutting filler words or a sentence out of a voice-over): what comes after moves earlier.
  Pins search every part of a recording that was cut up.
- **Moving or trimming the voice clip** on the timeline.
- **A reworded line**: the pin finds its word wherever it now is. When the same word is said more than once, the pin
  keeps the one it was on.
- **A translation** ([Translate a video](./translate)): pins move to the translated words.
- **A spreadsheet row with its own narration** ([Videos from a spreadsheet](./batch-videos#a-voice-over-for-every-row)).

Speech recognition sometimes mishears a word ("exceso" for "acceso", "frango work" for "framework"). A pin of five letters
or more still finds the closest-sounding stretch of words, one word more or fewer. Short words must be heard as written,
so they are never confused ("the" and "they").

## When a word is gone

If the voice no longer says the word (it was reworded away), the pinned layer stays where it last was, its pin shows
**not said any more**, and **Check scene** lists it: pin it to another word or unpin it.

## For AI agents and the scene file

A pin is `at` (and `until`) on a layer, or `at` on a clip:

```json
{ "id": "headline", "type": "text", "text": "A *database*",
  "at": { "audio": "vo", "text": "database", "edge": "start", "offset": -0.15 },
  "clips": [{ "id": "in", "preset": "text-rise", "start": 0, "duration": 0.6 }] }
```

`audio` is the voice clip's id, `text` the word or phrase as said, `edge` `start` (default) or `end`, `offset` seconds.
`index` (which occurrence, counted in words) is filled in and kept up to date. The player applies pins when it plays,
so a scene written with the right words plays on them even before its times are updated. In the AI Dev Kit the same
rule is `studio-pins.mjs`; the [scene format](./ai-agents) and the agent skill describe it.

## Limits

- A pin follows a **voice clip's words**: it needs a voice made from a script, or a transcribed recording.
- Only the pinned layer or clip moves. Something pinned that is longer than the gap before the next pinned moment can
  overlap it; Check scene reports overlapping movements.
- A voice that gets much longer (a slower take, a translation) can run into the next voice clip. The voice clips
  themselves are placed in seconds; move the later one, or shorten the line.
