---
sidebar_position: 4
title: Convert from a file
---

# Convert from a file

Upload an export from your design tool and convert it. **Google Stitch** is fully supported (export
→ `.zip`), and any other plain‑HTML export converts too.

## Two fidelity modes

A Stitch export is just self‑contained HTML (it loads Tailwind + fonts from a CDN). So how it's
converted depends on whether the **[capture service](./capture-service.md)** is running:

| Mode | When | Fidelity |
|---|---|---|
| **Rendered (service up)** | The capture service is running | **Full** — the file is opened in real Chrome and run through the *same* engine as a live URL: live computed CSS, dynamic header/footer, real colors/fonts |
| **Offline (service down)** | No capture service | **Basic** — a PHP parser reads the static Tailwind markup. Works with no Node/Chrome, but can't resolve computed styles, so the result is more generic |

The Convert screen detects the service automatically and uses the rendered mode when available.

:::tip Why rendered mode is so much better
A static parser sees Tailwind utility *classes* but not the *resolved* CSS. A browser sees the
**computed styles** — the actual colors, spacing, fonts and layout — which is exactly what the URL
path uses. Rendering the file closes the quality gap entirely.
:::

## Steps

1. **Unyson+ → Convert** → **Convert** tab → choose **Upload a file (.zip)**.
2. **Choose File** — a Google Stitch `.zip` (a single exported frame or a whole multi‑screen
   project), or under **Advanced options**, paste one screen's `code.html`.
3. Set the options (Create child theme / Capture header / Capture footer / Import images / AI assist).
4. Click **Convert to WordPress** (one click) or **Review mapping first**.
   - **Service up:** the file is sent to the service's `/capture-file`, rendered, and the bundle is
     applied through the URL‑path flow (design → review → build).
   - **Service down:** the file is converted by the offline PHP parser.
5. If you chose *Review*, confirm each element's role, then **Build the site from this mapping**.

## Under the hood (rendered mode)

```
upload .zip ──► POST /capture-file ──► unzip → open code.html in Chrome
            ──► same extractor as a URL ──► convert-bundle.zip
            ──► analyze_apply (design: theme + presets + media + style guide)
            ──► review ──► build_mapping (pages + section CSS)
```

This is identical to **[Convert from a URL](./convert-from-url.md)** after the bundle is produced —
only the *input* differs (a local file instead of a fetched URL).

## Download a bundle instead

Under **Advanced options** you can **Download bundle (.zip)** instead of converting — useful to
inspect the extracted `mapping.json` / `theme-design.json`, or to apply it later under **Manual
tools → Convert from a bundle**.
