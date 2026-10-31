# GSON Accelerated Study Hub — Design System & Page Templates

**Version:** 1.2 · **Status:** Design direction and implemented practice extensions · **Updated:** 2026-10-30

## Visual identity

The owner selected Modern Workspace on October 30, 2026: neutral surfaces, compact typography, consistent line icons, a desktop sidebar, and a two-column course grid. No large hero, decorative gradients, or emoji navigation. See [Modern Workspace](11-MODERN-WORKSPACE.md) for the development implementation and verification record.

## Theme contract

Exactly five visible palettes: Slate + Teal and Ivory + Burgundy (light); Charcoal + Amber, Midnight + Blue, and Aubergine + Lavender (dark). Slate + Teal is the first-visit default. This owner request supersedes the earlier System/Light/Dark/Purple/Slate palette contract. Preferences remain local to the device and are shared by the hub and shared-engine exam pages. Existing preferences migrate as documented in the workspace record. Legacy standalone exam pages retain their embedded presentation.

Tokens include background, surfaces, text, borders, accent, focus, success, error, and warning. Keep them in the shared workspace stylesheet. Optional answer-choice color palettes remain independent of the app theme.

## Layout and interaction tokens

- Body and exam option text use the system sans-serif stack; question/control text remains at least 16px.
- Cards and controls use restrained 6–8px corners, subtle structural borders, and visible focus rings.
- Desktop sidebar changes to compact top navigation below 760px; course tiles become one column below 480px.
- Touch targets are at least 44px; keyboard skip navigation and labeled controls remain available.
- Honor reduced-motion preferences. No decorative imagery on exam questions.
- Test narrow widths and actual controls; passing token contrast tests alone is not full WCAG validation.

## Shared navigation
- **Global header:** app identity, page context, Settings access.
- **Home:** newest term first; recency-sorted course tiles with direct latest-exam actions; sidebar reference-library link. Adding a new term pushes earlier terms down the feed without removing them.
- **Course page:** term + course heading; actual numbered exam groups; cards for individual practice exam variants and resource links.
- **Exam introduction:** `Course Name` → `Exam N` → `Practice Exam Name`, instructions, practice-mode selector and count where configured, and Start Exam. Custom mode reveals category checkboxes, nested subject/drug checkboxes, an eligible-pool status, and a whole-number count field.
- **Exam runner:** same three-line heading; `Question X of N`, progress bar, one question, selection controls, explicit Submit, feedback, then Next Question. See `02-EXAM-ENGINE-SPEC.md`.
- **Results:** total score, correct/incorrect counts, full exam review entry, Reset Exam, Return to Hub.
- **Full review:** every numbered question, chosen answer, correct answer, rationale, source link; read-only.
- **Reference library:** clear source titles, in-page view/open/download actions, an optional GitHub source index, and explicit original-source GitHub links. A large original stored in verified parts is presented as a download of the reconstructed original, with failures reported rather than offering corrupt bytes.

## Mandatory exam-page actions
1. **References:** opens the current exam's source list; rationale links to relevant source and page.
2. **Return to Hub:** returns to hub; confirm before discarding an in-progress attempt.
3. **Score Exam:** finalizes/reveals score **only after all questions have been submitted**. Before then it is disabled or labeled unavailable; do not allow early termination to expose a score.
4. **Reset Exam:** asks for confirmation, clears the attempt, and returns to setup; starting again creates a new shuffle.

These actions may be arranged responsively (for example, a compact menu on narrow screens), but must remain discoverable and keyboard-accessible. Do not present nonfunctional controls.

## Practice-selection presentation

- Prefer the blueprint's optional `standardLabel` for a study plan such as **Mixed practice (50 questions)**; otherwise retain the full-blueprint label.
- Main categories and nested choices are independently labeled, keyboard/touch-operable checkboxes. A selected category reveals its choices; students can combine categories and deselect individual choices. Show availability changes with an accessible status message.
- No eligible questions means Custom practice cannot start. Enforce whole-number count bounds against the actual filtered pool.
- Medication names in generated Pharmacology content and labels are generic. Original course references remain unedited and may retain their source terminology.
- Preserve the normal in-page source viewer alongside **Original source on GitHub**; do not route an external GitHub URL into a same-origin-only viewer.

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

