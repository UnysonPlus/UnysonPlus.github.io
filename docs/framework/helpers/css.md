---
title: "CSS Helpers"
sidebar_position: 4
---


Useful css classes for admin side. To use these helpers, add `fw` to your style dependencies:

```php
wp_register_style(..., ..., array('fw'));
```

## General

### Alignment classes

Easily realign text to components with text alignment classes.

```html
<p class="fw-text-left">Left aligned text.</p>
<p class="fw-text-center">Center aligned text.</p>
<p class="fw-text-right">Right aligned text.</p>
<p class="fw-text-justify">Justified text.</p>
<p class="fw-text-nowrap">No wrap text.</p>
```

### Transformation classes

Transform text in components with text capitalization classes.

```html
<p class="fw-text-lowercase">Lowercased text.</p>
<p class="fw-text-uppercase">Uppercased text.</p>
<p class="fw-text-capitalize">Capitalized text.</p>
```

### Responsive images

Images can be made responsive-friendly via the addition of the `.fw-img-responsive` class. This applies `max-width: 100%;` and `height: auto;` to the image so that it scales nicely to the parent element.

```html
<img  src="..."  class="fw-img-responsive"  alt="image Responsive" >
```

### Delete icon

Use the generic delete icon for links that delete something.

```html
<a href="#" class="dashicons fw-x"></a>
```

### Quick floats

Float an element to the left or right with a class. `!important` is included to avoid specificity issues. Classes can also be used as mixins.

```html
<div class="fw-pull-left">...</div>
<div class="fw-pull-right">...</div>
```

### Center content blocks

Set an element to `display: block` and center via margin. Available as a mixin and class.

```html
<div class="fw-center-block">...</div>
```

### Clearfix

Easily clear floats by adding `.fw-clearfix` to the parent element. Utilizes the micro clearfix as popularized by [Nicolas Gallagher](http://nicolasgallagher.com/about/). Can also be used as a mixin.

```html
<div class="fw-clearfix">...</div>
```

### Showing and hiding content

Force an element to be shown or hidden. These classes use `!important` to avoid specificity conflicts, just like the quick floats. They are only available for block level toggling. They can also be used as mixins. Furthermore, `.fw-invisible` can be used to toggle only the visibility of an element, meaning its display is not modified and the element can still affect the flow of the document.

```html
<div class="fw-show">...</div>
<div class="fw-hidden">...</div>
```

### Image replacement

Utilize the `.fw-text-hide` class or mixin to help replace an element's text content with a background image.

```html
<h1 class="fw-text-hide">Custom heading</h1>
```

## Grid system

Css helpers includes a responsive, fluid grid system that appropriately scales up to 12 columns as the device or viewport size increases. Grid systems are used for creating layouts through a series of rows and columns that house your content. Here's how the grid system works:

- Use rows to create horizontal groups of columns.
- Content should be placed within columns, and only columns may be immediate children of rows.
- Predefined grid classes like `.fw-row` and `.fw-col-xs-4` are available for quickly making grid layouts.
- Grid columns are created by specifying the number of twelve available columns you wish to span. For example, three equal columns would use three `.fw-col-xs-4`.
- If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.
- Grid classes apply to devices with screen widths greater than or equal to the breakpoint sizes, and override grid classes targeted at smaller devices. Therefore, applying any `.fw-col-md-` class to an element will not only affect its styling on medium devices but also on large devices if a `.fw-col-lg-` class is not present.

This grid system was inspired from [bootstrap](http://getbootstrap.com/) with some modifications:

- Added `.fw-` prefix to classes
- Changed media queries screen sizes
- Rows are used without containers (no `.container` and `.container-fluid`)
- Rows have no padding

### Media queries

We use the following media queries to create the key breakpoints to a narrower set of devices.

```css
/* Extra small devices (phones) */
@media (max-width: 782px) { ... }

/* Small devices (tablets) */
@media (min-width: 783px) and (max-width: 900px) { ... }

/* Medium devices (desktops) */
@media (min-width: 901px) and (max-width: 1199px) { ... }

/* Large devices (large desktops) */
@media (min-width: 1200px) { ... }
```

### Columns

Using a set of `.fw-col-*` classes, you can create grid systems that look good on any device:

- `.fw-col-xs-*` - extra small devices (phones).
- `.fw-col-sm-*` - small devices (tablets)
- `.fw-col-md-*` - medium devices (desktops)
- `.fw-col-lg-*` - large devices (large desktops)

:::tip
More details about grid system and examples can be found [here](http://getbootstrap.com/css/#grid).
:::

## Responsive utilities

For faster mobile-friendly development, use these utility classes for showing and hiding content by device via media query.

:::info
Try to use these on a limited basis and avoid creating entirely different versions of the same site. Instead, use them to complement each device's presentation.
:::

### Available classes

Use a single or combination of the available classes for toggling content across viewport breakpoints.

<table style="width:97%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 20%" />
<col style="width: 18%" />
<col style="width: 19%" />
<col style="width: 20%" />
</colgroup>
<tbody>
<tr>
<td></td>
<td><p>Extra small devices</p>
<p>(&lt;783px)</p></td>
<td><p>Small devices</p>
<p>(≥783px)</p></td>
<td><p>Medium devices</p>
<p>(≥901px)</p></td>
<td><p>Large devices</p>
<p>(≥1200px)</p></td>
</tr>
<tr>
<td><code>.visible-xs-*</code></td>
<td><strong>Visible</strong></td>
<td>Hidden</td>
<td>Hidden</td>
<td>Hidden</td>
</tr>
<tr>
<td><code>.visible-sm-*</code></td>
<td>Hidden</td>
<td><strong>Visible</strong></td>
<td>Hidden</td>
<td>Hidden</td>
</tr>
<tr>
<td><code>.visible-md-*</code></td>
<td>Hidden</td>
<td>Hidden</td>
<td><strong>Visible</strong></td>
<td>Hidden</td>
</tr>
<tr>
<td><code>.visible-lg-*</code></td>
<td>Hidden</td>
<td>Hidden</td>
<td>Hidden</td>
<td><strong>Visible</strong></td>
</tr>
<tr>
<td><code>.hidden-xs</code></td>
<td><strong>Hidden</strong></td>
<td>Visible</td>
<td>Visible</td>
<td>Visible</td>
</tr>
<tr>
<td><code>.hidden-sm</code></td>
<td>Visible</td>
<td><strong>Hidden</strong></td>
<td>Visible</td>
<td>Visible</td>
</tr>
<tr>
<td><code>.hidden-md</code></td>
<td>Visible</td>
<td>Visible</td>
<td><strong>Hidden</strong></td>
<td>Visible</td>
</tr>
<tr>
<td><code>.hidden-lg</code></td>
<td>Visible</td>
<td>Visible</td>
<td>Visible</td>
<td><strong>Hidden</strong></td>
</tr>
</tbody>
</table>

The `.visible-*-*` classes for each breakpoint come in three variations, one for each CSS display property value listed below.

|                           |                          |
|---------------------------|--------------------------|
| Group of classes          | CSS `display`            |
| `.visible-*-block`        | `display: block;`        |
| `.visible-*-inline`       | `display: inline;`       |
| `.visible-*-inline-block` | `display: inline-block;` |

So, for extra small (`xs`) screens for example, the available `.visible-*-*` classes are: `.visible-xs-block`, `.visible-xs-inline`, and `.visible-xs-inline-block`.
