// Service Worker for PediaSemio PWA
const CACHE_NAME = 'pedisemio-v1.0.0';
const urlsToCache = [
  '/pediatri/',
  '/pediatri/chapters',
  '/pediatri/about',
  '/pediatri/index.html',
  '/pediatri/manifest.json',
  '/pediatri/offline.html',
  // Add more critical resources
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response since it's a stream
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // If both cache and network fail, show offline page
          if (event.request.destination === 'document') {
            return caches.match('/pediatri/offline.html');
          }
        });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'quiz-result') {
    event.waitUntil(syncQuizResults());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Yeni içerik mevcut!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Keşfet',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Kapat',
        icon: '/icons/action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PediaSemio', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/pediatri/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/pediatri/')
    );
  }
});

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-update') {
    event.waitUntil(updateContent());
  }
});

// Helper functions
async function syncQuizResults() {
  try {
    // Sync quiz results with server when online
    const quizResults = await getStoredQuizResults();
    for (const result of quizResults) {
      await fetch('/api/quiz-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
    }
    await clearStoredQuizResults();
  } catch (error) {
    console.error('Failed to sync quiz results:', error);
  }
}

async function updateContent() {
  try {
    // Check for content updates
    const response = await fetch('/api/content-version');
    const { version } = await response.json();
    
    const storedVersion = await getStoredContentVersion();
    if (version !== storedVersion) {
      // Update cache with new content
      await updateCacheWithNewContent();
      await setStoredContentVersion(version);
    }
  } catch (error) {
    console.error('Failed to update content:', error);
  }
}

async function getStoredQuizResults() {
  // Implementation for retrieving stored quiz results
  return [];
}

async function clearStoredQuizResults() {
  // Implementation for clearing stored quiz results
}

async function getStoredContentVersion() {
  // Implementation for retrieving stored content version
  return '1.0.0';
}

async function setStoredContentVersion(version) {
  // Implementation for storing content version
}

async function updateCacheWithNewContent() {
  // Implementation for updating cache with new content
}

// Share handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHARE_READY') {
    // Handle share functionality
    console.log('Share ready');
  }
});

// Application lifecycle
self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of all pages
  event.waitUntil(self.clients.claim());
});

console.log('Service Worker loaded successfully!'); 