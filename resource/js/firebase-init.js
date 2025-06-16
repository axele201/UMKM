import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvgtB__qruaVKFCe775K5-_y_txrG_cH4",
  authDomain: "da-umkm.firebaseapp.com",
  projectId: "da-umkm",
  storageBucket: "da-umkm.firebasestorage.app",
  messagingSenderId: "383960340916",
  appId: "1:383960340916:web:a1f582d5e18f1572f9bae1",
  measurementId: "G-KMJJ4EN3ZV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
