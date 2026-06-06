---
sidebar_position: 2
title: Hooks & Filters
---

# Hooks &amp; Filters

Unyson+ exposes WordPress actions and filters so themes and extensions can extend the
framework.

:::tip Auto-generating this reference
Because hooks are defined in code with docblocks, you can auto-generate this page from the
plugin source using a tool like
[pronamic/wp-documentor](https://github.com/pronamic/wp-documentor) or
[wp-hooks-generator](https://github.com/johnbillion/wp-hooks-generator), then paste the
output here. The user-facing guide stays hand-written; only the reference is generated.
:::

## Examples

```php
<?php
// Filter the GitHub branch used to download an extension
add_filter( 'fw_ext_mngr_github_branch', function ( $branch, $user_repo ) {
    return 'main';
}, 10, 2 );

// Run code after the framework initializes
add_action( 'fw_init', function () {
    // ...
} );
```

:::note Work in progress
Replace these examples with the generated list of all actions and filters.
:::
