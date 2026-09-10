---
title: "Tutorial: Drive Rive from JavaScript"
sidebar_label: "Tutorial — JS control API"
sidebar_position: 3
slug: /rive/live-js-control
description: Step-by-step — reach a Rive instance from your own JavaScript and push live data (a REST poll / WebSocket) into its bindings and inputs.
---

# Tutorial — Drive Rive from JavaScript

[Data bindings](./data-binding.md) set values **once, at load**. This tutorial makes them **live** — the **[“push new figures” demo](https://demos.unysonplus.com/animation-engine/rive/)**, where a button (and, in real life, a data feed) writes fresh values and the dashboard animates to them.

## Reaching an instance

Every Rive element exposes a control handle, two ways:

```js
// by the element:
document.querySelector('#my-rive').fwRive
// or from the registry — pass an element, a CSS id, or a selector:
window.fwRive.get('#my-rive');
window.fwRive.get('.rive-live-demo');
```

The runtime loads asynchronously, so **wait for the `fwRiveReady` event** before driving an instance (bindings/inputs don't exist until it fires):

```js
document.addEventListener('fwRiveReady', function (e) {
  var r = e.detail.api;          // the handle for the instance that just became ready
  // …drive it here…
});
```

## The handle's methods

| Method | Does |
| --- | --- |
| `play()` · `pause()` · `stop()` | Playback. |
| `fireTrigger(name)` | Fire a State-Machine **trigger** input. |
| `setInput(name, value)` · `getInput(name)` | Set / read a State-Machine **number/boolean** input. |
| `setBinding(prop, value, type?)` · `getBinding(prop, type?)` | Set / read a **data-binding** (View-Model) property. |
| `.rive` | The raw Rive instance (escape hatch). |

`type` is `text` / `number` / `boolean` / `color` / `enum` (inferred for text/number/boolean when you omit it). Nested properties use `/`, exactly like the builder — `setBinding('item/change', 12, 'number')`.

## Step 1 — Give the element a hook

On the element's **Advanced** tab set a **CSS ID** (e.g. `dashboard`) or **CSS Class** so your script can find it — `window.fwRive.get('#dashboard')`.

## Step 2 — Add your script

Drop a **Code Block** element on the same page (its *Render as code* option **off**, so the markup runs), or add the script through your theme. This is the demo's “push new figures” button, verbatim:

```html
<button id="refresh">↻ Push new figures</button>
<script>
(function () {
  var btn = document.getElementById('refresh');
  function rnd() { return Math.round(Math.random() * 260 - 60); }  // -60..200
  btn.addEventListener('click', function () {
    var r = window.fwRive.get('#dashboard');       // your CSS ID
    if (!r) return;
    r.setBinding('apple/stockChange',    rnd(), 'number');
    r.setBinding('microsoft/stockChange', rnd(), 'number');
    r.setBinding('tesla/stockChange',     rnd(), 'number');
  });
})();
</script>
```

## Step 3 — Feed it real data

A button is just a stand-in for your data source. The pattern is identical — swap the click for a poll or a socket:

```js
// REST poll every 5s
document.addEventListener('fwRiveReady', function () {
  var r = window.fwRive.get('#dashboard');
  async function tick() {
    var data = await (await fetch('/wp-json/my/v1/portfolio')).json();
    r.setBinding('title', data.title, 'text');
    data.rows.forEach(function (row, i) {
      var slot = ['apple', 'microsoft', 'tesla'][i];   // the file's item slots
      r.setBinding(slot + '/name',   row.ticker, 'text');
      r.setBinding(slot + '/stockChange', row.change, 'number');
    });
  }
  tick();
  setInterval(tick, 5000);
});
```

The animation between old and new values is Rive's — you only supply numbers.

## Notes

- `setBinding` / `setInput` no-op safely if the property/input isn't in the file, so a mismatched name won't throw.
- One `fwRiveReady` fires **per element**; `e.detail.api` is that instance's handle. Use `window.fwRive.get()` when you'd rather look one up by id later.
- Reading works too — `getBinding('item/change', 'number')` returns the current value (handy for tests or two-way UI).
