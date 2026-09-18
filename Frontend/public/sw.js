self.addEventListener('push', e => {
  console.log('✅ PUSH EVENT RECEIVED'); // 🔍 Log to confirm delivery

  try {
    const { title, body } = e.data.json(); // make sure payload is valid JSON
    const opts = {
      body,
      data: { url: '/income' }, // 👈 still fine to hardcode
    };
    self.registration.showNotification(title, opts);
  } catch (err) {
    console.error('❌ Failed to parse push data:', err);
  }
});

self.addEventListener('notificationclick', e => {
  console.log('🔔 Notification clicked');
  e.notification.close();

  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (let client of list) {
        if (client.url.endsWith(e.notification.data.url)) {
          return client.focus();
        }
      }
      return clients.openWindow(e.notification.data.url);
    })
  );
});
