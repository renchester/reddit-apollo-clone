import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FBASE_MEASUREMENT_ID,
};

const getFirebaseConfig = () => {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js",
    );
  } else {
    return firebaseConfig;
  }
};

const config = getFirebaseConfig();
export const firebaseApp = initializeApp(config);
export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
