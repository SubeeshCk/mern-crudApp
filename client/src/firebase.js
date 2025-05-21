// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "user-management-bc1a8.firebaseapp.com",
  projectId: "user-management-bc1a8",
  storageBucket: "user-management-bc1a8.firebasestorage.app",
  messagingSenderId: "927471795789",
  appId: "1:927471795789:web:d7285e137629c91720e604"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);