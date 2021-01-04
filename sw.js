const VERSION = 'v1';
//this especifico para service worker
self.addEventListener('install', event => {//install se ejecuta cuando el nav llama al service worker
    event.waitUntil(precache());//precache es la info inicial (recursos) que guardara el cache
});

//cada que el service worker corre quiero haer algo
self.addEventListener('fetch', event => {
    const request = event.request;
    //solo queremos trabajar  con metodo get
    if (request.method !== "GET") {
        return; // no devuelve nada
    }
    //ya tenemos la peticion get, de aquia abajo sale el cod
    //buscar cache
    event.respondWith(cachedResponse(request));// metodo para que pasa funcion comor esp al cache
    //actualizar cache
    event.waitUntil(updateCache(request))
});

 async function precache() {
     const cache = await caches.open(VERSION);
     return cache.addAll([
         //EL PARCEL CREA LA CARPETA DIST ENTONCES LAS SIGUIENTES RUTAS ESTAN DEMAS
        //  '/',
        //  '/index.html',
        //  '/assets/index.js'  ,
        //  '/assets/MediaPlayer.js',
        //  '/assets/plugins/AutoPlay.js',
        //  '/assets/plugins/AutoPause.js',
        //  '/assets/index.css',
        //  '/assets/dua_lipa.mp4',
     ]);
 }

 async function cachedResponse(request) {
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);//miro si en cache hay respuesta a la peticion
    return response || fetch(request);// como result muestro el cache sino fetch de la red pq seria undefined la resp
 }
 async function updateCache(request) {
     const cache = await caches.open(VERSION);
     const response = await fetch(request);
     return cache.put(request, response);
}