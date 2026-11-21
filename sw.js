const V='voyalo-v8';const CORE=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(cc=>cc.put('index.html',c));return x}).catch(()=>caches.match('index.html')));return}
 if(/unpkg\.com|fonts\.(googleapis|gstatic)\.com|tile\.openstreetmap\.org|wikimedia\.org/.test(u.host)||u.origin===location.origin){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const c=x.clone();caches.open(V).then(cc=>cc.put(r,c))}return x}).catch(()=>m)))}});
