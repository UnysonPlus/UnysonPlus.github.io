---
sidebar_position: 4
title: "Combining and deferring JavaScript"
sidebar_label: "JavaScript"
description: "Merge front-end scripts into one cached bundle, defer everything that can safely be deferred, and map a performance report's line number back to the script that actually caused it."
---

# JavaScript

Combining scripts is more delicate than combining stylesheets: a stylesheet that arrives in the wrong
order looks wrong, but a script that arrives in the wrong order throws an error and stops. The
defaults here are deliberately conservative as a result.

## Combine JavaScript

<img src="/img/extensions/asset-optimizer/js-tab.png" alt="The JavaScript tab — Defer, Minify and the per-script list" width="1658" />

The master switch, on by default. Scripts you have ticked are merged into one cached bundle in
dependency order.

Turning it off serves every script separately **without touching your per-file selections** on this
tab — the quickest way to rule combining in or out when something misbehaves.

## Choosing which scripts to merge

Scripts detected on the front end are listed on the **JavaScript** tab, but the selection rules are
stricter than for CSS:

- **Only first-party scripts** (the UnysonPlus plugin and your active theme) are checked by default.
  Tick a third-party script to include it as well.
- **Unsafe scripts are skipped automatically, even if you tick them.** Only local footer scripts with
  no `async`/`defer` strategy and no inline or localized data are ever merged. WordPress core,
  external and CDN scripts, and anything carrying per-request data are always left alone.

That second rule is the one that surprises people: ticking a script is permission, not an instruction.
If a script carries data that changes per request — a nonce, a cart total, a user id — baking it into
a file that is cached for a year would be a security and correctness bug, so it is refused.

## Defer combined script

Switching on **Defer** does two things, and the second is the one that usually moves a score.

The combined bundle gets `defer`, which is safe because the bundle is self-contained and already in
dependency order. But the combiner is deliberately fussy — it refuses any script carrying inline or
localized data, for the reason above. Those refused scripts used to be left entirely alone, which
produced the opposite of what the setting promises: one deferred bundle sitting among a dozen
render-blocking leftovers. On a measured page, 8 of 11 scripts were deferred before and **11 of 11**
after.

So Defer now also marks every other front-end script it can: local, in the footer, not already asking
for its own loading strategy. Core, admin and remote scripts are left alone — a third-party script may
still rely on `document.write`.

### Why this is safe

The marking is done by asking WordPress for the strategy, with
`wp_script_add_data( $handle, 'strategy', 'defer' )`, rather than by writing `defer` into the tag.
That distinction is the whole safety argument. **WordPress then decides for itself, per script,
whether deferring is actually valid** — and it refuses whenever a script carries an `after` inline
script, or when anything that depends on it is still blocking.

Tested against a three-deep dependency chain with an `after` inline script in the middle:

```
          defer off      defer on
a.js      blocking       blocking   ← held back: its dependent is blocking
b.js      blocking       blocking   ← held back: carries an `after` inline script
c.js      blocking       defer
```

Everything still ran, in order, with no errors. Writing the attribute in by hand would have broken
that chain; letting WordPress arbitrate does not.

A script you need to stay blocking can be named through the
`fw:ext:asset-optimizer:js_no_defer_handles` filter.

## Minify combined script

On by default. Strips comments and redundant whitespace from the bundle. The minifier is deliberately
conservative — it understands strings, template literals and regular expressions, and preserves line
breaks — because an aggressive JavaScript minifier that gets one edge case wrong breaks the page
silently.

Most scripts arrive already minified, so the extra saving is usually small. Turn it off only if you
hit a problem with an already-minified third-party script you have chosen to combine.

## Finding out which script a report is blaming

<img src="/img/extensions/asset-optimizer/source-map.png" alt="Record which script each line came from" width="1658" />

Combining scripts has one real cost that is easy to miss until you need it: performance reports stop
being actionable.

When a browser flags a slow function — a long task, or a layout recalculation forced from
JavaScript — it tells you the file and line. Once everything is one bundle, that line number belongs
to the combined file, which nobody wrote and which changes every time the bundle is rebuilt. There is
no way to tell whose script is at fault, which is exactly when you most need to know.

**Record which script each line came from** writes a small companion file next to the bundle listing
which script occupies which lines:

```json
{
  "bundle": "combined-dcc54a45f7df.js",
  "sources": [
    { "handle": "theme", "source": "wp-content/themes/…/theme.js", "first_line": 1, "last_line": 94 },
    { "handle": "unysonplus-navigation", "source": "wp-content/themes/…/navigation.js",
      "first_line": 95, "last_line": 583 }
  ]
}
```

A report blaming line 354 of the bundle is then plainly `navigation.js`. The bundle itself also keeps
a comment above each script, so you can read it directly if you prefer.

This is **for diagnosis, not for everyday use.** Switching it on changes how the bundle is put
together — each script is shrunk on its own rather than all of them together — so the file is slightly
larger, and you should turn it off again when you are done. The companion file is publicly readable
and names script paths relative to your WordPress folder.

:::tip[A worked example of why this matters]
A real site's PageSpeed report flagged a *Forced reflow* and attributed 40 ms to a shared animation
scheduler. The scheduler was not the cause — it is simply the function that happens to be on the stack
when every subscribed animation runs. The actual costs were in four different modules, none of which
the report named. Without a way to map lines back to files, that is a dead end; with one, it is a
twenty-minute fix.
:::
