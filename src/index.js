import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";
import IndexPage from "./pages/index";
import Layout from "./layouts/index";

import "./index.css";

const Root = () => (
  <Layout>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        {/* <Route component={Error404} /> */}
      </Switch>
    </BrowserRouter>
  </Layout>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
