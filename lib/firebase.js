import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
// import "firebase/analytics";
//@Todo move these to env config
const firebaseConfig = {
  apiKey: "AIzaSyCQoC9JdXkIebNByakzgm_Gkm8XJu4oZxU",
  authDomain: "launch-weekend.firebaseapp.com",
  databaseURL: "https://launch-weekend.firebaseio.com",
  projectId: "launch-weekend",
  storageBucket: "launch-weekend.appspot.com",
  messagingSenderId: "57970499778",
  appId: "1:57970499778:web:9838ba27a93fdd3b9fdb5b",
  measurementId: "G-GTGTF1N1GX",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics(); //@Todo do we need this?
}

export default firebase;
