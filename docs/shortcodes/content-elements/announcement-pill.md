---
title: Announcement Pill
sidebar_position: 40
---

# Announcement Pill

A compact rounded **pill / badge** — an optional sub-tag (“New”), a message, optional leading + trailing icons, and an optional link. Perfect for “what’s new” hero chips, status badges and eyebrow labels. Tabs: **Content**, **Design**, **Styling**, **Link & SEO**, **Animations**, **Advanced**.

Markup stays clean and semantic: it renders a crawlable `<a>` when linked (a plain `<span>` otherwise — never a fake `role="alert"`), and every utility class lives in the element’s stylesheet rather than on the content.

## Content


- **Sub-tag** — the small leading badge inside the pill (e.g. `New`, `Beta`, `Pro`). Leave empty to omit it.
- **Message** — the main pill text.
- **Link (optional)** — makes the whole pill a link (e.g. to release notes). A full `https://` URL on another domain opens in a new tab automatically. Empty = a non-clickable pill.
- **Leading Marker** — `None`, `Dot`, `Pulse Dot (live)` — an animated dot ideal for a “live / now available” pill — or `Icon`.
- **Leading Icon** / **Trailing Icon** — icon-pickers (the same packs the Button uses). The leading icon shows when Leading Marker = Icon; the trailing icon sits after the message (e.g. an arrow on a linked pill).

## Design


| Option | Choices |
| --- | --- |
| **Style** | Soft (tinted, default), Outline, Solid, Subtle (light grey), Ghost (text only), Gradient (two-colour), Glass (frosted blur) |
| **Shape** | Pill (fully rounded, default), Rounded, Square |
| **Size** | Small, Medium (default), Large |
| **Alignment** | Left (default), Center, Right |
| **Sub-tag Style** | Filled (default), Soft, Outline, No box (plain text) |
| **Hover Effect** | None, Lift (default), Glow, Arrow slide (nudges the trailing icon) |

## Styling


- **Pill Color** — drives the fill / border / text of the pill. A Color Preset (recommended) follows your brand; or a custom colour. Empty = neutral grey.
- **Message Color** — override the message text colour. Empty = derived from the Pill Color / style.
- **Sub-tag Color** — colour of the leading sub-tag. Empty = the Pill Color.
- **Gradient Start / End** — used only by the Gradient style.
- **Margin & Padding** — margin positions the pill; padding is usually best left to the chosen Size.

## Link & SEO


Everything you need for a search- and accessibility-friendly chip:

- **Open Link In** — `Auto` (new tab for external links), Same tab, or New tab. External links always get `rel="noopener noreferrer"`.
- **rel="nofollow" / "sponsored" / "ugc"** — Google’s link attributes. Use `sponsored` for paid/affiliate “new offer” pills, `ugc` for user-generated links, `nofollow` to withhold ranking credit.
- **Accessible Label (aria-label)** — a fuller description for screen readers when the visible text is terse (e.g. “Read the v2.0 release notes”). Decorative dots and icons are automatically `aria-hidden`.
- **Tooltip (title)** — optional native hover tooltip.
- **Dismissible + Dismiss Key** — adds a × button that hides the pill and remembers the choice in the visitor’s browser (give each pill a unique key).
- **Announcement structured data** — opt-in schema.org `SpecialAnnouncement` JSON-LD (name + date + url). Use **only** for a genuine announcement; misused structured data can hurt SEO. Default off.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.

:::tip Site Converter
When you convert an AI-generated site, hero “what’s new” pills (a rounded chip with a coloured tag, a message and an arrow) are mapped straight to this element — editable, clean, and SEO-ready — instead of being pasted in as verbatim code.
:::
