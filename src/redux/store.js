import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/firebase-analytics';



import { getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, reduxFirestore } from 'redux-firestore';

let firebaseConfig = require("../secret")
firebase.initializeApp(firebaseConfig );

firebase.functions();

console.log(firebaseConfig , firebase)



// React-Redux-Firebase Init
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};
export const firestore = firebase.firestore();
export const database = {
  users: firestore.collection("users"),
   getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase })),
    reduxFirestore(firebase, firebaseConfig)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch:store.dispatch
};
let auth = firebase.auth();
export default auth;