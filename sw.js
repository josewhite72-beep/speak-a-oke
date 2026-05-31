const CACHE = 'speak-a-oke-v2';
const STATIC = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;700&family=Lexend+Mega:wght@700&family=Nunito:wght@400;700&family=Oswald:wght@400;600&family=Merriweather:wght@400;700&family=Roboto+Mono:wght@400;700&family=Fredoka+One&family=Quicksand:wght@400;600&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // API calls — network only, never cache
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(fetch(e.request).catch(() =>
      new Response(JSON.stringify({ error: 'Offline — translation unavailable' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    ));
    return;
  }

  // Everything else — cache first, fallback to network
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return response;
      });
    }).catch(() => caches.match('/index.html'))
  );
});
