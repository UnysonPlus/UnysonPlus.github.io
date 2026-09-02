---
sidebar_position: 3
title: Accessibility (a11y)
description: A beginner's guide to web accessibility — alt text, form labels, keyboard use, colour contrast, and not relying on colour alone.
keywords: [accessibility, a11y, alt text, aria, keyboard navigation, colour contrast, screen reader]
---

# Accessibility (a11y)

**Accessibility (often shortened to "a11y") means building so that everyone can use your
site** — including people who are blind, have low vision, can't use a mouse, or are
colour-blind. It's the right thing to do, it's often a legal requirement, and the same work
usually improves usability and SEO for *everyone*.

## The essentials

- **Alt text on images.** Describe what a meaningful image shows; use empty `alt=""` for
  purely decorative ones so screen readers skip them.
- **Labels on form fields.** Every input needs a real `<label>` — a placeholder isn't one, it
  disappears the moment someone types.
- **Everything works with a keyboard.** People who can't use a mouse Tab through links, buttons
  and menus, so those must all be reachable and operable.
- **Don't rely on colour alone.** Pair a red/green state with text or an icon, so it still
  reads for colour-blind users.
- **Enough contrast.** Text must stand out from its background (aim for the WCAG AA ratio).
- **Icons need names.** An icon-only button needs a text name (`aria-label`) so a screen reader
  can announce what it does.

## In UnysonPlus

Interactive elements follow the established [ARIA patterns](https://www.w3.org/WAI/ARIA/apg/) —
accordions, modals, tabs and menus ship keyboard support and the correct roles — and the
image and icon options prompt you for the text that assistive tech needs.

**Learn more:** [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) · [W3C: WAI tutorials](https://www.w3.org/WAI/tutorials/)
