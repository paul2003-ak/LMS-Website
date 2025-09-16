import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "lms--website.firebaseapp.com",
  projectId: "lms--website",
  storageBucket: "lms--website.firebasestorage.app",
  messagingSenderId: "559955837072",
  appId: "1:559955837072:web:43ffc6327ed8ee35695815"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider= new GoogleAuthProvider()



export {auth,provider}