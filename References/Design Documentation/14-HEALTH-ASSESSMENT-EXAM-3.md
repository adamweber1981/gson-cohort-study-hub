# Health Assessment Exam 3 development bank

## Scope and weighting

390 questions cover seven chapters and 39 blueprint rows, with 10 questions per selectable subcategory. The full exam has exactly 50 unique items: 33 multiple choice, 12 alternate format, and five pictures. Both chapter and row counts follow `3120 Fall 2026 Exam 3 Blueprint.pdf`.

The existing runner supports SATA and matching as the alternate formats used here. The instructor blueprint lists other possible alternate formats but supplies no individual counts. No text fill-in or ordering control was added. SATA and matching keep the engine’s all-or-nothing scoring. There is no true/false quota in this instructor blueprint.

## Category and subcategory mapping

| Category | Subcategory | Full exam quota | Bank items |
| --- | --- | ---: | ---: |
| Chapter 14 | MASD | 1 | 10 |
| Chapter 14 | Skin cancer prevention | 1 | 10 |
| Chapter 14 | Pressure injury staging | 3 | 10 |
| Chapter 14 | Pressure injury risks | 1 | 10 |
| Chapter 14 | Primary skin lesions | 1 | 10 |
| Chapter 14 | Nail assessment | 1 | 10 |
| Chapter 20 | Breast findings and disorders | 3 | 10 |
| Chapter 20 | Breast cancer risks | 1 | 10 |
| Chapter 20 | Gynecomastia | 1 | 10 |
| Chapter 20 | Breast examination | 1 | 10 |
| Chapter 20 | Breast tumor location | 1 | 10 |
| Chapter 21 | Jugular pressure technique | 1 | 10 |
| Chapter 21 | JVD and right heart failure | 1 | 10 |
| Chapter 21 | Cardiac cycle sounds and valve sites | 4 | 10 |
| Chapter 21 | Coronary disease risks | 1 | 10 |
| Chapter 21 | Carotid auscultation | 1 | 10 |
| Chapter 21 | Carotid palpation | 1 | 10 |
| Chapter 21 | Chest pain and MI | 2 | 10 |
| Chapter 22 | PAD risks and education | 1 | 10 |
| Chapter 22 | Abdominal aortic aneurysm | 1 | 10 |
| Chapter 22 | Arterial venous and neuropathic ulcers | 3 | 10 |
| Chapter 22 | PAD and intermittent claudication | 1 | 10 |
| Chapter 22 | Peripheral edema | 1 | 10 |
| Chapter 22 | Lower extremity pulses | 1 | 10 |
| Chapter 23 | Assessment sequence and absent sounds | 2 | 10 |
| Chapter 23 | Bowel sound interpretation | 1 | 10 |
| Chapter 23 | GERD teaching | 1 | 10 |
| Chapter 23 | Peptic ulcer prevention | 1 | 10 |
| Chapter 23 | Constipation causes | 1 | 10 |
| Chapter 23 | Special abdominal tests | 1 | 10 |
| Chapter 23 | Abdominal assessment preparation | 1 | 10 |
| Chapter 26 | Prostate cancer | 1 | 10 |
| Chapter 26 | Testicular self examination | 1 | 10 |
| Chapter 26 | Hypospadias and epispadias | 1 | 10 |
| Chapter 26 | Older adult male changes | 1 | 10 |
| Chapter 27 | Cervical cancer risks | 1 | 10 |
| Chapter 27 | Older adult female changes | 1 | 10 |
| Chapter 27 | Hemorrhoid teaching | 1 | 10 |
| Chapter 27 | Oral contraceptive effects | 1 | 10 |

The seven displayed category labels add descriptive system names to the chapter numbers. Custom practice supports multiple categories and subcategories together, with a count from one through the combined eligible pool. Custom draws are random and do not enforce blueprint weighting or guarantee a question from each selected subcategory.

## Source and question design

Primary source: `NURS_3120_Exam_3_Completed_Study_Guide.pdf`. The ten nail-assessment questions cite the chapter directly because the completed worksheet has no nail section. Supplementary chapter evidence also fills blueprint topics such as fibrocystic breast findings and prostate cancer prevention. Quiz-specific extensions, including warm-shower testicular examination teaching and thromboembolic escalation, include the quiz page among related sources.

The supplied quiz informed clinical scenarios, interpretation questions, further-teaching prompts, SATA, and matching. Questions use new wording. Answer options and matching rows are shuffled by the existing engine. Saved MCQ positions and SATA key sizes also vary. Distractor review targeted competing assessment findings and technique errors. Some narrow blueprint rows intentionally revisit the same small set of facts from different prompts; 390 questions does not imply 390 separate concepts.

The bank contains 298 MCQ, 39 SATA, 39 matching, and 14 visual questions. Fourteen picture items use 13 original schematic illustrations, including pressure injury depth, primary lesions, nail profiles, breast skin changes, cardiac listening sites, vascular ulcers, and meatal location. These are study illustrations, not patient photographs.

All 18 supplied source files remain intact under `References/Assessment/Exams/Exam 3/`. Source links are same-origin paths for the viewer; GitHub links point to `pwa-redesign` while staged. Production promotion should switch the bank index and question/reference GitHub URLs to the approved release branch. Physical page numbers are verified against the files, not their printed slide labels. The supplied chapter PDFs retain notes, so no new PowerPoint conversion was required.

## Verification and maintenance

Run `node scripts/validate-health-assessment-exam-3.cjs` from the repository root. It checks schema and keys, source file hashes and page bounds, diagram IDs, all 39 custom pools, mixed-category filtering, empty selection, and 250 seeded full assemblies with exact row and 33/12/5 quotas. A complete simulated attempt verifies grading and read-only review. The JSON audit records the results. These are structural/behavior checks, not independent clinical approval.

Changed runtime integration: new course entry in `course-data.js`; blueprint loading in `exam-runner.js`; new diagram script in `exam.html`; versioned shell requests and service worker cache. Existing course banks and grading logic are unchanged.

Development test route: `exam.html?bank=health-assessment-exam-3-standard&v=ha3-390-20261108`. Production remains on `main`; this work is staged on `pwa-redesign`.
