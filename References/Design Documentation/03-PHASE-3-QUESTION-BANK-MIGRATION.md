# Phase 3 — Audited Question Banks and Blueprint-Balanced Exam Generation

**Status:** In progress · **Approved:** 2026-10-22 · **Working branch:** `pwa-redesign` · **Production/main:** Do not modify without explicit approval.

## Priorities and destination
1. Fundamentals Exam 2: start with **Rebuilt Exam 1**, then **Rebuilt Exam 2**, then examine all other existing versions for unique questions.
2. Health Assessment Exam 2: review all existing versions and migrate unique approved questions.
3. Remaining courses/exams afterward, in any order.

Student-facing navigation after verification:
- **Fundamentals Exam 2:** one **Standard Exam** link and one **Med Math** link.
- **Health Assessment Exam 2:** one **Standard Exam** link.
- Other courses: consolidate redundant versions into blueprint-backed exam links as migrated.
- Preserve old HTML exam files until the new experience and question inventory have been verified. Remove redundant links only after approval.

## Mandatory per-question editorial gate
Each imported question retains its original text, answers, correct key, rationale, source, and legacy filename/identifier. It is **not approved** merely because it parses successfully.

Audit and record:
1. **Clarity and alignment:** Does the stem make sense, and do the answers actually complete/respond to it? Is there one defensible keyed response (or correct SATA set)?
2. **Illustration:** If a diagram, drawing, or image exists, is it needed, clinically correct, understandable, labeled, and accompanied by accessible alternative text? Remove only after review.
3. **Visibility:** Are the entire stem, options, labels, units, and any diagram text legible on desktop and narrow/mobile screens?
4. **Learning value:** Does it assess the intended concept and develop understanding/clinical judgment, supported by a useful rationale?
5. **Clinical/source verification:** Independently check the key, rationale, clinical accuracy, and the cited course document/page. A cited page number alone does not establish support.
6. **Math-specific verification:** Confirm dimensional analysis, dose, units, rounding, tolerance, and safety.

Disposition: **PASS**, **REVISE**, or **REPLACE**. Only PASS (or reviewed and approved revised) questions enter the active exam pool. Flag material answer-key/clinical edits for user review. Keep an audit trail with stable ID, source location, issue, proposed change, citation, disposition, and reviewer approval. Do not silently rewrite source questions.

## Duplicate policy
- Detect exact and near duplicates across all versions of the same exam, not just within a single file.
- Preserve distinct questions that assess the same concept in substantively different ways.
- Select the strongest verified variant where questions are functionally identical; preserve legacy provenance and duplicate mappings.
- Never repeat a question within a generated attempt; retain all legacy files until migration verification.

## Bank schema
Use a **master question bank** per course/exam with stable question IDs, topic/subtopic, question type, stem, choices/pairs, correct response, rationale, canonical reference/page, legacy provenance, audit status, and any case grouping/visual metadata. A distinct **approved pool** must be used for exam generation; imported/unreviewed questions are excluded.

A separate versioned **blueprint** specifies topic quotas, required question formats, and target question count (50 for Standard). The blueprint is authoritative: never fabricate topic quotas or quietly rebalance short categories.

## Standard exam generation
- Generate a **new randomized 50-question attempt** from the approved pool.
- Enforce **both** course Exam 2 blueprint topic quotas and established NCLEX-style type targets: **6–10 SATA**, **4–6 matching**, **4–6 true/false**; MCQ fills remaining slots, with dosage/case studies as blueprint-appropriate.
- Case study items count by question; preserve linked case context and dependencies.
- Randomize question order and answer order while maintaining correct-answer mappings and case-group integrity.
- Prefer previously unseen questions between attempts when feasible, but **never** at the expense of blueprint compliance.
- If there are insufficient approved questions for any quota, **fail closed with a useful shortage report**. Never repeat or substitute questions silently.

## Med Math generation
- Separate Fundamentals Med Math pool and its own authoritative blueprint.
- Mostly **numeric fill-in-the-blank** and **multiple choice**; **do not** apply Standard's SATA/matching/true-false quotas.
- Enforce the Med Math blueprint's topic distribution and question count; do not assume it is identical to Standard.
- Verify all calculations, units, rounding, and answer tolerance.

## Phase 2 interaction contract remains unchanged
One question at a time; explicit Submit then feedback/rationale/source; forward-only until scoring; read-only review after Score; reset/reshuffle; accessible mobile header; customizable answer palettes; in-page references; Google Forms reporting. See `02-EXAM-ENGINE-SPEC.md`.

## Implementation stages
1. Record specification and authoritative blueprints.
2. Extract legacy question data into **quarantined staging inventories**, preserving provenance; do not publish unreviewed items.
3. Audit rebuilt Fundamentals Exam 1 question by question, then Rebuilt Exam 2; compare other Fundamentals versions and Med Math banks for duplicates.
4. Implement a blueprint validator and approved-only 50-question selector; test shortages, type/topic quotas, shuffle, and case groups.
5. Connect the validated Fundamentals Standard and Med Math pools to the shared Phase 2 engine.
6. Repeat audit and migration for Health Assessment Exam 2; then other courses.
7. Verify with the user, simplify navigation, and archive/retire redundant links. No deletion of originals or changes to `main` without approval.

**Current limitation:** Until the actual course blueprints have been inspected and every question approved, no legacy bank should be exposed as a completed production exam.

## Deduplication decisions — approved 2026-10-22
- **Retain numeric variants** when the calculation values change, even if the stem is otherwise templated. These may later be separated across attempts for variety; do not delete them as duplicates.
- **Retain matching questions with distinct answer choices or pair sets**, even if they share a generic stem such as “Match each clinical concept to its best description.”
- Consolidate only within the same pool when normalized stem, question kind, answer choices (including their order), answer key, and diagram payload match. Keep the canonical entry and record all merged source IDs. Differences in source citations or rationales still require editorial reconciliation before approval.
- The first consolidated **master inventory** is `assets/question-banks/master/fundamentals-exam-2-master.json`: 494 retained candidates from 600 legacy entries (415 Standard, 79 Med Math). All are **UNREVIEWED**, not live exam questions.
- This is a *candidate inventory*, not a completed clinical audit or a blueprint-approved 50-question exam. Verify question types, source citations, diagrams, answer keys, and blueprint requirements before activation.
