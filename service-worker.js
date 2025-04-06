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
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[Service Worker] Caching app shell...');
      for (let url of urlsToCache) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response.clone());
            console.log(`[Service Worker] Cached: ${url}`);
          } else {
            console.warn(`[Service Worker] Skipped (response not ok): ${url}`);
          }
        } catch (err) {
          console.error(`[Service Worker] Failed to cache: ${url}`, err);
        }
      }
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
            console.log(`[Service Worker] Removing old cache: ${key}`);
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
