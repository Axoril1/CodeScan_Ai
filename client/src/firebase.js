import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSpVs-7eAwd6z2-J7Q9AedtpfmFmxUzak",
  authDomain: "codescan-ai-cf049.firebaseapp.com",
  projectId: "codescan-ai-cf049",
  storageBucket: "codescan-ai-cf049.firebasestorage.app",
  messagingSenderId: "35757457665",
  appId: "1:35757457665:web:0b5a7af9c240afcb899b00",
  measurementId: "G-CZQHVFS66G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
