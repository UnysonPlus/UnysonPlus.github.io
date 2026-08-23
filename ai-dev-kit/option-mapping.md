---
title: How Options Map
sidebar_label: How Options Map
sidebar_position: 3.6
slug: /option-mapping
description: How the deterministic converter maps every shortcode and Theme-Settings option — not a detector per option, but two reusable frameworks. A shared preset registry for preset-backed options, and a declarative style→option table for intrinsic scalars, with a coverage-driven backlog and AI reserved for the ambiguous tail.
---

# How Options Map

The converter has to fill in **hundreds** of shortcode and Theme-Settings options from a source design. The naïve way is a bespoke detector per option — and that's how the converter started to grow: a function to read the accordion style, another for button sizes, another for gaps, another for section padding… dozens of one-off readers, each re-discovering the same problems (where does the signal live — a class or a computed style? how do I snap a measured value onto a scale? for preset-backed options, when are the presets built relative to the pages?).

That doesn't scale. The converter instead maps options through **two reusable frameworks**, chosen by *how a value is expressed*.

## Two kinds of options

| Kind | The value is… | Examples | Mechanism |
| --- | --- | --- | --- |
| **Preset-backed** | a reference to a Theme-Settings preset | Background Pattern, Box Preset, Color Preset, Section Style, Icon Badge, Text Style, the Spacing / Gap scale | **Preset registry** (registration) |
| **Intrinsic scalar** | a direct property read | alignment, margins, orientation, columns, corner radius, position, width mode | **Declarative style→option table** |

You can't "detect" a preset-backed option into a scalar — the faithful mapping is to *register a preset and point the option at it*. And you can't "register" an intrinsic scalar — it's a read. So each kind gets its own framework.

## Framework 1 — the Preset Registry

Every preset-backed option shares one contract, and the registry (`FW_Site_Converter_Mapper::$registry`) makes it reusable so each new preset kind is a plug-in, not a re-implementation:

1. **Assign** (during page build): the element records its captured skin under a **deterministic key** (a hash of the normalized skin) and sets its native option to that key.

   ```php
   // e.g. a card column, an icon box, a feature list — any element with a box:
   $ref = FW_Site_Converter_Mapper::register_box_preset( $skin ); // 'boxp-box-a5ad842e'
   $col['atts']['border_preset'] = $ref;                          // renders on the inner wrapper
   ```

   Under the hood that calls the generic recorder:

   ```php
   FW_Site_Converter_Mapper::register_captured( 'box', $slug, $normalizedSkin );
   ```

2. **Reset** once per conversion in `build_pages()` (so re-conversions don't accumulate).

3. **Emit** (during the Theme-Settings pass, which runs *after* the pages): each `build_*_presets()` reads the registry and emits a real preset per entry, with the **same deterministic key**.

   ```php
   foreach ( FW_Site_Converter_Mapper::captured( 'box' ) as $slug => $skin ) {
       // → a border_presets entry whose slug matches the assigned reference
   }
   ```

Why deterministic keys matter: the presets are assembled **after** the pages are built, so an order-based id (“Captured Box 1”) would dangle. A hash of the skin means the assign side and the emit side agree with **no ordering dependency** — and it works even on a **class-only source** (whose `data-sc-cs` scan finds nothing), because the element registered its own skin.

**Adding a new preset kind** is: call `register_captured('<kind>', $key, $data)` at the assign site, and iterate `captured('<kind>')` at the emit site. That's the whole contract. It also structurally retires a recurring bug class — assigned presets silently falling back to one-off scoped CSS because the lookup was empty during page build.

## Framework 2 — the declarative style→option table

Intrinsic options are direct reads, so they need detection — but as **rows in one table**, applied by **one resolver**, not a function each.

```php
// One row per mappable signal → option. Adding an option = adding a row.
public static function style_option_rules() {
  return array(
    array( 'opt' => 'alignment', 'class' => '/\stext-center\s|\smx-auto\s|\sjustify-center\s/', 'value' => 'center' ),
    array( 'opt' => 'alignment', 'cs' => 'text-align', 'map' => array( 'center' => 'center', 'right' => 'right' ) ),
    array( 'opt' => 'orientation', 'class' => '/\sflex-wrap\s|\sflex-row\s/', 'value' => 'horizontal' ),
    array( 'opt' => 'position', 'cs' => 'position', 'map' => array( 'absolute' => 'absolute', 'sticky' => 'sticky' ) ),
    // …
  );
}
```

A shortcode builder merges the resolved options into its atts — opt-in and additive, never destructive:

```php
$opts = FW_Site_Converter_Mapper::resolve_style_options( $cls, $cs, array( 'alignment', 'text_transform' ) );
// → e.g. { alignment: 'center', text_transform: 'uppercase' }
```

Each rule matches either a **class pattern** (over the element's class string) or a **computed-style property** (from `data-sc-cs`, translated by a `map`). Class rules are listed before the computed fallback, and the **first matching rule per option wins** — so a source expresses an option however it likes (utility class *or* inline/stylesheet value) and still lands on the native option. Shared value-snappers (the spacing scale, the gap scale, radius buckets) are called *by* the table, not re-implemented per option.

## What makes it complete, not endless

The converter already emits **coverage reports** — `class-coverage.json` and `conversion-drops.json` — ranked lists of source signals it *didn't* map. That's the backlog: extend the registry or the table by **frequency**, data-driven, instead of guessing which of hundreds of options to hand-detect next.

And the **local AI stays the last resort** — reserved for the genuinely ambiguous tail where no measurable signal exists (see [Where AI fits](./conversion-architecture.md#where-ai-fits-optional)). It never becomes the primary mapper, because the converter's core contract is **reproducibility**: the same source always produces the same output, and both frameworks are fully deterministic.

## In short

- **Preset-backed options** → one **registration** framework (`register_captured` / `captured`), deterministic keys, ordering solved once.
- **Intrinsic options** → one **declarative table** (`style_option_rules` / `resolve_style_options`), where a new option is a row.
- **Coverage reports** rank what to map next; **AI** handles only the ambiguous remainder.

This is why most new option support is a registration or a table row — not a new detector.

> Design rationale: [Should the converter map ALL options — a detector per option?](/decisions/option-mapping-registry-and-table)
