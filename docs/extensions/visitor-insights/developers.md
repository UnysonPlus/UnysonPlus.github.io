---
sidebar_position: 15
title: "Visitor Insights for Developers"
sidebar_label: "For developers"
description: "The JavaScript API, filters, shortcodes, CSS classes and REST routes of Visitor Insights."
---

# For developers

## JavaScript

`window.UnysonPlusVI` is available on tracked pages.

| Call | What it does |
| --- | --- |
| `goal( key, value )` | Counts a goal. Add it first as a *custom event* goal; unknown keys are ignored. `value` is optional. |
| `grant()` | The visitor accepted anonymous statistics: start tracking. |
| `grantStatistics()` | The visitor accepted statistics: also allows new and returning visitors. |
| `revoke()` | Withdraw that consent. |
| `optOut()` / `optIn()` | Set or clear the visitor's opt-out in this browser. |
| `grantRecording()` | The visitor accepted session recording. |
| `stopRecording( forget )` | Stop recording. `forget = true` deletes the recording too. |
| `module( fn )` | Add a tracker module. `fn` receives an API with `push()`, `on()`, `onFlush()`, `docHeight()`, `visible()` and `itemOk()`. |

```js
// Count a finished calculator, worth 25.00.
UnysonPlusVI.goal('calculator-done', 25);

// Your own consent banner.
acceptButton.addEventListener('click', () => UnysonPlusVI.grant());
```

## Filters and actions

| Hook | Use |
| --- | --- |
| `fw_ext_visitor_insights_view_cap` | The capability needed to see the reports. Default `manage_options`. |
| `fw_ext_visitor_insights_recordings_cap` | The capability needed to watch recordings. |
| `fw_ext_visitor_insights_nav` | The sidebar groups and their views. |
| `fw_ext_visitor_insights_channel_hosts` | The site lists that decide the Search, Social and AI assistants channels. |
| `fw_ext_visitor_insights_purge_cache` | Action fired when pages should be cleared from a cache. Hook your own cache here. |

```php
// Let editors see the reports.
add_filter( 'fw_ext_visitor_insights_view_cap', function () {
	return 'edit_pages';
} );
```

## Shortcodes

`[visitor_insights_optout]` and `[visitor_insights_recording]`. See
[Privacy and consent](./privacy.md#let-visitors-opt-out).

## CSS classes for recordings

| Class | Effect |
| --- | --- |
| `up-vi-mask` | Hides the element's text in recordings |
| `up-vi-block` | Leaves the element out of recordings |

## REST API

Namespace `fw-visitor-insights/v1`.

| Route | Use | Access |
| --- | --- | --- |
| `POST /collect` | The tracker's fallback collector | Public, with a page token |
| `GET /heatmap?path&device&days&ch` | Heatmap data for a page | Report viewers |
| `GET /live` | Page views in the last five minutes | Report viewers |

## How data flows

1. The tracker batches events and sends them to a small standalone collector that does not load
   WordPress, so visits cost your server almost nothing. If that is blocked, it uses `POST /collect`.
2. Events wait in per-minute files.
3. A job every minute sums them into daily tables. Reports only ever read those tables.
4. A nightly job deletes days past the retention setting and destroys the visitor salt.

The tables are never dropped when the extension is deactivated. For more detail, the AI Dev Kit reference
at `docs/extensions/visitor-insights.md` covers the wire format, the tables and each module.
