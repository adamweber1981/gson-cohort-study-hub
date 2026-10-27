# GSON Accelerated Study Hub — Exam Engine & NCLEX-Style Interaction Specification

**Version:** 1.2 · **Status:** Shared exam engine and custom practice implemented; content audits ongoing · **Updated:** 2026-10-26

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

## Practice setup and selection (implemented 2026-10-26)

For a shared-engine bank with a blueprint, the intro offers two modes:

- **Full blueprint exam:** assemble the blueprint's total number of unique eligible questions, enforce its per-topic quotas and configured type ranges, and fail with an explanatory error if the pool cannot satisfy the rules. Pathophysiology Exam 3 uses 50 questions, a 6–10 SATA range, and a 4–6 matching range; its current blueprint does not enforce a true/false range.
- **Custom practice:** select one or more blueprint groups, then select their subjects or nested subtopics. A newly checked group displays its subjects already checked; users can uncheck individual subjects, combine choices across groups, and select a whole-number question count from 1 up to the displayed available pool. If no eligible questions are selected, starting custom practice is disabled. The engine samples the selected eligible pool randomly without repeating a question within the attempt. It does not enforce full-exam topic or type quotas or guarantee a question from each chosen subject.

Pathophysiology Exam 3 presents Respiratory, Blood, and Kidneys / Urinary as the top-level groups, with the original blueprint subjects below them. Other blueprints without grouping metadata use their existing blueprint topics as groups and expose nested subtopics where provided; questions without a nested assignment are accessible as an additional option when present. The selector is only available for shared-engine banks with a blueprint; other banks retain their existing intro.

The current Pathophysiology Exam 3 practice preview deliberately includes provisional items in the engine's eligible pool, per owner direction. `approved: true` for these preview items is an engine eligibility flag, not a claim of independent clinical or source approval. Keep the QA notice visible and do not represent the bank as fully verified. The bank currently has 232 questions (10–12 per subject), with only one true/false item; the owner accepted this limitation for now.

For full user instructions, availability, references, and troubleshooting, see [Practice Exam Selection](06-PRACTICE-EXAM-SELECTION.md).

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
- Full-exam topic quotas and question-type quotas are specified by each exam's blueprint; custom practice uses the selected pool without those quotas. Do not hardcode Fundamentals ratios for all future courses.

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

## Phase 3 extension (approved 2026-10-22)
The Phase 2 interaction engine is approved and must remain behaviorally stable. Phase 3 replaces redundant static practice-version links with **approved-only, blueprint-balanced 50-question selection**. Standard exams satisfy the topic and question-type ranges configured in their own blueprint. The design target for standard exams has been 6–10 SATA, 4–6 matching, and 4–6 true/false; the current Pathophysiology Exam 3 preview lacks the true/false range and has only one true/false item, a limitation accepted for now. Fundamentals **Med Math** uses its **own** blueprint, primarily numeric entry and MCQ, without Standard type quotas. Do not infer quotas absent the authoritative blueprint. Unreviewed migrated questions must remain in staging; shortage of approved questions blocks generation rather than allowing repeats or substitutions. See [Phase 3 Question Bank Migration](03-PHASE-3-QUESTION-BANK-MIGRATION.md) for audit, duplicate, navigation, and rollout requirements.

