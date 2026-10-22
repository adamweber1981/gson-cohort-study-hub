"use strict";
const $=id=>document.getElementById(id),escapeHTML=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const params=new URLSearchParams(location.search);const bankId=params.get("bank");let engine=null,selection=null;
const root=$("exam-root"),meta=$("exam-meta"),actions=$("exam-actions"),alertBox=$("exam-alert");
function button(text,handler,disabled=false){const b=document.createElement("button");b.type="button";b.textContent=text;b.className=text.startsWith("Next")?"action-next":text.startsWith("Score")?"action-score":text.startsWith("Review")?"action-review":"action-submit";b.disabled=disabled;b.addEventListener("click",handler);actions.append(b);return b}
function resetUI(){root.replaceChildren();actions.replaceChildren();alertBox.textContent=""}
function sourceLink(q){const s=q.source;const wrap=document.createElement("p");wrap.className="source";wrap.append("Source: "+s.name+(s.page?" · PDF page "+s.page:"")+" · ");const a=document.createElement("a");a.href=s.path+(s.page?"#page="+s.page:"");a.target="_blank";a.rel="noopener";a.textContent="Open reference ↗";wrap.append(a);return wrap}
function showQuestion(){resetUI();selection=null;const q=engine.current();const submitted=engine.phase==="submitted";const prior=engine.answer;meta.textContent=engine.bank.course+" · "+engine.bank.examNumber+" · "+engine.bank.practiceName;root.append(Object.assign(document.createElement("p"),{className:"muted",textContent:"Question "+(engine.index+1)+" of "+engine.total}));if(q.caseText)root.append(Object.assign(document.createElement("aside"),{className:"case-panel",textContent:q.caseText}));root.append(Object.assign(document.createElement("h1"),{textContent:q.stem}));
 const field=document.createElement("fieldset");const legend=document.createElement("legend");legend.textContent=q.type==="sata"?"Select all that apply":q.type==="matching"?"Match every item":q.type==="dosage"?"Enter the calculated dose":"Choose one answer";field.append(legend);
 if(["mcq","sata","truefalse"].includes(q.type)){const choices=q.options;for(const option of choices){const label=document.createElement("label");label.className="answer-option";const input=document.createElement("input");input.type=q.type==="sata"?"checkbox":"radio";input.name="answer";input.value=option.id;input.disabled=submitted;input.checked=submitted?(q.type==="sata"?prior.response.includes(option.id):prior.response===option.id):false;input.addEventListener("change",()=>{selection=q.type==="sata"?[...field.querySelectorAll("input:checked")].map(x=>x.value):input.value;submitButton.disabled=Array.isArray(selection)?!selection.length:!selection});label.append(input,document.createTextNode(" "+option.text));field.append(label)}}
 else if(q.type==="matching"){selection={};for(const pair of q.pairs){const label=document.createElement("label");label.className="match-row";label.append(document.createTextNode(pair.prompt));const select=document.createElement("select");select.disabled=submitted;select.append(new Option("Select match",""));for(const option of q.targets)select.append(new Option(option.text,option.id));if(submitted)select.value=prior.response[pair.id];select.addEventListener("change",()=>{selection[pair.id]=select.value;submitButton.disabled=q.pairs.some(p=>!selection[p.id])});label.append(select);field.append(label)}}
 else if(q.type==="dosage"){const label=document.createElement("label");label.textContent=(q.instructions||"Enter a numeric answer")+" ("+(q.units||"units")+")";const input=document.createElement("input");input.type="number";input.step="any";input.disabled=submitted;if(submitted)input.value=prior.response;input.addEventListener("input",()=>{selection=input.value;submitButton.disabled=input.value.trim()===""});label.append(input);field.append(label)}
 root.append(field);root.append(reportLink(q,engine.index+1));let submitButton;
 if(!submitted){submitButton=button(q.type==="sata"?"Submit Answers":q.type==="matching"?"Submit Matches":"Submit Answer",()=>{engine.submit(selection);showQuestion()},true)}
 else{const feedback=document.createElement("section");feedback.className="feedback "+(prior.correct?"feedback-correct":"feedback-incorrect");feedback.setAttribute("role","status");const verdict=document.createElement("h2");verdict.textContent=prior.correct?"Correct":"Incorrect";feedback.append(verdict);const correct=document.createElement("p");correct.textContent="Correct answer: "+formatAnswer(q,q.correct);feedback.append(correct,Object.assign(document.createElement("p"),{textContent:q.rationale}),sourceLink(q));root.append(feedback);if(engine.index===engine.total-1)button("Score Exam",showResults);else button("Next Question",()=>{engine.next();showQuestion()})}
}
function formatAnswer(q,key){if(q.type==="matching")return q.pairs.map(p=>p.prompt+" → "+(q.targets.find(t=>t.id===(key?.[p.id]||p.correct))?.text||(key?.[p.id]||p.correct))).join("; ");if(q.type==="dosage")return key+" "+(q.units||"");const ids=Array.isArray(key)?key:[key];return ids.map(id=>q.options?.find(o=>o.id===id)?.text||id).join("; ")}
function showIntro(){resetUI();meta.textContent=engine.bank.course+" · "+engine.bank.examNumber+" · "+engine.bank.practiceName;root.innerHTML="<h1>Ready to practice?</h1><p>"+engine.bank.questions.length+" questions. Answer each question and select Submit to see feedback. You can only move forward until the exam is scored.</p>";button("Start Exam",()=>{engine.begin();showQuestion()})}
function showResults(){const result=engine.score();resetUI();root.innerHTML="<h1>Exam results</h1><p class='score'>"+result.percent+"%</p><p>"+result.correct+" correct · "+result.incorrect+" incorrect · "+result.total+" questions</p>";button("Review Entire Exam",showReview)}
function showReview(){const items=engine.review();resetUI();root.append(Object.assign(document.createElement("h1"),{textContent:"Read-only exam review"}));items.forEach(({question:q,answer:a},i)=>{const section=document.createElement("section");section.className="review-item";section.append(Object.assign(document.createElement("h2"),{textContent:(i+1)+". "+q.stem}),Object.assign(document.createElement("p"),{textContent:"Your answer: "+formatAnswer(q,a.response)}),Object.assign(document.createElement("p"),{textContent:"Correct answer: "+formatAnswer(q,q.correct)}),Object.assign(document.createElement("p"),{textContent:a.correct?"Correct":"Incorrect"}),Object.assign(document.createElement("p"),{textContent:q.rationale}),sourceLink(q),reportLink(q,i+1));root.append(section)})}

// A Google Form destination must be configured by the owner before submissions are enabled.
// The student can still prepare and copy a report without losing the exam attempt.
const REPORT_FORM_URL=""; // Paste the published Google Form URL (https://docs.google.com/forms/d/e/.../viewform).
const reportReasons=["Incorrect answer or rationale","Confusing or unclear wording","Missing or incorrect information","Technical issue","Other"];
function reportLink(q,number){const b=document.createElement("button");b.type="button";b.className="report-link";b.textContent="⚑ Report a problem with this question";b.addEventListener("click",()=>openReport(q,number));return b}
function openReport(q,number){
 const dialog=$("report-dialog");const form=$("report-form");form.reset();
 $("report-context").textContent=engine.bank.course+" · "+engine.bank.examNumber+" · "+engine.bank.practiceName+" · Question "+number+" · ID "+q.id;
 $("report-status").textContent="";dialog.showModal();$("report-reason").focus();
 form.onsubmit=e=>{e.preventDefault();const report=[
 "Study Hub question report",
 "Course: "+engine.bank.course,
 "Exam: "+engine.bank.examNumber,
 "Practice version: "+engine.bank.practiceName,
 "Question number (this attempt): "+number,
 "Stable question ID: "+q.id,
 "Question: "+q.stem,
 "Issue: "+$("report-reason").value,
 "Details: "+($("report-details").value.trim()||"(none)")
 ].join("\n");
 if(REPORT_FORM_URL){try{const url=new URL(REPORT_FORM_URL);if(url.protocol!=="https:"||!url.hostname.endsWith("google.com")||!url.pathname.includes("/forms/"))throw Error("Invalid Google Form URL");window.open(url.toString(),"_blank","noopener,noreferrer");$("report-status").textContent="Google Form opened. Copy the prepared report below into the form and submit it there. Nothing has been sent yet."}catch(_){$("report-status").textContent="The configured Google Form URL is invalid. Copy the report below instead."}}
 else $("report-status").textContent="Google Form submission is not connected yet. Copy this report and send it to the Study Hub administrator; no report has been submitted.";
 $("report-preview").value=report;$("report-preview").hidden=false;$("copy-report").hidden=false;
 };
}
$("close-report").addEventListener("click",()=>$("report-dialog").close());
$("copy-report").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("report-preview").value);$("report-status").textContent="Report copied. Paste it into the Google Form when available."}catch(_){$("report-preview").focus();$("report-preview").select();$("report-status").textContent="Select and copy the highlighted report text."}});

function confirmLeave(){return !engine||!["active","submitted"].includes(engine.phase)||confirm("Leave this exam? Your current attempt will be lost.")}
$("reset-exam").addEventListener("click",()=>{if(engine&&confirm("Start a new randomized attempt? All answers will be cleared.")){engine.reset();showQuestion()}});
$("return-hub").addEventListener("click",e=>{if(!confirmLeave())e.preventDefault()});
$("references").addEventListener("click",()=>{if(!engine)return;const sources=[...new Map(engine.bank.questions.map(q=>[q.source.path,q.source])).values()];resetUI();root.append(Object.assign(document.createElement("h1"),{textContent:"Exam references"}));sources.forEach(s=>{const p=document.createElement("p");const a=document.createElement("a");a.href=s.path;a.target="_blank";a.rel="noopener";a.textContent=s.name+" ↗";p.append(a);root.append(p)});button("Return to question",()=>{if(engine.phase==="intro")showIntro();else if(engine.phase==="results")showResults();else if(engine.phase==="review")showReview();else showQuestion()})});
window.addEventListener("beforeunload",e=>{if(engine&&["active","submitted"].includes(engine.phase)){e.preventDefault();e.returnValue=""}});
(async()=>{try{if(!bankId||!/^[a-z0-9-]+$/.test(bankId))throw Error("No valid question bank selected");const response=await fetch("assets/question-banks/"+bankId+".json");if(!response.ok)throw Error("Question bank unavailable");const bank=await response.json();engine=ExamCore.create(bank);showIntro()}catch(err){root.textContent="This exam is not ready: "+err.message}})();
