from pathlib import Path
from urllib.parse import unquote
from pypdf import PdfReader
import json,hashlib,subprocess,re
root=Path(__file__).resolve().parents[1]
bank=json.loads((root/'assets/question-banks/fundamentals-exam-3-standard.json').read_text());audit=json.loads((root/'assets/question-banks/audits/fundamentals-exam-3-page-map.json').read_text())
prior=json.loads(subprocess.check_output(['git','show','94b202f73245722ef6da69abb947f09c2bf18513:assets/question-banks/fundamentals-exam-3-standard.json'],cwd=root,text=True));prior={q['id']:q for q in prior['questions']}
cache={};checks=[]
def read(path):
 p=root/unquote(path)
 if p not in cache:cache[p]=PdfReader(p)
 return cache[p]
for q in bank['questions']:
 a={k:v for k,v in q.items() if k not in ['source','sourceLocator','previousSourceLocator']};b={k:v for k,v in prior[q['id']].items() if k not in ['source','sourceLocator','previousSourceLocator']};assert a==b,q['id']+' question content changed'
 s=q['source'];assert s['path'].endswith('.pdf');pdf=read(s['path']);assert 1<=s['page']<=len(pdf.pages)
 for p in s.get('pages',[]):assert 1<=p<=len(pdf.pages)
 for extra in s.get('relatedSources',[]):assert 1<=extra['page']<=len(read(extra['path']).pages)
 assert (pdf.pages[s['page']-1].extract_text() or '').strip(),q['id']+' empty target page'
 checks.append({'id':q['id'],'page':s['page'],'pagesInDocument':len(pdf.pages),'status':'PASS'})
for name,m in audit['documents'].items():
 p=root/m['path'];assert hashlib.sha256(p.read_bytes()).hexdigest()==m['sha256'];assert len(read(m['path']).pages)==m['pages']
 if m['slideCount']:assert m['pages']==2*m['slideCount']
# Targeted supporting-content checks for notes, native PDF indexing, and Word-page conversions.
need=[('fund-e3-0001','crossmatch'),('fund-e3-0022','sodium chloride'),('fund-e3-0083','Refeeding'),('fund-e3-0094','sterile'),('fund-e3-0095','75%'),('fund-e3-0162','Trousseau'),('fund-e3-0191','Dysuria'),('fund-e3-0263','Soap'),('fund-e3-0283','Oil'),('fund-e3-cm-005','Global')]
for ident,word in need:
 q=next(q for q in bank['questions'] if q['id']==ident);text=read(q['source']['path']).pages[q['source']['page']-1].extract_text() or '';assert word.lower() in text.lower(),(ident,word)
result={'status':'PASS','questionReferences':len(checks),'allQuestionContentAndKeysUnchanged':True,'allTargetsPDF':True,'documents':len(audit['documents']),'allPagesInBounds':True,'targetedSemanticChecks':len(need),'checks':checks}
(root/'assets/question-banks/audits/fundamentals-exam-3-reference-validation.json').write_text(json.dumps(result,indent=2)+'\n');print('PASS: 330 unchanged questions; PDF paths, physical page bounds, file hashes, and 10 targeted content checks')
