import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAiYiHfoxoFWhillR6c6LFc9XQlJQ60Mu4",
    authDomain: "login-firebase-57ab4.firebaseapp.com",
    projectId: "login-firebase-57ab4",
    storageBucket: "login-firebase-57ab4.appspot.com",
    messagingSenderId: "784546978218",
    appId: "1:784546978218:web:41e11dd01063df129c33d3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db, auth}