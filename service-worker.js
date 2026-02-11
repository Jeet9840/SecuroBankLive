const CACHE_NAME = "securo-bank-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./login.html",
  "./dashboard.html",
  "./create-account.html",
  "./profile.html",
  "./css/style.css",
  "./js/auth.js",
  "./js/profile.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
