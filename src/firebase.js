// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDj12TPYycKS2ac58JJylufogEt-e6C420',
  authDomain: 'cards-7dd41.firebaseapp.com',
  databaseURL:
    'https://cards-7dd41-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cards-7dd41',
  storageBucket: 'cards-7dd41.appspot.com',
  messagingSenderId: '679938434317',
  appId: '1:679938434317:web:0ac944ef9d70179fadbc44',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
