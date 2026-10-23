---
sidebar_position: 1.5
title: "The CRM extension API: fw_crm(), events, integrations and custom objects"
sidebar_label: "Extension API (fw_crm)"
description: "Build on the Unyson+ WordPress CRM from your own plugin: the versioned fw_crm() API for contacts, tags, lists, segments, deals and the timeline, one events stream for every change, an integrations registry, purchase summaries, membership events, custom objects and Home widgets."
keywords: [wordpress crm api, fw_crm, crm php api plugin, crm integration wordpress, custom objects crm, crm events hook, wordpress crm developer]
---

# Extension API

Everything another plugin needs goes through one entry point, `fw_crm()`. The CRM's tables are private and may
change; this API keeps its shape within a major version.

```php
if ( function_exists( 'fw_crm' ) && fw_crm() ) {
	$id = fw_crm()->upsert_contact( 'ana@example.com', array( 'first_name' => 'Ana' ) );
	fw_crm()->tag( $id, 'webinar-2026', 'my-plugin' );
	fw_crm()->log( $id, 'note', 'Booked a consultation' );
}
```

`fw_crm()` returns `null` while the CRM is not active. `fw_crm()->version()` is `1.0`. Methods return plain
arrays, ids and booleans, or a `WP_Error`. Nothing checks the current user's permissions: your code decides who
may do what.

## Methods

| Area | Methods |
|---|---|
| Contacts | `contact( $id_or_email )`, `create_contact( $data )`, `update_contact( $id, $data )`, `upsert_contact( $email, $data, $only_empty = true )`, `trash_contact( $id )`, `fields( $id )`, `set_fields( $id, $values )`, `add_field( $def, $managed_by )` |
| Tags, lists, segments | `tag( $id, $tags, $source )`, `untag()`, `has_tag( $id, $tags, 'any'|'all'|'none' )`, `tags( $id )`, `add_to_list( $id, $slug )`, `remove_from_list()`, `in_list()`, `in_segment( $id, $id_or_slug )` |
| Users | `user_contact( $user_id, $create = false )`, `user_can_access( $user_id, array( 'tags' => …, 'lists' => …, 'segment' => …, 'match' => 'any' ) )`, `membership_event( $who, $event, $data )` |
| Companies, deals | `company()`, `create_company()`, `update_company()`, `link_company( $contact, $company )`, `deal()`, `create_deal()`, `update_deal()`, `move_deal( $id, $stage_id )` |
| Timeline and activity | `log( $id, $type, $title, $body = '', $object = 'contact' )`, `track( $id, $event, $args )`, `create_task( $data )` |
| Scores and purchases | `score( $id, $score )`, `add_points( $id, $points, $reason )`, `set_summary( $id, $provider, $data )`, `summary( $id, $provider = null )` |
| Extending | `register_integration()`, `register_object()`, `objects()`, `add_widget()`, `emit()`, `has_module( $module )` |

`add_to_list()` is not a newsletter signup: no consent or double opt-in is implied. Use the CRM's own forms or
`FW_CRM_Service::subscribe()` for that.

## One stream of events

Every change fires `unysonplus_crm_event` with the same payload, so one listener sees everything:

```php
add_action( 'unysonplus_crm_event', function ( array $e ) {
	// $e['event']        e.g. contact.tagged, deal.won, email.clicked, membership.renewed
	// $e['contact_id']   0 when the event is not about one contact
	// $e['object_type']  contact, company, deal, task, case, campaign, automation, or a custom object type
	// $e['object_id']
	// $e['data']         plain values, documented per event
	// $e['occurred_at']  site time
} );
// Or one event only: unysonplus_crm_event_contact_tagged, unysonplus_crm_event_deal_won, …
```

`FW_CRM_Events::catalogue()` lists every event with its data. Contacts: created, updated, deleted, merged, tagged,
untagged, list_joined, list_left, subscribed, unsubscribed, user_linked, user_unlinked, score_changed, did (any
recorded event); form.submitted; company.created / updated; task.created / completed; deal.created /
stage_changed / won / lost; case.created / status_changed; email.opened / clicked / bounced / complained /
received; automation.started / finished; commerce.updated; membership.joined / trial_started / renewed /
payment_failed / plan_changed / expired / cancelled; object.created / updated; and WooCommerce's order placed,
refunded and cart abandoned.

## Integrations

Register once and your extension's pieces appear across the CRM, and the Modules screen lists it under
**Connected extensions**:

```php
add_action( 'init', function () {
	if ( ! function_exists( 'fw_crm' ) || ! fw_crm() ) {
		return;
	}
	fw_crm()->register_integration( 'bookings', array(
		'label'          => 'Bookings',
		'description'    => 'Appointments become contact activity.',
		'icon'           => 'dashicons-calendar',
		'active'         => function () { return class_exists( 'My_Bookings' ); },
		'triggers'       => array( 'bookings.booked' => array( 'label' => 'Booking made', 'fields' => array() ) ),
		'actions'        => array( 'bookings.cancel' => array( 'label' => 'Cancel the booking', 'settings' => array(), 'callback' => 'my_cancel' ) ),
		'fields'         => array( array( 'key' => 'last_booking', 'label' => 'Last booking', 'type' => 'date' ) ),
		'activity_types' => array( 'booking' => array( 'label' => 'Booking', 'icon' => 'dashicons-calendar' ) ),
		'events'         => array( 'bookings.booked' => array( 'label' => 'Booking made', 'data' => array( 'service' => 'string' ) ) ),
		'widgets'        => array( 'bookings_today' => array( 'title' => 'Bookings today', 'callback' => 'my_card' ) ),
		'objects'        => array( 'booking' => array( 'label' => 'Booking', 'plural' => 'Bookings' ) ),
	) );
}, 5 );
```

Triggers and actions use the [automation registration](./php-api-and-hooks.md) shape. Fields are created once as
**managed** contact fields: read-only in the CRM's own edit form, written with `set_fields()`. Fire your events
with `fw_crm()->emit( 'bookings.booked', $contact_id, array( 'service' => 'Colour' ) )`, and start automations with
`do_action( 'unysonplus_crm_automation_event', 'bookings.booked', $contact_id, $context )`.

## Purchase summaries

A store or membership keeps one summary per contact, so segments and automations can use orders and spending
without reading your tables:

```php
fw_crm()->set_summary( $contact_id, 'myshop', array(
	'orders' => 3, 'total' => 240.50, 'currency' => 'EUR', 'products' => array( 12, 40 ),
	'last_order_at' => '2026-10-20 14:00:00',
) );
```

The contact's lifetime value becomes the sum of every provider's total. Segments gain *Number of orders*, *Total
spent*, *Last order* and *Bought product*; automation conditions gain orders and total spent. A **Purchases**
panel appears on the contact page.

## Users and membership

A contact is linked to a WordPress user only when someone has to log in: `user_contact( $user_id, true )` finds
the contact by the account's email (or creates one) and links it. `user_can_access()` checks tags, lists and
segments for an access rule. A deleted user is unlinked; the contact and its history stay.

A membership plugin reports what happens with `membership_event( $user_or_contact, 'joined', array( 'plan_name'
=> 'Gold', 'total' => 30 ) )`: it becomes the `membership.joined` automation trigger, a catalogue event, a
history event and the contact's membership summary (plan, status, amount paid). The Unyson+ Membership extension
does this already.

## Custom objects

Register new record types with fields, links to contacts, companies and deals, a timeline and permissions:

```php
add_action( 'unysonplus_crm_register_objects', function () {
	fw_crm()->register_object( 'property', array(
		'label'      => 'Property',
		'plural'     => 'Properties',
		'icon'       => 'dashicons-admin-home',
		'statuses'   => array( 'available' => 'Available', 'sold' => 'Sold' ),
		'relates'    => array( 'contact', 'deal' ),
		'capability' => 'edit_posts',
	) );
} );

$objects = fw_crm()->objects(); // FW_CRM_Objects
$id = $objects::create( 'property', array(
	'title'  => '12 Elm Street',
	'fields' => array( 'bedrooms' => 3 ),
	'links'  => array( array( 'contact', $contact_id, 'buyer' ) ),
) );
$objects::update( $id, array( 'status' => 'sold' ) );
$objects::query( 'property', array( 'related' => array( 'contact', $contact_id ) ) );
```

Define a record type's fields with `fw_crm()->add_field( array( 'object' => 'property', 'key' => 'bedrooms',
'label' => 'Bedrooms', 'type' => 'number' ) )`. Type names are up to 30 characters, and the built-in names
(contact, company, deal, task, case…) are reserved. Each contact, company or deal page shows a panel of its linked
records; filter `unysonplus_crm_object_url` to link them to your own screen. A built-in admin screen per type
comes later.

## Home widgets

```php
fw_crm()->add_widget( 'bookings_today', array(
	'title'    => 'Bookings today',
	'callback' => function () { echo '…'; },
	'column'   => 'side',  // or 'main'
	'priority' => 30,
	'cap'      => 'manage_options', // optional
) );
```

Widgets join Home's cards, so people can show, hide and reorder them like the built-in ones.
