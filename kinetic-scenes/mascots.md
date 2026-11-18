---
sidebar_position: 11.56
title: Mascots that talk
description: Make a mascot or brand character once, from one picture, your own pose pictures or six poses drawn by your image AI, and it talks on the voice-over of any scene, blinks, breathes and changes pose on the words you pick.
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

Choose where the pictures come from:

| Choice | What you need | What you get |
|---|---|---|
| **One picture** | One picture of your mascot | A mascot that talks, blinks and breathes in one pose. The quickest. |
| **A picture for each pose** | Your mascot art in a few poses (waving, pointing…), one picture each | Those poses, ready to switch between. |
| **Six poses with your image AI** | A picture of your mascot, and an image AI you already use (ChatGPT, Gemini…) | Six poses: idle, explaining, waving, thinking, thumbs up, cheering. |

Pictures on a **plain or see-through background** work best: the Studio takes the background off by itself and trims
each pose. A picture on a busy background (a photo) is used as it is.

<img src="/img/kinetic-scenes/mascot-start.jpg" alt="The mascot creator, step 1: the three choices and the prompt for an image AI" width="640" />

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

### 4. Add it

Give it a name and **Add it to the scene**. It goes in as a **Mascot** layer, about two thirds of the stage high. Move
and size it like any layer; the picture keeps its shape inside its box.

## How it talks

- **On the voice-over's words.** The mouth follows the scene's voice-over, using the timing of every word (the same words
  captions and word pins use). Any voice the Studio makes has them (the free voices, Voicebox); a recording gets them when
  you transcribe it. Without a voice-over with its words, the mascot stays quiet, and Check scene says so.
- **Shaped by the sounds.** Each word is timed letter by letter: the mouth opens wide on "a", less on "e" and "i", rounds
  on "o", and shuts on "m", "b" and "p". Re-record or reword the line and the mouth follows the new take.
- **Blinks** every few seconds, now and then twice, at its own natural rhythm (the same every time the scene plays).
- **Breathes**: a slow, small rise and fall, a touch more as it talks.

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
| **Mouth opens** | How wide the mouth opens, 0 (shut) to 1.5. |
| **Blinks** | Blinking on or off. |
| **Breathes** | The slow breathing on or off. |
| **Add a pose change** | A Pose clip at the playhead (two poses or more). |
| **Edit the mascot** | Back into the creator: rename poses, add or remove poses, fix the face. Pose clips keep working. |

It also takes every ordinary preset on its row (an entrance, a slide, an exit), like any layer.

## On a web page and in a video

A mascot plays wherever the scene does: exported as a video (MP4, or a see-through WebM or ProRes video to put on top of
anything in another editor), or live on a web page with the Unyson+ **Kinetic Scene** element, where it is sharp at any
size and far lighter than a video.

## With an AI agent

An agent connected to the [AI Dev Kit](./ai-agents.md) can use a mascot you made: copy the layer into a project, write
the lines, make the voice, and pin a Pose clip to the words it belongs to. The format is in the scene file reference
(`type: "mascot"`, with its `poses` and their `mouth` and `eyes` boxes, and `mascot-pose` clips).

## Limits

- **The mouth is the pose's own mouth, opened.** Its lower lip moves down while a dark opening grows behind it. It works
  best when the mouth is **closed** in the pose picture. Drawn mouth shapes for each sound are planned.
- **The face boxes are a guess to check.** Eyes that are not a clear pair of spots (sunglasses, eyes drawn as lines) are
  not found: draw their boxes yourself, or turn off Blinks.
- **The eyelid is the skin just above the eye**, slid down over it, so it matches the skin when that skin is one colour.
  A busy pattern above the eyes shows as the lid.
- **Six poses from an image AI depend on the AI.** Some change the character between poses; ask again, or use your own
  pose pictures.
- **Up to 24 poses** on one mascot, and up to 12 from one sheet.

Planned next (see the [roadmap](./roadmap.mdx), Phase 28): drawn mouths for each sound, sharper lip sync through the AI
Dev Kit, your mascots in the Library to reuse across projects, agent tools to direct a mascot, and a mascot-presenter
template.
