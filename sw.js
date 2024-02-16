const cacheName = 'mario0c';

self.addEventListener('mario0c', function(e) {
 e.waitUntil(
   caches.open('mario0c').then(function(cache) {
     return cache.addAll([
      '/',
      '/game.data',
      '/index.html',
      '/game.js',
      '/love.js',
      '/love.js.mem'
     ]);
   })
 );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open('mario0c'); // cacheName
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});


//<script>
//if('serviceWorker' in navigator) {
  //navigator.serviceWorker
           //.register('/sw.js')
           //.then(function() { console.log("Service Worker Registered"); });
//}
//</script>
