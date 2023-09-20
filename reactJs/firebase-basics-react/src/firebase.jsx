import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIMcjsvNCtwfvaed23ndQD3M771bfyZRo",
  authDomain: "react-firebase-b0a47.firebaseapp.com",
  projectId: "react-firebase-b0a47",
  storageBucket: "react-firebase-b0a47.appspot.com",
  messagingSenderId: "957396909044",
  appId: "1:957396909044:web:a76b366e77b7ec955b97a1"
};

const app = initializeApp(firebaseConfig);

export const firebaseApp = app;