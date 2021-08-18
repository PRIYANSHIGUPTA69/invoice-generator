import React from 'react';
import './App.css';
import Sidebar from './Components/sidebar/Sidebar';

import { Switch , Route , Redirect } from 'react-router';
import Logo from "./images/logo.png"
import Dashboard from './Components/dashboard/Dashboard';
function App() {
  const loader = false;
  if(loader){
    return (
      <div className="App">
      <img src={Logo} alt="invoice app logo" />
   </div>
    )
  }
  return (
        <div className="App">
         <Sidebar></Sidebar>
         
         <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/create" />
      <Route exact path="/invoices"  />
      <Route exact path="/settings"  />
      <Route exact path="/settings/edit"  />
      <Route exact path="/invoice/:id"  />
      <Route exact path="/register" render={() => <Redirect to="/" />} />
      <Route exact path="/login" render={() => <Redirect to="/" />} />
    
      
    </Switch>
        </div>
  );
}

export default App;
