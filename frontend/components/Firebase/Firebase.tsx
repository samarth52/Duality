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
  apiKey: "AIzaSyD1tiDrED4pxeQTvo3MzgoJu2bbZLivQq4",
  authDomain: "duality-auth.firebaseapp.com",
  projectId: "duality-auth",
  storageBucket: "duality-auth.appspot.com",
  messagingSenderId: "528031428168",
  appId: "1:528031428168:web:7b06c50282baf84c19327d",
  measurementId: "G-9D71YNC9QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
