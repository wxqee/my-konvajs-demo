import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Examples from "./Examples";

import './style.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/examples" component={Examples} />
        <Redirect to="/examples" from="/" />
      </Switch>
    </Router>
  );
}

export default App;
