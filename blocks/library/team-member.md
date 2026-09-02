---
title: Team Member
description: The Unyson+ Team Member block — a photo, name, role and links card for a person, authored in the block editor and rendered by the team-member element.
---

# Team Member

A **person card** — a photo, name, job title and optional links (email, social, bio) — the building block of a "meet the team" or "about us" grid. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Team Member element](/shortcodes/components/team-member) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/team-member/front.png" alt="The Team Member block — a photo above a name and job title" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Image (`image`) | The person's photo. |
| Name (`name`) + Job (`job`) | Their name and role. |
| Slots (`slots`) | Extra rows — a short bio, email, phone or social links. |
| Card (`group_card`, `card_preview`) | The card layout and its live preview. |
| Colours (`group_colors`) | Text and background colours for the card. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/team-member {"upOptions":{"image":{...},"name":"Jordan Avery","job":"Lead Developer"}} /-->
```

The `image` value is a media reference (`{"attachment_id":123,"url":"…"}`), so use the block's image picker rather than typing it by hand.

## The team-member element

The block and the page builder's [Team Member element](/shortcodes/components/team-member) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
