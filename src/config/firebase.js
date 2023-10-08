// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATYufzaSi-BtQfgsXHnsacoOT7Nr4-xOY",
  authDomain: "todos-1234.firebaseapp.com",
  projectId: "todos-1234",
  storageBucket: "todos-1234.appspot.com",
  messagingSenderId: "452090466885",
  appId: "1:452090466885:web:a34ae26c557c6bf987492c",
  measurementId: "G-YPQCJQLVE6"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }