import firebase from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAhfgFNo76OOsfIVniuRWLm_ou9chYV6gI",
    authDomain: "ombre-image-upload.firebaseapp.com",
    projectId: "ombre-image-upload",
    storageBucket: "ombre-image-upload.appspot.com",
    messagingSenderId: "123255045576",
    appId: "1:123255045576:web:1a076640136883c84ad4fd",
    measurementId: "G-SB4CRMWM52"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();   

  export  {
    storage, firebase as default
  }