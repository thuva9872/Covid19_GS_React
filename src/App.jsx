import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import "./assets/css/material-dashboard-react.css?v=1.10.0";
import Login from "./views/Authentication/login";
import Register from "./views/Authentication/register";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/gs" component={Admin} />
        <Route path="/signup" component={Register} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
