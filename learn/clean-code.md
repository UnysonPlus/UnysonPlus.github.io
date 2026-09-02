---
sidebar_position: 7
title: Clean Code & Maintainability
description: Habits that keep a website easy to change — a clean DOM, consistent naming, child themes, reusing a design system, and not repeating yourself.
keywords: [clean code, maintainability, naming conventions, child theme, dom size, design system, dry]
---

# Clean Code & Maintainability

The website you launch is rarely the last version. **Building it so it's easy to change
later** — by you or the next person — saves far more time than it costs.

## The habits

- **Keep the DOM clean.** Every extra nested `<div>` is more to render, more for a screen
  reader to wade through, and more to style. Favour semantic elements and the least nesting
  that works.
- **Name things clearly and consistently.** Good names are documentation. Prefix anything
  shared globally (CSS classes, functions) so it can't collide with other code.
- **Never edit the parent theme.** Customise in a **[child theme](/theme/child-themes)** so a
  theme update doesn't wipe your changes.
- **Reuse a design system.** Set colours, fonts and spacing once (in Theme Settings) and
  reference them, instead of hard-coding a hex value in fifty places — then a rebrand is one
  change, not fifty.
- **Don't repeat yourself (DRY).** If you're copy-pasting the same block, make it reusable
  (a [Snippet](/extensions/snippets), a template) so there's a single source of truth.

## In UnysonPlus

The framework is built around these ideas: a clean, semantic DOM; a central design system in
Theme Settings; reusable Snippets and templates; and a child-theme workflow that survives
updates.

**Learn more:** [MDN: CSS specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) · [Clean DOM in the Page Builder](/page-builder/clean-dom)
