---
title: "How to upload and schedule YouTube videos with Claude (free, step by step)"
sidebar_label: "Upload to YouTube with Claude"
description: "Let Claude upload, schedule and publish your YouTube videos: title, description, tags, thumbnail and publish date, from one message. A free, step-by-step setup with an open-source MCP server and the YouTube Data API, plus the limits we ran into."
keywords:
  - upload youtube videos with claude
  - automate youtube upload
  - youtube upload mcp
  - schedule youtube videos with ai
  - claude code youtube
  - youtube data api upload
  - youtube shorts automation
  - ai youtube upload
---

# How to upload and schedule YouTube videos with Claude

Uploading a video to YouTube is ten minutes of copying and pasting: the title, the description, the tags, the
category, the thumbnail, the date. With a small free tool, Claude does all of it from one message:

> *"Upload the two Shorts in my upload folder, private, scheduled one day apart after the last video already
> scheduled on my channel."*

This guide is the setup we use for the Unyson+ channel, written down the day we did it, with every snag we hit. It
takes about twenty minutes, costs nothing, and works with **Claude Code** (other AI tools that support MCP servers,
such as Claude Desktop, Cursor and VS Code, connect the same way).

## What you get

| Claude can | Claude cannot |
|---|---|
| Upload a video file from your computer | Pin a comment |
| Set the title, description, tags, category and language | Delete a video |
| Upload as private, unlisted or public | Edit a title or description after the upload (in the version we used) |
| Schedule a publish date and time | Add end screens or cards |
| Set the thumbnail (a file under 2 MB) | |
| Add the video to a playlist | |
| Add subtitles | |
| List your channel's videos, including private ones | |

A vertical video up to three minutes long becomes a **Short** by itself. There is nothing to set.

## What you need

- A YouTube channel and the Google account that owns it.
- **Claude Code** (or another AI tool that can run a local MCP server).
- [youtube-uploader-mcp](https://github.com/anwerj/youtube-uploader-mcp): a free, open-source (MIT) MCP server. It
  gives the AI eight tools, among them `upload_video`, `update_video` and `list_videos`.
- A free Google Cloud project. No billing account is needed for this.

## Step 1: Get the tool

Download the program for your system from the tool's
[Releases page](https://github.com/anwerj/youtube-uploader-mcp/releases) and put it in a folder of its own, for
example `C:\tools\youtube-uploader\`.

We built ours from the source instead, because the tool gets full control of a YouTube channel and its source is
short enough to read first (about 2,500 lines of Go). It talks only to Google and starts no other programs. To do
the same, install [Go](https://go.dev/dl/) and run this in the source folder:

```bash
go build -o youtube-uploader-mcp.exe .
```

## Step 2: Create the Google sign-in file

The tool signs in to YouTube as **your own** small app, so Google needs to know that app.

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create a project (or pick one you have).
2. Open **APIs & Services › Library**, search for **YouTube Data API v3** and click **Enable**.
3. Open **APIs & Services › Credentials** and click **Create Credentials › OAuth client ID**. If Google asks you to
   set up the consent screen first, choose **External**, type an app name and your email, and save.
4. For **Application type** choose **Desktop app**. Give it any name and click **Create**.

   <img src="/img/guides/youtube-claude-desktop-app.png" alt="Google Cloud, Create OAuth client ID: Application type set to Desktop app, with a name, and the Create button" width="620" />
5. Click **Download JSON** and save the file next to the program as `client_secret.json`.
6. Open **Audience** in the left menu and, under **Test users**, add the Google account that owns your channel.

<img src="/img/guides/youtube-claude-test-users.png" alt="Google Cloud, Audience: the Add users panel with two email addresses entered as test users, and the Save button" width="760" />

:::warning Do not skip the test user
Without step 6 the sign-in stops at **"Access blocked: … has not completed the Google verification process"**
(error 403, `access_denied`). Add the account under **Test users** and open the sign-in link again.

<img src="/img/guides/youtube-claude-access-blocked.png" alt="Google sign-in showing Access blocked: the app has not completed the Google verification process, error 403 access_denied" width="700" />
:::

Keep `client_secret.json` private. Together with the sign-in the tool saves later, it controls your channel. Keep
both outside any folder you publish or push to a repository.

## Step 3: Connect it to Claude Code

One command registers the tool. Use your own paths, and give it a working folder where it keeps the sign-in:

```bash
claude mcp add --scope user youtube-uploader -- "C:\tools\youtube-uploader\youtube-uploader-mcp.exe" -client_secret_file "C:\tools\youtube-uploader\client_secret.json" -working_dir "C:\tools\youtube-uploader\data"
```

Start a new Claude Code session: tools are loaded when a session starts. `claude mcp get youtube-uploader` should
say **Connected**. If it says *Failed to connect*, the path to `client_secret.json` is wrong or the file is not
there yet.

## Step 4: Sign in to your channel

Ask Claude: *"Connect my YouTube channel."* It gives you a Google link. Then:

1. Open the link and choose the account that owns the channel.
2. Google warns **"Google hasn't verified this app"**. That is expected for your own app: click **Continue**.

   <img src="/img/guides/youtube-claude-unverified.png" alt="Google's warning: Google hasn't verified this app, with Continue and Back to safety" width="640" />
3. Tick every permission and click **Continue**.

   <img src="/img/guides/youtube-claude-permissions.png" alt="Google's permission screen with Select all ticked: see, edit and delete your YouTube videos; manage your YouTube videos; view your YouTube account" width="600" />
4. The browser lands on a page that **cannot be reached**, at an address starting with `http://localhost`. That is
   expected too. Copy the whole address from the address bar and paste it to Claude.

The address carries a one-time code that Claude exchanges for the sign-in. It lasts a few minutes, so paste it
straight away.

:::tip Do you run a web server on your computer?
If something already answers at `http://localhost` (a local WordPress, XAMPP, a dev server), the last page may
load that site and lose the code. Ask Claude to use another port for the sign-in, for example
`http://localhost:8765`. A Desktop app client accepts any port on localhost.
:::

## Step 5: Test with a private upload

Before trusting it with a real video, ask for a test:

> *"Upload a five-second test clip as private, then switch it to unlisted and tell me whether YouTube accepted
> that."*

This answers a question that matters: YouTube's API rules say videos uploaded through a project that has not been
audited can be kept private. On our project the test clip went to unlisted, and a real video uploaded as public
was public at once. Yours may differ, so test first. Delete the test clip in YouTube Studio afterwards (the tool
cannot delete).

## Step 6: Upload for real

Give each video a text file with its details beside it. Ours looks like this:

```text
TITLE
Short videos for your business, made from your photos and clips #reels #smallbusiness #marketing

DESCRIPTION
The first two lines carry the phrase people search for.
…

TAGS
short videos for business, reels for business, instagram reels for business, …

CATEGORY
People & Blogs
```

Then say what you want in plain words:

- *"Upload the video in my upload folder and publish it now. Its details are in the text file beside it."*
- *"Upload these two Shorts as private, scheduled one day apart at 6:15 in the morning, after the last video
  already scheduled on my channel."*
- *"List my private videos with their publish dates."*

Claude reads the text file, uploads the video, sets the thumbnail, and reads the result back from YouTube to
confirm it.

:::tip Upload as private first
Ask for **private** or **scheduled** uploads and publish after a look. A public upload goes to your subscribers at
once, and a mistake in a title is easier to fix before anyone sees it.
:::

## The snags we hit, so you do not have to

| What happened | Why | What to do |
|---|---|---|
| **"Access blocked"**, error 403 at sign-in | The Google account was not a test user of the app | Add it under **Audience › Test users** |
| **"Invalid video keywords"** on upload | The tool splits tags on commas and keeps the space after each comma, and the API counts every tag that contains a space as two characters longer. A list that fits YouTube Studio's 500-character box can be too long here | Send tags with no space after the commas, and keep the API's own count under 500 (each tag, plus 2 for a tag with a space, plus the commas) |
| **Chapters did not appear** | YouTube shows chapters only when there are at least three, the first is `0:00`, and each lasts at least 10 seconds | Join short chapters before putting them in the description |
| **Thumbnail refused** | The file was over 2 MB | Save it as a JPEG under 2 MB |
| **The schedule was ignored** | A publish date only works on a **private** video | Upload as private with the publish time, in UTC (`2026-12-01T22:15:00Z`) |
| **The sign-in stopped working after a week** | While an app is in **Testing**, Google ends its sign-in after seven days | Sign in again (step 4); it takes a minute |
| **The existing schedule was unknown** | The tool's video list does not show publish dates | Ask Claude to read the publish dates of your private videos first; it can ask YouTube directly with the same sign-in |

## Limits

- **About six uploads a day.** The free YouTube Data API allowance is 10,000 units a day and an upload costs
  about 1,600.
- **No pinned comment, no delete, no end screens.** Do those in YouTube Studio.
- **Your app stays "unverified".** That is fine for your own channel. Getting it verified by Google is only needed
  when other people sign in to it.
- **The tool has full control of the channel**, because adding subtitles needs YouTube's broadest permission. Use
  it on your own computer, with your own Google project.

## Where the videos come from

We make ours in [Kinetic Scenes](/kinetic-scenes), the free motion-graphics studio that is part of Unyson+: Claude
builds the video from a prompt, we preview and export it, and the same session uploads it with its title,
description, tags and thumbnail. See [Make videos with AI](/kinetic-scenes/ai) for that half.
