---
title: Social Icons
sidebar_position: 67
---

# Social Icons

A row of social-profile links — either reused from your **Theme Settings → Social Profiles** or defined manually right here. Options live under the **Content** and **Advanced** tabs.

:::tip[💡 Web dev tip: an icon-only link still needs an accessible name]
A link that's just a glyph — a Facebook "f", a bird, a camera outline — has no visible text for a screen reader to read, so without an accessible name it announces as a bare, meaningless link. That's exactly why Social Icons asks for an Accessible Label on every profile, so "Facebook" or "Instagram" is announced even though only the icon shows. [MDN: ARIA aria-label attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label)
:::

## Live demo

**▶ [See the Social Icons live on the demos site](https://demos.unysonplus.com/shortcodes/social-icons/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/social-icons-content.png" alt="Social Icons options panel — Content tab" width="1200" />

- **Source** — **Theme Settings (Social Profiles)** (default) reuses the profiles configured in the theme; **Manual list** lets you define links below.
- **Profiles** — an addable list of links; used only when Source is **Manual list**. Each entry has:
  - **Icon** — the social glyph, picked from the icon library.
  - **URL** — the profile link.
  - **Accessible Label** — screen-reader text, e.g. "Facebook".
- **Icon Size** — **Small**, **Medium** (default), or **Large**.

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
