---
slug: one-configurable-loan-calculator-in-the-library
title: Why the loan calculator is one configurable Library element, not a custom shortcode per site
authors: [jon]
tags: [shortcodes, site-creator, architecture]
date: 2026-11-27
description: Lending sites put a repayment calculator in the hero, and each lender's looks different. It ships as a single Shortcodes Library element with a fixed set of configurable inputs, because the differences between calculators are options rather than code, and getting the repayment maths slightly wrong on one site is the expensive kind of mistake.
---

**The question:** "We can create a calculator shortcode and put it in the Shortcodes Library where you can just pull
it out and modify it? Or better just create a custom shortcode, because I think most sites will have their own
calculator inputs? Or do you think a customizable calculator shortcode in the library is good?"

<!-- truncate -->

## Context

A study of commercial lending templates showed the trade has its own home-page shape: **the loan calculator, or the
first step of the application, sits in the hero.** Unyson+ had no element that takes an amount and a term and shows a
repayment, so a generated lending site could describe that hero and not build it.

## Options considered

1. **A custom shortcode written for each site.** Fits any lender exactly. It also means writing and checking the
   repayment maths again every time, and a small error in one of them is a wrong figure on a lender's home page.
2. **A fixed three-field calculator in the Library** (amount, term, result). Quick to build, and outgrown by the second
   site: one lender needs a deposit, the next a weekly term, the next a final payment.
3. **One configurable element in the Library.** More work up front; every later site sets options.

## Decision

Option 3: `loan_calculator`, installed from the Shortcodes Library.

Its inputs are a **fixed set** (amount, term, deposit, rate), each of which can be shown, labelled, ranged and given a
starting value. The rate has four modes: one the owner sets, a range the visitor chooses within, the visitor's own,
or a labelled representative example. Three formulas: reducing balance, flat rate, and one with a final payment. The
button can carry the chosen figures into an application form's address.

## Why

**Loan calculators differ less than they look.** Nearly all are the same machine: a few inputs, one formula, a result.
What changes between lenders is which inputs appear, their limits, the labels and what the result shows. That is
configuration.

**The inputs are a fixed set and not a free repeater, and that was a correction to the first proposal.** A formula has
to know which number is the amount and which is the term. A repeater row the formula cannot name would be a slider
that changes nothing. So the element offers the inputs a repayment formula can use and lets each be configured.

**The Library is the right home because it installs into the active theme.** Only some sites need a calculator, so it
stays out of core. And a lender with a truly unusual formula can open the installed copy and change it, which keeps
the "pull it out and modify it" route open for the rare case without making it the common one.

**The first result is worked out on the server, with the same formula the script uses.** The card shows real figures
before any script runs and nothing shifts when it loads. The cost is one formula written twice, in PHP and in
JavaScript, and the element's notes say so in both files.

**The rate is treated as a claim.** Two of the four rate modes print a number as the business's own, and a
"representative" rate is a regulated statement in many countries. The lending guidance in the AI Dev Kit therefore
uses those only with a figure the owner supplied; with none, the visitor moves the rate and the site is not quoting.
