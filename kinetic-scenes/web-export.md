---
sidebar_position: 11.6
title: Web export (light media for pages)
description: Make a Kinetic Scenes project light enough to play live on a web page — every picture and video sized to what is drawn, videos and sounds trimmed to what the timeline plays — and put it in the Unyson+ Kinetic Scene element.
---

# Web export: a scene light enough for a page

A scene can go on a site two ways: as a **rendered video** (an MP4 in a video player) or **live**, played by the Kinetic
Scenes player in the page (the Unyson+ **Kinetic Scene** element, or the embed code). Live keeps the text sharp at every
size, real and searchable, and lets the scene follow the page's layout. But a project's media is made for editing and
for video export: a 4K background photo, a three-minute music track when the scene uses 45 seconds, phone videos at full
length. Played live as it is, the page downloads all of it.

**Web export** makes a copy of the project with its media cut to what the scene really uses. On a 47-second promo with
5 phone videos, 13 photos, music and 10 voice lines, the media went from **22.9 MB to 3.8 MB** (the rendered MP4 of the
same scene is 5.9 MB).

## What it does to each file

| Media | What happens |
|---|---|
| **Pictures** | Each one is measured in a browser at every moment of the scene, at the scene's full HD size (16:9 → 1920×1080, 9:16 → 1080×1920), with camera moves, zoom presets and frames counted, and scaled to the **largest size it is ever drawn**. Small pictures get twice that, so they stay sharp on HiDPI screens; full-screen ones need no more than full HD. They are saved as **WebP** by Chrome itself, so colour profiles (an Adobe RGB photo), EXIF rotation and transparency come out exactly as a browser shows them. |
| **Videos (footage)** | Trimmed to the **seconds the timeline plays** (from the layer's start point in the file to the end of its time on screen, all layers using the file together), scaled to the largest drawn size (×2 when small), the **sound track removed** (the player always plays footage muted), H.264 with fast start so it begins playing before it has fully downloaded. The layers' start points are moved to match. |
| **Sounds** | Trimmed to the range their clips play (a looped clip keeps the whole file). **Voice** clips become mono at 64 kbps, which is speech quality; music stays stereo at 128 kbps. Fades and volumes stay in the scene, so they sound the same. |
| **Shared files** | A file several layers use is made once, big enough and long enough for all of them. |
| **Everything else** | A 3D model, a Lottie file or a GIF is copied as it is. Pictures that would come out bigger (an already small JPEG) are kept as they were. Media at a web address (`https://…`) or built-in sounds are left alone. |

Nothing in the project changes: the copy goes into the project's **`web`** folder:

```
<project>/web/
  scene.json    the scene, pointing at the light files
  media/        the light files
  report.json   every file, before and after, and what was done to it
  README.txt    how to put it on a site
```

## In the Studio

1. Open the project (File › Projects). The web export works on a workspace project and needs the AI Dev Kit running.
2. **Export › For a web page**.
3. Optional: **Where the folder will be on your site**, for example
   `https://example.com/wp-content/uploads/unysonplus/scenes/promo/`. With it, the scene's media addresses become
   complete (`https://example.com/…/media/wall.webp`), which is what the Kinetic Scene element needs. Without it they stay
   relative (`media/wall.webp`), for a page that sits next to the folder. The Studio remembers the last address.
4. **Make the web version**. It takes about half a minute for a one-minute scene: the measuring, then each file.
5. The table shows each file before and after and what changed. **Show the folder** opens `web`; **Copy the scene for the
   element** copies its scene.json.

## With the AI Dev Kit (an agent, or the command line)

```bash
node studio-cli.mjs web-export "<project name or scene.json>" \
  --base https://example.com/wp-content/uploads/unysonplus/scenes/promo/
```

| Option | What it does |
|---|---|
| `--base <address>` | Where the output folder will be on the site; makes the scene's media addresses absolute. |
| `--out <folder>` | Where to write the copy (default `<project>/web`). |
| `--dpr <n>` | How much sharper than drawn small pictures and videos are (default 2). |
| `--no-measure` | Size from the layer boxes instead of measuring in a browser (quicker, less exact; it adds room for a 25% zoom). |
| `--json` | The report as JSON. |

The MCP tool is **`scene_web_export`** (`project` or `file`, `base`, `out`, `dpr`), so an AI agent can run it: *"Make the
web version of the promo for https://example.com/wp-content/uploads/unysonplus/scenes/promo/."*

It prints the same table:

```
Media 22.9 MB → 3.8 MB (83% smaller, 29 files)
  media/wall.jpg                 9.0 MB →   141 KB  3785×2523 → 2073 wide, WebP
  media/cafe.mp4                 1.9 MB →   160 KB  720×1280, 29.0 s → 568 wide, 1.0-4.9 s, sound removed
  media/music.mp3                3.3 MB →   734 KB  170.0 s → 0.0-46.9 s, 128 kbps
  media/vo-1.mp3                  47 KB →    31 KB  3.9 s → 0.0-3.9 s, mono 64 kbps (speech)
  …
```

## Putting it on a WordPress page

1. Choose where the files will live. Unyson+ keeps everything it writes under `wp-content/uploads/unysonplus/`, so
   `wp-content/uploads/unysonplus/scenes/<name>/` fits.
2. Run the web export with that folder's address as the base.
3. Upload the **`media`** folder there (by FTP, your host's file manager, or a file-manager plugin), so a file sits at
   `…/scenes/<name>/media/wall.webp`. Open one of its addresses in a browser to check.
4. Add a **Kinetic Scene** element to the page and paste the web **scene.json** into its Scene box (or use **Copy the
   scene for the element** in the Studio).

The media is on your own site, so the scene works without any outside service. If you move the site, run the export again
with the new address.

## Good to know

- **Measuring needs the player from kinetic-scenes.unysonplus.com** (as previews and renders do). Offline, the export
  falls back to the layer boxes and says so in the report.
- **The copy is made from the project as it is now.** After changing the scene, export again (it replaces `web`).
- **A web scene's pictures and videos load when it comes near the screen** (about one screen away), not with the page,
  so a scene further down costs nothing for visitors who never reach it. A scene near the top still loads as the page
  opens. See [Loading only what is seen](/animation-engine/studio-scene#loading-only-what-is-seen).
  Within the scene, everything loads at once: loading each part only as the playhead nears it is on the
  [roadmap](./roadmap).
- **Footage plays muted live.** A video layer's own sound is only mixed into rendered videos, so the web copy drops it;
  put sound you need on the timeline as an audio clip.
- **Video export uses the project, not the web copy**: renders stay at full quality.
