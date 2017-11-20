import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import SuggestPage from "./pages/SuggestPage/SuggestPage";
import EditPage from "./pages/EditPage/EditPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.css";

export default () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/fb" component={SuggestPage} />
          <Route path="/fb/results" component={EditPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Provider>
  );
};
