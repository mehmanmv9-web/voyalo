const V='voyalo-v18';const CORE=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'){const net=fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(cc=>cc.put('index.html',c))}return x});e.waitUntil(net.catch(()=>{}));e.respondWith(caches.match('index.html').then(m=>m||net).catch(()=>net));return}
 if(/unpkg\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com|wikimedia\.org/.test(u.host)||u.origin===location.origin){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const c=x.clone();caches.open(V).then(cc=>cc.put(r,c))}return x}).catch(()=>m)))}});
