import firebase from "firebase/compat/app";
import {getAuth, updateProfile} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSING_SEND_ID,
  appId: process.env.REACT_APP_API_ID
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = getAuth();
export const authService = getAuth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();