import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration from google-services.json
const firebaseConfig = {
    apiKey: "AIzaSyDzbA8Lk9Zv1i7JOeHqFrMsjRjcRLkgMoQ",
    authDomain: "friendlybuddy.firebaseapp.com",
    projectId: "friendlybuddy",
    storageBucket: "friendlybuddy.firebasestorage.app",
    messagingSenderId: "1060750179622",
    appId: "1:1060750179622:android:51c65e9fd91975bbe695e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
