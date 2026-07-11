---
title: "Hidden"
sidebar_position: 32
---


Simple hidden input.

```php
$options = [
	'demo_hidden' => [
		'label' => false,  // or false to hide the label column
		'type' => 'hidden',
		'value' => '{some: "json"}',
		'desc' => false,
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
	],
];
```

:::tip
The hidden input is not visible, so parameters like `label`, `desc` and `help` have no sense here.
:::

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_hidden_2' )` returns — so you can see the shape of this option type's stored value:

```text
{some: "json"}
```
