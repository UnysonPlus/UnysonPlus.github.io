---
sidebar_position: 9
title: "A/B Testing a Section or a Page"
sidebar_label: "A/B tests"
description: "Test two versions of a page-builder section, or of a whole page, against a goal: choose the share of visitors who see the new version, read the result, and keep the winner with one click. No flicker, works with page caches."
---

# A/B tests

Test two versions of a **section**, or of a **whole page**, and let a goal decide which works better. You choose
how many visitors see the new version, and when the answer is clear you keep the winner with one click.

## Test a section

1. In the page builder, build both versions of the section, one under the other.
2. Publish the page. Make sure the [goal](./goals-and-funnels.md#goals) that decides already exists.
3. Open **A/B tests**, choose **Two versions of a section** and the page, then the two sections, the share and the goal,
   and **Start**.

Any band at the top level of the page can be tested: a Section, or a Div or Container used as one.

## Test a whole page

1. Open **A/B tests**, choose **Two versions of a page** and the page (version A, the one visitors know).
2. Click **Make a draft copy as version B**. It makes a draft with the same content and gives you a link to open it in
   the Live Editor. Change the copy: a new layout, other words, a different offer. (Any other page or draft built with
   the page builder can be version B too.)
3. Back on **A/B tests**, pick the draft as **Version B**, the share and the goal, and **Start**.

Visitors keep the same address. Page A renders both versions and each visit shows one, so links, search results and
the page's own settings are untouched: **only the builder content is tested**. The page title, header image, sidebar
and SEO stay page A's.

<img src="/img/visitor-insights/ab-start-form.png" alt="Start an experiment: the test type, the page, the Make a draft copy as version B button, then Name, Version B, Show B to (a share of visitors) and Goal" width="1644" />

## Choose the share

**Show B to** sets the share of visitors who see version B: 10% to 90%, 50% by default. Use less than half when B is a
risky change and you want most visitors to keep seeing what works; the result is fair either way, because each
version's rate is measured on its own visitors.

The choice is made in the visitor's browser before the page appears, so there is no flicker, and it works with page
caches. A visitor without JavaScript sees A.

## Read the result

<img src="/img/visitor-insights/ab-page-test-results.png" alt="A running page test: visitors, goal completions and rate for A and B, the verdict Version B is better with 99% confidence, and the Keep A / Keep B buttons" width="1644" />

*(Sample numbers on a test site.)*

The card shows visitors and goal completions for each version, the rate of each and the confidence.

| Message | Meaning |
| --- | --- |
| **Too early to tell** | Fewer than 100 visitors so far. |
| **No clear winner yet** | The difference could still be chance. Keep it running. |
| **Version A (or B) is better** | Confidence has reached 95%. The winner's Keep button is highlighted. |

A completion is credited to the version the visitor saw last, once per visitor per day.

## Keep the winner

Click **Keep A** or **Keep B**. You are asked to confirm, then:

| Test | Keep A | Keep B |
| --- | --- | --- |
| **Section** | Deletes section B from the page. | Deletes section A from the page (B stays where it is). |
| **Page** | Ends the test; the page stays as it is. | Copies version B's content into the live page. |

The test is marked **Winner kept**, and the page's content before the change is saved with it: **Undo keep** puts
the page back as it was (and stops the test, with both versions shown). The version B page of a page test is left as it
was; delete it when you no longer need it.

**Stop without choosing** ends a test and shows both sections again (section test) or only A (page test), changing
nothing.

## Limits

- One running test per page for a page test; a section can be in one running test at a time.
- A visitor is recognised only within a day, so someone who returns tomorrow may see the other version.
- A low-traffic page can take a long time to reach 95%. Testing a big difference gets you an answer
  sooner than testing a small one.
- A page test makes the page's HTML carry both versions while it runs (only one is shown), so the page is heavier
  for that time.
- Tests are not shown in the admin, the Live Editor or heatmap views. There you see the page as built.
- Tests travel in the [full export file](./import-export.md#the-full-file), not in a spreadsheet.

## For developers

`FW_VI_Experiments` (`visitor-insights/includes/class-fw-vi-experiments.php`). An experiment is stored in the
`fw_ext_vi_experiments` option: `type` (`section` | `page`), `post_id` (page A), `a` / `b` (section item ids; for a page
test `b` is the B post id), `goal`, `share` (B's %), `status` (`running` | `stopped` | `kept`), `winner`, and `undo`
(the replaced builder JSON). `keep( $id, 'a'|'b' )` and `undo_keep( $id )` are public; `copy_page( $post_id )` makes
the draft. The action `fw_vi_experiment_content_changed` fires when a keep or an undo rewrites a page.
