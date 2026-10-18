/* Service worker de SISMOS LIVE: abre la app sin conexión con la última versión vista y permite notificaciones en Android.
 * Solo se guarda en caché el propio sitio (HTML, manifest, iconos). Los datos de las agencias NUNCA se cachean aquí. */
const VER = 'sismos-live-v2';
// URL del worker de avisos (debe coincidir con la del monitor)
const PUSH_WORKER = 'https://notificaciones-push.terremotis123.workers.dev';
const SHELL = ['./', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           // datos de agencias y mapas: directo a la red
  if (req.mode === 'navigate') {                              // HTML: red primero, caché si no hay conexión
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VER).then(c => c.put('./', cp)); return r; })
      .catch(() => caches.match('./').then(r => r || caches.match(req))));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => { const cp = n.clone(); caches.open(VER).then(c => c.put(req, cp)); return n; })));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});

// ---- Avisos push (el worker envía un push sin contenido; el texto se pide a /last) ----
async function sidOf(endpoint) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint));
  return [...new Uint8Array(h)].slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join('');
}
self.addEventListener('push', e => {
  e.waitUntil((async () => {
    let msg = null;
    try {
      const sub = await self.registration.pushManager.getSubscription();
      if (sub) {
        const r = await fetch(PUSH_WORKER + '/last?sid=' + await sidOf(sub.endpoint), { cache: 'no-store' });
        if (r.ok) msg = await r.json();
      }
    } catch (_) {}
    await self.registration.showNotification((msg && msg.title) || '⚠️ Sismo nuevo', {
      body: (msg && msg.body) || 'Abre el monitor para ver los detalles.',
      tag: (msg && msg.tag) || 'sismo', renotify: true,
      icon: 'icon-192.png', badge: 'icon-192.png', data: { url: './' }
    });
  })());
});
