import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6-AtEgroftxs_YdPcK6SamodaNAyMQyo",
  authDomain: "kagpatra-6d21a.firebaseapp.com",
  databaseURL: "https://kagpatra-6d21a-default-rtdb.firebaseio.com",
  projectId: "kagpatra-6d21a",
  storageBucket: "kagpatra-6d21a.firebasestorage.app",
  messagingSenderId: "787138340626",
  appId: "1:787138340626:web:7eec45ee4045ca779375cb",
  measurementId: "G-DERMNC31NH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
