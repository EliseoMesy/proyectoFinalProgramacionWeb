const firebase = require("firebase/app");
require("firebase/firestore");

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Obtén la referencia a Firestore (base de datos)
const db = firebase.firestore();

module.exports = db;
