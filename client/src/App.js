import React, { Component } from 'react';
import TextLay from './components/TextLay';
import Button from "./components/Button";
import Carded from "./components/Carded";
import API from "./utils/API";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Topic: "",
      StartYear: "2018",
      EndYear: "2018",
      searched: [],
      saved: []
    };
  };

  handleChengezz = (event)=>{
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  // thisFunk = ()=>{
  //   console.log(this.state);
  // };

  getArts = (event)=>{
    event.preventDefault();
    API.searchArtics(this.state).then(result =>{
      const searchArr = result.data.response.docs.slice(0, 5).map( x=>
        <section key={x._id} className="card m-2">
          <div className="card-header">
            {x.headline.main}
          </div>
          {x.web_url}
        </section>
      );
      this.setState({
        searched: searchArr
      })
      console.log(result.data.response.docs);
    });
  }

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
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">New York Times Article Scrubber</h1>
        </header>

        <Carded cardName="Search">
          {divees}
          <div>
            <Button className="btn btn-default col-4 m-2" onClick={this.getArts}>
              Tester Button
            </Button>
            <Button className="btn btn-default col-4 m-2">
              Show Saved
            </Button>
          </div>
        </Carded>

        {this.state.searched.length > 0 ? (<Carded cardName="Results">
          {this.state.searched}
        </Carded>) : null}

        {this.state.saved.length > 0 ? (<Carded cardName="Saved">
          This is Test
        </Carded>) : null}

      </div>
    );
  };
};

export default App;
