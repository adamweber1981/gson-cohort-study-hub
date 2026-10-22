# GSON Accelerated Study Hub — Exam Engine & NCLEX-Style Interaction Specification

**Version:** 1.0 · **Status:** Required behavioral contract · **Updated:** 2026-10-21

## Core rule
**Exactly one question is shown at a time.** Students move **forward only**. They cannot navigate back to an answered question during the attempt. After completing the exam and scoring it, they may review **all questions**, freely, in **read-only** mode.

This simulates the forward-only navigation aspect of NCLEX. Unlike the actual NCLEX, the practice mode deliberately gives correctness feedback and a rationale immediately after each submission.

## Header (required on all exam screens)
Display in this order:
1. **Course name** (e.g., Fundamentals of Nursing)
2. **Actual course exam number** (e.g., Exam 2)
3. **Practice exam name** (e.g., Practice Exam A)

Do not confuse a practice version (A/B) with the course's actual exam number (1/2/etc.).

## State machine
`INTRO → ACTIVE_UNSUBMITTED → ACTIVE_SUBMITTED → [NEXT → ACTIVE_UNSUBMITTED]* → ALL_SUBMITTED → RESULTS → REVIEW`

- `INTRO`: show instructions, question count, and Start Exam.
- `ACTIVE_UNSUBMITTED`: show one question; allow answer selection/editing; **do not grade or reveal correctness**. Submit disabled until required response is complete.
- `ACTIVE_SUBMITTED`: lock answer; reveal correct/incorrect, correct answer, rationale, source/page; show **Next Question**. No Previous button, jump list, or question editing.
- `NEXT`: advance to the next unseen question; render it alone; preserve locked answers in memory for final review.
- `ALL_SUBMITTED`: after the last submitted question and feedback, offer **Score Exam**. Do not show score before this action.
- `RESULTS`: show score summary and **Review Entire Exam**.
- `REVIEW`: all questions may be visited freely or viewed as a complete numbered list; responses and scores are immutable.
- `RESET`: accessible from exam screens, requires confirmation, clears attempt and starts a new randomized attempt at question 1.

**No skip / unanswered progression:** In this specification, a student must submit each question before advancing. Thus there are no unanswered questions in a completed exam. This supersedes the older early-scoring/unanswered-count proposal. If a future Skip feature is requested, it requires a new specification version.

## Question types and submit rules
| Type | Before submit | Submit | Grading |
|---|---|---|---|
| Multiple choice | Select exactly one | `Submit Answer` | 1 point if correct |
| SATA | Select one or more; adjust freely | `Submit Answers` | 1 point only if exact correct set |
| Matching | Assign all required pairs | `Submit Matches` | 1 point only if all pairs correct |
| True/False | Choose one | `Submit Answer` | 1 point if correct |
| Dosage calculation | Select or enter required numeric answer; show units and rounding instructions | `Submit Answer` | 1 point if exact keyed answer or explicitly defined numeric tolerance |
| Case study | Show shared case details as needed alongside **one** active question | Submit relevant question | Grade each question independently |

No answer choice may reveal correctness on first tap/click. No automatic submission on selection. No partial credit by default. No second attempts at an answered question during an exam.

## Progress, numbering, randomization
- Render `Question 1 of N` through `Question N of N`; numbers reflect **display order**, not question-bank IDs.
- Randomize question order and answer order when the attempt begins, respecting any case-study grouping dependencies.
- Preserve correct answer mappings, matching targets, rationales, source metadata, and clinical logic after shuffling.
- On Reset, reshuffle again. No repeat question within an exam attempt.
- A question bank must have stable IDs, course, exam number, practice name, topic, subtopic, type, stem, options/pairs, correct key, rationale, and source citation.
- Topic quotas and question-type quotas are specified by each exam's blueprint and validated at build time; do not hardcode Fundamentals ratios for all future courses.

## Score Exam and review
- `Score Exam` is visible in the shared exam actions but disabled/unavailable until the final question has been submitted; pressing it then displays results.
- Score = correctly submitted questions ÷ total questions × 100, with total correct and incorrect counts.
- Final review is available only **after** scoring. It includes all questions in the original attempt order, student's submitted responses, correct responses, rationale, and source link/page.
- Review mode permits Previous/Next or jump navigation **only because the attempt is over**. No changing submitted answers or resubmitting.
- No score/answer upload, analytics event, or server persistence. State exists in memory for the open attempt; browser refresh may lose it. Provide a warning on leaving when possible.

## Source and reference rules
- Every question includes an independently verified reference (document name, canonical path, 1-based PDF page index where available) that supports its stem, answer, and rationale.
- The **References** action lists the exam's sources. The feedback panel and full review provide the specific question's source link.
- `#page=N` may be used for PDF deep links; browsers and mobile PDF viewers may ignore it. Always offer an Open PDF fallback and display the page number in text.
- Validate existence, path case, encoding, page range, and substantive relevance of citations; a page number being in range does **not** prove it supports the answer.
- If a source cannot be validated, mark the question for editorial review before publication. Do not fabricate page anchors.

## Clinical content standards
- Clinical application, prioritization, patient teaching, evaluation, safety, and realistic distractors; preserve instructor terminology and blueprint objectives.
- Do not duplicate a question by only swapping ages/names or changing superficial setting.
- Medication math requires realistic doses, route, concentration, units, and explicit rounding. Independently verify calculation and keyed response.
- Only essential and verified graphics. Provide descriptive alternative text.
- Avoid medical claims not supported by the approved course sources. This is an educational practice app, not patient-care guidance.

## Accessibility and quality gates
- One semantic heading for question text; answer controls have programmatic labels.
- `Submit`/`Next` keyboard accessible; announce feedback via accessible live region; do not rely on color alone.
- Matching supports keyboard and touch without drag-and-drop being the only method.
- Screen reader, touch, narrow screens, and focus restoration are tested.
- Unit tests cover grading all types, shuffle integrity, single-question rendering, forward-only navigation, lock-after-submit, scoring gate, reset, and read-only review.

## Acceptance tests (must pass)
1. On load, exactly one numbered question is visible.
2. Selecting/changing an answer does not reveal correctness.
3. Submit reveals feedback, correct answer, rationale, and reference; submitted answer locks.
4. Next advances exactly one question; no Back or jump navigation during attempt.
5. Score Exam cannot show results before every question is submitted.
6. After final Submit, Score Exam opens results; Review Entire Exam exposes every question in read-only form.
7. Reset confirms and starts a fresh randomized attempt with no old selections or feedback.
8. Header shows course, actual exam number, and practice exam name in that order.
9. References and Return to Hub work, including navigation warning for an active attempt.
10. Exam content, answer data, and scores never transmit to a backend.
