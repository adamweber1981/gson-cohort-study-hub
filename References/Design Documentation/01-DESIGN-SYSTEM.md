# GSON Accelerated Study Hub — Design System & Page Templates

**Version:** 1.0 · **Status:** Design direction approved; exact visual tokens proposed for implementation · **Updated:** 2026-10-21

## Visual identity
Official name: **GSON Accelerated Study Hub**. Visual reference: rounded, two-column course tiles, rich purple/slate surfaces, subtle gradients, and a mobile-first card interface. Use the supplied phone sketch for navigation and the purple mobile example for aesthetic direction. Do not copy third-party brand assets.

## Theme contract
Offer exactly five visible choices: **System, Light, Dark, Purple, Slate**. Purple is the first-visit default. A student's chosen theme may be stored **locally on that device only** (this is a visual preference, not a score or analytics record). System automatically responds to OS appearance changes. Each theme must provide distinct surface, text, border, accent, success, warning, and error tokens. Purple and Slate are full themes, not merely accent swaps.

Suggested starting palette, subject to contrast testing:

| Theme | Background | Surface | Accent | Text |
|---|---|---|---|---|
| Light | `#F7F7FA` | `#FFFFFF` | `#7651B8` | `#292536` |
| Dark | `#15131C` | `#292535` | `#B49BFA` | `#F7F5FA` |
| Purple | `#1B142B` | `#302444` | `#C9A9FF` | `#FFFFFF` |
| Slate | `#1F2937` | `#37465C` | `#A5B4FC` | `#FFFFFF` |
| System | follows Light/Dark tokens | — | — | — |

The palette is a **design starting point**, not a claim of validated WCAG contrast. Validate text/button/focus combinations before release. Define tokens in one shared stylesheet; prohibit per-exam hard-coded colors.

## Layout and interaction tokens
- Body type: system UI font stack; at least 16px for question and option text.
- Spacing: 4px scale with common 8/12/16/24/32px increments.
- Rounded cards: 16–24px; controls 10–14px; consistent focus rings.
- Minimum touch target: 44 × 44 CSS px. Keyboard navigation and visible focus required.
- Mobile-first layout: test at 320, 375, 390, 768, 1024px and desktop. No horizontal scrolling for normal text or choices.
- Honor reduced-motion preferences. No decorative imagery on exam questions.

## Shared navigation
- **Global header:** app identity, page context, Settings access.
- **Home:** newest term first; term headings and expandable course grids; reference library link. Adding a new term pushes earlier terms down the feed without removing them.
- **Course page:** term + course heading; actual numbered exam groups; cards for individual practice exam variants and resource links.
- **Exam introduction:** `Course Name` → `Exam N` → `Practice Exam Name`, question count, instructions, Start Exam.
- **Exam runner:** same three-line heading; `Question X of N`, progress bar, one question, selection controls, explicit Submit, feedback, then Next Question. See `02-EXAM-ENGINE-SPEC.md`.
- **Results:** total score, correct/incorrect counts, full exam review entry, Reset Exam, Return to Hub.
- **Full review:** every numbered question, chosen answer, correct answer, rationale, source link; read-only.
- **Reference library:** PDF titles and available source links, with accessible fallbacks.

## Mandatory exam-page actions
1. **References:** opens the current exam's source list; rationale links to relevant source and page.
2. **Return to Hub:** returns to hub; confirm before discarding an in-progress attempt.
3. **Score Exam:** finalizes/reveals score **only after all questions have been submitted**. Before then it is disabled or labeled unavailable; do not allow early termination to expose a score.
4. **Reset Exam:** asks for confirmation, clears attempt, and starts over with a new shuffle.

These actions may be arranged responsively (for example, a compact menu on narrow screens), but must remain discoverable and keyboard-accessible. Do not present nonfunctional controls.

## Feedback states
- **Unsubmitted:** neutral options; changing selection has no correctness indicator.
- **Submitted:** lock selection; reveal Correct/Incorrect, the correct answer, concise rationale, and source citation; display Next Question.
- **Review:** read-only status with both student selection and correct response visibly differentiated; accessible text labels must accompany colors.

## PWA-specific UI
- Installation guidance for iPhone and Android is context-sensitive.
- Notification toggle: Off, On, Permission denied, Not supported / install required, and Loading/Error. Do not represent permission granted before browser confirmation.
- Settings contains theme selection and notification preference, with clear explanations and no account controls.

## Content and legal safeguards
Source links may be unavailable on some devices; provide open-in-new-tab and download fallbacks. The site should clearly state that it is an unofficial student-created resource and that clinical answers require source review. Only distribute materials for which permission exists.
