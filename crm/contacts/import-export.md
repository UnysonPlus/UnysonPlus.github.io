---
sidebar_position: 5
title: "Import contacts from CSV into the WordPress CRM"
sidebar_label: "Import and export"
description: "Import contacts into the Unyson+ WordPress CRM from a CSV file with column mapping, a dry run and one-click undo, and export contacts or a segment to CSV."
keywords: [import contacts wordpress, csv import crm, import contacts from csv, export contacts csv wordpress, undo import, migrate crm to wordpress, contact import mapping]
---

# Import and export

Bring your contacts in from a spreadsheet or another CRM, and take them out again whenever you like. Imports
are checked before anything is saved, run in the background, and can be undone.

<img src="/img/crm/import-export.png" alt="The Import / Export screen in the WordPress CRM" width="1920" />

## Import contacts from a CSV file

1. Open **CRM → Import / Export** (under Data; CRM managers) and upload a `.csv` file (a spreadsheet saved as
   CSV, with a header row). **Import CSV** on the contacts list and **New → Import from CSV** open the same
   screen.
2. **Map the columns.** Each column is matched to a CRM field from its header: full name or first and last
   name, email, phone, job title, company (by name, created if new), lifecycle stage, address, source,
   lists, tags and every contact [custom field](./custom-fields.md). Change anything it guessed wrong, or
   choose **Do not import** for a column. The mapping is remembered for the next file with the same columns.
   Several lists or tags in one cell are separated by commas, semicolons or `|`; a list that does not exist
   yet is created.
3. **Choose what happens to existing contacts.** A row matches an existing contact by email, or by phone when
   there is no email. Choose to **fill in** empty details only, **update** them, or **skip** existing contacts.
4. **Add everyone to lists or tags** if you like.
5. **Check first (saves nothing).** A dry run reads the file without saving and reports how many contacts
   would be created, updated and left as they are, and why any row would be skipped (no email, phone or name;
   already a contact; the contact is in the bin). A very large file is checked for about 20 seconds, and the
   result says how many rows that covered.
6. **Import now.** The import runs in chunks and carries on in the background if you close the tab. **Stop**
   ends it early; what it already imported is kept and can still be undone.

### Consent and imports

Nobody imported is subscribed to your emails unless you confirm that everyone in the file agreed. If you do,
that confirmation is recorded in each person's consent log. People who unsubscribed or left a list are not
put back unless you explicitly choose to.

### Undo an import

Every import appears under **Past imports**, with who ran it, when, its result and its status. **Undo**
removes the contacts it created, puts back the details it changed, and removes the lists, tags, consent
records and company links it added.

## Export contacts

On **Import / Export**, under **Export contacts**, pick **Everyone** or a [segment](./lists-tags-segments.md)
and click **Download CSV**. On the contacts list, **Export these (CSV)** downloads exactly what the current
filter shows. Both are for CRM managers.

The file (`contacts-<date>.csv`, UTF-8, opens cleanly in Excel) has email, first and last name, phone, job
title, main company, stage, owner, address, email status, lists, tags, source, signup page and IP, the dates
added, confirmed and unsubscribed, and every contact custom field. Import it again and its columns are matched
automatically. Owner, email status, signup page, IP and the dates are for reading only: an import does not
set them, so importing an export again never changes anyone's email status by itself.

Only contacts are imported and exported here. Companies and deals have no CSV import or export yet.

## Frequently asked questions

**How big a file can I import?**
Large files are fine: the import works through the file in small chunks, so it never hits your host's time
limit.

**Can I move from another CRM?**
Yes. Export your contacts from it as CSV and map the columns here. Custom fields you need should be added
first, so they appear in the mapping.

**What if I import the wrong file?**
Undo it from **Past imports**.
