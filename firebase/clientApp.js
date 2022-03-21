import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';

const firebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('Setting up the firebase options!')

export const firebaseApp = initializeApp(firebaseOptions);
export const firebaseAuth = getAuth(firebaseApp);
// Set the language of dialogs etc. to the browser language
firebaseAuth.useDeviceLanguage();

console.log(`The app is: ${firebaseApp} and the auth is ${firebaseAuth}`)