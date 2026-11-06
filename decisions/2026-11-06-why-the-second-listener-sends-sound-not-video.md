---
slug: why-the-second-listener-sends-sound-not-video
title: "Why does the second listener send a scene's sound instead of the finished video?"
authors: [jon]
tags: [kinetic-scenes]
date: 2026-11-06
description: The second listener reviews a scene's sound on its own, before any render, because Google keeps a separate audio file at 16 times the quality of the sound inside a video.
---

An AI that can hear a video could catch what our measurements can't, like a line that sounds read. The obvious design is to send it the finished video. Why doesn't Kinetic Scenes start there?

<!-- truncate -->

## The question

"Can it review a render? Does line 1 sound like a question? Does the music bury the voice? Is the hook slow?" The idea came from an open-source tool that sends whole videos to Gemini, so that was the first design on the table.

## Context

Kinetic Scenes already measures a finished video: loudness, black frames, and whether each voice line can be heard. None of that says whether a line sounds natural. Gemini can listen, but a render takes 7 to 15 minutes, and a review only helps if it's cheap enough to run before that wait.

Google's documentation changed the design in three ways:

- Sound inside a video is processed at about 1 Kbps in one channel. An audio file sent separately is kept at 16 Kbps.
- "Agentic" video processing loads audio only when the model chooses to, so a review could finish without listening at all.
- On the free tier, Google may use what's sent to improve its products, and people may read it.

## Options considered

1. **Send the finished video.** The simplest option, and it covers the pictures too. But it needs a render first, the sound is at its lowest quality, and every frame goes to Google.
2. **Send the scene's sound alone, before any render.** The same mix a render makes takes seconds, the sound is 16 times clearer, and no pictures leave the computer. It can't comment on the pictures.
3. **Send a video with a separate copy of its sound.** This gives the pictures and the clearer sound, but it needs a render and uploads the most.

## Decision

The sound goes on its own by default. It's the only mode in the Studio. Agents and the command line can also send a finished video, and that always goes with a separate copy of its sound. Video uses static processing, so every second is included.

The listener judges delivery only. Loudness and balance stay with the video check, because it measures them and the compressed copy can't.

Three rules protect the person:

- Nothing is sent without their say-so, each time. The box clears after every review, and the agent tool needs an explicit confirmation.
- The project agent can't use the tool at all, because no person is there to agree.
- A failure says what failed. No other engine quietly takes over.

## Why

The review is only worth having if people run it before the expensive step, so it has to be quick. Sending less turned out to be better on every count: faster, clearer, and more private. Keeping the measured and the judged separate means nobody has to wonder whether a loudness comment came from a meter or from a model guessing at a compressed file.

*Status: Accepted. How well Gemini judges voices is still unproven: the tool was tested against a stand-in for Google's service, and the first real reviews will show how useful its notes are.*
