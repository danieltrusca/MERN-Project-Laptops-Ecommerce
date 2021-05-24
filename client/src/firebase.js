import firebase from "firebase/app";
import "firebase/auth";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB6Z86Hr8NdJtyOSy5rlAV8TROPZFItaXM",
  authDomain: "ecommerce-laptops.firebaseapp.com",
  projectId: "ecommerce-laptops",
  storageBucket: "ecommerce-laptops.appspot.com",
  messagingSenderId: "917663576893",
  appId: "1:917663576893:web:36844d54201515608bcb54",
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
