"use strict";
(function(){
 const KEY="gson-notification-preferences-v1";
 const defaults={updatedExams:true,newSources:true,examReminders:true,majorUpdates:true};
 let preferences={...defaults};
 try{preferences={...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch(_){}
 window.GSON_NOTIFICATION_PREFERENCES=preferences;
 const root=document.getElementById("notification-preferences");
 if(!root)return;
 const inputs=[];
 const labels={updatedExams:"Updated practice exams",newSources:"New course sources",examReminders:"Exam reminders (7 days, 3 days, 1 day)",majorUpdates:"Major Study Hub updates"};
 for(const [key,label] of Object.entries(labels)){
  const row=document.createElement("label");row.style.cssText="display:flex;gap:10px;align-items:center;margin:8px 0";
  const checkbox=document.createElement("input");checkbox.type="checkbox";checkbox.checked=preferences[key];checkbox.dataset.category=key;inputs.push(checkbox);
  checkbox.addEventListener("change",()=>{preferences[key]=checkbox.checked;try{localStorage.setItem(KEY,JSON.stringify(preferences))}catch(_){};document.dispatchEvent(new CustomEvent("gson:notification-preferences-changed",{detail:{...preferences}}))});
  row.append(checkbox,document.createTextNode(label));root.append(row);
 }
 const note=document.createElement("p");note.className="muted small";root.append(note);
 const update=active=>{for(const checkbox of inputs){checkbox.disabled=!active;checkbox.checked=active&&preferences[checkbox.dataset.category]!==false}note.textContent=active?"Notifications ON. These category preferences sync with the server.":"Notifications OFF on this device. Enable notifications to select categories.";root.setAttribute("aria-disabled",String(!active))};
 document.addEventListener("gson:push-subscription-state",event=>update(event.detail.active));
 document.addEventListener("gson:push-all-categories-enabled",()=>{for(const key of Object.keys(defaults))preferences[key]=true;try{localStorage.setItem(KEY,JSON.stringify(preferences))}catch(_){};update(true)});
 update(false);
})();
