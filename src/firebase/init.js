// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu2OQyLUHiCl3sqDR5nHBsauaf76WSDcI",
  authDomain: "fir-testrun-aee8c.firebaseapp.com",
  projectId: "fir-testrun-aee8c",
  storageBucket: "fir-testrun-aee8c.firebasestorage.app",
  messagingSenderId: "898971920359",
  appId: "1:898971920359:web:42109d10f136fbf5c97f42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();