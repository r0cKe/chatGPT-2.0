import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKEWA0JHXulxxfkr6zPPAgXumZszsApJ8",
  authDomain: "chatgpt-messenger-clone-ed641.firebaseapp.com",
  projectId: "chatgpt-messenger-clone-ed641",
  storageBucket: "chatgpt-messenger-clone-ed641.appspot.com",
  messagingSenderId: "1061021648635",
  appId: "1:1061021648635:web:865bda1f9907e6e77e525e",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
