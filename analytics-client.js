(()=>{
'use strict';
const API='__WORKER_URL__';
const path=decodeURIComponent(location.pathname);
const match=path.match(/\/(Assessments|Fundamentals)\/Exam 2\/(?:Health Assessment|Fundamentals) Exam 2 - Version ([1-8])\.html$/i);
if(!match || API.includes('__WORKER_URL__'))return;
const exam=(match[1].toLowerCase()==='assessments'?'assessment':'fundamentals')+'-2-v'+match[2];
let started=false,completed=false,attempt=0;
function send(event, extra={}){
 const body=JSON.stringify({exam,event,...extra});
 try{fetch(API+'/api/events',{method:'POST',mode:'cors',headers:{'Content-Type':'application/json'},body,keepalive:true}).catch(()=>{});}catch{}
}
function getProgress(){
 if(exam.startsWith('fundamentals')) {
   if(typeof state==='undefined')return null;
   const answered=state.questions.filter((q,i)=>{const a=state.answers[i];return q.kind==='match'?Array.isArray(a)&&a.length===q.pairs.length&&a.every(x=>x!==''):Array.isArray(a)&&a.length>0}).length;
   const points=Object.values(state.scores).reduce((a,b)=>a+b,0);
   return {answered,total:state.questions.length,percent:100*points/state.questions.length};
 }
 if(typeof ANSWERED==='undefined'||typeof QUESTIONS==='undefined')return null;
 let points=0;for(const i of ANSWERED)points+=scoreOne(QUESTIONS[i],getSelections(i,QUESTIONS[i]));
 return {answered:ANSWERED.size,total:QUESTIONS.length,percent:100*points/QUESTIONS.length};
}
function startOnce(){if(!started){started=true;send('start')}}
document.addEventListener('change',e=>{if(e.target.closest('#questions'))startOnce()},true);
document.addEventListener('click',e=>{
 const el=e.target.closest('button,a');if(!el)return;
 const id=el.id||'';
 const isScore=['score','scoreTop','scoreBottom'].includes(id);
 const isReset=['reset','resetTop','resetBottom'].includes(id);
 if(isScore){startOnce();const thisAttempt=attempt;setTimeout(()=>{
   if(thisAttempt!==attempt)return;
   send('score_click');const p=getProgress();if(!completed&&p&&p.total===50&&p.answered===50){completed=true;send('complete',{score_bp:Math.max(0,Math.min(10000,Math.round(p.percent*100)))})}
 },0);}
 if(isReset){const before=exam.startsWith('fundamentals')?state.questions:QUESTIONS;
   setTimeout(()=>{const after=exam.startsWith('fundamentals')?state.questions:QUESTIONS;
     if(before!==after){attempt++;started=false;completed=false;send('reset');}
   },0);
 }
 const text=(el.textContent||'').trim().toLowerCase();
 if((id==='pdfDownload'||id==='sourceDownload'||el.hasAttribute('download')||text.includes('download pdf'))){send('reference_download');}
 else if((text.includes('view cited page')||el.closest('.source')&&el.tagName==='A'&&!el.hasAttribute('download')||text.includes('page ')&&el.tagName==='A')){send('reference_open');}
},true);
})();
