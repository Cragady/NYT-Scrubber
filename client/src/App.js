import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import HelloDiv from "./components/pages/Saved";
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
      <div className="App">

        <Router>
          <div>
            <header className="App-header">
              <h1 className="App-title">New York Times Article Scrubber</h1>
            </header>

            <Route exact path="/" component={Home} />
            <Route component={Home} />

          </div>
        </Router>

      </div>
    );
  };
};

export default App;
