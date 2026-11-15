---
title: "Chat for developers: hooks, REST routes and data"
sidebar_label: "For developers"
sidebar_position: 8
description: "Extend the Unyson+ Chat extension: add channels and settings, change who can answer, read the visitor IP behind a proxy, the REST routes of the live chat, its database tables and the AI tools."
keywords: [wordpress chat hooks, live chat rest api wordpress, fw_ext_chat_channels, unysonplus chat developer]
---

# For developers

The Chat extension lives in `framework/extensions/chat/` of the Unyson+ plugin. Its main parts:

| File | Role |
| --- | --- |
| `class-fw-extension-chat.php` | The extension: settings storage, channels, the button on the front end. |
| `includes/chat-fields.php` | The settings fields. |
| `includes/class-fw-chat-admin.php` | The **Chat** admin page (Inbox, Settings, Import / Export), menu and admin-bar counts. |
| `includes/class-fw-chat-store.php` | The two database tables, retention, privacy export / erase. |
| `includes/class-fw-chat-rest.php` | The REST routes for the visitor window and the inbox; email notices. |
| `includes/class-fw-chat-transfer.php` | Import / Export. |
| `includes/ai-abilities.php` | The AI tools (with the AI Assistant extension). |
| `views/button.php`, `views/live.php` | The button with its channel menu, and the live chat window. |
| `static/js/chat-button.js`, `live-chat.js`, `inbox.js` | Channel menu, visitor window, inbox. |

## Reading settings

```php
$chat = fw_ext( 'chat' );
if ( $chat && $chat->live_enabled() ) {
	$title = $chat->get_option( 'chat_live_title', 'Chat with us' );
}
```

`get_option()` returns switches as `'yes'` / `'no'`. Settings are stored site-wide in the extension's
own settings (`fw_ext_settings_options:chat`), not in Theme Settings. To change them in code, pass
`'yes'` / `'no'` or `true` / `false` for switches:

```php
fw_ext( 'chat' )->save_values( array( 'chat_live_enable' => 'yes', 'chat_live_retention' => '30' ) );
```

## Add a channel

`fw_ext_chat_channels` filters the list of active channels: add, remove or reorder them. A channel is
either a **link**:

```php
add_filter( 'fw_ext_chat_channels', function ( $channels ) {
	$channels[] = array(
		'key'      => 'phone',
		'name'     => __( 'Call us', 'my-theme' ),
		'url'      => 'tel:+14155550100',
		'external' => false, // true opens in a new tab
	);
	return $channels;
} );
```

or an **action**, which opens something on the page instead of following a link:

```php
add_filter( 'fw_ext_chat_channels', function ( $channels ) {
	$channels[] = array( 'key' => 'callback', 'name' => 'Request a call back', 'action' => 'callback' );
	return $channels;
} );
```

An action renders as a `<button data-upw-chat-action="callback">`. Clicking it closes the channel menu
and fires a DOM event your script listens for:

```js
document.addEventListener( 'upw-chat:action', function ( e ) {
	if ( e.detail.action === 'callback' ) {
		openMyCallbackForm( e.detail.trigger ); // trigger = the clicked button, to return focus to
	}
} );
```

Give your channel an icon with `fw_ext_chat_channel_svg` (24 × 24 view box, `currentColor`):

```php
add_filter( 'fw_ext_chat_channel_svg', function ( $svg, $key ) {
	return $key === 'phone'
		? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.6a1 1 0 0 1-.2 1z"/></svg>'
		: $svg;
}, 10, 2 );
```

Channels appear in the channel menu (Live chat off) and under the message box (Live chat on). The AI
Assistant's **Ask our assistant** channel is built exactly this way.

## Add settings

`fw_ext_chat_settings_fields` adds fields to the Settings page. Add them to
`$options['chat_button']['inner-options']`; the key decides the tab: `chat_live_…` → Live chat,
`chat_ai_…` → AI assistant, anything else → Channels.

```php
add_filter( 'fw_ext_chat_settings_fields', function ( $options ) {
	$options['chat_button']['inner-options']['chat_phone_number'] = array(
		'label' => __( 'Phone number', 'my-theme' ),
		'type'  => 'text',
		'value' => '',
	);
	return $options;
} );
// Read it back: fw_ext( 'chat' )->get_option( 'chat_phone_number' );
```

## Who can answer

By default anyone who can edit pages (editors and administrators) sees the **Chat** menu and answers
chats. Settings and Import / Export always need `manage_options`.

```php
// Let shop managers answer chats too.
add_filter( 'fw_ext_chat_capability', function () {
	return 'edit_shop_orders';
} );
```

## The visitor's IP behind a proxy

The chat stores `$_SERVER['REMOTE_ADDR']`. Behind a proxy or CDN (Cloudflare, a load balancer) that
is the proxy's address. Read the real one from a header **only when you trust that the request came
through the proxy**:

```php
add_filter( 'fw_ext_chat_visitor_ip', function ( $ip ) {
	// Behind Cloudflare: the visitor's address is in CF-Connecting-IP.
	return ! empty( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ) : $ip;
} );
```

The same IP is used for the [rate limits](./privacy-and-spam.md#spam-and-abuse-protection).

## REST routes

Namespace `unysonplus-chat/v1`.

**Visitor window** (no login; a conversation is identified by the secret `token` its browser keeps):

| Route | Body / query | Returns |
| --- | --- | --- |
| `POST /send` | `token?` (none for a new conversation), `message`, `page_url`, `page_title`, `after` (last message id seen), `hp` (the hidden field, must be empty), `t` (milliseconds since the window opened) | `messages` since `after`, `agents_online`, `has_email`, `status`, and `token` for a new conversation |
| `GET /poll` | `token`, `after` | `messages` since `after`, `agents_online`, `has_email`, `status` |
| `POST /contact` | `token`, `email`, `name?` | as `/poll` |

Visitor responses never include team-only notes (`sender: system`). Errors return a WordPress REST
error with a readable `message` (status 400, 403, 404 or 429).

**Inbox** (logged in with the answering capability; send the `X-WP-Nonce` header):

| Route | Does |
| --- | --- |
| `GET /admin/threads?status=…&search=…` | The conversation list (`status`: `open`, `closed` or `all`) and the unread count. Marks the team as online. |
| `GET /admin/thread/<id>?after=` | One conversation and its messages; marks it read. |
| `POST /admin/thread/<id>/reply` `{ message }` | Sends a reply (emailed when the visitor left and gave an email). Returns `{ ok, id, emailed }`. |
| `POST /admin/thread/<id>/status` `{ status }` | `open` or `closed`. |
| `DELETE /admin/thread/<id>` | Deletes the conversation. |

## Database tables

Created on the first page load after activation (and upgraded when needed).

`{prefix}upw_chat_threads`: one row per conversation.

| Column | |
| --- | --- |
| `id` | The conversation number ("Visitor 12"). |
| `token_hash` | A keyed hash of the visitor's token (the token itself is never stored). |
| `status` | `open` / `closed`. |
| `name`, `email`, `ip`, `user_agent`, `page_url`, `page_title` | About the visitor. |
| `unread_agent`, `unread_visitor` | Messages not yet read by the team / the visitor. |
| `visitor_seen_at` | The visitor's window last checked in (used for "On the site now" and emailing replies). |
| `notified_at` | The last notification email to the team. |
| `last_message_at`, `created_at` | UTC. |

`{prefix}upw_chat_messages`: `id`, `thread_id`, `sender` (`visitor` / `agent` / `system`), `user_id`
(for `agent`), `body`, `created_at` (UTC).

The daily cron hook `fw_ext_chat_cleanup` deletes conversations past the retention period. The option
`fw_ext_chat_db_version` holds the table version, and `fw_ext_chat_settings_moved` records the one-time
copy of the old Theme Settings values.

## AI tools

With the [AI Assistant](../ai-assistant/index.md) extension active, any MCP-capable AI agent connected to
the site gets four tools:

| Tool | Does | Needs |
| --- | --- | --- |
| `chat_settings` | Every chat setting with its type, choices and current value. | `manage_options` |
| `chat_settings_update` | Changes settings by id, validated; undo with `undo_change`. | `manage_options` |
| `chat_conversations` | The inbox list, or one conversation with its messages (marks it read). | answering capability |
| `chat_reply` | Sends a reply as the connected user. Agents are told to get the person's OK first. | answering capability |
