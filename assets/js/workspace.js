/* Modern Workspace: presentation/navigation only; exam engine remains separate. */
(function(){
 'use strict';
 const $=id=>document.getElementById(id);
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
 const paths={pill:'M10.5 4.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7l7-7ZM7 8l7 7',lungs:'M10 3v7l-2 2M14 3v7l2 2M8 7C5 7 3 12 3 17c0 3 5 2 7 0V9M16 7c3 0 5 5 5 10 0 3-5 2-7 0V9',book:'M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1v15',stethoscope:'M5 3v5a5 5 0 0 0 10 0V3M3 3h4M13 3h4M10 13v3a5 5 0 0 0 10 0v-3M20 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4',grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',references:'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7',settings:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M9 3h6l.6 3 2.5 1.5 2.9-.9 3 5-2.3 2 .1 2.9 2.2 2-3 5-2.9-.9-2.5 1.4-.6 3H9l-.6-3-2.5-1.4-2.9.9-3-5 2.2-2 .1-2.9L0 11.6l3-5 2.9.9L8.4 6z',arrow:'M4 12h16M14 6l6 6-6 6',download:'M12 3v12M7 10l5 5 5-5M4 16v5h16v-5',calendar:'M4 5h16v16H4zM8 3v4M16 3v4M4 10h16'};
 // Compact cog avoids the larger illustrative outline in the other icon paths.
 paths.settings='M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M9.5 3h5l.5 2.2 2 1.2 2.2-.7 2.5 4.3-1.7 1.5v2.4l1.7 1.5-2.5 4.3-2.2-.7-2 1.2-.5 2.2h-5L9 20.2 7 19l-2.2.7-2.5-4.3L4 13.9v-2.4L2.3 10l2.5-4.3 2.2.7 2-1.2z';
 function icon(name){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.6');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');svg.classList.add('line-icon');const p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',paths[name]||paths.book);svg.append(p);return svg}
 document.querySelectorAll('[data-icon]').forEach(node=>node.append(icon(node.dataset.icon)));
 const courseIcons={'Pharmacology':'pill','Pathophysiology':'lungs','Fundamentals':'book','Health Assessment':'stethoscope'};
 const terms=[{name:'First Term',subtitle:'Cohort 1 · Accelerated BSN',courses:['Fundamentals','Health Assessment','Pharmacology','Pathophysiology']}];
 const courseMap=new Map(STUDY_HUB.map(c=>[c.course,c]));
 const examNumber=exam=>Number(exam.name.match(/\bexam\s*(\d+)/i)?.[1])||0;
 const updated=exam=>Date.parse(exam.updatedAt)||0;
 const sortedExams=c=>[...c.exams].sort((a,b)=>updated(b)-updated(a)||examNumber(b)-examNumber(a));
 const courseUpdated=c=>Math.max(0,...(c?.exams||[]).map(updated));
 const newest=Math.max(...STUDY_HUB.map(courseUpdated));
 const courseUrl=name=>'#course/'+encodeURIComponent(name);
 function buildHome(){const host=$('term-list');host.replaceChildren();for(const term of [...terms].reverse()){
  const section=el('section','term');const label=el('div','term-heading');label.append(el('h2','',term.name),el('span','muted small',term.subtitle));section.append(label);
  const grid=el('div','course-grid');for(const name of [...term.courses].sort((a,b)=>courseUpdated(courseMap.get(b))-courseUpdated(courseMap.get(a)))){
   const c=courseMap.get(name);if(!c)continue;const latest=sortedExams(c)[0];const isLatest=newest>0&&courseUpdated(c)===newest;
   const card=el('article','course-tile'+(isLatest?' is-latest':''));const top=el('div','course-tile-top');top.append(icon(courseIcons[name]));if(isLatest)top.append(el('span','latest-label','Latest update'));card.append(top);
   const title=el('h3');const courseLink=el('a','course-title',name);courseLink.href=courseUrl(name);title.append(courseLink);card.append(title,el('p','course-description',c.description));
   if(latest){const info=el('div','course-exam');info.append(el('strong','',latest.name));const count=latest.versions[0]?.version.match(/(\d+)-question/i)?.[1];const meta=count?count+' questions in the bank':latest.versions.length>1?latest.versions.length+' practice formats':'Randomized practice';info.append(el('span','muted small',meta));card.append(info);
    const actions=el('div','course-actions');const start=el('a','action'+(isLatest?' primary':''),latest.versions.length===1?'Start practice':'Choose practice');start.href=latest.versions.length===1?latest.versions[0].file:courseUrl(name);start.append(icon('arrow'));const all=el('a','text-link','View exams');all.href=courseUrl(name);actions.append(start,all);card.append(actions)
   }else card.append(el('p','muted','Practice exams are coming soon.'));grid.append(card)
  }section.append(grid);host.append(section)
 }}
 function buildCourse(name){const c=courseMap.get(name),host=$('course-content');host.replaceChildren();if(!c){host.append(el('h1','','Course not found'),el('p','muted','Choose a course from the study hub.'));return}
  const head=el('div','course-head');head.append(icon(courseIcons[name]));const title=el('div');title.append(el('p','eyebrow','Course library'),el('h1','',name),el('p','muted',c.description));head.append(title);host.append(head);
  const exams=sortedExams(c);if(!exams.length){host.append(el('p','notice','Practice exams are coming soon.'));return}
  exams.forEach((exam,i)=>{const group=el('details','exam-group');group.open=i===0;const summary=el('summary');summary.append(el('span','',exam.name));if(i===0)summary.append(el('span','small muted','Most recent'));group.append(summary);const list=el('div','exam-list');for(const version of exam.versions){const card=el('article','exam-card');card.append(el('h3','',version.version),el('p','muted',version.description||'Practice exam'));const link=el('a','action primary','Start practice');link.href=version.file;link.append(icon('arrow'));card.append(link);list.append(card)}group.append(list);host.append(group)})
 }
 const views=[$('home-view'),$('course-view'),$('reference-view'),$('settings-view')];
 function route(){let hash='';try{hash=decodeURIComponent(location.hash.slice(1))}catch(_){}let target=$('home-view'),label='Courses',active='home';if(hash.startsWith('course/')){const name=hash.slice(7);buildCourse(name);target=$('course-view');label=name}else if(hash==='references'){target=$('reference-view');label='References';active='references'}else if(hash==='settings'){target=$('settings-view');label='Settings';active='settings'}
  views.forEach(v=>v.classList.toggle('hidden',v!==target));$('page-context').textContent=label;document.title=label+' · GSON Study Hub';document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});window.scrollTo({top:0,behavior:'instant'})
 }
 $('settings-shortcut').addEventListener('click',()=>{location.hash='settings'});$('notification-state').textContent='Browser permission is requested only when you select Enable notifications.';
 ThemeManager.setup();window.AnswerColors?.setup();buildHome();addEventListener('hashchange',route);route();
})();
