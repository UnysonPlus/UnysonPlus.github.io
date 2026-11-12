---
sidebar_position: 9.5
title: Screencasts and product demos
description: Record a real product demo in Kinetic Scenes with the AI Dev Kit — a browser that follows a list of steps (with WordPress, page builder and Live Editor actions), a recording that zooms to each action with step captions and subtitles, the voice-over written from the recording and a written step-by-step guide from the same take, sharp screenshots with highlights, the Studio's New from a screencast, and a styled demo site that resets with one command.
keywords: [kinetic scenes, screencast, product demo, tutorial video, screen recording, auto zoom, ai narration, ai voice-over, step-by-step guide, wordpress demo, reels]
---

# Screencasts and product demos

Real footage of a product working reads as genuine in a way generated graphics alone do not. With the
[AI Dev Kit](/ai-dev-kit), a short list of steps becomes a sharp, zoomed, captioned video: a real browser carries out the
steps, the recording is framed around each action, and the result is an ordinary Kinetic Scenes scene you can change and
export.

<img src="/img/kinetic-scenes/screencast-frame.jpg" alt="A vertical screencast: zoomed in on a heading in the Live Editor, step caption 1 · Click any element, and a subtitle" width="270" />
<img src="/img/kinetic-scenes/screencast-frame-2.jpg" alt="A vertical screencast of the Theme Builder: step caption 1 · Add a template, and a subtitle" width="270" />

Your AI agent does all of this for you when you ask for a demo video (see [AI agents and projects](./ai-agents.md)); the
commands below are what it runs, from the kit's `tools/design-capture` folder.

## 1. Record the steps

```
node studio-cli.mjs record steps.json --out recording
```

`steps.json` names the site, the login, where to start and what to do:

```json
{ "site": "http://localhost/mysite", "login": { "user": "admin", "pass": "…" },
  "start": "/wp-admin/admin.php?page=fw-theme-builder", "viewport": [1600, 900], "scale": 2,
  "steps": [
    { "do": "click", "target": { "text": "Add Template" }, "label": "Add a template" },
    { "do": "type", "target": "#fw-option-name", "text": "Whole site", "label": "Name it" },
    { "do": "select", "target": "#fw-option-tb_header_id", "option": "Centered Header", "label": "Pick a header" },
    { "do": "click", "target": { "role": "button", "name": "Save Template" }, "label": "Save" }
  ] }
```

The browser moves a visible cursor in natural curves, clicks with a ripple, types letter by letter and drags for real.
It records at twice the screen's resolution, and it **cuts out the waiting** while pages load, so the video only shows
things happening. The result is `video.mp4` plus `actions.json` (when and where each step happened).

**Steps:**

| Step | Does |
|---|---|
| `click`, `dblclick`, `hover` | on a `target` |
| `type` | `text`, into a `target` if given (`clear` empties it first) |
| `select` | picks an `option` (or `value`) in a dropdown |
| `press`, `scroll`, `drag`, `wait`, `goto`, `mark` | a `key`; a scroll `by` pixels (default 300); a drag `from` → `to`; a pause of `ms` (default 600); another page at `path` (its loading cut); a labelled moment |
| `upload` | chooses a file: the cursor goes to the file field (or the button given as `click`) and the `file` is set, since a system file dialog does not show in a recording |
| `waitFor` | waits for something slow (an AI building a page, an import) until a `target` reaches `state` (`visible`, the default, `hidden`, `attached` or `detached`): the first `keep` seconds (default 2) stay in the video so the viewer sees it working, the rest is cut, like a fast-forward. `timeout` in ms (default 10 minutes) |
| `wp.title`, `wp.saveDraft`, `wp.preview`, `wp.publish`, `wp.view` | WordPress: name a page, save, preview, publish (waits for the confirmation), open the published page |
| `pb.tab`, `pb.addSection`, `pb.add`, `pb.edit`, `pb.set`, `pb.save` | the Unyson+ page builder: open a tab of elements (`name`), add a section, drag in an element by its name (optionally from a `tab`), open its settings (one click), fill a field, save |
| `le.select`, `le.edit`, `le.device`, `le.save` | the Unyson+ Live Editor: click an element on the page, open its settings, switch to Desktop / Tablet / Mobile, save |

A **target** is a CSS selector, `{ "text": "…" }`, `{ "role": "button", "name": "…" }`, `{ "label": "…" }`, or, inside
the Live Editor's page, the same with `"frame": true`. Each step's `label` becomes its caption in the video, and an
optional `about` (a sentence on what the step does and why) is kept in `actions.json` for the voice-over below. A
step's `pause` (in ms, default 350) is the wait after it; the top-level `tail` (default 1500 ms) is held at the end.

**The video always matches `actions.json`:** while the screen is still the browser sends no new pictures, and each one
is held until the next, so every action happens in the video exactly when `actions.json` says.

## 2. Frame it

```
node studio-cli.mjs screencast recording --format 9x16 --title "A free Theme Builder" --voice recording/voice.json
```

This writes a scene beside the recording. Its camera **zooms to each action** where it happens (close enough to read on
a phone in 9:16), holds through it, and pulls back between steps; page changes show the whole screen. Each step label
becomes a numbered caption, and each voice line a subtitle placed clear of the action.

Options: `--format 9x16 | 16x9`, `--title` and `--intro` (an opening card and its length; `--intro` needs `--title`),
`--end` and `--cta` (an end card), `--music`, `--voice` (lines with their times: a voice clip and a subtitle each), and
the look: `--accent` (caption colour), `--glow` (the colour of the background glow), `--bg` (a picture behind the
recording), `--title-bg` and `--end-bg`. Put the scene into a
[project](./ai-agents.md#projects) to preview it in the Studio; render only when it is right.

In the Studio, **File › New from a screencast…** does the same from a recording's `video.mp4` and `actions.json`; the
camera's keys are on the Camera row, to change by hand.

## The voice-over and a written guide, from the same take

Three commands turn one recording into a narrated video **and** a written step-by-step guide, with nothing else to
record.

```
node studio-cli.mjs narrate recording --audience "WordPress site owners"
node studio-cli.mjs voice recording --voice kokoro:am_michael
node studio-cli.mjs guide recording --title "Build a page with Claude"
```

**`narrate` writes the voice-over.** The AI looks at a picture of each step and reads its label and `about` note, then
writes one line per step, timed to it. Each line has a **word budget**, the words that fit before the next step at a
calm pace (about 2.5 words a second); a line over its budget is shortened in a second pass, and any still over is
marked so you can shorten it or give that step a longer `pause`. The result is `narration.json`, a plain list to read
and change before anything is spoken:

```json
{ "lang": "en", "lines": [
  { "step": 1, "at": 0.6, "text": "We name our new page: Sweet Crumb Bakery.", "say": "We name our new page: Sweet Crumb Bakery." },
  { "step": 5, "at": 25.0, "text": "Claude builds every section itself, then checks the page.", "say": "Claude builds every section itself, then checks the page." }
] }
```

`at` is the second in the recording (`"intro"` for a line before it, `"end"` for one on the end card); `say` is what
the voice reads, where a brand name is respelt so the voice says it right, while the subtitle keeps `text`.

- `--lang es` writes the lines in another language (`narration.es.json`). The built-in voices speak English; for
  another language, use a [Voicebox](./sound.md) voice that speaks it.
- `--audience`, `--context` (what the video is about) and `--intro` / `--outro` (a line before the first step, a line
  for the end card) steer the writing.
- Without an AI connected, the lines are the step labels (or their `about` notes), ready to rewrite.

**`voice` speaks each line on its own** with the kit's voices and checks it against its text: changed words, pauses in
the middle of a phrase, a question that does not rise. It writes `voice.json` for `screencast --voice`, and lists any line
that would still be talking when the next step starts. Shorten that line; the voice is never sped up to fit.

**`guide` writes the guide:** `guide/guide.md` and a self-contained `guide/guide.html`, one numbered step per action
with a picture of that moment and its target ringed. When `narration.json` exists, its lines are the steps' text. Use
it for a help page, a docs page or a blog post that matches the video exactly.

<img src="/img/kinetic-scenes/screencast-guide.png" alt="A step-by-step guide made from a recording: the title Build a WordPress page with Claude, step 1 Name the page with its narration line, and a screenshot of the WordPress editor with the page title field ringed in green" width="900" />

An AI agent connected to the kit does the same with the `screencast_narrate`, `screencast_voice` and
`screencast_guide` tools.

## 3. Screenshots

```
node studio-cli.mjs shot shots.json --out shots
```

Sharp 2x pictures of a page or one element, with optional annotations drawn on the page itself: `highlight` (a ring),
`callout` (a label beside a target), `arrow` (pointing at a target from a side, stopping just outside it) and `blur`
(hide personal details). The crop widens to take in the annotations. `steps` set the page up first (click, type, hover).
A shot with `rows` (a selector matching each row of a settings panel) also writes `<name>.rows.json`, a picture of each
row and the panel with its rows hidden, for an [animated screenshot](./tours.md).

## 4. A demo site worth ending on

A demo looks best when it ends on a real, styled site rather than a bare theme with "assign a menu" notices. The
simplest way is a **copy of a site you already designed**, kept only for demos:

1. Copy the site's files and database to a new local install (a new database, the addresses rewritten, including the
   page builder's escaped `http:\/\/` form; delete the generated CSS caches afterwards so they rebuild).
2. Take a **snapshot** of its database and uploads.
3. **Reset** to the snapshot before (or after) each recording: demos publish and edit pages, and the next demo should
   start from the same clean site.

Keep the plugin and theme files out of the snapshot, so a reset never rolls back code.

## Tips

- Keep a video to one task; give steps short, verb-first labels ("Pick a header").
- In 9:16, act on things near each other, so the camera does not travel far.
- Say "live" only after `wp.publish`: a preview of a draft is not live.
- Before handing a video over, check the narration with the [video tools](./video-checks.md): the voice check for every
  line, the timeline for the whole stretch, and the video check after the render.
