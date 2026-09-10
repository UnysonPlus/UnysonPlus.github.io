---
title: Calendar
sidebar_position: 3
sidebar_custom_props: { icon: '/img/shortcode-icons/calendar.svg' }
---

# Calendar

A date / events calendar. Tabs: **Content**, **Styling**, **Animations**, **Advanced**.

:::tip[💡 Web dev tip: dates should be machine-readable, not just human-readable]
A date printed as "Sat" or "12/9" is ambiguous to software and to visitors from a different locale, so dates and times are best marked up with a `<time datetime="2026-09-12">` element carrying the unambiguous ISO value alongside whatever friendly text you display. Search engines and calendar-aware browser features rely on that machine-readable form to understand event dates correctly. [MDN: the time element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
:::

## Live demo

**▶ [See the Calendar live on the demos site](https://demos.unysonplus.com/shortcodes/calendar/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/calendar-content.png" alt="Calendar options panel — Content tab" width="750" />

| Option | Choices |
| --- | --- |
| **Population Method** | How events are sourced |
| **Calendar Type** | Daily, Weekly, Monthly |
| **Start Week On** | Monday, Sunday |

:::note[Screenshots — calendar types]
Capture the Daily / Weekly / Monthly views: `calendar-daily`, `calendar-weekly`,
`calendar-monthly`.
:::

## Styling

<img src="/img/shortcodes/calendar-styling.png" alt="Calendar options panel — Styling tab" width="750" />

Text Color, Background Color, Heading Color, Navigation Buttons Color, and Margin & Padding.
