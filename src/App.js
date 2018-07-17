import React from "react";

import Home from './components/Home';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
};

export default App;
