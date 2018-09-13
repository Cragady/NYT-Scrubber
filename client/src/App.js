import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: ""
    };
  };

  render() {
    return (
      <Router>
        <div className="App">

          <div>
            <header className="App-header">
              <h1 className="App-title">New York Times Article Scrubber</h1>
            </header>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/saved" component={Saved} />
              <Route component={Home} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  };
};

export default App;
