"use strict";
/* Phase 1: navigation only. Existing standalone exam files are intentionally unchanged. */
const themeKey="gson-study-hub-theme";
const validThemes=["system","light","dark","purple","slate"];
const themeSelect=document.getElementById("theme-select");
function applyTheme(value){const mode=validThemes.includes(value)?value:"purple";const resolved=mode==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):mode;document.documentElement.dataset.theme=resolved;themeSelect.value=mode;}
let savedTheme="purple";try{savedTheme=localStorage.getItem(themeKey)||"purple"}catch(_){}
applyTheme(savedTheme);
themeSelect.addEventListener("change",()=>{try{localStorage.setItem(themeKey,themeSelect.value)}catch(_){}applyTheme(themeSelect.value)});
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",()=>{if(themeSelect.value==="system")applyTheme("system")});
const hub=document.getElementById("home-view"),courseView=document.getElementById("course-view"),referenceView=document.getElementById("reference-view"),settingsView=document.getElementById("settings-view");
const views=[hub,courseView,referenceView,settingsView];
const termConfig=[{id:"term-1",name:"First Term",subtitle:"Accelerated BSN · Term 1",courses:["Fundamentals","Health Assessment","Pharmacology","Pathophysiology"]}];
const courseMap=new Map(STUDY_HUB.map(course=>[course.course,course]));
const iconMap={"Fundamentals":"🩺","Health Assessment":"🫀","Pharmacology":"💊","Pathophysiology":"🧬"};
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node};
function courseUrl(name){return "#course/"+encodeURIComponent(name)}
function buildHome(){const host=document.getElementById("term-list");host.replaceChildren();for(const term of [...termConfig].reverse()){const section=el("section","term");const toggle=el("button","term-toggle");toggle.type="button";toggle.setAttribute("aria-expanded","true");const title=el("span","",term.name);title.append(el("small","",term.subtitle));const arrow=el("span","","⌄");toggle.append(title,arrow);const body=el("div","term-body");const grid=el("div","course-grid");for(const name of term.courses){const c=courseMap.get(name);const tile=el("a","course-tile");tile.href=courseUrl(name);tile.append(el("span","course-icon",iconMap[name]||"📘"),el("strong","",name),el("span","",c?.description||"Course materials and practice exams"));grid.append(tile)}body.append(grid);toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")!=="true";toggle.setAttribute("aria-expanded",String(open));body.hidden=!open;arrow.textContent=open?"⌄":"›"});section.append(toggle,body);host.append(section)}}
function buildCourse(name){const c=courseMap.get(name);const host=document.getElementById("course-content");host.replaceChildren();if(!c){host.append(el("p","notice","This course is not available."));return}const head=el("div","course-head");head.append(el("span","course-icon",iconMap[name]||"📘"),el("div"));head.lastChild.append(el("h1","",name),el("p","muted",c.description));host.append(head);if(!c.exams.length){host.append(el("p","notice","Practice exams are coming soon."));return}for(const exam of c.exams){const group=el("details","exam-group");group.open=true;group.append(el("summary","",exam.name));const list=el("div","exam-list");for(const version of exam.versions){const card=el("article","exam-card");card.append(el("h3","",version.version),el("p","muted small",version.description||"Practice exam"));const link=el("a","action primary","Open practice exam ↗");link.href=version.file;card.append(link);list.append(card)}group.append(list);host.append(group)}}
function showView(target){views.forEach(v=>v.classList.toggle("hidden",v!==target));window.scrollTo({top:0,behavior:"instant"})}
function route(){const hash=decodeURIComponent(location.hash.slice(1));if(hash.startsWith("course/")){buildCourse(hash.slice(7));showView(courseView)}else if(hash==="references"){showView(referenceView)}else if(hash==="settings"){showView(settingsView)}else{showView(hub)}}
document.getElementById("settings-shortcut").addEventListener("click",()=>{location.hash="settings"});
document.getElementById("notification-state").textContent="Not available yet. New-exam notifications require a separate opt-in push service; no permission will be requested in Phase 1.";
buildHome();addEventListener("hashchange",route);route();
