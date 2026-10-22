# Fundamentals Exam 2 — Practice-Exam Content Acceptance Standard

Updated 2026-10-22 at user direction.

## Purpose
These are course-aligned practice exams, not clinical certification examinations or the NCLEX itself. Review against the materials in the `/Goldfarb/Fundies` library using a pragmatic course-alignment threshold, not an exhaustive medical-literature verification standard.

## Accept a question when
1. Its core tested concept is reasonably supported by at least one Fundamentals source document, including broad or indirect coverage of the concept.
2. The keyed answer is consistent with that concept and not obviously wrong.
3. The stem contains enough information to answer fairly, and other answer choices do not make the key materially ambiguous.
4. Its rationale is directionally accurate and does not contradict the cited material.
5. For numeric questions, the question data, formula, units, rounding, and answer agree.

Exact quotations, exact page-number matches, and external peer-reviewed citations are **not required**.

## Decisions
- `ACCEPT_COURSE_ALIGNED`: Meets pragmatic threshold; may enter practice pool once schema and blueprint tests pass.
- `REVISE`: Concept supported, but wording, answer choices, key, rationale, math, or presentation needs correction.
- `EXCLUDE_UNSUPPORTED`: No reasonable support in Fundies materials, or a substantive contradiction cannot be resolved.
- `NEEDS_REVIEW`: Automated matching alone is insufficient to decide.

## Prior audit interpretation
The automated 494-question source-evidence screen reported 240 `TEXTUAL_EVIDENCE_CANDIDATE` and 254 `MANUAL_SOURCE_REVIEW_REQUIRED`. **Neither is an approval decision.** Text overlap does not establish that the keyed answer is supported, and lack of text overlap does not establish a question is invalid. Re-evaluate using the acceptance criteria above.

## Release safeguards
- Preserve originals, provenance, and user reviewer decisions.
- Retain meaningful numeric variants and matching variants.
- Keep user-reported defects corrected or excluded.
- Do not silently override topic or type blueprint quotas.
- Do not publish to `main` without explicit approval.
