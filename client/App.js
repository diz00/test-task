import React from "react";
import { Route, Switch } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import SuggestPage from "./pages/SuggestPage/SuggestPage";
import EditPage from "./pages/EditPage/EditPage";

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/fb" component={SuggestPage} />
        <Route path="/fb/results" component={EditPage} />
      </Switch>
    </div>
  );
};
