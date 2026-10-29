---
sidebar_position: 9.6
title: "Who can edit SEO fields, and removing the extension"
sidebar_label: "Access and removal"
description: "Choose which user roles see and edit the SEO fields on posts and terms, and whether deleting the Unyson+ SEO extension deletes all of its data."
---

# Access and removal

**SEO → General → Access and removal** holds two site-wide choices.

<img src="/img/seo/seo-access.png" alt="The Access and removal box: role checkboxes for who can edit SEO fields, and the switch to delete all SEO data when the extension is deleted" width="1644" />

## Who can edit SEO fields

By default everyone who can edit a post can also edit its SEO title, description and the rest. On a
site with many writers you may want only editors to touch them.

Tick the roles that may edit SEO fields. Everyone else no longer sees:

- the **SEO** box on posts, pages and other content,
- the SEO fields on categories, tags and other terms,
- the **SEO** column in the content lists, or the SEO fields in **Quick Edit**.

Their saves cannot change the fields either, so a hidden field cannot be changed by a crafted
request.

- **Nothing ticked** means everyone who can edit the content. That is the default.
- **Administrators** can always edit SEO fields, whatever is ticked, so nobody can lock themselves out.
- This is about the per-page fields only. The **SEO** settings screen itself has always been for
  administrators.

## Deleting all SEO data with the extension

Deactivating the extension never deletes anything, and by default neither does deleting it from
**Extensions**: everything is kept in case you reinstall it, which is what most people deleting an
extension are about to do.

Switch on **Delete all SEO data when the extension is deleted** if you are leaving for good and want
a clean database. Then deleting the extension also removes:

| Removed | Where it was |
| --- | --- |
| Every SEO setting, including the Search Console connection | site options |
| Every title, description and other value written for a post or term | post and term data |
| The [redirects](./redirects.md) kept for old addresses | a site option |
| The [site search](./reports/site-search.md) log | its own database table |
| Index status, speed results and other report data | site options and post data |
| Generated [sharing card](./sharing-cards.md) images | `uploads/unysonplus/social-cards/` |
| Scheduled tasks | the WordPress scheduler |

It cannot be undone. Export your settings first with [Moving settings](./settings-transfer.md) if
there is any chance you will want them back. On a multisite network the setting is read site by site,
so only sites that switched it on lose their data.

:::note For extension developers
This uses a framework feature any extension can use: an `uninstall.php` in the extension's folder runs
just before the **Extensions** screen deletes it, even when the extension is inactive. See
[Extension uninstall.php](/developers/extension-uninstall).
:::
