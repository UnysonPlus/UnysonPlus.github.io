---
title: Classes
sidebar_position: 2.6
slug: /components/classes
description: Named styles you give to elements. Style a class once and every element that has it changes; combo classes add to a base class; the Live Editor shows a class's use and where each part of an element's look comes from.
---

# Classes

A **class** is a named style you give to elements: *Card*, *Eyebrow*, *Soft shadow*. Change the class and every
element that has it changes, on every page. Classes sit on top of the presets: an element can wear a Box preset or a
Button preset and a class, and the class adds to them or overrides them.

<img src="/img/theme/components/classes-panel.png" alt="The Live Editor with a card selected and the Classes panel open: its classes Card and Card › Featured, an Add a class list, and a table saying which class sets each property" width="1215" />

## Make a class and use it

**In the Live Editor** (the quickest way):

1. Select an element and open the **Classes** panel (the tag button in the toolbar).
2. Choose **New class**, name it, set its look, and **Save class**. The element gets the class.
3. Select another element and pick the class from **Add a class…**.

**In Theme Settings:** Components → **Classes** → *Add a class*. Then give it to elements in their settings:
**Advanced tab → Classes**.

An element can have several classes. Remove one with the × on its chip in the panel, or in the Advanced tab.
Adding or removing a class is one undo step, saved with the page.

## Edit a class

Click a class's chip (or its name under **All classes**) to open it. Every change shows on the canvas at once, on every
element that has the class, so you can see what you are about to change; **Save class** writes it to Theme Settings for
every page, and **Cancel** puts it back.

<img src="/img/theme/components/classes-editor.png" alt="The class editor for Card: Colours, Box and Text fields, with the cards on the canvas already showing the new grey background" width="1215" />

| Group | Fields |
| --- | --- |
| **Colours** | Text colour, Background, Border colour, Text colour on hover, Background on hover. Pick from the palette (it then follows [Colour Modes](./colour-modes.md)) or type any colour. |
| **Box** | Padding, Margin, Border width, Border style, Corner radius, Shadow, Max width. Any CSS value; a bare number is pixels. |
| **Text** | Font size, Font weight, Line height, Letter spacing, Text align, Letter case, Opacity. |
| **Custom CSS** | For anything else. A list of declarations applies to the class; a full rule can use `selector` for the class, e.g. `selector:hover img { transform: scale(1.04); }`. |

Editing a class needs the right to change Theme Settings. Anyone who can edit the page can add and remove classes.

## Combo classes

A **combo** class only adds to another class. Set **Combo of** to the base class (for example *Featured*, a combo of
*Card*): it applies only to elements that have both, and changes only what you set, so *Card › Featured* can be a
Card with a coloured border. Picking a combo on an element brings its base along.

In the CSS a combo is the two classes together, `.c-card.c-featured`, so it wins over the base where they differ.

## Which one wins

For any one property, from weakest to strongest:

1. the theme and the presets the element wears (Box, Button, Section Style…),
2. its **classes**, in the order they are saved in Theme Settings,
3. its **combo classes**,
4. the element's **own settings** (its Styling tab, its Custom CSS).

So a class beats a preset, and a setting made on one element beats its class.

## Where it is used, and where a look comes from

The panel's **All classes** list says how many elements, on how many pages, use each class (saved pages, drafts and
templates count).

**Where its look comes from** lists, for the selected element, the properties that are styled and which source sets
each one: a class (click it to open it), a preset (*Box preset: soft*), **This element's settings**, or the theme. It
reads the page's real CSS, so it answers "why is this padding 32px?" even when the answer is a preset or the theme.

## Limits

- The Live Editor names a class by its name; to **rename** a class, change its Name in Theme Settings. Elements keep
  the old name until you pick the class again on them.
- A class styles the element's outer box. To reach inside an element (its title, its image), use the class's Custom CSS
  with `selector .inner-part`.
- Styles that need a breakpoint (a different padding on phones) go in Custom CSS with an `@media` rule for now.

## For developers

Saved as the `style_classes` Theme Settings list; elements carry `style_classes` (an array of class slugs) and print
`c-{slug}`. `framework/includes/presets/style-classes.php` has `unysonplus_get_style_classes()`,
`unysonplus_style_classes_css()`, `unysonplus_style_class_names()`, `unysonplus_style_class_usage()` and
`unysonplus_style_class_save()`; the field list is `unysonplus_style_class_fields()` (filter
`unysonplus_style_class_fields` to add one). AI agents use `save_preset` with type `style_classes`, and an element's
`style_classes` att.

## Related

- [Box Presets](./box-presets.md) and [Buttons](./buttons.md): the presets classes sit on top of.
- [Colour Modes](./colour-modes.md): palette colours in a class follow the mode.
