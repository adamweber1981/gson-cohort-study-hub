# Pharmacology Exam 3 development preview

Updated October 29, 2026. Owner reviewed the Render test preview and authorized release to `main` after a generic-name check. The production bank remains a practice preview because independent clinical review is incomplete.

## Scope and bank

The medication/prototype document defines the included drugs and category hierarchy. There are 26 unique entries, treating carbidopa/levodopa as the combination entry shown in the list. Lorazepam appears under both seizure treatment and anxiolytics. The active bank has 278 questions: 260 MCQs, 12 SATA, and 6 matching questions. Each drug has 10–11 direct questions; multi-drug matching coverage is additional and is not used to inflate that minimum. See the coverage JSON for counts.

The questions use concise clinical prompts inspired by the Jeopardy review and cover classifications, mechanisms, indications, adverse effects, assessment, teaching, interactions, monitoring, and therapeutic response. The fact sources are the Unit 3 medication review and class slides. Nonlisted medication groups in Jeopardy and the Exam 2 PDF do not broaden scope. Source links appear with each answer. Selegiline questions explicitly preserve formulation/dose-dependent dietary instructions rather than requiring the same restrictions for every patch strength.

This is a course-aligned development preview. Questions are eligible for the test engine, but independent clinical review remains incomplete. Structural tests and source links are not clinical certification. Retain the visible preview notice.

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

Checks performed: all 278 answer mappings before and after shuffle; schema and unique IDs; no repeated normalized stems; distinct option text; all 27 category/drug selector placements; combined category filtering and count bounds; 100 randomized 50-question attempts meeting configured topic, subgroup, SATA, and matching rules. These checks do not establish that every question is substantively unique or independently clinically reviewed. Render deployment and browser verification are recorded in the task handoff after the branch update.

## Generic-name review and production release

On October 29, 2026, generated question text, choices, rationales, drug metadata, and selectors were checked for brand names. No brand-name medication entries were found; only generic medication names are used in the generated exam. The original course references remain unchanged. Production integration preserves existing main-branch cache and Pathophysiology behavior.
