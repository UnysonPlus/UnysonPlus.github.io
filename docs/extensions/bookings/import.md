---
title: "Import bookings into WordPress from a spreadsheet or another booking plugin"
sidebar_label: "Import"
sidebar_position: 5
description: "Move rooms, bookings, owner blocks and other channels' calendars into Unyson+ Bookings: from a CSV file, or from another booking plugin through an import source. Check first, and import again safely."
keywords: [import bookings wordpress, migrate booking plugin wordpress, csv import reservations wordpress, move rental bookings wordpress, booking plugin migration]
---

# Import bookings

**Bookings → Import** brings existing bookings into Bookings, so moving over doesn't mean typing them in again. You
need to be a site administrator to use it.

Every import has two buttons:

- **Check only** reads everything and tells you what would be added, without writing anything;
- **Import** adds it.

<img src="/img/extensions/bookings/import.png" alt="Bookings → Import with the spreadsheet (CSV) source" width="800" />

Importing again later is safe: what was already imported is recognised and skipped, and only new rows are added. That
lets you import once to try, and again just before you switch over.

## From a spreadsheet (CSV)

Export your bookings as a CSV file with a header row. These columns are read:

| Column | What goes in it |
|---|---|
| `bookable` | The room, rental or service. An existing bookable with that exact title is used; otherwise one is created. |
| `start`, `end` | For a stay: the check-in and check-out dates (`2027-02-05`). For an appointment: date and time (`2027-02-06 09:00`). |
| `guests` | How many guests. |
| `name`, `email`, `phone` | The guest. |
| `status` | `confirmed` (the default), `pending`, `declined`, `cancelled`, or `block` for dates you closed yourself. |
| `total` | The price, without the currency sign. |
| `notes` | Anything else about the booking. |
| `ref` | The booking's reference in the old system. Kept as the reference when it is free, and used to recognise the row on a second import. |

```
bookable,start,end,guests,name,email,phone,status,total,notes,ref
Lake Cabin,2027-02-05,2027-02-09,2,Ana Lopes,ana@example.com,,confirmed,640,Late arrival,OLD-1001
Lake Cabin,2027-03-01,2027-03-04,,,,,block,,Owner stay,
Yoga Class,2027-02-06 09:00,2027-02-06 10:00,1,Cy Ray,cy@example.com,,confirmed,20,,OLD-2001
```

A bookable created from a CSV is booked by the night when its dates have no time, and by time slot when they do. Set
its prices and rules under **Bookings → Bookables** afterwards.

A row that can't be imported, such as a check-out before its check-in, is left out and listed after the import with
its row number.

## What imported bookings look like

- They keep their dates, status, guest, total and reference, and their source shows as imported.
- Confirmed bookings and blocks take their dates straight away, so those dates are no longer offered.
- They are not checked for overlaps: they already happened in the old system, so two that overlap stay as they were,
  for you to look at.
- Nobody is emailed when they are imported.

## From another booking plugin

A site moving off its own booking plugin can get an **import source** for it: a small add-on that reads the old
plugin's rooms, bookings, owner blocks and calendar addresses, and appears as its own card under **Bookings → Import**.
It is specific to that site and is removed once the move is done.

The other channels' calendar addresses it brings over are added to the bookable's **Import calendars**, so nights
booked elsewhere keep being blocked.

### For developers: writing an import source

Register a source on the `fw_ext_bookings_import_sources` filter. Its `package` callback returns plain arrays:

```php
add_filter( 'fw_ext_bookings_import_sources', function ( $sources ) {
	$sources['my-old-plugin'] = array(
		'label'       => 'My old booking plugin',
		'description' => 'Its rooms, bookings and calendars.',
		'available'   => function () { return post_type_exists( 'my_booking' ); },
		'package'     => function () {
			return array(
				'bookables' => array(
					array( 'key' => 'villa', 'title' => 'The Villa', 'settings' => array( 'mode' => 'nights', 'base_rate' => 350, 'min_nights' => 3 ) ),
				),
				'bookings'  => array(
					array( 'bookable' => 'villa', 'status' => 'confirmed', 'start_at' => '2027-07-02 00:00:00', 'end_at' => '2027-07-06 00:00:00',
						'guests' => 4, 'name' => 'Dee', 'email' => 'dee@example.com', 'total' => 2300, 'paid' => 500, 'ref' => 'OLD-9' ),
				),
				'calendars' => array(
					array( 'bookable' => 'villa', 'urls' => array( 'https://example.com/calendar.ics' ) ),
				),
			);
		},
	);
	return $sources;
} );
```

- `settings` takes any bookable setting (`mode`, `base_rate`, `seasons`, `cleaning`, `deposit`, `min_nights`,
  `weekend_rate`, `extras` and the rest). Missing ones get their defaults.
- A booking's `kind` is `booking` (default) or `block`. Times are site-local `Y-m-d H:i:s`; for a stay, both are
  midnight (check-in day and check-out day).
- `FW_Bookings_Import::import( $source, $package, $dry )` runs the same engine from code or WP-CLI.
