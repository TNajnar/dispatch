import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// My web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAPJEzB5SIe1ojbSuR5FVkGAqZPx8ne-qc",
    authDomain: "dispatch-89c2b.firebaseapp.com",
    projectId: "dispatch-89c2b",
    storageBucket: "dispatch-89c2b.appspot.com",
    messagingSenderId: "625732761586",
    appId: "1:625732761586:web:979183f3764a5d283c1d6b",
    measurementId: "G-E45E03T7BM",
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app); // initialize my RealTime DB

export default database