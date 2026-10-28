---
sidebar_position: 7
title: Sound, voice and captions
description: Audio in Kinetic Scenes — voice-overs, music and sound effects on the timeline, 25 built-in sounds, finding the beats, transcribing a voice-over, voice-overs from a script and captions.
---

# Sound, voice and captions

## Audio on the timeline

**+ Audio** adds a voice-over, music or a sound effect (MP3, WAV, OGG or M4A, up to 15 MB; longer files by address).
Audio sits on its own rows below the layers, with a waveform, so you can line up words and motion by eye.

- Drag to move, drag an edge to trim; set **volume**, **fade in** and **fade out**, and its **role** (voice, music or
  sound effect) in the Inspector.
- A voice-over longer than the scene makes the scene as long as it.
- **On a web page** a scene with sound starts muted with a small **Tap for sound** button, because browsers block sound
  until the visitor interacts. Presentations and full screen play sound from the first click, and video exports mix it in.

### Mixed like a sound designer would

- A sound attached to a clip's end (a landing), and any big hit or riser, starts early by its own attack so the **hit
  lands on the frame**.
- The same sound repeated within two seconds gets **softer each time**.
- **Music is lowered under the voice** while it speaks (to 35%), in the Studio, on the page and in video.
- Video exports are mixed to **-14 LUFS** with peaks under -1 dB, the loudness the platforms play at.

## Built-in sounds

The **Sounds** tab holds 25 built-in sounds in five groups: **movement** (whoosh, swish, slide, spin), **clicks and taps**
(pop, click, tick, tap, typing, beep), **hits and drops** (impact, thud, sub hit, drop, glitch), **tones and chimes**
(chime, sparkle, success, notify) and **textures and swells** (riser, swell, shimmer, reveal). The player makes them
itself from a few lines of code, so there is nothing to download or license, and they sound the same in the Studio, on
your pages and in video. Click one to hear it.

<img src="/img/kinetic-scenes/library-sounds.png" alt="The Sounds tab" width="232" />

### Sounds on clips

Select a clip and pick a sound in its **Sound** section (or click **Add** in the Sounds tab). It plays when the clip starts,
or on its last frame for a landing, and moves with the clip whenever you move or stretch it. **Offset**, **volume** and
**pitch** fine-tune it; a small speaker on the clip shows it has one.

- **Add suggested sounds** gives a scene's key moments the sound that suits each preset (a slam an impact, a wipe a swish,
  a typewriter typing), about one every second and a half at most, so sound supports the motion instead of piling up.
- With no clip selected, **Add** puts the sound on the audio rows at the playhead, like a sound file.

### More sounds

With the search box empty, the bottom of the Sounds tab offers two more ways to get a sound. Both run through the
[AI Dev Kit](/ai-dev-kit), so it needs to be running.

- **Make a sound.** Describe it ("a soft paper swoosh, 0.6 s") and click **Make**. With an ElevenLabs key in the kit, the
  sound is generated; otherwise the AI writes a synth recipe (oscillators, noise, a filter and envelopes) that the Studio
  renders into a WAV right in the browser. The result is added at the playhead as a sound effect.
- **Search Freesound.** Paste your free Freesound API key once, then search its public-domain (CC0) sounds: no credit
  needed, free to use anywhere. Click a result to hear it and **Add** to put it at the playhead. Sounds you use are cached
  on your computer.

## Music and the beat

No music yet? **Insert → Music…** makes an instrumental on your computer with the [ACE-Step add-on](./addons.md#ace-step-music),
free to use, as long as the scene, with its beats already found.

Select a music clip and **Find the beats**: the Studio works out the tempo, the beat grid and how strong each beat is, right
in the browser, and marks them on the clip (strong moments taller).

- **Snap reveals to the beat** moves a few big reveals up to 0.15 s so they land on a strong moment, and smaller entrances
  up to 0.10 s onto a beat. The scene keeps its own rhythm: only a few are locked.
- **React to music** lets one or two things breathe with the music's loudness or bass (a glow, a scale, brightness).
- AI assist gets the same cues when it builds a scene on the music.

## Words: transcribing a voice-over

Select a voice-over and click **Transcribe** in its **Words** section. Speech recognition (whisper.cpp) runs on your own
computer through the [AI Dev Kit](/ai-dev-kit): nothing is uploaded, and after a one-time download it works offline. Two
models: **Fast** (148 MB, about ten seconds per minute of audio) for clear voice-overs, and **Accurate** (488 MB) for
accents, noise and music, which also adds punctuation.

Every word gets its time and an **emphasis** score measured from the recording: how loud, how high and how long it is said
compared with the speaker's own average. The strongest words are shown in bold, the delivery is summarised (pace in words
a minute, and whether it sounds calm, conversational, energetic or expressive), and the words appear along the clip's
waveform. Click a word to jump there. The words stay with the clip when you move or trim it.

### Edit by the words

Cut a voice-over by editing its words: the voice, the footage it came from (and the person cut out of that footage) are
cut together, and everything after moves earlier, so titles and effects stay on their words.

<img src="/img/kinetic-scenes/edit-by-words.png" alt="Edit by the words: a false start struck out, and the Cut button showing the seconds it saves" width="310" />

1. Select the transcribed voice-over (for footage: **Footage tools › Use its sound**, then **Transcribe**).
2. Click **Edit by the words**. The words become switches: click one to strike it out, click again to keep it.
3. **Mark ums and repeats** strikes um, uh and the like, and the first of a phrase said twice in a row (a false start:
   "build your own… build your own header" keeps the second). Check what it marked; common doubles like "very, very" are
   left alone.
4. **Shorten pauses over 0.6 s** (on by default) trims long silences between the words you keep to 0.25 s.
5. **Cut** (it shows the seconds it saves).

No new files are made: the voice-over and the footage each become **parts** that play the kept stretches back to back
(their start and trim set for you), so every cut can still be adjusted or undone. Captions follow all the parts of a
voice-over. Footage plays in step with its voice when it has the same start and trim, which **Use its sound** gives it;
footage at a different speed is left as it is. **Undo** puts everything back.

## A scene from a voice-over

Once a voice-over has its words, its Words section offers **Make a scene from this voice-over** (AI assist). The Studio
groups the words into beats (the phrases said between pauses and sentence ends) and the AI builds kinetic type on them:

- each beat's **key words** (not every word) enter just before they are said and give way to the next beat;
- the **strongest words** land as the big moments: the largest type or the accent colour, a slam or pop on the word, a
  sound effect;
- **pauses** become transitions, and the **delivery** sets the motion: snappy for an energetic voice, gentle for a calm one;
- the style picked in AI assist sets the colours, fonts and personality.

Each text reveal is moved to finish on the word it shows. The result is an ordinary scene you can change by hand.

## A voice-over from a script

No microphone needed. In the scene's **Voice-over from a script** section (or **Build with a voice-over** in AI assist,
for an explainer), the AI Dev Kit speaks your script with a free voice on your computer (Piper; three voices, about 60 MB,
installed once), times every word and adds it as the voice track. Change a line and only that line is spoken again. The
pace is a calm explainer pace by default.

**In your own voice.** With [Voicebox](https://github.com/jamiepine/voicebox) open on your computer, your Voicebox voice
profiles appear in the **Voice** menu too ("Voicebox: Jon"). Each line is spoken in that voice, then every word is timed,
exactly as with the built-in voices. AI assist has the same **Voice** menu in its settings (the gear at the top of the panel) for **Build with a
voice-over**; the two menus are one choice, so changing either changes both. A voice track made this way shows its
voice when you select it ("Voice: Voicebox: Jon"). The first line
can take a few minutes while Voicebox loads its model; after that, a line takes seconds. Only use a voice you have the
right to use: your own, or someone's with their permission. See [Add-ons](./addons.md).

## Music composed to the scene

**Tools › Make music… › Composed to this scene** writes a short score to the scene's own timing, in about a second,
with nothing to install:

- **Tempo** from when things land: the beats fall as close as they can to the moments entrances finish, markers and
  groups start.
- **A chord change at each section** (markers, else groups), so the music moves when the scene does.
- **Accents** where the big moments land (large text, 3D), and **a lift into the reveal** (the scene's still frame):
  a riser, the drums out for the bar before it, an impact on it.
- **Moods:** Bright (major, steady drums), Calm (major, slower, no drums), Dark (minor) and Driving (minor, fast).

<audio controls src="/audio/kinetic-scenes/score-bright.mp3" preload="none"></audio>

*The Studio's demo scene, Bright: 116 bpm in C major, the lift into the reveal at 4 s.*

It goes in as a Music track like any other: it drops under the voice-over by itself and its beats are found, so
reveals can snap to them. Change the scene's timing a lot? Compose again. The instruments are made in code (a plucked
string, a pad, a bass and drums), not recorded samples: it suits short reels and explainers; for a full produced
track, use **ACE-Step** in the same window. Agents: `studio-cli compose scene.json --mood calm --out score.wav`, MCP
`scene_compose`.

## Captions

**+ Captions** adds the words of a transcribed voice-over, a few at a time, in your type and colours.

- **Words from:** which voice-over (the first one by default). **Most words at once:** 1 to 12.
- **Words arrive:** a few at a time with a small pop; **each slams in** as it is said (giant captions); or **each drops
  in** and bounces (viral captions).
- **Light up:** the word being said, every word said so far (karaoke), or nothing; with a highlight colour.
- A box behind the words, capitals, and all the usual type settings.
- **Letters:** plain, a thick **outline** (the short-form look, in black or a colour you choose), a **soft shadow** that keeps
  captions readable over busy footage, a **neon glow** (in a colour you choose, else the lit colour), or **chrome**:
  polished metal letters, with the word being said keeping its lit colour so it still stands out.

### Caption styles

The **Style** buttons at the top of the Captions settings apply a whole look in one click: the font (added to the
scene's fonts for you), the colours, how the words arrive and light up, the box and the letters. The size, the place
and which voice-over the captions follow stay as they are.

<img src="/img/kinetic-scenes/caption-packs-panel.png" alt="The Style buttons in the Captions settings: Bold, Neon, Chrome, Handwritten, Karaoke, Boxed, Giant" width="300" />

<img src="/img/kinetic-scenes/caption-packs.jpg" alt="The seven caption styles at the same moment of the same sentence" width="800" />

| Style | Font | The look |
|---|---|---|
| **Bold** | Montserrat Black, capitals | white with a black outline; the word being said in yellow; three words at a time |
| **Neon** | Righteous | a cyan glow; the word being said in green |
| **Chrome** | Anton, capitals | polished metal letters that slam in; the word being said in gold; two words at a time |
| **Handwritten** | Caveat | a friendly hand with a soft shadow; words drop in |
| **Karaoke** | Poppins ExtraBold | every word said so far lights up in teal, on a dark box |
| **Boxed** | Inter ExtraBold | white on a solid black box; the word being said in red |
| **Giant** | Anton, capitals | one huge word at a time, slamming in |

Change anything afterwards: a style is only a starting point. **Use this style on every caption** (shown when the scene
has more than one captions layer) copies this layer's look onto the others, keeping each one's size, place and voice-over.

In [video mode](./video.md), Check scene asks for captions whenever there is a voice-over, because most people watch with
the sound off.
