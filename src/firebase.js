// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjdn-t0MJzTT5JUPTxP28yZwVIn5eH72A",
  authDomain: "stock-predictor-8af0b.firebaseapp.com",
  projectId: "stock-predictor-8af0b",
  storageBucket: "stock-predictor-8af0b.appspot.com",
  messagingSenderId: "172421017782",
  appId: "1:172421017782:web:70842b49f4c01196987617",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
