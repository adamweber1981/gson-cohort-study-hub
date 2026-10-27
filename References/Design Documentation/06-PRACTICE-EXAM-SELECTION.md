# Practice exam selection and delivery

**Updated:** October 26, 2026 · **Applies to:** blueprint-backed shared exam engine

## Student experience

Students open a course, expand the desired exam, and select **Open practice exam**. Newer numbered exams appear above older exams. On a blueprint-backed shared-engine exam, the setup screen offers two modes:

1. **Full blueprint exam** uses the total and question allocations in that exam's blueprint. Pathophysiology Exam 3 currently assembles 50 unique questions with exact subject quotas and the configured SATA and matching ranges.
2. **Custom practice** allows students to combine subjects and choose the number of questions. It samples randomly from the combined selected pool; blueprint quotas and type ranges for full exams do not apply. Selection is not balanced across chosen subjects and does not guarantee at least one question from each selected subject.

Banks without a blueprint do not expose the custom selector; they continue to use their existing setup. Legacy standalone exams retain their existing behavior.

## Custom practice controls

1. Choose **Custom practice** under **Practice mode**.
2. Check one or more top-level groups. Each selected group displays its associated subjects, initially checked. Uncheck subjects you do not want; the selection can span multiple groups. A group's subject choices are retained while it is temporarily unchecked on the setup screen.
3. Review the number of available questions and choose a whole number from 1 through that maximum. The default is up to 20 and is reduced if fewer questions are available. Starting is disabled when no eligible questions are selected.
4. Select **Start Exam**. Questions are randomly selected without repeating a question within that attempt. Reset clears the attempt and returns to setup; question and answer order may change on a new attempt. The engine does not guarantee that questions seen in an earlier attempt are excluded from a later attempt.

For **Pathophysiology Exam 3**, the available groups are:

- **Respiratory:** Ventilation vs Gas Exchange, Pneumonia, Tuberculosis, Asthma, COPD, Pleural Disorders, and Pulmonary Embolism.
- **Blood:** Hemostasis, Hypercoagulability, Hypocoagulation, DIC, Anemias, Blood Compatibility, Transfusion Reactions, Lymphoma, and Leukemia.
- **Kidneys / Urinary:** Nephrotic & Nephritic Syndrome, UTI, Urinary Obstructions, Acute Kidney Injury, Chronic Kidney Disease, Dialysis, and Urinary Incontinence.

For example, students can select Respiratory, Blood, and Kidneys / Urinary, then leave only **Pneumonia**, **Hypocoagulation**, and **Acute Kidney Injury** checked. The available count is the sum of eligible questions in those subjects. If they request 20, the engine selects 20 at random from that combined pool; it does not promise an equal allocation.

In the current Pathophysiology blueprint, these subjects are stored as blueprint `topics`; `selectionGroups` provides the larger display categories. Other blueprints can use their own topics and nested `subtopics`. Where a nested-subtopic topic also contains eligible questions without an assigned subtopic, an **Other questions in [topic]** choice includes them. Blueprint grouping metadata is display and filtering metadata; it does not change full-exam quotas.

## Answering, scoring, and references

The shared engine displays one question at a time. The student selects an answer and explicitly submits it to see correctness, the correct answer, rationale, and a source link. The student moves forward until the final question, scores the completed attempt, and can then review the whole attempt. Reset requires confirmation. SATA and matching are both scored all-or-nothing. Attempt state is kept in the open page; leaving or refreshing can lose progress.

**References** opens the current exam's reference list. Exam 3 includes the worksheet and the 27 course-folder files added to the repository, including the blueprint, quiz, PDFs, charts, image, presentations, and spreadsheet. PDF/text references are handled by the in-page viewer where supported; office documents can be opened or downloaded. Three larger files are stored in parts and reconstructed for viewing or download. Individual question feedback links to that question's cited source; being listed in References does not automatically make every topic in that file examinable.

## Pathophysiology Exam 3 preview status

- The active bank contains **232 questions**: 10 in 22 blueprint subjects and 12 in Anemias.
- The added questions were drafted from the Exam 3 course materials with the worksheet and quiz used to define scope and factual alignment. Availability in the preview is not independent clinical or source approval.
- Independent clinical, source, and substantive duplicate review remains incomplete. The preview notice must remain visible. Exact-stem screening alone cannot prove that questions test different ideas.
- The full-exam blueprint enforces **6–10 SATA** and **4–6 matching** questions. The bank has **one true/false** question and the blueprint does not enforce a true/false range, so the earlier design target of 4–6 true/false per attempt cannot be met. The owner accepted this limitation for now.
- The prior provisional expansion inventory is retained in `assets/question-banks/staging/pathophysiology-exam-3-subtopic-expansion-232.json`; the active engine loads `assets/question-banks/pathophysiology-exam-3-standard.json`. Do not confuse the staging copy with the active bank.

## Publishing and installed-app updates

Production is published from GitHub's `main` branch to GitHub Pages; the Render test site is separate. A merge does not prove the production deployment has completed. Verify the GitHub Actions deployment and the live exam count and controls.

The app uses a service worker for its shell. Exam bank requests are revalidated online; the Exam 3 blueprint and reference manifest use versioned requests. The app's existing cache or an already-open attempt can still show older content. Reloading the live page may fetch the update. On iPhone, if an older installed Home Screen app remains stale, remove it and add the live Study Hub again from Safari. This can discard in-progress attempts and local settings; notifications may need to be enabled again. The owner confirmed that reinstalling resolved the older selector on an iPhone.

## Maintenance and verification

When changing selection behavior or a bank, verify the active bank and blueprint together: valid IDs and answer keys, pool availability for each subject, custom multi-group filtering and counts, no repeated question in an attempt, and full-exam assembly against the ranges actually configured. Check duplicate candidates for substantive overlap as well as exact text, and keep an audit trail for corrections and source review. Distinct clinical approaches to the same topic are useful; superficial rewrites of the same question are not.
