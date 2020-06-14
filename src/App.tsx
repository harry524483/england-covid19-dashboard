import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Regionwise from "./containers/Regionwise";
import Countrywise from "./containers/Countrywise";
import LocalAuthority from "./containers/LocalAuthority";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Countrywise />
        </Route>
        <Route exact path="/region">
          <Regionwise />
        </Route>
        <Route path="/region/:regionName" component={LocalAuthority} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
