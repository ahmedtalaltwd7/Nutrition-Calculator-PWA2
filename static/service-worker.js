const CACHE_PREFIX = 'nutricalc-shell-';
const CACHE_VERSION = 'v1';
const CURRENT_CACHE = `${CACHE_PREFIX}${CACHE_VERSION}`;
const APP_SHELL = [
	'/',
	'/style.css',
	'/app.js',
	'/manifest.json',
	'/offline.html',
	'/icons/icon-192.png',
	'/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CURRENT_CACHE)
			.then((cache) => cache.addAll(APP_SHELL))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys()
			.then((keys) => Promise.all(
				keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CURRENT_CACHE)
					.map((key) => caches.delete(key))
			))
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	const request = event.request;
	const url = new URL(request.url);
	if (request.method !== 'GET' || url.origin !== self.location.origin) return;

	if (request.mode === 'navigate') {
		event.respondWith(
			fetch(request)
				.then((response) => {
					if (response.ok) {
						const copy = response.clone();
						caches.open(CURRENT_CACHE).then((cache) => cache.put('/', copy));
					}
					return response;
				})
				.catch(async () => {
					const cachedPage = await caches.match(request, { ignoreSearch: true })
						|| await caches.match('/');
					if (cachedPage) return cachedPage;
					const fallback = await caches.match('/offline.html');
					return fallback || new Response('Offline. Reconnect to load NutriCalc.', {
						status: 503,
						headers: { 'Content-Type': 'text/plain; charset=utf-8' }
					});
				})
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((cached) => {
			if (cached) return cached;
			return fetch(request).then((response) => {
				if (response.ok && response.type === 'basic') {
					const copy = response.clone();
					caches.open(CURRENT_CACHE).then((cache) => cache.put(request, copy));
				}
				return response;
			});
		})
	);
});
