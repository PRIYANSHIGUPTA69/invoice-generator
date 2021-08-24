import React , {useState , useEffect} from "react";
import Header from "../header/Header"
import Table from '../table/Table';
import { getFirebase } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
function Invoices() {
  const auth = useSelector((state) => state.firebase.auth.uid);
  const [invoice , setInvoice] = useState()
  const firestore = getFirebase().firestore();
  const dispatch = useDispatch();
  useEffect(async () => {
    let inv = firestore.collection('users').doc(auth).collection("invoices").get().then(snapshot => {
     let values = snapshot.docs.map(doc => {
        return doc.data()
     });
     setInvoice(values)
    })
    
   }, [])
  if(invoice == undefined){
    return (
      <p>Loading!!</p>
    )
  }
  console.log(invoice)
  return (
    <div>
      <Header title={'Invoices'} />
      <div style={{ padding: '1rem' }}>
        <Table invoice={invoice}></Table>
      </div>
    </div>
  );
}

export default Invoices;
