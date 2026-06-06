---
sidebar_position: 1
title: Option Types
---

# Option Types

Option types are the building blocks of Unyson+ settings, meta boxes, and shortcode
options. The framework ships with many — text, textarea, select, switch, color, typography,
image/upload, gallery, spacing, gradient, box-shadow, and more.

## Defining options

Options are declared as a PHP array:

```php
<?php
$options = array(
    'heading' => array(
        'type'  => 'text',
        'label' => __( 'Heading', 'fw' ),
        'value' => 'Hello world',
    ),
    'accent' => array(
        'type'  => 'color-picker',
        'label' => __( 'Accent color', 'fw' ),
        'value' => '#ffcc00',
    ),
);
```

## Reading saved values

```php
<?php
// Theme settings
$accent = fw_get_db_settings_option( 'accent' );

// Post meta (e.g. from a Custom Fields group or a meta box)
$heading = fw_get_field( 'heading' );
```

## Adding a new option type

New option types live in `framework/includes/option-types/`. Each registers a class
extending `FW_Option_Type`. See the existing option types in the plugin source for working
examples, and the per-area `AGENTS.md` notes for conventions.

:::note Work in progress
Expand this into a full reference of each option type and its parameters.
:::
