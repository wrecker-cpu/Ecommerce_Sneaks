
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsdeZsuY2CjOVsDXMjX3__4yt4PBWqZN4",
  authDomain: "login-auth-788f2.firebaseapp.com",
  projectId: "login-auth-788f2",
  storageBucket: "login-auth-788f2.appspot.com",
  messagingSenderId: "948308228065",
  appId: "1:948308228065:web:5efdbfec8c454896fa04a0"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export const db=getFirestore(app);