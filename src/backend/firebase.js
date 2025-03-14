// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAuqKhjCSWU_E_ubt4jPpTVX4iv4H75WeY",
  authDomain: "tommitrestaurant.firebaseapp.com",
  projectId: "tommitrestaurant",
  storageBucket: "tommitrestaurant.firebasestorage.app",
  messagingSenderId: "71659069298",
  appId: "1:71659069298:web:543e21298970edd46187eb",
  measurementId: "G-K2FQG5H3X3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

