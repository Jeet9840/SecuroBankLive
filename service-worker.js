const CACHE_NAME = "securo-bank-v1";

const urlsToCache = [
  "/SecuroBankLive/",
  "/SecuroBankLive/index.html",
  "/SecuroBankLive/login.html",
  "/SecuroBankLive/dashboard.html",
  "/SecuroBankLive/create-account.html",
  "/SecuroBankLive/profile.html",
  "/SecuroBankLive/css/style.css",
  "/SecuroBankLive/js/auth.js",
  "/SecuroBankLive/js/profile.js"
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
