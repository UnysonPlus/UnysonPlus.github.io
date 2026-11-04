---
sidebar_position: 6
title: "Session Recording with Consent"
sidebar_label: "Session recording"
description: "Replay individual visits, only with the visitor's consent, with form fields masked in the browser and recordings kept on your own server."
---

# Session recording

Recordings let you replay a visit: how the page moved, what was clicked and scrolled. It is off until you
switch it on, and then **only ever runs with the visitor's opt-in consent**. No law exempts recording
individual visits, so Visitor Insights does not try.

## Set it up

1. Go to **Settings → Session recording** and switch on **Record visits**.
2. Under **Consent comes from**, choose how the visitor agrees:
   - **A consent plugin**: one that supports the WordPress Consent API, where the visitor accepts
     *statistics*.
   - **My own banner**: call `UnysonPlusVI.grantRecording()` from your banner when the visitor accepts.
3. Put `[visitor_insights_recording]` on your privacy page, so visitors can delete their own recording.

Without one of these, nothing is recorded. **Settings → Status** warns you if recording is on but no
consent plugin is active.

## Watch a recording

Open **Recordings** for the list. Visits that ran into a problem (a rage click, a dead click or a script
error) are marked. Watching one needs administrator rights, and every playback is logged.

## What is hidden

- Everything typed into a form is replaced with `*` **in the visitor's browser**, before it is sent.
- **Hide all text** replaces every text on the page with blocks. Use it on sites that show personal
  information.
- Add the class `up-vi-mask` to hide a single element, or `up-vi-block` to leave it out entirely.
- Cart, checkout, account and login pages are never recorded. Add your own under **Never record**.

## Options

| Option | Choices | Default |
| --- | --- | --- |
| **Record** | 1 in 10, 1 in 5, 1 in 2, or every consenting visit | 1 in 5 |
| **Keep only visits with problems** | Recordings without a problem are deleted an hour after the visit ends | Off |
| **Hide all text** | On or off | Off |
| **Keep recordings for** | 7, 14, 30, 60 or 90 days | 30 days |
| **Never record** | Paths, one per line, `*` as a wildcard | Empty |

## When a visitor changes their mind

Withdrawing consent stops the recording and deletes it. `[visitor_insights_recording]` lets a visitor
delete theirs at any time.

## Limits

- Recordings stay on your server and use its disk. Lower the share, or keep only visits with problems,
  on a busy site.
- Recordings are never included in an [export](./import-export.md#what-the-export-file-leaves-out). The
  visitors agreed to this site, not to whoever holds a file.
