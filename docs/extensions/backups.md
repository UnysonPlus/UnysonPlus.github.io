---
title: Backup & Demo Content
---

# Backup & Demo Content

The **Backup & Demo Content** extension creates full or content-only archives of your site — on a
schedule or on demand — restores them, and packages **demo content** so a theme can ship a
ready-made starter site. Because a restore rewrites the site URL as it imports, the same archives
double as a **site-migration** tool: back up on one server, restore on another.

Enable it under **Unyson+ → Extensions → Backup & Demo Content**, then open **Unyson+ → Backup**.

## Backup types

- **Full Backup** — themes, plugins, uploads and the full database. A complete, self-contained copy
  of the site.
- **Content Backup** — uploads and the database **without private data** (users, admin email, secret
  keys). Ideal for moving *content* between sites that already share the same theme and plugins, and
  for building demo-content archives.

## Creating a backup

On the **Backup** page:

- **Create Full Backup Now** / **Create Content Backup Now** — runs immediately and drops a `.zip`
  into the **Archives** list.
- **Edit Backup Schedule** — automated recurring backups (hourly / daily / weekly) with a retention
  count, so old archives are pruned automatically.
- **Selective Backup & Cleanup** — exclude **Plugins**, **Themes** or **Uploads** from full backups
  (handy for trimming a migration archive down to just what the destination doesn't already have),
  and set how many recent archives to keep.

Each archive holds the database as `database.json.txt` plus a files tree; the Archives list shows the
date and the type (Full / Content).

## Migrating a site

The extension is a practical way to move a site between hosts:

1. **On the source site**, create a backup. Moving to a server that already has the theme + plugin
   installed? A **Content backup** is smallest and sufficient. For a bare destination, use a **Full**
   (or selective) backup.
2. Download the `.zip` (or grab it straight from `wp-content/fw-backup/`).
3. **On the destination**, install WordPress + Unyson+ (the plugin and this extension), then open
   **Unyson+ → Backup → Upload a Backup**, choose the `.zip`, and **Restore** it.
4. The restore imports the files and database and **rewrites the old site URL to the new one** —
   safely, walking serialized data so page-builder content is never corrupted.

After restoring, open a couple of pages and confirm nothing still points at the old domain.

:::tip Restore without uploading
The extension lists **any** `.zip` placed in `wp-content/fw-backup/`. If a backup is too large for
your host's upload limit, copy it there with SFTP or cPanel File Manager and it appears under
**Archives**, ready to Restore — no browser upload involved.
:::

## Demo content

A theme can bundle a **demo-content archive** so activating it offers a one-click starter site:
create a Content backup, register it as the theme's demo content, and users import it from
**Unyson+ → Demo Content Install**. This is how a theme ships the "looks like the live preview"
content its users expect.

## Requirements

Backups (especially Full) move a lot of data, so give PHP enough headroom. Recommended `php.ini`
values:

```ini
upload_max_filesize = 128M
post_max_size = 128M
max_input_time = 9000
max_execution_time = 300
memory_limit = 256M
```

On cPanel, set these in **MultiPHP INI Editor**, or add them to a **`.user.ini`** file in the site
root (LiteSpeed's lsphp reads it; allow a few minutes for the change to take effect).

## Troubleshooting

### "Ajax error — Bad Request" when uploading a backup

The archive is larger than your server's **`upload_max_filesize`** / **`post_max_size`** (or a
web-server request-body cap). Do one of:

- **Raise the limits** (see [Requirements](#requirements) above), or
- **Upload a smaller Content backup** instead of a Full one, or
- **Skip the upload entirely** — drop the `.zip` into `wp-content/fw-backup/` via SFTP / File
  Manager; the extension lists it automatically under **Archives**.

### LiteSpeed web server

If your host runs **LiteSpeed**, the extension shows a heads-up notice, because LiteSpeed can
**abort long-running background requests** — exactly what a backup relies on — so a backup may stall
or fail partway through.

1. Add this line to your site's **`.htaccess`** (above the `# BEGIN WordPress` block) so LiteSpeed
   doesn't kill the request when the browser disconnects:

   ```apache
   RewriteRule .* - [E=noabort:1]
   ```

2. If backups still stall, have WordPress run cron on real page loads instead of a background
   request, by adding to **`wp-config.php`**:

   ```php
   define( 'ALTERNATE_WP_CRON', true );
   ```

If it still won't finish after both changes, your host may cap requests tighter than a backup needs —
ask them to raise the PHP limits above, or use the **File Manager** restore path described in the tip
under [Migrating a site](#migrating-a-site).
