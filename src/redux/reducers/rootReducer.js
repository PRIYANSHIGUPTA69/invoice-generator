import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';


import authReducer from './authReducer';
import loadingStateReducer from './loadingStateReducer';
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  loadingState : loadingStateReducer
});

export default rootReducer;