import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB1HKZbnYF0JvP_XHbwPB4PQlBiIp68cBI",
  authDomain: "clone-83733.firebaseapp.com",
  databaseURL: "https://clone-83733.firebaseio.com",
  projectId: "clone-83733",
  storageBucket: "clone-83733.appspot.com",
  messagingSenderId: "57179341768",
  appId: "1:57179341768:web:4162e61af47da369a5b6fd",
  measurementId: "G-0FWHYN16DD",
};

//create a firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//create firebase database,it is real time database

const db = firebaseApp.firestore();
//this will allow us to handle user,like creating user
const auth = firebaseApp.auth();

export { db, auth };
