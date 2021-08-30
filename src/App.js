import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import Signup from "./Components/user/Signup";
import Signin from "./Components/user/Signin";
import Sidebar from "./Components/sidebar/Sidebar";
import CreateInvoice from "./createInvoice/CreateInvoice";
import { Switch, Route, Redirect } from "react-router";
import Logo from "./images/logo.png";
import Dashboard from "./Components/dashboard/Dashboard";
import Invoices from "./Components/invoices/Invoices";
import Settings from "./Components/setting/Settings";
import EditSetting from "./Components/setting/EditSettings";
import InvoiceDetails from "./Components/invoices/InvoiceDetails";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import InvalidPage from "./Components/invalidPage/InvalidPage";
import AppLoader from "./Components/Loaders/appLoader/AppLoader";
import auth from "./redux/store";
function App() {
  const [user, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("inside listner", user);
      setCurrentUser(user);
    });
    return function () {
      console.log("Hello");
      unsubscribe();
    };
  }, []);

  useFirestoreConnect([
    {
      collection: "users",
      doc: auth.uid || " ",
      subcollections: [
        { collection: "invoices", orderBy: ["invoiceDate", "desc"] },
      ],
      storeAs: "invoices",
    },
  ]);
  if (isLoaded(auth)) {
    return (<AppLoader></AppLoader>)
  }
  console.log(auth.currentUser);
  if (!auth.currentUser) {
    console.log(auth);
    return (
      <Switch>
        <Route exact path="/register" component={Signup} />
        <Route exact path="/login" component={Signin} />
        <Route render={() => <Redirect to="/register" />} />
      </Switch>
    );
  }
  return (
    <div className="container">
      <Sidebar className="sidebar" />
      <div classname="component" style={{ marginLeft: "250px" }}>
        <Switch>
          <PrivateRoute user={user} exact path="/" abc={Dashboard} />
          <PrivateRoute user={user} exact path="/create" abc={CreateInvoice} />
          <PrivateRoute user={user} exact path="/invoices" abc={Invoices} />
          <PrivateRoute user={user} exact path="/settings" abc={Settings} />
          <PrivateRoute
            user={user}
            exact
            path="/settings/edit"
            abc={EditSetting}
          />
          <PrivateRoute
            user={user}
            exact
            path="/invoice/:id"
            abc={InvoiceDetails}
          />

          <Route
            exact
            path="/register"
            render={() => <Redirect to="/" />}
          ></Route>
          <Route exact path="/login" render={() => <Redirect to="/" />} />
          <PrivateRoute abc={InvalidPage} />
        </Switch>
      </div>
    </div>
  );
}

function PrivateRoute(props) {
  const auth = useSelector((state) => state.firebase.auth);
  let Component = props.abc;
  return (
    <Route
      {...props}
      render={(props) => {
        return auth.uid != undefined ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login"></Redirect>
        );
      }}
    ></Route>
  );
}
export default App;

