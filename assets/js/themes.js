/* Shared appearance preferences. Five palettes; no network or score storage. */
(function(){
 'use strict';
 const key='gson-study-hub-theme';
 const themes={teal:{name:'Slate + Teal',mode:'light',color:'#f2f6f7'},ivory:{name:'Ivory + Burgundy',mode:'light',color:'#f7f4ef'},charcoal:{name:'Charcoal + Amber',mode:'dark',color:'#181b1f'},midnight:{name:'Midnight + Blue',mode:'dark',color:'#0d1728'},aubergine:{name:'Aubergine + Lavender',mode:'dark',color:'#21192b'}};
 const legacy={light:'teal',dark:'charcoal',purple:'aubergine',slate:'midnight'};
 function normalize(value){if(themes[value])return value;if(legacy[value])return legacy[value];if(value==='system')return matchMedia('(prefers-color-scheme: dark)').matches?'charcoal':'teal';return 'teal'}
 function read(){try{return normalize(localStorage.getItem(key))}catch(_){return 'teal'}}
 function apply(value){const id=normalize(value),theme=themes[id];document.documentElement.dataset.theme=id;document.documentElement.dataset.colorMode=theme.mode;document.documentElement.style.colorScheme=theme.mode;const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme.color;document.querySelectorAll('[data-theme-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===id)));const status=document.getElementById('theme-status');if(status)status.textContent=theme.name+' · '+(theme.mode==='dark'?'Dark':'Light')+' mode';return id}
 function choose(value){const id=apply(value);try{localStorage.setItem(key,id)}catch(_){}return id}
 function setup(){document.querySelectorAll('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>choose(button.dataset.themeChoice)));apply(read())}
 window.ThemeManager={themes,normalize,read,apply,choose,setup};
 apply(read());window.addEventListener('storage',event=>{if(event.key===key||event.key===null)apply(read())});
})();
