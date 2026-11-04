---
sidebar_position: 9
title: "A/B Testing a Section"
sidebar_label: "A/B tests"
description: "Test two versions of a page-builder section against a goal, with no flicker, on cached pages, and let the numbers pick the winner."
---

# A/B tests

Test two versions of a section on the same page, with half the page views each, and let a goal decide.

## Run a test

1. In the page builder, build both versions of the section, one under the other.
2. Publish the page. Make sure the [goal](./goals-and-funnels.md#goals) that decides already exists.
3. Open **A/B tests**, choose the page, the two sections and the goal, and start the test.

Half of the page views see A and half see B. The choice is made in the visitor's browser before the page
appears, so there is no flicker, and it works with page caches. A visitor without JavaScript sees A.

## Read the result

The view shows visitors and goal completions for each version, the rate of each and the confidence.

| Message | Meaning |
| --- | --- |
| **No clear winner yet** | The difference could still be chance. Keep it running. |
| **Version A (or B) is better** | Confidence has reached 95%. |

A completion is credited to the version the visitor saw last, once per visitor per day.

## Finish a test

**Stop** the test. The winner keeps showing, and the other version stays hidden. When you are ready,
delete the other section in the builder.

## Limits

- It tests sections, not whole pages or single elements. Both sections must be on the same page.
- A visitor is recognised only within a day, so someone who returns tomorrow may see the other version.
- A low-traffic page can take a long time to reach 95%. Testing a big difference gets you an answer
  sooner than testing a small one.
- Tests are not shown in the admin, the Live Editor or heatmap views. There you see both sections.
- Tests travel in the [full export file](./import-export.md#the-full-file), not in a spreadsheet.
