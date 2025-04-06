const CACHE_NAME = "v1";
const urlsToCache = [
  '/ecommerce-pwa/',
  '/ecommerce-pwa/index.html',
  '/ecommerce-pwa/logo192.png',
  '/ecommerce-pwa/logo512.png',
  '/ecommerce-pwa/manifest.json',
  '/ecommerce-pwa/favicon.ico',
  '/ecommerce-pwa/static/js/bundle.js'
];


self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching app shell...');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activated!');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
