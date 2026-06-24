---
title: Create a custom post type without code
description: Register a custom post type and taxonomy from the WordPress admin with the Unyson+ Post Types extension, no code.
---

# Create a custom post type without code

Need a "Projects", "Team", or "Events" content type separate from posts and pages? The **Post Types &
Taxonomies** extension registers them from the admin, no `register_post_type()` code.

## Create the post type

1. Activate **Post Types &amp; Taxonomies** (Unyson+ → Extensions).
2. Go to **Unyson+ → Post Types → Add a Post Type**.
3. Set the **Singular** and **Plural** labels (e.g. "Project" / "Projects"), a **key/slug**, and the
   **supported features** (title, editor, thumbnail, …). Choose whether it's **public**, has an
   **archive**, is **hierarchical** (page-like), and shows in the **REST API**. Pick a menu icon.
4. Save, your new post type appears in the admin menu and registers on each request.

## Add a taxonomy (optional)

Add a taxonomy (like Categories or Tags), set its labels and whether it's hierarchical, and attach it
to your post type(s).

## Add fields to it

Pair it with [Custom Fields](./display-custom-field.md): create a field group and target your new
post type to add structured fields (client, date, gallery, …).

## Show them on a page

Use the **Posts** element in the page builder with your post type selected to display a grid/list of
them, or build a dedicated archive with a [Theme Builder body template](./custom-404-page.md).

## See also

- [Post Types &amp; Taxonomies](/docs/extensions/post-types)
- [Custom Fields](/docs/extensions/custom-fields)
