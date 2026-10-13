importScripts(
  'https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js'
)

firebase.initializeApp({
  apiKey: 'BNnhW__bNQri71ufD5-JUxylQgisDSiVff2x6UQoBMguer_6EBynvcj0ErzaMbjYACYlArbQbemPDwGcWyDsQjU',
  authDomain: 'agenda-inteligente-cdb91.firebaseapp.com',
  projectId: 'agenda-inteligente-cdb91',
  storageBucket: 'agenda-inteligente-cdb91.firebasestorage.app',
  messagingSenderId: '475077910072',
  appId: '1:475077910072:web:3295ceba1750c8316d90cd'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Agenda Inteligente'
  const options = {
    body: payload.notification?.body || 'Tienes un recordatorio pendiente',
    icon: '/icon.png'
  }

  self.registration.showNotification(title, options)
})