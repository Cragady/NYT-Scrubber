import React, { Component } from 'react';
import TextLay from './components/TextLay';
import InputFields from "./components/InputFields";
import Button from "./components/Button";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: ""
    };
  };

  handleChengezz = (event)=>{
    this.setState({
      input: event.target.value
    });
  };

  thisFunk = ()=>{
    console.log(this.state.input);
  };

  render() {
    const topHeads = ["Topic", "Start Year", "End Year"];
    const divees = topHeads.map((x) =>
      <TextLay 
        key={x}
        onChange={this.handleChengezz}
        headName={x}
        onClick={this.thisFunk}
      />
    );
    console.log(divees);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">New York Times Article Scrubber</h1>
        </header>
        <h2 className="App-intro">
          Search
        </h2>
        {/* <InputFields onChange={this.handleChengezz} placeholder="topic" /> */}
        {divees}
        <Button onClick={this.thisFunk}>
          Tester Button
        </Button>
      </div>
    );
  }
}

export default App;
