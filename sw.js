if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),l={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/icon-512x512-DwxXPc4y.png",revision:null},{url:"assets/index-C3ZZNMFJ.js",revision:null},{url:"assets/index-CSWQ6lWT.css",revision:null},{url:"index.html",revision:"069a4ee9ba7512a61d650cadc21c1e8c"},{url:"registerSW.js",revision:"487f99cfd96b7818cf284260cdfed062"},{url:"manifest.webmanifest",revision:"f8bce4b53d6c4d3dda6284ecdc532514"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
