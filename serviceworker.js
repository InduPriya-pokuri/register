this.addEventListener('install', event=>{
  console.log('installing serviceWorker......');
  event.waitUntil(
    caches.open('v1').then(cache=>{
      cache.addAll([
        '/'
      ])
    })
  )
})


this.addEventListener('fetch', event=>{
  event.respondWith(
    caches.open('v1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});


/*var cacheName='v2';
var cacheFiles=[
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/data/restaurant.json',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/manifest.json',
  '/package.json',
  '/restaurant.html',
  '/serviceWorker.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/img/icon.png'

]



//This is the "Offline copy of pages" wervice worker

//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function(event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        console.log('[serviceWorker] Cached index page during Install'+ response.url);
        return cache.put(indexPage, response);
      });
  }));
});

//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[serviceWorker] add page to offline'+response.url)
        return cache.put(request, response);
      });
    });
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log( '[serviceWorker] Network request Failed. Serving content from cache: ' + error );

      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})

/*self.addEventListener('install',function(e){
  console.log("[serviceworker] Installed")
})

self.addEventListener('activate',function(e){
  console.log("[serviceworker] Activated")
})

self.addEventListener('fetch',function(e){
  console.log("[serviceworker] Fetching",e.request.url);
})*/
