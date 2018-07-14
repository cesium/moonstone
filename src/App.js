import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";


class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <h1>SEI 2019</h1>
        <Footer />
      </div>
    );
  }
};

export default App;
