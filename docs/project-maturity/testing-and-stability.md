---
title: "Testing & stability"
sidebar_label: "Testing & stability"
sidebar_position: 4
slug: /project-maturity/testing-and-stability
description: "How Unyson+ guards against regressions — golden-output and parity test suites, a build-time completeness check that blocks incomplete releases, and small, verified milestone releases."
keywords:
  - is unyson+ stable
  - unysonplus automated tests
  - unyson+ regression testing
  - unyson+ quality assurance
  - unyson+ reliability
---

# Testing & stability

"Does every change risk a silent regression?" is the right question to ask of any framework. Unyson+
answers it with **automated checks plus a release discipline** that keeps shipped states known-good.

## Automated regression suites

The parts of the framework where a change is most likely to drift are covered by automated tests that
run against known-good expectations:

- **Golden-output tests.** For the generative surfaces — the Page Builder and the Site Converter —
  a set of fixed inputs is rendered and compared against a recorded "golden" output. If a change alters
  what the code produces, the test turns red and names exactly what moved, so an unintended change in
  rendered markup or CSS can't slip through unnoticed.
- **Parity tests.** Several features have **two implementations that must agree** — for example the PHP
  and JavaScript paths of the Site Converter, or a style produced server-side versus in the live
  builder preview. Parity tests assert the two produce the same result, which is what stops the two
  halves from quietly diverging.

## Releases can't ship incomplete

Before a public plugin zip is cut, a **build-time completeness check** parses every static
`require`/`include` in the staged tree and **aborts the build if a target file is missing**. That's
what prevents the classic packaging bug — a release that installs but fatals because a file didn't make
it into the zip. A release that fails the check never ships.

The public zip is also built with a tool that writes **spec-compliant archive paths**, because a
subtly malformed zip (wrong path separators) will fail to unpack on some hosts. The build is verified,
not assumed.

## Small, verified milestones

The project's working rule is that **GitHub releases are cut only from verified, known-good states** —
not from every intermediate commit. Combined with [version-driven delivery](./releases-and-versioning.md),
that means the versions your sites are offered correspond to milestones someone confirmed working, and
each one is small enough to reason about and, if needed,
[roll back](./releases-and-versioning.md#rolling-back).

## What this does and doesn't promise

- **It does** catch regressions in the high-risk generative code, block structurally broken releases,
  and keep shipped states verified.
- **It doesn't** replace testing a release against **your** specific site, plugins and host — no
  framework's test suite can model your stack. The release discipline and clean rollback path are there
  precisely to make that final check on your side low-risk.

:::tip[💡 Web dev tip: snapshot tests catch "it still runs but the output changed" bugs]
Golden-output (snapshot) testing is the standard way to guard code whose job is to *produce* output —
markup, CSS, serialized data. It fails not when the code throws, but when the result differs from the
approved baseline, which is exactly the class of regression a type checker or a smoke test misses.
[Testing overview and snapshot concepts (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Automated_testing)
:::
