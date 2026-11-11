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

- **New → Company** in the top bar, or **Add company** on **CRM → Companies**.
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
- **People**: everyone linked to it. **Add a person** creates a contact already linked to the company, or
  link an existing contact by email.
- **Deals**, **Tasks** and **Files**, like a contact's page.
- **Email** in the header writes to one of its people. See [One-to-one email](../sales/email-and-replies.md).

## Frequently asked questions

**Can a contact belong to more than one company?**
Yes. Link as many as you need; the first is their main company, shown in lists and on their page.

**What happens to the people when I delete a company?**
They stay. Moving a company to the bin hides it; its people keep their records, and deals keep their history.

**Can I turn the map off?**
Yes, with one line of PHP (a snippet or your theme's `functions.php`): `add_filter( 'fw_crm_show_maps', '__return_false' );`.
The map comes from Google, so turn it off if your privacy policy does not allow loading Google in the admin.
It shows only the company's own name and address, never a contact's.

**Do I have to use companies?**
No. If you sell to individuals, ignore companies entirely. Nothing requires them.
