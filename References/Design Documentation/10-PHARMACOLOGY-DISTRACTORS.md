# Pharmacology Exam 3 — answer-choice revision

Development preview, October 29, 2026. This revision changes the active Pharmacology Exam 3 bank on `pwa-redesign`; production/main is not changed by this preview.

## Authoring approach

The medication list still defines scope. The Unit 3 Med Review and existing in-class text supply the facts. Distractors now distinguish related medication mechanisms, rescue versus maintenance roles, similar adverse-effect syndromes, and monitoring aimed at different drug risks. Choices avoid exaggerated language and unrelated conditions where possible. A browser refinement pass removed explicit procedural cue labels and balanced selected assessment choices around competing drug-specific interpretations. No extra medications, question types, quotas, or student-facing difficulty setting were added.

All 260 MCQs were reviewed; 256 were revised. Four useful existing choice sets were retained (0041, 0051, 0061, 0259). MCQ correct-option IDs and underlying correct concepts remain intact. Fourteen broad MCQ stems were narrowed to avoid making a plausible alternative defensible. Some correct choices were reworded for length or clarity. Rationales explain important new contrasts.

All 12 SATA items were revised with five or six options and two, three, or four correct selections. Growth measures and sodium/fluid plans were grouped coherently; additional correct signs come from the same course review. Keys were regenerated to match the new options. Each option can be judged on its own. SATA and matching scoring remain all-or-nothing. The existing six matching questions are unchanged. The bank still has 278 questions and the same 26 medication entries and 27 selector placements.

## Evidence and limits

The JSON audit records per-question source/disposition and key changes. Automated checks cover schema, distinct options/IDs, correct and incorrect grading after shuffle, SATA missing/extra selections, exact normalized stems, all selector placements, custom count bounds, and 100 50-question mixed-practice assemblies. They do not measure actual student difficulty or constitute an independent clinical certification. No claim of calibrated difficulty is made; owner comparison on Render is the next evaluation.

Files: `assets/question-banks/pharmacology-exam-3-standard.json` and `assets/question-banks/audits/pharmacology-exam-3-distractor-revision.json`. The existing practice plan and topic/subtopic metadata are unchanged. Bank and runner URLs are versioned for the preview so stale installed-app content can be distinguished from the new revision. No new UI disclaimers are introduced.
