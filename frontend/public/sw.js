const CACHE = 'nutrivision-v1'
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/index.html'])))
  self.skipWaiting()
})
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()))
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.status === 200) { const c = caches.open(CACHE); c.then(cache => cache.put(e.request, res.clone())) }
      return res
    }))
  )
})
