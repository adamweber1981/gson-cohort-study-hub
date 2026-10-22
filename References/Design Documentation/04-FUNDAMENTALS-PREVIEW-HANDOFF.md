# Fundamentals Exam 2 — Preview integration handoff (2026-10-22)

## Implemented on `pwa-redesign`
- `assets/js/exam-blueprint.js`: shared, fail-closed topic and question-type quota assembler. Only `approved === true` questions are eligible.
- `assets/question-banks/blueprints/fundamentals-exam-2-standard.json`: 50-question Fundamentals-specific blueprint (7 pain, 5 sensory, 5 complementary/integrative, 13 oxygenation, 11 safety, 6 dosage, 3 concept mastery; SATA 6–10, matching 4–6, true/false 4–6).
- `assets/js/exam-core.js`: optional `bank.blueprint` activates selection. Demo banks without a blueprint continue to use all questions.
- `exam.html`: loads blueprint module before the exam core.

## Important: not yet a usable Fundamentals preview
The 494-item master is still a **staging/QA bank**, not an active exam-engine bank. It contains 415 Standard and 79 Med Math entries in legacy schema. No items have been granted final clinical/source approval. The Standard bank contains no true/false questions. The engine must not bypass these release gates to show a seemingly finished exam.

## Work remaining before preview
1. Complete individual source-to-question cross-checks, including 79 Med Math stem-to-formula checks.
2. Correct or replace clinically ambiguous items and create 4–6 or more source-verified true/false items for the Standard pool.
3. Transform each approved legacy question into engine schema (MCQ/SATA/matching/truefalse/dosage), with stable IDs, source paths, and valid keyed answer identifiers.
4. Add an independent Med Math blueprint configuration and approved question pool.
5. Connect the Standard and Med Math links to these approved banks; update intro text to display selected question count.
6. Exercise blueprint selection across many randomized runs; test fail-closed behavior, scoring, sources, question reporting, mobile presentation, and theme persistence.
7. Obtain owner approval before merging to `main` or retiring any legacy HTML exams.

## Editorial controls
- Preserve all original question content, numeric variants, and matching variants with distinct answer choices.
- Never silently mark source checks as complete or treat the user's editorial PASS as full clinical approval.
- Keep `main` and the legacy exam catalog unchanged until explicit release approval.
