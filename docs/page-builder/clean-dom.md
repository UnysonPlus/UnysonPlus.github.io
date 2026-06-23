---
title: The clean-DOM philosophy
sidebar_position: 7
---

# The clean-DOM philosophy

UnysonPlus's selling point is a **clean, un-bloated DOM**. Where many page builders wrap every
element in three or four nested `<div>`s of generated wrappers and scatter utility classes through
your prose, UnysonPlus elements render hand-written, semantic markup. The per-element demo pages
on the marketing site literally show the **generated markup** for each element, so any stray
wrapper or class is visible — keeping the output lean is part of the pitch, not just a nicety.

This page collects the rules that keep it that way. They matter both when you **use** the builder
(authoring content) and when you **build** an element (writing its `view.php`).

## Authoring rule: no classes on `<p>` / `<li>` inside the WYSIWYG

**Never add `class="…"` to `<p>`, `<li>`, or other tags inside a Text Block (WYSIWYG) editor.**
Keep editor content as plain semantic HTML:

```html
<!-- Good — clean editor content -->
<p>Premium themes, built fast.</p>
<ul>
  <li>Drag &amp; drop</li>
  <li>No code required</li>
</ul>
```

To attach a class, use the element's **Advanced tab → CSS Class** field — it lands on the block's
**wrapper**, not buried in the prose. When you need several separately-classed wrappers, use
**multiple Text Blocks in one column** rather than classing individual paragraphs. A stray
`class="lead"` in editor content shows up as DOM noise on the demo "generated markup" panel and
undercuts the clean-DOM story.

## Showing markup vs. running it: the Code Block toggle

To **display** HTML as code (rather than render it), use the **Code Block** element's
**Render as Code** switch — never hand-paste entity-escaped HTML (`&lt;table&gt;…`) into a block.
Re-saving an entity-escaped block in the builder decodes it and the markup then *renders* (the
exact bug the toggle fixes). With **Render as Code** on, the Code Block stores **raw** markup,
then at render time it beautifies (re-indents), HTML-escapes, and wraps it in a Prism-ready
`<pre><code>` — so visitors see the code and the builder modal still shows editable raw markup.
See the [Code Block](/docs/shortcodes/content-elements/code-block) reference.

## Builder rule: hand-write lean `view.php`

When you author an element, its `view.php` should emit only the markup it needs. The corrector
already guarantees the section/row/column scaffold, so an element's own view shouldn't add
redundant wrappers. Lean output is why the [items corrector](./items-corrector.md) and the
[nested-column aliasing](./how-it-works.md#5-generating-the-shortcode-string) work the way they do
— they add exactly one valid grid layer, not a defensive pile of divs.

## Builder rule: per-item CSS via `selector`, scoped and shared

Per-item custom CSS uses the literal token `selector` for the item's auto-generated wrapper. For
styling that repeats across children, scope it **once** on the parent rather than copying
`custom_css` onto every child:

```text
# On the section's custom_css:
selector .step      { padding: 2rem; border-radius: 12px; }
selector .step:hover{ transform: translateY(-4px); }

# Each column's css_class: "step"
```

This keeps the generated stylesheet small — one rule block instead of N copies — which is the same
clean-output principle applied to CSS.

## Why it's enforced

Because the demo site renders each element's real output as a syntax-highlighted code view, the
DOM *is* the documentation. Bloat is immediately visible and immediately on-brand-damaging. Treat
"would this add a wrapper or a class a human didn't ask for?" as the test for any change to an
element's markup.
