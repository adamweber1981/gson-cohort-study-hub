# GSON Accelerated Study Hub — Exam Engine & NCLEX-Style Interaction Specification

**Version:** 1.3 · **Status:** Shared exam engine and custom practice implemented; content audits ongoing · **Updated:** 2026-10-29

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

- `INTRO`: show instructions, applicable practice-mode/selection/count controls, and Start Exam. No active question is displayed until starting.
- `ACTIVE_UNSUBMITTED`: show one question; allow answer selection/editing; **do not grade or reveal correctness**. Submit disabled until required response is complete.
- `ACTIVE_SUBMITTED`: lock answer; reveal correct/incorrect, correct answer, rationale, source/page; show **Next Question**. No Previous button, jump list, or question editing.
- `NEXT`: advance to the next unseen question; render it alone; preserve locked answers in memory for final review.
- `ALL_SUBMITTED`: after the last submitted question and feedback, offer **Score Exam**. Do not show score before this action.
- `RESULTS`: show score summary and **Review Entire Exam**.
- `REVIEW`: all questions may be visited freely or viewed as a complete numbered list; responses and scores are immutable.
- `RESET`: accessible from exam screens, requires confirmation, clears the attempt, and returns to practice setup. Start Exam begins the next randomized attempt.

**No skip / unanswered progression:** In this specification, a student must submit each question before advancing. Thus there are no unanswered questions in a completed exam. This supersedes the older early-scoring/unanswered-count proposal. If a future Skip feature is requested, it requires a new specification version.

## Practice setup and selection (implemented 2026-10-26)

For a shared-engine bank with a blueprint, the intro offers two modes:

- **Full blueprint exam:** assemble the blueprint's total number of unique eligible questions, enforce its per-topic quotas and configured type ranges, and fail with an explanatory error if the pool cannot satisfy the rules. Pathophysiology Exam 3 uses 50 questions, a 6–10 SATA range, and a 4–6 matching range; its current blueprint does not enforce a true/false range.
- **Custom practice:** select one or more blueprint groups, then select their subjects or nested subtopics. A newly checked group displays its subjects already checked; users can uncheck individual subjects, combine choices across groups, and select a whole-number question count from 1 up to the displayed available pool. If no eligible questions are selected, starting custom practice is disabled. The engine samples the selected eligible pool randomly without repeating a question within the attempt. It does not enforce full-exam topic or type quotas or guarantee a question from each chosen subject.

Pathophysiology Exam 3 presents Respiratory, Blood, and Kidneys / Urinary as the top-level groups, with the original blueprint subjects below them. Other blueprints without grouping metadata use their existing blueprint topics as groups and expose nested subtopics where provided; questions without a nested assignment are accessible as an additional option when present. The selector is only available for shared-engine banks with a blueprint; other banks retain their existing intro.

The current Pathophysiology Exam 3 practice preview deliberately includes provisional items in the engine's eligible pool, per owner direction. `approved: true` for these preview items is an engine eligibility flag, not a claim of independent clinical or source approval. At owner direction on October 29, the shared introduction omits review disclaimers; retain internal audit status and do not represent this presentation change as independent certification. The bank currently has 232 questions (10–12 per subject), with only one true/false item; the owner accepted this limitation for now.

Pharmacology Exam 3 uses **Mixed practice (50 questions)** through optional blueprint `standardLabel`. The nine categories and class/drug entries come from the medication list; the 50-question allocation is a study plan rather than instructor weighting. It enforces 6–10 SATA and 4–6 matching and does not assert a true/false quota. The 278-question bank retains internal review metadata; the owner removed the student-facing review disclaimer. See [Pharmacology release record](07-PHARMACOLOGY-EXAM-3-PREVIEW.md).

For a question with `requiredSubtopics`, Custom practice includes it only if every listed subtopic in that question's topic is selected. This keeps multi-drug matching within the student's drug selection. Its primary `topic`/`subtopic` still determines full-practice quota placement. Different attempts can repeat prior questions; the current engine does not keep a persistent seen-question history.

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
- `Score Exam` is offered after the final question has been submitted; pressing it then displays results. It is not available earlier.
- Score = correctly submitted questions ÷ total questions × 100, with total correct and incorrect counts.
- Final review is available only **after** scoring. It includes all questions in the original attempt order, student's submitted responses, correct responses, rationale, and source link/page.
- Review mode permits Previous/Next or jump navigation **only because the attempt is over**. No changing submitted answers or resubmitting.
- No score/answer upload, analytics event, or server persistence. State exists in memory for the open attempt; browser refresh may lose it. Provide a warning on leaving when possible.

## Source and reference rules
- Every question includes an independently verified reference (document name, canonical path, 1-based PDF page index where available) that supports its stem, answer, and rationale.
- The **References** action combines question citations with optional bank-level `references`, deduplicated by canonical path. Optional `referenceIndex` links to the full GitHub source index. The feedback panel and full review preserve the specific citation and optionally add its original-source `githubUrl`.
- Keep `source.path` suitable for the same-origin in-page viewer. An external `githubUrl` opens separately; it must not replace the viewer path. Extracted lecture text may be paired with a GitHub link to the original presentation.
- Optional reference `parts` identifies original-byte file fragments; `size` and `sha256`, when supplied, must match the reconstructed download before the original filename is offered. See [source operations](08-SOURCE-REFERENCE-OPERATIONS.md).
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
1. Initial load shows practice setup. After Start Exam, exactly one numbered question is visible.
2. Selecting/changing an answer does not reveal correctness.
3. Submit reveals feedback, correct answer, rationale, and reference; submitted answer locks.
4. Next advances exactly one question; no Back or jump navigation during attempt.
5. Score Exam cannot show results before every question is submitted.
6. After final Submit, Score Exam opens results; Review Entire Exam exposes every question in read-only form.
7. Reset confirms, clears answers/feedback, and returns to setup. Starting again creates a fresh randomized attempt.
8. Header shows course, actual exam number, and practice exam name in that order.
9. References and Return to Hub work, including navigation warning for an active attempt.
10. Exam content, answer data, and scores never transmit to a backend.

## Phase 3 extension (approved 2026-10-22)
The Phase 2 interaction engine is approved and must remain behaviorally stable. Phase 3 replaces redundant static practice-version links with **approved-only, blueprint-balanced 50-question selection**. Standard exams satisfy the topic and question-type ranges configured in their own blueprint. The design target for standard exams has been 6–10 SATA, 4–6 matching, and 4–6 true/false; the current Pathophysiology Exam 3 preview lacks the true/false range and has only one true/false item, a limitation accepted for now. Fundamentals **Med Math** uses its **own** blueprint, primarily numeric entry and MCQ, without Standard type quotas. Do not infer quotas absent the authoritative blueprint. Unreviewed migration candidates normally remain in staging; shortage of eligible questions blocks generation rather than allowing repeats or substitutions. The owner-authorized Pathophysiology and Pharmacology previews are documented exceptions: their eligible flags enable practice while internal audit limitations remain explicit. See [Phase 3 Question Bank Migration](03-PHASE-3-QUESTION-BANK-MIGRATION.md) for audit, duplicate, navigation, and rollout requirements.



## Pharmacology answer-choice revision — October 29, 2026

The approved revision changes question content, not the engine contract. SATA now has two to four correct selections and five or six options; exact-set grading, randomization, locking, forward-only navigation, selector scope, and existing practice-plan quotas remain unchanged. Preserve the revised keys when shuffling; do not assume every SATA has three correct choices. See [revision record](10-PHARMACOLOGY-DISTRACTORS.md).
