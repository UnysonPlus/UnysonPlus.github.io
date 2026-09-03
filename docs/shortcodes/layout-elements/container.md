---
title: Container
sidebar_position: 62
---

# Container

:::note[Classic layout element]
Container is part of the **Classic** palette tab. For new layouts, the modern **[Div](/page-builder/the-div-element)** handles this with its **Content Width** control (a full-width `section` Div that centres its content). This element stays fully supported for existing pages.
:::

A second content container you can add to a Section to hold columns — rendered as a `.fw-container` (boxed) or `.fw-container-fluid` (full-width) band inside the section. Because it's injected after the section's own container, one section can hold both a boxed band and a full-width band (e.g. a contained heading above a full-bleed gallery). Its only option lives on the **General** tab.

A **container** simply controls how wide the stuff inside it is allowed to run. *Boxed* keeps content within a comfortable, centred reading width; *full-width* lets a band stretch edge-to-edge. Constraining width matters because text that runs the full width of a large monitor is genuinely hard to read — so you'll often want a boxed container for words and a full-width one for a big image or colour block.

## General

- **Full Width** — switch (default off). Off renders *Boxed* — the container is constrained to the site width (`.fw-container`). On renders *Full-width* — it spans edge-to-edge (`.fw-container-fluid`).
