---
title: Image Content
sidebar_position: 9
sidebar_custom_props: { icon: '/img/shortcode-icons/image-content.svg' }
---

# Image Content

An image alongside text in a responsive two-column layout. Tabs: **Content**, **Layout**,
**Styling**, **Animations**, **Advanced**.

<img src="/img/shortcodes/image-content-backend.png" alt="Image Content on the Page Builder canvas" width="936" />

:::tip[💡 Web dev tip: images need real alt text, not a filename]
A screen reader announces an image's alt attribute in place of the picture, so it should describe what the image shows or means — not repeat "image1.jpg" or stay blank on a meaningful photo. That's why Image Content gives you a dedicated Image Alt Text field alongside the image itself, so the two-column layout stays accessible, not just visually balanced. [W3C WAI: An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
:::

## Live demo

**▶ [See the Image Content live on the demos site](https://demos.unysonplus.com/shortcodes/image-content/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/image-content-content.png" alt="Image Content options panel — Content tab" width="1200" />

Image, Content (rich text), Image Alt Text, Image Link, Open Link in New Window.

## Layout

<img src="/img/shortcodes/image-content-layout.png" alt="Image Content options panel — Layout tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Layout** | Image Left / Content Right, Image Right / Content Left |
| **Column Ratio** | Image/content width split (image-picker) |
| **Vertical Alignment** | Top, Center, Bottom |
| **Gap** | None, Small, Medium, Large |
| **Mobile Stacking Order** | Image First, Content First |

## Styling

<img src="/img/shortcodes/image-content-styling.png" alt="Image Content options panel — Styling tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Image Fit** | Contain (show full image), Cover (fill column) |
| **Image Style** | Any Image Style preset — crop, corners, mask, filter, scrim (Theme Settings → Components → Image Styles) |
| **Image Border Radius** | None, Small, Medium, Large, Circle |
| **Image Shadow** | Small, Medium, Large |
| **Content Color** | Body text color |

:::note[Screenshots — layouts & image treatments]
Capture both layouts plus the fit/radius/shadow variants: `image-content-left`,
`image-content-right`, `image-content-cover`, `image-content-circle`.
:::
