# Course recency and accordion defaults

Development update: October 29, 2026.

All four courses use the same home ordering and exam accordion rules. `assets/js/course-data.js` defines each exam's `updatedAt` as an ISO 8601 UTC timestamp. When adding or changing an exam, update this field to the release timestamp. Documentation-only edits should not change it. Home sorts by the newest exam timestamp for each course; ties preserve the configured course order. Course exam groups sort by timestamp, then exam number. Only the first group starts expanded; all older groups start collapsed. Returning to a course resets these defaults. The current term remains open to expose course tiles; the calendar remains closed.

Pharmacology Exam 3 is currently most recent, followed by Pathophysiology Exam 3. Existing Exam 2 entries have a baseline timestamp. Missing timestamps sort last. Every new exam must include updatedAt so future releases move the corresponding course to the first position automatically.

Student-facing review disclaimers are no longer rendered by the shared exam introduction; internal bank audit/preview metadata remains intact. This presentation change does not certify a completed clinical audit.

Verified on the pwa-redesign Render preview. Owner approved production release on October 29, 2026.
