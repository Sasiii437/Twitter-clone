
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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
