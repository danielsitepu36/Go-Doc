import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Home from "./pages/Home";
import AuthConsumer from "./pages/AuthConsumer";
import NotFound from "./pages/NotFound";
import AdminConsumer from "./admin/AdminConsumer";

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
        <div style={{ margin: "80px auto" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={AuthConsumer} />
            {/* <Route exact path="/notverified" component={NotVerified} />
            <Route exact path="/waitVerified" component={WaitVerified} /> */}
            {/* <Route
              exact
              path="/datadiri"
              render={(props) => <DataDokter {...props} />}
            /> */}
            <Route exact path="/admin" component={AdminConsumer} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
