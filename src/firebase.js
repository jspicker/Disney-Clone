import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCatgr2Kcvr_6I0BARbHd_l9Y0mgXqat0M",
  
    authDomain: "new-clone-6c20f.firebaseapp.com",
  
    projectId: "new-clone-6c20f",
  
    storageBucket: "new-clone-6c20f.appspot.com",
  
    messagingSenderId: "715203648233",
  
    appId: "1:715203648233:web:910d06a2df02b24bd4ae78"
  
  };
  

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
