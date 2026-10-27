"use strict";
const $=id=>document.getElementById(id),escapeHTML=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const params=new URLSearchParams(location.search);const bankId=params.get("bank");let engine=null,selection=null;
const root=$("exam-root"),meta=$("exam-meta"),actions=$("exam-actions"),alertBox=$("exam-alert");AnswerColors.apply();
function button(text,handler,disabled=false){const b=document.createElement("button");b.type="button";b.textContent=text;b.className=text.startsWith("Next")?"action-next":text.startsWith("Score")?"action-score":text.startsWith("Review")?"action-review":"action-submit";b.disabled=disabled;b.addEventListener("click",handler);actions.append(b);return b}
function resetUI(){root.replaceChildren();actions.replaceChildren();alertBox.textContent=""}
function sourceLink(q){const s=q.source;const wrap=document.createElement("p");wrap.className="source";wrap.append("Source: "+s.name+(s.page?" · PDF page "+s.page:"")+" · ");const a=document.createElement("a");a.href=s.path+(s.page?"#page="+s.page:"");a.textContent="View reference";a.addEventListener("click",e=>{e.preventDefault();openReference(a.href,s.name)});wrap.append(a);return wrap}
function showQuestion(){resetUI();selection=null;const q=engine.current();const submitted=engine.phase==="submitted";const prior=engine.answer;meta.textContent=engine.bank.course+" · "+engine.bank.examNumber+" · "+engine.bank.practiceName;root.append(Object.assign(document.createElement("p"),{className:"muted",textContent:"Question "+(engine.index+1)+" of "+engine.total}));if(q.caseText)root.append(Object.assign(document.createElement("aside"),{className:"case-panel",textContent:q.caseText}));root.append(Object.assign(document.createElement("h1"),{textContent:q.stem}));if(q.diagram&&window.HealthAssessmentDiagrams?.[q.diagram]){const figure=document.createElement("figure");figure.className="assessment-diagram";figure.innerHTML=window.HealthAssessmentDiagrams[q.diagram];figure.setAttribute("aria-label","Assessment illustration");root.append(figure)}
 const field=document.createElement("fieldset");const legend=document.createElement("legend");legend.textContent=q.type==="sata"?"Select all that apply":q.type==="matching"?"Match every item":q.type==="dosage"?"Enter the calculated dose":"Choose one answer";field.append(legend);
 if(["mcq","visual","sata","truefalse"].includes(q.type)){const choices=q.options;for(const option of choices){const label=document.createElement("label");label.className="answer-option";label.style.setProperty("--answer-index",String(choices.indexOf(option)%4));label.classList.add("answer-color-"+(choices.indexOf(option)%4));const input=document.createElement("input");input.type=q.type==="sata"?"checkbox":"radio";input.name="answer";input.value=option.id;input.disabled=submitted;input.checked=submitted?(q.type==="sata"?prior.response.includes(option.id):prior.response===option.id):false;input.addEventListener("change",()=>{selection=q.type==="sata"?[...field.querySelectorAll("input:checked")].map(x=>x.value):input.value;submitButton.disabled=Array.isArray(selection)?!selection.length:!selection});label.append(input,document.createTextNode(" "+option.text));field.append(label)}}
 else if(q.type==="matching"){selection={};for(const pair of q.pairs){const label=document.createElement("label");label.className="match-row";label.append(document.createTextNode(pair.prompt));const select=document.createElement("select");select.disabled=submitted;select.append(new Option("Select match",""));for(const option of q.targets)select.append(new Option(option.text,option.id));if(submitted)select.value=prior.response[pair.id];select.addEventListener("change",()=>{selection[pair.id]=select.value;submitButton.disabled=q.pairs.some(p=>!selection[p.id])});label.append(select);field.append(label)}}
 else if(q.type==="dosage"){const label=document.createElement("label");label.className="dosage-entry";const prompt=document.createElement("span");prompt.textContent=(q.instructions||"Enter a numeric answer")+" ("+(q.units||"units")+")";const input=document.createElement("input");input.setAttribute("aria-label","Calculated dose in "+(q.units||"units"));label.append(prompt);input.type="number";input.step="any";input.inputMode="decimal";input.disabled=submitted;if(submitted)input.value=prior.response;input.addEventListener("input",()=>{selection=input.value;submitButton.disabled=input.value.trim()===""});label.append(input);field.append(label)}
 root.append(field);root.append(reportLink(q,engine.index+1));let submitButton;
 if(!submitted){submitButton=button(q.type==="sata"?"Submit Answers":q.type==="matching"?"Submit Matches":"Submit Answer",()=>{engine.submit(selection);showQuestion()},true)}
 else{const feedback=document.createElement("section");feedback.className="feedback "+(prior.correct?"feedback-correct":"feedback-incorrect");feedback.setAttribute("role","status");const verdict=document.createElement("h2");verdict.textContent=prior.correct?"Correct":"Incorrect";feedback.append(verdict);const correct=document.createElement("p");correct.textContent="Correct answer: "+formatAnswer(q,q.correct);feedback.append(correct,Object.assign(document.createElement("p"),{textContent:q.rationale}),sourceLink(q));root.append(feedback);if(engine.index===engine.total-1)button("Score Exam",showResults);else button("Next Question",()=>{engine.next();showQuestion()})}
}
function formatAnswer(q,key){if(q.type==="matching")return q.pairs.map(p=>p.prompt+" → "+(q.targets.find(t=>t.id===(key?.[p.id]||p.correct))?.text||(key?.[p.id]||p.correct))).join("; ");if(q.type==="dosage")return key+" "+(q.units||"");const ids=Array.isArray(key)?key:[key];return ids.map(id=>q.options?.find(o=>o.id===id)?.text||id).join("; ")}
function showIntro(){
 resetUI();meta.textContent=engine.bank.course+" · "+engine.bank.examNumber+" · "+engine.bank.practiceName;
 root.innerHTML="<h1>Ready to practice?</h1><p>Answer each question and select Submit to see feedback. You can only move forward until the exam is scored.</p>"+(engine.bank.qaPreview?"<p role=\"note\"><strong>QA PREVIEW — PRACTICE CONTENT UNDER REVIEW.</strong> "+escapeHTML(engine.bank.notice||"Questions are not yet approved.")+"</p>":"");
 if(!engine.bank.blueprint){root.append(Object.assign(document.createElement("p"),{textContent:(engine.bank.previewCount||engine.bank.questions.length)+" questions per attempt."}));button("Start Exam",()=>{engine.begin();showQuestion()});return}
 const bp=engine.bank.blueprint;
 const setup=document.createElement("div");setup.className="practice-setup";
 setup.innerHTML='<label for="practice-mode">Practice mode</label><select id="practice-mode"><option value="standard">Full blueprint exam ('+bp.total+' questions)</option><option value="custom">Custom practice</option></select><div id="custom-settings" hidden><label for="practice-topic">Blueprint section</label><select id="practice-topic"></select><label for="practice-subtopic">Blueprint subsection</label><select id="practice-subtopic"></select><label for="practice-count">Number of questions</label><input id="practice-count" type="number" min="1" step="1" inputmode="numeric"><p id="practice-availability" role="status"></p><p class="muted">Custom practice draws randomly from the selected questions. It does not enforce the full exam’s topic or question-type quotas.</p></div>';root.append(setup);
 const mode=$("practice-mode"),topic=$("practice-topic"),sub=$("practice-subtopic"),count=$("practice-count"),status=$("practice-availability");
 topic.add(new Option("All blueprint sections","all"));Object.keys(bp.topics).forEach(t=>topic.add(new Option(t,t)));
 function updateSub(){sub.replaceChildren(new Option("All subsections",""));Object.keys(bp.subtopics?.[topic.value]||{}).forEach(t=>sub.add(new Option(t,t)));sub.disabled=sub.options.length===1;updateCount()}
 function updateCount(){const n=engine.bank.questions.filter(q=>q.approved===true&&(topic.value==="all"||q.topic===topic.value)&&(!sub.value||q.subtopic===sub.value)).length;count.max=n;count.value=n?Math.min(Number(count.value)||20,n):"";status.textContent=n?n+" approved questions available. Choose 1–"+n+".":"No approved questions are available for this selection.";start.disabled=mode.value==="custom"&&!n}
 mode.addEventListener("change",()=>{$("custom-settings").hidden=mode.value!=="custom";updateCount()});topic.addEventListener("change",updateSub);sub.addEventListener("change",updateCount);
 const start=button("Start Exam",()=>{try{if(mode.value==="standard")engine.begin();else{const value=count.valueAsNumber;if(!count.checkValidity()||!Number.isInteger(value))throw Error("Choose a whole number within the available range.");engine.begin({topic:topic.value,subtopic:sub.value,count:value})}showQuestion()}catch(err){alertBox.textContent=err.message}});updateSub();
}
function showResults(){const result=engine.score();resetUI();root.innerHTML="<h1>Exam results</h1><p class='score'>"+result.percent+"%</p><p>"+result.correct+" correct · "+result.incorrect+" incorrect · "+result.total+" questions</p>";button("Review Entire Exam",showReview)}
function showReview(){const items=engine.review();resetUI();root.append(Object.assign(document.createElement("h1"),{textContent:"Read-only exam review"}));items.forEach(({question:q,answer:a},i)=>{const section=document.createElement("section");section.className="review-item";section.append(Object.assign(document.createElement("h2"),{textContent:(i+1)+". "+q.stem}),Object.assign(document.createElement("p"),{textContent:"Your answer: "+formatAnswer(q,a.response)}),Object.assign(document.createElement("p"),{textContent:"Correct answer: "+formatAnswer(q,q.correct)}),Object.assign(document.createElement("p"),{textContent:a.correct?"Correct":"Incorrect"}),Object.assign(document.createElement("p"),{textContent:q.rationale}),sourceLink(q),reportLink(q,i+1));root.append(section)})}

// A Google Form destination must be configured by the owner before submissions are enabled.
// The student can still prepare and copy a report without losing the exam attempt.
const REPORT_FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLScP6UDpwn6ExIfPvgenZqRz4DSBVPHcFmusnU4MC1BPI7W8MQ/viewform"; // Paste the published Google Form URL (https://docs.google.com/forms/d/e/.../viewform).
const reportReasons=["Incorrect answer or rationale","Confusing or unclear wording","Missing or incorrect information","Technical issue","Other"];
function reportLink(q,number){const b=document.createElement("button");b.type="button";b.className="report-link";b.textContent="⚑ Report a problem with this question";b.addEventListener("click",()=>openReport(q,number));return b}
function openReport(q,number){
 const dialog=$("report-dialog");const form=$("report-form");form.reset();form.hidden=false;
 $("report-context").textContent=engine.bank.course+" · "+engine.bank.examNumber+" · "+engine.bank.practiceName+" · Question "+number+" · ID "+q.id;
 $("report-status").textContent="";$("report-fallback").hidden=true;$("report-frame").hidden=true;$("report-frame").removeAttribute("src");$("report-preview").hidden=true;$("copy-report").hidden=true;dialog.showModal();$("report-reason").focus();
 form.onsubmit=e=>{e.preventDefault();
 const url=new URL(REPORT_FORM_URL);
 const fields={
 "entry.431985147":engine.bank.course,
 "entry.306826281":engine.bank.examNumber+" · "+engine.bank.practiceName,
 "entry.1968295452":q.id,
 "entry.482083630":q.stem,
 "entry.973603052":$("report-reason").value,
 "entry.1667769534":$("report-details").value.trim()
 };
 Object.entries(fields).forEach(([key,value])=>url.searchParams.set(key,value));
 url.searchParams.set("usp","pp_url");
 const report=["Course: "+engine.bank.course,"Exam / Practice Version: "+fields["entry.306826281"],"Question ID: "+q.id,"Question Text: "+q.stem,"Type of Issue: "+fields["entry.973603052"],"Describe the Problem: "+(fields["entry.1667769534"]||"(none)")].join("\\n");
 $("report-preview").value=report;$("report-preview").hidden=true;$("copy-report").hidden=true;
 const frame=$("report-frame");url.searchParams.set("embedded","true");frame.src=url.toString();frame.hidden=false;form.hidden=true;
 $("report-status").textContent="Complete the report in the embedded Google Form and press Submit there. If the form does not load, use the backup link below.";const fallback=$("report-fallback");fallback.href=url.toString();fallback.hidden=false;
 };
}
$("close-report").addEventListener("click",()=>$("report-dialog").close());$("report-dialog").addEventListener("close",()=>{$("report-frame").removeAttribute("src")});
let referencePdfUrl="",referencePage=1,referenceDocument=null,referenceRenderToken=0,referenceOpenToken=0;
let pdfLibraryPromise=null;
const pdfJsBase="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/";
function loadPdfLibrary(){
 if(!pdfLibraryPromise)pdfLibraryPromise=import(pdfJsBase+"pdf.mjs").then(lib=>{lib.GlobalWorkerOptions.workerSrc=pdfJsBase+"pdf.worker.mjs";return lib});
 return pdfLibraryPromise;
}
async function setReferencePage(page){
 const token=++referenceRenderToken;
 const status=$("reference-status"),canvas=$("reference-canvas"),frame=$("reference-frame");
 referencePage=Math.max(1,Math.floor(Number(page)||1));
 if(referenceDocument)referencePage=Math.min(referencePage,referenceDocument.numPages);
 $("reference-page").value=String(referencePage);
 $("reference-previous").disabled=referencePage<=1;
 $("reference-next").disabled=referenceDocument?referencePage>=referenceDocument.numPages:false;
 const count=$("reference-page-count");count.textContent=referenceDocument?"/ "+referenceDocument.numPages:"";
 $("reference-open-direct").href=referencePdfUrl+"#page="+referencePage;
 if(!referenceDocument)return;
 try{
  status.textContent="Rendering page "+referencePage+"…";
  const pageObject=await referenceDocument.getPage(referencePage);
  if(token!==referenceRenderToken)return;
  const viewportBase=pageObject.getViewport({scale:1});
  const available=Math.max(240,Math.min(1000,$("reference-canvas-wrap").clientWidth-16));
  const scale=Math.min(2.5,available/viewportBase.width);
  const viewport=pageObject.getViewport({scale});
  const ratio=Math.min(window.devicePixelRatio||1,2);
  const offscreen=document.createElement("canvas");
  offscreen.width=Math.ceil(viewport.width*ratio);offscreen.height=Math.ceil(viewport.height*ratio);
  const context=offscreen.getContext("2d");
  await pageObject.render({canvasContext:context,viewport,transform:ratio===1?undefined:[ratio,0,0,ratio,0,0]}).promise;
  if(token!==referenceRenderToken)return;
  canvas.width=offscreen.width;canvas.height=offscreen.height;
  canvas.getContext("2d").drawImage(offscreen,0,0);
  canvas.hidden=false;frame.hidden=true;status.textContent="";
  $("reference-canvas-wrap").scrollTop=0;
 }catch(err){
  if(token!==referenceRenderToken)return;
  status.textContent="Unable to render this page. Try Open PDF instead. "+err.message;
 }
}
async function openReference(url,title){
 const dialog=$("reference-dialog"),frame=$("reference-frame"),textPanel=$("reference-text"),status=$("reference-status");
 const openToken=++referenceOpenToken;
 $("reference-heading").textContent=title||"Exam reference";
 ++referenceRenderToken;referenceDocument=null;referencePdfUrl="";referencePage=1;
 frame.hidden=true;frame.removeAttribute("src");textPanel.hidden=true;textPanel.textContent="";
 $("reference-canvas").hidden=true;$("reference-canvas-wrap").hidden=true;
 const nav=$("reference-navigation");nav.hidden=true;
 status.textContent="Loading reference…";dialog.showModal();
 try{
  const parsed=new URL(url,location.href);
  if(parsed.origin!==location.origin)throw Error("This reference is hosted externally and cannot be displayed here.");
  const path=parsed.pathname.toLowerCase();
  if(path.endsWith(".md")||path.endsWith(".txt")){
   const response=await fetch(parsed.href,{cache:"no-store"});
   if(!response.ok)throw Error("Reference unavailable (HTTP "+response.status+").");
   textPanel.textContent=await response.text();textPanel.hidden=false;status.textContent="";
  }else if(path.endsWith(".pdf")){
   referencePdfUrl=parsed.origin+parsed.pathname+parsed.search;
   referencePage=Math.max(1,parseInt(parsed.hash.match(/page=(\d+)/)?.[1]||"1",10));
   nav.hidden=false;
   $("reference-open-direct").href=referencePdfUrl+"#page="+referencePage;
   const pdfjs=await loadPdfLibrary();
   if(openToken!==referenceOpenToken||!dialog.open)return;
   const loadedDocument=await pdfjs.getDocument({url:referencePdfUrl}).promise;
   if(openToken!==referenceOpenToken||!dialog.open){loadedDocument.destroy();return}
   referenceDocument=loadedDocument;
   $("reference-canvas-wrap").hidden=false;
   await setReferencePage(referencePage);
  }else{
   const response=await fetch(parsed.href,{cache:"no-store"});
   if(!response.ok)throw Error("Reference unavailable (HTTP "+response.status+").");
   const type=response.headers.get("content-type")||"";
   if(type.includes("text/")){textPanel.textContent=await response.text();textPanel.hidden=false;status.textContent=""}
   else{frame.src=parsed.href;frame.hidden=false;status.textContent="If the document does not display, use your browser to open the document."}
  }
 }catch(err){if(openToken===referenceOpenToken&&dialog.open)status.textContent="Unable to render reference here. Use Open PDF to view it directly. "+err.message}
}
$("reference-previous").addEventListener("click",()=>setReferencePage(referencePage-1));
$("reference-next").addEventListener("click",()=>setReferencePage(referencePage+1));
$("reference-page").addEventListener("change",e=>setReferencePage(e.target.value));
$("close-reference").addEventListener("click",()=>$("reference-dialog").close());$("reference-dialog").addEventListener("close",()=>{++referenceOpenToken;++referenceRenderToken;$("reference-frame").removeAttribute("src");const oldDocument=referenceDocument;referenceDocument=null;if(oldDocument)oldDocument.destroy().catch(()=>{});$("reference-canvas").hidden=true;});
$("copy-report").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("report-preview").value);$("report-status").textContent="Report copied. Paste it into the Google Form when available."}catch(_){$("report-preview").focus();$("report-preview").select();$("report-status").textContent="Select and copy the highlighted report text."}});

function confirmLeave(){return !engine||!["active","submitted"].includes(engine.phase)||confirm("Leave this exam? Your current attempt will be lost.")}
$("reset-exam").addEventListener("click",()=>{if(engine&&confirm("Return to practice setup? All answers will be cleared.")){engine=ExamCore.create(engine.bank);showIntro()}});
$("return-hub").addEventListener("click",e=>{if(!confirmLeave())e.preventDefault()});
$("references").addEventListener("click",()=>{if(!engine)return;const sources=[...new Map(engine.bank.questions.map(q=>[q.source.path,q.source])).values()];const dialog=$("references-dialog"),list=$("references-list");list.replaceChildren();sources.forEach(s=>{const b=document.createElement("button");b.type="button";b.textContent=s.name+" · View reference";b.addEventListener("click",()=>{dialog.close();openReference(new URL(s.path,location.href).href,s.name)});list.append(b)});dialog.showModal()});
$("close-references").addEventListener("click",()=>$("references-dialog").close());
window.addEventListener("beforeunload",e=>{if(engine&&["active","submitted"].includes(engine.phase)){e.preventDefault();e.returnValue=""}});
(async()=>{try{if(!bankId||!/^[a-z0-9-]+$/.test(bankId))throw Error("No valid question bank selected");const response=await fetch("assets/question-banks/"+bankId+".json");if(!response.ok)throw Error("Question bank unavailable");const bank=await response.json();
if(bankId==="pathophysiology-exam-3-standard"){
 const blueprintResponse=await fetch("assets/question-banks/blueprints/pathophysiology-exam-3-standard.json");
 if(!blueprintResponse.ok)throw Error("Pathophysiology Exam 3 blueprint unavailable");
 bank.blueprint=await blueprintResponse.json();
 delete bank.previewCount;
}

if(bankId==="health-assessment-exam-2-standard"){
 const responseBlueprint=await fetch("assets/question-banks/blueprints/health-assessment-exam-2-standard.json");
 if(!responseBlueprint.ok)throw Error("Health Assessment blueprint unavailable");
 bank.blueprint=await responseBlueprint.json();
 delete bank.previewCount;
}

if(bankId==="fundamentals-exam-2-qa-standard"){
 const sourceBase="References/Fundamentals/Exams/Exam%202/";
 for(const q of bank.questions){
  const sourceName=q.source?.name==="Fundies course materials"?"fundies med math.pdf":q.source?.name;
  if(sourceName)q.source.path=sourceBase+encodeURIComponent(sourceName);
  q.approved=!["fund-e2-rebuilt-1-q001","fund-e2-rebuilt-1-q003"].includes(q.id);
 }
 if(bankId==="fundamentals-exam-2-qa-standard"){
  const [bpResponse,tfResponse,tagResponse]=await Promise.all([fetch("assets/question-banks/blueprints/fundamentals-exam-2-standard.json"),fetch("assets/question-banks/fundamentals-exam-2-supplement.json"),fetch("assets/question-banks/blueprints/fundamentals-exam-2-subtopic-assignments.json")]);
  if(!bpResponse.ok||!tfResponse.ok||!tagResponse.ok)throw Error("Fundamentals blueprint metadata unavailable");
  bank.blueprint=await bpResponse.json();
  const supplement=await tfResponse.json();
  const tagMap=(await tagResponse.json()).assignments;
  for(const item of supplement.questions)bank.questions.push({id:item.id,topic:item.topic,type:"truefalse",stem:"True or false: "+item.statement,options:[{id:"true",text:"True"},{id:"false",text:"False"}],correct:String(item.correct),rationale:item.rationale,source:{name:item.source,path:sourceBase+encodeURIComponent(item.source),page:item.page},approved:true});
  for(const q of bank.questions){q.subtopic=tagMap[q.id]||null;}
  bank.practiceName="Standard Exam Engine";
  bank.notice="Exact topic and subtopic quotas and question-type ranges enforced. COPD case-study slots use six COPD-themed questions.";
  delete bank.previewCount;
 }
}
engine=ExamCore.create(bank);showIntro()}catch(err){root.textContent="This exam is not ready: "+err.message}})();

