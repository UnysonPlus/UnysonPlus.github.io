---
title: "Framework"
sidebar_position: 2
---


The framework's manifest is located in `framework/manifest.php` and can be accessed like this:

```php
fw()->manifest->get('version');
```

It supports the following parameters:

```php
<?php if (!defined('FW')) die('Forbidden');

$manifest = array();

$manifest['name']         = __('Framework', 'fw');
$manifest['uri']          = 'http://example.com/framework';
$manifest['description']  = __('WordPress Framework', 'fw');
$manifest['version']      = '1.0';
$manifest['author']       = 'Unyson+';
$manifest['author_uri']   = 'http://example.com/';
$manifest['requirements'] = array(
    'wordpress' => array(
        'min_version' => '4.0',
        /*'max_version' => '4.99.9'*/
    ),
);
```
