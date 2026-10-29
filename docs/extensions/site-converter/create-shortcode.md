---
sidebar_position: 10
title: Create shortcode
---

# Create shortcode

**Create shortcode** turns a snippet of HTML, CSS and JavaScript — a CodePen, something an AI wrote you,
any self-contained block of markup — into an **installable UnysonPlus shortcode**. The result renders
your snippet exactly as it was, animations and all, with its text and images exposed as editable
options in the page builder.

It is in the AI Dev Kit dashboard at **`http://localhost:4600/#pen`**. (It was called *Pen → Shortcode*
until kit 1.13.9.)

:::note Alpha
Still in active development. It handles typical snippets well; very unusual CSS, or markup that depends
on being at the root of its own document, may need a hand afterwards.
:::

## How to use it

1. **Paste the HTML** into the first pane, the **CSS** into the second, and any **JavaScript** into the
   third. Only the HTML is required.
2. Add any **external stylesheet URLs** the snippet needs, one per line.
3. Give it a **name**, or leave it blank and let the AI pick one (see below).
4. Press **Convert to shortcode**. The `.zip` downloads automatically.
5. In WordPress, go to **wp-admin → Unyson → Shortcodes → Add a shortcode or design pack**, upload the
   `.zip`, and press **Upload & install**.
6. The shortcode appears in the page builder under **Content Elements**.

## What it produces

A complete shortcode folder — `config.php`, `options.php`, `views/view.php`, `static.php` and your
scoped CSS and JS — packaged as a `.zip`.

Two things are worth knowing about how it works:

- **Your markup is kept verbatim.** The snippet's own HTML is the template, so CSS selectors and
  JavaScript that depend on the exact structure keep working. Only the editable slots are replaced with
  placeholders.
- **The CSS is scoped.** Every rule is rewritten to sit under the shortcode's own class, so it cannot
  leak out and restyle the rest of your theme. `html`, `body` and `:root` rules are rewritten to the
  shortcode's root.

Text in a pure-text element (a heading, a paragraph, a button label, a list item, a caption) becomes a
**text option**; long text becomes a textarea. Every `<img>` becomes an **upload option** that falls
back to the original image until you swap it.

## Let AI name the options

The tool **finds** the editable slots by rendering your snippet in a real browser and reading the DOM.
That part is exact and always runs. What it cannot do on its own is give each slot a sensible **name** —
without help, an option is labelled with the words it currently contains, so a heading becomes an option
called "Transform your business today". That tells whoever edits the page nothing about what it is.

Tick **Let AI name the options** and the AI does three things:

- **Names each option for its role** — "Section Heading", "Primary Button Label", "Dashboard Image" —
  so the builder's edit panel reads like a form someone designed.
- **Names the shortcode**, if you left the name blank or gave it something generic.
- **Leaves pure decoration fixed.** A lone arrow or bullet glyph becomes a permanent part of the markup
  instead of an editable field nobody wants. The character still renders exactly as before.

The generated code is otherwise **identical**. The AI only renames and hides; it never writes PHP, CSS
or markup. If the AI is unavailable or fails, the shortcode is still produced, with the fallback names.

Here is the same snippet converted both ways:

| Without AI | With AI |
| --- | --- |
| `Transform your business today` | **Section Heading** |
| `We help small teams ship faster,…` | **Supporting Paragraph** |
| `Get started` | **Primary Button Label** |
| `Image 1` | **Dashboard Image** |
| `→` | *(left fixed — decoration)* |
| `•` | *(left fixed — decoration)* |

After converting, the dashboard lists every option with the name it was given and a sample of its
current content, so you can see what was decided before you install anything.

The checkbox is only available when an AI backend is set up — see
[the Kit Assistant](./kit-assistant.md#if-it-says-ai-is-off) for how to pick one.

## Limits

- **Text and image options only.** Repeaters, colour pickers and size options are a later pass; for now,
  colours and sizes live in the snippet's CSS.
- **Only pure-text elements become options.** An element with child elements is left alone, so nested
  markup is never destroyed. A few tags (such as `<small>`) are not scanned.
- **The CSS scoper is not a full CSS parser.** Exotic selector lists inside `:is()` or `:not()` with
  commas can be mis-split.
- **JavaScript runs as given**, scoped to the element. It is not sandboxed — only paste code you trust.
