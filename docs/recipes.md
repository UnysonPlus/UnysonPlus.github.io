---
title: Recipes
sidebar_position: 4
---

# Recipes

Short, practical how-tos for common tasks. Each is self-contained, do it in a few minutes, no code
unless noted. New to the builder? Start with [Build your first page](/docs/getting-started/build-your-first-page).

## Build a call-to-action section

A full-width band with a heading, a line of text, and a button.

1. Edit a page and open the **Unyson Builder**.
2. Drag a **Section** onto the canvas (Layout Elements). Open its options and set a background
   (Layout → Background), a color, gradient, or image.
3. Inside the section, drop a **Call To Action** element (Content Elements), it bundles a title,
   text, and a button in one block. (Or compose it yourself with **Special Heading** + **Text Block**
   + **Button**.)
4. Fill in the title, supporting text, and the button label + link.
5. **Update**, then view the page.

:::tip Reuse it everywhere
If you'll use this CTA on several pages, build it once as a [Snippet](#create-a-reusable-snippet) and
embed it, so editing it once updates every page.
:::

## Show a custom field on your pages

Add an editable "Subtitle" field to pages and display it.

1. Activate **Custom Fields** (Unyson+ → Extensions).
2. **Unyson+ → Custom Fields → Add Field Group**. Name it "Page extras" and set **Show on post
   types → Page**.
3. Add a field: label **Subtitle**, name `subtitle`, type **Text**. Save.
4. Edit any page, you'll see a **Subtitle** field in a meta box. Fill it in.
5. Display it. Two options:

   **In a builder text field** (no code) using [Dynamic Content](/docs/dynamic-content):
   ```text
   {{post_meta|key=subtitle|fallback=}}
   ```

   **In a theme template** (PHP):
   ```php
   $subtitle = fw_get_field( 'subtitle' );
   if ( $subtitle ) {
       echo '<p class="page-subtitle">' . esc_html( $subtitle ) . '</p>';
   }
   ```

See [Custom Fields](/docs/extensions/custom-fields).

## Create a reusable Snippet

Build a block once and embed it anywhere; edit it in one place.

1. Activate **Snippets** (Unyson+ → Extensions).
2. **Snippets → Add New**, give it a title, and build its content with the Page Builder (a CTA, a
   stats band, contact details, …).
3. Choose **Template Kind → Block** and **Publish**. The editor shows its embed shortcode.
4. Embed it: drop the **Snippet** element into any column, or paste the shortcode anywhere:
   ```text
   [snippet id="123"]
   ```
5. Edit the snippet once, every page that embeds it updates automatically.

For reusing a whole **Section** or **Column** at the page root, set the snippet's kind to Section or
Column and insert it from the Page Builder's Templates manager. See
[Snippets](/docs/extensions/snippets) and [Global Templates](/docs/extensions/global-templates).

## Build a sticky site header

Design a global header with the Theme Builder and make it stick on scroll.

1. Install **Theme Builder** (Unyson+ → Extensions → it shows a Download card), then open the new
   **Theme Builder** menu.
2. **Header Presets → Add New**. Build the header with the page builder using the Header/Footer
   elements (Site Logo, Navigation Menu, Site Search, Social Icons, Menu Toggle).
3. In the **Header Type & Behavior** box, set **Scroll Behavior → Sticky** (or *Sticky + Shrink*).
   **Publish**.
4. **Theme Builder → Add Template**. Set its **Header** slot to your new preset, leave Body/Footer to
   *Inherit/None*.
5. Set **Used On** (e.g. *Entire site*, via a default/all rule) and save.

Now the header renders site-wide and sticks on scroll. When no template matches a page, your Theme
Settings header is the fallback. See [Theme Builder](/docs/extensions/theme-builder).

## Add a dynamic copyright year to the footer

A footer line that always shows the current year, no yearly edits.

1. Edit your footer, either the **Footer** copyright field in **Theme Settings → Footer**, or a
   **Text Block** inside a Theme Builder **Footer Preset**.
2. Type the line using a [Dynamic Content](/docs/dynamic-content) token:
   ```text
   © {{copyright_year}} {{site_name}}. All rights reserved.
   ```
3. Save. It renders as `© 2026 Your Site. All rights reserved.` and rolls over on its own each year.

`{{site_name}}` pulls the WordPress Site Title, so the line also stays correct if you rename the site.

## More

These cover the common cases; the rest of the manual goes deeper:

- [Page Builder](/docs/page-builder) · [Elements](/docs/shortcodes/overview)
- [The Theme](/docs/theme) · [Theme Builder](/docs/extensions/theme-builder)
- [Dynamic Content](/docs/dynamic-content) · [Extensions](/docs/extensions/overview)
- Stuck on something? [Troubleshooting & FAQ](/docs/troubleshooting).
