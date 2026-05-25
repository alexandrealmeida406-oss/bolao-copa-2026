// Bolão do Almeida — Service Worker v3
// Atualize a versão (v3, v4...) a cada deploy para forçar cache novo

const CACHE_NAME = 'bolao-2026-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
];

// Instalar — pre-cachear assets estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting(); // Ativa imediatamente sem esperar tabs fecharem
});

// Ativar — limpar caches antigos (v1, v2...)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // Toma controle de todas as tabs abertas
});

// Fetch — Network First para HTML, Cache First para assets estáticos
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // APIs externas — nunca cachear
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('flagcdn.com') ||
    url.hostname.includes('cdnjs.cloudflare.com')
  ) {
    return; // passa direto para a rede
  }

  // HTML (index.html) — Network First: sempre busca versão nova
  // Se offline, cai no cache
  if (event.request.mode === 'navigate' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Outros assets (ícones, manifest) — Cache First
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});
