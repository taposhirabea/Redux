import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyBMc3gtPGR0OkjoPfrArFLkdbUmEoJAqrc",
  authDomain: "redux-b78d9.firebaseapp.com",
  projectId: "redux-b78d9",
  storageBucket: "redux-b78d9.appspot.com",
  messagingSenderId: "1070563516624",
  appId: "1:1070563516624:web:df2e77b3ce0f13949cbed5"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const fs = firebase.firestore();
// const storage = firebase.storage();
// Use these for db & auth
const fs = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {auth,fs,storage}