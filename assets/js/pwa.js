"use strict";
(function(){
 const status=document.getElementById("pwa-status"),install=document.getElementById("pwa-install"),notify=document.getElementById("pwa-notifications");
 let deferredInstall=null;
 const say=message=>{if(status)status.textContent=message};
 if(!("serviceWorker" in navigator)||!window.isSecureContext){say("App installation and push require HTTPS and a supported browser.");return}
 navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(error=>say("App service worker unavailable: "+error.message));
 window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();deferredInstall=event;if(install)install.hidden=false});
 install?.addEventListener("click",async()=>{if(!deferredInstall){say("On iPhone: Safari → Share → Add to Home Screen.");return}deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;install.hidden=true});
 const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
 if(!standalone&&/iPad|iPhone|iPod/.test(navigator.userAgent))say("Install on iPhone: open in Safari, tap Share, then Add to Home Screen.");
 if(!("PushManager" in window)||!("Notification" in window)){if(notify)notify.disabled=true;return}
 const config=window.GSON_PUSH_CONFIG||{};
 notify?.addEventListener("click",async()=>{
  if(!config.vapidPublicKey||!config.subscriptionEndpoint){say("Push notifications are not configured yet. A secure subscription backend and public VAPID key are required.");return}
  if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!matchMedia("(display-mode: standalone)").matches&&!navigator.standalone){say("Install the app to your iPhone Home Screen before enabling notifications.");return}
  try{
   const permission=await Notification.requestPermission();
   if(permission!=="granted"){say("Notification permission was not granted.");return}
   const registration=await navigator.serviceWorker.ready;
   const base64=config.vapidPublicKey.replace(/-/g,"+").replace(/_/g,"/");const binary=atob(base64.padEnd(Math.ceil(base64.length/4)*4,"="));
   const key=Uint8Array.from(binary,c=>c.charCodeAt(0));
   const subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
   const endpoint=new URL(config.subscriptionEndpoint,location.href);
   if(endpoint.protocol!=="https:")throw Error("Subscription endpoint must use HTTPS.");
   const response=await fetch(endpoint.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(subscription)});
   if(!response.ok)throw Error("Subscription server returned "+response.status);
   say("Push notifications enabled on this device.");
  }catch(error){say("Could not enable notifications: "+error.message)}
 });
})();
