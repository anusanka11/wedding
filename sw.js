const CACHE="aa-wedding-v1";
const ASSETS=["./","./index.html","./styles.css","./script.js","./manifest.json","./assets/wedding-card.png","./assets/bride-illustration.webp","./assets/Pre shoot1.jpg","./assets/Pre shoot2.jpg","./assets/Pre shoot3.jpg","./assets/Pre shoot4.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
