const CACHE = 'recipex-v2'
const STATIC_CACHE = 'recipex-static-v2'

self.addEventListener('install', (e) => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE && k !== STATIC_CACHE).map(k => caches.delete(k))
    ))
  )
  clients.claim()
})

self.addEventListener('fetch', (e) => {
  const { method, destination } = e.request
  if (method !== 'GET') return

  if (destination === 'document' || e.request.mode === 'navigate') {
    // NetworkFirst for pages — always fresh, cache fallback
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.status === 200) {
          const c = caches.open(CACHE)
          c.then(cache => cache.put(e.request, res.clone()))
        }
        return res
      }).catch(() => caches.match(e.request))
    )
  } else {
    // CacheFirst for assets (JS, CSS, images)
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        if (res.status === 200) {
          const c = caches.open(STATIC_CACHE)
          c.then(cache => cache.put(e.request, res.clone()))
        }
        return res
      }))
    )
  }
})
