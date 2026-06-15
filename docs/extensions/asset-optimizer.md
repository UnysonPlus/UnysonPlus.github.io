---
sidebar_position: 7
title: Asset Optimizer
---

# Asset Optimizer

Combines enqueued front-end assets into single cached files to reduce HTTP requests. It
currently merges **CSS** stylesheets — JavaScript combining is planned next. Every detected
asset is listed so you can pick exactly which ones to merge.

## Typical workflow

1. Activate **Asset Optimizer** from **Unyson+ → Extensions**.
2. Open its settings — every enqueued asset on the site is listed.
3. Select the stylesheets you want combined.
4. Asset Optimizer merges them into a single cached file, cutting the number of HTTP requests
   on the front end.

:::note Work in progress
Expand this page with screenshots of the asset list and the merge settings.
:::
