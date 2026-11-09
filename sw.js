const CACHE_NAME = 'cuentos-clara-v1';

// Lista exacta de los archivos que componen este cuento/juego
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  // Si tienes un archivo JS con la lógica del juego, añádelo aquí (ej: './main.js')
  
  // IMPORTANTE: Agrega aquí las rutas de las imágenes, audios de voz lenta/rápida,
  // y cualquier otro recurso que use el cuento para que se escuche y vea sin internet.
];

// Instalación: Guarda los archivos en el almacenamiento local del navegador
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos de Cuentos de Clara respaldados en caché');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: Remueve versiones viejas de caché si actualizas el juego
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Actualizando caché del juego...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepción de peticiones: Si no hay señal, lee directamente de la caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
