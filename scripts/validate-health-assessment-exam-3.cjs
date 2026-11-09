/* Run from repository root: node scripts/validate-health-assessment-exam-3.cjs */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
global.window=global;for(const f of ['exam-blueprint','exam-core'])vm.runInThisContext(fs.readFileSync('assets/js/'+f+'.js','utf8'));
// Load all diagram scripts in the real HTML order to detect a shared registry being overwritten.
const html=fs.readFileSync('exam.html','utf8');
for(const match of html.matchAll(/<script src="(assets\/js\/[^"]*diagrams\.js)(?:\?[^"]*)?"><\/script>/g))vm.runInThisContext(fs.readFileSync(match[1],'utf8'));
const b=JSON.parse(fs.readFileSync('assets/question-banks/health-assessment-exam-3-standard.json'));
const bp=JSON.parse(fs.readFileSync('assets/question-banks/blueprints/health-assessment-exam-3-standard.json'));
assert.deepStrictEqual(b.blueprint,bp);ExamCore.validate(b);assert.equal(b.questions.length,390);
const inv=JSON.parse(fs.readFileSync('assets/question-banks/audits/health-assessment-exam-3-sources.json'));
const crypto=require('crypto');for(const f of inv){const bytes=fs.readFileSync(f.path);assert.equal(bytes.length,f.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),f.sha256)}
const pageCounts=Object.fromEntries(inv.filter(x=>x.pages).map(x=>[x.path,x.pages]));let refs=0;
function checkSource(s){const p=decodeURIComponent(s.path);assert(!s.path.startsWith('http'));assert(fs.existsSync(p),p);if(s.page){assert(Number.isInteger(s.page)&&s.page>=1&&s.page<=pageCounts[p],p+':'+s.page)}assert(s.githubUrl.includes('/pwa-redesign/'));refs++;(s.relatedSources||[]).forEach(checkSource)}
for(const q of b.questions){assert(q.approved===true);assert(bp.subtopics[q.topic][q.subtopic]>0);assert(q.rationale.length>20);checkSource(q.source);
 if(q.diagram)assert(HealthAssessmentDiagrams[q.diagram]);
 if(q.options){const ids=q.options.map(o=>o.id);assert.equal(new Set(ids).size,ids.length);assert.equal(new Set(q.options.map(o=>o.text)).size,q.options.length);
  for(const id of [].concat(q.correct))assert(ids.includes(id));if(q.type==='sata'){assert(q.correct.length>1&&q.correct.length<ids.length);assert(ExamCore.grade(q,q.correct));assert(!ExamCore.grade(q,q.correct.slice(1)))}else{assert.equal(ids.length,4);assert(ExamCore.grade(q,q.correct));assert(!ExamCore.grade(q,ids.find(x=>x!==q.correct)))}
 }else{const ids=q.targets.map(o=>o.id);assert.equal(new Set(ids).size,ids.length);for(const pair of q.pairs)assert(ids.includes(pair.correct));const ans=Object.fromEntries(q.pairs.map(p=>[p.id,p.correct]));assert(ExamCore.grade(q,ans));const first=q.pairs[0];ans[first.id]=ids.find(x=>x!==first.correct);assert(!ExamCore.grade(q,ans))}
}
for(const s of b.references)checkSource(s);
const fingerprints=b.questions.map(q=>JSON.stringify([q.stem,q.options?.map(o=>o.text).sort(),q.pairs]));assert.equal(new Set(fingerprints).size,390);
for(const [topic,subs] of Object.entries(bp.subtopics))for(const sub of Object.keys(subs)){const pool=ExamCore.customPool(b,[{topic,subtopics:[sub]}]);assert.equal(pool.length,10);const engine=ExamCore.create(b);engine.begin({count:10,selections:[{topic,subtopics:[sub]}]});assert.equal(new Set(engine.questions.map(q=>q.id)).size,10);assert(engine.questions.every(q=>q.subtopic===sub))}
const selections=[{topic:'Chapter 14',subtopics:['MASD']},{topic:'Chapter 22',subtopics:['Peripheral edema']}];assert.equal(ExamCore.customPool(b,selections).length,20);
const all=Object.keys(bp.topics).map(topic=>({topic,subtopics:null}));assert.equal(ExamCore.customPool(b,all).length,390);assert.equal(ExamCore.customPool(b,[]).length,0);
let state=3120;const rng=()=>((state=(Math.imul(state,1664525)+1013904223)>>>0)/4294967296);
for(let i=0;i<250;i++){const chosen=ExamBlueprint.assemble(b.questions,bp,rng);assert.equal(chosen.length,50);assert.equal(new Set(chosen.map(q=>q.id)).size,50);const n=t=>chosen.filter(q=>q.type===t).length;assert.equal(n('mcq'),33);assert.equal(n('visual'),5);assert.equal(n('matching')+n('sata'),12);for(const [topic,subs] of Object.entries(bp.subtopics))for(const [sub,count] of Object.entries(subs))assert.equal(chosen.filter(q=>q.topic===topic&&q.subtopic===sub).length,count)}
const e=ExamCore.create(b,rng);e.begin();for(let i=0;i<e.total;i++){const q=e.current();const response=q.type==='matching'?Object.fromEntries(q.pairs.map(p=>[p.id,p.correct])):q.correct;assert(e.submit(response));if(i<e.total-1)e.next()}assert.equal(e.score().percent,100);assert.equal(e.review().length,50);
const summary={status:'passed',questions:390,chapters:7,subcategories:39,perSubcategory:10,sourceFiles:inv.length,sourceLinksChecked:refs,randomizedFullExams:250,fullExamFormats:{mcq:33,alternate:12,visual:5},types:Object.fromEntries(['mcq','sata','matching','visual'].map(t=>[t,b.questions.filter(q=>q.type===t).length]))};
fs.writeFileSync('assets/question-banks/audits/health-assessment-exam-3-validation.json',JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary));
