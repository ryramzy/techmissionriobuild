importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const urlParams = new URLSearchParams(self.location.search);
const apiKey = urlParams.get('apiKey') || 'mock-api-key-for-static-prerender';
const authDomain = urlParams.get('authDomain') || 'techmission-rio.firebaseapp.com';
const projectId = urlParams.get('projectId') || 'techmission-rio';
const storageBucket = urlParams.get('storageBucket') || 'techmission-rio.appspot.com';
const messagingSenderId = urlParams.get('messagingSenderId') || '1234567890';
const appId = urlParams.get('appId') || '1:1234567890:web:mockappid';

firebase.initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'TechMission Rio Alert';
  const notificationOptions = {
    body: payload.notification?.body || 'New update available.',
    icon: '/icons/icon-192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
