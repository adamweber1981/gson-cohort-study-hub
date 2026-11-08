"""Verify PDF speaker notes against actual PPTX relationships. Usage: python scripts/check-fundamentals-notes.py SOURCE_DIRECTORY"""
from pathlib import Path
from zipfile import ZipFile
import sys, json, re, posixpath, hashlib
from lxml import etree
from pypdf import PdfReader
root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
manifest = json.loads((root / 'assets/question-banks/audits/fundamentals-exam-3-page-map.json').read_text())['documents']
def normalize(text):
    return re.sub(r'[^a-z0-9]', '', text.lower())
checks = []
for name, doc in manifest.items():
    original = source / name
    assert hashlib.sha256(original.read_bytes()).hexdigest() == doc['originalSha256'], name
    if not name.endswith('.pptx'):
        continue
    pdf = PdfReader(root / doc['path'])
    with ZipFile(original) as archive:
        for slide in range(1, doc['slideCount'] + 1):
            rel = f'ppt/slides/_rels/slide{slide}.xml.rels'
            if rel not in archive.namelist():
                continue
            for relationship in etree.fromstring(archive.read(rel)):
                if not relationship.get('Type', '').endswith('/notesSlide'):
                    continue
                target = posixpath.normpath(posixpath.join('ppt/slides', relationship.get('Target')))
                xml = etree.fromstring(archive.read(target))
                texts = []
                for shape in xml.xpath('//*[local-name()="sp"]'):
                    placeholders = shape.xpath('.//*[local-name()="ph"]/@type')
                    if any(t in placeholders for t in ('sldNum', 'hdr', 'ftr')):
                        continue
                    texts += shape.xpath('.//*[local-name()="t"]/text()')
                page = doc['slideCount'] + slide
                actual = normalize(pdf.pages[page - 1].extract_text() or '')
                missing = [text for text in texts if len(normalize(text)) > 3 and normalize(text) not in actual]
                assert not missing, (name, slide, missing)
                checks.append(dict(document=name, slide=slide, notesPart=target, pdfPage=page, textRuns=len(texts), status='PASS'))
result = dict(originalFileHashesVerified=len(manifest), notesPagesChecked=len(checks), status='PASS', checks=checks)
(root / 'assets/question-banks/audits/fundamentals-exam-3-notes-integrity.json').write_text(json.dumps(result, indent=2) + '\n')
print(f"PASS: {len(manifest)} original hashes and {len(checks)} relationship-mapped notes pages, all substantive text runs retained")
