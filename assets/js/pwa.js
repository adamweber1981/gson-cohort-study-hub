"use strict";
(function(){
 const status=document.getElementById("pwa-status"),install=document.getElementById("pwa-install"),notify=document.getElementById("pwa-notifications");
 const dialog=document.getElementById("install-dialog"),help=document.getElementById("install-help"),steps=document.getElementById("install-steps");
 const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
 const ios=/iPad|iPhone|iPod/.test(navigator.userAgent);
 function openInstall(){if(!dialog||!steps)return;steps.textContent=standalone?"The Study Hub is already installed on this device.":ios?"On iPhone or iPad: open this site in Safari, tap Share, then Add to Home Screen. Open the new icon from your Home Screen.":"On a computer or Android: use Install app now if available, or open your browser menu and select Install app / Add to Home Screen.";if(install)install.hidden=standalone||!deferredInstall;dialog.showModal()}
 help?.addEventListener("click",openInstall);
 document.getElementById("settings-install-help")?.addEventListener("click",openInstall);
 document.getElementById("install-dialog-close")?.addEventListener("click",()=>dialog.close());
 document.getElementById("install-dialog-done")?.addEventListener("click",()=>dialog.close());
 dialog?.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
 if(!standalone){try{if(!localStorage.getItem("gson-install-invite-v1")){localStorage.setItem("gson-install-invite-v1","shown");window.addEventListener("load",()=>{if(!location.hash||location.hash==="#home")openInstall()},{once:true})}}catch(_){}}
 let deferredInstall=null;
 const say=message=>{if(status)status.textContent=message};
 const waitForWorker=()=>Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(Error("Service worker did not become ready within 12 seconds. Reload the page and retry.")),12000))]);
 if(!("serviceWorker" in navigator)||!window.isSecureContext){say("App installation and push require HTTPS and a supported browser.");return}
 navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(error=>say("App service worker unavailable: "+error.message));
 window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredInstall=event;if(install)install.hidden=standalone});
 install?.addEventListener("click",async()=>{if(!deferredInstall){say("On iPhone: Safari → Share → Add to Home Screen.");return}deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;install.hidden=true;dialog?.close()});

 if(!("PushManager" in window)||!("Notification" in window)){if(notify)notify.disabled=true;return}
 const config=window.GSON_PUSH_CONFIG||{};
 const updateSubscriptionUI=active=>{if(notify){notify.hidden=active;notify.disabled=false}if(unsubscribe){unsubscribe.hidden=!active;unsubscribe.disabled=false}document.dispatchEvent(new CustomEvent("gson:push-subscription-state",{detail:{active}}))};
 const unsubscribe=document.getElementById("pwa-unsubscribe");
 updateSubscriptionUI(false);
 navigator.serviceWorker.ready.then(reg=>reg.pushManager.getSubscription()).then(sub=>{updateSubscriptionUI(!!sub);say(sub?"Notifications are enabled on this device.":"Notifications are off on this device.");}).catch(error=>say("Unable to check notification status: "+error.message));
 say("Notifications are optional. Choose Enable notifications to opt in.");
 notify?.addEventListener("click",async()=>{
  say("Enabling notifications…");if(notify)notify.disabled=true;
  if(!config.vapidPublicKey||!config.subscriptionEndpoint){say("Push notifications are not configured yet. A secure subscription backend and public VAPID key are required.");if(notify)notify.disabled=false;return}
  if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!matchMedia("(display-mode: standalone)").matches&&!navigator.standalone){say("Install the app to your iPhone Home Screen before enabling notifications.");if(notify)notify.disabled=false;return}
  try{
   say("Requesting browser notification permission…");
   const permission=await Promise.race([Notification.requestPermission(),new Promise((_,reject)=>setTimeout(()=>reject(Error("Edge did not respond to the notification permission request within 15 seconds. Check the notification permission icon beside the address bar, or open Edge Settings → Cookies and site permissions → Notifications.")),15000))]);
   if(permission!=="granted"){say("Notification permission was not granted.");return}
   say("Waiting for the app service worker…");
   const registration=await waitForWorker();
   const base64=config.vapidPublicKey.replace(/-/g,"+").replace(/_/g,"/");const binary=atob(base64.padEnd(Math.ceil(base64.length/4)*4,"="));
   const key=Uint8Array.from(binary,c=>c.charCodeAt(0));
   say("Creating browser push subscription…");
   const subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
   const endpoint=new URL(config.subscriptionEndpoint,location.href);
   if(endpoint.protocol!=="https:")throw Error("Subscription endpoint must use HTTPS.");
   say("Saving subscription to notification server…");
   const response=await fetch(endpoint.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subscription,preferences:{updatedExams:true,newSources:true,examReminders:true,majorUpdates:true}})});
   if(!response.ok)throw Error("Subscription server returned "+response.status);
   document.dispatchEvent(new Event("gson:push-all-categories-enabled"));updateSubscriptionUI(true);say("Push notifications enabled on this device. All four categories selected.");
  }catch(error){say("Could not enable notifications: "+error.message)}finally{if(notify)notify.disabled=false}
 });
 unsubscribe?.addEventListener("click",async()=>{
  say("Disabling notifications…");if(unsubscribe)unsubscribe.disabled=true;
  try{
   const registration=await navigator.serviceWorker.ready;
   const subscription=await registration.pushManager.getSubscription();
   if(!subscription){updateSubscriptionUI(false);say("No active push subscription on this device.");return}
   if(!config.unsubscribeEndpoint){say("Unsubscribe backend is not configured yet.");return}
   const endpoint=new URL(config.unsubscribeEndpoint,location.href);
   if(endpoint.protocol!=="https:")throw Error("Unsubscribe requires HTTPS");
   const response=await fetch(endpoint.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subscription})});
   if(!response.ok)throw Error("Server returned "+response.status);
   const removed=await subscription.unsubscribe();if(!removed)throw Error("Browser did not confirm unsubscription.");updateSubscriptionUI(false);say("Notifications disabled for this device. Your category choices are saved for next time.");
  }catch(error){say("Unable to disable notifications: "+error.message)}finally{if(unsubscribe)unsubscribe.disabled=false}
 });
 document.addEventListener("gson:notification-preferences-changed",async event=>{
  if(!config.preferencesEndpoint)return;
  try{
   const registration=await navigator.serviceWorker.ready;
   const subscription=await registration.pushManager.getSubscription();
   if(!subscription)return;
   const endpoint=new URL(config.preferencesEndpoint,location.href);
   if(endpoint.protocol!=="https:")return;
   await fetch(endpoint.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subscription,preferences:event.detail})});
  }catch(error){say("Could not sync notification preferences: "+error.message)}
 });
})();
