---
slug: minifier-keeps-newlines
title: "The combined script doesn't look minified — is that a bug?"
authors: [jon]
tags: [performance, javascript, extensions]
date: 2026-08-17
description: "The Asset Optimizer's combined JS has Minify enabled but the output keeps one statement per line, so it reads as un-minified. Decision — this is deliberate: the minifier strips comments, indentation and blank lines but never joins lines, because JavaScript's automatic semicolon insertion can silently change a program that relies on newlines as statement terminators. We keep the safe subset rather than chase a few hundred bytes."
---

**The question:** With "Minify combined script" enabled, the generated
`combined-<hash>.js` still had one statement per line — it didn't *look* minified. Is the
minifier failing, and should it collapse to a single line like everyone expects "minified" to?

<!-- truncate -->

## Context

The Asset Optimizer merges eligible footer scripts into one cached file and, when the minify
switch is on, runs it through a hand-rolled minifier (`FW_AO_Minifier::js`). Inspecting a live
output file, it had clearly *been* processed:

- comments stripped,
- indentation removed (every line starts at column 0),
- blank lines collapsed.

But the **single newlines between statements were preserved** — 611 lines for a 23 KB file — so
at a glance it reads like ordinary source, not the single-line wall a tool like Terser emits.

The reason it looks that way is the reason it's correct. This is a **conservative, single-pass,
ASI-safe** minifier. JavaScript's *automatic semicolon insertion* means a newline can act as a
statement terminator, and joining two lines can silently change meaning. The textbook case:

```js
return
  value        // ASI inserts a semicolon after `return` → returns undefined
```

Aggressive minifiers handle this by fully parsing the program and re-emitting explicit
semicolons. This one has no parser — it's a character scanner aware of strings, template
literals, regex literals and comments. It cannot safely re-punctuate the code, so instead it
**never removes the newlines that ASI might depend on**. It only does the transforms that are
lossless without a parse: drop comments, drop indentation, collapse blank lines and horizontal
whitespace runs.

## Options considered

- **Add aggressive single-line minification.** Match the familiar look and squeeze out the
  newlines. But doing it *safely* requires a real JS parser (to know where a semicolon must be
  inserted before a line is joined). Bundling or writing one puts a parser on the front-end
  critical path of every site — a large dependency and a large new surface for correctness bugs,
  to save a few hundred bytes.
- **Provably-safe newline joining without a parser.** Drop a newline only when the preceding
  significant character guarantees the statement continues (after `{ ( [ , ; : =` and operators,
  keywords like `return`) and keep it everywhere ASI could bite. Implementable against the
  extracted, unit-testable minifier — but it's a genuine change to the hottest, correctness-
  critical path, for a payoff that barely moves the needle.
- **Leave it.** Accept that "minified" here means the safe subset, and that the output keeps its
  line breaks.

## Decision

**Leave it as-is.** The minifier keeps single newlines by design; comments, indentation and blank
lines are already gone. "Minify" in this extension means *the lossless subset a parser-free
scanner can guarantee*, not *single-line*.

The deciding factor is that the visible "un-minified" quality — the newlines — is worth almost
nothing to remove:

- The remaining newlines are a small fraction of a 23 KB file; joining them saves a few hundred
  bytes.
- Lighthouse's *unminified-JavaScript* audit keys mostly on **comments and indentation**, both
  already stripped — so the file is not flagged despite keeping its line breaks. The audit was
  passing; there was no score to recover.

So the entire upside is cosmetic (it *looks* more minified), and the cost to buy it safely is a JS
parser on every front-end request, or a hand-written ASI heuristic on the most dangerous code in
the extension. That trade isn't close.

## Why

- **Correctness beats a few hundred bytes.** A minifier that occasionally changes behaviour is far
  worse than one that leaves newlines in. ASI bugs are exactly the kind that pass in testing and
  break one site's slider in production.
- **The savings that matter were already banked.** The big wins from combining are fewer HTTP
  requests and dropped comments/whitespace — all of which this already does. Newline removal is
  the long tail.
- **The look isn't the metric.** "Doesn't look minified" is an eyeball test; the governing metric
  is the Lighthouse/GTmetrix audit, and that passes. We optimise for the score and for safety, not
  for resembling Terser output.
- **The door is left open, cheaply.** When the minifiers were pulled into `FW_AO_Minifier` they
  became a dependency-free, pure `string → string` unit with a tricky-input test corpus
  (regex-vs-division, comment-in-string, unclosed comment, template literals). If a real need for
  more aggressive output ever appears, provably-safe newline joining can be added there and
  verified against that corpus — without touching the extension's request path.

Status: **Accepted.** Behaviour shipped in Asset Optimizer 1.1.37 (which extracted the minifier);
no code change resulted from this decision — it records why the output intentionally keeps its
newlines.
