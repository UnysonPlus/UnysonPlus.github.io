---
sidebar_position: 7.6
title: "Attachment pages"
sidebar_label: "Attachment pages"
description: "Unyson+ SEO decides what happens to the page WordPress makes for every uploaded file: send visitors to the post the file belongs to, to the file itself, or keep the page."
---

# Attachment pages

WordPress makes a page for every file you upload, with a title, the image and little else. A site
with 2,000 images has 2,000 of these pages. They are thin and nearly identical, and search engines
index them anyway, so they can turn up in results ahead of the post the image was actually used in.

<img src="/img/seo/seo-attachment-pages.png" alt="The Attachment pages box on the SEO General settings, set to send visitors to the post the file belongs to" width="1644" />

**SEO → General → Attachment pages** decides what happens to them.

## The choices

| Setting | What a visitor or search engine gets |
| --- | --- |
| **Leave it to WordPress** (the default) | Whatever the site does today. The box tells you which. |
| **Send visitors to the post the file belongs to** (recommended) | A permanent (301) redirect to the post or page the file was uploaded to. A file that is not attached to anything, or whose post is not published, goes to the file itself. |
| **Send visitors to the file itself** | A 301 redirect straight to the image, PDF or other file. |
| **Keep attachment pages** | The pages stay, for themes that design them as galleries. |

## Why "leave it to WordPress" can mean either

WordPress 6.4 started redirecting attachment pages to the file, but **only on sites installed after
6.4**. Every older site that upgraded kept the pages, and WordPress offers no setting to change it.
So two sites on the same WordPress version can behave in opposite ways. The box's description reads
the site's actual setting and says which way this one behaves, so the default is never a guess.

The extension never changes that WordPress setting in the database. It only overrides it while the
SEO setting is on something other than the default, so going back to **Leave it to WordPress**
restores exactly what the site did before.

## Why the parent is the recommended choice

Someone who arrives at an image's page usually wanted the article it belongs to, not the bare file.
Sending them to the post keeps them on a real page and moves any links pointing at the attachment
page to content worth ranking.

## Limits

- It only affects attachment **pages** (the `?attachment_id=` or `/post/image-name/` addresses). The
  file URLs themselves (`/wp-content/uploads/…`) are untouched.
- "The post the file belongs to" means the post it was **uploaded to**, which WordPress records. An
  image uploaded in the Media Library and placed in a post later has no parent, so it goes to the file.
- If another plugin also redirects attachment pages, choose **Leave it to WordPress** here so the two
  do not compete.
