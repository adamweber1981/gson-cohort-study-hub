# Pharmacology Exam 3 practice preview

Updated October 29, 2026. The Render preview was browser-tested, and the owner authorized release to `main` after a generic-name check. The production bank remains a practice preview because independent clinical review is incomplete.

## Scope and bank

The medication/prototype document defines the included drugs and category hierarchy. There are 26 unique entries, treating carbidopa/levodopa as the combination entry shown in the list. Lorazepam appears under both seizure treatment and anxiolytics. The active bank has 278 questions: 260 MCQs, 12 SATA, and 6 matching questions. Each drug has 10–11 direct questions; multi-drug matching coverage is additional and is not used to inflate that minimum. See the coverage JSON for counts.

The questions use concise clinical prompts inspired by the Jeopardy review and cover classifications, mechanisms, indications, adverse effects, assessment, teaching, interactions, monitoring, and therapeutic response. The fact sources are the Unit 3 medication review and class slides. Nonlisted medication groups in Jeopardy and the Exam 2 PDF do not broaden scope. Source links appear with each answer. Selegiline questions explicitly preserve formulation/dose-dependent dietary instructions rather than requiring the same restrictions for every patch strength.

This is a course-aligned production practice preview. Questions are eligible for the shared engine, but independent clinical review remains incomplete. Structural tests and source links are not clinical certification. At owner direction, the shared introduction no longer displays the clinical-review disclaimer; internal audit status remains recorded.

## Student selection

The standard option is labeled **Mixed practice (50 questions)**. Its category allocation is a study plan, not an instructor exam blueprint: Upper respiratory 7; Lower respiratory 11; Neuromuscular 4; Seizures 6; Neurocognitive 4; Antidepressants 9; Anxiolytics 4; Bipolar disorders 2; Antipsychotics 3. Subgroup quotas give every listed class/drug entry representation. Mixed practice uses 6–10 SATA and 4–6 matching questions. No true/false range is asserted.

**Custom practice** exposes the nine main categories from the prototype document. Selecting one reveals class/drug checkboxes. Students may combine drugs across categories and choose a whole-number question count up to the eligible pool size. Custom practice does not enforce mixed-practice quotas or promise equal sampling from selected drugs. Multi-drug matching questions are included only when all their required drug/class subtopics are selected, so selecting one drug does not silently add a question that tests other unselected drugs. Lorazepam's ten base questions are split across the seizure and anxiety categories; a supplemental SATA is in seizures.

The shared engine retains explicit Submit, immediate rationale/source feedback, forward-only attempts, final scoring, and read-only review. SATA and matching use all-or-nothing grading. Question and choice order are randomized; no question repeats within an attempt. Different attempts may overlap.

## Files and verification

- Bank: `assets/question-banks/pharmacology-exam-3-standard.json`
- Practice plan: `assets/question-banks/blueprints/pharmacology-exam-3-standard.json`
- Coverage: `assets/question-banks/audits/pharmacology-exam-3-coverage.json`
- References: `References/Pharmacology/Exams/Exam 3/`
- Shared runner recognizes the Pharmacology bank and optional `standardLabel` and bank-level references. Existing bank flows retain their own labels and blueprints.

Checks performed: all 278 answer mappings before and after shuffle; schema and unique IDs; no repeated normalized stems; distinct option text; all 27 category/drug selector placements; combined category filtering and count bounds; 100 randomized 50-question attempts meeting configured topic, subgroup, SATA, and matching rules. These checks do not establish that every question is substantively unique or independently clinically reviewed. Render verification covered mixed/custom startup, the 33-question albuterol/fluoxetine/risperidone pool, answer submission and feedback, custom scoring and read-only review, and the review PDF opening to its cited page. Production verification confirmed the 278-question label, practice modes, and generic selector labels.

## Generic-name review and production release

On October 29, 2026, generated question text, choices, rationales, drug metadata, and selectors were checked for brand names. No brand-name medication entries were found; only generic medication names are used in the generated exam. The original course references remain unchanged. Production integration preserves existing main-branch cache and Pathophysiology behavior.


## Complete sources and GitHub access

All 11 originals from the supplied folder are indexed under `References/Pharmacology/Exams/Exam 3/`, alongside four extracted text companions for the in-page reader. Ten originals are normal files. `Pharm Behavioral Health - Narrated.pptx` is preserved in five original-byte parts with a `.parts.json` manifest and `reconstruct_narrated.py`; its reconstructed 31,331,201 bytes match the supplied file. The browser download checks size and SHA-256. Local reconstruction was verified; a full large-file browser download was not separately completed during the production check.

Bank-level `references` supplies the complete menu, `referenceIndex` links the GitHub README, and `source.githubUrl` adds original-source links to all 278 feedback citations. Existing `source.path` and PDF page citations stay available for in-page viewing. `assets/question-banks/audits/pharmacology-exam-3-sources.json` records filenames, sizes, hashes, and access paths. Including `Pharm Exam 2.pdf` as a supplied reference does not add its drugs to the bank.

## Release evidence

- [PR #14](https://github.com/adamweber1981/gson-cohort-study-hub/pull/14), merge `8fe8df39`: owner-authorized practice release after generic-name screening. GitHub Pages deployment succeeded; production question count and selectors were checked.
- [PR #15](https://github.com/adamweber1981/gson-cohort-study-hub/pull/15), merge `b9e85086`: completed source collection and GitHub links. Deployment succeeded; the live References menu showed the index, all originals, and repository links.
- The development branch and production are not assumed to be identical. Production releases were applied to current `main` to preserve newer Pathophysiology and cache fixes.

See [source/reference operations](08-SOURCE-REFERENCE-OPERATIONS.md) for canonical metadata and reconstruction details. The document filename remains stable for existing links even though this is now a production preview.

## Answer-choice revision approved for production

On October 29, the owner approved the Render-tested distractor revision: 256 MCQs and all 12 SATA items revised, four MCQs retained, and six matching items unchanged. The bank remains 278 questions. MCQ correct IDs and concepts are preserved; SATA keys now contain two to four selections among five or six options, still scored all-or-nothing. Competing drug mechanisms, adverse-effect patterns, outcomes, and monitoring plans replace many unrelated or exaggerated alternatives. No instructor weighting or source scope changed. See [distractor revision](10-PHARMACOLOGY-DISTRACTORS.md) and its per-question JSON audit for evidence and limitations. The production reference inventory and original GitHub links are preserved.
