import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
    apiKey: "AIzaSyDAmmbFrWwkwMJnE_B__7TcYqLZOi-YutY",
    authDomain: "multiversity-38830.firebaseapp.com",
    projectId: "multiversity-38830",
    storageBucket: "multiversity-38830.appspot.com",
    messagingSenderId: "732850266659",
    appId: "1:732850266659:web:c3e5209ea3d989288a4796"
  };

const app = initializeApp(firebaseConfig);

// Explicitly enable debug mode in non-production environments
if (process.env.NODE_ENV !== 'production') {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.VUE_APP_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true
});

const db = getFirestore(app);

export { db };
