const cacheName = "reader";

const staticAssets = [
'./'
'/index.css',
'/index.html',
'/index.js',
'/book-index.mako',
'/book.css',
'/choose.html',
'/css.mako',
'/favorite.css',
'/favorite.html',
'/find.css',
'/find.html',
'/settings.css',
'/settings.html',
'/site.css',
"/.DS_Store"
];

self.addEventListener('install',async e =>{
	const cache = await caches.open(cacheName);
	await cache.addAll(staticAssets);
	return self.skipWaiting();
});

self.addEventListener('activate', e=>{
	self.clients.claim();
});

self.addEventListener('fetch', async e =>{
	const req= e.request;
	const url = new URL(req.url);

	if (url.origin = location.origin){
		e.respondWith(cacheFirst(req));
	} else {
		e.respondWith(networkAndCache(req));
	}
});

async function cacheFirst(req){
	const cache = await caches.open(cacheName);
	const cached = await cache.match(req);
	return cached || fetch(req);
}

async function networkAndCache(req){
	const cache = await caches.open(cacheName);
	try {
		const fresh = await fetch(req);
		await cache.put(req,fresh.clone());
		return fresh;
	}catch (e){
		const cached = await cache.match(req);
		return cached;
	}
}
self.onsync = function(event) {
    if(event.tag == 'findbook-sync') {
        event.waitUntil(fetchbook());
    }
};

//i dont know we need a book database for me to fetch
function fetchbook(){
    fetch("/.DS_Store")
    .then(function (response) {
        return response;
      })
      .then(function (text) {
        console.log('Request successful', text);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }
