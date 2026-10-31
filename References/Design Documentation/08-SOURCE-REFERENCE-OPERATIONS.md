# Source and reference operations

**Updated:** October 29, 2026 · **Scope:** shared-engine source storage, links, and downloads

## Canonical layout and preservation

Store exam sources under `References/<Course>/Exams/Exam <N>/`. Preserve original filenames and bytes. Keep extracted `.txt` companions clearly named and separate from originals; they support the in-page reader and do not replace the original source evidence. Do not silently edit instructor material to remove brand names or resolve a factual disagreement. Apply generic-name requirements to generated Pharmacology questions and selectors while keeping original references intact.

The complete [Pharmacology Exam 3 collection](../Pharmacology/Exams/Exam%203/README.md) contains 11 originals: ten files and one narrated presentation preserved in parts. Four text companions are also present. The [source inventory](../../assets/question-banks/audits/pharmacology-exam-3-sources.json) records filenames, original sizes, SHA-256 values, GitHub access, and storage form. The original Exam 2 PDF is included because it was in the supplied folder; source inclusion does not expand the Exam 3 prototype-defined question scope.

## Metadata used by the shared runner

| Field | Purpose |
| --- | --- |
| `question.source.name` | Student-facing citation title. |
| `question.source.path` | Canonical relative path used by the same-origin reference viewer. Encode spaces; preserve case. |
| `question.source.page` | Optional 1-based physical PDF page index. Validate against the actual file. |
| `question.source.githubUrl` | Optional original-source repository link opened separately from the viewer. An extracted-text citation can point here to the original presentation. |
| `bank.references` | Additional reference entries, including sources not cited by any current question. Combined with question sources and deduplicated by canonical `path`. |
| `bank.referenceIndex` | Optional GitHub source-index link shown at the top of the References menu. |
| `reference.parts` | Ordered same-site URLs for the byte fragments of a larger original. |
| `reference.size` / `reference.sha256` | Optional expected reconstructed size/hash; when supplied, the browser checks both before downloading. These checks are present for the narrated Pharmacology presentation. |

Use repository URLs of the form `https://github.com/adamweber1981/gson-cohort-study-hub/blob/main/...` for normal original files and the collection README for split-file instructions. Keep `source.path` separate: the in-page viewer deliberately rejects external origins. Replacing it with a GitHub URL would break in-page reading. Existing viewer/page links remain alongside **Original source on GitHub**.

PDF/text references open in the in-page overlay when supported. Normal office documents have open/download links. Reference lists can contain the original and its text companion; these are different access forms, not extra original sources.

## Narrated presentation stored in parts

`Pharm Behavioral Health - Narrated.pptx` is 31,331,201 bytes. It is preserved without recompression or narration removal in five ordered parts under the exam folder's `parts/` directory. The `.pptx.parts.json` manifest records the original filename, total size, complete SHA-256, and each part's path, size, and hash. The placeholder original path in reference metadata identifies the download name; it is not an ordinary file stored at that path.

Two reconstruction routes are available:

1. **Exam References → narrated presentation Download:** the browser fetches the parts, assembles the original byte order, checks expected size and SHA-256, and offers the original `.pptx`. A failed fetch or integrity check does not offer a potentially corrupt download.
2. **Repository checkout/ZIP:** run `python reconstruct_narrated.py` in the exam source folder. It verifies each part and the final file, refuses to overwrite a different existing output, and removes its temporary file on completion/failure.

Local reconstruction was verified byte-for-byte against the supplied original. The production References menu and download control were observed; a complete large-file browser download was not separately tested during that check. Do not equate these two types of verification.

Some older Pathophysiology sources also use ordered parts. Their existing metadata may not contain size/hash fields; do not claim the new Pharmacology integrity checks apply retroactively to every older split-file entry.

## Updating sources and links

1. Inventory the requested course folder. Compare against repository originals, not just extracted text. Avoid duplicate uploads of unchanged originals.
2. Upload missing originals in the canonical structure. If connection limits require parts, retain all original bytes and provide an ordered manifest, hashes, reconstruction route, and clear source-index instructions.
3. Update `bank.references`, its optional index, and question-specific `githubUrl` metadata. Preserve cited `source.path`, physical PDF page, question text, keys, and scope unless a separate content correction is authorized.
4. Check every referenced path and hash, naming/case/encoding, the original source count, and absence of stale Library links in generated reference metadata. Source/page existence alone is not evidence of clinical accuracy.
5. Version changed bank/runner requests consistently where needed. Existing installed apps or browser caches can otherwise combine old controls with new metadata.
6. Release through the authorized GitHub branch/PR workflow. Production is `main` on GitHub Pages; Render development is separate. Wait for a successful deployment and inspect the live reference menu and links before saying production verification is complete.

## Release evidence and boundaries

[PR #15](https://github.com/adamweber1981/gson-cohort-study-hub/pull/15), merge `b9e85086`, completed the collection. Checks established 11 indexed originals, unchanged question content/keys, populated GitHub feedback links for all 278 questions, local reconstruction integrity, and JavaScript syntax. GitHub Pages deployment succeeded and the production menu displayed the full collection and repository links. No additional clinical or exhaustive semantic-duplicate review was performed as part of this source-only change.
