// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4J5L0hx08BWtVJtXS5YU587usQLNjB6s",
  authDomain: "silene-pro.firebaseapp.com",
  projectId: "silene-pro",
  storageBucket: "silene-pro.appspot.com",
  messagingSenderId: "884025593979",
  appId: "1:884025593979:web:d1c620ba8b2555407152de",
  measurementId: "G-F0M1LJCBDH"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp( firebaseConfig );

export default firebase;