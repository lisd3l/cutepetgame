import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mint from "./pages/Mint";

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/mint">
      <Mint />
    </Route>
  </Switch>
);
