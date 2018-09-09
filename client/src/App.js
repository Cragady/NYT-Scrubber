import React, { Component } from 'react';
import Tester from './components/Tester';
import InputFields from "./components/InputFields";
import Button from "./components/Button";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: ""
    };

    this.handleChengezz = 
      this.handleChengezz.bind(this);
    this.thisFunk =
      this.thisFunk.bind(this);
  };

  handleChengezz(event){
    this.setState({
      input: event.target.value
    });
  };

  thisFunk(){
    console.log(this.state.input);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">New York Times Article Scrubber</h1>
        </header>
        <p className="App-intro">
          Search
        </p>
        <InputFields onChange={this.handleChengezz} />
        <Button onClick={this.thisFunk}>
          Hellzyeh
        </Button>
      </div>
    );
  }
}

export default App;
