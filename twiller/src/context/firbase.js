
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// const firebaseConfig = {
//   apiKey: "ur apikey",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "ur app id ",
//   measurementId: ""
// };
const firebaseConfig = {
  apiKey: "AIzaSyBr5eYQOarZ10iF6rHuTq6K6PMtSBNivKE",
  authDomain: "twillerx-5d990.firebaseapp.com",
  projectId: "twillerx-5d990",
  storageBucket: "twillerx-5d990.firebasestorage.app",
  messagingSenderId: "620187250139",
  appId: "1:620187250139:web:e668e7d2eedd61701acbfe",
  measurementId: "G-BYSTNHH8TS"
};

// Initialize Firebase const app = initializeApp(firebaseConfig); // Initialize Fireb
// const app = initializeApp(firebaseConfig);
// export const auth=getAuth(app)
// export default app
// const analytics = getAnalytics(app);
// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
// Initialize Firebase Authentication 
export const auth = getAuth(app); 
// Initialize Firestore Database 
export const db = getFirestore(app); 
export default app; // const analytics = getAnalytics(app);