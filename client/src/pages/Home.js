import React, { Component } from 'react';
import TextLay from '../components/SearchForm/TextLay';
import Button from "../components/Button/Button";
import Carded from "../components/Carded/Carded";
import AnchorTag from "../components/AnchorTag/AnchorTag";
import Saved from "./Saved";
import API from "../utils/API";

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
        <Carded key={x._id} className="card m-2" id={x._id} cardname={x.headline.main}>
            <div>Published: {x.pub_date}</div>
            <AnchorTag href={x.web_url} />
            {/* Just store all info in button I guess lol */}
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

            <Carded cardname="Search">
                {divees}
                <div>
                    <Button onClick={this.getArts}>
                        Search
                    </Button>
                </div>
            </Carded>

            {this.state.searched.length > 0 ? (<Carded cardname="Results">
                {this.state.searched}
            </Carded>) : null}

            <Saved />

      </div>
    );
  };
};

export default Home;
