import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";
import IndexPage from "./pages/index";
import Layout from "./layouts/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

import "./index.css";

const Moonstone = () => (
  <Layout>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register/:id" component={RegisterPage} />
        {/* <Route component={Error404} /> */}
      </Switch>
    </BrowserRouter>
  </Layout>
);

ReactDOM.render(<Moonstone />, document.getElementById("root"));
registerServiceWorker();

