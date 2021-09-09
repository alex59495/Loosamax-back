const CACHE_NAME = 'sw-cache-example';
const toCache = [
  '/index.html',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache)
      })
      .then(self.skipWaiting())
  )
})

self.addEventListener('fetch', function(event) {
  console.log(navigator)
  if (!navigator.onLine) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              console.log(cache)
              return cache.match(event.request)
            })
        })
    )
  }
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener("push", (e) => {
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(
      data.title, // title of the notification
      {
          body: data.text,
          icon: "./images/logo192.png", 
          badge: "./images/logo192.png"
      }
    )
  )
});

self.addEventListener('notificationclick', event => {
  if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(self.clients.matchAll().then(clients => {
      if (clients.length){ // check if at least one tab is already open
        clients[0].focus();
      } else {
        self.clients.openWindow('/');
      }
    }));
  }
});