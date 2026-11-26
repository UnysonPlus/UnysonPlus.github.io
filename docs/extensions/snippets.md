---
sidebar_position: 8
title: "Free WordPress Reusable Content Blocks — Snippets"
sidebar_label: "Snippets"
description: "Free WordPress snippets — save reusable page-builder content and global sections and embed them anywhere. Edit once, update everywhere. No pro tier."
---

# Snippets

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Premium reusable blocks in seconds.</p>
  <p class="ext-hero__sub">Save any page-builder section as a reusable snippet and embed it across your site — edit it once and every instance updates. Global content blocks, free.</p>
</div>

Build reusable Page Builder content once, then reuse it anywhere — and edit it from a single
place. A **Snippet** is a small piece of builder content (a CTA, a stats band, a feature card,
contact details…) that stays consistent across every page that uses it: change the snippet and
every page updates automatically.

Snippets double as the **Template Library** behind [Global Templates](./global-templates.md):
each snippet has a **kind** that decides how it's reused.

:::tip[💡 Web dev tip: build the piece once, not on every page]
Whenever the same chunk of markup shows up in more than one place — a CTA band, a contact block, a
pricing card — that's a signal to extract it into a single reusable piece rather than rebuild it by
hand each time. It's the same instinct behind reusable functions and components in code: define the
behavior once, call it wherever it's needed, and fix bugs in exactly one place. [MDN: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
:::

## Template kinds

When you create or edit a snippet, pick its **Template Kind** (right-hand box on the snippet
editor):

| Kind | Reuse it by… | Build it as… |
| --- | --- | --- |
| **Block** (default) | Dropping the **Snippet** element into a column, or `[snippet id="…"]` | Any content |
| **Section** | **Templates → Sections → (Global)** in the Page Builder | A full **Section** |
| **Column** | **Templates → Columns → (Global)** in the Page Builder | Just the column's contents (no Section wrapper) |

Section- and Column-kind snippets are **Global Templates** — see the
[Global Templates](./global-templates.md) page for the builder workflow.

## Create a snippet

1. Activate **Snippets** from **Unyson+ → Extensions**.
2. Go to **Snippets → Add New**, give it a title, and build its content with the Page Builder.
3. Choose a **Template Kind** (Block / Section / Column) and **Publish**.

The Snippets list shows each snippet's **Kind** and can be filtered by kind, so a large library
stays easy to scan.

## Embed a Block

For a **Block**-kind snippet, drop the **Snippet** element into any column (or paste the
shortcode anywhere):

```text
[snippet id="123"]
```

The snippet's own embed shortcode is shown in the **Snippet Shortcode** box on its editor.

Edit the snippet once and every place that embeds it updates.

:::tip
To reuse a whole **Section** or **Column** at the root of a page (not inside a column), set the
snippet's kind to **Section** or **Column** and insert it from the Page Builder's **Templates**
manager. See [Global Templates](./global-templates.md).
:::

## Components: properties and variants {#components}

A **component** is a snippet whose copies are not all the same: each copy fills in its own text, links, pictures and
colours, and can pick a different look (a **variant**). Use one for any repeated design that holds different content:
feature cards, team members, pricing boxes, testimonials, product tiles. Editing the component (its layout, its
styling, its variants) updates every copy on every page.

<img src="/img/snippets/component-copies.png" alt="Three cards side by side, all copies of one Feature Card component: each has its own photo, title and text; the second hides its NEW badge and uses a blue accent; the third uses the Dark variant" width="1203" />

### Make a component

1. Create a snippet (**Snippets → Add New**) and build the design with the page builder, for example a card with a
   picture, a heading, a line of text and a link.
2. In its **Component: properties and variants** box, add the **properties** each copy will fill in.
3. Use each property inside the design:

| Property type | What a copy fills in | How the design uses it |
| --- | --- | --- |
| **Text** | A line of text | `{{prop|name=title}}` in any text field (a heading, a text block, a button label) |
| **Link** | An address | `{{prop|name=link}}` in a link field or in a link inside a text block |
| **Image** | A picture | Pick the design's picture as the property's **Default image**: each copy's picture replaces it |
| **Colour** | A colour | `var(--prop-accent)` in a style or Custom CSS (a badge background, a link colour) |
| **Show / hide switch** | Show or Hide | Give the elements it controls the CSS class `prop-NAME` (e.g. `prop-badge`): they are hidden when a copy turns the switch off |

4. Optionally add **variants**: a name (Dark, Small, Featured…) and the CSS for that look, with `selector` standing for
   the component, e.g. `selector .boxp-rounded-card{ background:#1C1E22; color:#fff } selector h3{ color:#2AD38B }`.
5. Publish.

Each property has a **default**: a copy that leaves a field empty shows the default.

<img src="/img/snippets/component-box.png" alt="The Component: properties and variants box on a snippet: a short explanation, six properties (title, body, link, photo, accent, badge) and one variant, Dark" width="1012" />

### Place a copy

Add the **Component** element (Content Elements) to any column, pick the component, then fill in its fields: one per
property, plus **Variant** when it has variants. The fields come from the component, so a property added later appears
on every copy at once (with its default until a copy fills it in). In the Live Editor the same fields open from the
element's settings.

### Variants as States

Each variant is also a **State** of the copy, so an [Interaction](/animation-engine/interactions) can switch a copy
into a variant and back: hover a card to show its Featured look, click a button to put a panel in its Open variant.
Use the variant's name (in lower case, spaces as dashes) as the state.

### How it works and limits

- A copy renders the component's snippet with its own values: `{{prop|name=…}}` is a dynamic tag (it also appears in
  the dynamic-content picker), any token in a field that does not resolve tags is replaced in the finished HTML, and
  colour and image properties are also set as `--prop-NAME` CSS variables on the copy's wrapper (`.upw-comp`).
- Variant CSS and switch rules are written once per page per component, scoped to that component.
- An image property replaces the default picture by its media item (and drops its alternative sizes, so the copy shows
  the full picture you picked).
- A component inside a component reads its own values. A component cannot contain itself.
- Properties are plain values: a copy cannot change the component's layout (add or remove elements). For a different
  layout, make a second component or a variant.

## With the AI Assistant

When the [AI Assistant (Beta)](ai-assistant/index.md) extension is active, the AI can work with snippets:

- **`snippets-list`** — every snippet with its kind and the exact item to place it on a page.
- **`snippets-create`** — a new Block (inline embed) or Global Section (a band reused on many pages),
  optionally filled with content; its content is then edited with the page tools like any page.
  Pass `properties` and `variants` to make it a [component](#components): the reply then includes the Component
  element to place, with a field for each property.

Try *"Turn our newsletter band into a Global Section and use it at the bottom of every service page."*
