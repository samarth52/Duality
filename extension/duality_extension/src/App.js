/*global chrome*/
import logo from "./logo.svg";
import "./App.css";
import {useState, useEffect} from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
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

// index.js

export const App = (props) => {
  const [user, setUser] = useState(undefined);

  const signIn = (e) => {
    e.preventDefault();
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        alert(
          `SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`
        );
        return;
      }
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then((res) => {
          chrome.runtime.sendMessage({ uid: res.user.uid, from: "popup" }).then((response) => {
            console.log(response);
          })
        })
        .catch((err) => {
          alert(`SSO ended with an error: ${err}`);
        });
    });
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user && user.uid ? user : null);
    });
  }, []);
  if (undefined === user) return <h1>Loading...</h1>;
  if (user != null)
    return (
      <div>
        <h1>Signed in as {user.displayName}.</h1>
        <button onClick={auth.signOut.bind(auth)}>Sign Out?</button>
      </div>
    );
  return <button onClick={signIn}>Sign In with Google</button>;
};

export default App;
