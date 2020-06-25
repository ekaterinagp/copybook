import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCQ34fvvNI8fBrS8G2eVrvwOIl_sglyGYU",
  authDomain: "newproject-d3bae.firebaseapp.com",
  databaseURL: "https://newproject-d3bae.firebaseio.com",
  projectId: "newproject-d3bae",
  storageBucket: "newproject-d3bae.appspot.com",
  messagingSenderId: "1043667936777",
  appId: "1:1043667936777:web:3cd80245cb4c4c59437ad8",
  measurementId: "G-6LTW6XQ2JK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

let storage = firebase.storage();

export { storage, firebase };
