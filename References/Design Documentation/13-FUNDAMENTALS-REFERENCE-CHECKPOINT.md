# Fundamentals Exam 3 reference recovery

## Target and current state
- Repository: https://github.com/adamweber1981/gson-cohort-study-hub
- Development branch: `pwa-redesign`; Render: https://gson-study-hub-test.onrender.com
- Production `main` baseline: `e8a744180343293cc3cb7a4f8dd2be3c781d10c2`. Do not update main.
- Recovered local commit `fd1dfa6` (parent `94b202f`), previously not pushed. Contains all 330 reference mappings and 19 source PDFs/conversions.
- Recovered from `/workspace/scratch/dbe30386bde1/fundies-reference-dev` into current branch, preserving bank content and keys.
- Source Office originals: `/workspace/scratch/dbe30386bde1/fundies-exam3-inputs/Goldfarb/Fundies/Exam 3`.
- Export scripts/temporary renders: `/workspace/scratch/dbe30386bde1/fundies-reference-work`.

## Reproducible checks (all passed November 8, 2026)
```
python scripts/validate-fundamentals-reference-pages.py
node scripts/validate-fundamentals-exam-3.cjs
node scripts/check-fundamentals-concept-update.cjs
python scripts/check-fundamentals-exam-3-math.py
```
All 330 primary references are PDFs, all primary/additional/related pages are in bounds, all manifest PDF hashes match. Question content and answer keys match pre-reference baseline. 100 blueprint assemblies, 1,248 grading checks, 33 custom pools, and 30 independent math checks pass.

## Remaining before completion
Notes verified: all 103 relationship-mapped notes pages retain every substantive source text run; all 19 source originals match recorded hashes. Reproduce with `python scripts/check-fundamentals-notes.py SOURCE_DIRECTORY`.

Pending: test representative rendered page jumps; push to development and verify Render served bytes; append actual deployment evidence. No successful deployment is claimed here yet.
