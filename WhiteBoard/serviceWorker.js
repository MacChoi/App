var CACHE_NAME = 'starcraft-phaser-v1';
var filesToCache = [
    'App/WhiteBoard/serviceWorker.js',
    'App/WhiteBoard/index.html',
    'App/WhiteBoard/libray/phaser.min.js',
    'App/WhiteBoard/MainScene.js',
    'App/WhiteBoard/assets/images/brush.png',
    'App/WhiteBoard/manifest.json',
    'App/WhiteBoard/PWA/pwa.js',
    'App/WhiteBoard/PWA/images/icon_192x192.png',
    'App/WhiteBoard/PWA/images/icons_512x512.png',
];

self.addEventListener('install', function(e) {
    // self.skipWaiting();
    console.log('app install');
    e.waitUntil(
        caches.open(filesToCache).then(cache => {
            return cache.addAll(filesToCache);
        })
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

// self.addEventListener('fetch', event => {
//     const url = new URL(event.request.url);

//     // // serve the cat SVG from the cache if the request is
//     // // same-origin and the path is '/dog.svg'
//     // if (url.origin == location.origin && url.pathname == '/dog.svg') {
//     //     event.respondWith(caches.match('/cat.svg'));
//     // }
// });