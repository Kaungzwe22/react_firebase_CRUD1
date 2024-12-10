import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';  // import firebase firesotre

const firebaseConfig = {
    apiKey: "AIzaSyBMG-eVE_nQfDIcyqxRZ-r1fD0F-ZABo-M",
    authDomain: "fir-tutorial-355cd.firebaseapp.com",
    projectId: "fir-tutorial-355cd",
    storageBucket: "fir-tutorial-355cd.firebasestorage.app",
    messagingSenderId: "923319043646",
    appId: "1:923319043646:web:42b82efd5ed3262249f36f",
    measurementId: "G-1K0DKLCZSW"
  };

const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app); // get data from firestore and export then recieve from App.jsx 