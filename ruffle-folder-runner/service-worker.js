const CACHE = "pwa-cache-v2";
const ASSETS = [
  './',
  '/index.html',
  '/jszip.min.js',
  '/ruffle/wasm-data.js',
  '/ruffle/ruffle.js',
  '/ruffle/6ce4f603a1fe7cc88438.wasm',
  '/ruffle/a71cef02d58dcec6f55f.wasm',
  '/ruffle/core.ruffle.15317142e75ce021ac04.js',
  '/ruffle/core.ruffle.5e30dc5777a75720eae2.js',
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
