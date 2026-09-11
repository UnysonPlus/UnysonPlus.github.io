---
slug: shared-hover-animations-library
title: "Why hover animations became one shared library for boxes and buttons (and where the tab sits)"
authors: [jon]
tags: [architecture, option-types]
date: 2026-09-11
description: "The custom hover-animation list lived under the Buttons tab, but boxes needed hover motion too — and once Box Presets moved ahead of Buttons in the Component Presets order, a button-owned library looked wrong. The question was whether to move the list to boxes, render it in both tabs, or make it a library both consume. The decision: one shared Hover Animations library in its own tab (after Section Styles, before Box Presets), consumed by the Button picker and a new Box Preset field, with the effect re-emitted onto the box preset's own class so nothing extra lands in the markup."
---

**The question:** We had just re-ordered the Component Presets tabs into a design-system cascade (tokens → containers → components → decoration), which put Box Presets *before* Buttons. The user-authored Hover Animations list (Pulse Ring, Swing, Rubber Band, …) lived inside the Buttons tab — so the effects a box might want sat behind the tab that came after it. Move the list to Box Presets? Show it in both tabs, kept in sync? Or is a list that updates "both places at once" a bad idea?

<!-- truncate -->

## Context

Two hover-effect systems existed side by side:

- **Buttons** had the built-in `.btnfx-*` effects (`hover-fx.css`, ~35 motion-only classes) plus the user list (`button_animations`, each emitting `.btnfx-c-{slug}`), both offered by the `button-hover-animation` picker. The effect is an extra class on the button element.
- **Box Presets** had a small, separate `hover_fx` multi-select (lift / zoom media / tilt / glow / shine) emitted as inline declarations on `.boxp-{slug}`.

The built-in CSS was already element-agnostic (`.btnfx-lift:hover`, not `.btn.btnfx-lift`), and the user list's only button-specific part was the `{{BTN}}` token name. The Site Converter had also just gained a fingerprint that maps a captured hover (`translateY` → Lift, `scale` → Grow, …) onto those presets, with a fidelity guard — and cards needed the same mapping.

## Options considered

- **Move the list to Box Presets.** *Pro:* it's next to the first thing that hovers. *Con:* just relocates the asymmetry — buttons would then depend on a box-owned list.
- **Render the same list inside both tabs.** *Pro:* discoverable from either place. *Con:* every Component Presets panel posts through one form, so one option id in two panels double-submits and clobbers itself; and two places to edit one thing is exactly the confusion a library avoids.
- **One shared library both consume (chosen).** *Pro:* it is how Color Presets already work — one list, many consumers; add an animation once and every picker offers it. *Con:* a new tab, a storage-key move, and the box side needs a way to *apply* an effect without an extra class on the element.
- **Where the tab goes.** After Spacing (a token library) vs. after Section Styles (right before Box Presets). A section never hovers; hover starts at the box, then the button — so the library sits where hover starts.

## Decision

**One shared Hover Animations library, in its own Components tab placed after Section Styles and before Box Presets, consumed by both the Button picker and a new Box Preset field.** Concretely:

- Storage moves to `hover_animations`; the legacy `button_animations` key is read as a fallback so existing sites keep their entries. Entries use `{{SELECTOR}}` + `{{ANIM}}`; `{{BTN}}` stays an alias.
- Box Presets gain `hover_animation` — the same `button-hover-animation` picker, same choices (`sc_get_hover_animation_choices()`), listing built-ins and customs. The older box-only `hover_fx` composites stay as "Extra Hover Effects".
- A box applies its effect **without any class on the element**: the presets stylesheet re-emits the effect onto `.boxp-{slug}` — a built-in is cloned from `hover-fx.css` (every rule naming the effect class, plus the `@keyframes` it animates, plus a reduced-motion guard); a custom entry is re-rendered with `{{SELECTOR}}` = the box (`unysonplus_hover_fx_css_for()`).
- The converter maps a captured card's lift/grow onto the box preset's `hover_animation` with the same fidelity guard buttons use (an effect that forces a hover shadow is only used when the source has no resting shadow to lose or its hover changes the shadow).

## Why

"Automatically updates both places" is the *point* of a library, not a hazard — the hazard is duplicated state, which the mirrored-tabs option would have created. Tying the apply-mechanism to the preset's own class (rather than adding `btnfx-*` to every card) keeps the box model consistent with how every other Box Preset trait works: the preset owns it, the markup stays clean, and the converter's "preset owns the appearance" rule extends to motion. Placing the tab at the start of the hover cascade (box → button) matches the design-system order the whole Components tab now follows.
