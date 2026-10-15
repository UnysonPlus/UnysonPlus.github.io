---
slug: animation-studio-sound-effects
title: "Where should the Animation Studio's sound effects come from?"
authors: [jon]
tags: [architecture, animation]
date: 2026-10-15
description: Three tiers. Built-in sounds synthesised by the player (no files, no licences), a free public-domain library the AI Dev Kit downloads, and AI-generated sounds made through the kit. Only CC0 sounds are ever redistributed; most "free SFX" sites forbid it.
---

**The question:** How many sound effects should the Studio have, and where should they come from? Are there free
sound-effect sites whose files we could make downloadable through the AI Dev Kit, and could AI generate sounds? The more
the better, ideally both ready-made and generated.

<!-- truncate -->

## Context

The Studio runs on GitHub Pages with no server and no budget for one (see *Should the Animation Studio get accounts and
cloud saving on the website's hosting?*). Scenes play on WordPress pages, in the Studio and in video exports, so a sound
must be identical in all three. Anything that can't run in a browser runs in the AI Dev Kit on the person's computer.

The deciding factor turned out to be the licence, not the number of sounds. "Free" sound sites mostly allow using a
sound **inside your own video**, but forbid handing the raw files out as files or as part of another library.

## Options considered

- **Bundle a big free library on the Studio site.** The popular free sites cannot be redistributed: Pixabay's licence
  forbids standalone redistribution, the free GDC bundles from Sonniss allow use in your projects but not repackaging
  (and, since 2024, not AI training), ZapSplat forbids it on every plan, Mixkit's redistribution terms are unclear, and
  BBC Sound Effects are non-commercial only. Only public-domain (CC0) packs, such as Kenney's audio packs and the
  512-sound retro pack on OpenGameArt, can be shipped.
- **Synthesise the sounds in code.** Short motion and interface sounds (whoosh, pop, click, impact, chime, typing) can
  be made from oscillators, filtered noise and envelopes. There are no files to host, no licences, nothing to download,
  and the same code runs in the Studio, the WordPress player and the video renderer.
- **Generate sounds with AI.** Possible through the kit only. MOSS-SoundEffect v2.0 has the cleanest licence (Apache 2.0)
  but realistically needs a graphics card. Stable Audio Open Small runs on an ordinary processor but its licence is free
  only below $1M yearly revenue. A cloud API (ElevenLabs Sound Effects) needs the person's own key and costs a few cents
  a sound. Models with non-commercial weights (MMAudio, AudioGen) are out: users couldn't use the results commercially.

## Decision

Three tiers, lightest first:

1. **Built-in sounds, synthesised by the player** (shipped first): 25 sounds that cost no bytes. A clip carries
   `sound: { name }`, so the sound moves with its motion; an audio track can also use `sfx:<name>`. Video export asks the
   scene's own player to render them, so the export matches the preview exactly.
2. **A CC0 library downloaded by the AI Dev Kit** (planned): about a thousand public-domain sounds with a per-file
   manifest of source and licence, plus an optional Freesound search filtered to CC0 with the person's own key.
3. **Generated sounds through the kit** (planned): the person's own sound-effects API key, or a local open model the kit
   installs on request, with its licence explained before it is downloaded.

When AI builds a scene, it uses tier 1 first, then the downloaded library, and generates only when nothing fits.

## Why

Synthesised sounds solve the hard constraints at once: no hosting, no licence to track, identical output everywhere,
and every sound can be adjusted (pitch, volume, timing). They cover what motion graphics mostly needs: short swooshes,
hits and tones. The CC0 library adds variety without legal risk, because CC0 is the only common licence that allows
handing files out. Generation fills in whatever neither has, and it lives in the kit because it can't run on GitHub Pages.

Sound also needs restraint. A sound on every clip turns into noise, so "Add suggested sounds" scores clips (whole groups
and headline moments first) and keeps at least 1.5 s between sounds. The AI follows the same rule: about 3-6 sounds per
10 seconds.
