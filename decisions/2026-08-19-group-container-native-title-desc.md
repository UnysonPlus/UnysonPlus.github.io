---
slug: group-container-native-title-desc
title: "Why the group container gained a native title/desc instead of a leading html option"
authors: [jon]
tags: [option-types, architecture, back-compat, header]
date: 2026-08-19
description: The Mobile & Tablet header tab (and the Layout tab) grew many option groups, and each one carried its section heading as a leading `html` option — a workaround that reads as noise in the option array and puts presentation inside a data slot. We settled on adding optional `title`/`desc` parameters to the FW group container itself, rendered only when set, so grouping and its label are one consistent, backward-compatible construct.
---

**The question:** Can the `group` container type carry a label of its own, so we stop faking
section headings with a leading `html` option?

<!-- truncate -->

## Context

Reorganising the Header **Layout** and **Mobile & Tablet** tabs into `type => 'group'` boxes gave us
~19 groups. Each group needed a visible heading (and one needed a short note — "a different mobile logo
lives under Identity"). The framework's `group` container had **no** title concept, so every group led
with a throwaday `html` option:

```php
'grp_toggle' => [
    'type'    => 'group',
    'options' => [
        'toggle_heading' => [ 'type' => 'html', 'label' => false, 'html' => '<h4 …>Hamburger / Toggle</h4>' ],
        // …real options…
    ],
],
```

That works, but it's wrong on three counts: the heading is a **fake option** occupying an id in a data
array; its markup/inline-styles are **duplicated** at every call site; and the label lives **inside**
`options` rather than as an attribute **of** the group, so grouping and labelling are two disconnected
ideas.

## Options considered

- **Keep the leading `html` option.** Zero framework change, but the noise multiplies with every group
  and the styling drifts (each site/tab re-invents the `<h4 style=…>`).
- **A helper closure** (`$heading()` / `$section()`) per options file. Removes the copy-paste but still
  emits a fake option, still per-file, still not an attribute of the group.
- **Native `title` (+ `desc`) on the group container**, rendered only when set. One place owns the markup;
  the label becomes an attribute of the thing it labels; every group across the plugin benefits.

## Decision

Add optional `title` and `desc` parameters to `FW_Container_Type_Group::_render()`. `title` renders as a
small uppercase **"eyebrow" section label** — deliberately a muted `<div class="fw-backend-options-group__title">`,
not a content `<h4>`, so it marks a section without competing with the field labels beneath it; `desc`
allows limited inline HTML (`wp_kses_post`) in a muted `<p class="fw-backend-options-group__desc">`. Both
render **only when present**, so every existing group in the plugin is untouched. The Header Layout and Mobile & Tablet tabs were then
refactored to use `title`/`desc` and drop their `html` heading options (the "mobile logo" note became the
Layout group's `desc`).

## Why

- **Back-compat is free** — an unset `title`/`desc` renders nothing, so the thousands of existing groups
  are byte-identical in output.
- **One owner for the markup** — the box heading style lives in the container renderer, not scattered
  inline styles across option files, so it stays consistent and themeable via two real classes.
- **The model reads right** — a group's label is now an attribute of the group, mirroring how `box`/`tab`
  already carry a `title`. Grouping and labelling are one construct, which is exactly what a reader
  skimming the option array expects.

The options-framework docs (`/docs/options`) were updated to document the two new parameters.
