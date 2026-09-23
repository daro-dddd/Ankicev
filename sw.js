const CACHE_NAME = 'ceneval-anki-v24';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './favicon.ico?v=24',
  './assets/logo.png?v=24',
  './js/ai-vision-engine.js?v=24',
  './js/topics-data.js?v=24',
  './js/anki-engine.js?v=24',
  './js/photo-uploader.js?v=24',
  './js/quiz-engine.js?v=24',
  './js/audio-notes-engine.js?v=24',
  './js/app.js?v=24'
];

self.addEventListener('install', (event) => {
  console.log('[PWA SW] Installing cache version v20');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[PWA SW] Activating SW v10');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[PWA SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network First strategy to guarantee instant updates on GitHub Pages
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

