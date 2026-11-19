---
title: "How to upload and schedule Facebook Reels with Claude (free, with Meta's own API)"
sidebar_label: "Schedule Facebook Reels with Claude"
description: "Let Claude upload and schedule Reels on your Facebook Page with Meta's own API: no third-party posting service. A step-by-step setup of the Meta app, its permissions and the token, the three calls that publish a reel, and the mistakes we made on the way."
keywords:
  - schedule facebook reels with ai
  - upload facebook reels api
  - facebook reels api
  - automate facebook reels
  - claude code facebook
  - meta graph api reels
  - schedule reels free
  - facebook page video api
---

# How to upload and schedule Facebook Reels with Claude

A reel that is already made still needs uploading to every place you post: YouTube, then Facebook, then the rest. This
guide sets up the Facebook part so that Claude does it from one message:

> *"Upload the reel in my upload folder to my Facebook Page, scheduled for the same time it goes live on YouTube."*

It uses **Meta's own API**, with an app that belongs to you. No posting service sits in the middle holding the keys to
your Page. It is free, and it took us about half an hour, most of it in Meta's set-up screens. We wrote this down the
day we did it for the Unyson+ Page, with every wrong turn.

This is the companion to [Upload to YouTube with Claude](./upload-youtube-videos-with-claude.md).

:::note Instagram and Threads
The same Meta app can also post to Instagram and Threads. Those two sections will be added here once we have them
working: this page only describes steps we have run ourselves.
:::

## What you get

| Claude can | Not through this route |
|---|---|
| Upload a reel straight from a file on your computer | Post to a personal profile (Pages only) |
| Publish it now, or schedule it from 10 minutes to 29 days ahead | Schedule further ahead than 29 days |
| Set the title and the caption | |
| Read back whether it is processed, scheduled or live | |

**Meta's rules for a reel:** vertical (9:16), 1080 x 1920 recommended and 540 x 960 at least, 3 to 90 seconds, 24 to
60 frames a second, MP4. A Page can publish 30 reels through the API in any 24 hours.

## What you need

- A **Facebook Page** you manage (you need the right to create content on it).
- A free **Meta developer account**: sign in at [developers.facebook.com](https://developers.facebook.com) with the
  Facebook account that manages the Page.
- **Claude Code**, or another AI tool that can run commands on your computer.

## Step 1: Create the Meta app

Go to **My Apps › Create App**, give it a name and your email, and you reach **Use cases**.

**Tick only what you will use.** For Facebook alone that is **Manage everything on your Page**. We also ticked the
Instagram and Threads use cases, because we want those next:

<img src="/img/guides/meta-reels-use-cases.png" alt="Meta's Create an app screen, Use cases step, with three ticked: Access the Threads API, Manage messaging and content on Instagram, and Manage everything on your Page" width="640" />

:::warning Do not tick everything
Our first try had eight use cases ticked, including ads and WhatsApp. Each one adds permissions the app does not
need, and some add requirements later (WhatsApp says "Business portfolio required" on the tile itself). Fewer use
cases means an app with nothing to verify: ours came out with "No requirements identified".
:::

On the **Business** step, choose **I don't want to connect a business portfolio yet**. A portfolio is for apps that
handle other businesses' data, and this one only posts to your own Page.

<img src="/img/guides/meta-reels-business.png" alt="The Business step: the option I don't want to connect a business portfolio yet" width="640" />

The **Overview** should show your use cases, no business, and no requirements. Click **Create app**.

<img src="/img/guides/meta-reels-overview.png" alt="The Overview step: the app name and email, the use cases, No business selected, and No requirements for the use cases on this app" width="640" />

## Step 2: Add the permissions

The app's dashboard lists one row per use case:

<img src="/img/guides/meta-reels-dashboard.png" alt="The app dashboard with rows to customise the Threads, Page and Instagram use cases" width="760" />

Open **Customize the Manage everything on your Page use case** and add these three permissions:

- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`

## Step 3: Get an access token

1. Open **Tools › Graph API Explorer**.
2. Set **Meta App** to your app, and **User or Page** to **Get User Access Token**.
3. Add the three permissions from step 2.
4. Click **Generate Access Token**. A Facebook window opens: choose your Page and approve.

<img src="/img/guides/meta-reels-token.png" alt="The Graph API Explorer: the Access Token box, Generate Access Token, the app chosen under Meta App, User Token, and the list of permissions" width="380" />

You also need the app's **App ID** and **App secret**, from **App settings › Basic** (click **Show** for the secret).

:::warning Keep these three out of chats and repositories
The token and the app secret control your Page. Save them in a private file on your computer and have Claude read
them from there. If you use an AI browser assistant to click through Meta's screens, let it navigate and copy the
secrets yourself: ours declined to handle them, which is the right instinct.
:::

## Step 4: Make the token last, and find your Page

The token from the Explorer is short-lived (an hour or two). Ask Claude to do two things with it:

> *"Exchange my Meta token for a long-lived one, then list my Pages with their ids."*

Behind that are two calls. The first swaps the short token for one that lasted **60 days** in our set-up:

```text
GET https://graph.facebook.com/v27.0/oauth/access_token
    ?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_TOKEN
```

The second lists every Page the token can reach, each with **its own Page token**, which is the one that publishes:

```text
GET https://graph.facebook.com/v27.0/me/accounts?fields=id,name,access_token,tasks&access_token=LONG_TOKEN
```

Check that the Page you want is in the list and that its `tasks` include `CREATE_CONTENT`.

## Step 5: Upload and schedule a reel

A reel goes up in three calls. Claude runs them; this is what they are.

**1. Start.** Ask for an upload slot:

```text
POST https://graph.facebook.com/v27.0/PAGE_ID/video_reels
     upload_phase=start, access_token=PAGE_TOKEN
```

The answer has a `video_id` and an `upload_url`.

**2. Upload the file** to that address, as the raw bytes of the MP4, with these headers:

```text
POST {upload_url}
Authorization: OAuth PAGE_TOKEN
offset: 0
file_size: <the file's size in bytes>
```

**3. Finish**, and say when it should go out:

```text
POST https://graph.facebook.com/v27.0/PAGE_ID/video_reels
     upload_phase=finish, video_id=VIDEO_ID, access_token=PAGE_TOKEN,
     title=<the title>, description=<the caption>,
     video_state=SCHEDULED, scheduled_publish_time=<Unix time, 10 minutes to 29 days ahead>
```

Use `video_state=PUBLISHED` with no time to publish at once.

Here is the whole thing as a short Python script, with nothing beyond the standard library:

```python
import json, os, urllib.request, urllib.parse

G = 'https://graph.facebook.com/v27.0/'

def call(url, data=None, headers=None):
    req = urllib.request.Request(url, data=data, headers=headers or {}, method='POST')
    return json.load(urllib.request.urlopen(req, timeout=600))

def upload_reel(page_id, page_token, video, title, caption, publish_at=None):
    start = call(G + page_id + '/video_reels',
                 urllib.parse.urlencode({'upload_phase': 'start', 'access_token': page_token}).encode())
    video_id = start['video_id']
    call(start['upload_url'], open(video, 'rb').read(),
         {'Authorization': 'OAuth ' + page_token, 'offset': '0', 'file_size': str(os.path.getsize(video))})
    finish = {'upload_phase': 'finish', 'video_id': video_id, 'access_token': page_token,
              'title': title, 'description': caption,
              'video_state': 'SCHEDULED' if publish_at else 'PUBLISHED'}
    if publish_at:
        finish['scheduled_publish_time'] = str(publish_at)   # Unix time
    call(G + page_id + '/video_reels', urllib.parse.urlencode(finish).encode())
    return video_id
```

## Step 6: Check what Facebook has

Ask Claude to read the reel back instead of trusting the upload:

```text
GET https://graph.facebook.com/v27.0/VIDEO_ID
    ?fields=status,published,scheduled_publish_time,title,length,permalink_url&access_token=PAGE_TOKEN
```

Ours came back as processed, 48 seconds long, `published: false`, with the scheduled time we asked for and its
future address. You can also see and edit the reel in **Meta Business Suite**, under scheduled content.

## The mistakes we made, so you do not have to

| What happened | Why | What to do |
|---|---|---|
| Eight use cases ticked on the first try | It looked safer to add everything | Tick only the use cases you will use; add more later with **Add use cases** |
| **"Error validating client secret"** | The app secret had been copied while still hidden: ten characters instead of thirty-two | Click **Show** first; the real secret is 32 characters |
| Two Pages with almost the same name | An old duplicate Page | Ask for each Page's `username` and pick the one with your address, by id |
| The token reached every Page we manage | We approved all of them in the Facebook window | Fine, but tell Claude the one Page id to post to, and keep it in the script |
| No Instagram account showed up | None was linked to the Page | Link a Business or Creator Instagram account to the Page, then make a new token |
| The scheduled time came back in a different format | Sent as a Unix number, returned as a date and time | Compare the moment, not the text |

## Limits, and one thing we have not confirmed

- **Pages only**, 30 reels a day, 3 to 90 seconds, vertical.
- **Scheduling reaches 29 days ahead**, and no closer than 10 minutes.
- **The long-lived token lasted 60 days for us.** When a call starts failing with an expired token, make a new one in
  the Graph API Explorer (step 3).
- **Not confirmed yet: whether a new app must be published before its posts are public.** Our app is still marked
  "Unpublished", and our first reel is scheduled, not live. We will update this page when it goes out and we have
  looked at it while signed out. Until then, check your own first reel that way.

## Where the reels come from

We make ours in [Kinetic Scenes](/kinetic-scenes), the free motion-graphics studio that is part of Unyson+: Claude
builds the reel, we preview and export it, and the same session uploads it to YouTube and Facebook with its title
and caption.
