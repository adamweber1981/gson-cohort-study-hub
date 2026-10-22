"use strict";
window.AnswerColors=(()=>{
 const key="gson-study-hub-answer-colors-v1";
 const presets={
  default:null,
  ocean:["#155e75","#0e7490","#0891b2","#164e63"],
  pastel:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4"],
  vibrant:["#d7191c","#fdae61","#abdda4","#2b83ba"],
  forest:["#145a46","#237a57","#418c73","#5d9e86"],
  sunset:["#7b3f87","#e88e77","#f4bb79","#a75c70"]
 };
 const initial=["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4"];
 function load(){try{const x=JSON.parse(localStorage.getItem(key));return {palette:(x?.palette==="custom"||Object.prototype.hasOwnProperty.call(presets,x?.palette))?x.palette:"default",custom:Array.isArray(x?.custom)&&x.custom.length===4?x.custom.map((c,i)=>/^#[0-9a-f]{6}$/i.test(c)?c:initial[i]):[...initial]}}catch(_){return {palette:"default",custom:[...initial]}}}
 function save(state){try{localStorage.setItem(key,JSON.stringify(state))}catch(_){}}
 function contrast(hex){const n=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*n[0]+.7152*n[1]+.0722*n[2]>.179?"#1b2230":"#ffffff"}
 function apply(){const state=load();const colors=state.palette==="custom"?state.custom:presets[state.palette];document.documentElement.dataset.answerPalette=state.palette;if(colors){colors.forEach((c,i)=>{document.documentElement.style.setProperty("--answer-bg-"+i,c);document.documentElement.style.setProperty("--answer-fg-"+i,contrast(c))})}else{for(let i=0;i<4;i++){document.documentElement.style.removeProperty("--answer-bg-"+i);document.documentElement.style.removeProperty("--answer-fg-"+i)}}return state}
 function setup(){const picker=document.getElementById("answer-palette-select"),custom=document.getElementById("answer-custom-controls"),preview=document.getElementById("answer-color-preview"),reset=document.getElementById("answer-color-reset");if(!picker)return;
 function render(){const state=apply();picker.value=state.palette;custom.hidden=state.palette!=="custom";custom.querySelectorAll('input[type="color"]').forEach((input,i)=>{input.value=state.custom[i]});preview.replaceChildren();const colors=state.palette==="custom"?state.custom:presets[state.palette];for(let i=0;i<4;i++){const row=document.createElement("div");row.className="answer-option preview-answer";row.style.setProperty("--preview-bg",colors?colors[i]:"var(--surface2)");row.style.setProperty("--preview-fg",colors?contrast(colors[i]):"var(--ink)");const dot=document.createElement("span");dot.className="preview-radio";dot.setAttribute("aria-hidden","true");const text=document.createElement("span");text.textContent="Answer choice "+String.fromCharCode(65+i);row.append(dot,text);preview.append(row)}}
 picker.addEventListener("change",()=>{const state=load();state.palette=picker.value;save(state);render()});
 custom.querySelectorAll('input[type="color"]').forEach((input,i)=>input.addEventListener("input",()=>{const state=load();state.palette="custom";state.custom[i]=input.value;save(state);apply();const row=preview.children[i];if(row){row.style.setProperty("--preview-bg",input.value);row.style.setProperty("--preview-fg",contrast(input.value))}}));
 reset.addEventListener("click",()=>{save({palette:"default",custom:[...initial]});render()});render()
 }
 return {apply,setup};
})();
