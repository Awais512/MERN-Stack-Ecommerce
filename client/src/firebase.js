import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB6AxBcRxemWe0X39MdKhKSeErS6W4YlXE',
  authDomain: 'ecommerce-e084d.firebaseapp.com',
  databaseURL: 'https://ecommerce-e084d.firebaseio.com',
  projectId: 'ecommerce-e084d',
  storageBucket: 'ecommerce-e084d.appspot.com',
  messagingSenderId: '8092685169',
  appId: '1:8092685169:web:236a99cfcbb79bf9319cd0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
