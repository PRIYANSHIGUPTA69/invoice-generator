import history from "../../history"
import defaultSettings from "../../defaultInvoiceSettings"
export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase }) => {
      
      const firebase = getFirebase();
      const firestore = getFirebase().firestore();
      console.log(firebase.auth() , firestore)
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((res) =>
          firestore.collection('users').doc(res.user.uid).set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            settings: defaultSettings,
            currentInvoice: 1
          })
        )
        .then(() => {
          dispatch({ type: 'SIGNUP_SUCCESS' });
          history.push('/');
        })
        .catch((err) => {
          console.log(err)
          dispatch({ type: 'SIGNUP_ERROR', err });
        })
    };
  };