---
title: Highlight Text
sidebar_position: 38
---

# Highlight Text

A short piece of text styled with a typographic effect — marker highlight, gradient fill, underline, outline, glow or a drop-cap. Tabs: **Content**, **Design**, **Styling**, **Animations**, **Advanced**.

A *drop-cap* is the oversized first letter that begins a paragraph, like in an old storybook. These effects are for **emphasis** — a word or two in a heading — so use them sparingly; if everything is highlighted, nothing stands out.

<img src="/img/shortcodes/highlight-text-backend.png" alt="Highlight Text on the Page Builder canvas" width="936" />

:::tip[💡 Web dev tip: `<mark>` means relevance, not just a splash of colour]
The `<mark>` element carries real semantic meaning — "this text is relevant right now," like a highlighter run over a search result — so a screen reader can announce it distinctly, unlike a plain `<span>` with a yellow background. It also shouldn't be the only cue: if the text underneath still makes sense without the highlight, the highlight is decoration; if the highlight is doing the communicating, back it up with wording too. Choose the HTML Tag here with that in mind rather than for visual effect alone. [MDN: the mark element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
:::

## Content

<img src="/img/shortcodes/highlight-text-content.png" alt="Highlight Text options panel — Content tab" width="1200" />

- **Prefix (plain)** — optional plain text before the highlighted text, on the same line. A trailing space is added automatically.
- **Highlighted Text** — the part that receives the effect. Basic inline HTML (bold, italic, links) is allowed. For Drop cap, enter a full paragraph.
- **Suffix (plain)** — optional plain text after the highlighted text, on the same line. A leading space is added automatically.
- **HTML Tag** — wrapping tag: H1–H6, Paragraph, Span (inline), or Div. Default H2. Use Paragraph for the Drop cap effect.

## Design

<img src="/img/shortcodes/highlight-text-design.png" alt="Highlight Text options panel — Design tab" width="1200" />

- **Effect** — the typographic effect:

| Effect | Look |
| --- | --- |
| **Marker highlight** | Marker-pen highlight (default) |
| **Gradient fill** | Gradient-filled text |
| **Underline** | Styled underline |
| **Outline text** | Outlined / hollow text |
| **Glow** | Glowing text |
| **Drop cap** | Decorative drop cap (use a full paragraph) |

- **Alignment** — Left (default), Center, or Right.

## Styling

<img src="/img/shortcodes/highlight-text-styling.png" alt="Highlight Text options panel — Styling tab" width="1200" />

- **Text Color** — color of the text.
- **Accent Color** — marker / gradient start / underline / glow / drop-cap color.
- **Accent Color 2 (gradient end)** — gradient end color.
- **Font Size Preset** — select a preset size for the text.
- **Margin & Padding** — spacing around the element.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
