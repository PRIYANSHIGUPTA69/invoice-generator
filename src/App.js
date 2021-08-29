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
import InvalidPage from './Components/invalidPage/InvalidPage';
import AppLoader from './Components/Loaders/appLoader/AppLoader';
function App() {
  const loader = false;
const auth = useSelector((state) => state.firebase.auth);
console.log(auth)
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
  if (!isLoaded(auth)) {
    return <AppLoader></AppLoader>
  }

  if (auth == undefined || auth.uid == undefined)
  
    return (
      <Switch>
        <Route exact path="/register" component={Signup} />
          <Route exact path="/login" component={Signin} />
          
      </Switch>
    );

  return (
        <div className="container">
       <Sidebar className ="sidebar"></Sidebar>
         <div classname="component" style={{marginLeft: "250px"}}>
         <Switch>
       
       <Route exact path="/" component={Dashboard} />
       <Route exact path="/create" component={CreateInvoice} />
       <Route exact path="/invoices" component={Invoices} />
       <Route exact path="/settings"   component={Settings}/>
       <Route exact path="/settings/edit" component = {EditSetting}/>
       <Route exact path="/invoice/:id"  component={InvoiceDetails}/>
       <Route exact path="/register" render={() => <Redirect to="/" />} />
       <Route exact path="/login" render={() => <Redirect to="/" />} />
       <Route component={InvalidPage} />
       
     </Switch>
         </div>
        
        </div>
  );
}

export default App;
