/* Increment the cache version whenever any app-shell asset changes. */
'use strict';
const CACHE = 'focus-recall-shell-3.0.0';
const ASSETS = ['./','./index.html','./styles.css','./mnemonic-core.js','./core.js','./decks.js','./app.js','./manifest.webmanifest','./HELP.html','./icons/favicon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'ACTIVATE_UPDATE') self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('focus-recall-shell-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const saved = await cache.match(req, {ignoreSearch:true});
    if (saved) return saved;
    try { return await fetch(req); }
    catch (error) {
      if (req.mode === 'navigate') return await cache.match('./index.html');
      return Response.error();
    }
  }));
});
