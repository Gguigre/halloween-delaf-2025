// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8EGmISAxrQAEiJWC3mqhssoKpr0zWcPY",
  authDomain: "halloween-delaf-2025.firebaseapp.com",
  projectId: "halloween-delaf-2025",
  storageBucket: "halloween-delaf-2025.firebasestorage.app",
  messagingSenderId: "381098824223",
  appId: "1:381098824223:web:da13e08e9b7e28a21efb2a",
  measurementId: "G-RQFGEGL272",
};

export const FirebaseCollections = {
  USERS: "Users",
};

export const useFirebase = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const firestore = getFirestore(app);

  return { analytics, firestore };
};
