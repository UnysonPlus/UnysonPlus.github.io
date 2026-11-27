---
slug: classes-sit-on-top-of-presets
title: Why named classes sit on top of the presets, and how "where it comes from" is worked out
authors: [jon]
tags: [theme-settings, css, architecture, live-editor, page-builder]
date: 2026-11-27
description: Roadmap 8f adds named classes. They are a Theme Settings list of style fields printed after every preset rule, so a class beats a preset and an element's own settings beat a class; a combo is the two classes together; and the Live Editor finds where each property comes from by reading the page's real CSS rather than re-deriving it.
---

**The question:** Roadmap 8f: "Style through named classes in the Live Editor: give an element a class, and styling the
class restyles every element that has it. Combo classes, a 'where it comes from' view and a count of where else the
class is used. It sits on top of the presets rather than beside them." Where do classes live, what wins when a class and
a preset disagree, and how can the editor tell which one set a value?

<!-- truncate -->

## Context

Elements already had two ways to share a look: **presets** (Button, Box, Section Style, Text Style…: a skin chosen by
name in one field) and the free **CSS Class** field (any class, styled with hand-written CSS). Presets cover one kind of
element each; the CSS Class field needs CSS knowledge and gives the editor nothing to show.

## Options considered

1. **Turn every preset into a class** (one system). Clean in theory, but it would migrate every saved preset and every
   element that wears one, for no visible gain.
2. **Classes beside the presets**, with their own priority rules. Two systems that fight over the same properties.
3. **Classes on top of the presets.** A class is a named list of style fields (the same colours, box and text a preset
   has, plus Custom CSS), kept in Theme Settings, printed after the presets. Presets stay as they are and show up in
   the same panel as classes.

**Combos:** a separate "variant" field on the class, or the two classes together (`.c-card.c-featured`).

**Where it comes from:** re-derive it from the saved settings (classes, presets, element options), or read the page's
real CSS in the browser.

## Decision

Option 3. One field list (`unysonplus_style_class_fields()`) drives the Theme Settings form, the CSS and the Live
Editor's editor. The class CSS is printed after every preset rule, so per property: **preset < class < combo < the
element's own settings**. A combo is the base and the combo class together: specificity makes it win where it sets
something, and it applies only with its base. "Where it comes from" reads the page's stylesheets in the canvas and
names each winning rule by its source.

## Why

- **Nothing to migrate.** Presets and every element wearing one are untouched; classes are new and optional.
- **The order matches intent.** A preset is the general skin, a class is a deliberate shared tweak, a combo is a
  variant of that tweak, and a setting on one element is the most specific choice of all.
- **Combos need no new concept.** Two classes together is plain CSS, works in the browser's own dev tools, and picking
  a combo brings its base along.
- **The origins view cannot drift.** It reads what the browser actually applies (theme CSS, plugin CSS, Custom CSS,
  the element's own rules), so it is right even for styles no setting knows about, and needs no update when a new
  preset kind appears.

**Status:** Accepted. See [Classes](/theme/components/classes).
