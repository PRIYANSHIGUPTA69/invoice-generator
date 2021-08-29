import { useHistory } from "react-router-dom";  
import React , {useState  , useEffect} from 'react';
import Header from '../header/Header';
import { getFirebase } from 'react-redux-firebase';
import Grid from '@material-ui/core/Grid';
import "./settings.css"
import { Button } from '@material-ui/core';
import history from "../../history"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Component
function Settings() {
  const history = useHistory();
  const [firstName , setFirstName] = useState() 
  const [lastName , setLastName] = useState()
  const [settings , setSetting] = useState()
  const auth = useSelector((state) => state.firebase.auth.uid);
  const firestore = getFirebase().firestore();
  useEffect(async () => {
    let obj;
    let inv = firestore.collection('users').get().then(snapshot => {
     let values = snapshot.docs.map(doc => {
       if(doc.id == auth){
         obj = {data:doc.data() , id:doc.id}
       }
     return doc.data()
     });
     console.log(obj)
    
      setFirstName(obj.data.firstName.toUpperCase())
      setLastName(obj.data.lastName.toUpperCase())
    
   setSetting(obj.data.settings)
     
    })
    
   }, [])
   if(settings == undefined || firstName == undefined || lastName==undefined){
     return (
       <p>Loading!!</p>
     )
   }
   console.log(firstName , " " , lastName)
   const {
    companyName,
    gstNumber,
    taxPercent,
    taxEnable,
    billableType,
    taxType,
    companyAddress,
    note,
    currency
  } = settings;
  const handleClick = () =>{
    history.push('/settings/edit')
  }
  return (
    <div className="setting">
     
      <div>
        <div >
      <div className="name-photo">
      <div>
        <img
          src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=80&rounded=true&color=2e5bff&background=e0e7ff`}
          alt="User Logo"
        />
      </div>
      <p>
      {firstName} {lastName}
      </p>
    </div>
   
      </div>
      <div className="default-settings">
        <h3>Default Settings</h3>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <p>
              <span>Company Name: </span>
              {companyName}
            </p>
            <p>
              <span>GSTIN: </span>
              {gstNumber}
              
            </p>
            <p>
              <span>Company Address: </span>
             {companyAddress}
            </p>
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              <span>Billable Type: </span>
             {billableType}
            </p>
            <p>
              <span>Default Currency: </span>
              {currency}
            </p>
            <p>
              <span>Default Customer Note: </span> 
              {note}
            </p>
          </Grid>
          <Grid item xs={12} md={4}>
            <p>
              <span>Enable Tax: </span>
             {taxEnable}
            </p>
            <p>
              <span>Default Tax Type: </span>
             {taxType}
            </p>
            <p>
              <span>Default Tax Percent: </span> 
              {taxPercent}
            </p>
          </Grid>
        </Grid>
        
      </div>
      <button className="edit" onClick ={handleClick} >
          EDIT SETTINGS
        </button>
      </div>
    </div>
  );
}

export default Settings;
