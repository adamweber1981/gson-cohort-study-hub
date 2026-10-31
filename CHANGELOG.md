# GSON Cohort 1 Accelerated Study Hub — Changelog

## 2026-10-30 — Development: Modern Workspace and five palettes

- Removed the Question Bank Review panel from the reference library; course-source links remain available.

- Restored BJC/Goldfarb SVG branding in desktop and mobile navigation. A transparent currentColor derivative now follows each palette’s text color; the original SVG asset is preserved.

- Replaced the hero/emoji dashboard with a sidebar, line icons, and a compact two-column course grid. Course order follows exam recency; cards launch the current practice format or open the course's choices. Only the latest exam group starts expanded.
- Added two light palettes (Slate + Teal, Ivory + Burgundy) and three dark palettes (Charcoal + Amber, Midnight + Blue, Aubergine + Lavender). Appearance applies to the hub, shared-engine exam, and legacy Exam 3 preview page. Original standalone HTML exams retain their own embedded styles.
- Added accessible theme buttons with local persistence and migration of old Light/Dark/Purple/Slate preferences. First-visit default is Slate + Teal; old System resolves to Slate + Teal or Charcoal + Amber according to current OS appearance.
- Refined shared exam presentation without changing the runner, question banks, selectors, shuffle, grading, feedback timing, or answer-color preference. Retained References, notifications, installation help, calendar, reporting, and answer-color controls.
- Added responsive single-column course cards below 480px and compact top navigation below 760px. Added a developer viewport harness at `dev/workspace-layout-check.html`.
- Versioned new assets and updated the static-shell cache to v4-workspace. Banks and PDF references remain outside the service-worker cache.
- Baseline uses current production `1ce7ded6` so the development preview retains all released questions and reference links. This design is staged only on `pwa-redesign`; no production release is authorized yet.
- Checks: five-theme preference/migration/storage tests, unique DOM IDs, JS syntax, and text contrast against all defined surfaces (tested minimums 5.22:1–6.72:1). Render verified five palette switches, persistence into exams, newest/closed exam groups, combined custom selection, submission/locking, scoring/review, and References. A narrow-width navigation overflow was corrected; follow-up confirmed no horizontal overflow in 320/390/768px frames, narrow Settings, and the mobile shared-exam setup. Narrow-screen installation help also opened correctly. These checks do not by themselves establish full accessibility conformance.
- See [Modern Workspace](References/Design%20Documentation/11-MODERN-WORKSPACE.md).


## 2026-10-29 — Pharmacology Exam 3: stronger answer choices

- Owner approved the tested development revision for production. Reviewed all 260 MCQs; revised 256 and retained four useful existing choice sets. Revised all 12 SATA items. All 278 questions remain, including six unchanged matching questions.
- Replaced unrelated/exaggerated distractors with competing course medication classes, mechanisms, adverse-effect patterns, therapeutic outcomes, and monitoring plans. Clarified 14 broad MCQ stems and reduced procedural cue wording.
- Preserved MCQ answer IDs and correct concepts. SATA now has 2–4 correct selections among 5–6 options, with corresponding keys and explanatory rationales. SATA and matching remain all-or-nothing.
- Preserved drug/category coverage, all 27 selector placements, practice-plan quotas, production source/GitHub links, and generic medication names. Updated bank/runner URLs and Pharmacology's recency timestamp.
- Checks passed: 278 answer/shuffle mappings, 780 wrong-MCQ rejections, 67 missing/extra SATA selection checks, 100 mixed-practice assemblies, all selectors, custom count bounds, exact normalized stem deduplication, and generic-name screening. Render browser checks verified custom selection, MC feedback/locking, and rejection of an incomplete four-answer SATA set. Final development bank matched the Render-served file by SHA-256.
- This is a source-grounded author revision, not calibrated item difficulty or an independent clinical certification. No new student-facing disclaimer was added. Production deployment verification is recorded separately from pre-merge checks.
- [Revision record](References/Design%20Documentation/10-PHARMACOLOGY-DISTRACTORS.md); `assets/question-banks/audits/pharmacology-exam-3-distractor-revision.json` records per-question dispositions and source locations.


## 2026-10-29 — Recent courses and exam accordion defaults

- Home course tiles sort by the latest exam update; Pharmacology appears first.
- Only the latest exam opens by default in each of the four courses; older groups remain collapsed.
- Removed student-facing incomplete-review notices while preserving internal audit records.
- Versioned changed scripts for cache refresh. Tested on the Render development site before production release.


All notable user-facing changes, exam-content migrations, infrastructure work, and release milestones are documented here. New entries should be added at the top. This is a **curated history**, not a claim that every individual Git commit is reproduced verbatim; GitHub's commit history remains the authoritative line-by-line record.

**Production:** [Study Hub](https://adamweber1981.github.io/gson-cohort-study-hub/) · **Repository:** [GitHub](https://github.com/adamweber1981/gson-cohort-study-hub) · **Development branch:** `pwa-redesign` · **Previous web changelog:** [HTML changelog](References/changelogs/changelog.html)

## [Unreleased]

No entries recorded.

## 2026-10-29 — Complete Pharmacology Exam 3 sources

- Added the eight missing originals from the selected course folder, completing access to all 11 originals under `References/Pharmacology/Exams/Exam 3/`. The narrated presentation is preserved in five byte-verified parts with a reconstruction manifest and script; the exam offers an integrity-checked download of the original presentation.
- Added a GitHub source index and explicit GitHub links in the References menu and question feedback, preserving in-page viewing and existing question/page citations.
- Kept original filenames and content. Pharm Exam 2 is included because it is in the supplied folder; it does not expand the Exam 3 medication scope. No question text, keys, counts, or quotas changed.
- Original source count is 11: ten ordinary files and one narrated presentation represented by verified parts. Four extracted text companions remain available for in-page reading. The source inventory records original sizes and SHA-256 values; the narrated download verifies total size and SHA-256 before offering the original `.pptx`.
- Merged in [PR #15](https://github.com/adamweber1981/gson-cohort-study-hub/pull/15), merge `b9e85086`. GitHub Pages deployment completed successfully; the live References menu was checked for the complete source list, source index, and GitHub links. Original-file reconstruction was verified locally; the large browser download was not separately completed during that check.


## 2026-10-29 — Pharmacology Exam 3 practice release

- Released 278 questions: 260 MCQs, 12 SATA, and 6 matching questions, with 10–11 direct questions for each of 26 medication entries. Carbidopa/levodopa is the combination entry in the prototype list; lorazepam appears in both seizure and anxiety selectors.
- Added the nine prototype-document categories and 27 class/drug selector placements. Mixed practice assembles 50 questions from a study allocation rather than an asserted instructor exam blueprint. Custom practice supports multiple categories/drugs and a selected count.
- Multi-drug matching appears in custom practice only if all of its drug subtopics are selected. Full mixed practice retains configured SATA and matching ranges.
- Screened generated question text, answer choices, rationales, drug metadata, and selector labels for brand names; no brand-name entries were found. Original course source documents are preserved as supplied, including any terminology within them.
- Validated keys before/after shuffle, all source paths/page ranges, all drug selector placements, count bounds, and 100 full-exam assemblies. Verified mixed/custom startup, grading, scoring, review, and PDF source viewing on Render before owner-authorized production release.
- Kept the practice-preview notice because independent clinical review remains incomplete. This release does not claim independent clinical certification or exhaustive semantic uniqueness.
- Applied the release to current main while preserving existing Pathophysiology and cache fixes. Added versioned production bank and asset requests. The initial Render preview mixed an older cached shell with newer bank data; release-specific bank/script URLs were added and the final filtered 33-question pool for albuterol, fluoxetine, and risperidone was verified.
- Merged in [PR #14](https://github.com/adamweber1981/gson-cohort-study-hub/pull/14), merge `8fe8df39`. GitHub Pages deployment completed successfully; production showed the 278-question label, Mixed practice/Custom practice options, and generic medication selector labels.
- Documentation now includes product and design guidance, engine/selection specifications, the Pharmacology release record, source/reference operations, a documentation index, and the public HTML changelog. Operational documentation distinguishes main/GitHub Pages production from the Render development preview.


## 2026-10-26 — Exam 3 expansion, practice selection, and references

Changes released to `main` and GitHub Pages. Dates are in America/Chicago.

- Added **Full blueprint exam** and **Custom practice** to blueprint-backed shared-engine exams. Full exams use the blueprint's exact topic quotas and the type limits actually configured in that blueprint. Custom practice draws a random, nonrepeating selection from the selected eligible question pool; it does not apply full-exam quotas.
- Replaced single-section/subsection selection with multiple blueprint groups and subjects. Selecting a group reveals its checked subjects, which can be individually deselected; subjects across groups can be combined. The count field is limited to the currently available pool. For Pathophysiology Exam 3, the groups are **Respiratory**, **Blood**, and **Kidneys / Urinary**; the underlying subject names remain the blueprint topic keys. Blueprints with nested subtopics expose those under their corresponding topic. See [Practice exam selection](References/Design%20Documentation/06-PRACTICE-EXAM-SELECTION.md).
- Added 27 Exam 3 course-folder resources to the reference collection and exposed them through the exam's References menu. Large AKI, UTI, and Week 5 presentation files are stored as parts and reconstructed by the viewer/download flow; existing question-specific source links remain intact. Keeping a reference available does not imply all its material is in exam scope.
- Added and later activated 99 provisional Exam 3 questions in the existing 133-question pool, for **232 total**. Twenty-two blueprint subjects have 10 questions each; Anemias has 12. Different questions may revisit the same subject from different angles; do not count cosmetic rewrites as distinct. Exact-stem checking is not a complete semantic duplicate review.
- Maintained a visible QA-preview notice: independent clinical, source, and substantive duplicate review remains incomplete. The current pool includes **one true/false item**; it cannot satisfy the older 4–6 true/false target for a 50-question attempt. The owner accepted this for now. The Exam 3 blueprint currently enforces 6–10 SATA and 4–6 matching, but has no true/false range.
- Verified question structure, IDs, keyed choices, all 23 custom topic pool counts, and 100 randomized full-exam assemblies against the configured topic, SATA, and matching rules. Confirmed the 232-question label on GitHub Pages. These checks are not clinical validation or proof that every question is substantively unique.
- Updated app asset versions, blueprint/reference revalidation, and the service-worker shell after installed iPhone apps displayed older selector data. A user confirmed that removing the older Home Screen app and adding the site again in Safari loaded the updated selector. Bank requests now request fresh data when online. Reloading or reinstalling may discard an in-progress attempt or local preferences.
- Releases: [Exam 3 preview and navigation, PR #8](https://github.com/adamweber1981/gson-cohort-study-hub/pull/8); [multi-topic selection and references, PR #9](https://github.com/adamweber1981/gson-cohort-study-hub/pull/9); [cache fix, PR #10](https://github.com/adamweber1981/gson-cohort-study-hub/pull/10); [draft inventory, PR #11](https://github.com/adamweber1981/gson-cohort-study-hub/pull/11); [232-question practice preview, PR #12](https://github.com/adamweber1981/gson-cohort-study-hub/pull/12).

### Earlier release notes from this work

- Expanded the Pathophysiology Exam 3 practice preview to 232 questions, with 10–12 questions per blueprint subject. New items are provisional; independent clinical, source, and substantive duplicate review remain incomplete.

- Added multi-select custom practice grouped by blueprint topics and linked the Pathophysiology Exam 3 reference collection.

- Expanded the Pathophysiology Exam 3 test preview to 133 questions after screening provisional candidates for overlap. Remaining content is provisional and clinical, source, and duplicate review is incomplete; the pool has only one true/false item.

- Removed the Phase 2 demo section from course pages.

- Display numbered course exams in descending order so the newest exam appears first.

- Added an Exam 3 test preview with 98 provisional Pathophysiology questions, blueprint-based 50-question selection, and custom topic/count choices. The bank is incomplete and its content and scoring remain under review.

- Added custom practice setup for the shared Fundamentals and Health Assessment Exam 2 banks, including blueprint section, subsection, and question-count choices. The existing full blueprint exam remains available; custom attempts use random approved questions and do not apply full-exam quotas.

## Unreleased — Health Assessment cranial nerve coverage

- Audited the Chapter 25 course lecture (PDF pp. 11–20) against the Health Assessment Exam 2 bank.
- Added **24 distinct, course-source-grounded MCQs**: **two focused questions for each of CN I–XII**, including previously missing CN V, VIII, and XII and fuller testing of VII.
- Each added item includes the lecture PDF path, specific PDF page, excerpt, rationale, and answer key; question IDs are unique and answers resolve to choices.
- Expanded the shared Health Assessment Exam 2 question bank from **325 to 349** questions. Existing questions were preserved.
- **Scope:** this ensures at least two questions per nerve **in the pool**, not two per nerve in every randomized 50-question exam. Existing blueprint quotas were not changed. The prior broader bank source-validation limitations remain in place.
- Changes are on `pwa-redesign` for testing; `main` remains unchanged pending release authorization.

- PNG PWA icons (192 px, 512 px, 180 px Apple touch icon, and maskable icon) are planned; the app currently uses an SVG icon.
- Legacy push-subscription cleanup is deferred; legacy subscriptions were deliberately preserved.
- Additional automated regression and browser-acceptance tests remain desirable.
- Fundamentals Exam 2 editorial review contains unresolved content-review items; the course exam date passed, and the owner accepted those warnings as non-blocking for the production release. This **does not** constitute final clinical or source-page approval.

## 2026-10-22 — Homepage simplification and production release

### Home, navigation, and installation
- Converted **Upcoming course exams** to a collapsed-by-default accordion, reducing homepage clutter.
- Made **Install the app** a prominent homepage action.
- Added device-aware installation instructions in a modal dialog, including Safari's **Share → Add to Home Screen** flow for iPhone/iPad and browser installation guidance for other devices.
- Added a dismissible, one-time first-visit installation invitation; avoided automatic notification-permission prompts.
- Moved notification controls, status, category checkboxes, and per-device unsubscribe action into **Settings**.
- Preserved appearance/theme controls, answer-choice color settings, course navigation, and the reference library.
- Tested the new layout on devices and merged it to `main` in [PR #2](https://github.com/adamweber1981/gson-cohort-study-hub/pull/2), merge commit [`e92e307`](https://github.com/adamweber1981/gson-cohort-study-hub/commit/e92e30776949c85bdba747b2128ba3c24ffffd7b). Owner confirmed the production layout.

### Push subscription inventory
- Added a nullable `site_origin` field to the `push_subscriptions` schema and a migration for existing PostgreSQL databases.
- Updated new registrations to record their server-validated site origin (production versus Render test).
- Added administrator-authenticated, aggregate-only `GET /admin/subscription-summary` for subscription counts and major-update eligibility by origin.
- Verified the endpoint after deployment: **four legacy/unknown-origin subscriptions** were reported; no subscriptions were deleted. Older rows cannot be attributed to a site retroactively.

## 2026-10-22 — First production PWA release

- Merged the substantial `pwa-redesign` release to `main` in merge commit [`fd40987`](https://github.com/adamweber1981/gson-cohort-study-hub/commit/fd40987bb91c74e2d804569513add75ec505096e).
- Owner confirmed the redesigned GitHub Pages homepage loaded and that exam workflows appeared to work correctly.
- Enabled production notifications on Windows and iPhone and confirmed actual delivery and tap-to-open behavior.
- Verified an administrator broadcast was accepted by the backend (`ok: true`, `attempted: 4`); attempted subscriptions are not the same as unique devices.
- Accepted outstanding Fundamentals Exam 2 editorial warnings as non-blocking because that exam had taken place; retained the warnings rather than reclassifying unverified questions as approved.
- Production is served from `main`; feature work and testing take place on `pwa-redesign`.

## October 2026 — PWA, push notifications, and reminders

- Introduced a web app manifest, standalone-install support, SVG icon, and service worker.
- Implemented service-worker app-shell caching and navigation fallback; question banks and reference PDFs are deliberately **not** cached for offline use.
- Added device-level opt-in push subscriptions using browser Push API and VAPID credentials.
- Added four notification preferences: **Updated practice exams**, **New course sources**, **Exam reminders**, and **Major Study Hub updates**.
- Implemented preference persistence, backend synchronization, and per-device unsubscribe.
- Improved controls so notification categories are unchecked/disabled when notifications are off, and all four are checked when newly enabled.
- Built a separately hosted Express/Node push server backed by Render PostgreSQL, including subscription management and authenticated administrator announcements.
- Added backend origin restrictions for the production GitHub Pages site and the Render test site.
- Implemented reminder previews and scheduled reminder dispatch for **7, 3, and 1 days** before eligible exams, with a 9 AM America/Chicago sending window and per-subscription event deduplication.
- Configured a Render Cron Job to run the dispatch script because scheduled GitHub Actions on a non-default branch do not run automatically.
- Verified reminder-preview offsets, category-based broadcast filtering, and a dry-run deduplication test that rolled back its changes without sending notifications.
- Tested actual push delivery on Windows and an installed iPhone test PWA, including opening the installed app by tapping the notification.
- **Limit:** scheduled real-world reminder delivery had not been separately observed during the initial readiness audit.

## October 2026 — Shared exam engine and content migration

### Shared exam functionality
- Developed a reusable exam runner and core engine with question-bank validation and answer-option/question randomization.
- Supported multiple choice, select-all-that-apply, matching, true/false, dosage-entry, and visual question types where supplied by the bank.
- Added immediate answer feedback, explanations/rationales, source links, final scoring, and read-only review.
- Added exam-blueprint-driven assembly and unique-question selection for migrated exams.
- Added a question-reporting workflow to flag errors, confusing wording, missing information, or technical problems.
- Provided answer-color palette controls and appearance options in Settings.
- **Scoring note:** current shared-engine SATA and matching grading is all-or-nothing; do not infer partial-credit support in this engine from the older standalone exam descriptions.

### Fundamentals Exam 2
- Consolidated and audited source-grounded question material and review decisions for the shared engine.
- Created editorial and readiness artifacts identifying issues requiring source checks, revisions, or replacement.
- Applied reviewer requests to remove unnecessary diagrams from flagged items while preserving editorial history.
- Kept a disputed safety-event taxonomy/matching revision pending source verification rather than asserting equivalence without support.
- Preserved unresolved content-review limitations in the release record.

### Health Assessment Exam 2
- Extracted **400 questions** from eight legacy practice exams.
- Deduplicated artificial stem-prefix variations: **157 distinct legacy questions** plus **8 course-aligned supplemental questions**, yielding a **165-question retained bank** in the migration readiness record.
- Removed old exam cards and the phase-two demo link from the Health Assessment course navigation while retaining legacy files in the repository.
- Built a 50-question blueprint with chapter/subtopic quotas and a documented format mix of **35 multiple-choice, 12 SATA/matching, and 3 visual** questions.
- Kept three diagrams required for picture questions and removed unnecessary diagrams.
- Validated question structure and source/page metadata; the readiness report explicitly states that full manual, page-by-page source verification was **not** completed.
- Performed further production validation on the question pool and moved to live-browser acceptance testing.

## 2026-10-19 — Analytics launch and verification (historical)

_Recorded in the existing HTML changelog; availability and coverage may differ after the subsequent shared-engine migration._

- Launched a Study Hub Analytics dashboard with **7-day, 30-day, and all-time** reporting.
- Added Cloudflare Web Analytics to deployed HTML pages.
- Added anonymous engagement events for the then-existing Health Assessment and Fundamentals Exam 2 Versions 1–8: starts, scoring actions, completed attempts, resets, reference opens, and PDF downloads.
- Configured a Cloudflare Worker and D1 database for aggregated events without student identities.
- Used GitHub Actions to inject tracking into supported legacy exam pages during deployment.
- Restricted score statistics to completed, scored 50-question attempts; hid mean and median until at least five completed attempts were recorded per exam version.
- Documented remaining work on full-exam score verification, dashboard accordions, and future exam coverage.

## 2026-10-18 — Exam library expansion (historical)

_Recorded in the existing HTML changelog; several legacy exam links were subsequently superseded by the shared engine._

- Added Health Assessment Exam 2 Versions **5–8**, extending coverage to Chapters **6 and 25** alongside **15–19 and 24**.
- Expanded clinical scenarios, question variations, randomization, immediate feedback, rationales, and scoring.
- Added Fundamentals Exam 2 Versions **1–8**, each with **50 NCLEX-style questions**, based on uploaded course materials and instructor quiz/Kahoot style.
- Covered pain and comfort, sensory alterations, complementary/integrative medicine, oxygenation/gas exchange, safety, dosage calculation, and concept mastery.
- Added in-page PDF reference viewing with page navigation and highlighted excerpts where available, plus downloads.
- Updated homepage course/exam links and course ordering.

## 2026-10-11 — Health Assessment Exam 2 foundation (historical)

- Added the Exam 2 blueprint, Chapter **15–19 and 24** lecture PDFs, and assessment graphics.
- Added instructor voiceovers and timestamped transcripts for Chapters **16 and 24**.
- Created two initial 50-question NCLEX-style practice exams, with **35 multiple-choice, 9 SATA, 3 matching, and 3 diagram-based** items each.
- Incorporated selected instructor explanations from transcripts into question revisions.
- Added immediate feedback, rationales, scoring, reset, question/choice shuffling, and page-specific in-page PDF references.

---

## Maintenance policy

1. Add a dated entry under **Unreleased** for every meaningful feature, bug fix, content-bank update, source correction, configuration change, or deployment. Move released changes to a dated heading when they reach `main`.
2. Record **what changed**, **which courses/features are affected**, **validation performed**, **known limitations**, and **PR/commit links** when available.
3. Distinguish **implemented**, **tested**, **deployed**, and **verified in production**. Never equate source alignment or structural validation with clinical approval.
4. Never include secrets, admin tokens, push endpoints, personal data, or student-identifying analytics.
5. Maintain the existing [public HTML changelog](References/changelogs/changelog.html) for students as needed; this Markdown file is the repository's detailed development/release history.
6. Consult [GitHub commit history](https://github.com/adamweber1981/gson-cohort-study-hub/commits/main/) for individual file-level changes and exact chronology.





