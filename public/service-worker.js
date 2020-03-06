/*workbox.precaching.precacheAndRoute([{
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
  );*/
//teste

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

self.addEventListener("install", function(event) {
  console.log("[Service Worker] Installing Service Worker...");
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function(cache) {
      console.log("[Service Worker] Precaching the App Shell");
      cache.addAll([
        /*'/',
          './index.html',
          '/restaurant',
          '/table',
          '/settings',
          '/reports',
          './js/app.4ab7481f.js',
          './js/app.4ab7481f.js.map',
          './js/chunk-vendors.58a430e1.js',
          './js/chunk-vendors.58a430e1.js.map',
          './css/app.d307c6db.css',
          './css/chunk-vendors.c580d68a.css',
          'https://fonts.googleapis.com/css?family=Roboto&display=swap',
          'https://kit.fontawesome.com/37a6fc82c8.js'*/
      ]);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(function(res) {
            return caches.open(DYNAMIC_CACHE).then(function(cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        }
      })
      .catch(err => {})
  );
});

self.addEventListener("sync", function(event) {
  console.log("[Service Worker] Background Syncing ", event);
  if (event.tag === "sync-new-invoice") {
    console.log("[Service Worker] Syncing new invoices");
    let data;
    const request = indexedDB.open("invoices", 1);

    request.onupgradeneeded = function() {
      request.result.createObjectStore("invoices", { autoIncrement: true });
    };

    request.onsuccess = function(event) {
      db = request.result;
      const transaction = db.transaction("sync-invoices", "readonly");
      const objectStore = transaction.objectStore("sync-invoices");
      objectStore.getAll().onsuccess = function(event) {
        data = event.target.result;
        for (let dt of data) {
          fetch("http://localhost:8080/api/bills", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              headers: dt.headers,
              emission: dt.emission
            })
          }).then(res => {
            if (res.ok) {
              const transactionDelete = db.transaction(
                "sync-invoices",
                "readwrite"
              );
              const objectStoreDelete = transactionDelete.objectStore(
                "sync-invoices"
              );

              objectStoreDelete.openCursor().onsuccess = event => {
                let cursor = event.target.result;
                if (cursor) {
                  deleteRequest = cursor.delete();
                  deleteRequest.onsuccess = () => {
                    console.log("Deleted!!");
                  };
                }
              };
            }
          });
        }
      };
    };
  }
});
