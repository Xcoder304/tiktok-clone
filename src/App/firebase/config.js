import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRe9YMS0CGadcvbqhGnqVPlSkgQNJst8c",
  authDomain: "tiktok-clone-7d9d6.firebaseapp.com",
  projectId: "tiktok-clone-7d9d6",
  storageBucket: "tiktok-clone-7d9d6.appspot.com",
  messagingSenderId: "880852954877",
  appId: "1:880852954877:web:37efc4ce741508aa811894",
  measurementId: "G-TC5XEN7LNX",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { db, auth, storage };
