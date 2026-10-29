"""Reconstruct and verify the unchanged narrated presentation from local parts."""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parent
manifest = json.loads((root / 'Pharm Behavioral Health - Narrated.pptx.parts.json').read_text())
target = root / manifest['fileName']
if target.exists():
    if hashlib.sha256(target.read_bytes()).hexdigest() != manifest['sha256']:
        raise SystemExit('A different file already exists at the output path; it was not overwritten.')
    print('Existing presentation matches the original.')
    raise SystemExit(0)
temporary = target.with_suffix(target.suffix + '.tmp')
try:
    with temporary.open('wb') as output:
        for item in manifest['parts']:
            data = (root / item['path']).read_bytes()
            if len(data) != item['size'] or hashlib.sha256(data).hexdigest() != item['sha256']:
                raise ValueError('Part verification failed: ' + item['path'])
            output.write(data)
    if temporary.stat().st_size != manifest['size'] or hashlib.sha256(temporary.read_bytes()).hexdigest() != manifest['sha256']:
        raise ValueError('Reconstructed presentation verification failed.')
    temporary.replace(target)
    print('Reconstructed original presentation:', target.name)
finally:
    temporary.unlink(missing_ok=True)
