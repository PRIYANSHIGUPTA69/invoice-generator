import React , {useState , useEffect} from "react";
import Header from "../header/Header"
import Table from '../table/Table';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { getFirebase } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
function Invoices() {
  const auth = useSelector((state) => state.firebase.auth.uid);
  const [invoice , setInvoice] = useState()
  const firestore = getFirebase().firestore();
  const dispatch = useDispatch();
  useEffect(async () => {
    let inv = firestore.collection('users').doc(auth).collection("invoices").orderBy("invoiceDate", "desc").get().then(snapshot => {
      let values = snapshot.docs.map(doc => {
        let obj = {data:doc.data() , id:doc.id}
        console.log(obj)
        return obj
     });
     let invo = []
     for(let i=0; i<values.length ;i++){
       invo.push(values[i].data)
     }
     
    setInvoice(values)
    })
    
   }, [])


  console.log(invoice)
  if (invoice == undefined){
    return (
    <>
      <p>Loading !!</p>
    </>
  );
    }
  return (
    <div style={{width:"100%"}}>
      <Header title={'Invoices'} />
      <div style={{ padding: '1rem' }}>
        <Table invoice={invoice}></Table>
      </div>
    </div>
  );
}

export default Invoices;
