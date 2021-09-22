import * as firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCOqF0jp55DR-T1PniWteSunUku_xQqTzE",
  authDomain: "wireless-library-ecdc0.firebaseapp.com",
  projectId: "wireless-library-ecdc0",
  storageBucket: "wireless-library-ecdc0.appspot.com",
  messagingSenderId: "1030793590728",
  appId: "1:1030793590728:web:7d85140d0c108b8377f2fd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
