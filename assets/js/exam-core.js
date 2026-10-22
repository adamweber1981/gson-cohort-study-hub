"use strict";
(function(root){
 const shuffle=(items,random=Math.random)=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out};
 const equalSet=(a,b)=>a.length===b.length&&new Set(a).size===new Set(b).size&&a.every(x=>b.includes(x));
 const grade=(q,response)=>{if(q.type==="sata")return equalSet(response||[],q.correct);
 if(q.type==="matching")return q.pairs.every(p=>response?.[p.id]===p.correct);
 if(q.type==="dosage"){const value=Number(response);return String(response).trim()!==""&&Number.isFinite(value)&&Math.abs(value-Number(q.correct))<=Number(q.tolerance||0)}
 return response===q.correct};
 function validate(bank){if(!bank||!bank.course||!bank.examNumber||!bank.practiceName||!Array.isArray(bank.questions)||!bank.questions.length)throw Error("Invalid exam metadata or empty bank");
 const ids=new Set();for(const q of bank.questions){if(!q.id||ids.has(q.id)||!q.stem||!q.type||!q.rationale||!q.source?.name||!q.source?.path)throw Error("Invalid question or missing reference: "+(q.id||"?"));ids.add(q.id);
 if(["mcq","sata","truefalse"].includes(q.type)&&(!Array.isArray(q.options)||!q.options.length))throw Error("Missing options: "+q.id);
 if(q.type==="matching"&&(!Array.isArray(q.pairs)||!q.pairs.length))throw Error("Missing pairs: "+q.id);
 if(!["mcq","sata","matching","truefalse","dosage"].includes(q.type))throw Error("Unsupported type: "+q.type)}
 return true}
 function create(bank,random=Math.random){validate(bank);let questions=[],answers=[],index=0,phase="intro";
 const begin=()=>{const groups=new Map();for(const q of bank.questions){const key=q.caseId||q.id;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q)}
 questions=shuffle([...groups.values()],random).flatMap(group=>group.map(q=>({...q,options:q.options?shuffle(q.options,random):undefined,pairs:q.pairs?shuffle(q.pairs,random):undefined})));answers=[];index=0;phase="active";return current()};
 const current=()=>questions[index];
 const submit=response=>{if(phase!=="active")throw Error("Cannot submit now");const q=current();if(response===undefined||response===null||(Array.isArray(response)&&!response.length)||(q.type==="matching"&&q.pairs.some(p=>!response[p.id]))||(q.type==="dosage"&&String(response).trim()===""))throw Error("Complete the response first");const correct=grade(q,response);answers.push({id:q.id,response:structuredClone(response),correct});phase="submitted";return correct};
 const next=()=>{if(phase!=="submitted")throw Error("Submit first");if(index===questions.length-1)throw Error("Score exam after final question");index++;phase="active";return current()};
 const score=()=>{if(phase!=="submitted"||answers.length!==questions.length)throw Error("Complete all questions first");phase="results";const correct=answers.filter(a=>a.correct).length;return {correct,incorrect:questions.length-correct,total:questions.length,percent:Math.round(100*correct/questions.length)}};
 const review=()=>{if(!["results","review"].includes(phase))throw Error("Score first");phase="review";return questions.map((question,i)=>({question,answer:answers[i]}))};
 return {begin,current,submit,next,score,review,reset:begin,get phase(){return phase},get index(){return index},get total(){return questions.length},get answer(){return answers[index]},get questions(){return questions},get answers(){return answers},bank};
 }
 root.ExamCore={shuffle,grade,validate,create};
})(window);
