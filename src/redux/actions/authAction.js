import history from "../../history"
import defaultSettings from "../../defaultInvoiceSettings"
import {firestore , database} from "../store"
export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: 'REGISTER_BUTTON', payload: true });
    console.log(newUser)
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(async (res) =>{
        const data = await firestore.collection('users').doc(res.user.uid).set({
          email:  newUser.email,
          firstName:newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          settings: defaultSettings,
          currentInvoice: 1
        });
       console.log(data)
       dispatch({ type: 'SIGNUP_SUCCESS' });
       history.push('/');
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: 'SIGNUP_ERROR', err });
      })
      .finally(() => dispatch({ type: 'REGISTER_BUTTON', payload: false }));
  };
};

  export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: 'LOGIN_BUTTON', payload: true });
    const firebase = getFirebase();
  console.log(credentials)
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        console.log(data)
        dispatch({ type: 'LOGIN_SUCCESS' });
        history.push('/');
      })
      .catch((err) => dispatch({ type: 'LOGIN_ERROR', err }))
  };
};

export const updateSetting = (newSetting) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: 'SETTING_BUTTON', payload: true });
    console.log(newSetting)
    const uid = getState().firebase.auth.uid;

    const firestore = getFirebase().firestore();

   firestore
      .collection('users')
      .doc(uid)
      .update({
        settings: {...newSetting}
      })
      .then(() => {
        history.push("/settings")
        history.go(0)
        dispatch({ type: 'SETTINGS_SUCCESS_BAR' });
        dispatch({ type: 'SETTING_BUTTON', payload: false });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
        history.push('/login');
        history.go(0)
      });
  };
};