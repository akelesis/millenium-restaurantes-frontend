workbox.precaching.precacheAndRoute([{
    "revision": "17ecfaee522eaf5b3ad9c9aa1b2973cc",
    "url": "/manifest.json"
}]);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /\.(?:html|css|js)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'files',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
   
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response){
                    console.log('[Service Worker] fetching from cache')
                    return response
                }
                else {
                    console.log('[Service Worker] fetching from web')
                    return fetch(event.request)
                }
            })
    )
})