---
slug: animation-studio-ai-assist
title: "How should the Animation Studio support both hand-made and AI-made scenes?"
authors: [jon]
tags: [animation, admin-ui, ai-assistant]
date: 2026-10-15
description: The Animation Studio gets a floating AI assist button (a chat with the AI Dev Kit, like the Unyson+ AI Assistant) in place of an AI tab, plus a Check scene tab. Both run on one set of measured motion rules, so the AI is told what Check scene measures, and refining an AI scene uses the same tools as building one by hand.
---

**The question:** The Studio should work two ways: someone builds a scene entirely by hand, or the AI makes it and
they refine it easily. The only AI available is the user's own, through the AI Dev Kit. How should the interface
serve both, and should the AI keep its tab or get a button like the Unyson+ AI Assistant's?

<!-- truncate -->

## Context

The AI lived in a tab beside the Inspector, so using it hid the properties, and nothing connected an AI answer to the
refining that follows. An audit of two motion-design projects showed that the useful rules (durations, ease roles,
reading time, minimum text size, no two clips fighting) are measurable from the scene file alone, so the same rules can
both instruct the AI and check anyone's scene.

## Options considered

- **Keep the AI tab.** Familiar, but it competes with the Inspector for the same panel, so you can't ask for a change
  while looking at the result's properties.
- **A floating AI assist button that opens a chat** (as in the Unyson+ AI Assistant). Always available, sits over the
  stage rather than replacing a panel, keeps a history of requests, and matches the product the user already knows.
- **Rules only in the AI prompt.** Better AI output, but hand-built scenes get no help and nobody can see why the AI
  did what it did.
- **Rules as a shared check** (Check scene) that the AI is also told about. Hand-built and AI-built scenes are judged
  the same way, and the check's findings become the next AI request.

## Decision

- **✦ AI assist** is a floating button over the stage that opens a chat with the AI Dev Kit. The AI tab is removed.
  The panel names the AI that is answering, offers scope chips (this scene, the selected layers, a new scene) and
  starter ideas, and every answer is one undo step with **Go back to before this** and a Check scene count.
- **Check scene** is a tab of its own, for everyone: findings, one-click fixes, **Apply all**, and **Fix with AI**,
  which hands the findings to AI assist.
- **One rule set.** The Studio sends its motion rules to the AI with every request, and Check scene measures the same
  rules. Twelve measured eases, an accelerating default for exits and a natural stagger rhythm make hand-built
  scenes start from the same defaults.

## Why

A chat over the stage keeps the AI one click away without taking the Inspector's place, and it is the pattern
Unyson+ users already know from the AI Assistant. Making the rules a check rather than only a prompt is what makes
"AI makes it, I refine it" easy: the AI's result arrives already measured, the list says what is left, and the
person fixes each item by hand, in one click, or by asking the AI, whichever is quicker.
