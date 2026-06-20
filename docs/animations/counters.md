---
sidebar_position: 9
title: Animated Counters
---

# Animated Counters

The **Animated Counter** element counts a number up from a start value to its target when it scrolls into view — ideal for stats bands ("$45,280 raised", "96% satisfaction").

<img src="/img/animations/counters-options.png" alt="Animated Counter options panel" width="840" />

## Options

| Option | Notes |
| --- | --- |
| **Number** | The value to count up to (e.g. `45280`, `96`, `4.2`) |
| **Start From** | Value the count begins at (default 0) |
| **Prefix** | Text before the number (e.g. `$`) — doubles as a left caption |
| **Suffix** | Text after the number (e.g. `%`, `k`, `+`) — doubles as a right caption |
| **Decimal Places** | 0–3 |
| **Thousands Separator** | Insert commas (45,280) |
| **Duration (ms)** | Count-up length |
| **Easing** | Ease Out · Linear · Ease In-Out |

## Set it up

1. Add an **Animated Counter** element (one per stat).
2. Set the **Number**, plus an optional **Prefix** / **Suffix**.
3. For a stats band, place several counters in a row of columns, each with a label below.
4. **Save** — each counter animates up as it scrolls into view.

:::note
The counter is **number-only** — put any caption in the **Prefix** / **Suffix**, or in a separate text block below it.
:::
