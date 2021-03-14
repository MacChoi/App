var CACHE_NAME = 'starcraft-phaser-v1';
var filesToCache = [
  './index.html',
  './libray/phaser.min.js',
  './MainScene.js',
  './assets/images/brush.png',
  './manifest.json',
  './PWA/pwa.js',
  './PWA/sw.js',
  './PWA/images/icon_192x192.png',
  './PWA/images/icons_512x512.png',
];

self.addEventListener('install', function(event) {
    // self.skipWaiting();
    console.log('app install');
    event.waitUntil(
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

// 요청에 실패하면 오프라인 페이지 표시
self.addEventListener("fetch", (event) => {
    if ("navigate" !== event.request.mode) return;

    event.respondWith(
        fetch(event.request).catch(() =>
            caches
                .open(CACHE_NAME)
                .then((cache) => cache.match("/offline.html"))
        )
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