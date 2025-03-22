import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    apiKey: "AIzaSyCbxHDRWkqptKlhBz14badZfH54r0HhQkg",
    authDomain: "my-test-app1-ff8d3.firebaseapp.com",
    projectId: "my-test-app1-ff8d3",
    storageBucket: "my-test-app1-ff8d3.firebasestorage.app",
    messagingSenderId: "663838685906",
    appId: "1:663838685906:web:bf92fb2faaead4d1314b0b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
