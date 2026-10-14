---
slug: courses-in-membership-not-learning
title: "Why build courses into Membership instead of keeping the Learning extension?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-10-14
description: "Unyson+ inherited a Learning extension from the original Unyson. Membership plans its own Courses module, so the two overlapped. Learning had courses, lessons and a good quiz builder, but no progress tracking, enrolment or working access control; it is dropped and courses are built from scratch as a Membership module, on the same access rules, plans and drip as everything else."
---

**The question:** "We also have the Learning extension. I'm not sure yet if the extension needs to be updated or connected or what's best to do with the membership ext with the learning." After seeing the options: "Let's just drop the Learning extension. We can start from scratch."

<!-- truncate -->

## Context

The Learning extension came from the original Unyson (2014) and had a quiz upgrade in 2026: courses,
lessons, a quiz builder with five question types, a timer, feedback and a results screen. But it did not
record which lessons someone had finished (its "lesson passed" event fired on simply opening the page), it
had no enrolment, its "finish the previous lesson first" check depended on a part that never shipped, and
it had no drip, certificates, payments, REST or AI tools. It was not in the plugin's working copy and the
docs already listed it as not bundled. Meanwhile the Membership roadmap plans a Courses module (phase 11)
with ordered lessons, enrolment by plan, progress, quizzes that gate the next lesson, drip and certificates.

## Options considered

- **Membership's Courses module replaces Learning, carrying over its quiz engine.** One access engine and
  data model; the quiz work is reused; existing Learning sites could keep their content.
- **Keep Learning as the course system and connect it to Membership.** Courses sooner, but Learning first
  needs progress tracking, enrolment and fixes, and two products would have to stay in step: the exact seam
  the membership research warns about.
- **Merge Learning's code into Membership as it is.** No migration, but it brings 2014-era patterns into an
  otherwise current codebase.
- **Drop Learning and build Courses from scratch in Membership.**

## Decision

**Drop the Learning extension and build Courses from scratch as Membership's Courses module.** Learning is
removed from the Extensions catalogue so new sites are not offered it. Courses arrive with Membership's phase
11 and use its access rules, plans, drip and member area; no Learning code or data model is carried over.

## Why

- **One access engine.** A course is protected content with an order and progress. Building it on
  Membership's engine means a lesson is protected, dripped and opened by the same rules as everything else,
  instead of two systems that must agree.
- **What Learning lacked is the core of a course system.** Progress, enrolment and gating would have been
  new code either way; the quiz builder alone did not justify keeping a second product.
- **Nothing depends on it.** No current Unyson+ site ships Learning, so there is no content to migrate.
