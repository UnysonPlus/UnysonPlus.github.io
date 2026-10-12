---
slug: builder-sync-merged-into-elementor
title: "Why did Builder Sync become part of the Elementor extension?"
authors: [jon]
tags: [extensions, architecture, admin-ui]
date: 2026-10-12
description: "Builder Sync shipped as its own extension so it could serve any page builder. Elementor was its only builder, and it did nothing on a site without Elementor, so it became the Elementor extension's Design Sync setting. The builder-neutral design stays inside, so a second builder can still plug in."
---

**The question:** Do we need to expose the Builder Sync extension at all, as its own card on the Extensions page?

<!-- truncate -->

## Context

[Builder Sync](/decisions/two-way-design-sync-with-page-builders) was made a separate extension so it could serve any page builder: a builder-neutral design model with one provider per builder. Six days later Elementor was still its only provider, and the extension did nothing on a site without Elementor. Its card sat in the Extensions list next to the **Elementor** extension, which had just been [renamed](/decisions/name-the-elementor-extension-after-elementor) to be the home for everything Unyson+ does inside Elementor. Someone working in Elementor would look for "keep my colours in sync" in the Elementor extension's settings. They would not look for a second extension with a builder-neutral name.

## Options considered

- **Keep it as its own extension.** It is builder-neutral on paper, but in practice it is a second card that is useless without Elementor and gives no hint that the two belong together.
- **Hide the card and switch it on with the Elementor extension.** Less work, but the setting would live on an extension nobody can see, and two extensions would still have to be kept in step.
- **Fold it into the Elementor extension as a setting.** One place to find it, one extension to install and update. The neutral model and the provider filter come along unchanged.

## Decision

Builder Sync is now the Elementor extension's **Design Sync** (Elementor 1.0.10): **Design Sync → Sync with Theme Settings**, two-way (default), one-way or off. The classes, the `fw_builder_sync_providers` filter and the colour identity map keep their names, so nothing stored on a site has to move. A site that had Builder Sync on keeps its direction: the setting is copied over and Builder Sync deactivates itself on the next dashboard visit. Until then the old copy keeps syncing and the new one stands aside, so the two never race. The Site Converter now pushes Theme Settings into Elementor through the Elementor extension. Builder Sync is hidden from the list of extensions to download.

## Why

An extension's job is to be found where people expect it. Every user of this sync is an Elementor user, so the sync belongs with Elementor. Keeping the design builder-neutral inside the extension costs nothing. If a second builder ever needs syncing, the shared core can be split out again then, with two real users to shape it, instead of on a guess.
