---
sidebar_position: 9.7
title: Videos from a spreadsheet
description: Make one video per row of a spreadsheet from a single Kinetic Scenes design — a reel for every product in a shop, every listing, every team member — with placeholders for words and pictures, a preview of each row, and one render for all of them.
keywords: [batch video, video from spreadsheet, csv to video, product videos, kinetic scenes, data-driven video]
---

# Videos from a spreadsheet

One design, many videos. Put placeholders such as `{{product}}` and `{{price}}` in a scene; give a spreadsheet with a
column for each; Kinetic Scenes makes one video per row. Typical uses: a reel for every product in a shop, every
property listing, every speaker at an event, every city a service covers.

<img src="/img/kinetic-scenes/batch-results.jpg" alt="Two videos from one design: Green Mug, $12 and Desk Lamp, $49, today only, each with its own photo" width="338" />

## 1. Put placeholders in the scene

A placeholder is a column name in double braces. It works anywhere the scene has words or addresses:

- **Text layers:** `{{product}}`, or inside a sentence: `Only {{price}}`.
- **Pictures and footage:** set the layer's address to `{{photo}}`; the column then holds a picture's address
  (`https://…/mug.jpg`) or its file name (`mug.png`, see step 3).
- **Anything else written as text:** a layer's alt text, a button's link, the scene title.

Names ignore capitals and spaces: `{{Product}}`, `{{ product }}` and a column called `product` all match.

## 2. Make the spreadsheet

Any spreadsheet app can save it: **File › Save as / Download › CSV**. The first row names the columns; each row after
it is one video:

```
Product,Price,Photo
Green Mug,$12,mug.png
Desk Lamp,"$49, today only",lamp.png
```

Values with a comma go in quotes (spreadsheet apps do this for you). A semicolon-separated file, as some regional
settings save, works too.

## 3. Open it in the Studio

**Tools › Videos from a spreadsheet…**

<img src="/img/kinetic-scenes/batch-dialog.png" alt="The Videos from a spreadsheet window: the scene's placeholders, a table of two rows with Preview buttons, and Render 2 videos" width="558" />

- **Choose a spreadsheet (CSV)** reads it and shows every row. It says which placeholders have a column; one without
  a column stays as it is, braces and all, so a missing column is easy to see in the preview.
- **Add the pictures it names** is for a column of file names (`mug.png`): pick those files and they are matched by name.
  A column of web addresses needs nothing.
- **Preview** shows that row on the stage. A bar above the stage says which row you are looking at, steps to the
  previous and next row, and **Back to the design** returns to your placeholders. The preview never changes your scene:
  keep editing the design and every row follows.
- **Render** makes one MP4 per row, in the scene's first video format, saved to your downloads as
  `01-green-mug.mp4`, `02-desk-lamp.mp4` … (named after the first column). It needs the AI Dev Kit running, renders the
  rows one after another (a few minutes each), and can be stopped; a row that fails is listed and the rest carry on.

## A voice-over for every row

A voice-over made from a script (**Audio › Voice-over from a script**) keeps its script, and the script can have
placeholders too: `{{product}} gives you the rest, for {{price}}.` For each row, the line is **spoken again in the same
voice** with that row's words, its words are timed, and its captions follow.

- **Only what changed is spoken.** The AI Dev Kit keeps every line it has spoken: a line with no placeholders is made
  once, and a row that repeats words already spoken reuses them.
- **What is pinned to a word follows it.** Pin the product's picture to the `{{product}}` word ([word pins](./word-pins)):
  a longer name in one row moves everything after it to where it is said in that row.
- **The scene grows if it must.** When a row's voice-over runs past the end, that row's video is made longer to fit it.
- Rendering a row with a voice-over takes a few seconds more while its line is spoken; it needs the AI Dev Kit.

## Limits

- Each row is the same design: the same layers and timing (a row's own voice-over re-times only what is pinned to its words). Text that is much longer in one row than another
  can wrap differently: preview the longest row before rendering.
- Placeholders fill text only; they don't add or remove layers. For a row without a picture, leave the cell empty and
  the layer shows nothing.
- The spreadsheet and pictures stay in this browser tab; load them again after a reload.

## For AI agents and scripts

The AI Dev Kit does the same from the command line, with picture files found next to the spreadsheet:

```
studio-cli batch scene.json --data products.csv --check            # the placeholders, the columns, what is missing
studio-cli batch scene.json --data products.csv --name Product     # renders every row into videos/ beside the CSV
studio-cli batch scene.json --data products.csv --rows 1-3,7 --out out/
```

The MCP tool is `scene_batch` (`render: true` only when the person asks for the videos). A voice clip whose `script` has placeholders is
spoken again for each row in its `voiceId` voice, and word pins re-time each video (`voiceRow` in `studio-batch.mjs`).
