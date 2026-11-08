# Fundamentals Exam 3 development preview

Updated November 8, 2026. Development branch: `pwa-redesign`. Production remains unchanged until owner approval.

## Scope and coverage

The blueprint is `Fundys exam 3 blueprint .docx` in `/Goldfarb/Fundies/Exam 3`. All 19 supplied files were inventoried and extracted. Original bytes remain in that source collection; GitHub contains labeled text companions and the original-file hash inventory. Generated questions use only blueprint-listed subjects and source-supported teaching concepts. They use short clinical vignettes, prioritization, teaching, mechanism, safety, and evaluation in the tone of the slide questions, rather than copying those questions.

The bank has 300 stable IDs: 10 questions for each of 30 selectable subtopics. Each main category exposes its children in the existing multi-select interface. Students can combine children across categories and select 1 through the available pool count. Selection is random without repetition within an attempt and does not promise balanced representation in custom mode. Different attempts can repeat questions.

| Main category | Full exam | Bank | Selectable subtopics |
| --- | ---: | ---: | ---: |
| Blood Transfusions | 3 | 30 | 3 |
| ABGs | 8 | 30 | 3 |
| Nutrition | 4 | 40 | 4 |
| Dosage Calculation | 7 | 30 | 3 |
| Concept Mastery | 2 | 10 | 1 |
| Electrolytes | 9 | 50 | 5 |
| Bowels / Urinary Elimination | 17 | 110 | 11 |
| Total | 50 | 300 | 30 |

The blueprint JSON, also embedded in the bank for atomic loading, records all subtopic allocations. Explicit instructor counts are preserved: ABG interpretation 4/interventions 2/causes 2; sodium 2 and potassium 4; catheterization 2, C. diff 5, ostomies 2. Unnumbered blood/remaining elimination/electrolyte areas each receive one slot. Nutrition's two enteral/parenteral slots are split one each, with one diet and one dysphagia slot. These remaining splits operationalize the blueprint rather than claiming extra instructor guidance.

Dosage has seven numeric slots, split 3 daily totals/2 individual doses/2 volumes as an implementation allocation. Concept Mastery has no description or separate source in the blueprint. Its two slots therefore use integrated judgment and medication-safety concepts supported elsewhere in the folder. This assumption should be revisited if the instructor defines a different scope. C. diff items are independent vignettes, so sampling or shuffling cannot separate dependent answers.

## Types and behavior

Bank composition: 162 MCQ, 54 SATA, 27 matching, 27 true/false, 30 numeric. The full practice exam enforces 6–10 SATA, 4–6 matching, and 4–6 true/false as practice-format design ranges, not instructor claims. Its seven Dosage Calculation questions are numeric. Custom mode does not enforce those ranges.

The runner/core selection and grading logic are unchanged. The shared GitHub link label now says “Source on GitHub” so text companions are not mislabeled as original Office/PDF files. Setup, one-question display, explicit submission, locked feedback, forward-only progression, final scoring, read-only review, reset confirmation, source viewer, answer shuffle, and all-or-nothing SATA/matching remain in place. Numeric items state units and rounding, carry exact numeric keys, and accept equivalent numeric formatting. The engine does not retain scores after a refresh.

The course catalog marks Fundamentals Exam 3 as the newest update. Existing recency behavior moves Fundamentals to the first home position and opens Exam 3 while keeping Exam 2 collapsed. Course-data URLs in index and service-worker precache are versioned together. Question banks and PDF references retain the existing cache bypass.

## Source review and limits

Each item has a source companion, named slide or transcript locator, rationale, and editorial audit entry. The source index explains that extracted notes can be misplaced. Several review-slide note letters conflict with the displayed questions; these were not copied as keys. Numeric answers were independently recomputed from stem quantities using Decimal arithmetic with final-only rounding.

Unsupported or unsafe simplifications in source material were not turned into questions. Examples omitted include using a non-rebreather to increase inspired CO2, intubation solely by a CO2 cutoff, a universal peripheral potassium rate, blanket protein restrictions for every renal patient, and unqualified hypoxic-drive explanations. This is author course-alignment review, not independent clinical certification. No new student-facing disclaimer was added.

## Validation

- 300 unique IDs and normalized stems; no exact stem matches against prior root Fundamentals banks.
- Exactly 10 questions per selectable subtopic; all blueprint topics covered.
- Unique choices, valid keys/targets, source files, and citation locators.
- 1,134 grading checks covering correct and incorrect MCQ/TF/numeric, missing/extra SATA, and wrong matching assignments.
- 100 seeded standard assemblies with exact topic/subtopic quotas, configured type ranges, seven numeric questions, and unique IDs.
- All 30 single-subtopic custom pools and zero/overflow count rejection; mixed-category pool and attempt sampling.
- Submit/next/score/review phase gates and response locking.
- All 30 numeric answers independently recomputed.

Reproduce using `node scripts/validate-fundamentals-exam-3.cjs` and `python scripts/check-fundamentals-exam-3-math.py`. Evidence lives under `assets/question-banks/audits/fundamentals-exam-3-*.json`. Exact duplicate checking does not prove exhaustive semantic uniqueness; related concepts intentionally appear in different question approaches.

Deployment and browser observations are appended after the Render preview is verified. No production merge is included in this task.
