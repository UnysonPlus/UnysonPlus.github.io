---
title: Loan Calculator
sidebar_position: 27
sidebar_custom_props: { icon: '/img/shortcode-icons/loan-calculator.svg' }
description: "A loan repayment calculator for WordPress: sliders for the amount, term, deposit and rate, the monthly payment worked out live, and a button that carries the figures into your application form."
keywords:
  - loan calculator wordpress
  - car finance calculator
  - repayment calculator
  - monthly payment calculator
  - emi calculator wordpress
---

# Loan Calculator

Sliders for the amount and the term, with the repayment worked out as the visitor moves them. Add a
deposit and an interest rate if you want them, choose how the repayment is calculated, and point the
button at your application page. Tabs: **Content**, **Styling**, **Animations**, **Advanced**.

:::note[Installed from the Shortcodes Library]
Loan Calculator isn't bundled with Unyson+, so sites that don't need it stay lean. Install it once per
site: **Unyson+ → Shortcodes**, find **Loan Calculator** in the **Shortcodes Library** and click
**Install**. It then appears under **Content Elements** in the page builder.
:::

<img src="/img/shortcodes/loan-calculator-demo.png" alt="Loan Calculator: four sliders for car price, term, deposit and rate above the monthly payment, the total to repay and the cost of credit, with an enquiry button" width="575" />

## What it is for

Lending sites put the calculator where the visitor's first question is: in the hero, beside the
headline. This element is built for that spot. It also works as its own band further down a page, or
alone on a calculator page.

The first result is worked out on the server, so the card shows real figures before any script runs
and nothing jumps when the page finishes loading.

## The inputs

The calculator has a fixed set of inputs, each of which you can label, range and give a starting value.

| Input | What you set |
| --- | --- |
| **Amount** | Label, minimum, maximum, step and starting value. Always shown |
| **Term** | The same, plus whether it is counted in months, years or weeks. Months and years pay monthly; weeks pay weekly |
| **Deposit** | Off by default. When on, it is taken off the amount before the repayment is worked out |
| **Interest rate** | Four choices, described below |

## The interest rate

This is the setting to think about, because a rate printed on your page is a claim about your business.

| Choice | Use it when |
| --- | --- |
| **One rate that I set** | You lend at a single rate. The rate is shown under the results |
| **A range the visitor chooses within** | Your rate depends on the applicant. The visitor gets a rate slider between your lowest and highest |
| **The visitor types their own rate** | You are comparing, or the rate is not yours to state |
| **A representative example** | You quote per applicant but have a representative figure you are allowed to show. It is labelled as an example |

:::caution[Use a figure you can stand behind]
"One rate" and "Representative example" both print a number as yours. In many countries a
representative rate is a regulated statement. If you have no rate to state, choose the range or the
visitor's own rate, so the visitor is exploring and your site is not quoting.
:::

## How repayments are worked out

| Choice | What it does |
| --- | --- |
| **Reducing balance** | Interest on what is still owed. Right for most loans and hire purchase |
| **Flat rate** | Interest on the full amount for the whole term |
| **With a final payment** | Part of the amount is left to the end as one payment, so the regular payments are lower. Set the final payment as a percentage of the amount |

## Results, button and note

- **Results:** the payment is always shown. Switch on the total to repay, the cost of credit and (with
  a final payment) the final payment, and label each one. Call the payment "Weekly payment" when the
  term is in weeks.
- **Currency:** the symbol, and whether it sits before or after the number.
- **Button:** a label, a link and a button preset. With **Carry the figures into the link** on, the
  chosen amount, term, deposit and rate are added to the link (`?amount=14000&term=48`), so an
  application form can start already filled in.
- **Note under the calculator:** keep a line saying the figures are illustrative. A calculator is a
  guide, not an offer.

## Styling

- **Box Style:** a box preset from Theme Settings for the card. With none chosen the calculator uses
  its own white card, which keeps its dark text even on a dark section.
- **Accent Colour:** the slider fill, the slider handle and the payment figure. It defaults to your
  theme's primary colour.

## Limits

- The inputs are a fixed set. A calculator with a different formula (tiered rates, fees by band)
  needs the installed copy edited: the element lives in your theme after installing, so it can be.
- Numbers use a comma for thousands and a point for decimals.
- The carried figures need a real page address as the button link; an `#anchor` is left as it is.
