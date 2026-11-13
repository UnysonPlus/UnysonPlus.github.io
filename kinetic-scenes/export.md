---
sidebar_position: 11.5
title: Export and WordPress
description: Getting a scene out of Kinetic Scenes — a standalone HTML page, embed code, share links, the Kinetic Scene element in WordPress, and video through the AI Dev Kit or the browser itself.
---

# Export and WordPress

**Export** in the top bar opens the export window.

<img src="/img/kinetic-scenes/export.png" alt="The export window" width="560" />

## A page or an embed

- **Download page:** one `.html` file with the scene and its own copy of the player. Open it in a browser, host it, or
  send it. **Embed fonts** packs the scene's fonts into the file so it works offline. Scenes with a 3D layer, a Lottie
  animation or a painted layer add that runtime (3D is about 790 KB).
- **Embed code:** a snippet to paste into any page. It loads the player from kinetic-scenes.unysonplus.com at a fixed
  version that never changes, so the scene keeps playing exactly as it did. Uploaded images make embeds heavy; image
  addresses keep them small.
- Both include the scene's words as text for search engines and screen readers, and keep links working.
- A scene with custom code clips turns them on in its own downloads and embeds (`data-upw-allow-code`); the window says
  so.

Every export records the player version it was made with, so later changes to a preset never alter a scene that is
already published.

## Share links

**Share link** puts the whole scene inside a link. Whoever opens it gets their own copy in the Studio, to watch or change;
their own work comes back with Undo. Nothing is uploaded and no account is needed. Scenes with uploaded images make long
links (image addresses keep them short); footage can't travel in a link.

## Scene links (open a scene from the web)

A **scene link** opens a scene that is published on the web, instead of carrying it inside the link:

```
https://kinetic-scenes.unysonplus.com/?scene=https://share.unysonplus.com/<name>/scene.json
```

It is how you hand someone a video **they can change themselves**: a café you made a reel for clicks the link, changes
the opening hours or a photo, and exports their own copy. Use it when a share link would be too long (scenes with many
pictures, or footage) or when the scene should stay on your own site.

**What the person sees.** The Studio opens straight on the scene (no start screen) with a note: *"Your copy of
"<title>". Click any words or picture to change them, then File › Export… to save your video. Nothing you change here
affects the original."* The `?scene=` part leaves the address once it is read, so reloading keeps their changes. In
Chrome they can export the video with nothing installed (see [Video](#video)); in other browsers Export asks for the
AI Dev Kit.

**How to publish one.** Put the project's `scene.json` and its `media/` folder in one folder on your site, as they are
in the workspace (media paths like `media/p02.jpg` are read next to the scene file). Then:

- **Only `unysonplus.com` addresses open** (`https://` on `unysonplus.com` or a subdomain such as `share.unysonplus.com`).
  Any other address is refused with a note, so nobody can show their own content under the Studio's name.
- **The folder must allow the Studio to read it** (CORS). On an Apache or LiteSpeed host, add to the folder's `.htaccess`:

  ```apache
  <IfModule mod_headers.c>
    <FilesMatch "\.(json|jpe?g|png|webp|gif|svg|mp3|wav|m4a|mp4|webm)$">
      Header set Access-Control-Allow-Origin "https://kinetic-scenes.unysonplus.com"
      Header merge Vary Origin
    </FilesMatch>
  </IfModule>
  ```
- **Custom code clips are removed** on opening, as with a share link: code is the one part of a scene that could act on
  the computer that opens it.
- The original is never changed: the person works on their own copy, in their own browser.

If the files are gone, the Studio says *"The shared scene could not be opened: it is no longer online."*

## The Kinetic Scene element in WordPress

The Unyson+ page builder has a **Kinetic Scene** element (in the Animation Engine extension) that plays a scene inside a
page. It carries its own copy of the player, so no request leaves the site.

- **Open in Kinetic Scenes** opens the element's scene in the Studio; **Save to page** sends it back. The two windows only
  talk to each other.
- It writes the scene's words into the page's HTML for search engines and screen readers.
- The element offers the same playback choices (on load, in view, as the page scrolls, with its own scroll length).
- Breakpoints follow the **element's** width, not the screen's: in a half-width column a scene uses whichever layout fits.
- A scene with photos, footage or music should go through **Export › For a web page** first: it sizes and trims the media
  to what the scene uses and points the scene at your site. See [Web export](./web-export).

## Video

**Export → Video** renders an MP4, WebM or ProRes file, frame by frame, so every frame is exact (3D and footage included),
however slow the machine.

- **A web scene:** pick a size (Full HD, HD, 4K, vertical 1080 × 1920 or square); the size picks the layout, as a screen
  that size would.
- **A video scene:** its formats, one or all of them in one go.
- Frame rate 24, 25, 30, 50 or 60; **see-through background** for video scenes (WebM or ProRes 4444; the kit's `render --transparent` works for any scene), **reference footage** in the full
  composite, and a **cover image**. See [Video mode](./video.md#exporting-a-video).

**With the AI Dev Kit** (the default): the kit on your computer renders it in a headless browser and encodes it with
ffmpeg, mixed to -14 LUFS. If [FFmpeg](/kinetic-scenes/ffmpeg) is missing, the Export panel says so and the kit can install it with one click.

**Without the kit:** where the browser can draw part of a page into a picture (HTML-in-Canvas, on by default in Chrome
157 and later), Export offers **Render in this browser**: the same exact,
frame-by-frame MP4 with its sound, rendered and encoded by the browser itself (H.264 and AAC), with nothing installed.
See-through and ProRes exports still need the kit. A scene is at most 10 minutes; for a longer video render chapters
and join them (see [Long videos](./long-videos.md)). When the scene has a voice-over, the video section also offers the
[second listener](./second-listener.md), notes on how it sounds before you render.

**Motion blur** (a checkbox, with the AI Dev Kit): a real camera's shutter stays open for part of each frame, so
something moving fast smears along its path. A render without it shows a crisp copy in each frame, which reads as
stepping on fast moves (whip pans, slams, a logo flying in). With motion blur on, the kit captures 8 moments spread
over half of each frame's time (a 180-degree shutter, as film cameras use) and blends them into the frame.

<img src="/img/kinetic-scenes/motion-blur.png" alt="A box moving fast: without motion blur (top) crisp, with motion blur (bottom) smeared along its direction" width="320" />

It changes nothing that stands still, and costs time: each frame is captured 8 times, so the render takes about twice
as long or more (a 1-second test took 6 s without, 15 s with). Agents: `studio-cli render scene.json --blur` (or
`--blur 2` to `16` for the number of moments, 8 by default), or `blur` on the `scene_render` tool. Not available for a browser
export.

### For another editor

**Export › For another editor** (video scenes, in a project, with the AI Dev Kit) writes the scene's cut as a project
other video editors open, into the project's `renders/edit` folder:

| File | Opens in |
|---|---|
| `project.fcpxml` | DaVinci Resolve (File › Import › Timeline), Final Cut Pro (File › Import › XML) |
| `project.xml` | Premiere Pro (File › Import) |
| `captions.srt` | the voice-over's words as subtitles: any editor, CapCut, YouTube |
| `README.txt` | these steps, and what was left out |

Each footage layer and sound clip is on its own track (the bottom layer lowest), at its place in time with its in and
out points and volume. The **graphics** (titles, shapes, 3D, captions as designed) come in as one see-through clip on
the top track: render the scene first with **See-through** as a **MOV** (ProRes 4444) into the project, then write the
editor project again. Use it to grade the footage, add effects only those editors have, or hand the edit to someone
who works in one of them.

Limits: media is referred to where it is in the project folder (move the folder and the editor asks you to find it).
Effects, transitions and keyframes made in Kinetic Scenes are not recreated as editor effects: they are part of the
graphics clip, or baked into footage only in the finished video. Subtitles need transcribed words (select the
voice-over, Words). Checked as valid files with the right clip timings; tell us if an editor reads one wrongly.
Agents: `studio-cli edit-export scene.json`, MCP `scene_interchange`.

**How the two compare** (measured 2026-10-28 on the Studio's 38-second demo scene, 1920 × 1080 at 30 fps, on a PC with
a GeForce GTX 1660 Ti):

| | AI Dev Kit | In this browser |
|---|---|---|
| Time | 46 s (the graphics card draws, NVENC encodes, 4 tabs at once) | 31 s |
| The picture | the reference | the same frames: 2D layers identical, 3D layers within a hair (0.99 similarity overall) |
| File size | 21 MB | 45 MB (a higher bitrate) |
| Needs | the kit and ffmpeg | Chrome 157 or later (HTML-in-Canvas is on by default) |

Both seek every frame exactly rather than recording the scene as it plays, so neither drops or repeats a frame. The kit
stays the default: it works in any browser, makes smaller files and does see-through and ProRes; without it, Chrome's
own export is the quick choice for a plain MP4. Pictures and footage from other sites (stock photos, a scene link's
media) are fetched first and drawn from a copy, because the browser leaves another site's picture out of a drawn page;
one whose site does not allow it comes out blank. (Before Studio 0.0.97, 3D layers came out in the wrong place in a
browser export. Before Studio 0.1.39, Chrome's shipped version of HTML-in-Canvas, which marks the canvas
`content="drawable"` rather than `layoutsubtree`, was not recognised, and pictures from other sites came out blank.)
