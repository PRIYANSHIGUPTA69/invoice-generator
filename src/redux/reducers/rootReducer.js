import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import invoiceReducer from './invoiceReducer';

import authReducer from './authReducer';
import loadingStateReducer from './loadingStateReducer';
console.log(firestoreReducer , "redux")
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  loadingState : loadingStateReducer,
  invoice: invoiceReducer,
});

export default rootReducer;