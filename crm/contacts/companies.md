---
sidebar_position: 2
title: "Companies in the WordPress CRM"
sidebar_label: "Companies"
description: "Track the businesses you work with in the Unyson+ WordPress CRM: company records with their people, deals, tasks, files and a shared timeline."
keywords: [wordpress crm companies, b2b crm wordpress, account management wordpress, company records, organisations crm, link contacts to companies]
---

# Companies

A company record groups the people you deal with at one business, and the deals, tasks, files and history
that belong to it. Contacts can work at several companies, with one marked as their main company.

Companies is a module: switch it on under [CRM → Modules](../workspace/settings-and-modules.md) if you sell to businesses.

<img src="/img/crm/company-page.png" alt="A company page in the WordPress CRM with its details, timeline, people and deals" width="1920" />

## Add a company

- **New → Company** in the top bar, or **New company** on **CRM → Companies**.
- Or from a contact's page: in **Companies**, pick an existing company or type a new name and click **Link**.

A company has a name (required), website and domain, phone, email, industry, size, address, an owner and any
[custom fields](./custom-fields.md) you add for companies.

## The company page

- **About**: the company's details. Click **Edit** to change them.
  - Web addresses (the website and any URL custom field) are links that open in a new tab, so the company
    page stays open. Long addresses are shortened to the site and path; a Google Maps link reads
    **Open in Google Maps**.
  - When the company has an address, a small Google map of it shows under the details. Its **Open in Maps**
    button opens the place in Google Maps. The map loads only when you scroll to it.
- **Timeline**: notes and everything that happened with the company, including its deals.
- **People**: everyone linked to it. **Add a person** in the header creates a contact already linked to the
  company; or type the email of an existing contact under People and click **Link**.
- **Deals**, **Tasks** and **Files**, like a contact's page.
- **Email** in the header writes to one of its people. See [One-to-one email](../sales/email-and-replies.md).

## Company logos

Each company shows its logo instead of its initials: in the Companies list, on the company page, on the pages
of its people and in search. A company with no logo keeps its coloured initials.

<img src="/img/crm/company-logos-list.png" alt="The Companies list in the WordPress CRM with each company's logo next to its name, and initials for a company without one" width="1644" />

### Where the logos come from

- **Automatically, from the company's own website.** When you add a company with a website (by hand, by
  import, from a form or through the API), the CRM visits that website once, takes the icon the site gives
  itself for phones and browser tabs (its *apple-touch-icon*, else its largest favicon), and keeps a copy in
  `wp-content/uploads/unysonplus/crm-logos/`. It shows from there afterwards; the website is not asked again.
- **Uploaded by you.** On the company page, click **Logo** and upload a picture.
- **Fetched in the background.** Logos are fetched a few companies at a time, after the page has loaded, so
  adding or importing hundreds of companies is not slowed down. They appear in the list as they arrive.

The CRM asks only the company's own website. It never sends your company list to a logo service such as
Google's favicon service, which would learn every company in your CRM each time it was opened.

### The Logo menu on a company page

<img src="/img/crm/company-logo-menu.png" alt="A company page in the WordPress CRM with the Logo menu open: upload a different logo, get it from their website, remove the logo" width="1644" />

- **Upload a logo** (or **Upload a different logo**): PNG, JPG, GIF or WebP, under 2 MB. A square picture
  looks best; it is scaled down to 128 × 128 pixels and shown on a white tile.
- **Get it from their website**: fetch it now, while you wait (a few seconds). Use it after the company's
  website changed its logo, or to replace an upload. When the site gives nothing usable, the message says so
  and the current logo stays.
- **Remove the logo**: back to the initials. A removed logo is never fetched again automatically; choose
  **Get it from their website** or upload one to bring a logo back.

### Get missing logos

**CRM → Companies → Get missing logos** (CRM managers) looks for the logo of every company that has a website
and no logo yet: companies added before logos existed, and companies whose site did not answer the first
time. While it works, the button reads *Getting N logos in the background…*.

### When the website changes

A logo that was **fetched** is fetched again when you change the company's website. A logo you **uploaded**
stays, whatever the website, until you change or remove it.

## Frequently asked questions

**Can a contact belong to more than one company?**
Yes. Link as many as you need; the first is their main company, shown in lists and on their page. Unlink the
main one (the cross next to it) and another linked company becomes the main one.

**What happens to the people when I delete a company?**
They stay. Moving a company to the bin hides it; its people keep their records, and deals keep their history.

**Can I turn the map off?**
Yes, with one line of PHP (a snippet or your theme's `functions.php`): `add_filter( 'fw_crm_show_maps', '__return_false' );`.
The map comes from Google, so turn it off if your privacy policy does not allow loading Google in the admin.
It shows only the company's own name and address, never a contact's.

**Why does a company still show its initials?**
It has no website in its details, its website blocks automated visits (some sites answer every visitor that
is not a browser with a security check), or the site's only icon is too small to look good (under 32 pixels)
or an SVG file, which the CRM does not store because it can carry scripts. Upload a logo for it instead.

**Where are the logo files, and do they leave my site?**
In `wp-content/uploads/unysonplus/crm-logos/`, one small file per company. They are deleted with the company
when it is deleted for good. The REST API and webhooks include each company's `logo` address.

**Do I have to use companies?**
No. If you sell to individuals, ignore companies entirely. Nothing requires them.
