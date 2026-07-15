---
slug: footer-section-dividers-opt-in
title: "Why footer section dividers are now opt-in, not a default border"
authors: [jon]
tags: [architecture]
date: 2026-07-15
description: The parent theme painted a faint 1px divider above every footer section by default, so every child theme had to fight the rule's specificity to remove it. We flipped the default to none — dividers are now something a child opts into, not out of.
---

**The question:** The parent theme draws a thin line above each footer section (protection toolkit,
helpline, copyright). A child theme that doesn't want those lines has to override them — should the
divider stay a default that every site turns *off*, or default to nothing and be turned *on* only
when a site actually wants it?

<!-- truncate -->

## Context

The footer builder stacks sections (`pre_footer` / `main_footer` / `post_footer` / `copyright`), and
the parent theme separated them with:

```css
.footer .footer-section + .footer-section,
.footer .footer__body + .footer-section {
  border-top: var(--footer-section-divider, 1px solid rgba(255,255,255,0.08));
}
```

The intent was good — the border is routed through a `--footer-section-divider` variable, so a child
can recolor or drop it *without* fighting selector specificity. But the **fallback was a visible 1px
line**, so the divider showed on every footer out of the box. A child that didn't want it had to
remember `--footer-section-divider: none`, and until it did, the footer carried lines the design never
asked for.

This bit a real build (PayForItUK): the source footer had no section dividers, but the rebuilt one
showed faint lines above the toolkit grid and the helpline that read as a spacing/separation bug.

## Options considered

- **Keep the 1px default; override per site.** Preserves existing footers exactly, but every new
  child theme inherits an unwanted line and has to fight it off — the opposite of "clean out of the
  box".
- **Flip the default to `none`; opt in per site.** Footers are clean by default; a site that wants
  dividers sets `--footer-section-divider: 1px solid …` from its child theme. The cost is that
  existing sites lose a faint (`rgba(255,255,255,0.08)`, barely visible) line.

## Decision

**Default to `none`** (theme 2.3.92). The variable and every consumer are unchanged; only the
fallback flipped:

```css
border-top: var(--footer-section-divider, none);
```

A site that genuinely wants section dividers now opts in — `:root { --footer-section-divider: 1px
solid rgba(255,255,255,0.08); }` in its child theme.

## Why

A framework default should be the thing most sites want, and **most footers don't want internal
dividers** — the sites we clone don't have them, and a child theme shouldn't have to fight the parent
just to get a clean footer. Making the border opt-in inverts the burden the right way: the common
case (no line) needs zero code, and the rare case (wants a line) is one variable.

It's the same lesson as the section-padding specificity trap we hit the same week (a parent
`.fw-page-builder-content > section` padding rule the child had to *out-specify* to undo): a default
that a child has to override to get the normal result is a default pointing the wrong way. Prefer
neutral defaults that children **add to**, not aggressive ones they have to **subtract from**.
