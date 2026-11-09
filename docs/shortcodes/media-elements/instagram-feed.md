---
title: Instagram Feed
sidebar_position: 57
sidebar_custom_props: { icon: '/img/shortcode-icons/instagram-feed.svg' }
description: "Show an Instagram profile and its posts on your WordPress site, as a grid or a slider: live from a connected Instagram account, or from images you choose."
keywords:
  - instagram feed wordpress
  - instagram grid
  - instagram slider
  - embed instagram posts
---

# Instagram Feed

Shows an Instagram profile on your page: the profile picture, name, @handle and a **Follow** button,
with the profile's posts underneath as a **grid** or a **slider** that pages with arrows. Every post
opens on Instagram. Tabs: **Content**, **Layout**, **Animations**, **Advanced**.

:::note[Installed from the Shortcodes Library]
Instagram Feed isn't bundled with Unyson+, so sites that don't need it stay lean. Install it once per site:
**Unyson+ → Shortcodes**, find **Instagram Feed** in the **Shortcodes Library** and click **Install**. It
then appears under **Media Elements** in the page builder. (A site without internet access can upload the
`instagram.zip` file under **Add a shortcode or design pack → Upload a .zip** instead.)

Upgrading from version 1 of the Instagram element? Pages built with it keep their feed: the old username,
token, columns, gap, tile shape and corner settings carry over.
:::

<img src="/img/shortcodes/instagram-feed-demo.png" alt="Instagram Feed: a profile header with a Follow button above a slider of eight square posts, two rows of four, with a next arrow" width="1210" />

## Live demo

**▶ [See the Instagram Feed live on the demos site](https://demos.unysonplus.com/shortcodes/instagram/)** — a slider and a portrait grid you can click through.

## Two ways to fill it

**Posts From** at the top of the Content tab picks the source.

| | A connected Instagram account | Images I choose |
|---|---|---|
| What shows | The account's latest posts, kept up to date by itself | The images you pick, in your order |
| What you need | An Instagram **Business** or **Creator** account and an access token | Nothing: pick images from the Media Library |
| New posts | Appear on their own (you choose how often it checks) | You add them |
| Good for | A feed that should always be current | A personal account, or a curated selection |

:::info[Why a Business or Creator account?]
Instagram only lets Business and Creator accounts share their posts with websites. A personal account
cannot be connected by any plugin or widget. Switching is free and takes a minute in the Instagram app:
**Settings → Account type and tools → Switch to professional account**.
:::

## Connecting an Instagram account

1. Make sure the Instagram account is a **Business** or **Creator** account (see above).
2. Open the [Meta developer dashboard](https://developers.facebook.com/apps/), create an app (type
   **Business**), and add the **Instagram** product.
3. Under **API setup with Instagram login**, add your Instagram account and click **Generate token**.
   Log in to Instagram and approve.
4. Copy the token. In the Instagram Feed element, set **Posts From** to *A connected Instagram account*
   and paste it into **Access Token**.
5. Save the page. The first view of the page loads the posts (about a second, once); after that the
   feed is read from your own site.

The token is stored on your site only and never appears on the page. It normally lasts 60 days; the
element renews it automatically every week, so you don't need to paste a new one.

### What happens behind the scenes

- The profile, the post list and a resized copy of every image are **saved on your site** (in
  `wp-content/uploads/unysonplus/instagram/`). Pages load them from there, so the feed is fast and adds
  no Instagram scripts to your page.
- When the saved copy is older than **Check for New Posts**, it is refreshed in the background. Visitors
  keep seeing the saved copy meanwhile, so no one waits for Instagram.
- If Instagram is down or the token stops working, the last saved posts keep showing, and the element
  tries again in 30 minutes.

## Content

- **Posts From** — *A connected Instagram account* or *Images I choose*.
- **Access Token** — the token for the connected account (account source only).
- **Check for New Posts** — every hour, 3, 6 or 12 hours, or once a day (account source only).
- **Images** — the tiles to show (chosen images only). Each has:
  - **Image** — from the Media Library.
  - **Link** — the Instagram post it opens. Leave empty to open the profile.
  - **Post Type Icon** — none, a reel icon or a several-photos icon in the corner, like Instagram.
  - **Description** — alt text for screen readers. Empty uses the image's own alt text.
- **Profile Header** — show or hide the header.
- **Instagram Handle** — for example `@yourvilla`. The header and Follow button link to this profile. A
  connected account fills it in by itself.
- **Display Name** — the bold name. Empty uses the account's name.
- **Profile Picture** — empty uses the account's own picture.
- **Button Text** — *Follow* by default. Empty hides the button.
- **Button Preset** — *None* keeps Instagram's blue button; pick one of your
  [Button Presets](/theme/components/buttons) to match the rest of the site.

## Layout

- **Layout** — *Slider* shows pages with arrows (swipe on phones); *Grid* shows every post at once.
- **Number of Posts** — 4 to 24.
- **Rows** — slider only: rows per page (1–3). Four columns and two rows gives pages of eight, like an
  Instagram profile.
- **Columns** — desktop, tablet (up to 991px wide) and phone (up to 599px) separately.
- **Tile Shape** — *Square*, *Portrait 4:5* (Instagram's feed shape) or *Tall 9:16* (reels).
- **Gap Between Tiles** — none (the Instagram look), 2, 6, 12 or 20px.
- **Tile Corners** — square, slightly rounded, rounded or very rounded.
- **Maximum Width** and **Alignment** — keep the feed narrower than its column, placed left, centre or right.
- **Reel & Album Icons** — show or hide the corner icons.
- **Hover Effect** — *Zoom and darken*, *Darken only* or *None*. The Instagram glyph appears on hover.
- **Open Instagram in a New Tab** — on by default, so visitors keep your page open.
- **White Frame** — a white panel behind the header, like a profile page.

## Tips

- The slider's arrows only appear when there are more posts than fit on one page.
- On a busy page, put the feed in a section with a heading such as "Follow along on Instagram" so
  visitors know what they are looking at.
- Each tile's alt text comes from the post's caption (connected account) or the Description field
  (chosen images), so screen-reader users hear what each post shows.

## Limits

- Personal Instagram accounts can't be connected; use *Images I choose* instead.
- The feed shows photos and reel covers, not the videos themselves. A reel tile opens the reel on
  Instagram.
- Likes, comments and follower counts aren't shown.
- Changing the access token starts a fresh copy; the old saved copy stays in the database until removed.

## For developers

- Shortcode tag: `instagram` (Media Elements), a Shortcodes Library element (v2.0.0) installed into the
  active theme's `framework-customizations/extensions/shortcodes/shortcodes/instagram/`.
- Filter `fw_instagram_feed_api_base` changes the API address (default `https://graph.instagram.com`),
  for example to pin an API version.
- The background refresh is a one-off WP-Cron event, `fw_igf_refresh`. On a site with WP-Cron disabled,
  run real cron so it fires.
