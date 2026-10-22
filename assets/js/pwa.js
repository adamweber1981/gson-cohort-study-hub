"use strict";
(function(){
 const status=document.getElementById("pwa-status"),install=document.getElementById("pwa-install"),notify=document.getElementById("pwa-notifications");
 let deferredInstall=null;
 const say=message=>{if(status)status.textContent=message};
 const waitForWorker=()=>Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(Error("Service worker did not become ready within 12 seconds. Reload the page and retry.")),12000))]);
 if(!("serviceWorker" in navigator)||!window.isSecureContext){say("App installation and push require HTTPS and a supported browser.");return}
 navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(error=>say("App service worker unavailable: "+error.message));
 window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredInstall=event;if(install)install.hidden=false});
 install?.addEventListener("click",async()=>{if(!deferredInstall){say("On iPhone: Safari → Share → Add to Home Screen.");return}deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;install.hidden=true});
 const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
 if(!standalone&&/iPad|iPhone|iPod/.test(navigator.userAgent))say("Install on iPhone: open in Safari, tap Share, then Add to Home Screen.");
 if(!("PushManager" in window)||!("Notification" in window)){if(notify)notify.disabled=true;return}
 const config=window.GSON_PUSH_CONFIG||{};
 say("Notification controls ready. Click Enable notifications to begin.");
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
   const response=await fetch(endpoint.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subscription,preferences:window.GSON_NOTIFICATION_PREFERENCES||{}})});
   if(!response.ok)throw Error("Subscription server returned "+response.status);
   say("Push notifications enabled on this device.");
  }catch(error){say("Could not enable notifications: "+error.message)}finally{if(notify)notify.disabled=false}
 });
 const unsubscribe=document.getElementById("pwa-unsubscribe");
 unsubscribe?.addEventListener("click",async()=>{
  say("Disabling notifications…");if(unsubscribe)unsubscribe.disabled=true;
  try{
   const registration=await navigator.serviceWorker.ready;
   const subscription=await registration.pushManager.getSubscription();
   if(!subscription){say("No active push subscription on this device.");return}
   if(!config.unsubscribeEndpoint){say("Unsubscribe backend is not configured yet.");return}
   const endpoint=new URL(config.unsubscribeEndpoint,location.href);
   if(endpoint.protocol!=="https:")throw Error("Unsubscribe requires HTTPS");
   const response=await fetch(endpoint.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subscription})});
   if(!response.ok)throw Error("Server returned "+response.status);
   await subscription.unsubscribe();say("Notifications disabled for this device.");
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
