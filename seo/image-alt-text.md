---
sidebar_position: 7.95
title: "Image alt text: write it, with a fallback"
sidebar_label: "Image alt text"
description: "Find the images with no alt text in the Media Library, and an optional fallback for images still without: the image title, its caption or the page title."
---

# Image alt text

<img src="/img/seo/seo-images.png" alt="The Images box: how many images lack alt text with a Write them button, and the fallback for images without alt text" width="1644" />

Alt text is how someone using a screen reader learns what an image shows, and how search engines read
it. The **Images** box helps in two ways:

- **Writing the real thing.** It says how many images in the Media Library have no alt text, and
  **Write them** opens the Media Library filtered to just those, with an *Alt text* column showing
  what each image has. The same **Missing alt text** button sits at the top of the Media Library's
  list view.
- **A fallback** for images still without: the image's **title**, its **caption**, or the **title of
  the page it is on**. It is used only for an image with no alt text of its own. An empty `alt=""`
  written into the content on purpose (for a decorative image) is left alone, and a title that is just
  a camera file name (`IMG_4021`) is skipped. Off by default.

A fallback is better than nothing and worse than a sentence someone wrote, which is why the first half
comes first. It applies wherever WordPress draws an image (featured images, the content, galleries);
an element that prints its own `<img>` tag without WordPress's image functions is not changed.
