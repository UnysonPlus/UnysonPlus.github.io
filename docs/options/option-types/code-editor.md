---
title: "Code Editor"
sidebar_position: 44
---

A syntax-highlighted code field (WordPress CodeMirror). The top-level `mode` key selects the language: `css`, `javascript`, `htmlmixed`, `php`, `json` or `xml`.

<img src="/img/options/opt-demo_code_editor.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_code_editor'               => [
		'label'       => __( 'Code Editor', 'unysonplus' ),
		'type'        => 'code-editor',
		'mode'        => 'css',
		'value'       => "selector {\n\tcolor: #2563eb;\n\tpadding: 2rem 0;\n}",
		'desc'        => __( 'Syntax-highlighted code field (WordPress CodeMirror). The top-level "mode" key selects the language: css, javascript, htmlmixed, php, json or xml.', 'unysonplus' ),
		'placeholder' => "/* Write CSS here */\nselector { … }",
	],
];
```
