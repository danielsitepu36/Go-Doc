import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components
import Home from "./pages/Home";
import Verification from "./pages/Verification";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  render() {
    return (
      <Router>
        <div style={{ marginTop: 80 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Verification} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
