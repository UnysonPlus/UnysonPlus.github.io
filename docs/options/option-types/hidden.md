---
title: "Hidden"
sidebar_position: 32
---


Simple hidden input.

```php
$options = [
	'demo_hidden'                    => [
		'label' => false,
		'type'  => 'hidden',
		'value' => '{some: "json"}',
		'desc'  => false,
	],
];
```

:::tip
The hidden input is not visible, so parameters like `label`, `desc` and `help` have no sense here.
:::
