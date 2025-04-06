const CACHE_NAME = "v1";
const urlsToCache = [
  '/ecommerce-pwa/',
  '/ecommerce-pwa/index.html',
  '/ecommerce-pwa/logo192.png',
  '/ecommerce-pwa/logo512.png',
  '/ecommerce-pwa/manifest.json',
  '/ecommerce-pwa/favicon.ico'
  // Note: Avoid including '/static/js/bundle.js' unless you're sure it exists in your build
];

// Install event
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  self.skipWaiting(); // optional: activate SW immediately

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching app shell...');
      return cache.addAll(urlsToCache).catch(err => {
        console.error('[Service Worker] Cache addAll error:', err);
      });
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activated!');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(error => {
        console.error('[Service Worker] Fetch failed:', error);
      });
    })
  );
});
