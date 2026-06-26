/*
========================================================
ENS - Indaiatuba - Sul I
Service Worker
Versão 1.0.0
========================================================
*/

const CACHE_NAME = "ens-pwa-v1.0.0";

const FILES_TO_CACHE = [

    "./",

    "./index.html",
    "./app.html",
    "./instalado.html",

    "./manifest.json",

    "./css/style.css",

    "./js/install.js",
    "./js/app.js",
    "./js/instalado.js",

    "./img/logo.png",
    "./img/icon-192.png",
    "./img/icon-512.png"

];

/*=========================================
INSTALAÇÃO
=========================================*/

self.addEventListener("install", event => {

    console.log("Service Worker instalado.");

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});

/*=========================================
ATIVAÇÃO
=========================================*/

self.addEventListener("activate", event => {

    console.log("Service Worker ativado.");

    event.waitUntil(

        caches.keys()

            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if(key !== CACHE_NAME){

                            console.log("Removendo cache:",key);

                            return caches.delete(key);

                        }

                    })

                );

            })

    );

    self.clients.claim();

});

/*=========================================
FETCH
=========================================*/

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                if(response){

                    return response;

                }

                return fetch(event.request)

                    .then(networkResponse => {

                        if(
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type !== "basic"
                        ){

                            return networkResponse;

                        }

                        const responseClone =
                            networkResponse.clone();

                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(
                                    event.request,
                                    responseClone
                                );

                            });

                        return networkResponse;

                    });

            })

            .catch(() => {

                if(event.request.destination === "document"){

                    return caches.match("./app.html");

                }

            })

    );

});