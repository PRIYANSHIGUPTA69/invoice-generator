import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Signup from "./Components/user/Signup"
import Signin from "./Components/user/Signin"
import Sidebar from './Components/sidebar/Sidebar';
import CreateInvoice from './createInvoice/CreateInvoice';
import { Switch , Route , Redirect } from 'react-router';
import Logo from "./images/logo.png"
import Dashboard from './Components/dashboard/Dashboard';
import Invoices from './Components/invoices/Invoices';
import Settings from './Components/setting/Settings';
import EditSetting from './Components/setting/EditSettings';
import InvoiceDetails from './Components/invoices/InvoiceDetails';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
function App() {
  const loader = false;
const auth = useSelector((state) => state.firebase.auth);
  useFirestoreConnect([
    {
      collection: 'users',
      doc: auth.uid || ' ',
      subcollections: [
        { collection: 'invoices', orderBy: ['invoiceDate', 'desc'] }
      ],
      storeAs: 'invoices'
    }
  ]);


  if (isEmpty(auth))
  
    return (
      <Switch>
        <Route exact path="/register" component={Signup} />
          <Route exact path="/login" component={Signin} />
      </Switch>
    );

  return (
        <div className="App">
       <Sidebar></Sidebar>
         
         <Switch>
       
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/create" component={CreateInvoice} />
      <Route exact path="/invoices" component={Invoices} />
      <Route exact path="/settings"   component={Settings}/>
      <Route exact path="/settings/edit" component = {EditSetting}/>
      <Route exact path="/invoice/:id"  component={InvoiceDetails}/>
      <Route exact path="/register" render={() => <Redirect to="/" />} />
      <Route exact path="/login" render={() => <Redirect to="/" />} />
    
      
    </Switch>
        </div>
  );
}

export default App;
