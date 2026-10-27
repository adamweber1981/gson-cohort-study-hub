# GSON Cohort 1 Accelerated Study Hub — Changelog

All notable user-facing changes, exam-content migrations, infrastructure work, and release milestones are documented here. New entries should be added at the top. This is a **curated history**, not a claim that every individual Git commit is reproduced verbatim; GitHub's commit history remains the authoritative line-by-line record.

**Production:** [Study Hub](https://adamweber1981.github.io/gson-cohort-study-hub/) · **Repository:** [GitHub](https://github.com/adamweber1981/gson-cohort-study-hub) · **Development branch:** `pwa-redesign` · **Previous web changelog:** [HTML changelog](References/changelogs/changelog.html)

## [Unreleased]

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
