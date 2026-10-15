---
slug: animation-studio-voice-led-scenes
title: "How should the Animation Studio turn a voice-over into a scene?"
authors: [jon]
tags: [architecture, animation]
date: 2026-10-16
description: Speech recognition runs on the user's computer through the AI Dev Kit and measures how each word is said; the voice decides the timing and the AI decides what to show. Check scene reads voiced text by ear instead of by the silent reading-time rule.
---

**The question:** Can the user upload a voice-over and press one button to get a scene built on it, with presets that
follow how the text is said and sound effects that come automatically? Do we need a transcription first?

<!-- truncate -->

## Context

The Studio runs on GitHub Pages with no server, and its AI already runs through the AI Dev Kit on the user's computer.
A scene timed to a voice needs to know when each word is said, and ideally how: which words are stressed, where the
pauses fall, whether the delivery is calm or energetic. The Studio's Check scene also enforced a rule that text stays up
long enough to be read silently, which a voice-led scene breaks on purpose.

## Options considered

- **Send the audio to the AI.** The kit's AI backends take text, not audio, and a minute of audio is megabytes.
- **A cloud speech API.** Accurate, but another account, a cost per minute and the voice leaving the computer.
- **Local speech recognition in the kit.** whisper.cpp (MIT) has ready-made programs for Windows and Linux (Homebrew
  on macOS), runs on an ordinary processor (about ten seconds per minute of audio with the 148 MB model) and gives
  every word a time. The kit downloads it once, on request.
- **Let the AI time everything itself from the transcript,** or **time it in code and let the AI only pick words.**

## Decision

1. **Transcription is a kit feature of its own** (no AI needed): whisper.cpp on the user's computer, Fast (148 MB) or
   Accurate (488 MB) model, downloaded once from the Studio. Each word gets its time and an **emphasis** score measured
   from the recording (loudness, pitch and how long it is held against the speaker's own average); the delivery is
   summarised as pace and a label (calm, conversational, energetic, expressive). Words are stored on the audio clip,
   timed from the file's start, so they follow the clip when it is moved or trimmed.
2. **The voice decides the timing; the AI decides what to show.** The Studio groups the words into beats and sends
   them, with the strong words and pauses, as data next to a brief: key words only (not captions), on screen just
   before they are said, hits and sounds on the strongest words, transitions at pauses, motion matched to the delivery.
   The style chosen in AI assist still sets the look.
3. **Check scene reads voiced text by ear.** Text whose words the voice says while it is on screen only needs to be up
   while it is said, so the silent reading-time rule is skipped for it. Handoffs (one phrase leaving as the next arrives
   in the same place) are no longer counted as overlaps; real collisions still are.
4. **Uploaded files never go to the AI.** Images and audio are sent as short placeholders and put back afterwards, and
   the AI never edits audio tracks.

## Why

Local recognition fits the no-server model and keeps the voice on the user's machine, and measuring emphasis from the
audio gives the AI what a transcript alone can't: which words were stressed. Keeping the timing in the voice's hands
was measured on a 75-second voice-over: across 35 text layers, text entered a median of 0.01 s before its word was
spoken. Applying the old reading rule to that scene produced 33 warnings that were all wrong by design. With the voice
rule, the handoff rule and a corrected size estimate for multi-line text, Check reported exactly one warning, a real
collision.
