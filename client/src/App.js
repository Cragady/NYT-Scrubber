import React, { Component } from 'react';
import TextLay from './components/TextLay';
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
        <section className="card mt-3 col-8 mx-auto">
          <h2 className="card-header">
            Search
          </h2>
          {divees}
          <div>
            <Button className="btn btn-default col-4 m-2" onClick={this.thisFunk}>
              Tester Button
            </Button>
            <Button className="btn btn-default col-4 m-2">
              Show Saved
            </Button>
          </div>
        </section>
      </div>
    );
  };
};

export default App;
