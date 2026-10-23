---
sidebar_position: 2
title: "CRM PHP API, hooks and filters for WordPress developers"
sidebar_label: "PHP API and hooks"
description: "Extend the Unyson+ WordPress CRM from your plugin: contacts and tag checks, timeline entries, panels, Home cards, calendar items and automations."
keywords: [wordpress crm hooks, crm php api, extend wordpress crm, crm actions filters, crm integration wordpress plugin, wordpress crm developer]
---

# PHP API and hooks

Other extensions build on the CRM through its PHP classes and WordPress hooks, never its database tables.
Check that the CRM is active first, and for a part that belongs to a module, that the module is on
(`FW_CRM_Modules::enabled( 'pipeline' )`):

```php
if ( function_exists( 'fw_ext' ) && fw_ext( 'crm' ) && class_exists( 'FW_CRM_Contacts' ) ) {
	// The CRM is available.
}
```

## Contacts and access checks

```php
// The contact for a WordPress user (array, or null).
$contact = FW_CRM_Contacts::find_by_user( $user_id );

// Create one, or link an existing contact to a user.
$id = FW_CRM_Contacts::create( array( 'email' => 'sam@example.com', 'first_name' => 'Sam' ) );
FW_CRM_Contacts::link_user( $id, $user_id );

// Does this user hold these tags (or lists)? 'any', 'all' or 'none'. Cached per request.
if ( FW_CRM_Contacts::user_has( $user_id, array( 'vip', 'member-gold' ), 'any', 'tag' ) ) { … }

// Is the contact in a segment?
FW_CRM_Segments::contact_matches( $segment_id, $contact_id );

// Tags, with a source shown on the timeline.
FW_CRM_Tags::add( $contact_id, array( 'member-gold' => 'Member: Gold' ), 'my-extension' );
FW_CRM_Tags::remove( $contact_id, array( 'member-gold' ), 'my-extension' );
```

**Managed tags, lists and fields.** Pass `managed_by` when you create a tag or list
(`FW_CRM_Lists::get_or_create( $slug, 'tag', array( 'title' => …, 'managed_by' => 'my-extension' ) )`) or a
custom field (`FW_CRM_Fields::save_definition( array( …, 'managed_by' => 'my-extension' ) )`). The CRM shows
them locked, so staff do not change what your extension owns. Write field values with
`FW_CRM_Fields::set_values()`.

## The timeline

```php
// Register how your entries look…
add_filter( 'unysonplus_crm_activity_types', function ( $types ) {
	$types['booking'] = array( 'label' => __( 'Booking', 'my-ext' ), 'icon' => 'dashicons-calendar-alt' );
	return $types;
} );
// …and log them.
FW_CRM_Activity::log( 'contact', $contact_id, 'booking', 'Booked: Colour, 3 Nov', array( 'body' => 'With Ava' ) );
```

## Screens

| Filter or action | Adds |
| --- | --- |
| `unysonplus_crm_contact_panels`, `unysonplus_crm_company_panels`, `unysonplus_crm_deal_panels` | A panel on a record page: `id => { label, callback( $record ), priority, column: side or main }` |
| `unysonplus_crm_dashboard_cards` | A Home card: `id => { title, callback(), priority, column }`; people can move or hide it |
| `unysonplus_crm_record_actions` (action) | Buttons in a record's header: `( $object, $record )` |
| `unysonplus_crm_modules` | A module on CRM → Modules: `id => { label, description, icon, group, default, requires, requires_text, available, soon }`. See [Create a custom module](./custom-modules.md) |
| `unysonplus_crm_nav` | A sidebar item: `view => { label, icon, url?, cap?, module? }`; render it on `unysonplus_crm_render_view` |
| `unysonplus_crm_settings_sections` (action) | A section on CRM → Settings |
| `unysonplus_crm_handle_action` | Handle your own form actions: `( $result, $action )` → redirect args or `[ '_back' => $url ]` |
| `unysonplus_crm_calendar_events` | Items on the calendar: `[ { id, kind, date, time, title, sub, url, icon } ]` |

## Events

| Action | When |
| --- | --- |
| `unysonplus_crm_contact_created` · `_updated( $contact, $before, $changes )` · `_trashed` · `_restored` · `_deleted` | Contact changes |
| `unysonplus_crm_contacts_merged( $kept_id, $removed_row )` | Two contacts merged: move your own references |
| `unysonplus_crm_user_linked` · `_user_unlinked` | A contact linked to or unlinked from a WordPress user |
| `unysonplus_crm_tag_added` · `_tag_removed( $contact_id, $tag_id, $source )` | Tags |
| `unysonplus_crm_list_status_changed( $contact_id, $list_id, $from, $to, $source )` | List subscription |
| `unysonplus_crm_deal_created` · `_updated` · `_stage_changed( $deal, $from, $to )` · `_won` · `_lost( $deal, $reason )` | Deals |
| `unysonplus_crm_task_created` · `_updated` · `_completed( $task, $outcome )` | Tasks |
| `unysonplus_crm_file_attached` · `_detached( $object, $id, $attachment_id )` | Files |
| `unysonplus_crm_direct_email_sent( $contact, $mail, $deal_id )` · `unysonplus_crm_email_received( $contact_id, $message, $deal_id )` | Email out and replies in |
| `unysonplus_crm_import_finished` · `_import_undone` | CSV imports |
| `unysonplus_crm_form_submitted( $contact_id, $ctx, $created )` | A form sent its sender to the CRM; `$ctx['fields']` holds every answer ([forms](../contacts/forms-and-signups.md)) |
| `unysonplus_crm_module_toggled( $id, $on )` | A module was switched on or off (refuse with the `unysonplus_crm_module_can_disable` filter) |
| `unysonplus_crm_webhook( $event, $data )` (you fire it) | Queue a [webhook](./webhooks.md) event |

Useful filters: `unysonplus_crm_lifecycle_stages`, `unysonplus_crm_field_types`, `unysonplus_crm_segment_fields`,
`unysonplus_crm_task_types`, `unysonplus_crm_lost_reasons`, `unysonplus_crm_default_currency`,
`unysonplus_crm_woo_products`, `unysonplus_crm_task_reminders` (return false to stop reminder emails),
`unysonplus_crm_direct_email` (change a one-to-one email before it is sent), `unysonplus_crm_bin_days`.

## Sending and channels

- **Sender profiles**: wrap your own `wp_mail()` call in `FW_CRM_Senders::begin( 'marketing'|'transactional', $profile_id = '' )`
  and `FW_CRM_Senders::end()` to send it as a CRM sender (its From, Reply-To and email service).
- **Email services**: add one by subclassing `FW_CRM_Mail_Service` (`id()`, `label()`, `fields()`, `send( $message )`,
  optional `parse_events( $request )`) and registering it with the `unysonplus_crm_mail_services` filter
  (id → class name). Its webhook address is `/wp-json/fw-crm/v1/mail-services/<id>/events?token=…`.
- **Channels**: `FW_CRM_Channels::send( 'email', $contact_id, array( 'subject' => …, 'body' => …, 'purpose' => 'transactional' ) )`
  sends a message and logs it on the timeline. Add SMS or a messaging app with the `unysonplus_crm_channels` filter:
  `id => { label, icon, address( $contact ), send( $contact, $message ), available }`.
- Hooks: `unysonplus_crm_mail_service_sent`, `unysonplus_crm_email_event` (open, click, bounce… with a bot flag),
  `unysonplus_crm_smart_link_clicked`, `unysonplus_crm_digest_queued`, `unysonplus_crm_channel_sent`.

## Automations (registering now, running later)

The Automations module is planned. Extensions can already register their triggers and actions; nothing reads
them until it arrives.

```php
add_filter( 'unysonplus_crm_automation_triggers', function ( $t ) {
	$t['myext.booked'] = array( 'label' => 'Booking made', 'group' => 'My extension',
		'fields' => array( 'service' => array( 'label' => 'Service', 'type' => 'text' ) ) );
	return $t;
} );
add_filter( 'unysonplus_crm_automation_actions', function ( $a ) {
	$a['myext.cancel'] = array( 'label' => 'Cancel the booking', 'group' => 'My extension', 'settings' => array(),
		'callback' => function ( $contact_id, $settings, $context ) { return true; /* or a WP_Error */ } );
	return $a;
} );
// When it happens (plain values only; dedupe stops a repeat starting twice):
do_action( 'unysonplus_crm_automation_event', 'myext.booked', $contact_id, array( 'service' => 'Colour', 'dedupe' => 'booked:' . $booking_id ) );
```

Name triggers and actions `<extension>.<event>`. Action callbacks run in the background with no logged-in
user. The CRM's own reply event is `crm.email_replied`.
