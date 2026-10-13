---
slug: global-link-colour-zero-specificity
title: "Why does the theme's global link colour use :where() instead of a:not(.btn)?"
authors: [jon]
tags: [css, architecture, back-compat]
date: 2026-10-13
description: "Components kept losing their own link hover colours to the parent theme's global link rule. The fix was not to delete the rule but to drop its specificity to that of a bare `a`, so any classed rule beats it without !important."
---

**The question:** "These text hover color issues are getting annoying. Every Unyson+ build is getting it. What's the ultimate fix for this? Delete the code from the parent theme?"

<!-- truncate -->

## Context

The parent theme coloured links with `a:not(.btn) { color: var(--color-primary) }` and a hover twin,
`a:not(.btn):hover, a:not(.btn):focus-visible`. `:not(.btn)` counts as a class, so the resting rule
weighed **(0,1,1)** and the hover rule **(0,2,1)**. That beat almost every component that styled its
own links: pagination (`.page-numbers:hover`, 0,2,0) kept a red label on a red fill on hover, footer
links ignored the Footer → Link Color setting, and card titles that were meant to be a neutral
heading colour came out in the brand colour. Each site then needed a per-case override.

## Options considered

- **Delete the rule.** Plain links would lose their brand colour and fall back to the browser's
  blue, so every site would need it added back.
- **Keep patching per component** (extra classes, higher-specificity selectors, `!important`). This is
  what had been happening. It never ends, because every new component meets the same rule.
- **Keep the rule, remove its weight.** Write it as `a:where(:not(.btn))` and
  `a:where(:not(.btn):hover, :not(.btn):focus-visible)`. Both weigh **(0,0,1)**, the same as a bare
  `a`. Plain links still get the brand colour, and any rule with a class wins.

## Decision

Keep the rule, remove its weight. The global link colour is now a default that any classed rule can
override, not a rule that overrides them.

## Why

The rule's job is to give *unstyled* links a colour, and it should step aside for everything else.
`:where()` says that directly, without a list of exceptions. It also brings back colours that had been
silently ignored for a long time, such as the Footer Link Color setting and the Posts element's
neutral titles. A site whose look depended on the old override needs one line in its child theme to
keep it.
