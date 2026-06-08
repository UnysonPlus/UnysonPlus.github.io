---
title: "Theme"
sidebar_position: 2
---


The Theme component makes the connection between the theme and the framework. The working directory is `framework-customizations/theme/` within child and parent themes.

- `get_options($name)` - return options array from specified option file `framework-customizations/theme/options/{$name}.php`.

  > ``` php
  > $custom_options = fw()->theme->get_options('custom');
  > ```

- `get_settings_options()` - return options array from `framework-customizations/theme/options/settings.php`.

  > ``` php
  > $settings_options = fw()->theme->get_settings_options();
  > ```

- `get_customizer_options()` - return options array from `framework-customizations/theme/options/customizer.php`.

  > ``` php
  > $customizer_options = fw()->theme->get_customizer_options();
  > ```

- `get_post_options($post_type)` - return options array from `framework-customizations/theme/options/posts/{$post_type}.php`.

  > ``` php
  > $custom_post_options = fw()->theme->get_post_options('custom_post');
  > ```

- `get_taxonomy_options($taxonomy)` - return options array from `framework-customizations/theme/options/taxonomies/{$post_type}.php`.

  > ``` php
  > $category_options = fw()->theme->get_taxonomy_options('category');
  > ```

- `get_config($key = null)` - return entire config array from `framework-customizations/theme/config.php` or only specified key.

  > ``` php
  > $backlisted_extensions = fw()->theme->get_config('extensions_blacklist');
  > ```

- `locate_path($rel_path)` - search full path of the file by a given relative path. Will search in the **child theme** then in the **parent theme**.

  > ``` php
  > echo fw()->theme->locate_path('/custom.php');
  >
  > // prints '/.../wp-content/themes/scratch-theme/framework-customizations/theme/custom.php'
  > ```
