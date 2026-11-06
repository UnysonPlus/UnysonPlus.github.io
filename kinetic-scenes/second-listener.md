---
sidebar_position: 11.35
title: Second listener
description: Have Gemini listen to a Kinetic Scenes voice-over before you render, and get timed notes on lines that sound read, questions that fall flat, unclear words and a slow start.
keywords: [kinetic scenes, review voice over, ai video review, gemini video review, check narration, ai agent, mcp]
---

# Second listener

The [video checks](./video-checks.md) measure a video: its loudness, its black frames, whether every line can be heard.
They can't tell you that a line sounds read, or that a question doesn't sound like a question. The **second listener**
gives you that opinion. Gemini listens to your scene and answers with notes, each tied to a moment you can jump to.

It works before you render. The Studio mixes the scene's sound in a few seconds, so you can hear about a problem without
waiting for a video.

<img src="/img/kinetic-scenes/second-listener.png" alt="The Second listener dialog with a summary and two timed notes, each with a suggested fix. The notes shown are a made-up example." width="560" />

*The notes in this picture are an example, to show the layout.*

## What you need

- The [AI Dev Kit](./index.mdx) running on your computer, in a version that includes this tool.
- A Gemini API key of your own. You can [get a free one from Google](https://aistudio.google.com/apikey).
- A scene with sound.

## Before you send anything

The sound goes to Google, so you decide each time. The box in the dialog is cleared after every review.

- **On Google's free tier, Google may use what you send to improve its products, and people may read it.** Google asks
  you not to send anything sensitive, confidential or personal on that tier, so don't send client or private work.
- Google's paid tier doesn't use your content to improve its products. Google can still keep it for a limited time to
  check for misuse. In the UK, Switzerland and the European Economic Area, the paid-tier data terms also cover free use.
- You must be 18 or over to use Google's API, and it's only available in certain regions.
- The upload is deleted as soon as the answer is in. If that delete fails, you're told, and Google removes the file on its
  own within 48 hours.

Google's [terms](https://aistudio.google.com/docs/terms) are the final word on all of this.

From the Studio, only the sound is sent, along with the script if the scene has one. No pictures leave your computer.

## Use it

1. Open your scene and choose **Tools › Second listener**.
2. The first time, paste your Gemini key and click **Save**. It stays in the AI Dev Kit on your computer.
3. If you want, type something specific to listen for, such as "Does the second line sound like a question?"
4. Read the note about Google, then tick the box.
5. Click **Listen to it**. A review usually takes about a minute.
6. Click a time beside a note to move the playhead there.

To replace or remove your key, click **Change key**.

## What it reports

You get a short summary, then notes in time order. Each note has:

| Part | What it means |
|---|---|
| **Time** | Where it happens. Click it to go there. |
| **Fix** or **Consider** | Fix means a viewer will probably notice. Consider is a matter of taste. |
| **Kind** | Voice, pronunciation, music, effects, hook, pacing, picture, caption or other. |
| **Note** and **suggestion** | What it noticed, and what to change. |

A good scene can come back with few notes, or none. Gemini is told not to invent any.

If a note is timed past the end of the scene, it can't be real, so it's left out and the dialog tells you how many went.

## With your AI agent

Your agent can use the `video_listen` tool. It can also review a finished video, which the Studio dialog doesn't do yet.
For a video, it sends the pictures and a separate copy of the sound. Your agent has to ask you first, every time.

From the command line, `--yes` is your agreement to send it:

```
studio-cli listen scene.json --yes
studio-cli listen reel.mp4 --scene scene.json --question "Is the hook too slow?" --yes
```

Agents that build a project for you on their own can't use this tool, because nobody is there to agree to the upload.

## Options

| Setting | What it does | Default |
|---|---|---|
| `GEMINI_API_KEY` | Uses this key instead of the one saved in the kit. | Not set |
| `GEMINI_MODEL` | The Gemini model to use. | `gemini-3.8-flash` |

## Limits

- **It's an opinion, and it can mishear.** Treat a note as a reason to listen again yourself.
- **It doesn't judge loudness or balance.** Google compresses the sound, so whether the music covers the voice is
  better answered by the [video check](./video-checks.md), which measures it.
- **The sound is much clearer when sent on its own.** Google keeps a separate sound file at 16 Kbps, but the sound inside
  a video at about 1 Kbps. That's why a video goes with a separate copy of its sound.
- **The pictures in a finished video are reviewed at one frame a second**, so it can miss a very quick flash.
- **Each file can be up to 2 GB.**
- **If Gemini can't answer, the review stops and says why.** Nothing else takes its place, so a note always comes from the
  listener you chose.
- Words spoken or shown in your scene are treated as material to review, never as instructions.
