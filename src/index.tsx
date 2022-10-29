import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPJEzB5SIe1ojbSuR5FVkGAqZPx8ne-qc",
  authDomain: "dispatch-89c2b.firebaseapp.com",
  projectId: "dispatch-89c2b",
  storageBucket: "dispatch-89c2b.appspot.com",
  messagingSenderId: "625732761586",
  appId: "1:625732761586:web:979183f3764a5d283c1d6b",
  measurementId: "G-E45E03T7BM",
  databaseURL:
    "https://dispatch-89c2b-default-rtdb.europe-west1.firebasedatabase.app/", // myDB
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // initialize my RealTime DB
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
