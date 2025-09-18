self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("rpg-dados").then(cache => {
      return cache.addAll(["/", "/index.html", "/script.js", "/manifest.json", "/icone.png"]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
