// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBetGX8F-kU5_XHgnuZ0WypN5JT_k7KCB8",
    authDomain: "pruebafinal-efca9.firebaseapp.com",
    projectId: "pruebafinal-efca9",
    storageBucket: "pruebafinal-efca9.firebasestorage.app",
    messagingSenderId: "1084468406700",
    appId: "1:1084468406700:web:4329c66311bf5a08b27209"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
