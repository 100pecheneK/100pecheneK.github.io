// Init cache name/version
const CACHE_NAME = 'my-site-cache-v1';

// which pages/assets do you want to cache?
const urlsToCache = [
    // 'img/',
    'index.html',
    'font/css/all.css',
    'font/webfonts/all.css',
    'css/style.css',
    // 'css/bootstrap.min.css',
    // 'css/mdb.min.css',
    'register-worker.js',
];
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});