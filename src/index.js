import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";
import IndexPage from "./pages/index";
import Layout from "./layouts/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ReferralPage from "./pages/referral";
import BadgeDexPage from "./pages/badgedex";
import Badge from "./pages/badge";
import RankPage from "./pages/rank";
import NoMatch from "./pages/404.js";
import User from "./pages/user.js"

import "./index.css";

const Moonstone = () => (
  <Layout>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register/:id" component={RegisterPage} />
        <Route exact path="/referral" component={ReferralPage} />
        <Route exact path="/badgedex/:id" component={Badge} />
        <Route exact path="/badgedex" component={BadgeDexPage} />
        <Route exact path="/rank" component={RankPage} />
        <Route exact path="/user/:id" component={User} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  </Layout>
);

ReactDOM.render(<Moonstone />, document.getElementById("root"));
registerServiceWorker();

