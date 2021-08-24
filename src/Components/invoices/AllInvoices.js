import React , {useState , useEffect} from "react";
import Header from "../header/Header";
import InvoiceData from "./InvoiceData";
import InvoicePDF from "./InovicePDF"

import { useParams } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { PDFDownloadLink } from '@react-pdf/renderer';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
function AllInvoices() {
    const auth = useSelector((state) => state.firebase.auth.uid);
    const [invoice , setInvoice] = useState()
    const firestore = getFirebase().firestore();
    const dispatch = useDispatch();
    useEffect(async () => {
     let inv = firestore.collection('users').doc(auth).collection("invoices").get().then(snapshot => {
      let values = snapshot.docs.map(doc => {
        if(doc.id == id){
          setInvoice(doc.data())
        }
       return doc.data()
      });
      
     })
    }, invoice)
    return (
        <div>
            
        </div>
    )
}

export default AllInvoices
