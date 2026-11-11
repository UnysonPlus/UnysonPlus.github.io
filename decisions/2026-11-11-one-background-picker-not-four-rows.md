---
slug: one-background-picker-not-four-rows
title: "Why the admin background became one picker, and how a settings screen changes its value shape without losing anyone's setting"
authors: [jon]
tags: [option-types, admin-skin, back-compat, storage-model, extensions]
date: 2026-11-11
description: The Admin Skin's Background setting showed a type select plus a preset, a colour and an image all at once, whichever type was chosen. Decision — collapse them into one multi-picker that reveals only the chosen branch, and read the old flat value shape by meaning rather than by presence, because the framework's own getter makes presence unreadable.
---

**The question:** The Admin Skin's Background box listed four rows — a *Background* select (None / gradient preset / a colour / an image), then a Preset, a Colour and an Image — all visible at once, no matter which type was selected. Should that be one picker instead? And if it becomes one, what happens to the sites that already saved a background under the old shape?

<!-- truncate -->

## Context

A background is a choice *between* a preset, a colour and an image. They are alternatives; nothing
combines them. But the screen rendered all three sub-settings permanently, so a reader seeing
*Background: None* also saw *Preset: Dusk*, an empty colour swatch and an empty image frame, and had
to work out which — if any — was actually in effect. The honest answer was "none of them", which is
exactly what four live-looking rows failed to say.

The framework already has the control for this: `multi-picker`, a pick-one-then-reveal option type
used throughout Theme Settings and the Animation Engine. The cost of adopting it is not visual, it is
the **stored value shape**. Four flat keys (`bg_type`, `bg_preset`, `bg_color`, `bg_image`) become one
nested value, `{ type: 'image', image: { image: …, behind: … } }`, of which only the selected branch is
kept. Any site that had already set a background — including the one this was noticed on — had the old
shape on disk.

## Options considered

**Leave it as four rows.** No migration, no risk. But the confusion is real and permanent, and every
later background feature inherits it.

**Switch to a multi-picker and migrate the stored value once,** on an `admin_init` hook guarded by an
option flag, the way the uploads-folder consolidation works. Clean end state, but it writes to the
database on behalf of a user who never asked, and a migration that runs once is a migration you cannot
easily re-test on a real site afterwards.

**Switch to a multi-picker and read both shapes,** preferring the new one, with no write. Nothing is
migrated; the old keys simply stop being read once the screen is saved, because the settings form only
submits the options it defines. Slightly more code in the reader, and that code lives forever unless
someone deliberately removes it.

## Decision

One `multi-picker`, revealing only the chosen branch — and **read both shapes, write neither**. The
`image` choice also gained its own *Colour behind it* field rather than borrowing the standalone colour
setting, since "the flat background" and "what shows while the image loads" are different questions that
happened to share a control.

The non-obvious part is how the reader tells the two shapes apart. The obvious test — *is `bg` set?* —
does not work, because `fw_get_db_ext_settings_option()` merges the option definitions' defaults into
what it returns. `bg` is therefore **always** present, reading `{ type: 'none' }` even on a site that
has never saved one, so a presence check silently makes every legacy background disappear. (It did
exactly that on the first attempt; nine stored-value cases run through the real reader is what caught
it, not inspection.)

So the reader decides by **meaning**: the new shape wins whenever it names an actual background, and
only a silent one falls back to the flat keys. After the screen is saved once the legacy keys are gone,
so the fallback retires itself without anyone migrating anything.

## Why

Showing a setting that is not in effect is worse than hiding it — an inert row reads as live, and the
cost lands on whoever has to reason about which one wins. The framework already had the right control,
so this was a question of using it rather than inventing anything.

On the compatibility half: a silent write to someone's settings is a poor trade for code tidiness,
especially when the alternative costs one function and expires on its own. And the specific trap is
worth recording beyond this extension — **any** settings reader in this framework that tries to detect
"was this ever saved?" by checking whether a key is present will get `true` from the defaults, for
every key, on every site. Presence is not evidence here. Meaning is.
