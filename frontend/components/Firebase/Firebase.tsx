// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9WD4oQzSeo7p0lAbQODwQcQ5OoKQyXtg",
  authDomain: "white-outlook-377503.firebaseapp.com",
  projectId: "white-outlook-377503",
  storageBucket: "white-outlook-377503.appspot.com",
  messagingSenderId: "962840843955",
  appId: "1:962840843955:web:2bbc553aaa6abaf54242c6",
  measurementId: "G-KM5QCQSBN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
