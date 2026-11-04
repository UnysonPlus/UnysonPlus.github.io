---
sidebar_position: 11.3
title: Checks and clean-up for videos
description: The AI Dev Kit tools that keep a Kinetic Scenes video right before anyone sees it — project notes, a timeline at a glance, the automatic video check after a render, the voice check and best take, cleaning up recorded speech, and connecting your AI agents in one step.
keywords: [kinetic scenes, video check, timeline, voice-over, best take, talking head, filler words, ai agent, mcp]
---

# Checks and clean-up for videos

These tools come with the [AI Dev Kit](/ai-dev-kit) and run on your computer. Your AI agent uses them while it makes a
video in a [project](./ai-agents.md#projects); you can run them yourself from the kit's `tools/design-capture` folder with
`node studio-cli.mjs …`. Nothing is uploaded.

| Tool | What it answers | Command | Agent tool |
|---|---|---|---|
| Project notes | What was planned, decided and left to do? | `notes "<project>"` | `project_notes` |
| Timeline at a glance | Do the words, the cuts and the subtitles line up? | `timeline <scene.json>` | `scene_timeline` |
| Video check | Is the finished video right: every line heard, no black, loud enough, no clipping? | `cut-check <video>` (runs after every render) | `video_check` |
| Voice check and best take | Does this voice line say the script, without odd pauses, and do its questions sound like questions? Which take is best? | `voice-check`, `voice-review`, `best-take` | `voice_best_take` |
| Clean up recorded speech | Can the false starts, ums and long pauses go? | `cleanup <clip>` | `footage_cleanup` |
| Connect your agents | Can my agent use all of this? | `connect` | — |

## Project notes

Every project keeps a `notes.md` beside its scene: **Plan**, **Decided** and **Still to do**. Videos are often made over
several sessions (yours and your agent's, sometimes more than one agent), and the notes are how they agree: which hook was
approved, which take was chosen and why, which music, what was rendered.

<img src="/img/kinetic-scenes/project-notes.png" alt="File › Project notes in the Studio" width="560" />

- **In the Studio:** **File › Project notes…** (with a project open). It saves as you type. What your agent adds appears
  while the notes are open.
- **For agents:** read the notes before working on a project, and add a dated line when something is decided or done:
  `notes "Reel 1 - Live Editor" --add "Hook approved: take 3" --section Decided`. Agents are told to write only facts,
  never that something was published unless you said so.

## A timeline at a glance

One picture of a stretch of the video: a strip of frames, the sound wave (voice in blue, music in grey), every spoken word
at its time, and every text layer on screen as a bar. Pauses inside a phrase are marked in red.

<img src="/img/kinetic-scenes/timeline-at-a-glance.png" alt="A timeline: frames, the sound wave with two red pauses, the spoken words and the subtitles" width="800" />

The example above is a first take of a hook: the voice stops for 0.93 s between "builder" and "Pro", which sounds
machine-made. The words all matched the script, so only the timing shows it.

```
node studio-cli.mjs timeline "E:/Documents/Kinetic Scenes/Reel 1/scene.json" --from 0 --to 12
```

- `--from`, `--to`: the stretch, in seconds (default: the whole scene). `--frames`: how many frames in the strip (3–16).
  `--out`: where to save the PNG.
- **Pauses** are measured in the sound itself (the speech recogniser stretches a word over the silence after it, so word
  times hide pauses), and judged against the subtitle on screen: a pause after a comma or full stop in the subtitle is
  natural; one in the middle of a phrase is marked.
- **Use it** wherever there is a voice-over: to see a subtitle that leaves before its words are said, a line that starts
  on the cut, or a long stretch with no narration.

## The video check after a render

When a video is rendered through the kit (the agent's `scene_render`, or `render` on the command line), the finished
file is checked before it is handed over, and problems come back to fix:

- **Every voice line is heard**, at about its time. A wrong file path once dropped every line of an explainer silently;
  the check reports it as "0 of 11 voice lines heard" and names each one.
- **No unintended black**: a stretch of black picture after the start usually means a layer failed to load.
- **Loudness** about -14 LUFS, the level for social video (outside -20 to -10 is reported).
- **No clipping**: a true peak above -1 dBTP may distort on phones.

```
node studio-cli.mjs cut-check renders/reel-2.mp4 --scene scene.json
Cut check: PROBLEMS (1 cut(s), -16.0 LUFS, 5/5 voice lines heard)
  - The sound peaks at -0.9 dBTP and may distort on phones: keep it under -1 (lower the loudest clip).
```

**Clicks at cuts are prevented rather than measured.** The renderer fades every sound clip in and out by at least 12 ms,
so a clip cut mid-sound cannot click. (Measuring clicks in the finished sound mistook drum hits and "s" sounds for clicks.)

## The voice check and the best take

`voice-check` compares a voice line with its script: words that came out differently, and **pauses inside a phrase**
(longer than 0.4 s where the script has no punctuation). `best-take` ranks several takes of the same line by it, so you
keep the first that passes.

```
node studio-cli.mjs best-take --text "And you don't need a pro plan for it." take1.wav take2.wav take3.wav
1. PASS  take2.wav
2. 3 problem(s)  take1.wav
     - heard "problem" where the script has "pro" …
```

Lessons that came from these checks, now part of how agents write narration:

- A question needs a word that announces it ("**Still** paying for…?", not "Paying for…?"), or the voice reads it as a
  statement.
- Long chains of nouns ("a Pro page builder plan") make the voice break before the last one: shorten them.
- Write the spoken text in lower case ("pro", not "Pro"); the subtitle keeps the capitals.
- When the same break comes back take after take, reword the line rather than retrying.


### Check every line: voice-review

`voice-review` runs the voice check on **every line of a script, each heard on its own**, in one command. Give it the
same file you speak the voice-over from, with the kit running:

```
node studio-cli.mjs voice-review lines.json
1. OK  Are you still paying for a WordPress SEO plugin?
4. PROBLEMS  Audit your whole site, and find what's holding it back.
     heard: Audit your whole site and find what's holding it back.
     - 0.60 s pause between "whole" and "site" (no punctuation there): sounds machine-made
6. PROBLEMS  Sitemaps, sharing cards and schema are all done for you.
     - heard "Zit" where the script has "sitemaps"
```

`lines.json` is `{ "lines": ["…", "…"], "voice": "…" }`. Lines already spoken come from the kit's cache, so it tests the
same audio the voice-over uses, and the command exits with an error when any line fails.

**Why line by line:** transcribing a whole voice-over hides slips, because speech recognition leans on the words around a
sound and corrects it. "Sitemaps" that sounded like "zitemaps" came back as "Site maps" in the whole voice-over and as
"Zit Maps" on its own.

**When a line fails, change the words, not the take:** the same text comes out the same. Writing "Site maps" fixed a buzzed
"s" at the start of a line; rewording fixes a gap the voice keeps putting in one phrase. On-screen captions can keep the
normal spelling.

**Limits:** it finds what speech recognition and timing can measure: changed words, mispronounced words that come out as
other words, pauses and flat questions. It cannot judge tone, and a sound that is only slightly off can still pass, so
listen to the result too.

### Captions that lose their last word

Text timed to the voice (the [Spoken rhythm](./presets.md)) brings each word in as it is said, so if the text leaves too
early its last word never appears. The scene `check` compares each such layer's last spoken word with the moment the
layer fades, and warns when it would stay up for less than 0.3 s: `its last word, "across", is said at 32.18 s but the text
leaves at 32.12 s`. Move the fade later; the next caption can start as this one leaves.

### Questions that sound like questions

A voice can read a question flat, as a statement, and the words still all match. When the script line ends in a question
mark, the voice check measures how it ends:

- **The pitch decides:** the last quarter second of voice against the half second before it. A rise of 6% or more counts
  as a question; anything less fails the take.
- **The transcript is only a fallback.** Speech recognition writes "?" after anything worded like a question, however
  flatly it was said, so a "?" in the transcript does not prove the line sounds like one. It counts only when the pitch
  cannot be read, and for questions that open with What, Why, How, When, Where, Who or Which, which fall when said well.

The result gives the pitch change, for example `the pitch moves -8% at the end, and the transcript ends "plugin."`.
On one reel's hook, "Still paying every year for a WordPress SEO plugin?" fell 8% and failed; "Are you still paying for a
WordPress SEO plugin?" rose 34% and passed. **If a question fails, rephrase it rather than re-reading it:** the same words
tend to come out the same. Short questions that end on the point rise best: "Are your WordPress links too long?" rose 23%,
while "Are the links on your WordPress site long and ugly?" fell 10%. An opening like "Are you…" helps but does not
guarantee it ("Are you paying every month for a CRM?" fell 8%), so measure the line.

**Limits:** the pitch needs voiced sound at the end of the line, so check one line at a time, not a whole voice-over. The
number is a guide to the ear, not a replacement for it: listen to the hook before you render.

### Word times stay inside their lines

Speech recognition over a whole voice-over can run half a second late. The kit knows exactly when it laid down each line,
so a generated voice-over's words are fitted into their own line's window, and captions and sounds timed from them stay on
the voice. If the recogniser hears a different number of words than the script has, the times are left as they came, and
the Check's overlap and short-display warnings are the sign to look at.

## Clean up recorded speech

For a talking head or a recorded voice-over: `cleanup` finds, from the words and their times,

- **false starts**, a phrase broken off and said again ("build your own… build your own header"): the last one stays;
- **fillers** (um, uh, er, hmm) when the recogniser writes them;
- **long pauses**, over 0.6 s, shortened to 0.25 s,

and renders the clip with those parts cut out, each cut faded so it cannot click. An edit list (`.edl.json`) beside the
result shows every cut.

```
node studio-cli.mjs cleanup talk.mp4
talk-clean.mp4: 9.88 s → 6.88 s (3.00 s cut, 2 cut(s))
  - 0.03-1.52 s: false start: "Build your own header,"
  - 4.80-6.31 s: pause of 1.76 s shortened to 0.25 s
```

Options: `--max-pause` (default 0.6 s), `--keep-pause` (0.25 s), `--no-fillers`, `--out`. Look at the result before
using it: a repeated phrase that was meant ("very, very good") is kept for common words, but not for every case.

## Connect your agents

The first time the AI Dev Kit starts, it asks whether to connect the AI agents it finds on your computer (Claude Code,
Cursor, Codex). Yes registers all of these tools with each, and adds the Kinetic Scenes skill to Claude Code; the answer
is remembered. To see what it would change, or to do it later:

```
node studio-cli.mjs connect          # shows the plan
node studio-cli.mjs connect --yes    # applies it (running it again changes nothing)
```

It adds `kinetic-scenes` to Claude Code (`claude mcp add --scope user`), to Cursor (`~/.cursor/mcp.json`, keeping what is
there) and to Codex (`~/.codex/config.toml`). See [AI agents and projects](./ai-agents.md) for working with an agent.
