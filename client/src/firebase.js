// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIRbnmGsKZ7i7V3kujWO2Uuplh0A4CFuo",
  authDomain: "playground-6f3ab.firebaseapp.com",
  projectId: "playground-6f3ab",
  storageBucket: "playground-6f3ab.firebasestorage.app",
  messagingSenderId: "780171996465",
  appId: "1:780171996465:web:f6be0bfa2b1e1357185410",
  measurementId: "G-Y3DKY3D9KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;

const auth = getAuth(app);

// Export what you need
export { auth };