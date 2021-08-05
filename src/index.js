import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import initStore from './store';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import Home from './blog/home';


const store = initStore();
  
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      {/* <Redirect to="/admin/dashboard" /> */}
    </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
