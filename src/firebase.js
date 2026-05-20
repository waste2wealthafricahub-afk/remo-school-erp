import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYC5R2ptgx0U6xL8iQc8qAYuWhjD9SC8Y",
  authDomain: "remo-school-8f9ee.firebaseapp.com",
  projectId: "remo-school-8f9ee",
  storageBucket: "remo-school-8f9ee.firebasestorage.app",
  messagingSenderId: "40082369467",
  appId: "1:40082369467:web:5fc77a389a563303b1b29e",
  measurementId: "G-XPP7YYTG6J"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);