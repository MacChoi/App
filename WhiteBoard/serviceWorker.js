var CACHE_NAME = 'whiteboard-phaser-v1';
var filesToCache = [
    '/libray/phaser.min.js',
    '/index.html',
    '/MainScene.js',
    '/assets/images/brush.png',
    '/manifest.json',
    '/pwa.js',
    '/serviceWorker.js',
    '/images/icons/icon_192x192.png',
    '/images/icons/icons_512x512.png',
];

self.addEventListener('install', function(e) {
    // self.skipWaiting();
    console.log('app install');
    e.waitUntil(
        // caches.open(CACHE_NAME).then((cache) => {
        //     console.log("Service Worker: Caching Files",cache);
        //     return cache.addAll(filesToCache);
        // })
        // .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
    caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            if (key !== CACHE_NAME) {
                console.log('app removing old cache', key);
                return caches.delete(key);
            }
        }));
    })
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then(function(response) {
                        return caches.open(CACHE_NAME).then(function(cache) {
                console.log('[Service Worker] Caching new resource: '+e.request.url);
                cache.put(e.request, response.clone());
                return response;
                });
            });
        })
    );
});