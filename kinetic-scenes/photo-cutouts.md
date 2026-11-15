---
sidebar_position: 11.55
title: Photo cut-outs
description: Cut the subject out of a photo (a dish, a product, a bouquet, a pet) so a scene made from photos stops looking like a slideshow. On your own computer, with the AI Dev Kit.
---

# Photo cut-outs

Most small businesses have **photos, not video**: a plate of food, a coffee, a cake, a bouquet, a product, a dog after its
groom. Move those photos around as rectangles and the result reads as a slideshow, however good the motion is.

A **cut-out** takes the subject out of its photo, with a see-through background, so it becomes a layer of its own. Then
the scene can:

- put it on the brand's colour, on a soft shadow;
- put **big words behind it**, so the subject overlaps the letters;
- **drop** it in, or slide it in, to land on its shadow;
- **lift it off its own photo** while the photo behind dims;
- give it and its background different depths, so a camera move turns one photo into a 2.5D shot.

It runs on your computer through the [AI Dev Kit](/kinetic-scenes/ai-agents): nothing is uploaded.

## Two ways to get one

**In the Studio: Cut out the object.** Select a picture, then **Cut out the object** in the Inspector:

1. **Check the AI Dev Kit** shows whether it can cut out pictures, and what the first use downloads (the cut-out model,
   about 224 MB, once).
2. **To cut out one thing among several** (one dish on a table), drag a box around it on the small picture. Without a
   box, the main subject is cut out. **Use the whole picture** clears the box.
3. Tick **Paint it out of the picture behind** to replace the photo under the cut-out with the photo with the subject
   painted out (about 208 MB more, once), so lifting the cut-out leaves no copy behind. It is soft where the subject
   was: dim or blur it.
4. Click **Cut out the object**. The cut-out is added as a new layer exactly over the photo (same box, fit, phone layouts
   and timing) and selected, ready for a Lift, a Float or a Sticker. Undo removes it.

The Studio shows the kit's verdict on the cut: **Clean cut**, **Look at the edges** (with notes such as a halo on one
side), or **Not a clean subject**. Nothing is added then: drag a box around the one thing to cut out and try again.

**In the Studio: Split into layers.** Select a picture, then **Split into layers** in the Inspector. The picture becomes
two layers in exactly the same place: the background (with the subject painted out) and the subject. Once the kit's
photo cut-out models are downloaded (below), the split uses them; before that it uses a smaller, rougher model.

**With an AI agent or the command line:**

```bash
studio-cli cutout photos/dish.jpg photos/cake.jpg --out "<project>/media"
```

An AI agent connected to the kit uses the `image_cutout` tool, and reads the kit's guide on when a cut-out helps and when
it doesn't (`scene_guide` topic `cutouts`).

## What you get

For each photo:

| File | What it is |
|---|---|
| `<name>-cutout.png` | The subject, see-through around it, trimmed to its own size. |
| `<name>-check.png` | The cut-out on dark, on white and on a checkerboard, to check the edges at a glance. |
| `<name>-shadow.png` | With `--shadow`: the cut-out with a soft drop shadow, ready for a thumbnail or a web page. |
| `<name>-plate.jpg` | With `--fill`: the photo with the subject painted out, to sit behind the cut-out. |

Each photo also gets a verdict:

- **good:** use it.
- **check:** something to look at. The subject touches the photo's edge (keep that side against the edge of the frame), two
  separate things were cut out together (pick one with a region), or the edges are partly see-through (hair, fur, steam).
- **poor:** the photo has no single subject (a room, a street, a busy table). Use that photo whole, as a background.

Example output:

```
Cut-outs:
  ✓ dish.jpg → media/dish-cutout.png (705×782, 24% of the photo, fills 65% of its box, sure 98%)
  ✗ room.jpg → media/room-cutout.png (3% of the photo, fills 7% of its box)
     - No single subject: the model picked scattered pieces. Use this photo whole, not as a cut-out.
```

## Options

| Option | What it does |
|---|---|
| `--out <folder>` | Where the files go (default: a `cutouts` folder next to the photo). For a scene, use the project's `media` folder. |
| `--region l,t,r,b` | Cut out only what is inside this part of the photo (fractions: left, top, right, bottom). For a photo with several things, one run each, e.g. `--region 0.5,0.5,1,1` for the bottom-right quarter. |
| `--shadow` | Also save a copy with a soft drop shadow, on a canvas big enough that the shadow is never cut off. |
| `--fill` | Also save the photo with the subject painted out. |
| `--name <name>` | The file name to use (one photo at a time). |

## When it helps, and when it doesn't

Cut out the **hero** of a moment: the dish being named, the product being sold, the "after" picture. Keep places and
moods (a room, a shop front, a view) as whole photos. A good reel mixes both: two or three cut-out heroes on colour, the
rest as framed photos and backgrounds. A reel of nothing but cut-outs on flat colour starts to look like clip art.

## Good to know

- **The first run downloads the models:** the cut-out model (224 MB) and, with `--fill`, the painting model (208 MB), plus
  ONNX Runtime if voice and music separation hasn't installed it already. Both models are open source (MIT and Apache-2.0).
- **Speed:** a few seconds a photo on a graphics card, 5-15 seconds on the processor.
- **Memory:** it needs about 3 GB free. On a small graphics card it moves to the processor by itself.
- **The painted background is soft** where the subject was. It works behind the cut-out or dimmed, not as a sharp shot on
  its own.
- **One subject per run.** The tool cuts out what it sees as the main thing in the photo (or in the region). It can't be
  told "the cup, not the saucer", so crop with a region instead.
