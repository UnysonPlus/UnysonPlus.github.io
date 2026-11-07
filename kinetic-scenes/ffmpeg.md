---
sidebar_position: 12.25
title: FFmpeg
description: The free tool Kinetic Scenes uses for video export, footage, captions and audio. If it isn't on your computer, you are told when it is needed, and the AI Dev Kit can install it for you.
---

# FFmpeg

FFmpeg is a free tool that reads and writes video and audio files. The [AI Dev Kit](/ai-dev-kit) uses it on your
computer to export videos, clean up footage, turn a voice-over into words and work with sound.

You don't need to set it up in advance. If it isn't on your computer, Kinetic Scenes tells you at the moment something
needs it, and you can install it there and then.

## What needs it

| Feature | Needs FFmpeg? |
|---|---|
| Building and previewing a scene in the Studio | No |
| Exporting an MP4 in a browser that can render video itself | No. The [Export](/kinetic-scenes/export) panel says so when yours can |
| Exporting through the AI Dev Kit, including see-through video and batch videos | Yes |
| Turning a voice-over into words, and captions from them | Yes |
| Cleaning up footage, highlights, reference videos, the video checks and the second listener | Yes |
| Separating voice and music | Yes |

## Installing it from the Studio

When FFmpeg is missing, a notice appears in the place you need it: the Export panel, Words, Batch videos and
**Tools → Add-ons**.

1. Click **Install FFmpeg**. The button shows the size of the download.
2. Wait for the progress bar to finish. The kit downloads FFmpeg and checks it.
3. Carry on. You don't need to restart anything.

Prefer to do it yourself? Click **Get it yourself** for [FFmpeg's download page](https://ffmpeg.org/download.html), then
restart the kit.

## Installing it from the command line or through your AI agent

From the kit's `design-capture` folder:

```
node studio-cli.mjs ffmpeg            # says whether FFmpeg is here
node studio-cli.mjs ffmpeg install    # installs it
```

An AI agent connected to the kit gets the same message when a tool needs FFmpeg, and can install it with the
`ffmpeg_install` tool. It should ask you first.

## What the install does

| Computer | How the kit installs it | Download size |
|---|---|---|
| Windows (x64) | Downloads Gyan's essentials build from GitHub (gyan.dev if GitHub can't be reached) | About 110 MB |
| Windows (ARM) | Downloads a build from BtbN's FFmpeg-Builds | About 136 MB |
| Linux (x64) | Downloads a build from BtbN's FFmpeg-Builds | About 150 MB |
| Linux (ARM) | Downloads a build from BtbN's FFmpeg-Builds | About 127 MB |
| macOS | Runs `brew install ffmpeg` when Homebrew is installed | Set by Homebrew |

- **Checked:** a download is compared with the checksum its publisher lists. If they don't match, it is thrown away and
  nothing is installed.
- **Kept to the kit:** a download goes in the kit's own folder (`assembled/ffmpeg`, or `.unysonplus/ffmpeg` in your home
  folder). It needs no administrator rights and changes nothing else on your computer.
- **Yours to remove:** delete that folder to remove it.

## Limits

- **macOS without Homebrew:** the kit can't install FFmpeg itself. Install Homebrew and run `brew install ffmpeg`, or use
  the download page, then restart the kit.
- **The first install needs an internet connection.** After that, FFmpeg works offline.
- **Your own copy comes first.** If you set the `FFMPEG` and `FFPROBE` environment variables, the kit uses those. If
  FFmpeg is already installed, the kit uses it and doesn't offer to install another.

## Checking what you have

**Tools → Add-ons** shows FFmpeg as **Installed** with its version, and whether the kit installed it or found it on your
computer. **Check this computer** on the same screen lists it in a report you can copy into a bug report.
