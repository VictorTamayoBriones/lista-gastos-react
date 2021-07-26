import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_lista_gastos_API_KEY,
  authDomain: process.env.REACT_APP_lista_gastos_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_lista_gastos_DATABASE_URL,
  projectId: process.env.REACT_APP_lista_gastos_PROJECT_ID,
  storageBucket: process.env.REACT_APP_lista_gastos_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_lista_gastos_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_lista_gastos_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth};