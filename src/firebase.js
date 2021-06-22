import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1nv9MByVjd7pBHCazfBPF_0RK0wmff3A",
  authDomain: "linkedout-744f1.firebaseapp.com",
  projectId: "linkedout-744f1",
  storageBucket: "linkedout-744f1.appspot.com",
  messagingSenderId: "805581151443",
  appId: "1:805581151443:web:671a0b6640f0ba4abc4826",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
