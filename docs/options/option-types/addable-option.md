---
title: "Addable Option"
sidebar_position: 25
---


Create a list of options.

<img src="/img/options/opt-addable-option.png" alt="addable-option option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_addable_option' => [
		'label'  => __( 'Addable Option', 'unysonplus' ),
		'type'   => 'addable-option',
		// — Optional attributes you can add (commented) —
		// 'label' => __( 'Label', 'unysonplus' ),  // or false to hide the label column
		// 'desc'  => __( 'Short description', 'unysonplus' ),
		// 'help'  => __( 'Help tip text', 'unysonplus' ),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// 'attr'  => [ 'class' => 'my-class', 'data-foo' => 'bar' ],  // extra HTML attributes
		// 'add-button-text' => __( 'Add', 'unysonplus' ),
		// 'sortable'        => false,  // disable drag-to-reorder
		'option' => [
			'type' => 'text',
		],
		'value'  => [ 'Option 1', 'Option 2', 'Option 3' ],
		'desc'   => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'unysonplus' ),
		'help'   => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
			__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'unysonplus' ),
			__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
				'unysonplus' )
		)
	],
];
```

**Custom Events**

`fw:option-type:addable-option:option:init` - New option was added and initialized.
