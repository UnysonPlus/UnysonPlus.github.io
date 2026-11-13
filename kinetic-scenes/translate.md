---
sidebar_position: 9.66
title: Translate a video
description: Make a copy of a Kinetic Scenes project in another language with the AI Dev Kit — every word on screen translated, every voice-over spoken again in a voice for that language, captions on the new words and word pins moved to the translation.
keywords: [translate video, video localization, translate explainer video, voice-over in another language, kinetic scenes, multilingual video]
---

# Translate a video

**Tools › Translate this video** makes a copy of your project in another language:

- **Every word on screen** is translated: text layers (and their phone layouts), alt text, link labels, diagram labels,
  list items and the title. Brand and product names, `{{placeholders}}`, web addresses, numbers and `*emphasis*` are
  kept.
- **Every voice-over** made from a script (or a transcribed recording) is spoken again, in a voice for that language,
  and its words are timed in that language.
- **Captions** follow the new words: they show the translated script word for word.
- **[Word pins](./word-pins)** move to the translated words, so a headline pinned to "database" lands on "base de
  datos".

Your project stays as it is. The copy is a new project called "*title* (*language*)", and **Open the copy** opens it.

<img src="/img/kinetic-scenes/translate-dialog.png" alt="The Translate this video dialog: a language list, the number of voice-overs to speak again and a Make the Spanish copy button" width="560" />

## What it needs

- The scene open as a **project** (File › Projects): the copy is made from its folder, media included.
- The **[AI Dev Kit](./ai-agents)** running, with its AI (your Claude subscription through Claude Code, or an API key)
  and FFmpeg.
- A voice for the language. The kit has a **free voice for 15 languages** and downloads it the first time (about 30-115
  MB): Spanish, French, German, Italian, Portuguese, Dutch, Polish, Swedish, Turkish, Russian, Ukrainian, Chinese
  (Mandarin), Vietnamese, Indonesian, Hindi and Arabic. The Italian and Portuguese free voices are basic quality.
- **Your own voice:** a [Voicebox](./addons) voice speaks English, Chinese, Japanese, Korean, German, French, Russian,
  Portuguese, Spanish and Italian. When the scene's voice-over is a Voicebox voice and the language is one of these,
  tick **Keep the Voicebox voice**: the copy speaks in the same voice.

## Use it

1. Open the project and choose **Tools › Translate this video…**.
2. Pick the language and, if offered, whether to keep the Voicebox voice.
3. Click **Make the copy**. The kit translates everything in one go, speaks each voice-over, times its words and
   writes the new project; the dialog shows each step.
4. Read the notes it lists, then **Open the copy** and play it through.

## What to check in the copy

Translations are usually longer than English (Spanish and German by 10-30%). The kit tells you:

- **A voice-over that got longer** ("Voice-over 3 is 1.2 s longer in Spanish").
- **A voice-over that now runs into the next one**: move the later voice clip (and what goes with it), or ask for a
  shorter line.
- **A longer scene**, when the last voice-over runs past the end.
- **A pin that lost its word**, when the translation left out the word something was pinned to: pin it again.

Words on screen can also be longer: check that they still fit their panels (Check scene reports text crossing a
panel's edge).

## From an AI agent or the command line

The AI Dev Kit's MCP tool `scene_translate` (project, to, voice?, name?) and its command line do the same:

```
kinetic-scenes translate "Product promo" --to es
kinetic-scenes translate "Product promo" --to fr --voice voicebox:<profile id>
```

`--to` is a two-letter language code. Without `--voice` the kit's free voice for the language is used. The reply gives
the new project's link and the same notes.

## Limits

- Voice-overs placed one after another stay at their seconds: a much longer translation can overlap the next one (the
  copy tells you where).
- Words inside pictures, footage and code layers are not translated.
- A voice with no script and no words (music, sound effects) is left as it is.
- The translation is written by your AI: read it, or have a speaker of the language read it, before you publish.
