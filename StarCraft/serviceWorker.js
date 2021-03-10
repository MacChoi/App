var cacheName = 'starcraft-phaser-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/assets/images/title/1.png',
];

self.addEventListener('install', function(event) {
    // self.skipWaiting();
    console.log('app install');
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('app removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('app removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('activate', event => {
    console.log('now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // // serve the cat SVG from the cache if the request is
    // // same-origin and the path is '/dog.svg'
    // if (url.origin == location.origin && url.pathname == '/dog.svg') {
    //     event.respondWith(caches.match('/cat.svg'));
    // }
});