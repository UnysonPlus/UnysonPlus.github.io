---
title: "Extension system & update hooks"
sidebar_position: 7
---

# Extension system & update hooks

Hooks from the **extension manager** and the **update** system: extension activation/discovery, the available-extensions registry, download sources, and the GitHub auto-updater.

A frequently-used one points the auto-updater at a different branch:

```php
add_filter( 'fw_ext_mngr_github_branch', function ( $branch, $user_repo ) {
    return 'main';
}, 10, 2 );
```

For how extensions are discovered, ordered by their requirements, and activated, see [The extension system](/docs/architecture/extension-system).

### Actions (16)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_after_plugin_activate:before_potential_redirect` | — | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_after_supported_extensions_install_success` | — | Fixes https://github.com/ThemeFuse/Unyson/issues/2330 (@since 2.6.14) |
| `fw_backend_add_custom_extensions_menu` | `$data` | Use this action if you what to add the extensions page in a custom place in menu Usage example http://pastebin.com/2iWVRPAU |
| `fw_extension_settings_form_render:` | — | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extension_settings_form_saved:` | `$options_before_save` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_activation_failed` | `$failed_extensions` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_after_activation` | `$succeeded_extensions` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_after_deactivation` | `$succeeded_extensions` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_before_activation` | `$extensions_for_activation` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_before_deactivation` | `$extensions_for_deactivation` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_before_init` | — | Extensions are about to activate. You can add subclasses to FW_Extension at this point. |
| `fw_extensions_deactivation_failed` | `$failed_extensions` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_init` | — | Extensions are activated Now $this->get_children() inside extensions is available |
| `fw_extensions_install` | `$result` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_extensions_uninstall` | `$result` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_register_ext_download_sources` | `$register` | Register download sources for extensions. Usage: $download_source = new FW_Ext_Download_Source(); $register->register($download_source); |

### Filters (15)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_after_switch_theme_activate_exts` | `true` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_backend_enable_custom_extensions_menu` | `true` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |
| `fw_custom_url_version` | `$set['remote'], $set` | _unysonplus/framework/extensions/update/extensions/custom-update/class-fw-extension-custom-update.php_ |
| `fw_ext_manager_settings_url` | `$url_set, $name ?? '', $ext` | Let an extension expose a custom Settings link on its card (e.g. one that points to a dedicated admin page instead of the built-in settings form). Return a URL to show the link, or '' to hide it. |
| `fw_ext_mngr_github_branch` | `'', $set['user_repo']` | Resolve the branch to download. Defaults to the repository's GitHub default branch; override via the filter if needed. |
| `fw_ext_update_extensions_complete_actions` | `$update_actions` | Filter the list of action links available following extensions update. @param array $update_actions Array of plugin action links. |
| `fw_ext_update_framework_complete_actions` | `$update_actions` | Filter the list of action links available following framework update. @param array $update_actions Array of plugin action links. |
| `fw_ext_update_github_branches` | `array('master', 'main'), $user_slash_repo` | _unysonplus/framework/extensions/update/extensions/github-update/class-fw-extension-github-update.php_ |
| `fw_ext_update_theme_complete_actions` | `$update_actions` | Filter the list of action links available following theme update. @param array $update_actions Array of plugin action links. |
| `fw_extensions_locations` | `[]` | { '/hello/world/extensions' => 'https://hello.com/world/extensions' } |
| `fw_extensions_locations_after` | `$locations` | (@since 2.6.9) |
| `fw_extensions_page_show_other_extensions` | `true` | _unysonplus/framework/core/components/extensions/manager/views/extensions-page.php_ |
| `fw_github_api_url` | `'https://api.github.com'` | _unysonplus/framework/core/components/extensions/manager/includes/download-source/types/class-fw-download-source-github.php_ |
| `fw_theme_available_extensions_file_path` | `fw_get_framework_customizations_dir_rel_path( '/theme/available-extensions.php' )` | Allow theme to register available extensions |
| `fw_tmp_dir` | `fw_fix_path(WP_CONTENT_DIR) .'/tmp'` | _unysonplus/framework/core/components/extensions/manager/class--fw-extensions-manager.php_ |

