---
title: "Position Box"
sidebar_position: 56
slug: /options/option-types/position-box
description: The Unyson+ position-box option type — set Top / Right / Bottom / Left offsets with units, arranged like a "+".
---

# Position Box

A four-side offset control — **Top / Right / Bottom / Left**, each a number with a unit — laid out
like a "+". Handy for positioning an element (offsets, insets) the same way [Spacing](./spacing.md)
handles margin/padding.

```php
$options = [
	'demo_position' => [
		'type'  => 'position-box',
		'label' => __( 'Position', 'unysonplus' ),
		'units' => [ 'px', '%', 'rem', 'em' ],   // optional; defaults to px-based units
	],
];
```

## Saved value

A hash of the four sides, each `{ value, unit }`:

```text
Array
(
    [top]    => Array ( [value] => 10, [unit] => px )
    [right]  => Array ( [value] => '',  [unit] => px )
    [bottom] => Array ( [value] => 10, [unit] => px )
    [left]   => Array ( [value] => '',  [unit] => px )
)
```
