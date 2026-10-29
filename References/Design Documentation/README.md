# GSON Accelerated Study Hub — Canonical Design Documents

**Specification version: 1.3**  
**Last updated: October 29, 2026**  
**Status: Requirements and current implementation; content audits ongoing**

These documents are the **source of truth** for all future changes to the GSON Accelerated Study Hub. Read them before modifying any page, exam, shared component, or PWA behavior.

## Read in this order
1. [`00-PRODUCT-REQUIREMENTS.md`](00-PRODUCT-REQUIREMENTS.md) — audience, privacy, navigation, term ordering, notifications, architecture.
2. [`01-DESIGN-SYSTEM.md`](01-DESIGN-SYSTEM.md) — app identity, themes, page templates, UI and accessibility.
3. [`02-EXAM-ENGINE-SPEC.md`](02-EXAM-ENGINE-SPEC.md) — binding exam interaction rules, scoring, references, review, and acceptance tests.

4. [`06-PRACTICE-EXAM-SELECTION.md`](06-PRACTICE-EXAM-SELECTION.md) — current full-exam and custom topic-selection behavior, references, and preview limitations.

5. [`07-PHARMACOLOGY-EXAM-3-PREVIEW.md`](07-PHARMACOLOGY-EXAM-3-PREVIEW.md) — released Pharmacology practice, coverage, category allocation, generic names, and validation limits.
6. [`08-SOURCE-REFERENCE-OPERATIONS.md`](08-SOURCE-REFERENCE-OPERATIONS.md) — original source storage, GitHub links, split-file reconstruction, and verification.

## Supporting migration documents

- [Phase 3 migration](03-PHASE-3-QUESTION-BANK-MIGRATION.md) describes legacy editorial gates and documented preview exceptions.
- [Fundamentals acceptance standard](05-PRACTICE-EXAM-ACCEPTANCE-STANDARD.md) is specific to the Fundamentals materials; do not silently treat it as a universal clinical-review rule.

## Current release records

- [Detailed repository changelog](../../CHANGELOG.md) records releases, validation, known limitations, and PR links.
- [Public changelog](../changelogs/changelog.html) summarizes student-facing changes.
- Production is published from `main` to GitHub Pages. The `pwa-redesign` branch and Render test site are separate; do not assume they are synchronized after a selective production release.
- A merged PR, a completed deployment, and a verified browser result are different milestones. Preserve the evidence and remaining content-review limitations in release notes.

## Priority of instructions
If existing HTML/JavaScript conflicts with these documents, **these documents win**. If two documents conflict, the more specific document wins for its domain; flag conflicts for review rather than guessing. Do not silently alter requirements. Proposed changes should be documented, versioned, and approved before implementation.

## Essential exam contract
One question at a time → select → explicit Submit → feedback → Next (forward only) → final Score Exam → read-only review of the entire exam. No backtracking or editing submitted answers during an attempt. Every exam has References, Return to Hub, Score Exam, and Reset Exam controls. Headers always show course name, actual exam number, and practice exam name.

## Privacy contract
No student logins, no centralized scores, and no analytics at launch. Notification subscriptions are opt-in and require separate minimal server-side storage; push must not be represented as operational until implemented and tested.

## Canonical repository location
These files live in `References/Design Documentation/`. Read this index and the relevant specifications before modifying the project. Preserve stable document paths when adding cross-links; do not create a second competing specification tree.

## Change log
- **1.3 (2026-10-29):** Recorded released Pharmacology practice, generic naming, category/drug filtering, complete sources, GitHub links, large-file handling, and deployment verification.
- **1.2 (2026-10-26):** Documented full and custom practice, multi-topic selection, Exam 3 references, and the provisional 232-question bank.
- **1.0 (2026-10-21):** Consolidated product identity, five themes, newest-term-first feed, optional push toggle, no-login/no-metrics model, and NCLEX-style forward-only exam runner with explicit submission and post-exam review.


