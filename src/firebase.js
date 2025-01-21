// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIQSbiEjVpqcGz2HPC0f8oIMILRLonjJ8",
  authDomain: "firestore-db-20cef.firebaseapp.com",
  projectId: "firestore-db-20cef",
  storageBucket: "firestore-db-20cef.firebasestorage.app",
  messagingSenderId: "561728414364",
  appId: "1:561728414364:web:be599e958167d3ac568359",
  measurementId: "G-WCRP817K70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
