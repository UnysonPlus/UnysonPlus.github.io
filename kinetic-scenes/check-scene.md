---
sidebar_position: 13
title: Check scene
description: What Kinetic Scenes' Check scene measures — readability, layout, timing and motion craft, plus the rules for video — and how its one-click fixes work.
---

# Check scene

The **Check** tab measures the scene while you work, against timing and layout rules from professional motion design. The
badge on the tab counts the warnings. Click an item to select the layer or clip it is about; most items have a one-click
**fix**, and **Apply all** runs every sure fix at once. **Fix with AI** sends the list to AI assist.

<img src="/img/kinetic-scenes/check.png" alt="The Check tab" width="340" />

The AI follows the same rules when it builds a scene, so a scene it makes starts close to clean.

## Reading

- **Long enough to read:** text must stay fully visible for its reading time (about 0.3 s a word, 0.8 s at least). Fix:
  hold it longer. Words the voice is saying at that moment are read by ear, so they only need to stay up while said.
- **Big enough:** text must be at least 12 px at the narrowest width each layout covers (for a video, the width it is seen
  at on a phone). Fix: the size that reaches 12 px on that layout.
- **Typing a headline** letter by letter reads slowly; typing suits small text. Fix: Rise instead.

## Layout

- **Inside the safe area** on every layout, so trimming the stage never cuts it off.
- **Text on text:** two text layers overlapping while both are on screen.

### Check the layout

The rules above work from the scene file. **Check the layout**, at the top of the Check tab, measures the stage itself.
It plays to the moment each part of the scene has fully landed (everything in, nothing leaving yet, nothing still
arriving), measures what is drawn there, then puts the playhead back. It finds:

- **Words on words**, measured on the letters you can actually see (not on the layers' boxes).
- **Words crossing a panel's edge**, or touching it with no room inside. A panel is a shape with a visible edge: an
  outline or a solid fill. Soft glows and faint washes don't count.
- **A tick far from its words.**
- **A list with uneven gaps** between its lines, and **a list off-centre** under a centred heading above it (lists inside
  a panel, like a menu, are left alone).
- **Words off the stage.**

Each item says when it was measured. **Show at** jumps the playhead there and selects the layer. It checks the screen
size the stage is showing, so switch layouts and run it again for each one. **Fix with AI** sends these items too.

The AI Dev Kit runs the same measurements: `stills` renders one frame of each part at that moment and lists what it
measured, and AI assist's **Look and fix** fixes every item before looking at the frames itself.

## Timing and motion

- **Clips fighting:** two moving clips on one layer at once. Fix: start the second when the first ends.
- **Nothing moves** for more than 1.5 s. Fix: a slow float on the biggest text that is on screen.
- **Slow entrances:** text and reveals over about a second read as slow. Fix: make them 0.8 s.
- **Too many transitions:** more than three kinds feels like a template sampler.
- **Same act twice:** two acts in a row that arrive the same way with the same layout.
- **Identical entrances:** three or more layers entering with the same preset and timing; vary them for a lead and a
  rhythm.

## Video

In [video mode](./video.md#checks-for-video): the hook by two seconds, words under the app's covered areas, captions for
a voice-over (fix: add captions), the platform's length, playing once (fix: play once), idle floating, an empty frame at a
cut (fix: start the next act as the last leaves), the movement carried across each cut (fix: arrive from the matching side)
and one main direction for the whole video.

## Lists

Issues on a list's copies belong to the list: they are reported once, on the list, and fixed in its item.
