---
slug: svg-uploads-per-role-vs-plugin
title: "Media-Library SVG uploads: build a per-role setting on the sanitiser we already own, don't add a Safe-SVG-style plugin dependency (or a second system)"
authors: [jon]
tags: [architecture, shortcodes]
date: 2026-09-05
description: "WordPress blocks .svg uploads because an SVG is code (it can carry <script> and event handlers), and SVGs are now a everyday design asset. The question was whether to add a Bricks-style 'SVG uploads' option or tell users to install Safe SVG. Two facts settled it: we already ship an allow-list SVG sanitiser (it defends the icon / svg-code / image-mask features) AND we already allow admin SVG uploads through it — so 'native vs plugin' was moot, and the only real gap was configurability. Decision: expose the EXISTING upload path as a per-role setting (default Administrator, so no behaviour change), rather than building a second upload pipeline or taking a plugin dependency. A near-miss along the way: a parallel opt-in system was half-built before the existing one was found — the lesson baked in is to grep upload_mimes before adding an uploader."
---

**The question:** WordPress blocks `.svg` uploads by default (an SVG is XML that can carry `<script>`, event handlers and external references — an XSS vector). But SVGs are now an everyday design asset — logos, icons, the foreground images in the new Image Scroll Choreography element. A premium builder like Bricks ships an "SVG uploads" setting with per-role toggles and on-upload sanitisation. Should UnysonPlus add its own SVG-uploads option, or point users at a maintained plugin (Safe SVG / enshrined-svg-sanitize) and stay out of the security-sensitive business of sanitising SVGs?

<!-- truncate -->

## Context

The default instinct for anything touching XSS is *don't hand-roll it — take the audited dependency*. That instinct is right in the abstract, but two facts about our own codebase made it moot:

1. **We already own an allow-list SVG sanitiser.** `framework/includes/svg-sanitize.php` (`fw_upw_sanitize_svg`) is a wp_kses allow-list — explicit element/attribute allow-list, strips `<script>` / event handlers / `<foreignObject>`, limits `href` to same-document `#fragment`, flattens Illustrator `<style>`/class CSS to presentation attributes. It already defends the icon type, the `svg-code` option and the image-mask library. It is the same *approach* Safe SVG takes (via enshrined/svg-sanitize), just already in-house and maintained.
2. **We already allow admin SVG uploads through it.** `sc_svg_upload_allowed()` + `sc_svg_upload_mimes()` + `sc_svg_check_filetype()` + `sc_svg_sanitize_upload()` (shortcodes styling helper) already let `manage_options` users upload SVGs, sanitising-and-rewriting the file on the way in (and covering the sideload path, and generating SVG attachment metadata so the Media grid shows thumbnails). This is what lets SVG logos ride the normal user-replaceable media flow with no special uploader.

So the real gap versus Bricks was never *safety* or *native support* — both already existed. It was purely **configurability**: the existing gate is hardcoded to administrators, with no UI.

## Options considered

- **Tell users to install Safe SVG.** Cedes a feature we already have, adds an external dependency, and pushes friction onto every site that wants the single most common modern asset type. Rejected — we'd be recommending a plugin to replicate code we already ship.
- **Build a new, parallel opt-in SVG-upload system** (a fresh include + its own settings). This is what was *started* before the existing `sc_svg_*` code was found — and it registered a second `upload_mimes` filter and a second sanitising prefilter, i.e. it sanitised every SVG twice and duplicated a whole subsystem. Rejected the moment the duplication was visible: two systems doing the same job is a maintenance and correctness hazard.
- **Expose the EXISTING path as a per-role setting.** One new setting (Shortcodes extension → SVG Uploads, a role checklist), and `sc_svg_upload_allowed()` reads it. *Chosen.*

## Decision

- **Keep the one existing SVG-upload pipeline; make it per-role configurable.** A `svg_upload_roles` checklist (Shortcodes settings) drives `sc_svg_upload_allowed()`.
- **Default = Administrator only**, so the default is byte-for-byte the historical behaviour (no regression for sites already relying on admin SVG uploads or the Site Converter's sideloading). Checking Administrator covers every `manage_options`-capable user (custom admin-like roles included); other roles extend by role name; **unchecking every role switches SVG uploads off entirely.**
- **No plugin dependency, no second pipeline.** The trusted-flow filter (`fw_sc_svg_upload_allowed`) and the on-upload sanitiser are unchanged.
- **Home:** the **Page Builder settings** page. The SVG-upload *code* lives in the shortcodes extension, so the tidy choice would be to read the setting from there too — and it was first placed there for exactly that reason. But a builder capability belongs on the builder's own settings page, where people actually look for it (it's where Bricks puts it, and where it was requested), and that page is far more discoverable than the shortcodes extension's settings screen. So the reader takes one guarded cross-extension read (`fw_get_db_ext_settings_option('page-builder', 'svg_upload_roles', …)`, defaulting to Administrator if the value is unavailable): discoverability and user expectation won over avoiding the mild parent-reads-child coupling.

## Why

"Build vs buy" is the wrong framing when you already build it: the audited-dependency argument only applies to the sanitiser, and we already have one that guards several shipped features. Given that, taking a plugin dependency would add friction and surface area to duplicate our own code, and building a second in-house pipeline would be strictly worse than the first. The only thing missing was a knob, so the change is *just a knob* — the smallest edit that closes the gap, defaulting to the exact prior behaviour so nothing breaks.

The near-miss is the durable lesson: a whole parallel uploader was half-built before a `grep upload_mimes` across the extension surfaced the existing one. **Before adding an uploader (or any capability that feels like a framework primitive), grep for it first** — the plugin is large enough that "surely we don't have this yet" is not a safe assumption.
