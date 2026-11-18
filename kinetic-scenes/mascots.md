---
sidebar_position: 11.56
title: Mascots that talk
description: Make a mascot or brand character once, from one picture, your own pose pictures or six poses drawn by your image AI, or start from one of ten sample mascots (people and characters), and it talks on the voice-over of any scene, blinks, breathes and changes pose on the words you pick. Drawn mouths, sharper lip sync, saved mascots, Import / Export and agent tools.
---

# Mascots that talk

A **mascot** is a character that talks in your scenes. It shows one pose at a time, its mouth opens and closes on the
words of the voice-over, its eyes blink now and then, and it breathes a little. Pin a pose to a word and it waves on
"hello" or gives a thumbs up on "free".

<img src="/img/kinetic-scenes/mascot-talking.jpg" alt="A mascot talking: its mouth open on a word, shut between words, then waving and giving a thumbs up" width="760" />

It is made in the Studio, on your computer: the pictures are only sent where you send them yourself.

## Make a mascot

**Insert › Mascot…** opens the creator, in four steps.

### 1. Your mascot

<img src="/img/kinetic-scenes/mascot-start.jpg" alt="The mascot creator, step 1: the sample mascots (people and characters), Import a mascot file, and the three ways to make a new one" width="640" />

**Start from a sample:** ten mascots that come with the Studio, ready to talk (see [The sample mascots](#the-sample-mascots)).
Click one and it goes straight into the scene.

**Use a mascot you have:**

- **Your mascots:** the ones you saved with **Save to my mascots** (below), in any project. **Remove** takes one off the
  list.
- **Import a mascot file…:** a `.mascot.json` file from **Export the mascot** (another computer, a teammate).

**Or make a new one:**

| Choice | What you need | What you get |
|---|---|---|
| **One picture** | One picture of your mascot | A mascot that talks, blinks and breathes in one pose. The quickest. |
| **A picture for each pose** | Your mascot art in a few poses (waving, pointing…), one picture each | Those poses, ready to switch between. |
| **Six poses with your image AI** | A picture of your mascot, and an image AI you already use (ChatGPT, Gemini…) | Six poses: idle, explaining, waving, thinking, thumbs up, cheering. |

Pictures on a **plain or see-through background** work best: the Studio takes the background off by itself and trims
each pose. A picture on a busy background (a photo) is used as it is.

**Six poses with your image AI:** open your image AI, attach a clear picture of your mascot, copy the prompt from the
creator, send it, then upload the picture it draws (the pose sheet). The prompt asks for the six poses on a plain green
background with space between them, the same character in each, with the **mouth closed and the eyes open** (that is
what lets the mouth open and the eyes blink later). If a pose comes out different, ask it to "try again, keep the same
character". The creator links ChatGPT and Gemini; any image AI that keeps a character the same across poses works.

### 2. Poses

The poses it found, in order, with a name each (Idle, Explaining, Wave, Thinking, Thumbs up, Cheer, or type your own).
The first is the **main pose**, shown whenever no other pose is playing; **Make it the main pose** changes it. **Remove**
drops a pose; **Add more pictures** adds poses from other pictures.

<img src="/img/kinetic-scenes/mascot-poses.jpg" alt="Step 2: six poses cut out of the sheet, each with its name" width="640" />

If the sheet gives more or fewer than six poses (two poses touching, one missing), the creator says so: ask the image AI
for more space between the poses, or keep what it found.

### 3. Face

Where the **mouth** and the **eyes** are on each pose. The creator finds the eyes (a matching pair of spots, white or
dark, side by side) and puts the mouth just below them; you fix what is off.

- Pick **Mouth**, **Eye** or **Other eye**, then drag a box around it on the picture. Drag a box to move it.
- The mouth box goes around the **closed lips**. The eye boxes go around each whole eye.
- **The eyes are closed in this pose** (a happy squint): it does not blink in that pose.
- The preview beside it talks and blinks with the boxes you set, so you see straight away whether they are right.
- **Use this face on the other poses** carries the face to every other pose, placed against each pose's own eyes. Check
  each with **Next pose**.

<img src="/img/kinetic-scenes/mascot-face.jpg" alt="Step 3: the eyes found and the mouth below them, with the live preview talking" width="640" />

#### Drawn mouths (optional)

Under the face: **Drawn mouths**. Without them, the pose's own mouth opens and closes (its lower lip moves down over a
dark opening). With them, the mouth is **drawn for each sound**, which looks more like an animated cartoon:

1. **Copy the mouth prompt** and send it in the same chat with your image AI. It asks for the mascot's mouth nine times,
   on a green sheet, one per sound: closed, "ah", "ee", "oh", "oo", "m" (lips pressed), "f" (teeth on the lip), "l"
   (tongue up) and "s" (teeth showing).
2. **Upload the mouth sheet.** The Studio cuts out the nine mouths and shows them under their sounds. The preview talks
   with them at once.
3. **Use the pose's own mouth instead** goes back.

<img src="/img/kinetic-scenes/mascot-mouths.jpg" alt="The face step with Drawn mouths open: the preview talks with a drawn mouth" width="640" />

The drawn mouths go on every pose, over the pose's own mouth, sized to its mouth box.

<img src="/img/kinetic-scenes/mascot-drawn-mouths.jpg" alt="Drawn mouths changing with the sounds: ee, oh, teeth, lips pressed, closed" width="760" />

### 4. Add it

Give it a name and **Add it to the scene**. It goes in as a **Mascot** layer, about two thirds of the stage high. Move
and size it like any layer; the picture keeps its shape inside its box.

## How it talks

- **On the voice-over's words.** The mouth follows the scene's voice-over, using the timing of every word (the same words
  captions and word pins use). Any voice the Studio makes has them (the free voices, Voicebox); a recording gets them when
  you transcribe it. Without a voice-over with its words, the mascot stays quiet, and Check scene says so.
- **Shaped by the sounds.** Each word is timed letter by letter: the mouth opens wide on "a", less on "e" and "i", rounds
  on "o", and shuts on "m", "b" and "p". With drawn mouths, each of those shows its drawn shape.
- **Sharper lip sync, from the voice's loudness.** When a mascot goes into a scene, the Studio listens to the voice it
  talks on once and keeps its loudness on the voice clip (50 values a second). The mouth then shuts in the pauses, even
  short ones inside a word, and opens wider on the loud, stressed syllables, exactly in time with the sound. For a voice
  added later, click **Sharper lip sync** in the mascot's settings. It runs in the browser: nothing is uploaded.
- **Blinks** every few seconds, now and then twice, at its own natural rhythm (the same every time the scene plays).
- **Breathes**: a slow, small rise and fall, a touch more as it talks.

Re-record or reword the line and the mouth follows the new take (click **Sharper lip sync** again for its loudness).
Everything is drawn from the scene's time, so the preview, the exported video and the scene on a web page match exactly.

## Pose changes

Select the mascot, move the playhead to a moment, and click **Add a pose change**: a **Pose** clip on its row. Pick the
pose in it (its **Pose** setting); the mascot holds that pose for the clip's length, then goes back to its main pose. It
keeps talking and blinking in every pose.

<img src="/img/kinetic-scenes/mascot-pose-clip.jpg" alt="A Pose clip selected on the mascot's row, with its Pose setting and Pin to a word" width="760" />

Best of all, **pin the clip to a word** (**Pin to a word** in the clip's settings): the pose arrives as the word is said,
and stays with it when the voice changes. Thumbs up on "free", a wave on "hello", the thinking pose on a question.

## Settings

Select the mascot to see them in the Inspector:

| Setting | What it does |
|---|---|
| **Main pose** | The pose it shows when no Pose clip is playing. |
| **Talks on** | Which voice-over it follows (the first one with words, unless you choose). |
| **Sharper lip sync** | Measures the voice's loudness (shown until it is done; afterwards the settings say the mouth follows the loudness). |
| **Mouth opens** | How wide the mouth opens, 0 (shut) to 1.5. |
| **Blinks** | Blinking on or off. |
| **Breathes** | The slow breathing on or off. |
| **Add a pose change** | A Pose clip at the playhead (two poses or more). |
| **Edit the mascot** | Back into the creator: rename poses, add or remove poses, fix the face, change the drawn mouths. Pose clips keep working. |

It also takes every ordinary preset on its row (an entrance, a slide, an exit), like any layer.

## Your mascots: Import / Export

Under **Import / Export** in the mascot's settings:

- **Save to my mascots** keeps it in this browser, with every picture. **Insert › Mascot…** then lists it in any project,
  ready to use in one click.
- **Export the mascot** downloads it as one file, `<name>.mascot.json`, with its poses, face boxes, drawn mouths and
  settings inside. Use it on another computer, keep it as a backup, or share it with your team.
- **Import a mascot…** adds a mascot from such a file to the scene (also in the creator's first step).

A file exported and imported again gives the same mascot, unchanged. Saved mascots stay in this browser: clearing the
browser's site data removes them, so export the ones you want to keep.

## The sample mascots

<img src="/img/kinetic-scenes/mascot-samples.jpg" alt="The ten sample mascots: Pip, Daniel, Grace, Leo, Maya, Rosa, Bolt, Miso, Drip and Hoot" width="800" />

Ten mascots come with the Studio, drawn for Kinetic Scenes and free to use in the videos you make with it. Each has the same six poses (Idle, Explaining, Wave, Thinking, Thumbs up, Cheer), its face already set, and
nine drawn mouths, so it talks the moment there is a voice-over.

| Group | Mascot | Suits |
|---|---|---|
| People | **Daniel**, a businessman in a navy suit | Finance, law, consulting, B2B |
| People | **Grace**, a businesswoman in a charcoal blazer | The same, a female host |
| People | **Leo**, a man in a casual sweater | Coaches, creators, small shops |
| People | **Maya**, a woman in a cardigan | The same, a female host |
| People | **Rosa**, a chef | Restaurants, bakeries, catering |
| Characters | **Pip**, a round, friendly character | Anything friendly |
| Characters | **Bolt**, a robot in green and white | Apps, software, tech |
| Characters | **Miso**, a purple cat | Shops, cafés, anything for kids |
| Characters | **Drip**, a blue water drop | Cleaning, plumbing, health |
| Characters | **Hoot**, an owl in a graduation cap | Courses, schools, tutoring |

Because they share the six poses, a scene, a template or a set of Pose clips made with one works with any other: delete
one and add another, and its Pose clips can be copied across. Bolt talks with a glowing screen mouth, Hoot with his
beak. A sample is a starting point like any mascot: **Edit the mascot** changes its pose names or face, and **Save to my
mascots** keeps your version. Their pictures load from the Studio's site only when you pick one.

## Change your mascot's style

A mascot is drawn in one style, but three effects restyle it while it talks: **Silhouette** (one flat ink, the eyes and
mouth left light), **Line drawing** (only its outlines, white for a blueprint) and **Pixel art** (square pixels, like a
game sprite). Select the mascot, add the effect from **Give it a look** in the Library, and stretch the clip over the
words it belongs to. The mascot keeps talking, blinking and changing pose inside each one, so one drawing can appear in
several styles in the same video.

<img src="/img/kinetic-scenes/restyle-mascot.jpg" alt="One mascot four ways: as drawn, as a silhouette against a sunset, as a white line drawing on blueprint paper, and as pixel art" width="760" />

The settings and limits are on [Restyle effects](./restyle-effects.md).

## The Mascot presenter template

**A template › Mascot presenter** (in the start box): Pip on the left presents three points that land on the right, one
by one. It waves hello, explains each point, thinks, and gives a thumbs up at the end. Change the words, add a voice-over
(Pip talks on it), or put your own mascot in Pip's place (select Pip, **Edit the mascot**, or delete it and add yours).

## On a web page and in a video

A mascot plays wherever the scene does: exported as a video (MP4, or a see-through WebM or ProRes video to put on top of
anything in another editor), as a web page (Export › For a web page), or live on a WordPress page with the Unyson+
**Kinetic Scene** element. There it is sharp at any size and far lighter than a video. The element needs the scene player
0.0.70 or newer (the Animation Engine extension 1.5.19 or newer).

## With an AI agent

An agent connected to the [AI Dev Kit](./ai-agents.md) can use the mascots you made and the samples, with three tools:

- **`mascot_list`**: the mascots in your workspace projects, with their poses, and the ten samples.
- **`mascot_copy`**: copies one, with its pictures, into another project (a sample by its name: "use Grace").
- **`mascot_direct`**: pins poses to words of the voice-over ("wave on *hello*, thumbs up on *free*"), so they follow a
  new take by themselves.

Ask it, for example: *"Make a 30-second video where Pip explains our three plans, in a friendly voice, and gives a thumbs
up on the free one."* or *"Use Daniel to present our quarterly results in a calm voice."* The agent's guide is the kit's `docs/mascots.md` (`scene_guide` topic "mascots"); the format is in
the scene file reference (`type: "mascot"`, its `poses` with their `mouth` and `eyes` boxes, `mouths`, and `mascot-pose`
clips).

## Limits

- **The pose's own mouth works best closed** in the picture: it opens by moving the lower lip down. Drawn mouths avoid
  that limit.
- **The face boxes are a guess to check.** Eyes that are not a clear pair of spots (sunglasses, eyes drawn as lines) are
  not found: draw their boxes yourself, or turn off Blinks.
- **The eyelid is the skin just above the eye**, slid down over it, so it matches the skin when that skin is one colour.
  A busy pattern above the eyes shows as the lid. In the same way, drawn mouths cover the pose's own mouth with the skin
  just below it.
- **Pictures from an image AI depend on the AI.** Some change the character between poses, or draw mouths in another
  style; ask again, or use your own pictures.
- **Sharper lip sync needs the sound in the browser**: a voice kept only on another computer cannot be measured (the
  words still move the mouth).
- **Up to 24 poses** on one mascot, 12 from one sheet; nine drawn mouths.
- **Pictures are made by your image AI or by you**: the Studio does not draw them itself.
