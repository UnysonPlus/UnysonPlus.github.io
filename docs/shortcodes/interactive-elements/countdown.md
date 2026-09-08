---
title: Countdown Timer
sidebar_position: 22
sidebar_custom_props: { icon: '/img/shortcode-icons/countdown.svg' }
---

# Countdown Timer

A live countdown to a target date and time — days, hours, minutes and seconds — with full
typography control. Tabs: **Content**, **Style**, **Animations**, **Advanced**.

<img src="/img/shortcodes/countdown-backend.png" alt="Countdown Timer on the Page Builder canvas" width="936" />

:::tip[💡 Web dev tip: a countdown's numbers should be real, readable text]
A countdown driven purely by an image or canvas gives search engines and screen readers nothing to read, and it can't be selected or copied like normal text. Rendering the days/hours/minutes/seconds as plain text nodes — which is how UnysonPlus outputs this timer — keeps the number accessible and indexable even though JavaScript is what keeps it ticking. [MDN: the time element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
:::

## Content

<img src="/img/shortcodes/countdown-content.png" alt="Countdown Timer options panel — Content tab" width="840" />

| Option | Choices |
| --- | --- |
| **Target Date & Time** | Date/time picker — the countdown target |
| **Days / Hours / Minutes / Seconds** | Each can be shown or hidden individually |
| **Days / Hours / Minutes / Seconds Label** | Custom labels (defaults: `Days`, `Hours`, `Minutes`, `Seconds`) |
| **When It Reaches Zero** | Show a message · Keep showing zeros · Hide the timer |
| **Completed Message** | Text shown when the countdown ends |

## Style

<img src="/img/shortcodes/countdown-style.png" alt="Countdown Timer options panel — Style tab" width="840" />

| Option | Choices |
| --- | --- |
| **Alignment** | Left · Center · Right · Inherit |
| **Number Font** | Typography (size, weight, line-height) |
| **Number Color** | Preset or custom |
| **Label Font** | Typography (size, weight, line-height) |
| **Label Color** | Preset or custom |
| **Box Preset** | Border, corners, shadow and fill style (or None) |
