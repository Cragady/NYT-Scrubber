import React, { Component } from 'react';
import TextLay from '../SearchForm/TextLay';
import Button from "../Button/Button";
import Carded from "../Carded/Carded";
import AnchorTag from "../AnchorTag/AnchorTag";
import Saved from "./Saved";
import API from "../../utils/API";

class Home extends Component {
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

  getArts = (event)=>{
    event.preventDefault();
    API.searchArtics(this.state).then(result =>{
      const searchArr = result.data.response.docs.slice(0, 5).map( x=>
        <Carded key={x._id} className="card m-2" id={x._id} cardName={x.headline.main}>
            <AnchorTag href={x.web_url} />
            <Button classext="btn-success mx-auto" children="Save" />
        </Carded>
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

        <div className="Page">

            <Carded cardName="Search">
                {divees}
                <div>
                    <Button onClick={this.getArts}>
                        Search
                    </Button>
                </div>
            </Carded>

            {this.state.searched.length > 0 ? (<Carded cardName="Results">
                {this.state.searched}
            </Carded>) : null}

            <Saved />

      </div>
    );
  };
};

export default Home;
