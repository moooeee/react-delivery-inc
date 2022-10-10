import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Invoices from "./components/invoices";
import Customers from "./components/customersList";
import PackageList from "./components/packageList";
import Navigate from "./components/navigate";

import "./App.css";
import Invoice from "./components/invoice";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Navigate to="/customers-list" />
          </Route>
          <Route path="/invoice/:id" exact>
            <Invoice />
          </Route>
          <Route path="/invoices">
            <Invoices />
          </Route>
          <Route path="/packages-list">
            <PackageList />
          </Route>
          <Route path="/customers-list">
            <Customers />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
