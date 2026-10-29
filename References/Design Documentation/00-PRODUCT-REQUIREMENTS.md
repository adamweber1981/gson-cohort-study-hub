# GSON Accelerated Study Hub — Product Requirements

**Version:** 1.1 · **Status:** Approved requirements with implemented practice extensions · **Updated:** 2026-10-29

> This document is the product contract. If a prototype or an existing HTML exam conflicts with it, this document takes precedence. See `01-DESIGN-SYSTEM.md` and `02-EXAM-ENGINE-SPEC.md` for implementation details.

## Purpose and audience
A student-created nursing-school study hub for members of the accelerated cohort, usable as a responsive website and installable Progressive Web App (PWA) on iPhone, Android, and desktop. Official product name: **GSON Accelerated Study Hub**. This is an unofficial student resource, not a clinical decision-support product.

## Non-negotiable product decisions
- **No login, account creation, passwords, profiles, or access gates.** Opening the site must immediately permit studying.
- **No centralized exam score or answer storage.** Scores and selections live in memory for the current attempt only; do not transmit them to a server. Reloading may discard an attempt, with a warning when practical.
- **No analytics or metrics collection at launch.** Remove or disable legacy collection before release. Ordinary hosting logs may still exist.
- **One shared design system and one shared exam engine** across all courses, terms, and exams; content must be separate from presentation.
- **No unnecessary graphics.** Only show diagrams when they are required to answer a question and have been checked for clinical correctness and accessibility.
- **No Mac required for the PWA development workflow.** Native iOS App Store packaging is out of scope for initial release.
- **Five appearance settings:** System, Light, Dark, Purple, Slate. Purple is the initial default unless a student chooses another setting. System follows OS light/dark preference.
- **Optional new-exam push notifications:** off by default; no student login. A notification toggle must be available. Permission is requested only after a student explicitly opts in; the toggle must reflect actual permission/subscription state, not merely a visual preference.

## Information architecture
Home → Term (newest first) → Course → Exam group (actual exam number) → Practice exam → Practice setup → Exam runner → Results → Read-only full review.

- Terms are displayed in **reverse chronological / academic progression order**. Publishing a new term adds it above previous terms, which remain accessible below. Each term may expand/collapse.
- Course tiles use the approved two-column mobile visual direction where space permits, with accessible responsive layouts.
- Initial first-term courses: Fundamentals, Health Assessment, Pharmacology, Pathophysiology. Future courses/terms are data-driven.
- A **Reference Library** entry is independently accessible from the home page and may also be available contextually in course and exam pages.
- The home screen includes app identity, latest term/course cards, reference library, settings, and optional notification control.

## Practice delivery and source access

- Blueprint-backed shared-engine banks offer full blueprint practice or a clearly labeled mixed study plan, plus **Custom practice**. Do not represent a synthesized study allocation as the instructor's exam weighting.
- Custom practice supports multiple categories and nested subjects/drug classes, a selected whole-number question count, and a displayed eligible-pool maximum. Full-exam quotas do not apply to custom practice. A multi-drug matching question must not test drugs outside the chosen selection.
- Pharmacology Exam 3 has 278 practice questions, nine selectable categories, and 10–11 direct questions per medication entry. Generated exam text and selectors use generic medication names. See [its release record](07-PHARMACOLOGY-EXAM-3-PREVIEW.md).
- Source files belong under `References/<Course>/Exams/Exam <N>/`. Preserve originals; offer in-page reading, original open/download actions, and explicit GitHub links where available. Source availability does not expand exam scope or imply completed clinical review.
- The current Pathophysiology and Pharmacology previews were released at owner direction with visible review notices. Treat their engine eligibility flags separately from independent clinical approval; do not remove notices or claim full content validation merely because structural checks pass.

## Notifications and privacy
- A new published practice exam is the initial trigger for a push notification; do not send routine edit notifications.
- Notifications are optional and independently managed by each device. Students may unsubscribe.
- Web push requires a backend to store anonymous push subscriptions and securely dispatch notifications; a static GitHub Pages site alone cannot send them.
- Push subscriptions are technical device identifiers. Disclose the minimum stored information, retention/deletion behavior, and the hosting provider's policies before enabling push.
- On supported iPhones, students must install the PWA to their Home Screen and explicitly allow notifications. Show an explanatory unsupported/uninstalled state instead of a broken switch.
- Do not request notification permission on first page load. The student must initiate the request.
- Public, no-login access is not cohort-exclusive. Do not publish copyrighted instructor/course PDFs without permission; where necessary link only to appropriately authorized resources.

## Deployment principles
- Preserve a GitHub-hosted, static front end initially. A backend is introduced only for push notifications or a separately approved future feature.
- App name, routes, term metadata, course metadata, question banks, source manifests, and themes are centrally configured.
- Existing standalone HTML exams are migration sources, **not** long-term independent page templates.
- No release may silently change the exam behavior defined in `02-EXAM-ENGINE-SPEC.md`.

## Explicitly deferred
Accounts, cloud score history, leaderboards, discussion boards, cohort chat, analytics, app-store publication, student tracking, and automated publication notifications without an approved push service.

## Definition of done
The same course and exam UI works on iPhone, Android, and desktop; terms sort newest first; all five themes work; no authentication is required; exam answers/scores are not sent or centrally stored; exam rules and source references meet the acceptance tests; notification toggle has honest supported/unsupported/permission states.

